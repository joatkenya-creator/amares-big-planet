import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import amaresLogo from "@/assets/amares-logo.jpeg";
import amaresTitle from "@/assets/amares-title.png";
import parentsSectionImg from "@/assets/parents-section.png";
import planetMascot from "@/assets/planet-mascot.png";
import sunMascot from "@/assets/sun-mascot.png";
import musicMascot from "@/assets/music-mascot.png";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Amare's Big Planet | Kids Learning Songs, ABCs & Space Videos" },
      { name: "description", content: "Sing along with Amare's Big Planet: ABC songs, nursery rhymes, ocean animals, solar system songs, and fun educational videos for kids." },
      { property: "og:title", content: "Amare's Big Planet | Kids Learning Songs & Videos" },
      { property: "og:description", content: "ABC songs, nursery rhymes, space adventures, ocean animals, and fun educational videos for children." },
      { property: "og:url", content: "https://amaresbigplanet.com/" },
    ],
    links: [
      { rel: "canonical", href: "https://amaresbigplanet.com/" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: "https://amaresbigplanet.com/",
            },
          ],
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Amare's Big Planet kids videos",
          itemListElement: [
            "Learning ABCs I to L",
            "Ocean Animals Adventure",
            "BLAST OFF! Solar System Song",
            "Live - Lofi Study Music for Kids",
          ].map((name, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name,
          })),
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "VideoObject",
              name: "Learning ABCs I to L",
              description: "Learn the alphabet with Amare and friends!",
              thumbnailUrl: "https://img.youtube.com/vi/_ctNtUXel6Q/maxresdefault.jpg",
              embedUrl: "https://www.youtube.com/embed/_ctNtUXel6Q",
              url: "https://amaresbigplanet.com/#music",
              uploadDate: "2026-05-16",
            },
            {
              "@type": "VideoObject",
              name: "Ocean Animals Adventure",
              description: "Discover amazing creatures under the sea!",
              thumbnailUrl: "https://img.youtube.com/vi/Ga_sef8vcIA/maxresdefault.jpg",
              embedUrl: "https://www.youtube.com/embed/Ga_sef8vcIA",
              url: "https://amaresbigplanet.com/#music",
              uploadDate: "2026-05-16",
            },
            {
              "@type": "VideoObject",
              name: "BLAST OFF! Solar System Song",
              description: "Explore all the planets in our solar system!",
              thumbnailUrl: "https://img.youtube.com/vi/8jCfqeT6iNc/maxresdefault.jpg",
              embedUrl: "https://www.youtube.com/embed/8jCfqeT6iNc",
              url: "https://amaresbigplanet.com/#music",
              uploadDate: "2026-05-16",
            },
            {
              "@type": "VideoObject",
              name: "Live - Lofi Study Music for Kids",
              description: "Relaxing lofi study music for kids from Amare's Big Planet.",
              thumbnailUrl: "https://img.youtube.com/vi/9ryVeXuqv-M/maxresdefault.jpg",
              embedUrl: "https://www.youtube.com/embed/9ryVeXuqv-M",
              url: "https://amaresbigplanet.com/#watch",
              uploadDate: "2026-05-16",
            },
          ],
        }),
      },
    ],
  }),
});

const navLinks = ["Shows", "Music", "Characters", "Games", "Parents", "Blog"];

const shows = [
  {
    title: "Galaxy Train Adventures",
    desc: "Join Amare and the Gear Crew on the Galaxy Train exploring planets across space!",
    color: "bg-[var(--sky)] text-[var(--sky-foreground)]",
    emoji: "\u{1F682}",
  },
  {
    title: "Numbers & Counting",
    desc: "Learn numbers and counting through fun animations and catchy songs!",
    color: "bg-[#FBBF24] text-[var(--bubblegum-foreground)]",
    emoji: "\u{1F522}",
  },
  {
    title: "Nursery Rhymes & Songs",
    desc: "Sing along to classic nursery rhymes and original songs with Amare!",
    color: "bg-[var(--grape)] text-[var(--grape-foreground)]",
    emoji: "\u{1F3B5}",
  },
  {
    title: "Colors, Shapes & Space",
    desc: "Discover colors, shapes, planet facts and space exploration!",
    color: "bg-[var(--leaf)] text-[var(--leaf-foreground)]",
    emoji: "\u{1FA90}",
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
    name: "Trinity",
    img: "https://res.cloudinary.com/dee2vqvzl/image/upload/v1779704810/WhatsApp_Image_2026-05-25_at_13.17.11_dirmsz.jpg",
    desc: "Nature lover. Grows plant barriers to protect friends.",
    color: "#22C55E",
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
    name: "Liz",
    img: "https://res.cloudinary.com/dee2vqvzl/image/upload/v1778137804/1776066524117_1_mgfdwz.png",
    desc: "Smart, calm & nurturing.",
  },
  {
    name: "Bruce",
    img: "https://res.cloudinary.com/dee2vqvzl/image/upload/v1778576697/1775649748215_2_crfvcf.png",
    desc: "Logical, analytical & strategic thinker.",
    color: "#3B82F6",
  },
];

