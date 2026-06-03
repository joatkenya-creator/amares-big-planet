import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";

import appCss from "../styles.css?url";

const SITE_URL = "https://amaresbigplanet.com";
const SOCIAL_IMAGE = "https://res.cloudinary.com/dee2vqvzl/image/upload/v1778073832/1775135225431_1_zxvc1e.png";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Amare's Big Planet | Kids Learning Songs, ABCs & Space Videos" },
      { name: "description", content: "Watch Amare's Big Planet for kids learning songs, ABC songs, nursery rhymes, space adventures, ocean animals, and fun educational videos for children." },
      { name: "author", content: "Amare's Big Planet" },
      { property: "og:title", content: "Amare's Big Planet | Kids Learning Songs & Videos" },
      { property: "og:description", content: "ABC songs, nursery rhymes, space adventures, ocean animals, and fun educational videos for kids." },
      { property: "og:type", content: "website" },
      { property: "og:image", content: SOCIAL_IMAGE },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@AmaresBigPlanet" },
      { name: "twitter:image", content: SOCIAL_IMAGE },
    ],
    links: [
      {
        rel: "icon",
        type: "image/png",
        sizes: "512x512",
        href: "/favicon-512.png",
      },
      {
        rel: "apple-touch-icon",
        href: "/favicon-512.png",
      },
      {
        rel: "preconnect",
        href: "https://www.youtube.com",
      },
      {
        rel: "preconnect",
        href: "https://i.ytimg.com",
      },
      {
        rel: "preconnect",
        href: "https://img.youtube.com",
      },
      {
        rel: "preconnect",
        href: "https://res.cloudinary.com",
      },
      {
        rel: "preconnect",
        href: "https://fonts.googleapis.com",
      },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
    scripts: [
      {
        src: "https://www.googletagmanager.com/gtag/js?id=G-QFWHS1F4BW",
        async: true,
      },
      {
        children: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-QFWHS1F4BW');`,
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Amare's Big Planet",
          url: SITE_URL,
          logo: SOCIAL_IMAGE,
          sameAs: [
            "https://www.youtube.com/@amaresbigplanet",
            "https://www.instagram.com/_amaresbigplanet",
            "https://www.tiktok.com/@amaresbigplanet",
          ],
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Amare's Big Planet",
          url: SITE_URL,
          description: "Kids learning songs, nursery rhymes, ABC videos, space songs, and educational videos for children.",
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return <Outlet />;
}
