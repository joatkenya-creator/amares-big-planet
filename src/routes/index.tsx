import { createFileRoute } from "@tanstack/react-router";
import heroImg from "@/assets/amare-hero.jpg";
import amaresLogo from "@/assets/amares-logo.jpeg";
import amaresTitle from "@/assets/amares-title.png";

import planetMascot from "@/assets/planet-mascot.png";
import sunMascot from "@/assets/sun-mascot.png";
import rainbowMascot from "@/assets/rainbow-mascot.png";
import musicMascot from "@/assets/music-mascot.png";

export const Route = createFileRoute("/")({
  component: Index,
});

const navLinks = ["Shows", "Music", "Characters", "Games", "Parents"];

const shows = [
  {
    title: "Around the World with Amare",
    desc: "Explore continents, countries, and cultures through silly songs.",
    color: "bg-[var(--sky)] text-[var(--sky-foreground)]",
    emoji: "🌍",
  },
  {
    title: "Amare's Animal Band",
    desc: "Meet musical animal friends from every corner of the planet.",
    color: "bg-[var(--bubblegum)] text-[var(--bubblegum-foreground)]",
    emoji: "🎺",
  },
  {
    title: "Bedtime on the Big Planet",
    desc: "Soft lullabies and cozy stories to drift off to dreamland.",
    color: "bg-[var(--grape)] text-[var(--grape-foreground)]",
    emoji: "🌙",
  },
  {
    title: "Color & Counting Adventures",
    desc: "Learn colors, numbers, and shapes with hands-on fun.",
    color: "bg-[var(--leaf)] text-[var(--leaf-foreground)]",
    emoji: "🎨",
  },
];

const characters = [
  { name: "Amare", img: heroImg, desc: "Curious. Kind. Always ready to sing!" },
  { name: "Pip the Planet", img: planetMascot, desc: "A whole world of giggles." },
  { name: "Sunny", img: sunMascot, desc: "Brightens every morning song." },
  { name: "Bow", img: rainbowMascot, desc: "Loves colors and rainy days." },
  { name: "Melody", img: musicMascot, desc: "Hums a tune for every feeling." },
];

