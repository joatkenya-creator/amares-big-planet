import { Link } from "@tanstack/react-router";
import amaresLogo from "@/assets/amares-logo.jpeg";
import amaresTitle from "@/assets/amares-title.png";

const sectionLinks = [
  { label: "Shows", href: "/#shows" },
  { label: "Music", href: "/#music" },
  { label: "Characters", href: "/#characters" },
  { label: "Games", href: "/#games" },
  { label: "Parents", href: "/#parents" },
];

type SiteNavProps = {
  active?: "Articles" | "Support";
};

export function SiteNav({ active }: SiteNavProps) {
  return (
    <header className="sticky top-0 z-[1000] border-b-4 border-[var(--primary)]/20 bg-background/90 backdrop-blur-md shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link to="/" className="flex shrink-0 items-center gap-2.5">
          <img
            src={amaresLogo}
            alt="Amare character"
            className="h-10 w-10 rounded-full border-2 border-[#2a2a6e] object-cover sm:h-12 sm:w-12"
          />
          <img
            src={amaresTitle}
            alt="Amare's Big Planet logo"
            className="h-10 w-auto sm:h-14"
          />
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {sectionLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="rounded-full px-3 py-2 text-sm font-bold text-[#0d1b3e] transition hover:bg-[#fff3b0] hover:text-[#2a2a6e]"
            >
              {link.label}
            </a>
          ))}
          <Link
            to="/articles"
            className={`rounded-full px-3 py-2 text-sm font-bold transition ${
              active === "Articles"
                ? "bg-[#fff3b0] text-[#2a2a6e]"
                : "text-[#0d1b3e] hover:bg-[#fff3b0] hover:text-[#2a2a6e]"
            }`}
          >
            Articles
          </Link>
          <Link
            to="/donate"
            className={`rounded-full px-4 py-2 text-sm font-extrabold transition ${
              active === "Support"
                ? "bg-[#3b82f6] text-white"
                : "bg-[#e02020] text-white hover:bg-[#b91c1c]"
            }`}
          >
            Support
          </Link>
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <Link
            to="/articles"
            className="rounded-full bg-[#fff3b0] px-3 py-2 text-sm font-extrabold text-[#2a2a6e]"
          >
            Articles
          </Link>
          <Link
            to="/donate"
            className="rounded-full bg-[#e02020] px-3 py-2 text-sm font-extrabold text-white"
          >
            Support
          </Link>
        </div>
      </div>
    </header>
  );
}
