import { Link } from "@tanstack/react-router";
import { useCountdown } from "@/hooks/use-countdown";
import { HolidayDecorationArt } from "@/components/holidays/HolidayArt";
import { getActiveHoliday, getYouTubeVideoId, parseReleaseDate } from "@/lib/holidays";

const pad = (value: number) => String(value).padStart(2, "0");
const plural = (value: number, unit: string) => `${value} ${unit}${value === 1 ? "" : "s"}`;

/**
 * Slim homepage strip promoting the active Special Holidays campaign.
 * Renders nothing when no campaign is active, so the homepage is untouched off-season.
 */
export function HolidayTeaser() {
  const campaign = getActiveHoliday();
  const releaseTime = parseReleaseDate(campaign?.releaseDate ?? "");
  const { parts, isComplete } = useCountdown(releaseTime);
  if (!campaign) return null;

  const { theme } = campaign;
  const released = isComplete && getYouTubeVideoId(campaign.videoUrl) !== null;
  const srText = released
    ? `The ${campaign.holidayName} video is here. Open the Special Holidays page.`
    : parts
      ? `${campaign.holidayName} video in ${plural(parts.days, "day")}, ${plural(parts.hours, "hour")} and ${plural(parts.minutes, "minute")}. Open the Special Holidays page.`
      : `${campaign.holidayName} is coming. Open the Special Holidays page.`;

  return (
    <div
      style={{
        background: `linear-gradient(90deg, ${theme.skyFrom}, ${theme.skyTo})`,
        color: theme.ink,
        borderBottom: `2px solid ${theme.accentSoft}`,
      }}
    >
      <Link
        to="/special-holidays"
        className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-3 gap-y-1 px-4 py-2.5 text-center font-semibold transition-opacity hover:opacity-90 sm:px-6"
      >
        <span className="sr-only">{srText}</span>
        <HolidayDecorationArt type={theme.decorations[0]} className="h-7 w-auto shrink-0 sm:h-8" />
        <span
          aria-hidden="true"
          className="hidden font-display text-base font-extrabold min-[400px]:inline sm:text-lg"
        >
          {released
            ? `The ${campaign.holidayName} video is here!`
            : `${campaign.holidayName} ${campaign.year} is coming!`}
        </span>
        {!released && parts && (
          <span
            aria-hidden="true"
            className="rounded-full bg-white/80 px-3 py-1 text-sm font-extrabold tabular-nums sm:text-base"
            suppressHydrationWarning
          >
            {parts.days}d : {pad(parts.hours)}h : {pad(parts.minutes)}m : {pad(parts.seconds)}s
          </span>
        )}
        <span
          aria-hidden="true"
          className="rounded-full px-4 py-1 text-sm font-extrabold text-white sm:text-base"
          style={{ background: theme.accentStrong }}
        >
          {released ? "Watch now →" : "See the countdown →"}
        </span>
      </Link>
    </div>
  );
}
