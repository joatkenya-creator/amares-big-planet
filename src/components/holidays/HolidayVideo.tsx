import { useState } from "react";
import amaresTitle from "@/assets/amares-title.webp";
import { DecorationScatter, type DecorationSlot } from "@/components/holidays/HolidayArt";
import type { HolidayDecoration } from "@/lib/holidays";

const PLACEHOLDER_SLOTS: DecorationSlot[] = [
  { className: "holiday-float bottom-[6%] left-[5%] w-[17%] max-w-32" },
  { className: "holiday-drift top-[14%] left-[7%] w-[11%] max-w-20" },
  { className: "holiday-twinkle top-[38%] right-[24%] w-[4%] max-w-8" },
  { className: "holiday-float right-[8%] bottom-[8%] w-[11%] max-w-20 [animation-delay:-4s]" },
  { className: "holiday-float top-[8%] right-[6%] w-[16%] max-w-28 [animation-delay:-2s]" },
  { className: "holiday-drift bottom-[36%] left-[27%] w-[6%] max-w-10 [animation-delay:-3s]" },
  { className: "holiday-twinkle top-[20%] left-[30%] w-[4%] max-w-8 [animation-delay:-1.5s]" },
];

type HolidayVideoPlayerProps = {
  videoId: string;
  title: string;
  thumbnail?: string;
};

/**
 * Click-to-play YouTube player. Only a lightweight thumbnail loads until the visitor
 * presses play, so the page never autoplays or pays for the YouTube iframe up front.
 */
export function HolidayVideoPlayer({ videoId, title, thumbnail }: HolidayVideoPlayerProps) {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="aspect-video w-full rounded-[1.75rem] border-0 bg-black"
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      className="group relative block aspect-video w-full overflow-hidden rounded-[1.75rem] bg-black focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[var(--h-secondary)]"
    >
      <img
        src={thumbnail || `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
        alt=""
        width={480}
        height={360}
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <span
        className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent"
        aria-hidden="true"
      />
      <span
        className="absolute top-1/2 left-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[var(--h-accent-strong)] text-white shadow-[0_8px_0_rgba(0,0,0,0.25)] transition-transform group-hover:scale-110 sm:h-24 sm:w-24"
        aria-hidden="true"
      >
        <svg viewBox="0 0 24 24" className="ml-1 h-9 w-9 fill-current sm:h-11 sm:w-11">
          <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5z" />
        </svg>
      </span>
      <span className="sr-only">{`Play video: ${title}`}</span>
    </button>
  );
}

type HolidayVideoPlaceholderProps = {
  /** Small chip in the corner, e.g. "Coming Soon". */
  badge: string;
  /** Large line in the middle, e.g. "Premieres Soon". */
  headline: string;
  detail?: string | null;
  thumbnail?: string;
  decorations: HolidayDecoration[];
};

/** Pre-release / unavailable state: a friendly illustrated card, never a broken embed. */
export function HolidayVideoPlaceholder({
  badge,
  headline,
  detail,
  thumbnail,
  decorations,
}: HolidayVideoPlaceholderProps) {
  return (
    <div
      className="relative flex aspect-video w-full flex-col items-center justify-center overflow-hidden rounded-[1.75rem] px-4 text-center"
      style={{ background: "linear-gradient(160deg, var(--h-sky-from), var(--h-sky-to))" }}
    >
      {thumbnail ? (
        <img
          src={thumbnail}
          alt=""
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover opacity-90"
        />
      ) : (
        <DecorationScatter decorations={decorations} slots={PLACEHOLDER_SLOTS} />
      )}

      <span className="absolute top-3 left-3 rounded-full bg-[var(--h-secondary)] px-3 py-1 text-xs font-extrabold tracking-wider text-white uppercase shadow-md sm:top-5 sm:left-5 sm:px-4 sm:py-1.5 sm:text-sm">
        {badge}
      </span>

      <div className="relative flex flex-col items-center">
        <img
          src={amaresTitle}
          alt=""
          width={512}
          height={222}
          loading="lazy"
          decoding="async"
          className="hidden h-20 w-auto sm:block"
        />
        <span
          aria-hidden="true"
          className="mt-2 flex h-14 w-14 items-center justify-center rounded-full bg-white/85 text-[var(--h-accent-strong)] shadow-lg sm:mt-4 sm:h-20 sm:w-20"
        >
          <svg viewBox="0 0 24 24" className="ml-1 h-7 w-7 fill-current sm:h-10 sm:w-10">
            <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5z" />
          </svg>
        </span>
        <p className="mt-2 rounded-full bg-white/85 px-4 py-1 font-display text-lg font-extrabold text-[var(--h-ink)] shadow-sm sm:mt-4 sm:px-6 sm:py-1.5 sm:text-3xl">
          {headline}
        </p>
        {detail && (
          <p className="mt-2 hidden rounded-full bg-white/70 px-4 py-1 text-sm font-semibold text-[var(--h-ink)] sm:block">
            {detail}
          </p>
        )}
      </div>
    </div>
  );
}