const SEARCH_DATA = [
  { title: "Galaxy Train Adventures", category: "Shows", emoji: "\u{1F682}", anchor: "#shows" },
  { title: "Ocean Animals ABC", category: "Shows", emoji: "\u{1F419}", anchor: "#shows" },
  { title: "BLAST OFF! Solar System", category: "Shows", emoji: "\u{1F680}", anchor: "#shows" },
  { title: "Learning ABCs I to L", category: "Music", emoji: "\u{1F3B5}", anchor: "#music" },
  { title: "Numbers & Counting Song", category: "Music", emoji: "\u{1F522}", anchor: "#music" },
  { title: "Nursery Rhymes Collection", category: "Music", emoji: "\u{1F3B6}", anchor: "#music" },
  { title: "Amare", category: "Characters", emoji: "\u{2B50}", anchor: "#characters" },
  { title: "Xavier", category: "Characters", emoji: "\u{1F4AA}", anchor: "#characters" },
  { title: "Trinity", category: "Characters", emoji: "\u{1F33F}", anchor: "#characters" },
  { title: "Dee", category: "Characters", emoji: "\u{1F9E9}", anchor: "#characters" },
  { title: "Neebah", category: "Characters", emoji: "\u{1F4A1}", anchor: "#characters" },
  { title: "Liz", category: "Characters", emoji: "\u{1F49C}", anchor: "#characters" },
  { title: "Bruce", category: "Characters", emoji: "\u{1F9E0}", anchor: "#characters" },
];

