import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { articles } from "@/lib/articles";
import amaresLogo from "@/assets/amares-logo.jpeg";
import amaresTitle from "@/assets/amares-title.png";

export const Route = createFileRoute("/articles/$slug")({
  component: ArticleDetailPage,
  head: ({ params }) => {
    const article = articles.find((a) => a.slug === params.slug);
    return {
      meta: [
        {
          title: article
            ? `${article.title} — Amaré's Big Planet`
            : "Article — Amaré's Big Planet",
        },
        { name: "description", content: article?.excerpt ?? "" },
      ],
    };
  },
});

function ArticleDetailPage() {
  const { slug } = Route.useParams();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 0);
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const article = articles.find((a) => a.slug === slug);

  if (!article) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "'Fredoka', sans-serif",
          textAlign: "center",
          gap: 16,
          padding: 24,
        }}
      >
        <div style={{ fontSize: 64 }}>🔭</div>
        <h1
          style={{
            fontFamily: "'Baloo 2', sans-serif",
            fontSize: 32,
            fontWeight: 800,
            color: "#1a1a2e",
            margin: 0,
          }}
        >
          Article not found
        </h1>
        <p style={{ color: "#888", fontSize: 16 }}>
          This article may have moved or doesn&apos;t exist.
        </p>
        <Link
          to="/articles/"
          style={{
            background: "#3B82F6",
            color: "white",
            borderRadius: 20,
            padding: "10px 24px",
            fontWeight: 700,
            textDecoration: "none",
            fontSize: 15,
          }}
        >
          ← Back to Articles
        </Link>
      </div>
    );
  }

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
        .article-body p {
          font-size: 17px;
          line-height: 1.8;
          color: #333;
          margin: 0 0 20px;
        }
        .article-body h2 {
          font-family: 'Baloo 2', sans-serif;
          font-size: 24px;
          font-weight: 800;
          color: #1a1a2e;
          margin: 36px 0 14px;
        }
        .article-body ul {
          margin: 0 0 20px;
          padding-left: 0;
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .article-body ul li {
          display: flex;
          gap: 10px;
          align-items: flex-start;
          font-size: 16px;
          color: #333;
          line-height: 1.6;
        }
        .article-body ul li::before {
          content: "✦";
          color: #8B5CF6;
          font-size: 12px;
          margin-top: 4px;
          flex-shrink: 0;
        }
        .article-tip {
          background: linear-gradient(135deg, #fef9e7, #fef3c7);
          border-left: 4px solid #FBBF24;
          border-radius: 12px;
          padding: 16px 20px;
          margin: 24px 0;
          font-size: 15px;
          color: #7c5400;
          line-height: 1.6;
        }
        .article-video {
          border-radius: 16px;
          overflow: hidden;
          margin: 24px 0;
          box-shadow: 0 8px 24px rgba(0,0,0,0.12);
        }
        .article-video iframe {
          display: block;
          width: 100%;
          aspect-ratio: 16/9;
          border: none;
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
              to="/articles/"
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
              ← Articles
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

      {/* ARTICLE HEADER */}
      <section
        style={{
          background: "linear-gradient(135deg, #dff0f5 0%, #e8f0fc 100%)",
          padding: "52px 24px 44px",
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: 64, marginBottom: 16 }}>{article.emoji}</div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
            marginBottom: 16,
          }}
        >
          <span
            style={{
              background: article.categoryColor + "18",
              color: article.categoryColor,
              fontWeight: 700,
              fontSize: 12,
              padding: "4px 12px",
              borderRadius: 20,
            }}
          >
            {article.category}
          </span>
          <span style={{ color: "#aaa", fontSize: 13 }}>{article.readTime}</span>
        </div>
        <h1
          style={{
            fontFamily: "'Baloo 2', sans-serif",
            fontSize: "clamp(28px, 5vw, 46px)",
            fontWeight: 800,
            color: "#1a1a2e",
            margin: "0 auto 16px",
            lineHeight: 1.2,
            maxWidth: 720,
          }}
        >
          {article.title}
        </h1>
        <p
          style={{
            fontSize: 17,
            color: "#555",
            maxWidth: 600,
            margin: "0 auto 12px",
            lineHeight: 1.6,
          }}
        >
          {article.excerpt}
        </p>
        <p style={{ fontSize: 13, color: "#aaa", margin: 0 }}>{article.date}</p>
      </section>

      {/* ARTICLE BODY */}
      <article
        style={{
          maxWidth: 740,
          margin: "0 auto",
          padding: "52px 24px 80px",
          width: "100%",
          boxSizing: "border-box",
          flex: 1,
        }}
      >
        <div className="article-body">
          {article.content.map((section, i) => {
            if (section.type === "paragraph") {
              return <p key={i}>{section.text}</p>;
            }

            if (section.type === "heading") {
              return <h2 key={i}>{section.text}</h2>;
            }

            if (section.type === "list") {
              return (
                <ul key={i}>
                  {section.items?.map((item, j) => (
                    <li key={j}>{item}</li>
                  ))}
                </ul>
              );
            }

            if (section.type === "tip") {
              return (
                <div key={i} className="article-tip">
                  💡 <strong>Tip:</strong> {section.text}
                </div>
              );
            }

            if (section.type === "video" && section.videoId) {
              return (
                <div key={i} className="article-video">
                  <iframe
                    src={`https://www.youtube.com/embed/${section.videoId}`}
                    title={section.videoTitle ?? "Video"}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              );
            }

            return null;
          })}
        </div>

        {/* Back link */}
        <div
          style={{
            marginTop: 48,
            paddingTop: 32,
            borderTop: "1px solid #e5e7eb",
          }}
        >
          <Link
            to="/articles/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              color: "#3B82F6",
              fontWeight: 700,
              textDecoration: "none",
              fontSize: 15,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#1d4ed8";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "#3B82F6";
            }}
          >
            ← Back to all articles
          </Link>
        </div>
      </article>

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
