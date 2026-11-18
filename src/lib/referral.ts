/**
 * Cookie consent + ambassador referral capture for amaresbigplanet.com.
 *
 * Part of the JOAT Global Brand Ambassador Programme (partners.joatkenya.com).
 * Mirrors src/lib/referral.ts in the JOAT repository.
 *
 * - A visit through an ambassador link (?ref=CODE) is always counted, with no
 *   cookie or identifier stored on the device.
 * - Only after a grown-up accepts cookies is a signed referral token issued
 *   and kept in a first-party cookie for 30 days (last click wins).
 * - The token travels to the shop on outgoing Shop links, so a purchase can be
 *   credited (the Shopify side arrives in Phase 4).
 * - Google Analytics and Clarity also wait for Accept (see __root.tsx).
 */

const TRACK_URL = "https://prkdfkkhqncxkyehokop.supabase.co/functions/v1/track-click";
const SHOP_HOST = "amares-big-planet.myshopify.com";
const CONSENT_KEY = "abp_consent";
const REF_COOKIE = "abp_ref";
const PENDING_CLICK = "abp_pending_click";
export const CONSENT_CHANGED = "abp:consent-changed";

export type Consent = "accepted" | "rejected" | null;

declare global {
  interface Window {
    amareLoadAnalytics?: () => void;
  }
}

type TrackResponse = {
  ok: boolean;
  click_id?: number;
  token?: string;
  max_age?: number;
  model?: string;
};

export function getConsent(): Consent {
  try {
    const v = localStorage.getItem(CONSENT_KEY);
    return v === "accepted" || v === "rejected" ? v : null;
  } catch {
    return null;
  }
}

async function track(body: Record<string, unknown>): Promise<TrackResponse | null> {
  try {
    const res = await fetch(TRACK_URL, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
      keepalive: true,
    });
    return res.ok ? ((await res.json()) as TrackResponse) : null;
  } catch {
    return null;
  }
}

function readCookie(name: string) {
  return document.cookie
    .split("; ")
    .find((c) => c.startsWith(`${name}=`))
    ?.slice(name.length + 1);
}

function keepToken(res: TrackResponse | null) {
  if (!res?.token || !res.max_age) return;
  if (res.model === "first_touch" && readCookie(REF_COOKIE)) return;
  document.cookie = `${REF_COOKIE}=${res.token}; Max-Age=${res.max_age}; Path=/; Secure; SameSite=Lax`;
}

/** Run once in the browser on first load. */
export function captureReferral() {
  const url = new URL(window.location.href);
  if (!url.searchParams.has("ref")) return;
  const landing = url.href;
  url.searchParams.delete("ref");
  url.searchParams.delete("ln");
  window.history.replaceState(window.history.state, "", url.pathname + url.search + url.hash);

  const consent = getConsent();
  void track({
    landing_url: landing,
    referrer: document.referrer,
    consent: consent === "accepted",
  }).then((res) => {
    if (consent === "accepted") keepToken(res);
    else if (consent === null && res?.click_id) {
      try {
        sessionStorage.setItem(PENDING_CLICK, String(res.click_id));
      } catch {
        /* storage blocked: the visit still counts */
      }
    }
  });
}

/**
 * Adds the referral token to links into the shop at the moment they're
 * clicked, so every Shop button (nav, footer, popups, holiday pages) carries it
 * without changing each one.
 */
export function carryReferralToShop() {
  const decorate = (e: MouseEvent) => {
    const token = readCookie(REF_COOKIE);
    if (!token) return;
    const a = (e.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
    if (!a) return;
    try {
      const url = new URL(a.href);
      if (url.host !== SHOP_HOST) return;
      url.searchParams.set("abp_ref", token);
      a.href = url.toString();
    } catch {
      /* not a normal link */
    }
  };
  document.addEventListener("click", decorate, true);
  document.addEventListener("auxclick", decorate, true);
}

export async function setConsent(choice: "accepted" | "rejected") {
  let pending: string | null = null;
  try {
    localStorage.setItem(CONSENT_KEY, choice);
    pending = sessionStorage.getItem(PENDING_CLICK);
    sessionStorage.removeItem(PENDING_CLICK);
  } catch {
    /* storage blocked: the choice applies to this page view only */
  }
  window.dispatchEvent(new Event(CONSENT_CHANGED));

  if (choice === "accepted") {
    window.amareLoadAnalytics?.();
    if (pending) keepToken(await track({ click_id: Number(pending), consent: true }));
  } else {
    document.cookie = `${REF_COOKIE}=; Max-Age=0; Path=/; Secure; SameSite=Lax`;
  }
}

/** Show the banner again ("Cookie settings"). */
export function resetConsent() {
  try {
    localStorage.removeItem(CONSENT_KEY);
  } catch {
    /* ignore */
  }
  window.dispatchEvent(new Event(CONSENT_CHANGED));
}
