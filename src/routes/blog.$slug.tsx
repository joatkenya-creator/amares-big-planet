import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import { getArticleBySlug, getRelatedArticles, type Article } from "@/lib/articles";
import amaresLogo from "@/assets/amares-logo.jpeg";
import amaresTitle from "@/assets/amares-title.png";

export const Route = createFileRoute("/blog/$slug")({
  component: BlogArticle,
  loader: ({ params }) => {
    const article = getArticleBySlug(params.slug);
    if (!article) throw notFound();
    const related = getRelatedArticles(params.slug, 2);
    return { article, related };
  },
  head: ({ loaderData }) => {
    const article = loaderData?.article;
    if (!article) return {};
    return {
      meta: [
        { title: `${article.title} | Amare's Big Planet Blog` },
        { name: "description", content: article.excerpt },
        { property: "og:title", content: article.title },
        { property: "og:description", content: article.excerpt },
        {
          property: "og:url",
          content: `https://amaresbigplanet.com/blog/${article.slug}`,
        },
      ],
      links: [
        {
          rel: "canonical",
          href: `https://amaresbigplanet.com/blog/${article.slug}`,
        },
      ],
    };
  },
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

function BlogArticle() {
  const { article, related } = Route.useLoaderData();
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

  const categoryColor = CATEGORY_COLORS[article.category] || "#3B82F6";

  return (
    <div style={{ minHeight: "100vh", fontFamily: "sans-serif", display: "flex", flexDirection: "column" }}>
      {/* NAVBAR */}
      <nav
        role="navigation"
        aria-label="Article page navigation"
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
            <img src={amaresTitle} alt="Amare's Big Planet" className="article-nav-title" style={{ height: "40px", width: "auto" }} />
          </Link>

          <div className="article-nav-links" style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            {BLOG_NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`article-nav-link${link.label === "Blog" ? " article-nav-link--active" : ""}`}
                aria-current={link.label === "Blog" ? "page" : undefined}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "12px", flexShrink: 0 }}>
            <Link
              to="/donate"
              className="article-nav-cta"
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
              className="article-nav-hamburger"
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
          className="article-mobile-menu"
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

      {/* ARTICLE */}
      <main style={{ flex: 1, padding: "40px 24px 80px" }}>
        <article style={{ maxWidth: "700px", margin: "0 auto" }}>
          {/* Back link */}
          <Link
            to="/blog"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "14px",
              fontWeight: 600,
              color: "#3B82F6",
              textDecoration: "none",
              marginBottom: "32px",
            }}
          >
            {"\u2190 Back to Blog"}
          </Link>

          {/* Category + read time */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
            <span
              style={{
                fontSize: "12px",
                fontWeight: 700,
                color: categoryColor,
                background: `${categoryColor}15`,
                padding: "4px 12px",
                borderRadius: "12px",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
              }}
            >
              {article.category}
            </span>
            <span style={{ fontSize: "13px", color: "#999" }}>{article.readTime}</span>
            <span style={{ fontSize: "13px", color: "#999" }}>{article.publishDate}</span>
          </div>

          {/* Title */}
          <h1
            style={{
              fontSize: "clamp(28px, 5vw, 42px)",
              fontWeight: 800,
              color: "#0d1b3e",
              lineHeight: 1.2,
              marginBottom: "32px",
            }}
          >
            {article.title}
          </h1>

          {/* Body */}
          <div
            className="article-body"
            dangerouslySetInnerHTML={{ __html: article.body }}
          />

          {/* Keep Exploring */}
          {related.length > 0 && (
            <section
              style={{
                marginTop: "64px",
                paddingTop: "40px",
                borderTop: "1px solid #e5e7eb",
              }}
            >
              <h2
                style={{
                  fontSize: "24px",
                  fontWeight: 700,
                  color: "#0d1b3e",
                  marginBottom: "24px",
                }}
              >
                Keep Exploring
              </h2>
              <div className="article-related-grid">
                {related.map((r: Article) => (
                  <Link
                    key={r.slug}
                    to="/blog/$slug"
                    params={{ slug: r.slug }}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <div className="article-related-card">
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                        <span
                          style={{
                            fontSize: "11px",
                            fontWeight: 700,
                            color: CATEGORY_COLORS[r.category] || "#3B82F6",
                            background: `${CATEGORY_COLORS[r.category] || "#3B82F6"}15`,
                            padding: "3px 10px",
                            borderRadius: "12px",
                            textTransform: "uppercase",
                            letterSpacing: "0.5px",
                          }}
                        >
                          {r.category}
                        </span>
                        <span style={{ fontSize: "12px", color: "#999" }}>{r.readTime}</span>
                      </div>
                      <h3
                        style={{
                          fontSize: "16px",
                          fontWeight: 700,
                          color: "#0d1b3e",
                          lineHeight: 1.3,
                          marginBottom: "6px",
                        }}
                      >
                        {r.title}
                      </h3>
                      <p
                        style={{
                          fontSize: "13px",
                          color: "#666",
                          lineHeight: 1.5,
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {r.excerpt}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </article>
      </main>

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
        .article-nav-link {
          padding: 8px 14px;
          font-size: 14px;
          font-weight: 500;
          color: #0d1b3e;
          text-decoration: none;
          position: relative;
          transition: color 0.2s;
          border-radius: 8px;
        }
        .article-nav-link:hover {
          color: #1a3a6e;
          background: rgba(13, 27, 62, 0.04);
        }
        .article-nav-link::after {
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
        .article-nav-link:hover::after {
          width: 50%;
        }
        .article-nav-link--active {
          color: #e85d04 !important;
          font-weight: 700;
        }
        .article-nav-link--active::after {
          width: 60% !important;
          background: #e85d04;
        }

        .article-body {
          font-size: 17px;
          line-height: 1.8;
          color: #333;
        }
        .article-body h2 {
          font-size: 24px;
          font-weight: 700;
          color: #0d1b3e;
          margin-top: 40px;
          margin-bottom: 16px;
        }
        .article-body h3 {
          font-size: 20px;
          font-weight: 700;
          color: #0d1b3e;
          margin-top: 32px;
          margin-bottom: 12px;
        }
        .article-body p {
          margin-bottom: 20px;
        }
        .article-body ul, .article-body ol {
          margin-bottom: 20px;
          padding-left: 24px;
        }
        .article-body li {
          margin-bottom: 8px;
        }
        .article-body strong {
          color: #0d1b3e;
        }
        .article-body a {
          color: #3B82F6;
          text-decoration: underline;
        }
        .article-body blockquote {
          border-left: 4px solid #3B82F6;
          margin: 24px 0;
          padding: 16px 24px;
          background: #f8fafc;
          border-radius: 0 8px 8px 0;
          font-style: italic;
          color: #555;
        }

        .article-related-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }
        .article-related-card {
          padding: 20px;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .article-related-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 16px rgba(0,0,0,0.08);
        }

        @media (max-width: 600px) {
          .article-related-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 900px) {
          .article-nav-links {
            display: none !important;
          }
          .article-nav-hamburger {
            display: flex !important;
          }
          .article-nav-title {
            height: 32px !important;
          }
        }
        @media (min-width: 901px) {
          .article-mobile-menu {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
