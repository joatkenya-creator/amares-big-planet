import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import amaresLogo from "@/assets/amares-logo.jpeg";
import amaresTitle from "@/assets/amares-title.png";

export const Route = createFileRoute("/donate")({
  component: DonatePage,
  head: () => ({
    meta: [
      { title: "Donate — Amaré's Big Planet" },
      { name: "description", content: "Support Amaré's Big Planet — help create free, inclusive educational content for kids aged 3-13." },
    ],
    scripts: [
      { src: "https://js.paystack.co/v1/inline.js" },
    ],
  }),
});

const FALLBACK_RATES: Record<string, number> = {
  USD: 1, GBP: 0.79, EUR: 0.92, CAD: 1.36,
  AUD: 1.53, KES: 129, NGN: 1550, ZAR: 18.5, GHS: 15.2,
};

const CURRENCY_META = [
  { code: "USD", flag: "🇺🇸", label: "US Dollar", symbol: "$" },
  { code: "GBP", flag: "🇬🇧", label: "British Pound", symbol: "£" },
  { code: "EUR", flag: "🇪🇺", label: "Euro", symbol: "€" },
  { code: "CAD", flag: "🇨🇦", label: "Canadian Dollar", symbol: "C$" },
  { code: "AUD", flag: "🇦🇺", label: "Australian Dollar", symbol: "A$" },
  { code: "KES", flag: "🇰🇪", label: "Kenyan Shilling", symbol: "KSh" },
  { code: "NGN", flag: "🇳🇬", label: "Nigerian Naira", symbol: "₦" },
  { code: "ZAR", flag: "🇿🇦", label: "South African Rand", symbol: "R" },
  { code: "GHS", flag: "🇬🇭", label: "Ghanaian Cedi", symbol: "GH₵" },
];

const ONE_TIME_AMOUNTS = [55, 75, 100, 150];

const RECURRING_TIERS = [
  { name: "Bronze", amount: 100, perk: "Name in video credits" },
  { name: "Silver", amount: 250, perk: "Early access + credits" },
  { name: "Gold", amount: 500, perk: "Your child in a song" },
  { name: "Platinum", amount: 1000, perk: "Custom character cameo" },
];

const SUPPORTERS = [
  { name: "Catherine W.", initials: "CW", color: "#3B82F6", tier: "Gold", comment: "My kids love every episode!" },
  { name: "Keziah K.", initials: "KK", color: "#22C55E", tier: "$100", comment: "Representation matters. Thank you!" },
  { name: "Amina K.", initials: "AK", color: "#E24B4A", tier: "Silver", comment: "Educational AND fun!" },
];

const DONATE_NAV_LINKS = [
  { label: "About", href: "/#about" },
  { label: "Programs", href: "/#programs" },
  { label: "Impact", href: "/#impact" },
  { label: "Stories", href: "/#stories" },
  { label: "Donate", href: "/donate" },
  { label: "Contact", href: "/#contact" },
];

