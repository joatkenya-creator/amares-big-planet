import { useEffect, useState } from "react";

export type HeroBackgroundVideoSources = {
  /** Video for screens 768px and wider. */
  desktopSrc: string;
  /** Lighter video for screens under 768px. */
  mobileSrc: string;
  /** Still frames shown first, as the video poster, and as the fallback. */
  desktopPoster: string;
  mobilePoster: string;
};

const MOBILE_QUERY = "(max-width: 767px)";
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

/**
 * Decorative looping background for a hero section. Fills its positioned parent.
 *
 * The still poster renders on the server, so there is always a background. The video is
 * only added once the page has finished loading, never for visitors who prefer reduced
 * motion, and it is removed again if it fails to load or autoplay is blocked — leaving the
 * still image in place.
 */
export function HeroBackgroundVideo({
  desktopSrc,
  mobileSrc,
  desktopPoster,
  mobilePoster,
}: HeroBackgroundVideoSources) {
  const [video, setVideo] = useState<{ src: string; poster: string } | null>(null);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (failed) return;
    const reducedMotion = window.matchMedia(REDUCED_MOTION_QUERY);

    const start = () => {
      if (reducedMotion.matches) return;
      const mobile = window.matchMedia(MOBILE_QUERY).matches;
      setVideo(
        mobile
          ? { src: mobileSrc, poster: mobilePoster }
          : { src: desktopSrc, poster: desktopPoster },
      );
    };
    const onMotionChange = () => {
      if (reducedMotion.matches) {
        setVideo(null);
        setPlaying(false);
      } else {
        start();
      }
    };

    reducedMotion.addEventListener("change", onMotionChange);
    if (document.readyState === "complete") {
      start();
    } else {
      window.addEventListener("load", start, { once: true });
    }
    return () => {
      reducedMotion.removeEventListener("change", onMotionChange);
      window.removeEventListener("load", start);
    };
  }, [desktopSrc, mobileSrc, desktopPoster, mobilePoster, failed]);

  const fail = () => {
    setFailed(true);
    setVideo(null);
    setPlaying(false);
  };

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <picture>
        <source media={MOBILE_QUERY} srcSet={mobilePoster} />
        <img
          src={desktopPoster}
          alt=""
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </picture>
      {video && (
        <video
          key={video.src}
          ref={(el) => {
            if (!el) return;
            // Set as a property too: some mobile browsers only allow autoplay when muted is.
            el.muted = true;
            el.play().catch(fail);
          }}
          src={video.src}
          poster={video.poster}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          disablePictureInPicture
          tabIndex={-1}
          onPlaying={() => setPlaying(true)}
          onError={fail}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
            playing ? "opacity-100" : "opacity-0"
          }`}
        />
      )}
    </div>
  );
}
