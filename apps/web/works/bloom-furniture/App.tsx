import React, { useState, useEffect } from "react";

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia(query).matches : false,
  );
  useEffect(() => {
    const mql = window.matchMedia(query);
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, [query]);
  return matches;
}

// ─── palette & tokens ──────────────────────────────────────
const V = {
  bg: "#faf8f5",
  heroBg: "#f5f0eb",
  violet: "#7c3aed",
  violetHover: "#6d28d9",
  violetLight: "#f3f0ff",
  violetMid: "#ede9fe",
  text: "#1f1f1f",
  textMuted: "#6b6b6b",
  textLight: "#9a9a9a",
  white: "#ffffff",
  border: "#e8e4df",
  sage: "#d6ddd0",
  rose: "#e4d1cd",
  cream: "#ece4d9",
  warmGray: "#eae6e1",
  serif: `"DM Serif Display", Georgia, serif`,
  sans: `"DM Sans", system-ui, -apple-system, sans-serif`,
  radius: 16,
  radiusSm: 10,
  shadow: "0 2px 24px rgba(0,0,0,0.06)",
  shadowLg: "0 8px 40px rgba(0,0,0,0.08)",
  maxW: 1200,
  transition: "all 0.3s cubic-bezier(.4,0,.2,1)",
};

// ─── reusable helpers ──────────────────────────────────────
const container = (extra: React.CSSProperties = {}): React.CSSProperties => ({
  maxWidth: V.maxW,
  margin: "0 auto",
  padding: "0 24px",
  ...extra,
});

const sectionPad: React.CSSProperties = { padding: "100px 0" };

// ─── SVGs ──────────────────────────────────────────────────
function BloomLogo({ size = 28, color = V.violet }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <ellipse cx="16" cy="10" rx="5" ry="8" fill={color} opacity={0.7} />
      <ellipse cx="16" cy="10" rx="5" ry="8" fill={color} opacity={0.5} transform="rotate(60 16 16)" />
      <ellipse cx="16" cy="10" rx="5" ry="8" fill={color} opacity={0.5} transform="rotate(-60 16 16)" />
      <circle cx="16" cy="14" r="2.5" fill={color} />
      <path d="M16 18 C16 18 15 26 16 30 C17 26 16 18 16 18Z" fill={color} opacity={0.6} />
      <path d="M16 22 C16 22 12 20 10 22 C12 23 16 22 16 22Z" fill={color} opacity={0.45} />
    </svg>
  );
}

function HeroArch() {
  return (
    <svg
      viewBox="0 0 500 600"
      fill="none"
      style={{
        position: "absolute",
        right: "-2%",
        top: "50%",
        transform: "translateY(-50%)",
        width: "46%",
        maxWidth: 520,
        height: "auto",
        opacity: 0.12,
        pointerEvents: "none",
      }}
    >
      <path
        d="M50 600 L50 250 Q50 50 250 50 Q450 50 450 250 L450 600"
        stroke={V.violet}
        strokeWidth="6"
        fill={V.violet}
        fillOpacity={0.06}
      />
      <path
        d="M100 600 L100 280 Q100 110 250 110 Q400 110 400 280 L400 600"
        stroke={V.violet}
        strokeWidth="3"
        fill="none"
        opacity={0.5}
      />
    </svg>
  );
}

// ─── data ──────────────────────────────────────────────────
const NAV_LINKS = ["Living", "Bedroom", "Dining", "Office", "Sale"];

