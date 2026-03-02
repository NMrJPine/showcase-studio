import React, { useState, useEffect } from "react";

// ── Palette ──────────────────────────────────────────────
const C = {
  green:      "#0d9668",
  greenLight: "#12b87e",
  greenDark:  "#0a7a54",
  heroGreen:  "#0d4a3a",
  heroDark:   "#092e26",
  leaf:       "#e8f5e9",
  leafDark:   "#c8e6c9",
  dark:       "#111111",
  card:       "#1a1a1a",
  cardHover:  "#242424",
  white:      "#ffffff",
  offWhite:   "#f5f5f0",
  textMuted:  "#9e9e9e",
  textLight:  "#cccccc",
  gold:       "#f5a623",
  brown:      "#5d4037",
  brownLight: "#795548",
  sand:       "#c8b090",
};

const font = {
  heading: "'Outfit', sans-serif",
  body:    "'Inter', sans-serif",
};

// ── Responsive hook ──────────────────────────────────────
function useMedia(query: string) {
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

// ── Tiny SVG icons ───────────────────────────────────────
function MountainIcon({ size = 20, color = C.green }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={{ display: "inline-block", verticalAlign: "middle" }}>
      <path d="M12 3L2 21h20L12 3z" fill={color} opacity={0.9} />
      <path d="M12 3L7 13l3-2 2 3 2-3 3 2L12 3z" fill={color} opacity={0.6} />
    </svg>
  );
}

function LeafIcon({ size = 32, color = C.green }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" style={{ display: "inline-block", verticalAlign: "middle" }}>
      <path d="M16 4C10 4 5 10 5 18c0 4 2 7 5 9" stroke={color} strokeWidth={2} fill="none" strokeLinecap="round" />
      <path d="M16 4c6 0 11 6 11 14 0 4-2 7-5 9" stroke={color} strokeWidth={2} fill="none" strokeLinecap="round" />
      <path d="M16 4v24" stroke={color} strokeWidth={2} strokeLinecap="round" />
      <path d="M10 15c2-1 4-1 6 0" stroke={color} strokeWidth={1.5} fill="none" strokeLinecap="round" />
      <path d="M16 18c2-1 4-1 6 0" stroke={color} strokeWidth={1.5} fill="none" strokeLinecap="round" />
    </svg>
  );
}

function StarRating({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);
  return (
    <span style={{ color: C.gold, fontSize: 14, letterSpacing: 1 }}>
      {"★".repeat(full)}
      {half && <span style={{ opacity: 0.5 }}>★</span>}
      {"☆".repeat(empty)}
      <span style={{ color: C.textMuted, fontSize: 12, marginLeft: 6, fontFamily: font.body }}>{rating.toFixed(1)}</span>
    </span>
  );
}

// ── Topo pattern SVG for hero ────────────────────────────
function TopoPattern() {
  return (
    <svg
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
      viewBox="0 0 1200 700"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
    >
      <path d="M-50 400Q200 320 400 380T800 340T1250 400" stroke="rgba(255,255,255,0.04)" strokeWidth={2} fill="none" />
      <path d="M-50 450Q250 370 500 430T900 370T1250 440" stroke="rgba(255,255,255,0.05)" strokeWidth={1.5} fill="none" />
      <path d="M-50 500Q300 430 550 480T950 420T1250 490" stroke="rgba(255,255,255,0.035)" strokeWidth={2} fill="none" />
      <path d="M-50 350Q150 280 350 330T750 290T1250 360" stroke="rgba(255,255,255,0.03)" strokeWidth={1.5} fill="none" />
      <path d="M-50 550Q350 480 600 530T1000 470T1250 540" stroke="rgba(255,255,255,0.04)" strokeWidth={1} fill="none" />
      <path d="M-50 300Q100 240 300 280T700 250T1250 310" stroke="rgba(255,255,255,0.025)" strokeWidth={1.5} fill="none" />
      <path d="M-50 250Q180 200 380 230T750 200T1250 260" stroke="rgba(255,255,255,0.02)" strokeWidth={1} fill="none" />
      <circle cx={900} cy={200} r={120} stroke="rgba(255,255,255,0.025)" strokeWidth={1} />
      <circle cx={900} cy={200} r={180} stroke="rgba(255,255,255,0.018)" strokeWidth={1} />
      <circle cx={900} cy={200} r={240} stroke="rgba(255,255,255,0.012)" strokeWidth={1} />
    </svg>
  );
}

