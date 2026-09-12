import { useRef } from "react";
import { Link } from "@tanstack/react-router";
import amaresLogo from "@/assets/amares-logo.webp";
import { useCountdown } from "@/hooks/use-countdown";
import {
  formatReleaseDate,
  getYouTubeVideoId,
  parseReleaseDate,
  type HolidayCampaign,
} from "@/lib/holidays";
import { DecorationScatter, type DecorationSlot } from "@/components/holidays/HolidayArt";
import { HolidayCountdown } from "@/components/holidays/HolidayCountdown";
import { HolidayVideoPlaceholder, HolidayVideoPlayer } from "@/components/holidays/HolidayVideo";

const YOUTUBE_SUBSCRIBE_URL = "https://www.youtube.com/@amaresbigplanet?sub_confirmation=1";
const FALLBACK_MESSAGE = "Video coming soon. Check back later!";

// Big illustration beside the hero copy; filled from the theme's decoration list in order.
const HERO_ART_SLOTS: DecorationSlot[] = [
  { className: "holiday-float bottom-[3%] left-[19%] w-[62%] [animation-duration:7s]" },
  { className: "holiday-drift top-[14%] left-[2%] w-[27%]" },
  { className: "holiday-twinkle top-[4%] left-[40%] w-[9%]" },
  { className: "holiday-float top-[33%] right-[0%] w-[25%] [animation-delay:-3s]" },
  {
    className:
      "holiday-float top-[0%] right-[6%] w-[33%] [animation-duration:9s] [animation-delay:-1s]",
  },
  { className: "holiday-drift right-[0%] bottom-[4%] w-[20%] [animation-delay:-2s]" },
  { className: "holiday-twinkle top-[46%] left-[8%] w-[8%] [animation-delay:-1.2s]" },
];

// Small, sparse background decorations around the hero edges.
const HERO_BACKGROUND_SLOTS: DecorationSlot[] = [
  { className: "holiday-twinkle top-[6%] left-[3%] hidden w-10 opacity-80 2xl:block" },
  { className: "holiday-drift top-[12%] right-[4%] hidden w-12 opacity-70 sm:block" },
  {
    className:
      "holiday-twinkle top-[48%] left-[1%] hidden w-8 opacity-80 2xl:block [animation-delay:-2s]",
  },
  {
    className:
      "holiday-float bottom-[14%] left-[46%] hidden w-10 opacity-60 lg:block [animation-delay:-4s]",
  },
  { className: "holiday-twinkle top-[30%] right-[2%] w-6 opacity-80 sm:w-8 [animation-delay:-1s]" },
  {
    className:
      "holiday-drift bottom-[10%] left-[4%] hidden w-12 opacity-70 sm:block [animation-delay:-3s]",
  },
  { className: "holiday-twinkle bottom-[20%] right-[6%] w-6 opacity-80 [animation-delay:-2.5s]" },
];

const MESSAGE_SLOTS: DecorationSlot[] = [
  { className: "holiday-float -top-2 left-4 w-14 opacity-90 sm:w-20" },
  { className: "holiday-drift top-6 right-4 w-12 opacity-90 sm:w-16" },
  { className: "holiday-twinkle bottom-6 left-8 hidden w-8 sm:block" },
  { className: "holiday-float right-10 bottom-4 hidden w-16 sm:block [animation-delay:-2s]" },
];

