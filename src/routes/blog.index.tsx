import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import { articles } from "@/lib/articles";
import amaresLogo from "@/assets/amares-logo.jpeg";
import amaresTitle from "@/assets/amares-title.png";

export const Route = createFileRoute("/blog/")({
  component: BlogIndex,
  head: () => ({
    meta: [
      { title: "Blog | Amare's Big Planet" },
      {
        name: "description",
        content:
          "Educational tips for parents, behind-the-scenes stories, and fun learning activities from Amare's Big Planet.",
      },
      { property: "og:title", content: "Blog | Amare's Big Planet" },
      {
        property: "og:description",
        content:
          "Educational tips for parents, behind-the-scenes stories, and fun learning activities from Amare's Big Planet.",
      },
      { property: "og:url", content: "https://amaresbigplanet.com/blog" },
    ],
    links: [{ rel: "canonical", href: "https://amaresbigplanet.com/blog" }],
  }),
});

const BLOG_NAV_LINKS = [
  { label: "About", href: "/#about" },
  { label: "Programs", href: "/#programs" },
  { label: "Impact", href: "/#impact" },
  { label: "Stories", href: "/#stories" },
  { label: "Blog", href: "/blog" },
  { label: "Support", href: "/donate" },
  { label: "Contact", href: "/#contact" },
];

const CATEGORY_COLORS: Record<string, string> = {
  "Parenting Tips": "#3B82F6",
  "Behind the Scenes": "#F59E0B",
  Activities: "#22C55E",
};

const THUMBNAIL_COLORS = ["#3B82F6", "#F59E0B", "#FBBF24", "#8B5CF6", "#22C55E", "#E24B4A"];

