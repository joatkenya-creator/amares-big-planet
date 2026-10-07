/**
 * Midnight Rhythm event page content.
 *
 * To add or swap a video, edit `midnightRhythmVideos` — the page, the "Watch on YouTube"
 * buttons and the SEO tags all read from here.
 */

import type { CSSProperties } from "react";
import type { HolidayDecoration } from "@/lib/holidays";
import { candleStreetHeroVideo } from "@/lib/hero-video";

export const MIDNIGHT_RHYTHM_PATH = "/midnight-rhythm";

export type MidnightRhythmVideo = {
  /** Full YouTube URL (watch, youtu.be, shorts or embed). */
  url: string;
  title: string;
};

export const midnightRhythmVideos: MidnightRhythmVideo[] = [
  {
    url: "https://youtu.be/0xxUkkwFDDs",
    title: "Amare's Big Planet - Midnight Rhythm Exe",
  },
  {
    url: "https://youtu.be/m7lPBU3B5vs",
    title: "Something Big Is Coming to Amare’s Big Planet! | Free Kids App & Halloween Special 🚀",
  },
];

export const midnightRhythmSeo = {
  title: "Midnight Rhythm: Music Videos for Kids | Amare's Big Planet",
  description:
    "When the stars come out, the music turns on! Dance, sing and wiggle along with Amare in the Midnight Rhythm videos from Amare's Big Planet.",
  keywords: [
    "Midnight Rhythm",
    "Amare's Big Planet Midnight Rhythm",
    "music videos for kids",
    "kids dance songs",
    "bedtime music for kids",
  ],
};

// Night sky above, soft lavender below. accentStrong keeps ≥ 4.5:1 contrast with white.
export const MIDNIGHT_RHYTHM_THEME_VARS = {
  "--h-sky-from": "#1e1b4b",
  "--h-sky-to": "#4c1d95",
  "--h-surface": "#f7f5ff",
  "--h-ink": "#2a2a6e",
  "--h-accent": "#a78bfa",
  "--h-accent-soft": "#ede9fe",
  "--h-accent-strong": "#6d28d9",
  "--h-secondary": "#db2777",
  "--h-secondary-soft": "#fce7f3",
} as CSSProperties;

export const MIDNIGHT_RHYTHM_DECORATIONS: HolidayDecoration[] = [
  "moon",
  "note",
  "star",
  "note",
  "sparkle",
  "star",
  "note",
];

// Same looping Cloudinary clip as the homepage hero.
export const midnightRhythmHeroVideo = candleStreetHeroVideo;
