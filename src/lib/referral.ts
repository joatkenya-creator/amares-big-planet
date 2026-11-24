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
 * - A visitor can also type an ambassador's code (AmbassadorCodeBox). That is
 *   an explicit request to credit that ambassador, so a token is issued and
 *   kept for this browser session only (sessionStorage), or in the 30-day
 *   cookie if cookies were accepted. A typed code is the newest touch.
 */

const FUNCTIONS = "https://prkdfkkhqncxkyehokop.supabase.co/functions/v1";
const TRACK_URL = `${FUNCTIONS}/track-click`;
const LOOKUP_URL = `${FUNCTIONS}/lookup-ambassador`;
const SHOP_HOST = "amares-big-planet.myshopify.com";
const CONSENT_KEY = "abp_consent";
const REF_COOKIE = "abp_ref";
const PENDING_CLICK = "abp_pending_click";
const CODE_KEY = "abp_code"; // sessionStorage: { code, name, token }
export const CONSENT_CHANGED = "abp:consent-changed";
export const CODE_CHANGED = "abp:code-changed";

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
  display_name?: string;
};

export type AppliedCode = { code: string; name: string; token: string };

export function getConsent(): Consent {
  try {
    const v = localStorage.getItem(CONSENT_KEY);
    return v === "accepted" || v === "rejected" ? v : null;
  } catch {
    return null;
  }
}

async function track(
  body: Record<string, unknown>,
  url = TRACK_URL,
): Promise<TrackResponse | null> {
  try {
    const res = await fetch(url, {
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
  removeCode(); // a newer link click beats an earlier typed code
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
    const token = getAppliedCode()?.token ?? readCookie(REF_COOKIE);
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

export function getAppliedCode(): AppliedCode | null {
  try {
    const v = JSON.parse(sessionStorage.getItem(CODE_KEY) ?? "null");
    return v?.token && v?.name && v?.code ? (v as AppliedCode) : null;
  } catch {
    return null;
  }
}

/**
 * Looks up a typed code, then records it as a referral. Returns the
 * ambassador's first name and last initial, or null ("couldn't find").
 */
export async function applyCode(input: string): Promise<AppliedCode | null> {
  const lookup = (await track({ code: input }, LOOKUP_URL)) as
    | (TrackResponse & { display_name?: string })
    | null;
  if (!lookup?.ok || !lookup.display_name) return null;
  const res = await track({ code: input, source: "code_site", landing_url: window.location.href });
  if (!res?.ok || !res.token) return null;
  const applied = {
    code: input.trim().toUpperCase(),
    name: res.display_name ?? lookup.display_name,
    token: res.token,
  };
  try {
    sessionStorage.setItem(CODE_KEY, JSON.stringify(applied));
  } catch {
    /* storage blocked: the code applies to links clicked on this page only */
  }
  if (getConsent() === "accepted") keepToken(res);
  window.dispatchEvent(new Event(CODE_CHANGED));
  return applied;
}

export function removeCode() {
  const applied = getAppliedCode();
  try {
    sessionStorage.removeItem(CODE_KEY);
  } catch {
    /* ignore */
  }
  if (!applied) return;
  if (readCookie(REF_COOKIE) === applied.token)
    document.cookie = `${REF_COOKIE}=; Max-Age=0; Path=/; Secure; SameSite=Lax`;
  window.dispatchEvent(new Event(CODE_CHANGED));
}