function BlogIndex() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 0);
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div style={{ minHeight: "100vh", fontFamily: "sans-serif", display: "flex", flexDirection: "column" }}>
      {/* NAVBAR */}
      <nav
        role="navigation"
        aria-label="Blog page navigation"
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
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "10px 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Link
            to="/"
            aria-label="Go to homepage"
            style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none", flexShrink: 0 }}
          >
            <img
              src={amaresLogo}
              alt=""
              style={{ width: "48px", height: "48px", borderRadius: "50%", objectFit: "cover", border: "2px solid #0d1b3e" }}
            />
            <img src={amaresTitle} alt="Amare's Big Planet" className="blog-nav-title" style={{ height: "40px", width: "auto" }} />
          </Link>

          <div className="blog-nav-links" style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            {BLOG_NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`blog-nav-link${link.label === "Blog" ? " blog-nav-link--active" : ""}`}
                aria-current={link.label === "Blog" ? "page" : undefined}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "12px", flexShrink: 0 }}>
            <Link
              to="/donate"
              className="blog-nav-cta"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                background: "#e0001b",
                color: "white",
                fontSize: "14px",
                fontWeight: 700,
                padding: "9px 20px",
                borderRadius: "24px",
                textDecoration: "none",
                transition: "all 0.2s",
                flexShrink: 0,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#b80015";
                e.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#e0001b";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              Support
            </Link>

            <button
              className="blog-nav-hamburger"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
              style={{
                display: "none",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "6px",
                flexDirection: "column",
                gap: "4px",
                justifyContent: "center",
              }}
            >
              <span
                style={{
                  display: "block",
                  width: "22px",
                  height: "2px",
                  background: "#0d1b3e",
                  borderRadius: "2px",
                  transition: "all 0.3s",
                  transform: mobileMenuOpen ? "rotate(45deg) translateY(6px)" : "none",
                }}
              />
              <span
                style={{
                  display: "block",
                  width: "22px",
                  height: "2px",
                  background: "#0d1b3e",
                  borderRadius: "2px",
                  transition: "all 0.3s",
                  opacity: mobileMenuOpen ? 0 : 1,
                }}
              />
              <span
                style={{
                  display: "block",
                  width: "22px",
                  height: "2px",
                  background: "#0d1b3e",
                  borderRadius: "2px",
                  transition: "all 0.3s",
                  transform: mobileMenuOpen ? "rotate(-45deg) translateY(-6px)" : "none",
                }}
              />
            </button>
          </div>
        </div>

        <div
          ref={mobileMenuRef}
          className="blog-mobile-menu"
          style={{
            maxHeight: mobileMenuOpen ? "400px" : "0",
            overflow: "hidden",
            transition: "max-height 0.3s ease",
            borderTop: mobileMenuOpen ? "1px solid #e5e7eb" : "none",
          }}
        >
          <div style={{ padding: "8px 24px 16px" }}>
            {BLOG_NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  display: "block",
                  padding: "12px 0",
                  fontSize: "15px",
                  fontWeight: link.label === "Blog" ? 700 : 500,
                  color: link.label === "Blog" ? "#e85d04" : "#0d1b3e",
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

      {/* HERO */}
      <section
        style={{
          background: "linear-gradient(135deg, #0d1b3e 0%, #1a3a6e 100%)",
          padding: "80px 24px 60px",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontSize: "clamp(32px, 5vw, 52px)",
            fontWeight: 800,
            color: "white",
            marginBottom: "16px",
            lineHeight: 1.1,
          }}
        >
          Stories, Tips & Adventures
        </h1>
        <p
          style={{
            fontSize: "clamp(16px, 2.5vw, 19px)",
            color: "rgba(255,255,255,0.85)",
            maxWidth: "640px",
            margin: "0 auto",
            lineHeight: 1.6,
          }}
        >
          Explore educational tips for parents, behind-the-scenes looks at how Amare's Big Planet is made, and fun
          learning activities for kids.
        </p>
      </section>

      {/* ARTICLES GRID */}
      <section
        style={{
          maxWidth: "1080px",
          margin: "0 auto",
          padding: "48px 24px 80px",
          flex: 1,
        }}
      >
        {articles.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "80px 24px",
              color: "#888",
            }}
          >
            <div style={{ fontSize: "48px", marginBottom: "16px" }}>{"📝"}</div>
            <h2 style={{ fontSize: "24px", fontWeight: 700, color: "#0d1b3e", marginBottom: "8px" }}>
              Coming Soon!
            </h2>
            <p style={{ fontSize: "16px", maxWidth: "400px", margin: "0 auto", lineHeight: 1.6 }}>
              We're working on some amazing articles. Check back soon for educational tips, behind-the-scenes stories,
              and fun activities!
            </p>
          </div>
        ) : (
          <div className="blog-grid">
            {articles.map((article, i) => (
              <Link
                key={article.slug}
                to="/blog/$slug"
                params={{ slug: article.slug }}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <div className="blog-card">
                  {/* Colored thumbnail placeholder */}
                  <div
                    style={{
                      height: "180px",
                      background: THUMBNAIL_COLORS[i % THUMBNAIL_COLORS.length],
                      borderRadius: "12px 12px 0 0",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <span style={{ fontSize: "48px", opacity: 0.6 }}>
                      {article.category === "Parenting Tips"
                        ? "👨‍👩‍👧"
                        : article.category === "Behind the Scenes"
                          ? "🎬"
                          : "🎨"}
                    </span>
                  </div>

                  <div style={{ padding: "20px" }}>
                    {/* Category + read time */}
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
                      <span
                        style={{
                          fontSize: "11px",
                          fontWeight: 700,
                          color: CATEGORY_COLORS[article.category] || "#3B82F6",
                          background: `${CATEGORY_COLORS[article.category] || "#3B82F6"}15`,
                          padding: "3px 10px",
                          borderRadius: "12px",
                          textTransform: "uppercase",
                          letterSpacing: "0.5px",
                        }}
                      >
                        {article.category}
                      </span>
                      <span style={{ fontSize: "12px", color: "#999" }}>{article.readTime}</span>
                    </div>

                    {/* Title */}
                    <h2
                      style={{
                        fontSize: "18px",
                        fontWeight: 700,
                        color: "#0d1b3e",
                        marginBottom: "8px",
                        lineHeight: 1.3,
                      }}
                    >
                      {article.title}
                    </h2>

                    {/* Excerpt */}
                    <p
                      style={{
                        fontSize: "14px",
                        color: "#666",
                        lineHeight: 1.5,
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        marginBottom: "14px",
                      }}
                    >
                      {article.excerpt}
                    </p>

                    {/* Read more */}
                    <span
                      style={{
                        fontSize: "14px",
                        fontWeight: 600,
                        color: "#3B82F6",
                      }}
                    >
                      {"Read More \u2192"}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* FOOTER */}
      <footer
        style={{
          background: "#0d1b3e",
          color: "rgba(255,255,255,0.7)",
          textAlign: "center",
          padding: "32px 24px",
          fontSize: "14px",
        }}
      >
        <p>
          {"\u00A9"} {new Date().getFullYear()} Amare's Big Planet. All rights reserved.
        </p>
      </footer>

      {/* STYLES */}
      <style>{`
        .blog-nav-link {
          padding: 8px 14px;
          font-size: 14px;
          font-weight: 500;
          color: #0d1b3e;
          text-decoration: none;
          position: relative;
          transition: color 0.2s;
          border-radius: 8px;
        }
        .blog-nav-link:hover {
          color: #1a3a6e;
          background: rgba(13, 27, 62, 0.04);
        }
        .blog-nav-link::after {
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
        .blog-nav-link:hover::after {
          width: 50%;
        }
        .blog-nav-link--active {
          color: #e85d04 !important;
          font-weight: 700;
        }
        .blog-nav-link--active::after {
          width: 60% !important;
          background: #e85d04;
        }

        .blog-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 28px;
        }

        .blog-card {
          background: white;
          border-radius: 12px;
          border: 1px solid #e5e7eb;
          overflow: hidden;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .blog-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.1);
        }

        @media (max-width: 700px) {
          .blog-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 900px) {
          .blog-nav-links {
            display: none !important;
          }
          .blog-nav-hamburger {
            display: flex !important;
          }
          .blog-nav-title {
            height: 32px !important;
          }
        }
        @media (min-width: 901px) {
          .blog-mobile-menu {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
