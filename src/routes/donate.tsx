import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
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

const EXCHANGE_RATES: Record<string, number> = {
  USD: 1, KES: 129, GBP: 0.79, EUR: 0.92, NGN: 1550, ZAR: 18.5, GHS: 15.2,
};

const CURRENCY_FLAGS: Record<string, string> = {
  USD: "\u{1F1FA}\u{1F1F8}", KES: "\u{1F1F0}\u{1F1EA}", GBP: "\u{1F1EC}\u{1F1E7}",
  EUR: "\u{1F1EA}\u{1F1FA}", NGN: "\u{1F1F3}\u{1F1EC}", ZAR: "\u{1F1FF}\u{1F1E6}", GHS: "\u{1F1EC}\u{1F1ED}",
};

const CURRENCY_SYMBOLS: Record<string, string> = {
  USD: "$", KES: "KSh", GBP: "\u00A3", EUR: "\u20AC", NGN: "\u20A6", ZAR: "R", GHS: "GH\u20B5",
};

const ONE_TIME_AMOUNTS = [55, 75, 100, 150];

const RECURRING_TIERS = [
  { name: "Bronze", amount: 10, perk: "Shout-out on social" },
  { name: "Silver", amount: 25, perk: "Name in credits" },
  { name: "Gold", amount: 50, perk: "Exclusive updates" },
  { name: "Platinum", amount: 100, perk: "Logo on website" },
];

const SUPPORTERS = [
  { name: "Catherine W.", initials: "CW", color: "#3B82F6", tier: "Gold", comment: "My kids love every episode!" },
  { name: "Keziah K.", initials: "KK", color: "#22C55E", tier: "$100", comment: "Representation matters. Thank you!" },
  { name: "Amina K.", initials: "AK", color: "#E24B4A", tier: "Silver", comment: "Educational AND fun!" },
];

