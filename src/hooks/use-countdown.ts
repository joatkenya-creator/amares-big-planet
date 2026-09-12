import { useEffect, useState } from "react";

export type CountdownParts = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

export type Countdown = {
  /** null when the target date is missing or invalid. */
  parts: CountdownParts | null;
  isComplete: boolean;
};

const ZERO: CountdownParts = { days: 0, hours: 0, minutes: 0, seconds: 0 };

function toParts(msLeft: number): CountdownParts {
  const totalSeconds = Math.max(0, Math.floor(msLeft / 1000));
  return {
    days: Math.floor(totalSeconds / 86_400),
    hours: Math.floor((totalSeconds % 86_400) / 3_600),
    minutes: Math.floor((totalSeconds % 3_600) / 60),
    seconds: totalSeconds % 60,
  };
}

/**
 * Live countdown to `targetTime` (epoch ms). Always derives from the real clock,
 * so it self-corrects after background-tab throttling or device sleep.
 * Stops ticking once the target is reached.
 */
export function useCountdown(targetTime: number | null): Countdown {
  const [now, setNow] = useState(() => Date.now());
  const isComplete = targetTime !== null && now >= targetTime;

  useEffect(() => {
    if (targetTime === null || isComplete) return;
    let timeout: ReturnType<typeof setTimeout>;
    const tick = () => {
      const current = Date.now();
      setNow(current);
      if (current >= targetTime) return;
      // Align ticks to the wall-clock second so digits change together.
      timeout = setTimeout(tick, 1000 - (current % 1000) + 10);
    };
    tick();
    const onVisible = () => document.visibilityState === "visible" && setNow(Date.now());
    document.addEventListener("visibilitychange", onVisible);
    return () => {
      clearTimeout(timeout);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [targetTime, isComplete]);

  if (targetTime === null) return { parts: null, isComplete: false };
  return { parts: isComplete ? ZERO : toParts(targetTime - now), isComplete };
}