function Index() {
  return (
    <div className="min-h-screen overflow-hidden bg-background">
      {/* NAV */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b-4 border-[var(--primary)]/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-3 flex items-center justify-between">
          <a href="#" className="flex items-center gap-3 group">
            <img
              src={amaresLogo}
              alt="Amare's Big Planet logo"
              width={56}
              height={56}
              className="h-14 w-14 rounded-xl object-cover bg-[#0a0d4a] group-hover:animate-wiggle"
            />
            <img
              src={amaresTitle}
              alt="Amare's Big Planet"
              className="h-10 sm:h-12 w-auto object-contain"
            />
          </a>
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((l) => (
              <a
                key={l}
                href={`#${l.toLowerCase()}`}
                className="px-4 py-2 rounded-full font-semibold text-foreground hover:bg-[var(--sunshine)] hover:text-[var(--sunshine-foreground)] transition-colors"
              >
                {l}
              </a>
            ))}
          </nav>
          <a
            href="#watch"
            className="rounded-full bg-[var(--bubblegum)] text-[var(--bubblegum-foreground)] px-5 py-2.5 font-bold shadow-bounce hover:translate-y-1 hover:shadow-none transition-all"
          >
            ▶ Watch
          </a>
        </div>
      </header>

      {/* HERO */}
      <section className="relative bg-hero pt-10 pb-24 sm:pt-16 sm:pb-32 overflow-hidden">
        {/* YouTube video background */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <iframe
            src="https://www.youtube.com/embed/bRm-MR5inI4?autoplay=1&mute=1&loop=1&playlist=bRm-MR5inI4&controls=0&showinfo=0&modestbranding=1&playsinline=1&rel=0&iv_load_policy=3"
            title="Background video"
            allow="autoplay; encrypted-media"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[177.78vh] min-w-[177.78vh] h-[56.25vw] min-h-[56.25vw] border-0 scale-150"
          />
          <div className="absolute inset-0 bg-black/70" />
        </div>
        {/* floating decor */}
        <img
          src={sunMascot}
          alt=""
          aria-hidden
          className="absolute top-10 right-6 w-20 sm:w-32 animate-float-slow"
        />
        <img
          src={rainbowMascot}
          alt=""
          aria-hidden
          className="absolute bottom-10 left-4 w-24 sm:w-40 animate-float-slow"
          style={{ animationDelay: "1s" }}
        />
        <div className="absolute top-1/3 left-10 w-6 h-6 rounded-full bg-[var(--bubblegum)] animate-bounce-soft" />
        <div className="absolute top-20 left-1/3 w-4 h-4 rounded-full bg-[var(--sunshine)] animate-bounce-soft" style={{ animationDelay: "0.6s" }} />
        <div className="absolute bottom-32 right-1/4 w-5 h-5 rounded-full bg-[var(--leaf)] animate-bounce-soft" style={{ animationDelay: "1.2s" }} />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 text-center">
          <span className="inline-block bg-white rounded-full px-5 py-2 font-bold text-[var(--primary)] shadow-soft mb-6">
            🎵 New songs every week!
          </span>
          <h1 className="font-display font-extrabold leading-[0.9] tracking-tight">
            <span className="block text-2xl sm:text-3xl font-bold text-[var(--primary)] mb-4 uppercase tracking-[0.3em]">
              Welcome to
            </span>
            <img
              src={amaresTitle}
              alt="Amaré's Big Planet"
              className="mx-auto w-full max-w-[460px] sm:max-w-2xl md:max-w-4xl"
            />
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg sm:text-xl text-muted-foreground font-medium">
            Sing along, dance silly, and learn something new every day. A magical
            world made for little explorers and the grown-ups who love them.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#watch"
              className="rounded-full bg-[var(--bubblegum)] text-[var(--bubblegum-foreground)] px-8 py-4 text-lg font-extrabold shadow-bounce hover:translate-y-1 hover:shadow-none transition-all"
            >
              ▶ Start Watching
            </a>
            <a
              href="#music"
              className="rounded-full bg-white text-[var(--primary)] px-8 py-4 text-lg font-extrabold shadow-pop hover:translate-y-1 transition-all"
            >
              🎵 Listen to Songs
            </a>
          </div>

          <div className="mt-12 sm:mt-16 relative max-w-4xl mx-auto">
            <div className="absolute -inset-4 bg-rainbow rounded-[2.5rem] blur-2xl opacity-40" />
            <img
              src={heroImg}
              alt="Amare exploring a giant smiling planet with friendly animal friends"
              width={1920}
              height={1080}
              className="relative w-full rounded-[2rem] shadow-pop border-8 border-white"
            />
          </div>
        </div>
      </section>

      {/* RAINBOW STRIP */}
      <div className="h-4 bg-rainbow" />

      {/* SHOWS */}
      <section id="shows" className="py-20 sm:py-28 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center mb-14">
            <p className="font-bold text-[var(--bubblegum)] uppercase tracking-widest mb-3">
              Our Shows
            </p>
            <h2 className="font-display text-4xl sm:text-6xl font-extrabold text-foreground">
              Big adventures, <br className="sm:hidden" />
              <span className="text-[var(--primary)]">tiny attention spans.</span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {shows.map((s, i) => (
              <article
                key={s.title}
                className={`${s.color} rounded-3xl p-8 shadow-pop hover:-translate-y-2 transition-transform cursor-pointer`}
                style={{ transform: `rotate(${i % 2 === 0 ? "-1deg" : "1deg"})` }}
              >
                <div className="text-6xl mb-4">{s.emoji}</div>
                <h3 className="font-display text-2xl sm:text-3xl font-extrabold mb-2">
                  {s.title}
                </h3>
                <p className="font-medium opacity-90">{s.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CHARACTERS */}
      <section id="characters" className="py-20 sm:py-28 bg-[var(--secondary)] relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-[var(--sunshine)] opacity-40 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-[var(--bubblegum)] opacity-30 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center mb-14">
            <p className="font-bold text-[var(--grape)] uppercase tracking-widest mb-3">
              Meet the gang
            </p>
            <h2 className="font-display text-4xl sm:text-6xl font-extrabold text-foreground">
              Friends from <span className="text-[var(--bubblegum)]">every corner</span> of the planet.
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {characters.map((c, i) => (
              <div
                key={c.name}
                className="bg-white rounded-3xl p-5 shadow-soft hover:shadow-pop hover:-translate-y-2 transition-all text-center"
                style={{ transform: `rotate(${(i % 3) - 1}deg)` }}
              >
                <div className="aspect-square rounded-2xl bg-[var(--muted)] flex items-center justify-center overflow-hidden mb-3">
                  <img
                    src={c.img}
                    alt={`${c.name} character`}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-display text-xl font-extrabold text-[var(--primary)]">
                  {c.name}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground font-medium mt-1">
                  {c.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WATCH CTA */}
      <section id="watch" className="py-20 sm:py-28">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="relative bg-rainbow rounded-[2.5rem] p-1 shadow-pop">
            <div className="bg-background rounded-[2.25rem] p-10 sm:p-16 text-center relative overflow-hidden">
              <img
                src={musicMascot}
                alt=""
                aria-hidden
                className="absolute -top-6 -right-6 w-32 sm:w-44 animate-wiggle"
              />
              <h2 className="font-display text-4xl sm:text-6xl font-extrabold text-foreground">
                Ready to <span className="text-[var(--bubblegum)]">sing along?</span>
              </h2>
              <p className="mt-4 text-lg text-muted-foreground font-medium max-w-2xl mx-auto">
                Watch new episodes on YouTube, stream songs everywhere, and join
                Amare's newsletter for parents.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <a className="rounded-full bg-[var(--bubblegum)] text-[var(--bubblegum-foreground)] px-7 py-3.5 font-extrabold shadow-bounce hover:translate-y-1 hover:shadow-none transition-all">
                  ▶ YouTube
                </a>
                <a className="rounded-full bg-[var(--leaf)] text-[var(--leaf-foreground)] px-7 py-3.5 font-extrabold shadow-bounce hover:translate-y-1 hover:shadow-none transition-all">
                  🎧 Spotify
                </a>
                <a className="rounded-full bg-[var(--grape)] text-[var(--grape-foreground)] px-7 py-3.5 font-extrabold shadow-bounce hover:translate-y-1 hover:shadow-none transition-all">
                  📱 Apple Music
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PARENTS */}
      <section id="parents" className="py-20 bg-[var(--sunshine)]/30">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="font-bold text-[var(--bubblegum)] uppercase tracking-widest mb-3">
              For Parents
            </p>
            <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-foreground">
              Made for little ones. <br />
              <span className="text-[var(--primary)]">Trusted by grown-ups.</span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground font-medium">
              Every song and story on Amare's Big Planet is crafted with early
              learning experts — kindness, curiosity, and giggles guaranteed.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "Ad-light, age-appropriate content",
                "Songs that teach feelings & friendship",
                "Designed with childhood educators",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 font-semibold">
                  <span className="w-6 h-6 rounded-full bg-[var(--leaf)] text-white flex items-center justify-center text-sm">
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative">
            <img
              src={amaresLogo}
              alt="Amare's Big Planet logo"
              loading="lazy"
              className="w-full max-w-sm mx-auto rounded-3xl animate-float-slow"
            />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[var(--primary)] text-[var(--primary-foreground)] py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <img src={planetMascot} alt="" width={48} height={48} className="h-12 w-12" />
              <span className="font-display text-xl font-extrabold">
                Amare's Big Planet
              </span>
            </div>
            <nav className="flex flex-wrap gap-5 font-semibold">
              <a className="hover:text-[var(--sunshine)]">About</a>
              <a className="hover:text-[var(--sunshine)]">Contact</a>
              <a className="hover:text-[var(--sunshine)]">Privacy</a>
              <a className="hover:text-[var(--sunshine)]">Press</a>
            </nav>
          </div>
          <p className="mt-8 text-center text-sm opacity-70">
            © {new Date().getFullYear()} Amare's Big Planet. Made with 💛 for tiny humans.
          </p>
        </div>
      </footer>
    </div>
  );
}
