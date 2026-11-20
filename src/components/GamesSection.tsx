import { useEffect, useState } from "react";
import {
  APP_STORE_URL,
  GAME_DESCRIPTION,
  GAME_TITLE,
  detectPlatform,
  gameIconUrl,
  playStoreUrl,
  type Platform,
} from "@/lib/game";

const PLAY_STORE_URL = playStoreUrl("games-section");

const storeButton =
  "inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full px-6 py-3 text-base font-extrabold text-white shadow-soft transition hover:-translate-y-0.5 hover:brightness-110 focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[var(--grape)] sm:w-auto";

function AppStoreButton() {
  return (
    <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer" className={`${storeButton} bg-[#111]`}>
      Download free on the App Store
      <span className="sr-only">(opens in a new tab)</span>
    </a>
  );
}

function PlayStoreButton() {
  return (
    <a href={PLAY_STORE_URL} target="_blank" rel="noopener noreferrer" className={`${storeButton} bg-[#16a34a]`}>
      <span aria-hidden="true">▶</span> Get it free on Google Play
      <span className="sr-only">(opens in a new tab)</span>
    </a>
  );
}

/** Homepage "Games" section (target of the #games nav link) with download links for the ABCs app. */
export function GamesSection() {
  // Both buttons always show (parents may be choosing for another device); the visitor's own store goes first.
  const [platform, setPlatform] = useState<Platform>("desktop");
  useEffect(() => setPlatform(detectPlatform()), []);

  return (
    <section id="games" aria-labelledby="games-heading" className="scroll-mt-24 py-20 sm:py-28 bg-background">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="text-center mb-10">
          <p className="font-bold text-[var(--grape)] uppercase tracking-widest mb-3">Games</p>
          <h2 id="games-heading" className="font-display text-4xl sm:text-6xl font-extrabold text-foreground">
            <span aria-hidden="true">🎮 </span>Play With <span className="text-[#E24B4A]">Amare</span>
          </h2>
          <p className="mt-4 text-lg sm:text-xl text-muted-foreground font-medium">
            Our free learning game for little explorers.
          </p>
        </div>

        <div className="rounded-[2.5rem] bg-[var(--secondary)] p-6 sm:p-10 shadow-soft">
          <div className="flex flex-col items-center gap-6 text-center md:flex-row md:items-center md:gap-10 md:text-left">
            <img
              src={gameIconUrl(320)}
              alt={`${GAME_TITLE} game icon`}
              width={160}
              height={160}
              loading="lazy"
              decoding="async"
              className="h-32 w-32 shrink-0 rounded-[2rem] shadow-pop sm:h-40 sm:w-40"
            />
            <div className="flex-1">
              <div className="flex flex-wrap items-center justify-center gap-3 md:justify-start">
                <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-foreground">{GAME_TITLE}</h3>
                <span className="rounded-full bg-[#16a34a] px-3 py-1 text-xs font-extrabold tracking-wider text-white uppercase">
                  Free
                </span>
              </div>
              <p className="mt-3 text-lg text-foreground/80 font-medium">{GAME_DESCRIPTION}</p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap md:justify-start">
                {platform === "android" ? (
                  <>
                    <PlayStoreButton />
                    <AppStoreButton />
                  </>
                ) : (
                  <>
                    <AppStoreButton />
                    <PlayStoreButton />
                  </>
                )}
              </div>
              <p className="mt-5 text-sm font-semibold text-foreground/70">
                <span aria-hidden="true">👨‍👩‍👧 </span>For parents: free to download · ages 2–10
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
