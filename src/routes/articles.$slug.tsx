import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { articles, getArticle } from "@/lib/articles";
import { SiteNav } from "@/components/SiteNav";

export const Route = createFileRoute("/articles/$slug")({
  component: ArticlePage,
  loader: ({ params }) => {
    const article = getArticle(params.slug);
    if (!article) throw notFound();
    return article;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData.title} | Amare's Big Planet` },
      { name: "description", content: loaderData.description },
      { property: "og:title", content: `${loaderData.title} | Amare's Big Planet` },
      { property: "og:description", content: loaderData.description },
      { property: "og:url", content: `https://amaresbigplanet.com/articles/${loaderData.slug}` },
      { property: "og:image", content: `https://img.youtube.com/vi/${loaderData.videoId}/hqdefault.jpg` },
    ],
    links: [
      { rel: "canonical", href: `https://amaresbigplanet.com/articles/${loaderData.slug}` },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: loaderData.title,
          description: loaderData.description,
          image: `https://img.youtube.com/vi/${loaderData.videoId}/hqdefault.jpg`,
          author: {
            "@type": "Organization",
            name: "Amare's Big Planet",
          },
          publisher: {
            "@type": "Organization",
            name: "Amare's Big Planet",
          },
          mainEntityOfPage: `https://amaresbigplanet.com/articles/${loaderData.slug}`,
        }),
      },
    ],
  }),
});

function ArticlePage() {
  const article = Route.useLoaderData();
  const related = articles.filter((item) => item.slug !== article.slug).slice(0, 3);

  return (
    <main className="min-h-screen bg-[#fffdf7] text-[#10172a]">
      <SiteNav active="Articles" />

      <article className="mx-auto max-w-4xl px-4 py-12">
        <Link to="/articles" className="font-bold text-[#0f7c90]">Back to Learning Hub</Link>
        <p className="mt-8 text-sm font-extrabold uppercase tracking-[0.2em] text-[#0f7c90]">{article.category}</p>
        <h1 className="mt-3 text-4xl font-extrabold leading-tight sm:text-6xl">{article.title}</h1>
        <p className="mt-5 text-lg leading-8 text-[#4b5f75]">{article.description}</p>

        <div className="mt-8 overflow-hidden rounded-2xl border border-[#d8eef7] bg-black shadow-lg">
          <iframe
            src={`https://www.youtube.com/embed/${article.videoId}`}
            title={article.videoTitle}
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="aspect-video w-full border-0"
          />
        </div>

        <p className="mt-8 text-lg leading-8 text-[#26394d]">{article.intro}</p>

        <div className="mt-8 rounded-2xl border border-[#f0dbad] bg-[#fff6df] p-5">
          <h2 className="text-2xl font-extrabold">What kids can practice</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {article.learningGoals.map((goal) => (
              <li key={goal} className="rounded-xl bg-white px-4 py-3 font-semibold text-[#26394d]">
                {goal}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-10 space-y-8">
          {article.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-2xl font-extrabold">{section.heading}</h2>
              <p className="mt-3 text-lg leading-8 text-[#4b5f75]">{section.body}</p>
            </section>
          ))}
        </div>

        <aside className="mt-10 rounded-2xl bg-[#e8f8ff] p-5">
          <h2 className="text-xl font-extrabold">Parent tip</h2>
          <p className="mt-2 leading-7 text-[#395167]">{article.parentTip}</p>
        </aside>

        <p className="mt-8 rounded-2xl border border-[#d8eef7] bg-white p-4 text-sm leading-6 text-[#5b6f82]">
          Note: Amare's Big Planet creates educational entertainment for families. This guide is not medical, diagnostic, or therapeutic advice.
        </p>

        <section className="mt-12 border-t border-[#f1dfb8] pt-8">
          <h2 className="text-2xl font-extrabold">Related guides</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {related.map((item) => (
              <Link
                key={item.slug}
                to="/articles/$slug"
                params={{ slug: item.slug }}
                className="rounded-2xl border border-[#d8eef7] bg-white p-4 font-bold text-[#102a56] hover:text-[#e02020]"
              >
                {item.title}
              </Link>
            ))}
          </div>
        </section>
      </article>
    </main>
  );
}
