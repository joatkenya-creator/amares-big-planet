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
    <header className="sticky top-0 z-[1000] border-b-4 border-[var(--primary)]/20 bg-background/80 backdrop-blur-md">
      <style>{`
        .site-nav-link {
          position: relative;
          padding: 8px 16px;
          border-radius: 9999px;
          font-weight: 600;
          color: var(--foreground);
          text-decoration: none;
          transition: color 0.3s ease;
        }
        .site-nav-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 2px;
          background: #2a2a6e;
          transition: width 0.3s ease;
          border-radius: 1px;
        }
        .site-nav-link:hover,
        .site-nav-link.active {
          color: #2a2a6e;
        }
        .site-nav-link:hover::after,
        .site-nav-link.active::after {
          width: 60%;
        }
        .site-nav-link.active {
          font-weight: 700;
        }
        .site-nav-donate {
          position: relative;
          padding: 8px 16px;
          border-radius: 9999px;
          font-weight: 600;
          font-size: 15px;
          color: #3B82F6;
          text-decoration: none;
          transition: color 0.3s ease;
        }
        .site-nav-donate::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 2px;
          background: #3B82F6;
          transition: width 0.3s ease;
          border-radius: 1px;
        }
        .site-nav-donate:hover::after,
        .site-nav-donate.active::after {
          width: 60%;
        }
        @media (max-width: 1024px) {
          .site-nav-link,
          .site-nav-donate {
            padding: 8px 10px;
            font-size: 13px;
          }
        }
      `}</style>
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link to="/" className="group flex shrink-0 items-center gap-2.5">
          <img
            src={amaresLogo}
            alt="Amare character"
            className="h-12 w-12 rounded-full border-2 border-[#2a2a6e] object-cover max-[768px]:h-9 max-[768px]:w-9"
          />
          <img
            src={amaresTitle}
            alt="Amare's Big Planet logo"
            className="h-12 w-auto group-hover:animate-wiggle sm:h-14 max-[768px]:h-10"
          />
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {sectionLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="site-nav-link"
            >
              {link.label}
            </a>
          ))}
          <Link
            to="/articles"
            className={`site-nav-link${active === "Articles" ? " active" : ""}`}
          >
            Articles
          </Link>
          <Link
            to="/donate"
            className={`site-nav-donate${active === "Support" ? " active" : ""}`}
          >
            Support {"\u{1F499}"}
          </Link>
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <Link
            to="/articles"
            className="rounded-full px-3 py-2 text-sm font-extrabold text-[#2a2a6e]"
          >
            Articles
          </Link>
          <Link
            to="/donate"
            className="rounded-full px-3 py-2 text-sm font-extrabold text-[#3B82F6]"
          >
            Support {"\u{1F499}"}
          </Link>
        </div>
      </div>
    </header>
  );
}
