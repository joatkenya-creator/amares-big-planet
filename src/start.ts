import { createMiddleware, createStart } from "@tanstack/react-start";

/**
 * Security headers for server-rendered responses.
 *
 * `public/_headers` only covers responses served straight from the static
 * asset store (`/assets/*`, `/videos/*`, `robots.txt`, ...). Anything rendered
 * by this Worker — every HTML page — never passes through that file, so the
 * headers below are what actually protect the pages themselves.
 */

// `@cloudflare/workers-types` isn't a dependency, so declare the sliver of
// HTMLRewriter we use. It is a Workers runtime global and absent under Node,
// hence the `typeof` guard before every use.
interface RewriterElement {
  setAttribute(name: string, value: string): void;
}
interface Rewriter {
  on(selector: string, handlers: { element(el: RewriterElement): void }): Rewriter;
  transform(response: Response): Response;
}
declare const HTMLRewriter: (new () => Rewriter) | undefined;

function createNonce(): string {
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  return btoa(String.fromCharCode(...bytes));
}

function buildCsp(nonce: string): string {
  return [
    "default-src 'self'",

    // The nonce is what actually stops XSS: an injected <script> can't guess a
    // fresh random value, so the browser refuses to run it. 'strict-dynamic'
    // lets a trusted script load further scripts (gtag.js, Clarity and
    // Paystack all inject tags at runtime) without allowlisting hosts.
    // Browsers that understand 'strict-dynamic' ignore both `https:` and
    // 'unsafe-inline'; those two exist purely as a fallback for older ones.
    `script-src 'nonce-${nonce}' 'strict-dynamic' https: 'unsafe-inline'`,

    // Kept permissive: React renders inline `style="..."` attributes during
    // SSR, so locking this down would need a much larger refactor for a far
    // smaller security win than script-src delivers.
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com",
    "img-src 'self' data: blob: https://img.youtube.com https://i.ytimg.com https://res.cloudinary.com https://www.googletagmanager.com https://*.clarity.ms",
    "media-src 'self' https://res.cloudinary.com",

    // Limits where a script may send data, so a successful injection still
    // can't exfiltrate anything.
    "connect-src 'self' https://open.er-api.com https://www.googletagmanager.com https://www.google-analytics.com https://*.google-analytics.com https://*.clarity.ms",

    "frame-src https://www.youtube.com https://www.youtube-nocookie.com https://checkout.paystack.com https://js.paystack.co",
    "frame-ancestors 'self'",
    "base-uri 'self'",
    "form-action 'self' https://checkout.paystack.com",
    "object-src 'none'",
    "upgrade-insecure-requests",
  ].join("; ");
}

function applyBaseHeaders(headers: Headers): void {
  headers.set("X-Content-Type-Options", "nosniff");
  headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  headers.set("X-Frame-Options", "SAMEORIGIN");
  headers.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
  headers.set("Permissions-Policy", "geolocation=(), microphone=(), camera=(), payment=(), usb=()");
  headers.set("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
}

const securityHeaders = createMiddleware({ type: "request" }).server(async ({ next }) => {
  const result = await next();
  const { response } = result;

  const isHtml = response.headers.get("content-type")?.includes("text/html") ?? false;
  const canRewrite = typeof HTMLRewriter !== "undefined";

  // Vite's dev server serves its own HMR client and inline bootstrap code;
  // enforcing a nonce policy there breaks hot reload without telling us
  // anything useful. The built output is what ships, so that's what we guard.
  const enforceCsp = isHtml && canRewrite && !import.meta.env.DEV;

  let body = response.body;
  const headers = new Headers(response.headers);
  applyBaseHeaders(headers);

  if (enforceCsp) {
    const nonce = createNonce();

    // Stamps every <script> the response contains — our own tags plus the
    // hydration scripts TanStack emits. Missing those would break the app,
    // which is why this runs over the whole document rather than only the
    // tags declared in route `head()`. HTMLRewriter streams, so this costs
    // no buffering and no TTFB.
    body = new HTMLRewriter!()
      .on("script", {
        element(el) {
          el.setAttribute("nonce", nonce);
        },
      })
      .transform(response).body;

    headers.set("Content-Security-Policy", buildCsp(nonce));
  }

  return {
    ...result,
    response: new Response(body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    }),
  };
});

export const startInstance = createStart(() => ({
  requestMiddleware: [securityHeaders],
}));