const PAGE_CSS = `
  .holiday-page {
    --h-accent-soft-shadow: color-mix(in srgb, var(--h-accent) 30%, transparent);
    --h-accent-shadow: color-mix(in srgb, var(--h-accent-strong) 55%, #000);
  }
  @keyframes holiday-float { 0%, 100% { transform: translateY(0) rotate(-2deg); } 50% { transform: translateY(-12px) rotate(2deg); } }
  @keyframes holiday-drift { 0%, 100% { transform: translate(0, 0); } 50% { transform: translate(8px, -10px); } }
  @keyframes holiday-twinkle { 0%, 100% { opacity: .45; transform: scale(.85); } 50% { opacity: 1; transform: scale(1.08); } }
  @keyframes holiday-tick { from { transform: translateY(-40%); opacity: 0; } to { transform: none; opacity: 1; } }
  @keyframes holiday-pop { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.04); } }
  .holiday-float { animation: holiday-float 6s ease-in-out infinite; }
  .holiday-drift { animation: holiday-drift 8s ease-in-out infinite; }
  .holiday-twinkle { animation: holiday-twinkle 3.2s ease-in-out infinite; }
  .holiday-digit { animation: holiday-tick .35s ease-out; }
  .holiday-pop { animation: holiday-pop 2.4s ease-in-out infinite; }
  .holiday-btn { transition: transform .15s ease, box-shadow .15s ease, background-color .2s ease; }
  @media (prefers-reduced-motion: reduce) {
    .holiday-page *, .holiday-page *::before, .holiday-page *::after {
      animation: none !important;
      transition: none !important;
    }
  }
`;

const primaryButton =
  "holiday-btn inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--h-accent-strong)] px-7 py-3 text-lg font-extrabold text-white shadow-[0_6px_0_var(--h-accent-shadow)] hover:translate-y-1 hover:shadow-[0_2px_0_var(--h-accent-shadow)] focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[var(--h-secondary)] active:translate-y-1.5 active:shadow-none";
const secondaryButton =
  "holiday-btn inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-base font-extrabold text-[var(--h-ink)] shadow-[0_5px_0_var(--h-secondary-soft)] ring-2 ring-[var(--h-secondary-soft)] hover:translate-y-1 hover:shadow-[0_1px_0_var(--h-secondary-soft)] focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[var(--h-secondary)]";

type Phase = "upcoming" | "released" | "unscheduled";

