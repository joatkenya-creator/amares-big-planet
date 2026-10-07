import type { HeroBackgroundVideoSources } from "@/components/HeroBackgroundVideo";

// Looping hero background (Cloudinary), used on the homepage and Midnight Rhythm heroes.
// Posters are the frame at 2s — the first frame is black.
const BASE = "https://res.cloudinary.com/dee2vqvzl/video/upload";
const ID = "v1791391483/videoplayback_hn669f";

export const candleStreetHeroVideo: HeroBackgroundVideoSources = {
  desktopSrc: `${BASE}/so_0,eo_15,ac_none,q_auto,w_1280/${ID}.mp4`,
  mobileSrc: `${BASE}/so_0,eo_15,ac_none,q_auto,w_720/${ID}.mp4`,
  desktopPoster: `${BASE}/so_2,q_auto,f_auto,w_1280/${ID}.jpg`,
  mobilePoster: `${BASE}/so_2,q_auto,f_auto,w_720/${ID}.jpg`,
};