function DonatePage() {
  const [mode, setMode] = useState<"once" | "recurring">("once");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [customAmount, setCustomAmount] = useState("0");
  const [currency, setCurrency] = useState("USD");
  const [dedicate, setDedicate] = useState(false);
  const [showComment, setShowComment] = useState(false);
  const [comment, setComment] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);

  // Single source of truth: always read from customAmount
  const inputValue = parseFloat(customAmount) || 0;

  // Convert the input value (in selected currency) to USD
  const amountInUSD = inputValue / EXCHANGE_RATES[currency];

  // Conversion text: always derived from the input field value
  const conversionText = (() => {
    if (inputValue <= 0) return `\u2248 KSh0.00`;
    const kesAmt = amountInUSD * EXCHANGE_RATES.KES;
    if (currency === "USD") {
      return `\u2248 KSh${kesAmt.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
    return `\u2248 $${amountInUSD.toFixed(2)} USD \u00B7 KSh${kesAmt.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  })();

  const buttonText = (() => {
    const sym = CURRENCY_SYMBOLS[currency];
    const suffix = mode === "recurring" ? "/month" : "";
    return `\u{1F499} Donate ${sym}${inputValue.toFixed(2)}${suffix}`;
  })();

  // Reset to 0 when mode changes
  useEffect(() => {
    setCustomAmount("0");
    setSelectedIndex(0);
  }, [mode]);

  // When a tier is selected, write the converted amount into the input
  function selectTier(i: number) {
    setSelectedIndex(i);
    const usdAmt = mode === "once" ? ONE_TIME_AMOUNTS[i] : RECURRING_TIERS[i].amount;
    const converted = usdAmt * EXCHANGE_RATES[currency];
    setCustomAmount(converted % 1 === 0 ? String(converted) : converted.toFixed(2));
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
    const paystackCurrency = ["NGN", "GHS", "ZAR", "KES", "USD"].includes(currency) ? currency : "USD";
    const amountInCurrency = amountInUSD * EXCHANGE_RATES[paystackCurrency];
    const amountInSmallestUnit = Math.round(amountInCurrency * 100);

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
      currency: paystackCurrency,
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

  const youtubeVideoId = "bRm-MR5inI4";

  return (
    <div style={{ minHeight: "100vh", fontFamily: "sans-serif", display: "flex", flexDirection: "column" }}>
      {/* NAVBAR */}
      <header style={{
        background: "rgba(255,255,255,0.95)", backdropFilter: "blur(8px)",
        borderBottom: "3px solid #2a2a6e", position: "sticky", top: 0, zIndex: 50,
      }}>
        <div style={{
          maxWidth: "1280px", margin: "0 auto", padding: "12px 24px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <Link to="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
            <img src={amaresLogo} alt="Amare character" style={{ width: "44px", height: "44px", borderRadius: "50%", objectFit: "cover", border: "2px solid #2a2a6e" }} />
            <img src={amaresTitle} alt="Amare's Big Planet logo" style={{ height: "44px", width: "auto" }} />
          </Link>
          <Link
            to="/"
            style={{
              display: "flex", alignItems: "center", gap: "6px",
              color: "#1a1a2e", fontSize: "14px", fontWeight: 600, textDecoration: "none",
              padding: "8px 16px", borderRadius: "24px", border: "1.5px solid #e0e0e0",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "#f5f5f5"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
          >
            <span style={{ fontSize: "18px" }}>{"\u2190"}</span> Back to Home
          </Link>
        </div>
      </header>

      {/* MAIN CONTENT — Split Screen */}
      <div style={{ flex: 1, display: "flex", minHeight: "calc(100vh - 71px)" }}>

        {/* LEFT SIDE — Video Background */}
        <div style={{
          flex: 1, position: "relative", overflow: "hidden",
          display: "flex", alignItems: "flex-end", padding: "48px 40px",
        }}>
          {/* YouTube Background */}
          <div style={{
            position: "absolute", inset: "-60px 0", pointerEvents: "none", zIndex: 0, overflow: "hidden",
          }}>
            <iframe
              src={`https://www.youtube.com/embed/${youtubeVideoId}?autoplay=1&mute=1&loop=1&playlist=${youtubeVideoId}&controls=0&showinfo=0&modestbranding=1&rel=0&playsinline=1`}
              style={{
                position: "absolute", top: "50%", left: "50%",
                width: "300%", height: "300%",
                transform: "translate(-50%, -50%)", border: "none",
              }}
              allow="autoplay; encrypted-media"
              allowFullScreen
              title="Background video"
            />
          </div>

          {/* Dark Overlay */}
          <div style={{
            position: "absolute", inset: 0, zIndex: 1,
            background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.5) 40%, rgba(0,0,0,0.3) 100%)",
          }} />

          {/* Left Content */}
          <div style={{ position: "relative", zIndex: 2, maxWidth: "480px" }}>
            <h1 style={{ fontSize: "28px", fontWeight: 900, color: "white", lineHeight: 1.3, marginBottom: "16px" }}>
              Unlock a world of learning —{" "}
              <span style={{ color: "#3B82F6" }}>for every child</span>
            </h1>
            <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.85)", maxWidth: "400px", lineHeight: 1.6, marginBottom: "28px" }}>
              Every donation helps Amar&eacute;'s Big Planet create free, inclusive educational content for kids aged 3-13. Your support brings songs, stories, and adventures to children around the world.
            </p>
            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
              {[
                { number: "50K+", label: "Kids reached" },
                { number: "85+", label: "Episodes" },
                { number: "127", label: "Sponsors" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div style={{ fontSize: "20px", fontWeight: 700, color: "white" }}>{stat.number}</div>
                  <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.7)" }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT SIDE — Donation Card */}
        <div style={{
          width: "400px", flexShrink: 0, background: "#fafafa",
          overflowY: "auto", padding: "32px", paddingTop: "64px",
          display: "flex", flexDirection: "column", justifyContent: "center",
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
                {m === "once" ? "Give once" : "Recurring \u{1F499}"}
              </button>
            ))}
          </div>

          {/* Tier Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginBottom: "16px" }}>
            {mode === "once"
              ? ONE_TIME_AMOUNTS.map((amt, i) => {
                  const tierConverted = amt * EXCHANGE_RATES[currency];
                  const isActive = selectedIndex === i && inputValue === tierConverted;
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
                  const tierConverted = tier.amount * EXCHANGE_RATES[currency];
                  const isActive = selectedIndex === i && inputValue === tierConverted;
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

          {/* Custom Amount */}
          <div style={{
            border: "1.5px solid #e0e0e0", borderRadius: "10px", padding: "10px", marginBottom: "12px",
            transition: "border-color 0.2s", background: "white",
          }}>
            <div style={{ fontSize: "11px", color: "#888", marginBottom: "6px" }}>Or enter custom amount</div>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span style={{ fontSize: "15px", color: "#1a1a2e", fontWeight: 600 }}>{CURRENCY_SYMBOLS[currency]}</span>
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
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                style={{
                  border: "1px solid #e0e0e0", borderRadius: "6px", padding: "4px 6px",
                  fontSize: "12px", background: "white", cursor: "pointer", outline: "none",
                }}
              >
                {Object.keys(EXCHANGE_RATES).map((cur) => (
                  <option key={cur} value={cur}>
                    {CURRENCY_FLAGS[cur]} {cur}
                  </option>
                ))}
              </select>
            </div>
            {conversionText && (
              <div style={{ fontSize: "11px", color: "#3B82F6", marginTop: "6px" }}>{conversionText}</div>
            )}
          </div>

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

      {/* Responsive: stack on mobile */}
      <style>{`
        @media (max-width: 768px) {
          div[style*="min-height: calc(100vh - 71px)"] {
            flex-direction: column !important;
          }
          div[style*="width: 400px"] {
            width: 100% !important;
            flex-shrink: unset !important;
          }
        }
      `}</style>
    </div>
  );
}
