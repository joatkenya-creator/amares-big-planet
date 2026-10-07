import { Link } from "@tanstack/react-router";
import amaresLogo from "@/assets/amares-logo.webp";
import { getYouTubeVideoId } from "@/lib/holidays";
import {
  MIDNIGHT_RHYTHM_DECORATIONS as DECORATIONS,
  MIDNIGHT_RHYTHM_THEME_VARS as THEME_VARS,
  midnightRhythmHeroVideo,
  midnightRhythmVideos,
} from "@/lib/midnight-rhythm";
import { DecorationScatter, type DecorationSlot } from "@/components/holidays/HolidayArt";
import {
  PAGE_CSS,
  primaryButton,
  secondaryButton,
  YOUTUBE_SUBSCRIBE_URL,
} from "@/components/holidays/HolidayCampaignView";
import { HolidayVideoPlayer } from "@/components/holidays/HolidayVideo";
import { HeroBackgroundVideo } from "@/components/HeroBackgroundVideo";

// Big illustration beside the hero copy; the moon takes the first (largest) slot.
const HERO_ART_SLOTS: DecorationSlot[] = [
  { className: "holiday-float top-[16%] left-[18%] w-[58%] [animation-duration:7s]" },
  { className: "holiday-drift top-[4%] left-[0%] w-[22%]" },
  { className: "holiday-twinkle top-[2%] right-[14%] w-[12%]" },
  { className: "holiday-float right-[0%] bottom-[10%] w-[24%] [animation-delay:-3s]" },
  { className: "holiday-twinkle bottom-[6%] left-[6%] w-[10%] [animation-delay:-1.5s]" },
  { className: "holiday-twinkle top-[44%] right-[4%] w-[9%] [animation-delay:-2s]" },
  { className: "holiday-drift bottom-[2%] left-[36%] w-[18%] [animation-delay:-4s]" },
];

// Small, sparse stars and notes around the hero edges.
const HERO_BACKGROUND_SLOTS: DecorationSlot[] = [
  { className: "holiday-twinkle top-[8%] left-[4%] w-6 opacity-80 sm:w-8" },
  { className: "holiday-drift top-[14%] right-[5%] hidden w-10 opacity-60 sm:block" },
  {
    className:
      "holiday-twinkle top-[40%] left-[2%] hidden w-6 opacity-80 lg:block [animation-delay:-2s]",
  },
  {
    className:
      "holiday-drift bottom-[18%] left-[44%] hidden w-10 opacity-50 lg:block [animation-delay:-3s]",
  },
  { className: "holiday-twinkle top-[28%] right-[2%] w-5 opacity-80 sm:w-7 [animation-delay:-1s]" },
  { className: "holiday-twinkle bottom-[22%] right-[8%] w-5 opacity-70 [animation-delay:-2.5s]" },
  {
    className:
      "holiday-drift bottom-[12%] left-[5%] hidden w-10 opacity-60 sm:block [animation-delay:-1.2s]",
  },
];

const MESSAGE_SLOTS: DecorationSlot[] = [
  { className: "holiday-float -top-2 left-4 w-14 opacity-90 sm:w-20" },
  { className: "holiday-drift top-6 right-4 w-12 opacity-90 sm:w-16" },
  { className: "holiday-twinkle bottom-6 left-8 hidden w-8 sm:block" },
  { className: "holiday-float right-10 bottom-4 hidden w-14 sm:block [animation-delay:-2s]" },
];

const breadcrumbLink =
  "inline-block rounded py-1.5 underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-white";