const CATEGORIES = [
  { name: "Living Room", color: V.sage, items: "124 pieces", image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80&auto=format" },
  { name: "Bedroom", color: V.rose, items: "98 pieces", image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=600&q=80&auto=format" },
  { name: "Dining", color: V.cream, items: "76 pieces", image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=600&q=80&auto=format" },
];

const PRODUCTS = [
  { name: "Aura Lounge Chair", material: "Walnut & boucle fabric", price: "$1,290", image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80&auto=format" },
  { name: "Mist Console Table", material: "Travertine & brass", price: "$2,180", image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=400&q=80&auto=format" },
  { name: "Soleil Floor Lamp", material: "Hand-blown glass & oak", price: "$640", image: "https://images.unsplash.com/photo-1611269154421-4e27233ac5c7?w=400&q=80&auto=format" },
  { name: "Terra Modular Sofa", material: "Italian linen & ash frame", price: "$4,350", image: "https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=400&q=80&auto=format" },
];

const FOOTER_COLS = [
  { title: "Shop", links: ["Living Room", "Bedroom", "Dining", "Office", "Outdoor", "Sale"] },
  { title: "About", links: ["Our Story", "Designers", "Sustainability", "Press", "Careers"] },
  { title: "Help", links: ["Contact Us", "Shipping", "Returns", "FAQ", "Trade Program"] },
];

// ─── component ─────────────────────────────────────────────
export function App() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [hoveredCat, setHoveredCat] = useState<number | null>(null);
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);
  const [hoveredNav, setHoveredNav] = useState<number | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* ── CSS reset ── */}
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; -webkit-font-smoothing: antialiased; }
        a { text-decoration: none; color: inherit; }
        button { cursor: pointer; border: none; background: none; font-family: inherit; }
        img { display: block; max-width: 100%; }
        ul { list-style: none; }
        ::selection { background: ${V.violetMid}; color: ${V.violet}; }
        @media (max-width: 768px) {
          html { font-size: 15px; }
        }
      `}</style>

      {/* ═══════════════ NAVIGATION ═══════════════ */}
      <nav
        style={{
          position: "relative",
          background: V.bg,
          borderBottom: `1px solid ${V.border}`,
        }}
      >
        <div
          style={{
            ...container(),
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: 72,
          }}
        >
          {/* Logo */}
          <a href="#" style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <BloomLogo />
            <span
              style={{
                fontFamily: V.serif,
                fontSize: 24,
                color: V.violet,
                letterSpacing: 2,
              }}
            >
              BLOOM
            </span>
          </a>

          {/* Desktop links */}
          <ul
            style={{
              display: "flex",
              gap: 36,
              alignItems: "center",
            }}
            className="nav-desktop"
          >
            <style>{`
              @media (max-width: 768px) {
                .nav-desktop { display: none !important; }
                .mobile-toggle { display: flex !important; }
              }
            `}</style>
            {NAV_LINKS.map((link, i) => (
              <li key={link}>
                <a
                  href="#"
                  onMouseEnter={() => setHoveredNav(i)}
                  onMouseLeave={() => setHoveredNav(null)}
                  style={{
                    fontSize: 14,
                    fontWeight: 500,
                    letterSpacing: 0.5,
                    color: link === "Sale" ? V.violet : hoveredNav === i ? V.violet : V.text,
                    transition: V.transition,
                    position: "relative",
                    paddingBottom: 4,
                    borderBottom: hoveredNav === i ? `2px solid ${V.violet}` : "2px solid transparent",
                  }}
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>

          {/* Right icons */}
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            {/* Search icon */}
            <button aria-label="Search" style={{ color: V.text, transition: V.transition }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <circle cx="11" cy="11" r="7" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>
            {/* Cart icon */}
            <button aria-label="Cart" style={{ color: V.text, position: "relative" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 01-8 0" />
              </svg>
              <span
                style={{
                  position: "absolute",
                  top: -4,
                  right: -6,
                  background: V.violet,
                  color: V.white,
                  fontSize: 10,
                  fontWeight: 700,
                  width: 16,
                  height: 16,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                2
              </span>
            </button>
            {/* Mobile hamburger */}
            <button
              className="mobile-toggle"
              style={{ display: "none", flexDirection: "column", gap: 4, padding: 4 }}
              onClick={() => setMobileMenu(!mobileMenu)}
              aria-label="Menu"
            >
              <span style={{ width: 20, height: 2, background: V.text, borderRadius: 1, transition: V.transition, transform: mobileMenu ? "rotate(45deg) translate(4px,4px)" : "none" }} />
              <span style={{ width: 20, height: 2, background: V.text, borderRadius: 1, transition: V.transition, opacity: mobileMenu ? 0 : 1 }} />
              <span style={{ width: 20, height: 2, background: V.text, borderRadius: 1, transition: V.transition, transform: mobileMenu ? "rotate(-45deg) translate(4px,-4px)" : "none" }} />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenu && (
          <div
            style={{
              background: V.bg,
              borderTop: `1px solid ${V.border}`,
              padding: "20px 24px 28px",
            }}
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link}
                href="#"
                style={{
                  display: "block",
                  padding: "12px 0",
                  fontSize: 16,
                  fontWeight: 500,
                  color: link === "Sale" ? V.violet : V.text,
                  borderBottom: `1px solid ${V.border}`,
                }}
              >
                {link}
              </a>
            ))}
          </div>
        )}
      </nav>

      {/* ═══════════════ HERO ═══════════════ */}
      <section
        style={{
          position: "relative",
          background: V.heroBg,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
          paddingTop: 0,
          backgroundImage: "linear-gradient(rgba(245,240,235,0.7), rgba(245,240,235,0.85)), url(https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1600&q=80&auto=format)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <HeroArch />
        <div style={container({ position: "relative", zIndex: 2 })}>
          <div style={{ maxWidth: 640 }}>
            <p
              style={{
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: 3,
                textTransform: "uppercase",
                color: V.violet,
                marginBottom: 20,
              }}
            >
              New Collection 2026
            </p>
            <h1
              style={{
                fontFamily: V.serif,
                fontSize: "clamp(40px, 6vw, 72px)",
                lineHeight: 1.08,
                color: V.text,
                marginBottom: 24,
              }}
            >
              Design Your
              <br />
              Perfect Space
            </h1>
            <p
              style={{
                fontSize: 17,
                lineHeight: 1.7,
                color: V.textMuted,
                maxWidth: 480,
                marginBottom: 40,
              }}
            >
              Curated furniture and decor crafted by world-class designers.
              Every piece tells a story of quality materials, timeless aesthetics,
              and thoughtful comfort.
            </p>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              <button
                style={{
                  background: V.violet,
                  color: V.white,
                  padding: "16px 36px",
                  borderRadius: 50,
                  fontSize: 15,
                  fontWeight: 600,
                  letterSpacing: 0.3,
                  transition: V.transition,
                  boxShadow: "0 4px 20px rgba(124,58,237,0.3)",
                }}
                onMouseEnter={(e) => {
                  (e.target as HTMLElement).style.background = V.violetHover;
                  (e.target as HTMLElement).style.transform = "translateY(-2px)";
                  (e.target as HTMLElement).style.boxShadow = "0 6px 28px rgba(124,58,237,0.4)";
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLElement).style.background = V.violet;
                  (e.target as HTMLElement).style.transform = "translateY(0)";
                  (e.target as HTMLElement).style.boxShadow = "0 4px 20px rgba(124,58,237,0.3)";
                }}
              >
                Browse Collection
              </button>
              <button
                style={{
                  background: "transparent",
                  color: V.text,
                  padding: "16px 36px",
                  borderRadius: 50,
                  fontSize: 15,
                  fontWeight: 600,
                  letterSpacing: 0.3,
                  border: `2px solid ${V.border}`,
                  transition: V.transition,
                }}
                onMouseEnter={(e) => {
                  (e.target as HTMLElement).style.borderColor = V.violet;
                  (e.target as HTMLElement).style.color = V.violet;
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLElement).style.borderColor = V.border;
                  (e.target as HTMLElement).style.color = V.text;
                }}
              >
                Room Planner
              </button>
            </div>
          </div>
        </div>

        {/* bottom fade */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 120,
            background: `linear-gradient(to top, ${V.bg}, transparent)`,
            pointerEvents: "none",
          }}
        />
      </section>

      {/* ═══════════════ ROOM CATEGORIES ═══════════════ */}
      <section style={{ padding: isMobile ? "60px 0" : "100px 0", background: V.bg }}>
        <div style={container()}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <p
              style={{
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: 3,
                textTransform: "uppercase",
                color: V.violet,
                marginBottom: 12,
              }}
            >
              Browse by Room
            </p>
            <h2
              style={{
                fontFamily: V.serif,
                fontSize: "clamp(30px, 4vw, 46px)",
                color: V.text,
              }}
            >
              Find Your Style
            </h2>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit, minmax(280px, 1fr))",
              gap: isMobile ? 16 : 24,
            }}
          >
            {CATEGORIES.map((cat, i) => (
              <a
                key={cat.name}
                href="#"
                onMouseEnter={() => setHoveredCat(i)}
                onMouseLeave={() => setHoveredCat(null)}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  aspectRatio: "3 / 4",
                  backgroundImage: `url(${cat.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  borderRadius: V.radius,
                  padding: isMobile ? 24 : 36,
                  position: "relative",
                  overflow: "hidden",
                  transition: V.transition,
                  transform: hoveredCat === i ? "scale(1.02)" : "scale(1)",
                  boxShadow: hoveredCat === i ? V.shadowLg : "none",
                }}
              >
                {/* Dark gradient overlay for text readability */}
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: "60%",
                    background: "linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.15) 60%, transparent 100%)",
                    pointerEvents: "none",
                  }}
                />
                <div style={{ position: "relative", zIndex: 1 }}>
                  <p
                    style={{
                      fontSize: 12,
                      fontWeight: 600,
                      letterSpacing: 2,
                      textTransform: "uppercase",
                      color: "rgba(255,255,255,0.8)",
                      marginBottom: 8,
                    }}
                  >
                    {cat.items}
                  </p>
                  <h3
                    style={{
                      fontFamily: V.serif,
                      fontSize: 28,
                      color: V.white,
                      marginBottom: 12,
                    }}
                  >
                    {cat.name}
                  </h3>
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                      fontSize: 14,
                      fontWeight: 600,
                      color: V.white,
                    }}
                  >
                    Explore
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ FEATURED PIECES ═══════════════ */}
      <section style={{ padding: isMobile ? "60px 0" : "100px 0", background: V.bg }}>
        <div style={container()}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              marginBottom: 48,
              flexWrap: "wrap",
              gap: 16,
            }}
          >
            <div>
              <p
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  letterSpacing: 3,
                  textTransform: "uppercase",
                  color: V.violet,
                  marginBottom: 12,
                }}
              >
                Curated Selection
              </p>
              <h2 style={{ fontFamily: V.serif, fontSize: "clamp(30px, 4vw, 46px)", color: V.text }}>
                Featured Pieces
              </h2>
            </div>
            <a
              href="#"
              style={{
                fontSize: 14,
                fontWeight: 600,
                color: V.violet,
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                paddingBottom: 8,
              }}
            >
              View All
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fill, minmax(260px, 1fr))",
              gap: isMobile ? 20 : 24,
            }}
          >
            {PRODUCTS.map((product, i) => (
              <div
                key={product.name}
                onMouseEnter={() => setHoveredProduct(i)}
                onMouseLeave={() => setHoveredProduct(null)}
                style={{
                  background: V.white,
                  borderRadius: V.radius,
                  overflow: "hidden",
                  boxShadow: hoveredProduct === i ? V.shadowLg : V.shadow,
                  transition: V.transition,
                  transform: hoveredProduct === i ? "translateY(-4px)" : "translateY(0)",
                }}
              >
                {/* Product image */}
                <div
                  style={{
                    aspectRatio: "1",
                    background: i % 2 === 0 ? V.warmGray : V.heroBg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                  {/* Wishlist heart */}
                  <button
                    aria-label="Add to wishlist"
                    style={{
                      position: "absolute",
                      top: 12,
                      right: 12,
                      width: 36,
                      height: 36,
                      borderRadius: "50%",
                      background: "rgba(255,255,255,0.85)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backdropFilter: "blur(4px)",
                      transition: V.transition,
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={V.text} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                    </svg>
                  </button>
                </div>
                <div style={{ padding: "20px 22px 24px" }}>
                  <h3
                    style={{
                      fontFamily: V.serif,
                      fontSize: 18,
                      color: V.text,
                      marginBottom: 6,
                    }}
                  >
                    {product.name}
                  </h3>
                  <p
                    style={{
                      fontSize: 13,
                      color: V.textLight,
                      marginBottom: 16,
                    }}
                  >
                    {product.material}
                  </p>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: V.serif,
                        fontSize: 20,
                        color: V.text,
                      }}
                    >
                      {product.price}
                    </span>
                    <button
                      style={{
                        background: V.violet,
                        color: V.white,
                        padding: "10px 20px",
                        borderRadius: 50,
                        fontSize: 13,
                        fontWeight: 600,
                        letterSpacing: 0.3,
                        transition: V.transition,
                      }}
                      onMouseEnter={(e) => {
                        (e.target as HTMLElement).style.background = V.violetHover;
                      }}
                      onMouseLeave={(e) => {
                        (e.target as HTMLElement).style.background = V.violet;
                      }}
                    >
                      Add to Room
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ AR SECTION ═══════════════ */}
      <section style={{ padding: isMobile ? "60px 0" : "100px 0", background: V.violetLight }}>
        <div style={container()}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit, minmax(320px, 1fr))",
              gap: isMobile ? 32 : 60,
              alignItems: "center",
            }}
          >
            {/* Text */}
            <div>
              <p
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  letterSpacing: 3,
                  textTransform: "uppercase",
                  color: V.violet,
                  marginBottom: 12,
                }}
              >
                Augmented Reality
              </p>
              <h2
                style={{
                  fontFamily: V.serif,
                  fontSize: "clamp(30px, 4vw, 46px)",
                  color: V.text,
                  marginBottom: 20,
                }}
              >
                See It In
                <br />
                Your Space
              </h2>
              <p
                style={{
                  fontSize: 16,
                  lineHeight: 1.7,
                  color: V.textMuted,
                  marginBottom: 16,
                  maxWidth: 440,
                }}
              >
                Our AR Room Planner lets you place any piece from our collection
                directly into your home. See how each item fits with your existing
                decor before you buy, with true-to-life scale and lighting.
              </p>
              <ul style={{ marginBottom: 32, display: "flex", flexDirection: "column", gap: 10 }}>
                {["True-to-scale 3D models", "Real-time lighting adaptation", "Save & share room designs"].map((feat) => (
                  <li key={feat} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, color: V.textMuted }}>
                    <span
                      style={{
                        width: 22,
                        height: 22,
                        borderRadius: "50%",
                        background: V.violetMid,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={V.violet} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                    {feat}
                  </li>
                ))}
              </ul>
              <button
                style={{
                  background: V.violet,
                  color: V.white,
                  padding: "16px 36px",
                  borderRadius: 50,
                  fontSize: 15,
                  fontWeight: 600,
                  letterSpacing: 0.3,
                  transition: V.transition,
                  boxShadow: "0 4px 20px rgba(124,58,237,0.3)",
                }}
                onMouseEnter={(e) => {
                  (e.target as HTMLElement).style.background = V.violetHover;
                  (e.target as HTMLElement).style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLElement).style.background = V.violet;
                  (e.target as HTMLElement).style.transform = "translateY(0)";
                }}
              >
                Try AR Planner
              </button>
            </div>

            {/* AR viewer */}
            <div
              style={{
                aspectRatio: "4 / 3",
                borderRadius: V.radius,
                border: `2px solid ${V.violet}`,
                background: V.white,
                position: "relative",
                overflow: "hidden",
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80&auto=format"
                alt="AR Room Viewer — Interior preview"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                  borderRadius: V.radius - 2,
                }}
              />
              {/* Corner brackets */}
              {[
                { top: 16, left: 16 },
                { top: 16, right: 16 },
                { bottom: 16, left: 16 },
                { bottom: 16, right: 16 },
              ].map((pos, idx) => (
                <div
                  key={idx}
                  style={{
                    position: "absolute",
                    ...pos,
                    width: 24,
                    height: 24,
                    borderColor: V.white,
                    borderStyle: "solid",
                    borderWidth: 0,
                    borderTopWidth: idx < 2 ? 2 : 0,
                    borderBottomWidth: idx >= 2 ? 2 : 0,
                    borderLeftWidth: idx % 2 === 0 ? 2 : 0,
                    borderRightWidth: idx % 2 === 1 ? 2 : 0,
                    borderRadius: idx === 0 ? "4px 0 0 0" : idx === 1 ? "0 4px 0 0" : idx === 2 ? "0 0 0 4px" : "0 0 4px 0",
                    opacity: 0.7,
                  } as React.CSSProperties}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ NEWSLETTER BANNER ═══════════════ */}
      <section style={{ padding: isMobile ? "48px 0" : "80px 0", background: V.bg }}>
        <div style={container()}>
          <div
            style={{
              background: V.heroBg,
              borderRadius: V.radius,
              padding: isMobile ? "36px 20px" : "60px 40px",
              textAlign: "center",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Decorative dots */}
            <div style={{ position: "absolute", top: 24, right: 32, opacity: 0.1 }}>
              {Array.from({ length: 9 }).map((_, j) => (
                <div
                  key={j}
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: V.violet,
                    display: "inline-block",
                    margin: 6,
                  }}
                />
              ))}
            </div>
            <h2
              style={{
                fontFamily: V.serif,
                fontSize: "clamp(24px, 3vw, 36px)",
                color: V.text,
                marginBottom: 12,
              }}
            >
              Join the Bloom Community
            </h2>
            <p
              style={{
                fontSize: 15,
                color: V.textMuted,
                marginBottom: 28,
                maxWidth: 460,
                margin: "0 auto 28px",
              }}
            >
              Get early access to new collections, exclusive offers, and design
              inspiration delivered to your inbox.
            </p>
            <div
              style={{
                display: "flex",
                maxWidth: 440,
                margin: "0 auto",
                gap: 10,
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              <input
                type="email"
                placeholder="Your email address"
                style={{
                  flex: 1,
                  minWidth: 220,
                  padding: "14px 20px",
                  borderRadius: 50,
                  border: `1.5px solid ${V.border}`,
                  fontSize: 14,
                  fontFamily: V.sans,
                  background: V.white,
                  color: V.text,
                  outline: "none",
                  transition: V.transition,
                }}
                onFocus={(e) => {
                  (e.target as HTMLElement).style.borderColor = V.violet;
                }}
                onBlur={(e) => {
                  (e.target as HTMLElement).style.borderColor = V.border;
                }}
              />
              <button
                style={{
                  background: V.violet,
                  color: V.white,
                  padding: "14px 32px",
                  borderRadius: 50,
                  fontSize: 14,
                  fontWeight: 600,
                  transition: V.transition,
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={(e) => {
                  (e.target as HTMLElement).style.background = V.violetHover;
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLElement).style.background = V.violet;
                }}
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ FOOTER ═══════════════ */}
      <footer style={{ background: V.heroBg, borderTop: `1px solid ${V.border}` }}>
        <div style={{ ...container(), padding: isMobile ? "40px 20px 28px" : "64px 24px 40px" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(auto-fit, minmax(160px, 1fr))",
              gap: isMobile ? 28 : 40,
              marginBottom: isMobile ? 32 : 48,
            }}
          >
            {/* Brand col */}
            <div style={{ gridColumn: "span 1" }}>
              <a
                href="#"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  marginBottom: 16,
                }}
              >
                <BloomLogo size={24} />
                <span
                  style={{
                    fontFamily: V.serif,
                    fontSize: 20,
                    color: V.violet,
                    letterSpacing: 2,
                  }}
                >
                  BLOOM
                </span>
              </a>
              <p style={{ fontSize: 13, lineHeight: 1.6, color: V.textMuted, maxWidth: 240 }}>
                Thoughtfully designed furniture for spaces that inspire.
              </p>
            </div>

            {/* Nav cols */}
            {FOOTER_COLS.map((col) => (
              <div key={col.title}>
                <p
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    letterSpacing: 2,
                    textTransform: "uppercase",
                    color: V.text,
                    marginBottom: 16,
                  }}
                >
                  {col.title}
                </p>
                <ul style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {col.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        style={{
                          fontSize: 13,
                          color: V.textMuted,
                          transition: V.transition,
                        }}
                        onMouseEnter={(e) => {
                          (e.target as HTMLElement).style.color = V.violet;
                        }}
                        onMouseLeave={(e) => {
                          (e.target as HTMLElement).style.color = V.textMuted;
                        }}
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom bar */}
          <div
            style={{
              borderTop: `1px solid ${V.border}`,
              paddingTop: 24,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 16,
            }}
          >
            <p style={{ fontSize: 12, color: V.textLight }}>
              &copy; 2026 Bloom Furniture. All rights reserved.
            </p>
            <div style={{ display: "flex", gap: 20 }}>
              {/* Social icons */}
              {[
                // Instagram
                <svg key="ig" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>,
                // Pinterest
                <svg key="pi" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M8 12c0-2.2 1.8-4 4-4s4 1.8 4 4-1.8 4-4 4" />
                  <path d="M12 16l-2 6" />
                </svg>,
                // Twitter/X
                <svg key="tw" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4l16 16" />
                  <path d="M20 4L4 20" />
                </svg>,
              ].map((icon, idx) => (
                <a
                  key={idx}
                  href="#"
                  style={{
                    color: V.textLight,
                    transition: V.transition,
                    display: "flex",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.color = V.violet;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.color = V.textLight;
                  }}
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
