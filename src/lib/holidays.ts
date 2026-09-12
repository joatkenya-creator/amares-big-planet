/**
 * Special Holidays campaigns.
 *
 * Everything a seasonal campaign needs lives in its config object below.
 * To launch a new holiday (e.g. Christmas), add another entry to `holidayCampaigns`
 * with `status: "active"` and set the previous one to `"archived"` — no component
 * changes are required.
 *
 * The release state (countdown → "It's here!") is computed automatically from
 * `releaseDate`; nobody has to edit the page when the countdown finishes.
 */

export type HolidayDecoration = "pumpkin" | "ghost" | "bat" | "star" | "moon" | "candy" | "sparkle";

export type HolidayTheme = {
  /** Shown in the nav tab and headings, e.g. "🎃". */
  emoji: string;
  /** Soft hero sky gradient (top → bottom). Keep it light and child-friendly. */
  skyFrom: string;
  skyTo: string;
  /** Page background below the hero. */
  surface: string;
  /** Heading / body ink. Must stay readable on `surface` and white cards. */
  ink: string;
  /** Decorative accent (illustrations, borders, soft fills). */
  accent: string;
  accentSoft: string;
  /** Buttons and accent text. Must have ≥ 4.5:1 contrast with white. */
  accentStrong: string;
  /** Secondary accent used for labels and countdown details. */
  secondary: string;
  secondarySoft: string;
  /** Floating illustrations used around the page. */
  decorations: HolidayDecoration[];
};

export type HolidayCampaign = {
  slug: string;
  holidayName: string;
  year: number;
  /** "active" campaigns are featured on /special-holidays. Release state is automatic. */
  status: "active" | "archived";
  title: string;
  description: string;
  /**
   * ISO 8601 date-time WITH a UTC offset, so every visitor counts down to the same moment.
   * Example: "2026-10-25T18:00:00+03:00" is 6:00 PM East Africa Time.
   */
  releaseDate: string;
  /** IANA time zone used to display the release date, plus a short human label. */
  releaseTimeZone: string;
  releaseTimeZoneLabel: string;
  /** Full YouTube URL (watch, youtu.be, shorts or embed). Leave "" until the video exists. */
  videoUrl: string;
  videoTitle: string;
  /** Optional custom thumbnail (imported asset or /public path). Falls back to an illustration / the YouTube thumbnail. */
  thumbnail?: string;
  message: {
    heading: string;
    body: string;
  };
  seo: {
    title: string;
    description: string;
    /** Absolute path under /public, used for Open Graph / Twitter previews. */
    image: string;
    imageAlt: string;
    keywords: string[];
  };
  theme: HolidayTheme;
};

export const holidayCampaigns: HolidayCampaign[] = [
  {
    slug: "halloween-2026",
    holidayName: "Halloween",
    year: 2026,
    status: "active",
    title: "Something Spooky Is Coming!",
    description: "Get ready for a special Halloween adventure from Amare's Big Planet!",
    releaseDate: "2026-10-25T18:00:00+03:00",
    releaseTimeZone: "Africa/Nairobi",
    releaseTimeZoneLabel: "EAT",
    videoUrl: "",
    videoTitle: "Halloween Adventure",
    thumbnail: undefined,
    message: {
      heading: "Get Ready for Halloween!",
      body: "Amare's Big Planet is getting ready for a fun-filled Halloween adventure! Join us for a special video made for curious young learners and families.",
    },
    seo: {
      title: "Halloween 2026 for Kids | Amare's Big Planet",
      description:
        "Get ready for a fun Halloween adventure for kids with Amare's Big Planet. Discover our special Halloween video and join the countdown!",
      image: "/og/halloween-2026.png",
      imageAlt: "Friendly smiling pumpkin, ghost and stars for Amare's Big Planet Halloween 2026",
      keywords: [
        "Halloween for kids",
        "Halloween video for kids",
        "kids Halloween song",
        "Amare's Big Planet Halloween",
        "not scary Halloween for kids",
      ],
    },
    theme: {
      emoji: "🎃",
      skyFrom: "#efe6ff",
      skyTo: "#ffe8d1",
      surface: "#fffaf3",
      ink: "#2a2a6e",
      accent: "#f97316",
      accentSoft: "#ffedd5",
      accentStrong: "#c2410c",
      secondary: "#6d28d9",
      secondarySoft: "#ede9fe",
      decorations: ["pumpkin", "ghost", "star", "bat", "moon", "candy", "sparkle"],
    },
  },
];

export const SPECIAL_HOLIDAYS_PATH = "/special-holidays";

export function getActiveHoliday(): HolidayCampaign | undefined {
  return holidayCampaigns.find((campaign) => campaign.status === "active");
}

/** Emoji for the nav tab: follows the active campaign so the tab updates with the season. */
export function getHolidayNavEmoji(): string {
  return getActiveHoliday()?.theme.emoji ?? "🎉";
}

/** Returns the release timestamp, or null when the configured date is missing or invalid. */
export function parseReleaseDate(value: string): number | null {
  if (!value) return null;
  const time = Date.parse(value);
  return Number.isNaN(time) ? null : time;
}

/** Extracts an 11-character YouTube video id from common URL shapes; null if not a valid YouTube video URL. */
export function getYouTubeVideoId(url: string): string | null {
  if (!url?.trim()) return null;
  try {
    const parsed = new URL(url.trim());
    const host = parsed.hostname.replace(/^(www|m)\./, "");
    let id: string | null = null;
    if (host === "youtu.be") {
      id = parsed.pathname.slice(1).split("/")[0];
    } else if (["youtube.com", "music.youtube.com", "youtube-nocookie.com"].includes(host)) {
      if (parsed.pathname === "/watch") {
        id = parsed.searchParams.get("v");
      } else {
        id = parsed.pathname.match(/^\/(?:embed|shorts|live|v)\/([^/?#]+)/)?.[1] ?? null;
      }
    }
    return id && /^[A-Za-z0-9_-]{11}$/.test(id) ? id : null;
  } catch {
    return null;
  }
}

/** Formats the release date in the campaign's time zone, e.g. "Sunday, October 25, 2026 · 6:00 PM EAT". */
export function formatReleaseDate(campaign: HolidayCampaign): string | null {
  const time = parseReleaseDate(campaign.releaseDate);
  if (time === null) return null;
  try {
    const parts = new Intl.DateTimeFormat("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
      timeZone: campaign.releaseTimeZone,
    }).formatToParts(new Date(time));
    const get = (type: Intl.DateTimeFormatPartTypes) =>
      parts.find((part) => part.type === type)?.value ?? "";
    // Built from parts so server and browser render identical text.
    return `${get("weekday")}, ${get("month")} ${get("day")}, ${get("year")} · ${get("hour")}:${get("minute")} ${get("dayPeriod").toUpperCase()} ${campaign.releaseTimeZoneLabel}`.trim();
  } catch {
    return null;
  }
}
