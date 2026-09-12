import { getHolidayNavEmoji } from "@/lib/holidays";

type SpecialHolidaysNavLabelProps = {
  /**
   * Classes for the word "Special". Pass e.g. "sr-only xl:not-sr-only" to show a compact
   * "🎃 Holidays" in tight headers while screen readers always hear "Special Holidays".
   */
  specialClassName?: string;
};

/** Nav tab text; the emoji follows the active holiday campaign. */
export function SpecialHolidaysNavLabel({ specialClassName = "" }: SpecialHolidaysNavLabelProps) {
  return (
    <>
      <span aria-hidden="true">{getHolidayNavEmoji()} </span>
      <span className={specialClassName}>Special </span>
      Holidays
    </>
  );
}