export function MidnightRhythmView() {
  return (
    <div
      className="holiday-page overflow-x-clip bg-[var(--h-surface)] text-[var(--h-ink)]"
      style={THEME_VARS}
    >
      <style>{PAGE_CSS}</style>

      {/* HERO */}
      <section
        aria-labelledby="midnight-hero-heading"
        className="relative overflow-hidden text-white"
        style={{
          background: "linear-gradient(180deg, var(--h-sky-from) 0%, var(--h-sky-to) 100%)",
        }}
      >
        <HeroBackgroundVideo {...midnightRhythmHeroVideo} />
        {/* Night-tinted dark overlay keeps the heading and buttons readable over the video. */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(30,27,75,0.72) 0%, rgba(30,27,75,0.5) 45%, rgba(76,29,149,0.7) 100%)",
          }}
        />
        <DecorationScatter decorations={DECORATIONS} slots={HERO_BACKGROUND_SLOTS} />

        <div className="relative mx-auto max-w-7xl px-4 pt-5 pb-20 sm:px-6 sm:pb-28">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm font-semibold">
              <li>
                <Link to="/" className={breadcrumbLink}>
                  Home
                </Link>
              </li>
              <li aria-hidden="true">›</li>
              <li>
                <Link to="/special-holidays" className={breadcrumbLink}>
                  Special Holidays
                </Link>
              </li>
              <li aria-hidden="true">›</li>
              <li aria-current="page" className="text-[#f9a8d4]">
                Midnight Rhythm
              </li>
            </ol>
          </nav>

          <div className="mt-6 grid items-center gap-x-12 gap-y-8 sm:mt-10 lg:grid-cols-2">
            {/* Copy */}
            <div className="text-center lg:text-left">
              <p className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-sm font-extrabold tracking-wider uppercase ring-1 ring-white/30 sm:text-base">
                <span aria-hidden="true">🎵</span> A night of music &amp; fun
              </p>
              <h1
                id="midnight-hero-heading"
                className="mt-4 font-display text-[clamp(2.6rem,8vw,4.75rem)] leading-[1.02] font-extrabold text-balance"
              >
                <span aria-hidden="true">🌙 </span>
                Midnight Rhythm
              </h1>
              <p className="mx-auto mt-4 max-w-xl text-lg font-medium text-white/90 sm:text-xl lg:mx-0">
                When the stars come out, the music turns on! Dance, sing and wiggle along with Amare
                under the sparkly night sky.
              </p>
              <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
                <a href="#midnight-videos" className={primaryButton}>
                  <span aria-hidden="true">🎬</span> Watch the videos
                </a>
                <a
                  href={YOUTUBE_SUBSCRIBE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={secondaryButton}
                >
                  <span aria-hidden="true">🔔</span> Subscribe on YouTube
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </div>
            </div>

            {/* Illustration */}
            <div className="relative mx-auto aspect-square w-full max-w-[16rem] sm:max-w-xs lg:max-w-md">
              <div
                className="absolute inset-[12%] rounded-full bg-[#fde68a]/25 blur-3xl"
                aria-hidden="true"
              />
              <DecorationScatter decorations={DECORATIONS} slots={HERO_ART_SLOTS} />
            </div>
          </div>
        </div>

        <svg
          className="absolute bottom-0 left-0 h-10 w-full sm:h-16"
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
          aria-hidden="true"
          focusable="false"
        >
          <path
            d="M0 40c160 30 320 30 480 8s320-40 480-16 320 36 480 20v28H0z"
            fill="var(--h-surface)"
          />
        </svg>
      </section>

      {/* VIDEOS */}
      <section
        id="midnight-videos"
        aria-labelledby="midnight-videos-heading"
        className="scroll-mt-24 py-14 sm:py-20"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-center">
            <h2
              id="midnight-videos-heading"
              className="font-display text-3xl font-extrabold sm:text-5xl"
            >
              <span aria-hidden="true">🎬 </span>
              Watch Midnight Rhythm
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-lg font-medium text-[var(--h-ink)]/80">
              Press play, turn up the music and get ready to dance!
            </p>
          </div>

          <ul className="mt-10 grid gap-10 lg:grid-cols-2 lg:gap-8">
            {midnightRhythmVideos.map((video) => {
              const videoId = getYouTubeVideoId(video.url);
              if (!videoId) return null;
              return (
                <li key={videoId} className="flex flex-col items-center text-center">
                  <div
                    className="w-full rounded-[2.5rem] p-1.5 shadow-pop"
                    style={{
                      background: "linear-gradient(135deg, var(--h-accent), var(--h-secondary))",
                    }}
                  >
                    <div className="rounded-[2.25rem] bg-white p-2 sm:p-3">
                      <HolidayVideoPlayer videoId={videoId} title={video.title} />
                    </div>
                  </div>
                  <h3 className="mt-5 max-w-xl font-display text-xl font-extrabold text-balance sm:text-2xl">
                    {video.title}
                  </h3>
                  <a
                    href={`https://www.youtube.com/watch?v=${videoId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${primaryButton} mt-5`}
                  >
                    <span aria-hidden="true">▶</span> Watch on YouTube
                    <span className="sr-only">: {video.title} (opens in a new tab)</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* MESSAGE */}
      <section aria-labelledby="midnight-message-heading" className="pb-20 sm:pb-28">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="relative overflow-hidden rounded-[2rem] bg-[var(--h-accent-soft)] px-6 py-10 text-center shadow-soft sm:px-14 sm:py-14">
            <DecorationScatter decorations={DECORATIONS} slots={MESSAGE_SLOTS} />
            <div className="relative">
              <img
                src={amaresLogo}
                alt="Amare character"
                width={384}
                height={384}
                loading="lazy"
                decoding="async"
                className="mx-auto h-20 w-20 rounded-full border-4 border-white object-cover shadow-md"
              />
              <h2
                id="midnight-message-heading"
                className="mt-4 font-display text-3xl font-extrabold sm:text-4xl"
              >
                <span aria-hidden="true">🎶 </span>
                Keep the Music Going!
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 font-medium sm:text-xl">
                Subscribe so you never miss a new song, dance or adventure from Amare's Big Planet.
              </p>
              <div className="mt-7 flex flex-col items-center gap-4">
                <a
                  href={YOUTUBE_SUBSCRIBE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={primaryButton}
                >
                  <span aria-hidden="true">🔔</span> Subscribe on YouTube
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
                <div className="flex flex-col justify-center gap-3 sm:flex-row">
                  <Link to="/" hash="shows" className={secondaryButton}>
                    <span aria-hidden="true">🚀</span> Explore more videos
                  </Link>
                  <Link to="/articles" className={secondaryButton}>
                    <span aria-hidden="true">📚</span> Parent Learning Hub
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
