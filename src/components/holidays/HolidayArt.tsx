import type { HolidayDecoration } from "@/lib/holidays";

type ArtProps = { className?: string; style?: React.CSSProperties };

// Friendly, non-scary illustrations. All decorative: callers render them aria-hidden.

export function Pumpkin({ className, style }: ArtProps) {
  return (
    <svg
      viewBox="0 0 120 112"
      className={className}
      style={style}
      aria-hidden="true"
      focusable="false"
    >
      <path d="M58 22c-1-9 3-16 11-19l4 6c-6 3-8 8-7 14z" fill="#65a30d" />
      <path d="M66 12c8-7 18-7 24-2-7 6-16 7-24 2z" fill="#84cc16" />
      <ellipse cx="36" cy="66" rx="30" ry="40" fill="#f97316" />
      <ellipse cx="84" cy="66" rx="30" ry="40" fill="#f97316" />
      <ellipse cx="60" cy="66" rx="32" ry="44" fill="#fb923c" />
      <path
        d="M60 24c-6 12-6 72 0 86M60 24c6 12 6 72 0 86"
        stroke="#ea580c"
        strokeWidth="2"
        fill="none"
        opacity=".5"
      />
      <path
        d="M40 58q7-9 14 0M66 58q7-9 14 0"
        stroke="#7c2d12"
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="36" cy="72" r="6" fill="#fda4af" opacity=".75" />
      <circle cx="84" cy="72" r="6" fill="#fda4af" opacity=".75" />
      <path d="M44 74q16 20 32 0z" fill="#7c2d12" />
      <path
        d="M52 80q8 6 16 0"
        stroke="#fb7185"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

export function Ghost({ className, style }: ArtProps) {
  return (
    <svg
      viewBox="0 0 80 100"
      className={className}
      style={style}
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M40 4C20 4 8 20 8 42v50l10-8 11 8 11-8 11 8 11-8 10 8V42C72 20 60 4 40 4z"
        fill="#ffffff"
        stroke="#ddd6fe"
        strokeWidth="2.5"
      />
      <ellipse cx="29" cy="42" rx="4.5" ry="6.5" fill="#2a2a6e" />
      <ellipse cx="51" cy="42" rx="4.5" ry="6.5" fill="#2a2a6e" />
      <circle cx="30.5" cy="40" r="1.6" fill="#fff" />
      <circle cx="52.5" cy="40" r="1.6" fill="#fff" />
      <circle cx="21" cy="54" r="4.5" fill="#fbcfe8" />
      <circle cx="59" cy="54" r="4.5" fill="#fbcfe8" />
      <path
        d="M33 55q7 7 14 0"
        stroke="#2a2a6e"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

export function Bat({ className, style }: ArtProps) {
  return (
    <svg
      viewBox="0 0 100 52"
      className={className}
      style={style}
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M50 16c-5 0-8 3-10 7C34 14 22 10 8 14c6 4 9 11 7 18 7-5 16-5 20 2 3-5 9-7 15-7s12 2 15 7c4-7 13-7 20-2-2-7 1-14 7-18-14-4-26 0-32 9-2-4-5-7-10-7z"
        fill="#7c3aed"
      />
      <path d="M43 17l2-8 4 6M57 17l-2-8-4 6" fill="#7c3aed" />
      <circle cx="46" cy="22" r="2.2" fill="#fff" />
      <circle cx="54" cy="22" r="2.2" fill="#fff" />
      <path
        d="M47 28q3 2.5 6 0"
        stroke="#fff"
        strokeWidth="1.6"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

export function Star({ className, style }: ArtProps) {
  return (
    <svg
      viewBox="0 0 40 40"
      className={className}
      style={style}
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M20 2l5.3 11.6 12.7 1.3-9.5 8.6 2.7 12.5L20 29.6 8.8 36l2.7-12.5L2 14.9l12.7-1.3z"
        fill="#facc15"
        stroke="#f59e0b"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Sparkle({ className, style }: ArtProps) {
  return (
    <svg
      viewBox="0 0 40 40"
      className={className}
      style={style}
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M20 2c2 11 7 16 18 18-11 2-16 7-18 18-2-11-7-16-18-18 11-2 16-7 18-18z"
        fill="#fde68a"
      />
    </svg>
  );
}

export function Moon({ className, style }: ArtProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      style={style}
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="50" cy="50" r="46" fill="#fef3c7" />
      <circle cx="50" cy="50" r="38" fill="#fde68a" />
      <circle cx="36" cy="36" r="6" fill="#fcd34d" />
      <circle cx="74" cy="66" r="6" fill="#fcd34d" />
      <circle cx="62" cy="32" r="4" fill="#fcd34d" />
      <path
        d="M36 58q14 12 28 0"
        stroke="#b45309"
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="38" cy="48" r="3" fill="#b45309" />
      <circle cx="62" cy="48" r="3" fill="#b45309" />
    </svg>
  );
}

export function Candy({ className, style }: ArtProps) {
  return (
    <svg
      viewBox="0 0 80 40"
      className={className}
      style={style}
      aria-hidden="true"
      focusable="false"
    >
      <path d="M22 20L4 8v24zM58 20l18-12v24z" fill="#a78bfa" />
      <circle cx="40" cy="20" r="16" fill="#f472b6" />
      <path
        d="M30 8q10 12 0 24M40 4q10 16 0 32M50 8q10 12 0 24"
        stroke="#fff"
        strokeWidth="3"
        fill="none"
        opacity=".8"
      />
    </svg>
  );
}

export function MusicNote({ className, style }: ArtProps) {
  return (
    <svg
      viewBox="0 0 64 72"
      className={className}
      style={style}
      aria-hidden="true"
      focusable="false"
    >
      <path d="M21 16L55 6v10L21 26z" fill="#a78bfa" />
      <rect x="20" y="16" width="5" height="42" rx="2.5" fill="#a78bfa" />
      <rect x="51" y="6" width="5" height="44" rx="2.5" fill="#a78bfa" />
      <ellipse cx="14" cy="58" rx="11" ry="8.5" transform="rotate(-20 14 58)" fill="#f472b6" />
      <ellipse cx="45" cy="50" rx="11" ry="8.5" transform="rotate(-20 45 50)" fill="#f472b6" />
      <circle cx="10" cy="55" r="2.5" fill="#fff" opacity=".8" />
      <circle cx="41" cy="47" r="2.5" fill="#fff" opacity=".8" />
    </svg>
  );
}

export function ChristmasTree({ className, style }: ArtProps) {
  return (
    <svg
      viewBox="0 0 100 114"
      className={className}
      style={style}
      aria-hidden="true"
      focusable="false"
    >
      <rect x="43" y="98" width="14" height="14" rx="3" fill="#92400e" />
      <path d="M50 50L94 102H6z" fill="#15803d" />
      <path d="M50 30L84 74H16z" fill="#16a34a" />
      <path d="M50 14L74 48H26z" fill="#22c55e" />
      <polygon
        points="50,0 52.4,6.8 59.5,6.9 53.8,11.2 55.9,18.1 50,14 44.1,18.1 46.2,11.2 40.5,6.9 47.6,6.8"
        fill="#facc15"
        stroke="#f59e0b"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <circle cx="41" cy="42" r="4" fill="#ef4444" />
      <circle cx="64" cy="62" r="4.5" fill="#facc15" />
      <circle cx="22" cy="94" r="4.5" fill="#60a5fa" />
      <circle cx="78" cy="94" r="4.5" fill="#ef4444" />
      <circle cx="42" cy="80" r="3" fill="#14532d" />
      <circle cx="58" cy="80" r="3" fill="#14532d" />
      <circle cx="36" cy="87" r="3.5" fill="#fda4af" opacity=".75" />
      <circle cx="64" cy="87" r="3.5" fill="#fda4af" opacity=".75" />
      <path
        d="M43 88q7 6 14 0"
        stroke="#14532d"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

export function Snowflake({ className, style }: ArtProps) {
  const arm = (
    <path
      d="M20 3v34M15 7l5 4 5-4M15 33l5-4 5 4"
      stroke="#60a5fa"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  );
  return (
    <svg
      viewBox="0 0 40 40"
      className={className}
      style={style}
      aria-hidden="true"
      focusable="false"
    >
      {arm}
      <g transform="rotate(60 20 20)">{arm}</g>
      <g transform="rotate(120 20 20)">{arm}</g>
      <circle cx="20" cy="20" r="3" fill="#e0f2fe" stroke="#60a5fa" strokeWidth="1.5" />
    </svg>
  );
}

export function Gift({ className, style }: ArtProps) {
  return (
    <svg
      viewBox="0 0 80 80"
      className={className}
      style={style}
      aria-hidden="true"
      focusable="false"
    >
      <ellipse cx="29" cy="17" rx="11" ry="7" transform="rotate(-25 29 17)" fill="#facc15" stroke="#f59e0b" strokeWidth="2" />
      <ellipse cx="51" cy="17" rx="11" ry="7" transform="rotate(25 51 17)" fill="#facc15" stroke="#f59e0b" strokeWidth="2" />
      <rect x="8" y="34" width="64" height="40" rx="6" fill="#ef4444" />
      <rect x="4" y="24" width="72" height="14" rx="5" fill="#f87171" />
      <rect x="35" y="24" width="10" height="50" fill="#facc15" />
      <circle cx="40" cy="22" r="5.5" fill="#f59e0b" />
    </svg>
  );
}

export function Bell({ className, style }: ArtProps) {
  return (
    <svg
      viewBox="0 0 70 80"
      className={className}
      style={style}
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M35 12C21 12 15 25 15 40v11l-8 10h56l-8-10V40c0-15-6-28-20-28z"
        fill="#facc15"
        stroke="#f59e0b"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <path
        d="M25 26q-4 10-3 22"
        stroke="#fff"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
        opacity=".6"
      />
      <circle cx="35" cy="68" r="7" fill="#f59e0b" />
      <ellipse cx="26" cy="11" rx="9" ry="4.5" transform="rotate(-25 26 11)" fill="#16a34a" />
      <ellipse cx="44" cy="11" rx="9" ry="4.5" transform="rotate(25 44 11)" fill="#16a34a" />
      <circle cx="35" cy="11" r="4" fill="#ef4444" />
    </svg>
  );
}

const DECORATIONS: Record<HolidayDecoration, (props: ArtProps) => React.JSX.Element> = {
  pumpkin: Pumpkin,
  ghost: Ghost,
  bat: Bat,
  star: Star,
  moon: Moon,
  candy: Candy,
  sparkle: Sparkle,
  note: MusicNote,
  tree: ChristmasTree,
  snowflake: Snowflake,
  gift: Gift,
  bell: Bell,
};

export function HolidayDecorationArt({ type, ...props }: ArtProps & { type: HolidayDecoration }) {
  const Art = DECORATIONS[type];
  return <Art {...props} />;
}

export type DecorationSlot = {
  /** Positioning, size and animation classes (literal Tailwind strings). */
  className: string;
};

/**
 * Places a theme's decorations into predefined slots, cycling through the list,
 * so any holiday theme fills the same layout with its own artwork.
 */
export function DecorationScatter({
  decorations,
  slots,
}: {
  decorations: HolidayDecoration[];
  slots: DecorationSlot[];
}) {
  if (decorations.length === 0) return null;
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      {slots.map((slot, index) => (
        <HolidayDecorationArt
          key={index}
          type={decorations[index % decorations.length]}
          className={`absolute ${slot.className}`}
        />
      ))}
    </div>
  );
}
