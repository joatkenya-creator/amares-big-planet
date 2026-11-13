import { useEffect, useState } from "react";
import type { CSSProperties, MouseEvent } from "react";

const GAME_TITLE = "Amare's Big Planet: ABCs";
const GAME_ICON =
  "https://res.cloudinary.com/dee2vqvzl/image/upload/w_128,h_128,c_fill,g_south,q_auto,f_auto/v1794317595/WhatsApp_Image_2026-11-10_at_16.19.26_z15p6o.jpg";
const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.drawalet.app&referrer=utm_source%3Damaresbigplanet%26utm_medium%3Dpopup";
const APP_STORE_URL = "https://apps.apple.com/app/id6819274996";
const SHOP_URL = "https://amares-big-planet.myshopify.com/?utm_source=amaresbigplanet&utm_medium=popup";

export const APP_PROMO_CLOSED_KEY = "appPromoPopupClosed";

type Platform = "ios" | "android" | "desktop";

function detectPlatform(): Platform {
  const ua = navigator.userAgent;
  const isIOS = /iPhone|iPad|iPod/.test(ua) || (ua.includes("Macintosh") && navigator.maxTouchPoints > 1);
  if (isIOS) return "ios";
  if (/Android/.test(ua)) return "android";
  return "desktop";
}

const buttonBase: CSSProperties = {
  display: "block",
  textAlign: "center",
  borderRadius: 20,
  padding: "8px 16px",
  fontSize: 13,
  fontWeight: 700,
  textDecoration: "none",
  transition: "transform 0.2s, filter 0.2s",
};

function hoverOn(e: MouseEvent<HTMLAnchorElement>) {
  e.currentTarget.style.transform = "scale(1.04)";
  e.currentTarget.style.filter = "brightness(0.92)";
}
function hoverOff(e: MouseEvent<HTMLAnchorElement>) {
  e.currentTarget.style.transform = "scale(1)";
  e.currentTarget.style.filter = "none";
}

/** Bottom-right popup promoting the ABCs game (store button picked per device) and the Shopify shop. */
export function AppPromoPopup({ onClose }: { onClose: () => void }) {
  const [platform, setPlatform] = useState<Platform>("desktop");
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    setPlatform(detectPlatform());
  }, []);

  function close() {
    setClosing(true);
    setTimeout(() => {
      try {
        sessionStorage.setItem(APP_PROMO_CLOSED_KEY, "1");
      } catch {
        /* storage blocked: popup just shows again next visit */
      }
      onClose();
    }, 400);
  }

  const showPlay = platform !== "ios";
  const showAppStore = platform !== "android";

  return (
    <>
      <style>{`
        @keyframes appPromoSlideIn {
          from { transform: translateX(120%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes appPromoSlideOut {
          from { transform: translateX(0); opacity: 1; }
          to { transform: translateX(120%); opacity: 0; }
        }
        .app-promo-popup { right: 24px; bottom: 24px; max-width: 300px; }
        @media (max-width: 480px) {
          .app-promo-popup { right: 16px; left: 16px; bottom: 16px; max-width: none; }
        }
      `}</style>
      <div
        className="app-promo-popup"
        role="dialog"
        aria-label="Get the Amare's Big Planet game"
        style={{
          position: "fixed",
          zIndex: 999,
          background: "rgba(255,255,255,0.97)",
          backdropFilter: "blur(12px)",
          borderRadius: 14,
          padding: "16px 20px",
          boxShadow: "0 4px 24px rgba(0,0,0,0.15)",
          borderLeft: "4px solid #3B82F6",
          animation: closing ? "appPromoSlideOut 0.4s ease forwards" : "appPromoSlideIn 0.5s ease forwards",
        }}
      >
        <button
          onClick={close}
          aria-label="Close game popup"
          style={{
            position: "absolute",
            top: 8,
            right: 10,
            background: "none",
            border: "none",
            fontSize: 18,
            cursor: "pointer",
            color: "#999",
            lineHeight: 1,
          }}
        >
          ✕
        </button>

        <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 8, paddingRight: 16 }}>
          <img
            src={GAME_ICON}
            alt=""
            width={52}
            height={52}
            loading="lazy"
            style={{ borderRadius: 12, flexShrink: 0, boxShadow: "0 2px 8px rgba(0,0,0,0.15)" }}
          />
          <div>
            <p style={{ fontSize: 11, fontWeight: 700, color: "#3B82F6", margin: 0, letterSpacing: 0.5 }}>
              FREE GAME 🎮 · FOR PARENTS
            </p>
            <p style={{ fontWeight: 700, fontSize: 15, margin: "2px 0 0", color: "#1a1a2e", lineHeight: 1.25 }}>
              {GAME_TITLE}
            </p>
          </div>
        </div>
        <p style={{ fontSize: 13, color: "#555", margin: "0 0 12px", lineHeight: 1.4 }}>
          Trace letters, explore space and sing along with original ABP music. Free to download!
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {showAppStore && (
            <a
              href={APP_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{ ...buttonBase, background: "#111", color: "#fff" }}
              onMouseEnter={hoverOn}
              onMouseLeave={hoverOff}
            >
              Download free on the App Store
            </a>
          )}
          {showPlay && (
            <a
              href={PLAY_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{ ...buttonBase, background: "#22C55E", color: "#fff" }}
              onMouseEnter={hoverOn}
              onMouseLeave={hoverOff}
            >
              ▶ Get it free on Google Play
            </a>
          )}
          <a
            href={SHOP_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{ ...buttonBase, background: "#fff", color: "#e02020", border: "2px solid #e02020" }}
            onMouseEnter={hoverOn}
            onMouseLeave={hoverOff}
          >
            🛍️ Visit the Shop
          </a>
        </div>
        <p style={{ fontSize: 11, color: "#888", margin: "8px 0 0", textAlign: "center" }}>
          Christmas hoodies, sweatshirts &amp; tees for the whole family
        </p>
      </div>
    </>
  );
}
