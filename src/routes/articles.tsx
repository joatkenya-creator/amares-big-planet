import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { articles } from "@/lib/articles";
import amaresLogo from "@/assets/amares-logo.jpeg";

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

function ArticlesPage() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });

  if (pathname !== "/articles") {
    return <Outlet />;
  }

  return (
    <main className="min-h-screen bg-[#f4fbff] text-[#10172a]">
      <header className="border-b border-[#d8eef7] bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <Link to="/" className="flex items-center gap-3 font-bold text-[#102a56]">
            <img src={amaresLogo} alt="Amare character" className="h-11 w-11 rounded-full object-cover" />
            Amare's Big Planet
          </Link>
          <nav className="flex items-center gap-4 text-sm font-semibold">
            <Link to="/" className="text-[#27415f] hover:text-[#e02020]">Home</Link>
            <a href="https://www.youtube.com/@amaresbigplanet" target="_blank" rel="noopener noreferrer" className="rounded-full bg-[#e02020] px-4 py-2 text-white">
              YouTube
            </a>
          </nav>
        </div>
      </header>

      <section className="bg-[#dff5ff]">
        <div className="mx-auto max-w-6xl px-4 py-16 text-center">
          <p className="text-sm font-extrabold uppercase tracking-[0.22em] text-[#0f7c90]">Parent Guides</p>
          <h1 className="mx-auto mt-4 max-w-4xl text-4xl font-extrabold leading-tight sm:text-6xl">
            Learning Hub for Every Little Explorer
          </h1>
          <p className="mx-auto mt-5 max-w-3xl text-lg font-medium text-[#4b5f75]">
            Helpful guides about inclusive learning, autism-friendly kids videos, ABC songs, music, space, ocean animals, and joyful learning at home.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <Link
              key={article.slug}
              to="/articles/$slug"
              params={{ slug: article.slug }}
              className="overflow-hidden rounded-2xl border border-[#cce9f5] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <img
                src={`https://img.youtube.com/vi/${article.videoId}/maxresdefault.jpg`}
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
                <span className="mt-5 inline-flex font-bold text-[#e02020]">Read guide</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
