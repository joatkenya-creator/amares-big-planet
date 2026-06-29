import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import amaresLogo from "@/assets/amares-logo.jpeg";
import amaresTitle from "@/assets/amares-title.png";

export const Route = createFileRoute("/donate")({
  component: DonatePage,
  head: () => ({
    meta: [
      { title: "Support — Amaré's Big Planet" },
      { name: "description", content: "Support Amaré's Big Planet — help create free, inclusive educational content for kids aged 1-10." },
    ],
    scripts: [
      { src: "https://js.paystack.co/v1/inline.js" },
    ],
  }),
});

declare global {
  interface Window {
    PaystackPop: {
      setup(options: {
        key: string;
        email: string;
        amount: number;
        currency?: string;
        ref?: string;
        metadata?: object;
        callback(response: { reference: string }): void;
        onClose(): void;
      }): { openIframe(): void };
    };
  }
}

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
  { label: "Articles", href: "/articles" },
  { label: "Support", href: "/donate" },
  { label: "Contact", href: "/#contact" },
];

function DonatePage() {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [mpesaLoading, setMpesaLoading] = useState(false);
  const [mpesaStatus, setMpesaStatus] = useState<"idle" | "sent" | "error">("idle");
  const [mpesaMessage, setMpesaMessage] = useState("");

  const [paystackName, setPaystackName] = useState("");
  const [paystackEmail, setPaystackEmail] = useState("");
  const [paystackPhone, setPaystackPhone] = useState("");
  const [paystackAmount, setPaystackAmount] = useState("");
  const [selectedPreset, setSelectedPreset] = useState<number | null>(null);
  const [paystackComment, setPaystackComment] = useState("");
  const [paystackLoading, setPaystackLoading] = useState(false);
  const [paystackStatus, setPaystackStatus] = useState<"idle" | "success" | "error">("idle");
  const [paystackMessage, setPaystackMessage] = useState("");

  function handlePaystackPay() {
    if (!paystackEmail || !paystackAmount || !paystackName) return;
    setPaystackLoading(true);
    setPaystackStatus("idle");
    try {
      const handler = window.PaystackPop.setup({
        key: "pk_live_3db3364e211e93d7d1fec40748a88cfc6edc8a7b",
        email: paystackEmail,
        amount: Math.round(parseFloat(paystackAmount) * 100),
        currency: "USD",
        ref: `amares_${Date.now()}_${Math.floor(Math.random() * 1000000)}`,
        metadata: {
          custom_fields: [
            { display_name: "Full Name", variable_name: "full_name", value: paystackName },
            { display_name: "Phone Number", variable_name: "phone", value: paystackPhone },
            { display_name: "Comment", variable_name: "comment", value: paystackComment },
          ],
        },
        callback(response: { reference: string }) {
          setPaystackLoading(false);
          setPaystackStatus("success");
          setPaystackMessage(`Thank you ${paystackName}! Your support means the world to us 💙 Ref: ${response.reference}`);
        },
        onClose() {
          setPaystackLoading(false);
        },
      });
      handler.openIframe();
    } catch {
      setPaystackLoading(false);
      setPaystackStatus("error");
      setPaystackMessage("Something went wrong. Please try again.");
    }
  }

  async function handleMpesaPay() {
    if (!phoneNumber || !amount) return;
    setMpesaLoading(true);
    setMpesaStatus("idle");
    try {
      const res = await fetch("/api/mpesa-stk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phoneNumber, amount: Number(amount) }),
      });
      const data = await res.json();
      if (data.ResponseCode === "0") {
        setMpesaStatus("sent");
        setMpesaMessage("Check your phone for the M-Pesa prompt and enter your PIN.");
      } else {
        setMpesaStatus("error");
        setMpesaMessage(data.error || data.errorMessage || data.CustomerMessage || "Something went wrong. Try again.");
      }
    } catch (err) {
      setMpesaStatus("error");
      setMpesaMessage(`Network error: ${err instanceof Error ? err.message : "Please check your connection and try again."}`);
    } finally {
      setMpesaLoading(false);
    }
  }

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 0);
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function copyToClipboard(text: string, field: string) {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    });
  }

  return (
    <div style={{ minHeight: "100vh", fontFamily: "sans-serif", display: "flex", flexDirection: "column" }}>
      {/* Fixed video background — stays behind all content */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
        tabIndex={-1}
        disablePictureInPicture
        controls={false}
        className="donate-fixed-video"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          objectFit: "cover",
          zIndex: 0,
          pointerEvents: "none",
        }}
      >
        <source src="https://res.cloudinary.com/dee2vqvzl/video/upload/q_auto,f_auto,w_1280/v1780915760/support_page_spqt59.mp4" type="video/mp4" />
      </video>
      {/* Fixed dark overlay */}
      <div
        className="donate-fixed-overlay"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          background: "rgba(0,0,0,0.5)",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />

      {/* NAVBAR */}
      <nav
        role="navigation"
        aria-label="Support page navigation"
        style={{
          background: scrolled ? "rgba(255,255,255,0.97)" : "transparent",
          backdropFilter: scrolled ? "blur(10px)" : "none",
          boxShadow: scrolled ? "0 2px 12px rgba(0,0,0,0.1)" : "none",
          transition: "background 0.3s ease, box-shadow 0.3s ease",
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
        }}
      >
        <div style={{
          maxWidth: "1280px", margin: "0 auto", padding: "10px 24px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          {/* Logo — links home */}
          <Link to="/" aria-label="Go to homepage" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none", flexShrink: 0 }}>
            <img src={amaresLogo} alt="Amare character" style={{ width: "48px", height: "48px", borderRadius: "50%", objectFit: "cover", border: "2px solid #0d1b3e" }} />
            <div style={{ display: "flex", flexDirection: "column" }}>
              <img src={amaresTitle} alt="Amare's Big Planet" className="donate-nav-title" style={{ height: "40px", width: "auto", filter: scrolled ? "none" : "drop-shadow(0 1px 3px rgba(0,0,0,0.7))", transition: "filter 0.3s ease" }} />
            </div>
          </Link>

          {/* Center nav links — desktop only */}
          <div className={`donate-nav-links${scrolled ? "" : " donate-nav-links--transparent"}`} style={{ display: "flex", alignItems: "center", gap: "4px" }}>
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
              background: scrolled ? "#f0fdf4" : "rgba(255,255,255,0.15)",
              border: scrolled ? "1px solid #bbf7d0" : "1px solid rgba(255,255,255,0.3)",
              borderRadius: "20px", padding: "5px 12px", fontSize: "12px",
              fontWeight: 600, color: scrolled ? "#166534" : "#fff",
              transition: "all 0.3s ease",
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
                display: "block", width: "22px", height: "2px", background: scrolled ? "#0d1b3e" : "#fff",
                borderRadius: "2px", transition: "all 0.3s",
                transform: mobileMenuOpen ? "rotate(45deg) translateY(6px)" : "none",
              }} />
              <span style={{
                display: "block", width: "22px", height: "2px", background: scrolled ? "#0d1b3e" : "#fff",
                borderRadius: "2px", transition: "all 0.3s",
                opacity: mobileMenuOpen ? 0 : 1,
              }} />
              <span style={{
                display: "block", width: "22px", height: "2px", background: scrolled ? "#0d1b3e" : "#fff",
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
      <div
        style={{
          flex: 1,
          position: "relative",
          minHeight: "100vh",
        }}
      >

        {/* Hero section — transparent so fixed video shows through */}
        <div className="donate-content-row" style={{ position: "relative", zIndex: 1, display: "flex", minHeight: "100vh", paddingTop: "71px" }}>

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
          background: "rgba(13,27,62,0.85)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
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

          {/* Paystack Section */}
          <div style={{
            background: "linear-gradient(135deg, #f0f9ff, #e0f2fe)", borderRadius: "12px",
            border: "1.5px solid #0ea5e9", padding: "20px", marginBottom: "0",
          }}>
            {/* Header */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
              <div style={{
                width: "36px", height: "36px", borderRadius: "8px",
                background: "#0ba4db", display: "flex", alignItems: "center",
                justifyContent: "center", flexShrink: 0,
              }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
                  <line x1="1" y1="10" x2="23" y2="10"/>
                </svg>
              </div>
              <h3 style={{ fontSize: "17px", fontWeight: 700, color: "#1a1a2e", margin: 0 }}>
                Support via Card / Bank
              </h3>
            </div>
            <p style={{ fontSize: "12px", color: "#666", margin: "0 0 14px 0", lineHeight: 1.4 }}>
              For supporters worldwide — pay with card or bank transfer
            </p>

            {/* Preset amount grid */}
            <div style={{ marginBottom: "12px" }}>
              <div style={{ fontSize: "12px", fontWeight: 600, color: "#555", marginBottom: "8px" }}>
                Select amount (USD)
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "6px", marginBottom: "8px" }}>
                {[5, 10, 25, 50, 100, 250].map((amt) => (
                  <button
                    key={amt}
                    onClick={() => { setSelectedPreset(amt); setPaystackAmount(String(amt)); }}
                    style={{
                      padding: "10px 4px", borderRadius: "8px", fontSize: "14px", fontWeight: 700,
                      cursor: "pointer", transition: "all 0.15s", border: "none",
                      background: selectedPreset === amt ? "#0ba4db" : "white",
                      color: selectedPreset === amt ? "white" : "#333",
                      boxShadow: selectedPreset === amt ? "0 2px 8px rgba(11,164,219,0.4)" : "0 1px 3px rgba(0,0,0,0.1)",
                    }}
                  >
                    ${amt}
                  </button>
                ))}
              </div>
              <input
                type="number"
                placeholder="Or enter custom amount"
                value={selectedPreset === null ? paystackAmount : ""}
                onFocus={() => setSelectedPreset(null)}
                onChange={(e) => { setSelectedPreset(null); setPaystackAmount(e.target.value); }}
                min="1"
                style={{
                  width: "100%", padding: "10px 14px", borderRadius: "8px", fontSize: "14px",
                  border: selectedPreset === null && paystackAmount ? "1.5px solid #0ba4db" : "1px solid #bae6fd",
                  boxSizing: "border-box", outline: "none", background: "white",
                }}
              />
            </div>

            {/* Form fields */}
            <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "12px" }}>
              <input
                type="text"
                placeholder="Full name"
                value={paystackName}
                onChange={(e) => setPaystackName(e.target.value)}
                style={{
                  width: "100%", padding: "12px 14px", borderRadius: "8px",
                  border: "1px solid #bae6fd", fontSize: "14px",
                  boxSizing: "border-box", outline: "none", background: "white",
                }}
              />
              <input
                type="email"
                placeholder="Email address"
                value={paystackEmail}
                onChange={(e) => setPaystackEmail(e.target.value)}
                style={{
                  width: "100%", padding: "12px 14px", borderRadius: "8px",
                  border: "1px solid #bae6fd", fontSize: "14px",
                  boxSizing: "border-box", outline: "none", background: "white",
                }}
              />
              <input
                type="tel"
                placeholder="Phone number"
                value={paystackPhone}
                onChange={(e) => setPaystackPhone(e.target.value)}
                style={{
                  width: "100%", padding: "12px 14px", borderRadius: "8px",
                  border: "1px solid #bae6fd", fontSize: "14px",
                  boxSizing: "border-box", outline: "none", background: "white",
                }}
              />
              <textarea
                placeholder="Leave a comment (optional)"
                value={paystackComment}
                onChange={(e) => setPaystackComment(e.target.value)}
                rows={2}
                style={{
                  width: "100%", padding: "12px 14px", borderRadius: "8px",
                  border: "1px solid #bae6fd", fontSize: "14px",
                  boxSizing: "border-box", outline: "none", background: "white",
                  resize: "none", fontFamily: "inherit",
                }}
              />
            </div>

            {/* Pay button */}
            <button
              onClick={handlePaystackPay}
              disabled={paystackLoading || !paystackEmail || !paystackName || (!paystackAmount && selectedPreset === null)}
              style={{
                width: "100%", padding: "14px", borderRadius: "28px",
                background: paystackLoading ? "#7dd3fc" : "#0ba4db",
                color: "white", fontSize: "16px", fontWeight: 700,
                border: "none", cursor: paystackLoading ? "not-allowed" : "pointer",
                transition: "all 0.2s", marginBottom: "10px",
                boxShadow: "0 4px 14px rgba(11,164,219,0.4)",
              }}
              onMouseEnter={(e) => { if (!paystackLoading) e.currentTarget.style.background = "#0284c7"; }}
              onMouseLeave={(e) => { if (!paystackLoading) e.currentTarget.style.background = "#0ba4db"; }}
            >
              {paystackLoading
                ? "Opening payment..."
                : `Support Now${paystackAmount ? ` — $${paystackAmount}` : ""}`}
            </button>

            {/* Status message */}
            {paystackStatus !== "idle" && (
              <div style={{
                padding: "10px 14px", borderRadius: "8px", fontSize: "13px",
                fontWeight: 500, textAlign: "center", marginBottom: "8px",
                background: paystackStatus === "success" ? "#E8F5E9" : "#FFEBEE",
                color: paystackStatus === "success" ? "#2E7D32" : "#C62828",
                border: `1px solid ${paystackStatus === "success" ? "#C8E6C9" : "#FFCDD2"}`,
              }}>
                {paystackMessage}
              </div>
            )}

            {/* Trust badge */}
            <div style={{ textAlign: "center", fontSize: "11px", color: "#888", fontWeight: 400 }}>
              🔒 Payments secured by <strong style={{ color: "#0ba4db" }}>Paystack</strong>
            </div>
          </div>

          {/* Divider with "or" */}
          <div style={{
            display: "flex", alignItems: "center", gap: "12px",
            margin: "16px 0",
          }}>
            <div style={{ flex: 1, height: "1px", background: "#ddd" }} />
            <span style={{ fontSize: "13px", color: "#999", fontWeight: 500 }}>or</span>
            <div style={{ flex: 1, height: "1px", background: "#ddd" }} />
          </div>

          {/* M-Pesa Payment Section */}
          <div style={{
            background: "linear-gradient(135deg, #e8f5e9, #f1f8e9)", borderRadius: "12px",
            border: "1.5px solid #4CAF50", padding: "20px", marginBottom: "16px",
          }}>
            <div style={{
              display: "flex", alignItems: "center", gap: "10px",
              background: "#4CAF50", borderRadius: "10px",
              padding: "12px 16px", marginBottom: "6px",
            }}>
              <img src="/safcom.png" alt="M-Pesa" style={{ height: "40px", width: "auto", flexShrink: 0 }} />
              <h3 style={{ fontSize: "17px", fontWeight: 700, color: "white", margin: 0 }}>
                Support via M-Pesa
              </h3>
            </div>
            <p style={{ fontSize: "12px", color: "#666", margin: "0 0 14px 0", lineHeight: 1.4 }}>
              For supporters in Kenya
            </p>


            {/* Phone + Amount inputs */}
            <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "12px" }}>
              <input
                type="tel"
                placeholder="Phone number (e.g. 0712345678)"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                style={{
                  width: "100%", padding: "12px 14px", borderRadius: "8px",
                  border: "1px solid #C8E6C9", fontSize: "15px", boxSizing: "border-box",
                  outline: "none", background: "white",
                }}
              />
              <input
                type="number"
                placeholder="Amount (KES)"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                min="1"
                style={{
                  width: "100%", padding: "12px 14px", borderRadius: "8px",
                  border: "1px solid #C8E6C9", fontSize: "15px", boxSizing: "border-box",
                  outline: "none", background: "white",
                }}
              />
            </div>

            {/* Pay button */}
            <button
              onClick={handleMpesaPay}
              disabled={mpesaLoading || !phoneNumber || !amount}
              style={{
                width: "100%", padding: "14px", borderRadius: "28px",
                background: mpesaLoading ? "#81C784" : "#4CAF50",
                color: "white", fontSize: "16px", fontWeight: 700,
                border: "none", cursor: mpesaLoading ? "not-allowed" : "pointer",
                transition: "all 0.2s", marginBottom: "10px",
              }}
            >
              {mpesaLoading ? "Sending prompt..." : "Pay with M-Pesa"}
            </button>

            {/* Status message */}
            {mpesaStatus !== "idle" && (
              <div style={{
                padding: "10px 14px", borderRadius: "8px", fontSize: "13px",
                fontWeight: 500, textAlign: "center", marginBottom: "8px",
                background: mpesaStatus === "sent" ? "#E8F5E9" : "#FFEBEE",
                color: mpesaStatus === "sent" ? "#2E7D32" : "#C62828",
                border: `1px solid ${mpesaStatus === "sent" ? "#C8E6C9" : "#FFCDD2"}`,
              }}>
                {mpesaMessage}
              </div>
            )}

            {/* Manual fallback — compact */}
            <div style={{
              fontSize: "12px", color: "#555", lineHeight: 1.6,
              background: "white", borderRadius: "8px", padding: "10px 14px",
              border: "1px solid #C8E6C9",
            }}>
              <span style={{ fontWeight: 600, color: "#2E7D32" }}>Or manually:</span>{" "}
              M-Pesa {"\u2192"} Lipa Na M-Pesa {"\u2192"} Pay Bill {"\u2192"}{" "}
              <strong>542542</strong> {"\u2192"} Account <strong>120129</strong> {"\u2192"} Amount {"\u2192"} Confirm
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

        /* Transparent navbar state — links turn white */
        .donate-nav-links--transparent .donate-nav-link {
          color: rgba(255,255,255,0.9);
          text-shadow: 0 1px 4px rgba(0,0,0,0.6);
        }
        .donate-nav-links--transparent .donate-nav-link:hover {
          color: #fff;
          background: rgba(255,255,255,0.1);
        }
        .donate-nav-links--transparent .donate-nav-link--active {
          color: #ffd166 !important;
          text-shadow: 0 1px 4px rgba(0,0,0,0.6);
        }
        .donate-nav-links--transparent .donate-nav-link--active::after {
          background: #ffd166;
        }
        .donate-nav-links--transparent .donate-nav-link::after {
          background: #ffd166;
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

        /* Mobile: iOS has issues with position:fixed inside scrollable containers.
           Fall back to absolute positioning covering the full document. */
        @supports (-webkit-touch-callout: none) {
          .donate-fixed-video,
          .donate-fixed-overlay {
            position: absolute !important;
            height: 100% !important;
            width: 100% !important;
          }
        }
      `}</style>
    </div>
  );
}
