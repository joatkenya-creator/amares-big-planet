import { createFileRoute } from "@tanstack/react-router";
import amaresLogo from "@/assets/amares-logo.jpeg";
import amaresTitle from "@/assets/amares-title.png";
import parentsSectionImg from "@/assets/parents-section.png";
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
    title: "Galaxy Train Adventures",
    desc: "Join Amare and the Gear Crew on the Galaxy Train exploring planets across space!",
    color: "bg-[var(--sky)] text-[var(--sky-foreground)]",
    emoji: "🚂",
  },
  {
    title: "Numbers & Counting",
    desc: "Learn numbers and counting through fun animations and catchy songs!",
    color: "bg-[var(--bubblegum)] text-[var(--bubblegum-foreground)]",
    emoji: "🔢",
  },
  {
    title: "Nursery Rhymes & Songs",
    desc: "Sing along to classic nursery rhymes and original songs with Amare!",
    color: "bg-[var(--grape)] text-[var(--grape-foreground)]",
    emoji: "🎵",
  },
  {
    title: "Colors, Shapes & Space",
    desc: "Discover colors, shapes, planet facts and space exploration!",
    color: "bg-[var(--leaf)] text-[var(--leaf-foreground)]",
    emoji: "🪐",
  },
];

const characters = [
  {
    name: "Amare",
    img: "https://res.cloudinary.com/dee2vqvzl/image/upload/v1778073832/1775135225431_1_zxvc1e.png",
    desc: "Calm, thoughtful & unique thinker. Leader & visionary.",
  },
  {
    name: "Xavier",
    img: "https://res.cloudinary.com/dee2vqvzl/image/upload/v1778138548/1776066645169_Character_isolated_T_202604011429_2_wxxplo.jpg",
    desc: "Brave, energetic & loyal.",
  },
  {
    name: "Dee",
    img: "https://res.cloudinary.com/dee2vqvzl/image/upload/v1778073916/1776066659252_Character_in_T_202604011430_1_1_ut0asi.jpg",
    desc: "Funny, smart & creative. Engineer & inventor.",
  },
  {
    name: "Neebah",
    img: "https://res.cloudinary.com/dee2vqvzl/image/upload/v1778137425/1776066655773_1776066651609_Character_isolated_T_202604011429_1_1_rtk5zg.jpg",
    desc: "Logical, focused & fast thinker.",
  },
  {
    name: "Trinity",
    img: "https://res.cloudinary.com/dee2vqvzl/image/upload/v1778137804/1776066524117_1_mgfdwz.png",
    desc: "Smart, calm & nurturing.",
  },
];