export function HolidayCampaignView({ campaign }: { campaign: HolidayCampaign }) {
  const { theme } = campaign;
  const releaseTime = parseReleaseDate(campaign.releaseDate);
  const { parts, isComplete } = useCountdown(releaseTime);
  const phase: Phase = releaseTime === null ? "unscheduled" : isComplete ? "released" : "upcoming";
  const videoId = getYouTubeVideoId(campaign.videoUrl);
  const watchUrl = videoId ? `https://www.youtube.com/watch?v=${videoId}` : null;
  const releaseLabel = formatReleaseDate(campaign);
  const campaignLabel = `${campaign.holidayName} ${campaign.year}`;
  const videoReady = phase === "released" && watchUrl !== null;

  // Announce the switch to "It's here!" only if it happens while the visitor is on the page.
  const initialPhase = useRef(phase);
  const announceRelease = initialPhase.current === "upcoming" && videoReady;

  const themeVars = {
    "--h-sky-from": theme.skyFrom,
    "--h-sky-to": theme.skyTo,
    "--h-surface": theme.surface,
    "--h-ink": theme.ink,
    "--h-accent": theme.accent,
    "--h-accent-soft": theme.accentSoft,
    "--h-accent-strong": theme.accentStrong,
    "--h-secondary": theme.secondary,
    "--h-secondary-soft": theme.secondarySoft,
  } as React.CSSProperties;

  return (
    <div
      className="holiday-page overflow-x-clip bg-[var(--h-surface)] text-[var(--h-ink)]"
      style={themeVars}
    >
      <style>{PAGE_CSS}</style>
      <p aria-live="polite" className="sr-only">
        {announceRelease ? `It's here! The ${campaign.holidayName} video is now available.` : ""}
      </p>

      {/* HERO */}
      <section
        aria-labelledby="holiday-hero-heading"
        className="relative overflow-hidden"
        style={{
          background: "linear-gradient(180deg, var(--h-sky-from) 0%, var(--h-sky-to) 100%)",
        }}
      >
        <DecorationScatter decorations={theme.decorations} slots={HERO_BACKGROUND_SLOTS} />

        <div className="relative mx-auto max-w-7xl px-4 pt-5 pb-20 sm:px-6 sm:pb-28">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm font-semibold">
              <li>
                <Link
                  to="/"
                  className="inline-block rounded py-1.5 underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-[var(--h-secondary)]"
                >
                  Home
                </Link>
              </li>
              <li aria-hidden="true">›</li>
              <li>
                <Link
                  to="/special-holidays"
                  className="inline-block rounded py-1.5 underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-[var(--h-secondary)]"
                >
                  Special Holidays
                </Link>
              </li>
              <li aria-hidden="true">›</li>
              <li aria-current="page" className="text-[var(--h-accent-strong)]">
                {campaignLabel}
              </li>
            </ol>
          </nav>

          <div className="mt-6 grid items-center gap-x-12 gap-y-6 sm:mt-10 lg:grid-cols-2 lg:grid-rows-[auto_1fr]">
            {/* Copy */}
            <div className="text-center lg:text-left">
              <p className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-1.5 text-sm font-extrabold tracking-wider text-[var(--h-secondary)] uppercase shadow-sm ring-1 ring-white sm:text-base">
                {videoReady ? (
                  <>
                    <span aria-hidden="true">🎉</span> It's here!
                  </>
                ) : (
                  <>
                    <span aria-hidden="true">{theme.emoji}</span> {campaign.holidayName} video
                    coming soon
                  </>
                )}
              </p>
              <h1
                id="holiday-hero-heading"
                className="mt-4 font-display text-[clamp(2.4rem,7vw,4.5rem)] leading-[1.02] font-extrabold text-balance lg:text-[clamp(3rem,4.4vw,3.9rem)]"
              >
                {videoReady ? (
                  `Watch Our ${campaign.videoTitle}`
                ) : (
                  <>
                    <span aria-hidden="true">{theme.emoji} </span>
                    {campaign.title}
                  </>
                )}
              </h1>
              <p className="mx-auto mt-4 max-w-xl text-lg font-medium text-[var(--h-ink)]/85 sm:text-xl lg:mx-0">
                {videoReady
                  ? `Our special ${campaign.holidayName} video is ready. Grab a cozy spot and enjoy the fun with Amare!`
                  : campaign.description}
              </p>
            </div>

            {/* Illustration */}
            <div className="relative mx-auto aspect-square w-full max-w-[16rem] sm:max-w-xs lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:max-w-md">
              <div
                className="absolute inset-[8%] rounded-full bg-white/45 blur-2xl"
                aria-hidden="true"
              />
              <DecorationScatter decorations={theme.decorations} slots={HERO_ART_SLOTS} />
            </div>

            {/* Countdown / release call to action */}
            <div className="w-full self-start">
              {phase === "upcoming" && parts && (
                <div className="mx-auto max-w-xl rounded-[2rem] bg-white/75 p-4 text-center shadow-soft ring-1 ring-white backdrop-blur-sm sm:p-7 lg:mx-0">
                  <h2 className="font-display text-xl font-extrabold tracking-wide text-[var(--h-accent-strong)] uppercase sm:text-2xl">
                    The {campaign.holidayName} video is coming!
                  </h2>
                  <div className="mt-4">
                    <HolidayCountdown parts={parts} subject={`the ${campaign.holidayName} video`} />
                  </div>
                  {releaseLabel && (
                    <p className="mt-4 text-sm font-semibold text-balance sm:text-base">
                      <span aria-hidden="true">📅 </span>
                      Premieres <time dateTime={campaign.releaseDate}>{releaseLabel}</time>
                    </p>
                  )}
                  <div className="mt-5 flex flex-col justify-center gap-3 sm:flex-row">
                    <a href="#holiday-video" className={primaryButton}>
                      <span aria-hidden="true">🎬</span> See the video
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
              )}

              {videoReady && (
                <div className="flex flex-col items-center gap-3 lg:items-start">
                  <a
                    href={watchUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${primaryButton} holiday-pop px-10 py-4 text-2xl`}
                  >
                    <span aria-hidden="true">▶</span> WATCH NOW
                    <span className="sr-only">
                      : {campaign.videoTitle} on YouTube (opens in a new tab)
                    </span>
                  </a>
                  <a
                    href="#holiday-video"
                    className="font-bold text-[var(--h-secondary)] underline underline-offset-4"
                  >
                    Or watch it right here on this page
                  </a>
                </div>
              )}

              {(phase === "unscheduled" || (phase === "released" && !videoReady)) && (
                <div className="mx-auto max-w-xl rounded-[2rem] bg-white/80 p-6 text-center shadow-soft ring-1 ring-white lg:mx-0">
                  <p className="font-display text-2xl font-extrabold">{FALLBACK_MESSAGE}</p>
                  <a
                    href={YOUTUBE_SUBSCRIBE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${secondaryButton} mt-4`}
                  >
                    <span aria-hidden="true">🔔</span> Subscribe on YouTube
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                </div>
              )}
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

      {/* VIDEO */}
      <section
        id="holiday-video"
        aria-labelledby="holiday-video-heading"
        className="scroll-mt-24 py-14 sm:py-20"
      >
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6">
          <h2
            id="holiday-video-heading"
            className="font-display text-3xl font-extrabold sm:text-5xl"
          >
            <span aria-hidden="true">🎬 </span>
            {videoReady
              ? `Watch Our ${campaign.videoTitle}`
              : `${campaign.holidayName} Video Coming Soon`}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-lg font-medium text-[var(--h-ink)]/80">
            {phase === "upcoming" && "Premieres Soon — come back when the countdown ends!"}
            {videoReady && "Press play to start the adventure."}
            {!videoReady && phase !== "upcoming" && FALLBACK_MESSAGE}
          </p>

          <div
            className="mt-8 rounded-[2.5rem] p-1.5 shadow-pop"
            style={{ background: "linear-gradient(135deg, var(--h-accent), var(--h-secondary))" }}
          >
            <div className="rounded-[2.25rem] bg-white p-2 sm:p-3">
              {videoReady && videoId ? (
                <HolidayVideoPlayer
                  videoId={videoId}
                  title={campaign.videoTitle}
                  thumbnail={campaign.thumbnail}
                />
              ) : (
                <HolidayVideoPlaceholder
                  badge={phase === "upcoming" ? "Coming Soon" : "Check back later"}
                  headline={phase === "upcoming" ? "Premieres Soon" : "Video coming soon"}
                  detail={phase === "upcoming" ? releaseLabel : null}
                  thumbnail={campaign.thumbnail}
                  decorations={theme.decorations}
                />
              )}
            </div>
          </div>

          {videoReady && (
            <a
              href={watchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`${primaryButton} mt-8`}
            >
              <span aria-hidden="true">▶</span> Watch on YouTube
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          )}
        </div>
      </section>

      {/* HOLIDAY MESSAGE */}
      <section aria-labelledby="holiday-message-heading" className="pb-20 sm:pb-28">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="relative overflow-hidden rounded-[2rem] bg-[var(--h-accent-soft)] px-6 py-10 text-center shadow-soft sm:px-14 sm:py-14">
            <DecorationScatter decorations={theme.decorations} slots={MESSAGE_SLOTS} />
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
                id="holiday-message-heading"
                className="mt-4 font-display text-3xl font-extrabold sm:text-4xl"
              >
                <span aria-hidden="true">{theme.emoji} </span>
                {campaign.message.heading}
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 font-medium sm:text-xl">
                {campaign.message.body}
              </p>
              <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
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
      </section>
    </div>
  );
}