function DonatePage() {
  const [mode, setMode] = useState<"once" | "recurring">("once");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [customAmount, setCustomAmount] = useState("0");
  const [dedicate, setDedicate] = useState(false);
  const [showComment, setShowComment] = useState(false);
  const [comment, setComment] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currencyCode, setCurrencyCode] = useState("USD");
  const [rates, setRates] = useState<Record<string, number>>(FALLBACK_RATES);
  const [scrolled, setScrolled] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 0);
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const API_KEY = import.meta.env.VITE_EXCHANGE_RATE_API_KEY;
        const response = await fetch(
          `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/USD`
        );
        const data = await response.json();
        if (data.result === 'success') {
          setRates(data.conversion_rates);
        }
      } catch (error) {
        setRates(FALLBACK_RATES);
      }
    };
    fetchRates();
  }, []);

  const meta = CURRENCY_META.find((c) => c.code === currencyCode) ?? CURRENCY_META[0];
  const currency = { ...meta, rate: rates[currencyCode] ?? 1 };

  // Single source of truth: always read from customAmount
  const inputValue = parseFloat(customAmount) || 0;

  const formatNumber = (n: number) =>
    n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const isCustom = selectedIndex === -1;

  const conversionText = (() => {
    if (inputValue === 0) return "";
    const kesRate = rates.KES ?? 129;
    if (!isCustom) {
      // Tier selected — amount is always USD
      const kshAmount = inputValue * kesRate;
      return `≈ KSh ${formatNumber(kshAmount)}`;
    }
    // Custom amount — in selected currency
    const usdAmount = inputValue / currency.rate;
    const kshAmount = usdAmount * kesRate;
    if (currency.code === "USD") return `≈ KSh ${formatNumber(kshAmount)}`;
    if (currency.code === "KES") return `≈ $${formatNumber(usdAmount)} USD`;
    return `≈ $${formatNumber(usdAmount)} USD · KSh ${formatNumber(kshAmount)}`;
  })();

  const buttonText = (() => {
    const suffix = mode === "recurring" ? "/month" : "";
    const sym = isCustom ? currency.symbol : "$";
    return `\u{1F499} Donate ${sym}${formatNumber(inputValue)}${suffix}`;
  })();

  // Reset to 0 when mode changes
  useEffect(() => {
    setCustomAmount("0");
    setSelectedIndex(0);
  }, [mode]);

  // When a tier is selected, write the converted amount into the input
  function selectTier(i: number) {
    setSelectedIndex(i);
    const amt = mode === "once" ? ONE_TIME_AMOUNTS[i] : RECURRING_TIERS[i].amount;
    setCustomAmount(String(amt));
  }

  function handleDonate() {
    if (!email) {
      setEmailError(true);
      return;
    }
    setEmailError(false);
    initiatePaystack();
  }

  function initiatePaystack() {
    const amountInSmallestUnit = Math.round(inputValue * 100);

    const ref = `ABP-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;

    const PaystackPop = (window as any).PaystackPop;
    if (!PaystackPop) {
      alert("Payment system is loading. Please try again in a moment.");
      return;
    }

    const handler = PaystackPop.setup({
      key: "pk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
      email: email,
      amount: amountInSmallestUnit,
      currency: isCustom ? currencyCode : "USD",
      ref: ref,
      metadata: {
        custom_fields: [
          { display_name: "Donation Type", variable_name: "donation_type", value: mode },
          ...(mode === "recurring" ? [{ display_name: "Tier", variable_name: "tier", value: RECURRING_TIERS[selectedIndex].name }] : []),
          ...(dedicate ? [{ display_name: "Dedicated", variable_name: "dedicated", value: "yes" }] : []),
          ...(comment ? [{ display_name: "Comment", variable_name: "comment", value: comment }] : []),
        ],
      },
      callback: (response: any) => {
        alert(`Thank you for your donation! Reference: ${response.reference}`);
      },
      onClose: () => {},
    });
    handler.openIframe();
  }

  const youtubeVideoId = "gGeTgljHdA4";

  return (
    <div style={{ minHeight: "100vh", fontFamily: "sans-serif", display: "flex", flexDirection: "column" }}>
      {/* NAVBAR */}
      <nav
        role="navigation"
        aria-label="Donation page navigation"
        style={{
          background: "rgba(255,255,255,0.97)",
          backdropFilter: "blur(10px)",
          boxShadow: scrolled ? "0 2px 12px rgba(0,0,0,0.1)" : "none",
          transition: "box-shadow 0.3s ease",
          position: "sticky",
          top: 0,
          zIndex: 1000,
        }}
      >
        <div style={{
          maxWidth: "1280px", margin: "0 auto", padding: "10px 24px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          {/* Logo — links home */}
          <Link to="/" aria-label="Go to homepage" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none", flexShrink: 0 }}>
            <img src={amaresLogo} alt="" style={{ width: "48px", height: "48px", borderRadius: "50%", objectFit: "cover", border: "2px solid #0d1b3e" }} />
            <div style={{ display: "flex", flexDirection: "column" }}>
              <img src={amaresTitle} alt="Amare's Big Planet" className="donate-nav-title" style={{ height: "40px", width: "auto" }} />
            </div>
          </Link>

          {/* Center nav links — desktop only */}
          <div className="donate-nav-links" style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            {DONATE_NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`donate-nav-link${link.label === "Donate" ? " donate-nav-link--active" : ""}`}
                aria-current={link.label === "Donate" ? "page" : undefined}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right side actions */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px", flexShrink: 0 }}>
            {/* Secure trust pill — desktop only */}
            <div className="donate-nav-trust" style={{
              display: "flex", alignItems: "center", gap: "6px",
              background: "#f0fdf4", border: "1px solid #bbf7d0",
              borderRadius: "20px", padding: "5px 12px", fontSize: "12px",
              fontWeight: 600, color: "#166534",
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" style={{ flexShrink: 0 }}>
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0110 0v4"/>
              </svg>
              Secure
            </div>

            {/* Donate CTA button */}
            <a
              href="#donate-form"
              className="donate-nav-cta"
              aria-label="Donate now"
              style={{
                display: "inline-flex", alignItems: "center", gap: "6px",
                background: "#e0001b", color: "white", fontSize: "14px",
                fontWeight: 700, padding: "9px 20px", borderRadius: "24px",
                textDecoration: "none", transition: "all 0.2s", flexShrink: 0,
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "#b80015"; e.currentTarget.style.transform = "translateY(-1px)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "#e0001b"; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              Donate
            </a>

            {/* Hamburger — mobile only */}
            <button
              className="donate-nav-hamburger"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
              style={{
                display: "none", background: "none", border: "none",
                cursor: "pointer", padding: "6px", flexDirection: "column",
                gap: "4px", justifyContent: "center",
              }}
            >
              <span style={{
                display: "block", width: "22px", height: "2px", background: "#0d1b3e",
                borderRadius: "2px", transition: "all 0.3s",
                transform: mobileMenuOpen ? "rotate(45deg) translateY(6px)" : "none",
              }} />
              <span style={{
                display: "block", width: "22px", height: "2px", background: "#0d1b3e",
                borderRadius: "2px", transition: "all 0.3s",
                opacity: mobileMenuOpen ? 0 : 1,
              }} />
              <span style={{
                display: "block", width: "22px", height: "2px", background: "#0d1b3e",
                borderRadius: "2px", transition: "all 0.3s",
                transform: mobileMenuOpen ? "rotate(-45deg) translateY(-6px)" : "none",
              }} />
            </button>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        <div
          ref={mobileMenuRef}
          className="donate-mobile-menu"
          style={{
            maxHeight: mobileMenuOpen ? "400px" : "0",
            overflow: "hidden",
            transition: "max-height 0.3s ease",
            borderTop: mobileMenuOpen ? "1px solid #e5e7eb" : "none",
          }}
        >
          <div style={{ padding: "8px 24px 16px" }}>
            {DONATE_NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  display: "block", padding: "12px 0",
                  fontSize: "15px", fontWeight: link.label === "Donate" ? 700 : 500,
                  color: link.label === "Donate" ? "#e85d04" : "#0d1b3e",
                  textDecoration: "none",
                  borderBottom: "1px solid #f3f4f6",
                }}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* MAIN CONTENT — Split Screen */}
      <div style={{ flex: 1, position: "relative", overflow: "hidden", minHeight: "calc(100vh - 71px)" }}>

        {/* Video Background — Full Width (direct child of page wrapper) */}
        <video
          autoPlay
          muted
          loop
          playsInline
          style={{
            position: "absolute", top: 0, left: 0,
            width: "100%", height: "100%",
            objectFit: "cover", pointerEvents: "none", zIndex: 0,
          }}
        >
          <source src="/videos/donation-bg.mp4" type="video/mp4" />
        </video>

        {/* Dark overlay — full width */}
        <div style={{
          position: "absolute", top: 0, left: 0,
          width: "100%", height: "100%",
          background: "linear-gradient(to right, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.15) 100%)",
          zIndex: 1,
        }} />

        {/* Content layer — flex row above video + overlay */}
        <div className="donate-content-row" style={{ position: "relative", zIndex: 2, display: "flex", minHeight: "calc(100vh - 71px)" }}>

        {/* LEFT SIDE — Hero */}
        <div className="donate-hero" style={{
          flex: 1, position: "relative",
          display: "flex", flexDirection: "column", justifyContent: "center",
          padding: "60px 48px 40px",
        }}>

          {/* Floating live donation toast */}
          <div className="donate-hero-toast" style={{
            position: "absolute", top: "24px", right: "24px", zIndex: 4,
            display: "flex", alignItems: "center", gap: "10px",
            background: "rgba(255,255,255,0.95)", backdropFilter: "blur(8px)",
            borderRadius: "28px", padding: "8px 16px 8px 8px",
            boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
          }}>
            <div style={{
              width: "32px", height: "32px", borderRadius: "50%",
              background: "linear-gradient(135deg, #e85d04, #ff8c42)",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "white", fontSize: "12px", fontWeight: 700, flexShrink: 0,
            }}>CW</div>
            <div>
              <div style={{ fontSize: "12px", fontWeight: 600, color: "#0d1b3e" }}>
                Catherine W. just donated $50{" "}
                <span style={{ color: "#22c55e", fontSize: "8px" }}>{"\u25CF"}</span>
              </div>
            </div>
          </div>

          {/* Hero content */}
          <div style={{ position: "relative", zIndex: 3, maxWidth: "560px" }}>
            {/* Social proof pill */}
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              background: "rgba(255,255,255,0.12)", backdropFilter: "blur(4px)",
              border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: "20px", padding: "6px 14px", marginBottom: "24px",
              fontSize: "13px", color: "white", fontWeight: 500,
            }}>
              <span style={{ color: "#ffd166", letterSpacing: "1px" }}>{"\u2605\u2605\u2605\u2605\u2605"}</span>
              Trusted by 12,000+ families worldwide
            </div>

            {/* Headline */}
            <h1 className="donate-hero-headline" style={{
              fontSize: "56px", fontWeight: 800, lineHeight: 1.1,
              letterSpacing: "-1px", marginBottom: "20px",
            }}>
              <span style={{ color: "white" }}>Free learning adventures for</span>
              <br />
              <span style={{ color: "#ffd166" }}>every kid, everywhere.</span>
            </h1>

            {/* Subheadline */}
            <p style={{
              fontSize: "19px", color: "rgba(255,255,255,0.92)",
              maxWidth: "560px", lineHeight: 1.6, marginBottom: "32px",
            }}>
              Your donation brings free songs, stories, and learning adventures to kids aged 3&ndash;13 around the world. Every dollar helps Amar&eacute; and the Gear Crew reach more little explorers.
            </p>

            {/* Dual CTAs */}
            <div style={{ display: "flex", gap: "14px", flexWrap: "wrap", marginBottom: "40px" }}>
              <button
                onClick={() => {
                  const card = document.getElementById('donation-card');
                  if (card) {
                    const navbarHeight = 70;
                    const cardTop = card.getBoundingClientRect().top + window.scrollY - navbarHeight;
                    window.scrollTo({ top: cardTop, behavior: 'smooth' });
                    card.classList.add('donate-card-highlight');
                    card.addEventListener('animationend', () => {
                      card.classList.remove('donate-card-highlight');
                    }, { once: true });
                  }
                }}
                className="donate-hero-cta-primary"
                style={{
                  display: "inline-flex", alignItems: "center", gap: "8px",
                  background: "#e85d04", color: "white", fontSize: "16px",
                  fontWeight: 700, padding: "16px 32px", borderRadius: "30px",
                  textDecoration: "none", transition: "all 0.2s",
                  boxShadow: "0 6px 20px rgba(232,93,4,0.5)",
                  border: "none", cursor: "pointer",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "#ff8c42"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "#e85d04"; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                {"\u2764"} Donate Now {"\u2192"}
              </button>
              <a
                href="https://www.youtube.com/@AmaresBigPlanet"
                target="_blank"
                rel="noopener noreferrer"
                className="donate-hero-cta-secondary"
                style={{
                  display: "inline-flex", alignItems: "center", gap: "8px",
                  background: "rgba(255,255,255,0.1)", backdropFilter: "blur(4px)",
                  border: "1px solid rgba(255,255,255,0.3)",
                  color: "white", fontSize: "16px", fontWeight: 600,
                  padding: "16px 28px", borderRadius: "30px",
                  textDecoration: "none", transition: "all 0.2s",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.2)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.1)"; }}
              >
                {"\u25B6"} See Our Impact
              </a>
            </div>

            {/* Stats strip */}
            <div className="donate-hero-stats" style={{
              display: "flex", gap: "36px", flexWrap: "wrap",
              borderTop: "1px solid rgba(255,255,255,0.2)",
              paddingTop: "28px",
            }}>
              {[
                { number: "12,400+", label: "Children reached" },
                { number: "50", label: "Countries" },
                { number: "100%", label: "Goes to kids" },
                { number: "4.9\u2605", label: "Parent rating" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="donate-hero-stat-number" style={{ fontSize: "32px", fontWeight: 700, color: "#ffd166", lineHeight: 1.2 }}>{stat.number}</div>
                  <div style={{ fontSize: "12px", color: "white", textTransform: "uppercase", letterSpacing: "1.5px", marginTop: "4px" }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* RIGHT SIDE — Donation Card with frosted glass */}
        <div className="donate-card-wrapper" style={{
          width: "420px", flexShrink: 0, padding: "20px",
          display: "flex", alignItems: "center",
        }}>
        <div id="donation-card" style={{
          width: "100%", background: "rgba(255,255,255,0.88)",
          backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)",
          borderRadius: "16px", border: "1px solid rgba(255,255,255,0.3)",
          overflowY: "auto", padding: "32px",
          display: "flex", flexDirection: "column", justifyContent: "center",
          position: "relative",
        }}>
          {/* Heading */}
          <h2 style={{ textAlign: "center", fontSize: "16px", fontWeight: 700, color: "#1a1a2e", marginBottom: "16px" }}>
            Make an impact today!
          </h2>

          {/* Toggle */}
          <div style={{
            display: "flex", background: "#f0f0f0", borderRadius: "24px", padding: "3px", marginBottom: "16px",
          }}>
            {(["once", "recurring"] as const).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                style={{
                  flex: 1, padding: "8px 0", borderRadius: "22px", border: "none", cursor: "pointer",
                  fontSize: "13px", fontWeight: 600, transition: "all 0.2s",
                  background: mode === m ? "#1a1a2e" : "transparent",
                  color: mode === m ? "white" : "#555",
                }}
              >
                {m === "once" ? "Give once" : "Monthly \u{1F499}"}
              </button>
            ))}
          </div>

          {/* Tier Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginBottom: "16px" }}>
            {mode === "once"
              ? ONE_TIME_AMOUNTS.map((amt, i) => {
                  const isActive = selectedIndex === i && inputValue === amt;
                  return (
                    <button
                      key={amt}
                      onClick={() => selectTier(i)}
                      style={{
                        padding: "12px 8px", borderRadius: "10px", cursor: "pointer",
                        border: isActive ? "1.5px solid #3B82F6" : "1.5px solid #e0e0e0",
                        background: isActive ? "#f0f6ff" : "white",
                        textAlign: "center", transition: "all 0.15s",
                      }}
                    >
                      <div style={{ fontSize: "16px", fontWeight: 700, color: "#1a1a2e" }}>${amt}</div>
                    </button>
                  );
                })
              : RECURRING_TIERS.map((tier, i) => {
                  const isActive = selectedIndex === i && inputValue === tier.amount;
                  return (
                    <button
                      key={tier.name}
                      onClick={() => selectTier(i)}
                      style={{
                        padding: "10px 8px", borderRadius: "10px", cursor: "pointer",
                        border: isActive ? "1.5px solid #3B82F6" : "1.5px solid #e0e0e0",
                        background: isActive ? "#f0f6ff" : "white",
                        textAlign: "center", transition: "all 0.15s",
                      }}
                    >
                      <div style={{ fontSize: "11px", fontWeight: 700, color: "#3B82F6" }}>{tier.name}</div>
                      <div style={{ fontSize: "15px", fontWeight: 700, color: "#1a1a2e" }}>${tier.amount}/mo</div>
                      <div style={{ fontSize: "10px", color: "#888", marginTop: "2px" }}>{tier.perk}</div>
                    </button>
                  );
                })}
          </div>

          {/* Custom Amount with Currency Dropdown */}
          <div style={{
            border: "1.5px solid #e0e0e0", borderRadius: "10px", padding: "10px", marginBottom: "4px",
            transition: "border-color 0.2s", background: "white",
          }}>
            <div style={{ fontSize: "11px", color: "#888", marginBottom: "6px" }}>Or enter custom amount</div>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span style={{ fontSize: "15px", color: "#1a1a2e", fontWeight: 600 }}>{currency.symbol}</span>
              <input
                type="number"
                min="0"
                placeholder="0.00"
                value={customAmount}
                onChange={(e) => {
                  setCustomAmount(e.target.value);
                  setSelectedIndex(-1);
                }}
                onFocus={(e) => {
                  const parent = e.target.parentElement?.parentElement;
                  if (parent) parent.style.borderColor = "#3B82F6";
                }}
                onBlur={(e) => {
                  const parent = e.target.parentElement?.parentElement;
                  if (parent) parent.style.borderColor = "#e0e0e0";
                }}
                style={{
                  flex: 1, border: "none", outline: "none", fontSize: "15px", fontWeight: 600,
                  background: "transparent", minWidth: 0,
                }}
              />
              <select
                value={currencyCode}
                onChange={(e) => {
                  setCurrencyCode(e.target.value);
                  setSelectedIndex(-1);
                }}
                style={{
                  padding: "4px 6px", borderRadius: "6px",
                  border: "1px solid #e0e0e0", fontSize: "13px", fontWeight: 600,
                  color: "#1a1a2e", background: "#f5f5f5", outline: "none",
                  cursor: "pointer", flexShrink: 0,
                }}
              >
                {CURRENCY_META.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.flag} {c.code}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Conversion Display */}
          {conversionText && (
            <div style={{ fontSize: "11px", color: "#3B82F6", marginBottom: "12px", paddingLeft: "2px" }}>
              {conversionText}
            </div>
          )}
          {!conversionText && <div style={{ marginBottom: "12px" }} />}

          {/* Email */}
          <div style={{ marginBottom: "12px" }}>
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => { setEmail(e.target.value); if (e.target.value) setEmailError(false); }}
              style={{
                width: "100%", padding: "10px",
                border: emailError ? "1.5px solid #e02020" : "1.5px solid #e0e0e0",
                borderRadius: "10px", fontSize: "14px", outline: "none", boxSizing: "border-box",
                transition: "border-color 0.2s",
              }}
              onFocus={(e) => { if (!emailError) e.target.style.borderColor = "#3B82F6"; }}
              onBlur={(e) => { if (!emailError) e.target.style.borderColor = "#e0e0e0"; }}
            />
          </div>

          {/* Dedicate */}
          <label style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px", cursor: "pointer" }}>
            <input
              type="checkbox"
              checked={dedicate}
              onChange={(e) => setDedicate(e.target.checked)}
              style={{ accentColor: "#3B82F6", width: "15px", height: "15px" }}
            />
            <span style={{ fontSize: "12px", color: "#555" }}>Dedicate my donation</span>
          </label>

          {/* Add Comment */}
          <div style={{ marginBottom: "14px" }}>
            <button
              onClick={() => setShowComment(!showComment)}
              style={{
                background: "none", border: "none", cursor: "pointer",
                fontSize: "13px", color: "#555", padding: 0, display: "flex", alignItems: "center", gap: "4px",
              }}
            >
              {"\u{1F4AC}"} Add a comment
            </button>
            {showComment && (
              <textarea
                placeholder="Share why you support Amar&#233;'s Big Planet..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                style={{
                  width: "100%", marginTop: "8px", padding: "10px", border: "1.5px solid #e0e0e0",
                  borderRadius: "8px", fontSize: "12px", resize: "vertical", minHeight: "60px",
                  outline: "none", boxSizing: "border-box", fontFamily: "sans-serif",
                  transition: "border-color 0.2s",
                }}
                onFocus={(e) => { e.target.style.borderColor = "#3B82F6"; }}
                onBlur={(e) => { e.target.style.borderColor = "#e0e0e0"; }}
              />
            )}
          </div>

          {/* Donate Button */}
          <button
            onClick={handleDonate}
            style={{
              width: "100%", padding: "12px", borderRadius: "10px", border: "none",
              background: "#e02020", color: "white", fontWeight: 700, fontSize: "15px",
              cursor: "pointer", transition: "all 0.2s", marginBottom: "10px",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#c01010";
              e.currentTarget.style.transform = "scale(1.02)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#e02020";
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            {buttonText}
          </button>

          {/* Secure Payment */}
          <div style={{ textAlign: "center", fontSize: "10px", color: "#888", marginBottom: "16px" }}>
            {"\u{1F512}"} Secure payment via <span style={{ color: "#00C3F7", fontWeight: 700 }}>Paystack</span>
          </div>

          {/* Recent Supporters */}
          <div style={{ borderTop: "1px solid #eee", paddingTop: "14px" }}>
            <div style={{ fontSize: "12px", fontWeight: 600, color: "#1a1a2e", marginBottom: "10px" }}>Recent supporters</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {SUPPORTERS.map((s) => (
                <div key={s.name} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <div style={{
                    width: "28px", height: "28px", borderRadius: "50%", background: s.color,
                    color: "white", display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "11px", fontWeight: 700, flexShrink: 0,
                  }}>
                    {s.initials}
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <span style={{ fontSize: "12px", fontWeight: 700, color: "#1a1a2e" }}>{s.name}</span>
                      <span style={{ fontSize: "10px", color: "#888" }}>{"\u00B7"} {s.tier}</span>
                    </div>
                    <div style={{ fontSize: "11px", color: "#555", fontStyle: "italic" }}>"{s.comment}"</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        </div>
        </div>
      </div>

      {/* Responsive + navbar styles */}
      <style>{`
        /* Donation card highlight animation */
        @keyframes donateCardHighlight {
          0% { box-shadow: 0 0 0 0 rgba(224,32,32,0.4); }
          50% { box-shadow: 0 0 0 12px rgba(224,32,32,0); }
          100% { box-shadow: 0 0 0 0 rgba(224,32,32,0); }
        }
        .donate-card-highlight {
          animation: donateCardHighlight 0.6s ease;
        }

        /* Nav link base */
        .donate-nav-link {
          padding: 8px 14px;
          font-size: 14px;
          font-weight: 500;
          color: #0d1b3e;
          text-decoration: none;
          position: relative;
          transition: color 0.2s;
          border-radius: 8px;
        }
        .donate-nav-link:hover {
          color: #1a3a6e;
          background: rgba(13, 27, 62, 0.04);
        }
        .donate-nav-link:focus-visible {
          outline: 2px solid #e85d04;
          outline-offset: 2px;
          border-radius: 6px;
        }
        .donate-nav-link::after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 2.5px;
          background: #e85d04;
          border-radius: 2px;
          transition: width 0.2s;
        }
        .donate-nav-link:hover::after {
          width: 50%;
        }
        .donate-nav-link--active {
          color: #e85d04 !important;
          font-weight: 700;
        }
        .donate-nav-link--active::after {
          width: 60% !important;
          background: #e85d04;
        }

        /* Secure dot pulse */
        @keyframes securePulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.4); }
        }
        .donate-secure-dot {
          animation: securePulse 2s ease-in-out infinite;
        }

        /* Hero toast animations — only for users who allow motion */
        @keyframes heroToastSlideIn {
          from { opacity: 0; transform: translateX(40px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes heroToastFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        @media (prefers-reduced-motion: no-preference) {
          .donate-hero-toast {
            animation: heroToastSlideIn 0.5s ease-out, heroToastFloat 3s ease-in-out 0.5s infinite;
          }
        }

        /* Hero CTA focus states */
        .donate-hero-cta-primary:focus-visible,
        .donate-hero-cta-secondary:focus-visible {
          outline: 2px solid #ffd166;
          outline-offset: 3px;
        }

        /* Focus states for buttons */
        .donate-nav-cta:focus-visible,
        .donate-nav-hamburger:focus-visible {
          outline: 2px solid #e85d04;
          outline-offset: 2px;
        }

        /* Layout responsive */
        @media (max-width: 768px) {
          .donate-content-row {
            flex-direction: column !important;
          }
          .donate-card-wrapper {
            width: 100% !important;
            flex-shrink: unset !important;
          }
        }

        /* Hero responsive — under 900px */
        @media (max-width: 900px) {
          .donate-hero {
            padding: 40px 24px 60px !important;
          }
          .donate-hero-headline {
            font-size: 36px !important;
          }
          .donate-hero-stats {
            gap: 24px !important;
          }
          .donate-hero-stat-number {
            font-size: 24px !important;
          }
          .donate-hero-toast {
            top: 12px !important;
            right: 12px !important;
          }
          .donate-hero-cta-secondary {
            display: none !important;
          }
        }

        /* Navbar responsive — under 900px */
        @media (max-width: 900px) {
          .donate-nav-links {
            display: none !important;
          }
          .donate-nav-trust {
            display: none !important;
          }
          .donate-nav-hamburger {
            display: flex !important;
          }
          .donate-nav-title {
            height: 32px !important;
          }
        }

        @media (min-width: 901px) {
          .donate-mobile-menu {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
