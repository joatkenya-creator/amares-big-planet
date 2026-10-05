import { Link } from "@tanstack/react-router";
import { DecorationScatter, type DecorationSlot } from "@/components/holidays/HolidayArt";
import { PAGE_CSS, primaryButton } from "@/components/holidays/HolidayCampaignView";
import {
  MIDNIGHT_RHYTHM_DECORATIONS as DECORATIONS,
  MIDNIGHT_RHYTHM_THEME_VARS as THEME_VARS,
} from "@/lib/midnight-rhythm";

const CARD_SLOTS: DecorationSlot[] = [
  { className: "holiday-float top-4 right-4 w-16 opacity-90 sm:top-6 sm:right-8 sm:w-24" },
  { className: "holiday-drift right-[30%] bottom-4 hidden w-10 opacity-80 sm:block" },
  { className: "holiday-twinkle top-5 left-[46%] w-5 sm:w-7 [animation-delay:-1s]" },
  {
    className: "holiday-drift right-6 bottom-6 w-10 opacity-90 sm:w-14 [animation-delay:-2s]",
  },
  { className: "holiday-twinkle bottom-8 left-[60%] hidden w-6 sm:block [animation-delay:-2.5s]" },
];

/** Teaser on /special-holidays that links to the Midnight Rhythm page. */
export function MidnightRhythmCard() {
  return (
    // Its own holiday-page scope so buttons use the night theme, not the active holiday's.
    <section
      aria-labelledby="midnight-card-heading"
      className="holiday-page pb-14 sm:pb-20"
      style={THEME_VARS}
    >
      <style>{PAGE_CSS}</style>
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div
          className="relative overflow-hidden rounded-[2rem] px-6 py-10 text-white shadow-pop sm:px-12 sm:py-12"
          style={{
            background: "linear-gradient(135deg, var(--h-sky-from) 0%, var(--h-sky-to) 100%)",
          }}
        >
          <DecorationScatter decorations={DECORATIONS} slots={CARD_SLOTS} />
          <div className="relative max-w-lg text-center sm:text-left">
            <p className="text-sm font-extrabold tracking-wider text-[#f9a8d4] uppercase">
              More special fun
            </p>
            <h2
              id="midnight-card-heading"
              className="mt-2 font-display text-3xl font-extrabold sm:text-4xl"
            >
              <span aria-hidden="true">🌙 </span>
              Midnight Rhythm
            </h2>
            <p className="mt-3 text-lg font-medium text-white/90">
              When the stars come out, the music turns on! Dance and sing along with Amare.
            </p>
            <Link to="/midnight-rhythm" className={`${primaryButton} mt-6`}>
              <span aria-hidden="true">🎵</span> Visit Midnight Rhythm
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
