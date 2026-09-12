import type { CountdownParts } from "@/hooks/use-countdown";

const pad = (value: number) => String(value).padStart(2, "0");
const plural = (value: number, unit: string) => `${value} ${unit}${value === 1 ? "" : "s"}`;

type HolidayCountdownProps = {
  parts: CountdownParts;
  /** Used in the screen-reader summary, e.g. "the Halloween video". */
  subject: string;
};

export function HolidayCountdown({ parts, subject }: HolidayCountdownProps) {
  const units = [
    { label: "Days", value: parts.days },
    { label: "Hours", value: parts.hours },
    { label: "Minutes", value: parts.minutes },
    { label: "Seconds", value: parts.seconds },
  ];

  return (
    // role="timer" is not announced automatically; the summary only changes once a minute,
    // so screen-reader users can read it on demand without being flooded every second.
    <div role="timer" aria-live="off" aria-atomic="true">
      <p className="sr-only" suppressHydrationWarning>
        {`${plural(parts.days, "day")}, ${plural(parts.hours, "hour")} and ${plural(parts.minutes, "minute")} until ${subject} is released.`}
      </p>
      <ol aria-hidden="true" className="grid grid-cols-4 gap-2 sm:gap-3">
        {units.map((unit) => (
          <li
            key={unit.label}
            className="flex flex-col items-center overflow-hidden rounded-2xl bg-white px-1 py-3 shadow-[0_6px_0_var(--h-accent-soft-shadow)] ring-2 ring-[var(--h-accent-soft)] sm:py-4"
          >
            <span
              // Re-keying replays the tick animation whenever the value changes.
              key={unit.value}
              className="holiday-digit block font-display text-[clamp(1.9rem,8vw,3.5rem)] leading-none font-extrabold text-[var(--h-ink)] tabular-nums"
              suppressHydrationWarning
            >
              {pad(unit.value)}
            </span>
            <span className="mt-1.5 text-[0.65rem] font-bold tracking-wider text-[var(--h-secondary)] uppercase sm:text-sm">
              {unit.label}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}
