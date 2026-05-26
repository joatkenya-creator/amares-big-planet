import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { articles } from "@/lib/articles";
import amaresLogo from "@/assets/amares-logo.jpeg";
import amaresTitle from "@/assets/amares-title.png";

export const Route = createFileRoute("/articles")({
  component: ArticlesPage,
  head: () => ({
    meta: [
      { title: "Learning Hub | Amare's Big Planet" },
      { name: "description", content: "Parent-friendly guides about inclusive learning, autism-friendly kids videos, ABC songs, music, space, ocean animals, and educational videos for children." },
      { property: "og:title", content: "Learning Hub | Amare's Big Planet" },
      { property: "og:description", content: "Helpful guides for parents, teachers, and little explorers." },
      { property: "og:url", content: "https://amaresbigplanet.com/articles" },
    ],
    links: [
      { rel: "canonical", href: "https://amaresbigplanet.com/articles" },
    ],
  }),
});

const NAV_LINKS = [
  { label: "About", href: "/#about" },
  { label: "Programs", href: "/#programs" },
  { label: "Impact", href: "/#impact" },
  { label: "Stories", href: "/#stories" },
  { label: "Articles", href: "/articles" },
  { label: "Contact", href: "/#contact" },
];

function ArticlesPage() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 0);
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (pathname !== "/articles") {
    return <Outlet />;
  }

  return (
    <main className="min-h-screen bg-[#f4fbff] text-[#10172a]">
      {/* NAVBAR */}
      <nav
        role="navigation"
        aria-label="Articles page navigation"
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
          <Link to="/" aria-label="Go to homepage" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none", flexShrink: 0 }}>
            <img src={amaresLogo} alt="" style={{ width: "48px", height: "48px", borderRadius: "50%", objectFit: "cover", border: "2px solid #0d1b3e" }} />
            <img src={amaresTitle} alt="Amare's Big Planet" className="articles-nav-title" style={{ height: "40px", width: "auto" }} />
          </Link>

          {/* Desktop nav links */}
          <div className="articles-nav-links" style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`articles-nav-link${link.label === "Articles" ? " articles-nav-link--active" : ""}`}
                aria-current={link.label === "Articles" ? "page" : undefined}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right side: YouTube + Support + Hamburger */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px", flexShrink: 0 }}>
            <a
              href="https://www.youtube.com/@amaresbigplanet"
              target="_blank"
              rel="noopener noreferrer"
              className="articles-nav-yt"
              style={{
                display: "inline-flex", alignItems: "center", gap: "6px",
                background: "#fff", color: "#e02020", fontSize: "13px",
                fontWeight: 700, padding: "7px 14px", borderRadius: "20px",
                textDecoration: "none", border: "1.5px solid #e02020",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "#e02020"; e.currentTarget.style.color = "#fff"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.color = "#e02020"; }}
            >
              YouTube
            </a>
            <Link
              to="/donate"
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
            </Link>

            {/* Hamburger — mobile only */}
            <button
              className="articles-nav-hamburger"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
              style={{
                display: "none", background: "none", border: "none",
                cursor: "pointer", padding: "6px", flexDirection: "column",
                gap: "4px", justifyContent: "center",
              }}
            >
              <span style={{ display: "block", width: "22px", height: "2px", background: "#0d1b3e", borderRadius: "2px", transition: "all 0.3s", transform: mobileMenuOpen ? "rotate(45deg) translateY(6px)" : "none" }} />
              <span style={{ display: "block", width: "22px", height: "2px", background: "#0d1b3e", borderRadius: "2px", transition: "all 0.3s", opacity: mobileMenuOpen ? 0 : 1 }} />
              <span style={{ display: "block", width: "22px", height: "2px", background: "#0d1b3e", borderRadius: "2px", transition: "all 0.3s", transform: mobileMenuOpen ? "rotate(-45deg) translateY(-6px)" : "none" }} />
            </button>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        <div
          className="articles-mobile-menu"
          style={{
            maxHeight: mobileMenuOpen ? "400px" : "0",
            overflow: "hidden",
            transition: "max-height 0.3s ease",
            borderTop: mobileMenuOpen ? "1px solid #e5e7eb" : "none",
          }}
        >
          <div style={{ padding: "8px 24px 16px" }}>
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  display: "block", padding: "12px 0", fontSize: "15px",
                  fontWeight: link.label === "Articles" ? 700 : 500,
                  color: link.label === "Articles" ? "#e85d04" : "#0d1b3e",
                  textDecoration: "none", borderBottom: "1px solid #f3f4f6",
                }}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* HERO — compact so article cards show above fold */}
      <section className="bg-[#dff5ff]">
        <div className="mx-auto max-w-6xl px-4 py-8 text-center">
          <p className="text-sm font-extrabold uppercase tracking-[0.22em] text-[#0f7c90]">Parent Guides</p>
          <h1 className="mx-auto mt-3 max-w-4xl text-3xl font-extrabold leading-tight sm:text-5xl">
            Learning Hub for Every Little Explorer
          </h1>
          <p className="mx-auto mt-3 max-w-3xl text-base font-medium text-[#4b5f75] sm:text-lg">
            Helpful guides about inclusive learning, autism-friendly kids videos, ABC songs, music, space, ocean animals, and joyful learning at home.
          </p>
        </div>
      </section>

      {/* NAV STYLES */}
      <style>{`
        .articles-nav-link {
          padding: 8px 14px;
          font-size: 14px;
          font-weight: 500;
          color: #0d1b3e;
          text-decoration: none;
          position: relative;
          transition: color 0.2s;
          border-radius: 8px;
        }
        .articles-nav-link:hover {
          color: #1a3a6e;
          background: rgba(13, 27, 62, 0.04);
        }
        .articles-nav-link::after {
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
        .articles-nav-link:hover::after { width: 50%; }
        .articles-nav-link--active { color: #e85d04 !important; font-weight: 700; }
        .articles-nav-link--active::after { width: 60% !important; background: #e85d04; }

        @media (max-width: 900px) {
          .articles-nav-links { display: none !important; }
          .articles-nav-hamburger { display: flex !important; }
          .articles-nav-title { height: 32px !important; }
          .articles-nav-yt { padding: 5px 10px !important; font-size: 12px !important; }
        }
        @media (min-width: 901px) {
          .articles-mobile-menu { display: none !important; }
        }
      `}</style>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <article
              key={article.slug}
              className="overflow-hidden rounded-2xl border border-[#cce9f5] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <img
                src={`https://img.youtube.com/vi/${article.videoId}/hqdefault.jpg`}
                alt={`${article.videoTitle} video thumbnail`}
                className="aspect-video w-full object-cover"
              />
              <div className="p-5">
                <div className="flex items-center justify-between gap-3 text-xs font-bold uppercase tracking-wide text-[#0f7c90]">
                  <span>{article.category}</span>
                  <span>{article.readingTime}</span>
                </div>
                <h2 className="mt-3 text-xl font-extrabold leading-snug text-[#10172a]">{article.title}</h2>
                <p className="mt-3 text-sm leading-6 text-[#5b6f82]">{article.description}</p>
                <Link
                  to="/articles/$slug"
                  params={{ slug: article.slug }}
                  className="mt-5 inline-flex rounded-full bg-[#e02020] px-5 py-2.5 text-sm font-extrabold text-white shadow-sm transition hover:bg-[#b91c1c] focus:outline-none focus:ring-4 focus:ring-[#fca5a5]"
                >
                  Learn more
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
