import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import amaresLogo from "@/assets/amares-logo.jpeg";
import amaresTitle from "@/assets/amares-title.png";
import amareHero from "@/assets/amare-hero.jpg";

export const Route = createFileRoute("/donate")({
  component: DonatePage,
  head: () => ({
    meta: [
      { title: "Support — Amaré's Big Planet" },
      { name: "description", content: "Support Amaré's Big Planet — help create free, inclusive educational content for kids aged 1-10." },
    ],
    scripts: [],
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
  { name: "\u{1F680} Explorer", amount: 100, perk: "Name on Supporters Wall" },
  { name: "\u{1F30D} Galaxy Builder", amount: 250, perk: "Early access + digital thank-you pack" },
  { name: "\u2B50 Star Creator", amount: 500, perk: "Your child\u2019s name featured in episode credits" },
  { name: "\u{1FA90} Planet Champion", amount: 1000, perk: "Custom animated cameo + private virtual meet" },
];

const SUPPORTERS = [
  { name: "Catherine W.", initials: "CW", color: "#3B82F6", tier: "\u2B50 Star Creator", comment: "My kids love every episode!" },
  { name: "Keziah K.", initials: "KK", color: "#22C55E", tier: "$100", comment: "Representation matters. Thank you!" },
  { name: "Amina K.", initials: "AK", color: "#E24B4A", tier: "\u{1F30D} Galaxy Builder", comment: "Educational AND fun!" },
  { name: "James M.", initials: "JM", color: "#F59E0B", tier: "\u{1F680} Explorer · $25", comment: "Love what you're doing for kids!" },
  { name: "Sarah O.", initials: "SO", color: "#8B5CF6", tier: "\u2B50 Star Creator · $100", comment: "My daughter watches every episode!" },
  { name: "David N.", initials: "DN", color: "#06B6D4", tier: "\u{1F30D} Galaxy Builder · $50", comment: "Keep up the amazing work!" },
  { name: "Lisa W.", initials: "LW", color: "#EC4899", tier: "\u{1F680} Explorer · $30", comment: "Amaré is my son's favorite!" },
  { name: "Peter K.", initials: "PK", color: "#10B981", tier: "\u2B50 Star Creator · $150", comment: "Education through fun, brilliant!" },
];

const DONATE_NAV_LINKS = [
  { label: "About", href: "/#about" },
  { label: "Programs", href: "/#programs" },
  { label: "Impact", href: "/#impact" },
  { label: "Stories", href: "/#stories" },
  { label: "Blog", href: "/blog" },
  { label: "Support", href: "/donate" },
  { label: "Contact", href: "/#contact" },
];

function DonatePage() {
  const [mode, setMode] = useState<"once" | "recurring">("once");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [customAmount, setCustomAmount] = useState(String(ONE_TIME_AMOUNTS[0]));
  const [copiedField, setCopiedField] = useState<string | null>(null);
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

  function copyToClipboard(text: string, field: string) {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    });
  }

  // Reset to first tier when mode changes
  useEffect(() => {
    const amt = mode === "once" ? ONE_TIME_AMOUNTS[0] : RECURRING_TIERS[0].amount;
    setCustomAmount(String(amt));
    setSelectedIndex(0);
  }, [mode]);

  // When a tier is selected, write the converted amount into the input
  function selectTier(i: number) {
    setSelectedIndex(i);
    const amt = mode === "once" ? ONE_TIME_AMOUNTS[i] : RECURRING_TIERS[i].amount;
    setCustomAmount(String(amt));
  }

  return (
    <div style={{ minHeight: "100vh", fontFamily: "sans-serif", display: "flex", flexDirection: "column" }}>
      {/* NAVBAR */}
      <nav
        role="navigation"
        aria-label="Support page navigation"
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
                className={`donate-nav-link${link.label === "Support" ? " donate-nav-link--active" : ""}`}
                aria-current={link.label === "Support" ? "page" : undefined}
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

            {/* Support CTA button */}
            <a
              href="#donate-form"
              className="donate-nav-cta"
              aria-label="Support now"
              style={{
                display: "inline-flex", alignItems: "center", gap: "6px",
                background: "#e0001b", color: "white", fontSize: "14px",
                fontWeight: 700, padding: "9px 20px", borderRadius: "24px",
                textDecoration: "none", transition: "all 0.2s", flexShrink: 0,
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "#b80015"; e.currentTarget.style.transform = "translateY(-1px)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "#e0001b"; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              Support
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
                  fontSize: "15px", fontWeight: link.label === "Support" ? 700 : 500,
                  color: link.label === "Support" ? "#e85d04" : "#0d1b3e",
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

        {/* Video Background — YouTube iframe (hidden on mobile, replaced by bg image) */}
        <div className="donate-hero-video-wrap" style={{
          position: "absolute", top: 0, left: 0,
          width: "100%", height: "100%",
          overflow: "hidden", zIndex: 0,
          backgroundImage: `url(${amareHero})`,
          backgroundSize: "cover", backgroundPosition: "center",
        }}>
          <iframe
            className="donate-hero-youtube"
            src="https://www.youtube.com/embed/_cZMYWcZlNc?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&playlist=_cZMYWcZlNc&playsinline=1&modestbranding=1&disablekb=1"
            title="Background video"
            allow="autoplay; encrypted-media"
            style={{
              position: "absolute",
              top: "50%", left: "50%",
              transform: "translate(-50%, -50%)",
              width: "100vw", height: "100vh",
              minWidth: "100%", minHeight: "100%",
              border: "none",
              pointerEvents: "none",
              zIndex: 0,
            }}
          />
        </div>

        {/* Dark overlay — full width */}
        <div style={{
          position: "absolute", top: 0, left: 0,
          width: "100%", height: "100%",
          background: "linear-gradient(to right, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.55) 50%, rgba(0,0,0,0.35) 100%)",
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
                Catherine W. just contributed $50{" "}
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
              Your support brings free songs, stories, and learning adventures to kids aged 1&ndash;10 around the world. Every dollar helps Amar&eacute; and the Gear Crew reach more little explorers.
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
                {"\u2764"} Support Now {"\u2192"}
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

            {/* Social Proof Bar */}
            <div className="donate-social-proof-bar" style={{
              display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "10px",
              marginTop: "24px", paddingTop: "20px",
            }}>
              {[
                { icon: <svg width="26" height="26" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="5" width="24" height="18" rx="5" fill="#FF0000"/><polygon points="11.5,9.5 11.5,18.5 19.5,14" fill="#FFFFFF"/></svg>, number: "16,400+", label: "YouTube subscribers" },
                { icon: "\uD83C\uDF0D", number: "50+", label: "Countries watching" },
                { icon: "\uD83C\uDFAC", number: "191", label: "Episodes created" },
                { icon: "\u2B50", number: "4.9\u2605", label: "Parent rating" },
              ].map((stat) => (
                <div key={stat.label} style={{
                  display: "flex", flexDirection: "column", alignItems: "center",
                  gap: "4px", padding: "10px 6px",
                  background: "rgba(255,255,255,0.08)", backdropFilter: "blur(4px)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  borderRadius: "10px", textAlign: "center",
                }}>
                  <span style={{ fontSize: "18px", lineHeight: 1 }}>{stat.icon}</span>
                  <span style={{ fontSize: "15px", fontWeight: 700, color: "#ffd166", lineHeight: 1.2 }}>{stat.number}</span>
                  <span style={{ fontSize: "10px", color: "rgba(255,255,255,0.8)", fontWeight: 500, lineHeight: 1.2 }}>{stat.label}</span>
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
          {/* Mission Statement + Heading */}
          <p style={{ textAlign: "center", fontSize: "12px", color: "#777", lineHeight: 1.5, marginBottom: "8px", fontWeight: 400 }}>
            Help us build educational adventures that inspire children around the world through music, storytelling, animation, and imagination.
          </p>
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

          {/* M-Pesa Payment Section */}
          <div style={{
            background: "linear-gradient(135deg, #e8f5e9, #f1f8e9)", borderRadius: "12px",
            border: "1.5px solid #4CAF50", padding: "20px", marginBottom: "16px",
          }}>
            <div style={{
              display: "flex", alignItems: "center", gap: "10px",
              background: "#4CAF50", borderRadius: "10px",
              padding: "12px 16px", marginBottom: "14px",
            }}>
              <div style={{
                width: "36px", height: "36px", borderRadius: "50%", background: "white",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "#4CAF50", fontSize: "18px", fontWeight: 800, flexShrink: 0,
              }}>M</div>
              <h3 style={{ fontSize: "17px", fontWeight: 700, color: "white", margin: 0 }}>
                Pay via M-Pesa
              </h3>
            </div>

            {/* Suggested Amounts */}
            <div style={{ marginBottom: "14px" }}>
              <div style={{ fontSize: "11px", color: "#666", marginBottom: "8px", fontWeight: 500 }}>
                Suggested amounts (send any amount you like)
              </div>
              <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                {["KSh 500", "KSh 1,000", "KSh 2,500", "KSh 5,000"].map((amt) => (
                  <span key={amt} style={{
                    background: "white", border: "1px solid #C8E6C9", borderRadius: "20px",
                    padding: "6px 14px", fontSize: "13px", fontWeight: 600,
                    color: "#2E7D32", cursor: "default",
                  }}>{amt}</span>
                ))}
              </div>
            </div>

            {/* Payment Details — copyable */}
            <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "16px" }}>
              {[
                { label: "Paybill Number", value: "542542", copyable: true, big: true },
                { label: "Account Number", value: "120129", copyable: true, big: true },
                { label: "Account Name", value: "Jack Urban Services Ltd", copyable: false, big: false },
              ].map((item) => (
                <div key={item.label} style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  background: "white", borderRadius: "8px", padding: item.big ? "12px 14px" : "10px 12px",
                  border: "1px solid #C8E6C9",
                }}>
                  <div>
                    <div style={{ fontSize: "10px", color: "#666", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.5px" }}>{item.label}</div>
                    <div style={{ fontSize: item.big ? "22px" : "15px", fontWeight: 800, color: "#1a1a2e", fontFamily: "monospace", letterSpacing: item.big ? "1px" : "0" }}>{item.value}</div>
                  </div>
                  {item.copyable && (
                    <button
                      onClick={() => copyToClipboard(item.value, item.label)}
                      style={{
                        background: copiedField === item.label ? "#4CAF50" : "#E8F5E9",
                        border: "1px solid #4CAF50", borderRadius: "6px",
                        padding: "6px 12px", cursor: "pointer", fontSize: "11px",
                        fontWeight: 600, color: copiedField === item.label ? "white" : "#2E7D32",
                        transition: "all 0.2s", flexShrink: 0,
                      }}
                    >
                      {copiedField === item.label ? "Copied!" : "Copy"}
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Steps — compact */}
            <div style={{
              fontSize: "13px", color: "#333", lineHeight: 1.7,
              background: "white", borderRadius: "8px", padding: "10px 14px",
              border: "1px solid #C8E6C9",
            }}>
              <span style={{ fontWeight: 600, color: "#2E7D32" }}>On your phone:</span>{" "}
              M-Pesa → Lipa Na M-Pesa → Pay Bill → Enter <strong>542542</strong> → Account <strong>120129</strong> → Enter amount → Confirm ✓
            </div>
          </div>

          {/* Confirmation Note — subtle */}
          <div style={{
            textAlign: "center", fontSize: "11px", color: "#4CAF50",
            background: "#f0fdf4", borderRadius: "6px", padding: "8px 12px",
            marginBottom: "6px", fontWeight: 500, lineHeight: 1.5,
          }}>
            Once you've sent your M-Pesa payment, you're all set! Thank you for supporting Amar&eacute;'s Big Planet 💚
          </div>

          {/* Trust element */}
          <div style={{
            textAlign: "center", fontSize: "11px", color: "#888",
            marginBottom: "16px", fontWeight: 400,
          }}>
            🔒 M-Pesa payments are processed securely by Safaricom
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

          {/* Where Your Support Goes */}
          <div style={{
            background: "#f9fafb", borderRadius: "12px", padding: "16px",
            marginTop: "16px",
          }}>
            <div style={{ fontSize: "13px", fontWeight: 700, color: "#1a1a2e", marginBottom: "12px" }}>
              Where Your Support Goes
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
              {[
                { icon: "\u{1F3AC}", label: "Animation production" },
                { icon: "\u{1F3B5}", label: "Educational music" },
                { icon: "\u{1F3AE}", label: "Roblox/game development" },
                { icon: "\u{1F30D}", label: "Global children\u2019s content" },
              ].map((item) => (
                <div key={item.label} style={{
                  display: "flex", alignItems: "center", gap: "8px",
                  background: "white", borderRadius: "8px", padding: "10px 12px",
                }}>
                  <span style={{ fontSize: "18px", lineHeight: 1 }}>{item.icon}</span>
                  <span style={{ fontSize: "12px", fontWeight: 600, color: "#444" }}>{item.label}</span>
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
          .donate-hero-youtube {
            display: none !important;
          }
        }

        /* Social proof bar — 2x2 on mobile */
        @media (max-width: 600px) {
          .donate-social-proof-bar {
            grid-template-columns: repeat(2, 1fr) !important;
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