function Index() {
  return (
    <div className="min-h-screen overflow-hidden bg-background">
      {/* NAV */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b-4 border-[var(--primary)]/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-3 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2.5 group">
            <img
              src={amaresLogo}
              alt="Amare character"
              className="w-12 h-12 rounded-full object-cover border-2 border-[#2a2a6e]"
            />
            <img
              src={amaresTitle}
              alt="Amare's Big Planet logo"
              className="h-12 sm:h-14 w-auto group-hover:animate-wiggle"
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
            href="https://www.youtube.com/@amaresbigplanet"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-red-600 text-white px-5 py-2.5 font-bold shadow-bounce hover:translate-y-1 hover:shadow-none transition-all"
          >
            ▶ Watch
          </a>
        </div>
      </header>

      {/* HERO */}
      <section className="relative bg-black pb-24 sm:pb-32 overflow-hidden min-h-[80vh]">
        {/* YouTube video background */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <iframe
            src="https://www.youtube.com/embed/bRm-MR5inI4?autoplay=1&mute=1&loop=1&playlist=bRm-MR5inI4&controls=0&showinfo=0&modestbranding=1&playsinline=1&rel=0&iv_load_policy=3"
            title="Background video"
            allow="autoplay; encrypted-media"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-full w-full min-w-[177.78vh] min-h-[56.25vw] border-0 scale-[2]"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="pt-20 sm:pt-28" />
        {/* floating decor */}
        <img
          src={sunMascot}
          alt=""
          aria-hidden
          className="absolute top-10 left-6 w-20 sm:w-32 animate-float-slow z-10"
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
            <span className="block text-2xl sm:text-3xl font-bold text-white mb-4 uppercase tracking-[0.3em]" style={{ textShadow: "0 4px 16px rgba(0,0,0,0.9), 0 2px 4px rgba(0,0,0,0.7)" }}>
              Welcome to
            </span>
            <img
              src={amaresTitle}
              alt="Amaré's Big Planet"
              className="mx-auto w-full max-w-xs sm:max-w-lg md:max-w-xl lg:max-w-2xl drop-shadow-2xl"
            />
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg sm:text-xl text-white font-medium" style={{ textShadow: "0 2px 8px rgba(0,0,0,0.8)" }}>
            Sing along, dance silly, and learn something new every day. A magical
            world made for little explorers and the grown-ups who love them.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://www.youtube.com/@amaresbigplanet"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-red-600 text-white px-8 py-4 text-lg font-extrabold shadow-bounce hover:translate-y-1 hover:shadow-none transition-all"
            >
              ▶ Start Watching
            </a>
            <a
              href="#music"
              className="rounded-full bg-green-500 text-white px-8 py-4 text-lg font-extrabold shadow-pop hover:translate-y-1 transition-all"
            >
              🎵 Listen to Songs
            </a>
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
              What Kids Learn
            </p>
            <h2 className="font-display text-4xl sm:text-6xl font-extrabold text-foreground">
              Learn, Explore & <br className="sm:hidden" />
              <span className="text-[var(--primary)]">Have Fun!</span>
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

      {/* MUSIC */}
      <section id="music" className="py-20 sm:py-28 bg-[var(--grape)]/10 relative overflow-hidden">
        <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-[var(--grape)] opacity-20 blur-3xl" />
        <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-[var(--bubblegum)] opacity-20 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center mb-14">
            <p className="font-bold text-[var(--bubblegum)] uppercase tracking-widest mb-3">
              Our Music
            </p>
            <h2 className="font-display text-4xl sm:text-6xl font-extrabold text-foreground">
              Sing Along with Amare! 🎵
            </h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {["eyEmlXfgIoA", "Ga_sef8vcIA", "8jCfqeT6iNc"].map((id) => (
              <div key={id} className="aspect-video rounded-3xl overflow-hidden shadow-pop">
                <iframe
                  src={`https://www.youtube.com/embed/${id}`}
                  title="Amare's Big Planet music video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full border-0"
                />
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <a
              href="https://www.youtube.com/@amaresbigplanet"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-full bg-[var(--grape)] text-[var(--grape-foreground)] px-8 py-4 text-lg font-extrabold shadow-bounce hover:translate-y-1 hover:shadow-none transition-all"
            >
              🎵 More Songs on YouTube
            </a>
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
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 max-w-5xl mx-auto">
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
              <div className="mt-8 max-w-3xl mx-auto">
                <p className="font-bold text-lg mb-3">🔴 LIVE NOW - Lofi Study Music for Kids</p>
                <div className="aspect-video rounded-2xl overflow-hidden shadow-pop">
                  <iframe
                    src="https://www.youtube.com/embed/9ryVeXuqv-M"
                    title="Live - Lofi Study Music for Kids"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full border-0"
                  />
                </div>
              </div>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <a href="https://www.youtube.com/@amaresbigplanet" target="_blank" rel="noopener noreferrer" className="rounded-full bg-red-600 text-white px-7 py-3.5 font-extrabold shadow-bounce hover:translate-y-1 hover:shadow-none transition-all">
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
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="flex-1">
              <p className="font-bold text-[var(--bubblegum)] uppercase tracking-widest mb-3">
                For Parents
              </p>
              <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-foreground">
                Made for Little Explorers. <br />
                <span className="text-[var(--primary)]">Trusted by Parents.</span>
              </h2>
              <p className="mt-4 text-lg text-muted-foreground font-medium">
                Every video on Amare's Big Planet is designed to be simple, engaging,
                and easy to follow. Amare and the Gear Crew help children build
                confidence while learning and having fun through space adventures on
                the Galaxy Train.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  "Numbers, counting, colors & shapes",
                  "Nursery rhymes & original songs",
                  "Planet facts & space exploration",
                  "Fun animations that build confidence",
                  "New educational videos every week",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 font-semibold">
                    <span className="w-6 h-6 rounded-full bg-[var(--leaf)] text-white flex items-center justify-center text-sm">
                      ✓
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <a
                  href="https://www.youtube.com/@amaresbigplanet"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block rounded-full bg-red-600 text-white px-8 py-4 text-lg font-extrabold shadow-bounce hover:translate-y-1 hover:shadow-none transition-all"
                >
                  👉 Subscribe for Free
                </a>
              </div>
            </div>
            <div className="flex-shrink-0 w-64 sm:w-80 aspect-square rounded-full bg-[var(--sunshine)]/30 overflow-hidden flex items-center justify-center">
              <img
                src="https://res.cloudinary.com/dee2vqvzl/image/upload/v1778073832/1775135225431_1_zxvc1e.png"
                alt="Amare character"
                className="w-full h-full object-contain mix-blend-multiply drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[var(--primary)] text-[var(--primary-foreground)] pt-12 pb-6 border-t-4 border-[var(--sunshine)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6">
            <div>
              <div className="flex items-center gap-3">
                <img
                  src={amaresLogo}
                  alt="Amare character"
                  className="w-[52px] h-[52px] rounded-full object-cover border-2 border-white"
                />
                <img src={amaresTitle} alt="Amare's Big Planet" className="h-12 w-auto" />
              </div>
              <p className="mt-1.5 ml-1 text-[13px] italic" style={{ color: "rgba(255,255,255,0.9)" }}>
                Fun for every kid!
              </p>
            </div>
            <nav className="flex flex-wrap gap-5 text-sm font-medium">
              <a href="https://www.youtube.com/@amaresbigplanet/about" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--sunshine)] transition-colors">About</a>
              <a href="mailto:amareplanet8@gmail.com" className="hover:text-[var(--sunshine)] transition-colors">Contact</a>
              <a className="hover:text-[var(--sunshine)] transition-colors">Privacy</a>
              <a href="https://www.youtube.com/@amaresbigplanet?sub_confirmation=1" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--sunshine)] transition-colors">Subscribe</a>
            </nav>
          </div>
          <div className="mt-6 flex justify-center gap-3.5">
            <a href="https://www.youtube.com/@amaresbigplanet" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[#FF0000] text-white text-sm font-semibold px-5 py-2.5 hover:opacity-90 transition-all">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              YouTube
            </a>
            <a href="https://www.instagram.com/_amaresbigplanet" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full text-white text-sm font-semibold px-5 py-2.5 hover:opacity-90 transition-all" style={{ background: "linear-gradient(135deg, #833AB4, #E1306C, #F77737)" }}>
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
              Instagram
            </a>
            <a href="https://www.tiktok.com/@amaresbigplanet" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[#010101] text-white text-sm font-semibold px-5 py-2.5 hover:opacity-90 transition-all">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>
              TikTok
            </a>
          </div>
          <div className="mt-8 border-t pt-4" style={{ borderColor: "rgba(255,255,255,0.2)" }}>
            <p className="text-center text-xs" style={{ color: "rgba(255,255,255,0.7)" }}>
              © 2026 Amaré Big Planet. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
