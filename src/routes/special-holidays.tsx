import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav } from "@/components/SiteNav";
import { HolidayCampaignView } from "@/components/holidays/HolidayCampaignView";
import {
  getActiveHoliday,
  getYouTubeVideoId,
  parseReleaseDate,
  SPECIAL_HOLIDAYS_PATH,
} from "@/lib/holidays";

const SITE_URL = "https://amaresbigplanet.com";
const PAGE_URL = `${SITE_URL}${SPECIAL_HOLIDAYS_PATH}`;

export const Route = createFileRoute("/special-holidays")({
  component: SpecialHolidaysPage,
  head: () => {
    const campaign = getActiveHoliday();

    if (!campaign) {
      const title = "Special Holidays for Kids | Amare's Big Planet";
      const description =
        "Seasonal videos and holiday adventures for kids from Amare's Big Planet.";
      return {
        meta: [
          { title },
          { name: "description", content: description },
          { property: "og:title", content: title },
          { property: "og:description", content: description },
          { property: "og:url", content: PAGE_URL },
        ],
        links: [{ rel: "canonical", href: PAGE_URL }],
      };
    }

    const { seo } = campaign;
    const imageUrl = `${SITE_URL}${seo.image}`;
    const campaignLabel = `${campaign.holidayName} ${campaign.year}`;
    const releaseTime = parseReleaseDate(campaign.releaseDate);
    const videoId = getYouTubeVideoId(campaign.videoUrl);
    const videoReleased = videoId !== null && releaseTime !== null && Date.now() >= releaseTime;

    const structuredData: Record<string, unknown>[] = [
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Special Holidays", item: PAGE_URL },
          { "@type": "ListItem", position: 3, name: campaignLabel },
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
        about: { "@type": "Thing", name: campaign.holidayName },
        isPartOf: { "@type": "WebSite", name: "Amare's Big Planet", url: SITE_URL },
      },
    ];

    // Only describe the video once it genuinely exists and has premiered.
    if (videoReleased) {
      structuredData.push({
        "@context": "https://schema.org",
        "@type": "VideoObject",
        name: campaign.videoTitle,
        description: seo.description,
        thumbnailUrl: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
        uploadDate: campaign.releaseDate,
        embedUrl: `https://www.youtube.com/embed/${videoId}`,
        contentUrl: `https://www.youtube.com/watch?v=${videoId}`,
      });
    }

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
        { property: "og:image:width", content: "1200" },
        { property: "og:image:height", content: "630" },
        { property: "og:image:alt", content: seo.imageAlt },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: seo.title },
        { name: "twitter:description", content: seo.description },
        { name: "twitter:image", content: imageUrl },
        { name: "twitter:image:alt", content: seo.imageAlt },
      ],
      links: [{ rel: "canonical", href: PAGE_URL }],
      scripts: structuredData.map((data) => ({
        type: "application/ld+json",
        children: JSON.stringify(data),
      })),
    };
  },
});

function SpecialHolidaysPage() {
  const campaign = getActiveHoliday();

  return (
    <div className="min-h-screen bg-background">
      <SiteNav active="Special Holidays" />
      <main>
        {campaign ? (
          <HolidayCampaignView campaign={campaign} />
        ) : (
          <section className="mx-auto max-w-3xl px-4 py-24 text-center">
            <h1 className="font-display text-4xl font-extrabold text-foreground sm:text-5xl">
              Special Holidays
            </h1>
            <p className="mt-4 text-lg font-medium text-muted-foreground">
              Our next holiday adventure is on its way. Check back soon!
            </p>
            <Link
              to="/"
              className="mt-8 inline-flex rounded-full bg-[#e02020] px-7 py-3 font-bold text-white transition hover:bg-[#cc0000]"
            >
              Back to Amare's Big Planet
            </Link>
          </section>
        )}
      </main>
    </div>
  );
}
