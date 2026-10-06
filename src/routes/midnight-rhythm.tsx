import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/SiteNav";
import { MidnightRhythmView } from "@/components/midnight-rhythm/MidnightRhythmView";
import { getYouTubeVideoId, SPECIAL_HOLIDAYS_PATH } from "@/lib/holidays";
import {
  MIDNIGHT_RHYTHM_PATH,
  midnightRhythmSeo as seo,
  midnightRhythmVideos,
} from "@/lib/midnight-rhythm";

const SITE_URL = "https://amaresbigplanet.com";
const PAGE_URL = `${SITE_URL}${MIDNIGHT_RHYTHM_PATH}`;

export const Route = createFileRoute("/midnight-rhythm")({
  component: MidnightRhythmPage,
  head: () => {
    // Social preview: the first video's YouTube thumbnail until a custom /og image exists.
    const firstVideoId = getYouTubeVideoId(midnightRhythmVideos[0]?.url ?? "");
    const imageUrl = firstVideoId
      ? `https://i.ytimg.com/vi/${firstVideoId}/hqdefault.jpg`
      : `${SITE_URL}/favicon-512.png`;
    const imageAlt = "Amare's Big Planet Midnight Rhythm music video";

    const structuredData = [
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          {
            "@type": "ListItem",
            position: 2,
            name: "Special Holidays",
            item: `${SITE_URL}${SPECIAL_HOLIDAYS_PATH}`,
          },
          { "@type": "ListItem", position: 3, name: "Midnight Rhythm", item: PAGE_URL },
        ],
      },
      {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: seo.title,
        description: seo.description,
        url: PAGE_URL,
        image: imageUrl,
        inLanguage: "en",
        isPartOf: { "@type": "WebSite", name: "Amare's Big Planet", url: SITE_URL },
      },
    ];

    return {
      meta: [
        { title: seo.title },
        { name: "description", content: seo.description },
        { name: "keywords", content: seo.keywords.join(", ") },
        { property: "og:title", content: seo.title },
        { property: "og:description", content: seo.description },
        { property: "og:url", content: PAGE_URL },
        { property: "og:type", content: "website" },
        { property: "og:site_name", content: "Amare's Big Planet" },
        { property: "og:image", content: imageUrl },
        { property: "og:image:alt", content: imageAlt },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: seo.title },
        { name: "twitter:description", content: seo.description },
        { name: "twitter:image", content: imageUrl },
        { name: "twitter:image:alt", content: imageAlt },
      ],
      links: [{ rel: "canonical", href: PAGE_URL }],
      scripts: structuredData.map((data) => ({
        type: "application/ld+json",
        children: JSON.stringify(data),
      })),
    };
  },
});

function MidnightRhythmPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Midnight Rhythm lives inside the Special Holidays section. */}
      <SiteNav active="Special Holidays" />
      <main>
        <MidnightRhythmView />
      </main>
    </div>
  );
}