function Index() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [donationPopupVisible, setDonationPopupVisible] = useState(false);
  const [donationPopupClosing, setDonationPopupClosing] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const mobileSearchRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const mobileSearchInputRef = useRef<HTMLInputElement>(null);

  const searchResults = searchQuery.trim().length > 0
    ? SEARCH_DATA.filter((item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const groupedResults = searchResults.reduce<Record<string, typeof SEARCH_DATA>>((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});

  function closeSearch() {
    setSearchOpen(false);
    setMobileSearchOpen(false);
    setSearchQuery("");
  }

  function handleSearchSelect(anchor: string) {
    closeSearch();
    const el = document.querySelector(anchor);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }

  // Close search on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      const target = e.target as Node;
      const inDesktop = searchRef.current?.contains(target);
      const inMobile = mobileSearchRef.current?.contains(target);
      if (!inDesktop && !inMobile) closeSearch();
    }
    if (searchOpen || mobileSearchOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [searchOpen, mobileSearchOpen]);

  // Close search on Escape
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") closeSearch();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Auto-focus input when search opens
  useEffect(() => {
    if (searchOpen) searchInputRef.current?.focus();
  }, [searchOpen]);
  useEffect(() => {
    if (mobileSearchOpen) mobileSearchInputRef.current?.focus();
  }, [mobileSearchOpen]);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 0);

      const sections = navLinks.map((l) => l.toLowerCase());
      let current = "";
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120) current = id;
        }
      }
      setActiveSection(current);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  // Donation popup: delay it so mobile visitors can see the hero first.
  useEffect(() => {
    if (sessionStorage.getItem("donationPopupClosed")) return;
    const timer = setTimeout(() => setDonationPopupVisible(true), 12000);
    return () => clearTimeout(timer);
  }, []);

  function closeDonationPopup() {
    setDonationPopupClosing(true);
    setTimeout(() => {
      setDonationPopupVisible(false);
      setDonationPopupClosing(false);
      sessionStorage.setItem("donationPopupClosed", "1");
    }, 400);
  }

  return (
    <div className="min-h-screen overflow-hidden bg-background">
      {/* Nav link hover styles + responsive */}
      <style>{`
        /* Desktop nav links */
        .nav-link {
          position: relative;
          padding: 8px 16px;
          border-radius: 9999px;
          font-weight: 600;
          color: var(--foreground);
          text-decoration: none;
          transition: color 0.3s ease;
        }
        .nav-link::after {
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
        .nav-link:hover { color: #2a2a6e; }
        .nav-link:hover::after { width: 60%; }
        .nav-link.active { color: #2a2a6e; font-weight: 700; }
        .nav-link.active::after { width: 60%; }

        .nav-link-donate {
          position: relative;
          padding: 8px 16px;
          border-radius: 9999px;
          font-weight: 600;
          font-size: 15px;
          color: #3B82F6;
          text-decoration: none;
          transition: color 0.3s ease;
        }
        .nav-link-donate::after {
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
        .nav-link-donate:hover::after { width: 60%; }

        /* Hamburger lines */
        .hamburger-line {
          display: block;
          width: 24px;
          height: 3px;
          background: #2a2a6e;
          border-radius: 2px;
          transition: all 0.3s ease;
        }
        .hamburger-open .hamburger-line:nth-child(1) {
          transform: translateY(8px) rotate(45deg);
        }
        .hamburger-open .hamburger-line:nth-child(2) {
          opacity: 0;
        }
        .hamburger-open .hamburger-line:nth-child(3) {
          transform: translateY(-8px) rotate(-45deg);
        }

        /* Mobile menu drawer */
        .mobile-menu-drawer {
          transform: translateY(-100%);
          transition: transform 0.3s ease;
        }
        .mobile-menu-drawer.open {
          transform: translateY(0);
        }

        /* Mobile menu link */
        .mobile-nav-link {
          display: block;
          padding: 16px 24px;
          font-size: 18px;
          font-weight: 600;
          color: #1a1a2e;
          text-decoration: none;
          border-bottom: 1px solid rgba(0,0,0,0.08);
          transition: background 0.2s ease;
        }
        .mobile-nav-link:hover {
          background: rgba(42,42,110,0.04);
        }
        .mobile-nav-link.active {
          font-weight: 700;
          border-left: 3px solid #2a2a6e;
          background: rgba(42,42,110,0.05);
        }

        /* Tablet: tighter nav */
        @media (min-width: 769px) and (max-width: 1024px) {
          .nav-link { padding: 8px 10px; font-size: 13px; }
          .nav-link-donate { padding: 8px 10px; font-size: 13px; }
          .navbar-logo-img { height: 40px !important; }
          .navbar-avatar { width: 40px !important; height: 40px !important; }
          .navbar-watch-btn { padding: 8px 16px !important; font-size: 13px !important; }
        }

        /* Search */
        .search-icon-btn {
          background: none;
          border: none;
          cursor: pointer;
          padding: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #2a2a6e;
          transition: all 0.2s ease;
          border-radius: 50%;
        }
        .search-icon-btn:hover {
          color: #3B82F6;
          transform: scale(1.1);
        }
        .search-input-desktop {
          width: 0;
          opacity: 0;
          padding: 0;
          border: none;
          transition: all 0.3s ease;
          font-size: 14px;
          color: #1a1a2e;
          outline: none;
          background: white;
        }
        .search-input-desktop.open {
          width: 220px;
          opacity: 1;
          padding: 8px 16px;
          border: 1.5px solid #2a2a6e;
          border-radius: 24px;
        }
        .search-input-desktop.open:focus {
          border-color: #3B82F6;
          box-shadow: 0 0 0 3px rgba(59,130,246,0.15);
        }
        .search-dropdown {
          position: absolute;
          top: 100%;
          right: 0;
          margin-top: 8px;
          width: 300px;
          max-height: 320px;
          overflow-y: auto;
          background: white;
          border: 1px solid rgba(0,0,0,0.1);
          border-radius: 12px;
          box-shadow: 0 8px 24px rgba(0,0,0,0.12);
          z-index: 1002;
        }
        .search-category-header {
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: #888;
          padding: 10px 16px 4px;
          font-weight: 600;
        }
        .search-result-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 16px;
          cursor: pointer;
          transition: background 0.15s ease;
          text-decoration: none;
        }
        .search-result-item:hover {
          background: #f5f5f5;
        }
        .search-result-emoji {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: #f0f6ff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          flex-shrink: 0;
        }
        .search-result-title {
          font-size: 14px;
          font-weight: 600;
          color: #1a1a2e;
        }
        .search-result-subtitle {
          font-size: 12px;
          color: #888;
        }
        .search-no-results {
          padding: 24px 16px;
          text-align: center;
          color: #888;
          font-size: 14px;
        }

        /* Mobile search bar */
        .mobile-search-bar {
          overflow: hidden;
          max-height: 0;
          opacity: 0;
          transition: all 0.3s ease;
          background: #dff0f5;
          border-bottom: 1px solid rgba(0,0,0,0.08);
        }
        .mobile-search-bar.open {
          max-height: 70px;
          opacity: 1;
          padding: 10px 16px;
        }
        .mobile-search-input {
          width: 100%;
          padding: 10px 40px 10px 16px;
          border: 1.5px solid #2a2a6e;
          border-radius: 24px;
          font-size: 14px;
          color: #1a1a2e;
          outline: none;
          background: white;
          box-sizing: border-box;
        }
        .mobile-search-input:focus {
          border-color: #3B82F6;
          box-shadow: 0 0 0 3px rgba(59,130,246,0.15);
        }
        @media (max-width: 768px) {
          .search-dropdown {
            width: calc(100vw - 32px);
            left: 16px;
            right: 16px;
            position: fixed;
            top: auto;
          }
        }
        @keyframes pulse-dot {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.3); opacity: 0.5; }
        }
      `}</style>

      {/* NAV */}
      <header
        className="sticky top-0 z-[1000] backdrop-blur-md bg-background/80 border-b-4 border-[var(--primary)]/20"
        style={{
          boxShadow: scrolled ? "0 2px 12px rgba(0,0,0,0.1)" : "none",
          transition: "box-shadow 0.3s ease",
        }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-3 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2.5 group">
            <img
              src={amaresLogo}
              alt="Amare character"
              className="w-12 h-12 max-[768px]:w-9 max-[768px]:h-9 rounded-full object-cover border-2 border-[#2a2a6e] navbar-avatar"
            />
            <img
              src={amaresTitle}
              alt="Amare's Big Planet logo"
              className="h-12 sm:h-14 max-[768px]:h-10 w-auto group-hover:animate-wiggle navbar-logo-img"
            />
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((l) =>
              l === "Blog" ? (
                <Link key={l} to="/blog" className="nav-link">
                  {l}
                </Link>
              ) : (
                <a
                  key={l}
                  href={`#${l.toLowerCase()}`}
                  className={`nav-link${activeSection === l.toLowerCase() ? " active" : ""}`}
                >
                  {l}
                </a>
              )
            )}
            <Link
              to="/donate"
              className="nav-link-donate"
            >
              Support {"\u{1F499}"}
            </Link>
            <Link
              to="/articles"
              className="nav-link"
            >
              Articles
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            {/* Desktop search */}
            <div ref={searchRef} className="hidden md:flex items-center gap-2" style={{ position: "relative" }}>
              <input
                ref={searchInputRef}
                className={`search-input-desktop${searchOpen ? " open" : ""}`}
                placeholder="Search songs, shows, characters..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && searchResults.length > 0) {
                    handleSearchSelect(searchResults[0].anchor);
                  }
                }}
              />
              <button
                className="search-icon-btn"
                onClick={() => {
                  if (searchOpen) { closeSearch(); } else { setSearchOpen(true); }
                }}
                aria-label="Search"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </button>
              {/* Desktop dropdown */}
              {searchOpen && searchQuery.trim().length > 0 && (
                <div className="search-dropdown">
                  {searchResults.length > 0 ? (
                    Object.entries(groupedResults).map(([category, items]) => (
                      <div key={category}>
                        <div className="search-category-header">{category}</div>
                        {items.map((item) => (
                          <div
                            key={item.title}
                            className="search-result-item"
                            onClick={() => handleSearchSelect(item.anchor)}
                          >
                            <div className="search-result-emoji">{item.emoji}</div>
                            <div>
                              <div className="search-result-title">{item.title}</div>
                              <div className="search-result-subtitle">{item.category}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ))
                  ) : (
                    <div className="search-no-results">
                      <div style={{ fontSize: "24px", marginBottom: "8px" }}>{"\u{1F50D}"}</div>
                      No results found for "{searchQuery}"
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Watch button — hidden on mobile, shown in drawer instead */}
            <a
              href="https://www.youtube.com/@amaresbigplanet"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex rounded-full bg-red-600 text-white px-5 py-2.5 font-bold shadow-bounce hover:translate-y-1 hover:shadow-none transition-all navbar-watch-btn"
            >
              ▶ Watch
            </a>

            {/* Mobile: search icon + hamburger */}
            <div className="md:hidden flex items-center gap-1">
              <button
                className="search-icon-btn"
                onClick={() => { setMobileSearchOpen(!mobileSearchOpen); setMenuOpen(false); }}
                aria-label="Search"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </button>
              <button
                className="flex flex-col items-center justify-center gap-[5px] p-2"
                onClick={() => { setMenuOpen(!menuOpen); setMobileSearchOpen(false); setSearchQuery(""); }}
                aria-label="Toggle menu"
                style={{ background: "none", border: "none", cursor: "pointer" }}
              >
                <div className={menuOpen ? "hamburger-open" : ""} style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                  <span className="hamburger-line" />
                  <span className="hamburger-line" />
                  <span className="hamburger-line" />
                </div>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile search bar — slides below navbar */}
      <div
        ref={mobileSearchRef}
        className={`mobile-search-bar md:hidden${mobileSearchOpen ? " open" : ""}`}
        style={{ position: "sticky", top: "68px", zIndex: 1000 }}
      >
        <div style={{ position: "relative" }}>
          <input
            ref={mobileSearchInputRef}
            className="mobile-search-input"
            placeholder="Search songs, shows, characters..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && searchResults.length > 0) {
                handleSearchSelect(searchResults[0].anchor);
              }
            }}
          />
          <button
            onClick={closeSearch}
            style={{
              position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)",
              background: "none", border: "none", cursor: "pointer", fontSize: "18px", color: "#888",
              padding: "4px", lineHeight: 1,
            }}
            aria-label="Close search"
          >
            {"\u2715"}
          </button>
        </div>
        {/* Mobile dropdown */}
        {mobileSearchOpen && searchQuery.trim().length > 0 && (
          <div style={{
            position: "absolute", left: "16px", right: "16px", top: "100%", marginTop: "4px",
            maxHeight: "320px", overflowY: "auto", background: "white",
            border: "1px solid rgba(0,0,0,0.1)", borderRadius: "12px",
            boxShadow: "0 8px 24px rgba(0,0,0,0.12)", zIndex: 1002,
          }}>
            {searchResults.length > 0 ? (
              Object.entries(groupedResults).map(([category, items]) => (
                <div key={category}>
                  <div className="search-category-header">{category}</div>
                  {items.map((item) => (
                    <div
                      key={item.title}
                      className="search-result-item"
                      onClick={() => handleSearchSelect(item.anchor)}
                    >
                      <div className="search-result-emoji">{item.emoji}</div>
                      <div>
                        <div className="search-result-title">{item.title}</div>
                        <div className="search-result-subtitle">{item.category}</div>
                      </div>
                    </div>
                  ))}
                </div>
              ))
            ) : (
              <div className="search-no-results">
                <div style={{ fontSize: "24px", marginBottom: "8px" }}>{"\u{1F50D}"}</div>
                No results found for "{searchQuery}"
              </div>
            )}
          </div>
        )}
      </div>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          style={{
            position: "fixed", inset: 0, zIndex: 999,
            background: "rgba(0,0,0,0.3)",
            transition: "opacity 0.3s ease",
          }}
        />
      )}

      {/* Mobile menu drawer */}
      <div
        className={`mobile-menu-drawer${menuOpen ? " open" : ""}`}
        style={{
          position: "fixed", top: 0, left: 0, right: 0,
          zIndex: 1001, paddingTop: "68px",
          background: "#dff0f5",
          maxHeight: "100vh", overflowY: "auto",
        }}
      >
        <nav className="md:hidden">
          {navLinks.map((l) =>
            l === "Blog" ? (
              <Link
                key={l}
                to="/blog"
                className="mobile-nav-link"
                onClick={() => setMenuOpen(false)}
              >
                {l}
              </Link>
            ) : (
              <a
                key={l}
                href={`#${l.toLowerCase()}`}
                className={`mobile-nav-link${activeSection === l.toLowerCase() ? " active" : ""}`}
                onClick={() => setMenuOpen(false)}
              >
                {l}
              </a>
            )
          )}
          <Link
            to="/donate"
            className="mobile-nav-link"
            style={{ color: "#3B82F6" }}
            onClick={() => setMenuOpen(false)}
          >
            Support {"\u{1F499}"}
          </Link>
          <Link
            to="/articles"
            className="mobile-nav-link"
            onClick={() => setMenuOpen(false)}
          >
            Articles
          </Link>
          <div style={{ padding: "16px 24px" }}>
            <a
              href="https://www.youtube.com/@amaresbigplanet"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "block", width: "100%", textAlign: "center",
                background: "#e02020", color: "white", fontWeight: 700,
                fontSize: "16px", padding: "14px", borderRadius: "12px",
                textDecoration: "none",
              }}
              onClick={() => setMenuOpen(false)}
            >
              ▶ Watch on YouTube
            </a>
          </div>
        </nav>
      </div>

      {/* HERO */}
      <section className="relative bg-black pb-24 sm:pb-32 overflow-hidden min-h-[80vh]">
        {/* Video background */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <video
            autoPlay
            muted
            loop
            playsInline
            style={{
              position: 'absolute',
              top: '0',
              left: '0',
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              pointerEvents: 'none',
              zIndex: 0,
            }}
          >
            <source src="/videos/donation-bg.mp4" type="video/mp4" />
          </video>
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
          src="https://res.cloudinary.com/dee2vqvzl/image/upload/v1778586253/train_nxikdm.png"
          alt=""
          aria-hidden
          className="absolute bottom-10 left-4"
          style={{ width: 150, opacity: 0.9, animation: "float 3s ease-in-out infinite" }}
        />
        <div className="absolute top-1/3 left-10 w-6 h-6 rounded-full bg-[var(--bubblegum)] animate-bounce-soft" />
        <div className="absolute top-20 left-1/3 w-4 h-4 rounded-full bg-[var(--sunshine)] animate-bounce-soft" style={{ animationDelay: "0.6s" }} />
        <div className="absolute bottom-32 right-1/4 w-5 h-5 rounded-full bg-[var(--leaf)] animate-bounce-soft" style={{ animationDelay: "1.2s" }} />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 text-center">
          <span className="inline-block bg-white rounded-full px-5 py-2 font-bold text-[var(--primary)] shadow-soft mb-6">
          🎵 New songs every week!
          </span>
          <h1 className="font-display font-extrabold leading-[0.9] tracking-tight">
            <span className="sr-only">
              Amare's Big Planet Kids Learning Songs and Videos
            </span>
            <span className="block text-2xl sm:text-3xl font-bold text-white mb-4 uppercase tracking-[0.3em]" style={{ textShadow: "0 4px 16px rgba(0,0,0,0.9), 0 2px 4px rgba(0,0,0,0.7)" }}>
              Kids Learning Songs & Videos
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

          <div className="mt-8 pb-24 sm:pb-0 flex flex-wrap items-center justify-center gap-4">
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

        {/* Donation Strip */}
        <div style={{
          background: "linear-gradient(90deg, #1a1a2e, #2a2a5e)",
          padding: "14px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 16,
          flexWrap: "wrap",
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          zIndex: 10,
        }}>
          <span style={{
            width: 8, height: 8, borderRadius: "50%", background: "#e02020",
            display: "inline-block", flexShrink: 0,
            animation: "pulse-dot 2s infinite",
          }} />
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.9)", fontWeight: 500, margin: 0 }}>
            💙 <strong style={{ color: "#fff" }}>Help Amaré reach more kids!</strong> Your support brings free adventures to children all over the world.
          </p>
          <Link to="/donate" style={{
            background: "#e02020", color: "white", borderRadius: 16,
            padding: "6px 16px", fontSize: 12, fontWeight: 600,
            textDecoration: "none", whiteSpace: "nowrap", flexShrink: 0,
            transition: "background 0.2s, transform 0.2s",
          }}
            onMouseEnter={e => { e.currentTarget.style.background = "#c01010"; e.currentTarget.style.transform = "scale(1.05)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "#e02020"; e.currentTarget.style.transform = "scale(1)"; }}
          >
            Support Now →
          </Link>
          <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
            <div style={{ display: "flex" }}>
              {[
                { initials: "CW", bg: "#3B82F6" },
                { initials: "KK", bg: "#22C55E" },
                { initials: "AK", bg: "#E24B4A" },
              ].map((a, i) => (
                <span key={a.initials} style={{
                  width: 20, height: 20, borderRadius: "50%", background: a.bg,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 8, fontWeight: 700, color: "#fff",
                  border: "2px solid #1a1a2e",
                  marginLeft: i > 0 ? -6 : 0,
                }}>{a.initials}</span>
              ))}
            </div>
            <span style={{ fontSize: 11, color: "rgba(255,255,255,0.6)" }}>127 supporters</span>
          </div>
        </div>
      </section>

      {/* RAINBOW STRIP */}
      <div className="h-4 bg-rainbow" />

      {/* SHOWS */}
      <section id="shows" className="py-20 sm:py-28 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center mb-14">
            <p className="font-bold text-[#3B82F6] uppercase tracking-widest mb-3">
              What Kids Learn
            </p>
            <h2 className="font-display text-4xl sm:text-6xl font-extrabold text-foreground">
              Learn, Explore & <br className="sm:hidden" />
              <span className="text-[#FBBF24]">Have Fun!</span>
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
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
          <div className="text-center" style={{ marginBottom: "28px" }}>
            <p className="font-bold text-[#3B82F6] uppercase tracking-widest mb-3">
              Our Music
            </p>
            <h2 className="font-display text-4xl sm:text-6xl font-extrabold text-foreground">
              Sing Along with Amare! 🎵
            </h2>
          </div>
          <div className="grid sm:grid-cols-3" style={{ gap: "16px" }}>
            {[
              { id: "_ctNtUXel6Q", title: "Learning ABCs I to L", desc: "Learn the alphabet with Amaré and friends!" },
              { id: "Ga_sef8vcIA", title: "Ocean Animals Adventure", desc: "Discover amazing creatures under the sea!" },
              { id: "8jCfqeT6iNc", title: "BLAST OFF! Solar System Song", desc: "Explore all the planets in our solar system!" },
            ].map((video) => (
              <div
                key={video.id}
                className="overflow-hidden cursor-pointer"
                style={{
                  borderRadius: "16px",
                  border: "1px solid rgba(0, 191, 179, 0.3)",
                  background: "#fff",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-4px) scale(1.02)"; e.currentTarget.style.boxShadow = "0 12px 28px rgba(0,0,0,0.12)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}
              >
                <div className="aspect-video overflow-hidden">
                  <iframe
                    src={`https://www.youtube.com/embed/${video.id}`}
                    title={video.title}
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full border-0"
                  />
                </div>
                <div style={{ padding: "10px 12px" }}>
                  <h3 style={{ fontSize: "13px", fontWeight: 700, color: "#1a1a2e", margin: 0 }}>{video.title}</h3>
                  <p style={{ fontSize: "11px", color: "#888", fontWeight: 400, margin: "4px 0 0" }}>{video.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center" style={{ marginTop: "20px" }}>
            <a
              href="https://www.youtube.com/@amaresbigplanet"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-white font-bold"
              style={{
                background: "#FF0000",
                borderRadius: "24px",
                padding: "12px 28px",
                fontSize: "15px",
                fontWeight: 700,
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "#cc0000"; e.currentTarget.style.transform = "scale(1.03)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "#FF0000"; e.currentTarget.style.transform = "scale(1)"; }}
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              More Songs on YouTube
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
              Friends from <span className="text-[#E24B4A]">every corner</span> of the planet.
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-6xl mx-auto">
            {characters.map((c, i) => (
              <div
                key={c.name}
                className="bg-white rounded-3xl p-5 shadow-soft text-center cursor-pointer group"
                style={{
                  transform: `rotate(${(i % 3) - 1}deg)`,
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  const card = e.currentTarget;
                  card.style.transform = `rotate(${(i % 3) - 1}deg) translateY(-6px)`;
                  card.style.boxShadow = "0 12px 28px rgba(0,0,0,0.12)";
                  const img = card.querySelector("img");
                  if (img) img.style.transform = "scale(1.05)";
                  const h3 = card.querySelector("h3");
                  if (h3) h3.style.fontSize = "15px";
                }}
                onMouseLeave={(e) => {
                  const card = e.currentTarget;
                  card.style.transform = `rotate(${(i % 3) - 1}deg)`;
                  card.style.boxShadow = "";
                  const img = card.querySelector("img");
                  if (img) img.style.transform = "scale(1)";
                  const h3 = card.querySelector("h3");
                  if (h3) h3.style.fontSize = "14px";
                }}
              >
                <div className="aspect-square rounded-2xl bg-[var(--muted)] flex items-center justify-center overflow-hidden mb-3">
                  <img
                    src={c.img}
                    alt={`${c.name} character`}
                    loading="lazy"
                    className="w-full h-full object-cover"
                    style={{ transition: "transform 0.3s ease" }}
                  />
                </div>
                <h3
                  className={`font-display text-xl font-extrabold ${c.color ? "" : "text-[var(--primary)]"}`}
                  style={{ fontSize: "14px", transition: "font-size 0.3s ease", ...(c.color ? { color: c.color } : {}) }}
                >
                  {c.name}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground font-medium mt-1">
                  {c.desc}
                </p>
              </div>
            ))}
          </div>
          <div className="text-center" style={{ marginTop: "24px" }}>
            <a
              href="#characters"
              className="inline-flex items-center gap-2 text-white font-semibold"
              style={{
                background: "#1a1a2e",
                borderRadius: "24px",
                padding: "12px 24px",
                fontSize: "14px",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.03)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>
              Meet Them All
            </a>
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
                Ready to <span className="text-[#3B82F6]">sing along?</span>
              </h2>
              <p className="mt-4 text-lg text-muted-foreground font-medium max-w-2xl mx-auto">
                Watch new episodes on YouTube, stream songs everywhere, and join
                Amare's newsletter for parents.
              </p>
              <div className="mt-8 max-w-3xl mx-auto">
                <p className="font-bold text-lg mb-3 flex items-center justify-center gap-2">
                  <span
                    className="inline-block w-3 h-3 rounded-full bg-[#FF3B3B]"
                    style={{ animation: "pulse-dot 1.5s ease-in-out infinite" }}
                  />
                  LIVE NOW - Lofi Study Music for Kids
                </p>
                <style>{`
                  @keyframes pulse-dot {
                    0% { transform: scale(1); opacity: 1; }
                    50% { transform: scale(1.5); opacity: 0.5; }
                    100% { transform: scale(1); opacity: 1; }
                  }
                `}</style>
                <div className="aspect-video rounded-2xl overflow-hidden shadow-pop">
                  <iframe
                    src="https://www.youtube.com/embed/9ryVeXuqv-M"
                    title="Live - Lofi Study Music for Kids"
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full border-0"
                  />
                </div>
                <div className="mt-5 text-center">
                  <a
                    href="https://www.youtube.com/@amaresbigplanet?sub_confirmation=1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-[#FF0000] text-white font-bold px-7 py-3"
                    style={{ fontSize: "16px", transition: "all 0.3s ease" }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = "#CC0000"; e.currentTarget.style.transform = "scale(1.03)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = "#FF0000"; e.currentTarget.style.transform = "scale(1)"; }}
                  >
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                    Subscribe on YouTube
                  </a>
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
      <section id="parents" className="py-20" style={{ background: "linear-gradient(135deg, #fdf6e0, #fce4b8, #fde8d0)" }}>
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="flex-1">
              <p className="font-bold text-[var(--bubblegum)] uppercase tracking-widest mb-3">
                For Parents
              </p>
              <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-foreground">
                Made for Little Explorers. <br />
                <span className="text-[#22C55E]">Trusted by Parents.</span>
              </h2>
              <p className="mt-4 text-lg text-muted-foreground font-medium">
                Every video on Amare's Big Planet is designed to be simple, engaging,
                and easy to follow. Amare and the Gear Crew help children build
                confidence while learning and having fun through space adventures on
                the Galaxy Train.
              </p>
              <ul className="mt-6 space-y-2">
                {[
                  { icon: "\u{1F680}", text: "Numbers, counting, colors & shapes" },
                  { icon: "\u{1F3B5}", text: "Nursery rhymes & original songs" },
                  { icon: "\u{1FA90}", text: "Planet facts & space exploration" },
                  { icon: "\u{1F9E9}", text: "Fun animations that build confidence" },
                  { icon: "\u{1F4FA}", text: "New educational videos every week" },
                  { icon: "\u{1F6E1}\u{FE0F}", text: "Safe, ad-free content for kids" },
                ].map((item) => (
                  <li
                    key={item.text}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg transition-colors"
                    style={{ fontSize: "14px", fontWeight: 500, color: "#1a1a2e" }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.4)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
                  >
                    <span className="text-lg">{item.icon}</span>
                    {item.text}
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <a
                  href="https://www.youtube.com/@amaresbigplanet"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block rounded-full text-white px-7 py-3 text-base font-bold"
                  style={{ background: "#e02020", transition: "all 0.3s ease" }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "#cc0000"; e.currentTarget.style.transform = "scale(1.03)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "#e02020"; e.currentTarget.style.transform = "scale(1)"; }}
                >
                  👉 Join the Parent Newsletter
                </a>
                <p style={{ fontSize: "12px", color: "#888", marginTop: "8px" }}>
                  No spam — just updates on new episodes and songs.
                </p>
              </div>
            </div>
            <div className="flex-shrink-0 flex flex-col items-center gap-4">
              <div
                className="rounded-full overflow-hidden flex items-center justify-center"
                style={{
                  width: "180px",
                  height: "180px",
                  background: "linear-gradient(135deg, #fde68a, #fbbf24)",
                  border: "3px solid rgba(255,255,255,0.6)",
                }}
              >
                <img
                  src="https://res.cloudinary.com/dee2vqvzl/image/upload/v1778073832/1775135225431_1_zxvc1e.png"
                  alt="Amare character"
                  className="w-full h-full object-contain drop-shadow-2xl"
                />
              </div>
              <div
                className="text-center"
                style={{
                  background: "rgba(255,255,255,0.7)",
                  borderRadius: "12px",
                  padding: "14px 16px",
                  maxWidth: "200px",
                  border: "0.5px solid rgba(0,0,0,0.08)",
                }}
              >
                <p style={{ fontSize: "13px", fontStyle: "italic", color: "#555", margin: 0 }}>
                  "My kids love Amaré! They learn new words and sing along every morning."
                </p>
                <p style={{ fontSize: "12px", fontWeight: 500, color: "#888", marginTop: "6px", marginBottom: 0 }}>
                  — Sarah M., parent of two
                </p>
              </div>
              <div className="flex gap-2">
                <span className="rounded-xl text-white font-bold" style={{ fontSize: "11px", padding: "4px 10px", background: "#00BFB3" }}>
                  Ages 1-10
                </span>
                <span className="rounded-xl text-white font-bold" style={{ fontSize: "11px", padding: "4px 10px", background: "#7c3aed" }}>
                  Kid Safe
                </span>
              </div>
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
              <Link to="/articles" className="hover:text-[var(--sunshine)] transition-colors">Learning Hub</Link>
              <a href="mailto:amareplanet8@gmail.com" className="hover:text-[var(--sunshine)] transition-colors">Contact</a>
              <a className="hover:text-[var(--sunshine)] transition-colors">Privacy</a>
              <a href="https://www.youtube.com/@amaresbigplanet?sub_confirmation=1" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--sunshine)] transition-colors">Subscribe</a>
            </nav>
          </div>
          <div className="mt-6 grid grid-cols-2 sm:flex sm:flex-wrap justify-center gap-3 max-w-sm sm:max-w-none mx-auto">
            <a href="https://www.youtube.com/@amaresbigplanet" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#FF0000] text-white text-sm font-semibold px-5 py-2.5 hover:opacity-90 transition-all">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              YouTube
            </a>
            <a href="https://www.instagram.com/_amaresbigplanet" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full text-white text-sm font-semibold px-5 py-2.5 hover:opacity-90 transition-all" style={{ background: "linear-gradient(135deg, #833AB4, #E1306C, #F77737)" }}>
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
              Instagram
            </a>
            <a href="https://www.tiktok.com/@amaresbigplanet" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#010101] text-white text-sm font-semibold px-5 py-2.5 hover:opacity-90 transition-all">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>
              TikTok
            </a>
            <a href="https://www.roblox.com/share?code=c2c98ee6659b1c48aaffb9f3efb3fe87&type=ExperienceDetails&stamp=1778764599349" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0066FF] text-white text-sm font-semibold px-5 py-2.5 hover:opacity-90 transition-all">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M5.164 0L0 18.627 18.836 24 24 5.373 5.164 0zM10.291 15.073l-1.364-4.782 4.782 1.364-3.418 3.418z"/></svg>
              Roblox
            </a>
          </div>
          <div className="mt-8 border-t pt-4" style={{ borderColor: "rgba(255,255,255,0.2)" }}>
            <p className="text-center text-xs" style={{ color: "rgba(255,255,255,0.7)" }}>
              © 2026 Amaré Big Planet. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Donation Popup Banner */}
      {donationPopupVisible && (
        <>
          <style>{`
            @keyframes donateSlideIn {
              from { transform: translateX(120%); opacity: 0; }
              to { transform: translateX(0); opacity: 1; }
            }
            @keyframes donateSlideOut {
              from { transform: translateX(0); opacity: 1; }
              to { transform: translateX(120%); opacity: 0; }
            }
          `}</style>
          <div style={{
            position: "fixed",
            bottom: 24,
            right: 24,
            zIndex: 999,
            background: "rgba(255,255,255,0.97)",
            backdropFilter: "blur(12px)",
            borderRadius: 14,
            padding: "16px 20px",
            boxShadow: "0 4px 24px rgba(0,0,0,0.15)",
            maxWidth: 300,
            borderLeft: "4px solid #e02020",
            animation: donationPopupClosing
              ? "donateSlideOut 0.4s ease forwards"
              : "donateSlideIn 0.5s ease forwards",
          }}>
            <button
              onClick={closeDonationPopup}
              aria-label="Close support popup"
              style={{
                position: "absolute",
                top: 8,
                right: 10,
                background: "none",
                border: "none",
                fontSize: 18,
                cursor: "pointer",
                color: "#999",
                lineHeight: 1,
              }}
            >
              ✕
            </button>
            <p style={{ fontWeight: 700, fontSize: 15, margin: "0 0 6px", color: "#1a1a2e" }}>
              💙 Help Amaré reach more kids!
            </p>
            <p style={{ fontSize: 13, color: "#555", margin: "0 0 12px", lineHeight: 1.4 }}>
              Your support brings free learning adventures to children all over the world.
            </p>
            <Link
              to="/donate"
              style={{
                display: "inline-block",
                background: "#e02020",
                color: "white",
                borderRadius: 20,
                padding: "8px 18px",
                fontSize: 13,
                fontWeight: 700,
                textDecoration: "none",
                transition: "background 0.2s, transform 0.2s",
              }}
              onMouseEnter={e => { e.currentTarget.style.background = "#c01010"; e.currentTarget.style.transform = "scale(1.05)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "#e02020"; e.currentTarget.style.transform = "scale(1)"; }}
            >
              Support Now →
            </Link>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 10 }}>
              <div style={{ display: "flex" }}>
                {[
                  { initials: "CW", bg: "#3B82F6" },
                  { initials: "KK", bg: "#22C55E" },
                  { initials: "AK", bg: "#E24B4A" },
                ].map((a, i) => (
                  <span key={a.initials} style={{
                    width: 22, height: 22, borderRadius: "50%", background: a.bg,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 8, fontWeight: 700, color: "#fff",
                    border: "2px solid #fff",
                    marginLeft: i > 0 ? -6 : 0,
                  }}>{a.initials}</span>
                ))}
              </div>
              <span style={{ fontSize: 11, color: "#888" }}>127 supporters this month</span>
            </div>
          </div>
        </>
      )}

    </div>
  );
}
