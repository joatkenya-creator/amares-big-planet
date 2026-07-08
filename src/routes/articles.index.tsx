import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { articles } from "@/lib/articles";

const CATEGORY_COLORS: Record<string, string> = {
  "Music & Learning": "#8B5CF6",
  "Parenting Tips": "#3B82F6",
  "Behind the Scenes": "#F59E0B",
  Activities: "#22C55E",
};
import amaresLogo from "@/assets/amares-logo.jpeg";
import amaresTitle from "@/assets/amares-title.png";

export const Route = createFileRoute("/articles/")({
  component: ArticlesPage,
  head: () => ({
    meta: [
      { title: "Articles — Amaré's Big Planet" },
      {
        name: "description",
        content:
          "Tips, stories and guides for parents and little learners from Amaré's Big Planet.",
      },
    ],
  }),
});

function ArticlesPage() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 0);
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        fontFamily: "'Fredoka', sans-serif",
        backgroundColor: "#f8fcfe",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <style>{`
        .articles-card {
          background: white;
          border-radius: 20px;
          overflow: hidden;
          border: 1px solid rgba(0,0,0,0.07);
          box-shadow: 0 2px 8px rgba(0,0,0,0.05);
          height: 100%;
          display: flex;
          flex-direction: column;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          text-decoration: none;
          color: inherit;
        }
        .articles-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 28px rgba(0,0,0,0.12);
        }
        .articles-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 28px;
        }
        @media (max-width: 480px) {
          .articles-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      {/* NAV */}
      <nav
        style={{
          background: "rgba(255,255,255,0.97)",
          backdropFilter: "blur(10px)",
          boxShadow: scrolled ? "0 2px 12px rgba(0,0,0,0.1)" : "none",
          transition: "box-shadow 0.3s",
          position: "sticky",
          top: 0,
          zIndex: 1000,
        }}
      >
        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            padding: "10px 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Link
            to="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              textDecoration: "none",
            }}
          >
            <img
              src={amaresLogo}
              alt=""
              style={{
                width: 48,
                height: 48,
                borderRadius: "50%",
                objectFit: "cover",
                border: "2px solid #2a2a6e",
              }}
            />
            <img
              src={amaresTitle}
              alt="Amaré's Big Planet"
              style={{ height: 44, width: "auto" }}
            />
          </Link>
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <Link
              to="/"
              style={{
                color: "#2a2a6e",
                fontWeight: 600,
                textDecoration: "none",
                fontSize: 15,
                padding: "8px 14px",
                borderRadius: 8,
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(42,42,110,0.06)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
              }}
            >
              ← Home
            </Link>
            <Link
              to="/donate"
              style={{
                background: "#e02020",
                color: "white",
                borderRadius: 20,
                padding: "8px 18px",
                fontWeight: 700,
                fontSize: 14,
                textDecoration: "none",
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#c01010";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#e02020";
              }}
            >
              Donate 💙
            </Link>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section
        style={{
          background: "linear-gradient(135deg, #dff0f5 0%, #e8f0fc 100%)",
          padding: "64px 24px 52px",
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: 56, marginBottom: 16 }}>📚</div>
        <p
          style={{
            color: "#3B82F6",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.15em",
            fontSize: 13,
            marginBottom: 10,
          }}
        >
          Amaré&apos;s Big Planet
        </p>
        <h1
          style={{
            fontFamily: "'Baloo 2', sans-serif",
            fontSize: "clamp(32px, 6vw, 52px)",
            fontWeight: 800,
            color: "#1a1a2e",
            margin: "0 0 16px",
            lineHeight: 1.1,
          }}
        >
          Articles &amp; Tips
        </h1>
        <p
          style={{
            fontSize: 18,
            color: "#555",
            maxWidth: 520,
            margin: "0 auto",
            lineHeight: 1.6,
          }}
        >
          Fun ideas, learning tips, and adventures for kids and the parents who
          love them.
        </p>
      </section>

      {/* ARTICLES GRID */}
      <section
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "60px 24px",
          flex: 1,
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        {articles.length === 0 ? (
          <p style={{ textAlign: "center", color: "#888", fontSize: 16 }}>
            No articles yet — check back soon! 🚀
          </p>
        ) : (
          <div className="articles-grid">
            {articles.map((article) => (
              <Link
                key={article.slug}
                to="/articles/$slug"
                params={{ slug: article.slug }}
                className="articles-card"
              >
                {/* Card top */}
                <div
                  style={{
                    background:
                      "linear-gradient(135deg, #dff0f5 0%, #e8f0fc 100%)",
                    padding: "36px 24px 28px",
                    textAlign: "center",
                  }}
                >
                  <div style={{ fontSize: 56 }}>{article.emoji ?? "📄"}</div>
                </div>

                {/* Card body */}
                <div
                  style={{
                    padding: "20px 24px 24px",
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      marginBottom: 10,
                    }}
                  >
                    <span
                      style={{
                        background: (article.categoryColor ?? CATEGORY_COLORS[article.category] ?? "#3B82F6") + "18",
                        color: article.categoryColor ?? CATEGORY_COLORS[article.category] ?? "#3B82F6",
                        fontWeight: 700,
                        fontSize: 11,
                        padding: "3px 10px",
                        borderRadius: 20,
                      }}
                    >
                      {article.category}
                    </span>
                    <span style={{ color: "#bbb", fontSize: 11 }}>
                      {article.readTime}
                    </span>
                  </div>

                  <h2
                    style={{
                      fontFamily: "'Baloo 2', sans-serif",
                      fontSize: 20,
                      fontWeight: 800,
                      color: "#1a1a2e",
                      margin: "0 0 10px",
                      lineHeight: 1.3,
                    }}
                  >
                    {article.title}
                  </h2>

                  <p
                    style={{
                      fontSize: 14,
                      color: "#666",
                      lineHeight: 1.6,
                      margin: "0 0 16px",
                      flex: 1,
                    }}
                  >
                    {article.excerpt}
                  </p>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <span style={{ fontSize: 12, color: "#aaa" }}>
                      {new Date(article.publishDate).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                    </span>
                    <span
                      style={{
                        color: "#3B82F6",
                        fontWeight: 700,
                        fontSize: 13,
                      }}
                    >
                      Read more →
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
          background: "#1a1a2e",
          color: "white",
          padding: "32px 24px",
          textAlign: "center",
        }}
      >
        <Link
          to="/"
          style={{
            color: "rgba(255,255,255,0.7)",
            textDecoration: "none",
            fontSize: 14,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "white";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "rgba(255,255,255,0.7)";
          }}
        >
          ← Back to Amaré&apos;s Big Planet
        </Link>
        <p
          style={{
            marginTop: 12,
            fontSize: 12,
            color: "rgba(255,255,255,0.4)",
          }}
        >
          © 2026 Amaré Big Planet. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