// ── Data ─────────────────────────────────────────────────
const NAV_LINKS = ["Gear", "Adventures", "Stories", "Sustainability"];

const CATEGORIES = [
  { name: "Hiking",        count: 124, bg: "#2e5c3f", accent: "#4a8c63", image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=600&q=80&auto=format" },
  { name: "Camping",       count: 89,  bg: "#3b3024", accent: "#7a6248", image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=600&q=80&auto=format" },
  { name: "Climbing",      count: 56,  bg: "#4a5c3a", accent: "#7a9456", image: "https://images.unsplash.com/photo-1522163182402-834f871fd851?w=600&q=80&auto=format" },
  { name: "Trail Running", count: 73,  bg: "#5c4a2e", accent: "#a0844c", image: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=600&q=80&auto=format" },
];

const PRODUCTS = [
  {
    name: "Summit 45L Pack",
    tagline: "Ultralight. Indestructible. Your new trail partner.",
    price: 189,
    rating: 4.5,
    swatch: "#1a4a32",
    image: "https://images.unsplash.com/photo-1622260614153-03223fb72052?w=400&q=80&auto=format",
  },
  {
    name: "Basecamp 2P Tent",
    tagline: "4-season shelter that laughs at storms.",
    price: 349,
    rating: 5,
    swatch: "#2c5a3a",
    image: "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=400&q=80&auto=format",
  },
  {
    name: "Ridgeline Soft Shell",
    tagline: "Move fast. Stay dry. Look sharp.",
    price: 129,
    rating: 4.0,
    swatch: "#3a4a28",
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&q=80&auto=format",
  },
];

const STATS = [
  { value: "2.4M",  label: "Trees Planted" },
  { value: "18K T", label: "Carbon Offset" },
  { value: "92%",   label: "Recycled Materials" },
];

const FOOTER_COLS = [
  { title: "Shop",    links: ["New Arrivals", "Best Sellers", "Sale", "Gift Cards"] },
  { title: "Company", links: ["About Us", "Careers", "Press", "Stores"] },
  { title: "Support", links: ["Help Center", "Returns", "Warranty", "Contact"] },
];

// ── Main component ───────────────────────────────────────
export function App() {
  const isMobile  = useMedia("(max-width: 768px)");
  const isTablet  = useMedia("(max-width: 1024px)");
  const [activeNav, setActiveNav] = useState("Gear");
  const [hoveredCat, setHoveredCat] = useState<number | null>(null);
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* ── Global reset ── */}
      <style>{`
        *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; -webkit-font-smoothing: antialiased; }
        a { text-decoration: none; color: inherit; }
        button { border: none; cursor: pointer; font-family: inherit; }
        img { display: block; max-width: 100%; }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideDown {
          from { opacity: 0; max-height: 0; }
          to   { opacity: 1; max-height: 400px; }
        }
      `}</style>

      {/* ════════════════════════════════════════════════════
          NAVIGATION
         ════════════════════════════════════════════════════ */}
      <nav
        style={{
          position: "relative",
          background: "rgba(255,255,255,0.96)",
          borderBottom: "1px solid #e8e8e4",
          padding: isMobile ? "0 16px" : "0 48px",
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          fontFamily: font.body,
        }}
      >
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <MountainIcon size={22} color={C.green} />
          <span
            style={{
              fontFamily: font.heading,
              fontWeight: 800,
              fontSize: 22,
              color: C.green,
              letterSpacing: 3,
            }}
          >
            TERRA
          </span>
        </div>

        {/* Desktop nav links */}
        {!isMobile && (
          <div style={{ display: "flex", gap: 36 }}>
            {NAV_LINKS.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                onClick={(e) => { e.preventDefault(); setActiveNav(link); }}
                style={{
                  fontSize: 14,
                  fontWeight: 500,
                  color: activeNav === link ? C.green : "#555",
                  position: "relative",
                  paddingBottom: 4,
                  borderBottom: activeNav === link ? `2px solid ${C.green}` : "2px solid transparent",
                  transition: "all 0.2s ease",
                  letterSpacing: 0.3,
                }}
              >
                {link}
              </a>
            ))}
          </div>
        )}

        {/* Right side */}
        <div style={{ display: "flex", alignItems: "center", gap: isMobile ? 12 : 24 }}>
          {!isMobile && (
            <>
              {/* Search icon */}
              <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth={2} strokeLinecap="round" style={{ cursor: "pointer" }}>
                <circle cx={11} cy={11} r={7} />
                <line x1={16.5} y1={16.5} x2={21} y2={21} />
              </svg>
              {/* Cart icon */}
              <div style={{ position: "relative", cursor: "pointer" }}>
                <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 6h15l-1.5 9h-12z" />
                  <circle cx={9} cy={20} r={1.5} fill="#555" />
                  <circle cx={18} cy={20} r={1.5} fill="#555" />
                  <path d="M1 1h3l1 4" />
                </svg>
                <span
                  style={{
                    position: "absolute",
                    top: -6,
                    right: -8,
                    background: C.green,
                    color: "#fff",
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
                  3
                </span>
              </div>
            </>
          )}

          {/* Mobile hamburger */}
          {isMobile && (
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              style={{
                background: "none",
                display: "flex",
                flexDirection: "column",
                gap: 4,
                padding: 4,
              }}
            >
              <span style={{ width: 22, height: 2, background: "#333", borderRadius: 1, transition: "0.2s", transform: menuOpen ? "rotate(45deg) translateY(6px)" : "none" }} />
              <span style={{ width: 22, height: 2, background: "#333", borderRadius: 1, transition: "0.2s", opacity: menuOpen ? 0 : 1 }} />
              <span style={{ width: 22, height: 2, background: "#333", borderRadius: 1, transition: "0.2s", transform: menuOpen ? "rotate(-45deg) translateY(-6px)" : "none" }} />
            </button>
          )}
        </div>
      </nav>

      {/* Mobile menu dropdown */}
      {isMobile && menuOpen && (
        <div
          style={{
            position: "relative",
            background: "#fff",
            borderBottom: `2px solid ${C.green}`,
            animation: "slideDown 0.3s ease",
            overflow: "hidden",
          }}
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              onClick={(e) => { e.preventDefault(); setActiveNav(link); setMenuOpen(false); }}
              style={{
                display: "block",
                padding: "14px 24px",
                fontSize: 15,
                fontWeight: 500,
                color: activeNav === link ? C.green : "#333",
                borderLeft: activeNav === link ? `3px solid ${C.green}` : "3px solid transparent",
                fontFamily: font.body,
              }}
            >
              {link}
            </a>
          ))}
        </div>
      )}

      {/* ════════════════════════════════════════════════════
          HERO SECTION
         ════════════════════════════════════════════════════ */}
      <section
        style={{
          position: "relative",
          minHeight: isMobile ? "85vh" : "100vh",
          background: `linear-gradient(165deg, ${C.heroGreen} 0%, ${C.heroDark} 60%, #061a14 100%)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          backgroundImage: "linear-gradient(rgba(13,74,58,0.6), rgba(9,46,38,0.75)), url(https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600&q=80&auto=format)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <TopoPattern />

        {/* Subtle mountain silhouette at bottom */}
        <svg
          style={{ position: "absolute", bottom: 0, left: 0, width: "100%", height: "30%", pointerEvents: "none" }}
          viewBox="0 0 1440 300"
          preserveAspectRatio="none"
          fill="none"
        >
          <path d="M0 300L180 180L360 240L540 120L720 200L900 100L1080 180L1260 140L1440 220V300H0Z" fill="rgba(0,0,0,0.15)" />
          <path d="M0 300L240 220L480 260L720 160L960 230L1200 150L1440 250V300H0Z" fill="rgba(0,0,0,0.1)" />
        </svg>

        <div
          style={{
            position: "relative",
            zIndex: 2,
            textAlign: "center",
            padding: isMobile ? "0 20px" : "0 40px",
            maxWidth: 800,
            animation: "fadeUp 0.8s ease both",
          }}
        >
          {/* Badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: 100,
              padding: "8px 20px",
              marginBottom: 28,
              backdropFilter: "blur(4px)",
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: C.greenLight }} />
            <span style={{ color: "rgba(255,255,255,0.8)", fontSize: 12, fontWeight: 500, fontFamily: font.body, letterSpacing: 1.5, textTransform: "uppercase" }}>
              Spring 2026 Collection
            </span>
          </div>

          <h1
            style={{
              fontFamily: font.heading,
              fontSize: isMobile ? 42 : 72,
              fontWeight: 800,
              color: C.white,
              lineHeight: 1.08,
              letterSpacing: -1,
              marginBottom: 20,
            }}
          >
            Gear Built<br />for the Wild
          </h1>

          <p
            style={{
              fontFamily: font.body,
              fontSize: isMobile ? 16 : 18,
              color: "rgba(255,255,255,0.6)",
              lineHeight: 1.7,
              maxWidth: 520,
              margin: "0 auto 40px",
              fontWeight: 300,
            }}
          >
            Engineered for durability. Tested by explorers. Built to endure every summit,
            trail, and storm the wild throws your way.
          </p>

          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <button
              style={{
                fontFamily: font.heading,
                fontSize: 15,
                fontWeight: 600,
                background: C.green,
                color: "#fff",
                padding: "16px 40px",
                borderRadius: 6,
                letterSpacing: 0.5,
                transition: "all 0.25s ease",
                boxShadow: `0 4px 24px rgba(13,150,104,0.35)`,
              }}
              onMouseEnter={(e) => { (e.target as HTMLButtonElement).style.background = C.greenLight; (e.target as HTMLButtonElement).style.transform = "translateY(-2px)"; }}
              onMouseLeave={(e) => { (e.target as HTMLButtonElement).style.background = C.green; (e.target as HTMLButtonElement).style.transform = "translateY(0)"; }}
            >
              Shop All Gear
            </button>
            <button
              style={{
                fontFamily: font.heading,
                fontSize: 15,
                fontWeight: 600,
                background: "transparent",
                color: "rgba(255,255,255,0.8)",
                padding: "16px 40px",
                borderRadius: 6,
                border: "1px solid rgba(255,255,255,0.2)",
                letterSpacing: 0.5,
                transition: "all 0.25s ease",
              }}
              onMouseEnter={(e) => { (e.target as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.5)"; (e.target as HTMLButtonElement).style.color = "#fff"; }}
              onMouseLeave={(e) => { (e.target as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.2)"; (e.target as HTMLButtonElement).style.color = "rgba(255,255,255,0.8)"; }}
            >
              Our Story
            </button>
          </div>

          {/* Scroll hint */}
          <div
            style={{
              marginTop: 60,
              opacity: 0.35,
              animation: "fadeUp 1.2s ease both",
            }}
          >
            <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={1.5} strokeLinecap="round">
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          CATEGORY CARDS
         ════════════════════════════════════════════════════ */}
      <section
        style={{
          padding: isMobile ? "64px 16px" : "100px 48px",
          maxWidth: 1200,
          margin: "0 auto",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: isMobile ? 36 : 56 }}>
          <p
            style={{
              fontFamily: font.body,
              fontSize: 12,
              fontWeight: 600,
              color: C.green,
              letterSpacing: 3,
              textTransform: "uppercase",
              marginBottom: 12,
            }}
          >
            Explore
          </p>
          <h2
            style={{
              fontFamily: font.heading,
              fontSize: isMobile ? 28 : 40,
              fontWeight: 700,
              color: C.dark,
              letterSpacing: -0.5,
            }}
          >
            Shop by Category
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr 1fr" : isTablet ? "repeat(2, 1fr)" : "repeat(4, 1fr)",
            gap: isMobile ? 12 : 20,
          }}
        >
          {CATEGORIES.map((cat, i) => (
            <div
              key={cat.name}
              onMouseEnter={() => setHoveredCat(i)}
              onMouseLeave={() => setHoveredCat(null)}
              style={{
                position: "relative",
                borderRadius: 12,
                overflow: "hidden",
                aspectRatio: isMobile ? "3 / 4" : "3 / 4.2",
                background: `linear-gradient(160deg, ${cat.accent} 0%, ${cat.bg} 100%)`,
                backgroundImage: `url(${cat.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                cursor: "pointer",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                transform: hoveredCat === i ? "translateY(-4px)" : "none",
                boxShadow: hoveredCat === i ? "0 12px 40px rgba(0,0,0,0.2)" : "0 2px 12px rgba(0,0,0,0.08)",
              }}
            >
              {/* Decorative mountain/terrain shapes */}
              <svg
                style={{ position: "absolute", bottom: 0, left: 0, width: "100%", height: "50%", pointerEvents: "none" }}
                viewBox="0 0 200 100"
                preserveAspectRatio="none"
              >
                <path d="M0 100L40 50L80 75L120 30L160 60L200 40V100H0Z" fill="rgba(0,0,0,0.15)" />
                <path d="M0 100L60 70L100 85L150 55L200 75V100H0Z" fill="rgba(0,0,0,0.1)" />
              </svg>

              {/* Hover overlay */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "rgba(0,0,0,0.12)",
                  opacity: hoveredCat === i ? 1 : 0,
                  transition: "opacity 0.3s ease",
                }}
              />

              {/* Text overlay at bottom */}
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: isMobile ? "16px" : "24px",
                  background: "linear-gradient(transparent 0%, rgba(0,0,0,0.35) 40%, rgba(0,0,0,0.7) 100%)",
                }}
              >
                <h3
                  style={{
                    fontFamily: font.heading,
                    fontSize: isMobile ? 18 : 22,
                    fontWeight: 700,
                    color: C.white,
                    marginBottom: 4,
                  }}
                >
                  {cat.name}
                </h3>
                <p
                  style={{
                    fontFamily: font.body,
                    fontSize: 13,
                    color: "rgba(255,255,255,0.7)",
                    fontWeight: 400,
                  }}
                >
                  {cat.count} products
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          FEATURED PRODUCTS
         ════════════════════════════════════════════════════ */}
      <section
        style={{
          background: C.offWhite,
          padding: isMobile ? "64px 16px" : "100px 48px",
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: isMobile ? "flex-start" : "flex-end",
              flexDirection: isMobile ? "column" : "row",
              gap: 16,
              marginBottom: isMobile ? 36 : 56,
            }}
          >
            <div>
              <p
                style={{
                  fontFamily: font.body,
                  fontSize: 12,
                  fontWeight: 600,
                  color: C.green,
                  letterSpacing: 3,
                  textTransform: "uppercase",
                  marginBottom: 12,
                }}
              >
                Featured
              </p>
              <h2
                style={{
                  fontFamily: font.heading,
                  fontSize: isMobile ? 28 : 40,
                  fontWeight: 700,
                  color: C.dark,
                  letterSpacing: -0.5,
                }}
              >
                Trail-Tested Favorites
              </h2>
            </div>
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              style={{
                fontFamily: font.body,
                fontSize: 14,
                fontWeight: 500,
                color: C.green,
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              View All
              <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke={C.green} strokeWidth={2} strokeLinecap="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : isTablet ? "repeat(2, 1fr)" : "repeat(3, 1fr)",
              gap: isMobile ? 20 : 24,
            }}
          >
            {PRODUCTS.map((product, i) => (
              <div
                key={product.name}
                onMouseEnter={() => setHoveredProduct(i)}
                onMouseLeave={() => setHoveredProduct(null)}
                style={{
                  background: C.card,
                  borderRadius: 12,
                  overflow: "hidden",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  transform: hoveredProduct === i ? "translateY(-4px)" : "none",
                  boxShadow: hoveredProduct === i ? "0 16px 48px rgba(0,0,0,0.25)" : "0 2px 16px rgba(0,0,0,0.1)",
                }}
              >
                {/* Product image */}
                <div
                  style={{
                    position: "relative",
                    height: isMobile ? 220 : 260,
                    background: `linear-gradient(135deg, ${product.swatch}, ${product.swatch}cc)`,
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

                  {/* Badge */}
                  {i === 0 && (
                    <span
                      style={{
                        position: "absolute",
                        top: 16,
                        left: 16,
                        background: C.green,
                        color: "#fff",
                        fontSize: 11,
                        fontWeight: 600,
                        padding: "5px 12px",
                        borderRadius: 100,
                        fontFamily: font.body,
                        letterSpacing: 0.5,
                      }}
                    >
                      Best Seller
                    </span>
                  )}
                  {i === 1 && (
                    <span
                      style={{
                        position: "absolute",
                        top: 16,
                        left: 16,
                        background: C.gold,
                        color: "#1a1a1a",
                        fontSize: 11,
                        fontWeight: 600,
                        padding: "5px 12px",
                        borderRadius: 100,
                        fontFamily: font.body,
                        letterSpacing: 0.5,
                      }}
                    >
                      Editor's Pick
                    </span>
                  )}
                </div>

                {/* Product info */}
                <div style={{ padding: isMobile ? "20px" : "24px" }}>
                  <StarRating rating={product.rating} />

                  <h3
                    style={{
                      fontFamily: font.heading,
                      fontSize: 20,
                      fontWeight: 700,
                      color: C.white,
                      marginTop: 10,
                      marginBottom: 6,
                    }}
                  >
                    {product.name}
                  </h3>

                  <p
                    style={{
                      fontFamily: font.body,
                      fontSize: 14,
                      color: C.textMuted,
                      lineHeight: 1.5,
                      marginBottom: 20,
                    }}
                  >
                    {product.tagline}
                  </p>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: font.heading,
                        fontSize: 24,
                        fontWeight: 700,
                        color: C.white,
                      }}
                    >
                      ${product.price}
                    </span>

                    <button
                      style={{
                        fontFamily: font.body,
                        fontSize: 13,
                        fontWeight: 600,
                        background: C.green,
                        color: "#fff",
                        padding: "10px 20px",
                        borderRadius: 6,
                        letterSpacing: 0.3,
                        transition: "all 0.2s ease",
                      }}
                      onMouseEnter={(e) => { (e.target as HTMLButtonElement).style.background = C.greenLight; }}
                      onMouseLeave={(e) => { (e.target as HTMLButtonElement).style.background = C.green; }}
                    >
                      Add to Pack
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          SUSTAINABILITY BANNER
         ════════════════════════════════════════════════════ */}
      <section
        style={{
          background: C.leaf,
          padding: isMobile ? "64px 16px" : "80px 48px",
        }}
      >
        <div
          style={{
            maxWidth: 1000,
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          <div style={{ marginBottom: 20 }}>
            <LeafIcon size={40} color={C.green} />
          </div>

          <p
            style={{
              fontFamily: font.body,
              fontSize: 12,
              fontWeight: 600,
              color: C.greenDark,
              letterSpacing: 3,
              textTransform: "uppercase",
              marginBottom: 12,
            }}
          >
            Our Promise
          </p>

          <h2
            style={{
              fontFamily: font.heading,
              fontSize: isMobile ? 28 : 42,
              fontWeight: 800,
              color: C.heroGreen,
              letterSpacing: -0.5,
              marginBottom: 16,
            }}
          >
            1% for the Planet
          </h2>

          <p
            style={{
              fontFamily: font.body,
              fontSize: isMobile ? 15 : 17,
              color: "#4a6d5a",
              lineHeight: 1.8,
              maxWidth: 640,
              margin: "0 auto 48px",
              fontWeight: 400,
            }}
          >
            Every piece of Terra gear carries a commitment to the wild places that inspire it.
            We donate 1% of all revenue to environmental nonprofits, use recycled materials
            wherever possible, and work toward carbon-neutral operations by 2027.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
              gap: isMobile ? 24 : 40,
              maxWidth: 720,
              margin: "0 auto",
            }}
          >
            {STATS.map((stat) => (
              <div
                key={stat.label}
                style={{
                  background: "rgba(255,255,255,0.7)",
                  borderRadius: 12,
                  padding: "28px 20px",
                  backdropFilter: "blur(4px)",
                }}
              >
                <div
                  style={{
                    fontFamily: font.heading,
                    fontSize: 36,
                    fontWeight: 800,
                    color: C.green,
                    marginBottom: 6,
                  }}
                >
                  {stat.value}
                </div>
                <div
                  style={{
                    fontFamily: font.body,
                    fontSize: 13,
                    fontWeight: 500,
                    color: "#5a7d6a",
                    letterSpacing: 0.5,
                    textTransform: "uppercase",
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          FOOTER
         ════════════════════════════════════════════════════ */}
      <footer
        style={{
          background: C.dark,
          padding: isMobile ? "48px 16px 32px" : "72px 48px 40px",
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "2fr repeat(3, 1fr)",
              gap: isMobile ? 40 : 48,
              marginBottom: isMobile ? 40 : 56,
            }}
          >
            {/* Brand column */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                <MountainIcon size={20} color={C.green} />
                <span
                  style={{
                    fontFamily: font.heading,
                    fontWeight: 800,
                    fontSize: 20,
                    color: C.green,
                    letterSpacing: 3,
                  }}
                >
                  TERRA
                </span>
              </div>
              <p
                style={{
                  fontFamily: font.body,
                  fontSize: 14,
                  color: "#666",
                  lineHeight: 1.7,
                  maxWidth: 280,
                }}
              >
                Gear built for the wild. Designed in Colorado, tested across every continent.
              </p>

              {/* Social icons */}
              <div style={{ display: "flex", gap: 16, marginTop: 24 }}>
                {["M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.164 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.268 2.75 1.026A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.026 2.747-1.026.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z",
                  "M23 3a10.9 10.9 0 01-3.14 1.53A4.48 4.48 0 0012 7.5v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z",
                  "M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 0v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 2a2 2 0 110 4 2 2 0 010-4z",
                ].map((path, idx) => (
                  <a
                    key={idx}
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: "50%",
                      background: "rgba(255,255,255,0.06)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "background 0.2s",
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "rgba(13,150,104,0.2)"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.06)"; }}
                  >
                    <svg width={16} height={16} viewBox="0 0 24 24" fill="#888">
                      <path d={path} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            {/* Link columns */}
            {FOOTER_COLS.map((col) => (
              <div key={col.title}>
                <h4
                  style={{
                    fontFamily: font.heading,
                    fontSize: 14,
                    fontWeight: 700,
                    color: C.white,
                    letterSpacing: 1,
                    textTransform: "uppercase",
                    marginBottom: 20,
                  }}
                >
                  {col.title}
                </h4>
                <ul style={{ listStyle: "none" }}>
                  {col.links.map((link) => (
                    <li key={link} style={{ marginBottom: 12 }}>
                      <a
                        href="#"
                        onClick={(e) => e.preventDefault()}
                        style={{
                          fontFamily: font.body,
                          fontSize: 14,
                          color: "#777",
                          transition: "color 0.2s",
                        }}
                        onMouseEnter={(e) => { (e.target as HTMLAnchorElement).style.color = C.green; }}
                        onMouseLeave={(e) => { (e.target as HTMLAnchorElement).style.color = "#777"; }}
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
              borderTop: "1px solid rgba(255,255,255,0.08)",
              paddingTop: 24,
              display: "flex",
              justifyContent: "space-between",
              alignItems: isMobile ? "flex-start" : "center",
              flexDirection: isMobile ? "column" : "row",
              gap: 12,
            }}
          >
            <p
              style={{
                fontFamily: font.body,
                fontSize: 13,
                color: "#555",
              }}
            >
              &copy; 2026 Terra Outdoor Co. All rights reserved.
            </p>
            <div style={{ display: "flex", gap: 24 }}>
              {["Privacy", "Terms", "Cookies"].map((item) => (
                <a
                  key={item}
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  style={{
                    fontFamily: font.body,
                    fontSize: 13,
                    color: "#555",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => { (e.target as HTMLAnchorElement).style.color = "#999"; }}
                  onMouseLeave={(e) => { (e.target as HTMLAnchorElement).style.color = "#555"; }}
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
