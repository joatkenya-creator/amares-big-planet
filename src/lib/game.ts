/** Shared details for the "Amare's Big Planet: ABCs" app, used by the homepage popup and Games section. */

export const GAME_TITLE = "Amare's Big Planet: ABCs";
export const GAME_DESCRIPTION = "Trace letters, explore space and sing along with original ABP music.";

const ICON_ID = "v1794317595/WhatsApp_Image_2026-11-10_at_16.19.26_z15p6o.jpg";

/** Square game icon from Cloudinary (allowed by the site's img-src CSP). */
export function gameIconUrl(size: number) {
  return `https://res.cloudinary.com/dee2vqvzl/image/upload/w_${size},h_${size},c_fill,g_south,q_auto,f_auto/${ICON_ID}`;
}

/** Google Play link; `medium` says where on the site the click came from (Play Console install referrer). */
export function playStoreUrl(medium: string) {
  const referrer = encodeURIComponent(`utm_source=amaresbigplanet&utm_medium=${medium}`);
  return `https://play.google.com/store/apps/details?id=com.drawalet.app&referrer=${referrer}`;
}

/** App Store link without a country code, so each visitor lands in their own store. */
export const APP_STORE_URL = "https://apps.apple.com/app/id6819274996";

export type Platform = "ios" | "android" | "desktop";

/** Browser-only: call from an effect, never during server render. */
export function detectPlatform(): Platform {
  const ua = navigator.userAgent;
  const isIOS = /iPhone|iPad|iPod/.test(ua) || (ua.includes("Macintosh") && navigator.maxTouchPoints > 1);
  if (isIOS) return "ios";
  if (/Android/.test(ua)) return "android";
  return "desktop";
}
