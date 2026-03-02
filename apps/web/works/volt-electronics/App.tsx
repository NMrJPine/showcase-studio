import React, { useState, useEffect } from "react";

// ── Color / Font Constants ──────────────────────────────────────────
const C = {
  bg: "#0a0a0f",
  card: "#111118",
  cardHover: "#16161f",
  cyan: "#0891b2",
  cyanLight: "#22d3ee",
  cyanDim: "rgba(8,145,178,0.15)",
  cyanGlow: "0 0 20px rgba(8,145,178,0.35), 0 0 60px rgba(8,145,178,0.10)",
  cyanGlowSm: "0 0 10px rgba(8,145,178,0.30)",
  text: "#e4e4e7",
  textMuted: "#a1a1aa",
  textDim: "#71717a",
  white: "#fafafa",
  border: "#1e1e2a",
  rowAlt: "#0d0d14",
};

const F = {
  heading: "'Space Grotesk', sans-serif",
  body: "'Inter', sans-serif",
};

// ── Tiny Lightning‑bolt SVG ─────────────────────────────────────────
function BoltIcon({ size = 20, color = C.cyan }: { size?: number; color?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      style={{ display: "inline-block", verticalAlign: "middle" }}
    >
      <path
        d="M13 2L4.5 13.5H12L11 22L19.5 10.5H12L13 2Z"
        fill={color}
        stroke={color}
        strokeWidth="1"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ── Star rating ─────────────────────────────────────────────────────
function Stars({ rating }: { rating: number }) {
  return (
    <span style={{ letterSpacing: 2, fontSize: 14, color: C.cyanLight }}>
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} style={{ opacity: i < rating ? 1 : 0.25 }}>
          ★
        </span>
      ))}
    </span>
  );
}

// ── Responsive hook ─────────────────────────────────────────────────
function useIsMobile(breakpoint = 768) {
  const [mobile, setMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < breakpoint : false,
  );
  useEffect(() => {
    const handler = () => setMobile(window.innerWidth < breakpoint);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, [breakpoint]);
  return mobile;
}

// ── Data ────────────────────────────────────────────────────────────
const spotlightSpecs = ["40h Battery", "ANC Pro", "Bluetooth 5.3", "Hi-Res Audio"];

const products = [
  { name: "VoltWave Speaker", category: "Audio", price: "$149", rating: 4, image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&q=80&auto=format" },
  { name: "VoltCharge 65W", category: "Charger", price: "$59", rating: 5, image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400&q=80&auto=format" },
  { name: "VoltBuds Lite", category: "Earbuds", price: "$89", rating: 4, image: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=400&q=80&auto=format" },
];

const comparisonHeaders = ["", "VoltPro X1", "VoltBuds Lite", "VoltWave Speaker"];
const comparisonRows = [
  ["Battery", "40 hours", "28 hours", "12 hours"],
  ["Weight", "265 g", "52 g", "680 g"],
  ["Audio", "Hi-Res + ANC", "AAC / SBC", "360° Spatial"],
  ["Price", "$249", "$89", "$149"],
];

// ═════════════════════════════════════════════════════════════════════
// ██  APP
// ═════════════════════════════════════════════════════════════════════
export function App() {
  const mobile = useIsMobile();

  return (
    <div style={{ background: C.bg, color: C.text, fontFamily: F.body, lineHeight: 1.6 }}>
      {/* ── Global reset ──────────────────────────────────────── */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            *, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }
            html { scroll-behavior:smooth; -webkit-font-smoothing:antialiased; }
            a { color:inherit; text-decoration:none; }
            button { font-family:inherit; cursor:pointer; border:none; background:none; }
            img { display:block; max-width:100%; }

            @keyframes fadeInUp {
              from { opacity:0; transform:translateY(24px); }
              to   { opacity:1; transform:translateY(0); }
            }
            @keyframes pulseGlow {
              0%,100% { box-shadow: 0 0 20px rgba(8,145,178,0.25); }
              50%     { box-shadow: 0 0 35px rgba(8,145,178,0.45); }
            }
            @keyframes gridScroll {
              from { background-position: 0 0; }
              to   { background-position: 60px 60px; }
            }
          `,
        }}
      />

      {/* ── Navigation ────────────────────────────────────────── */}
      <Nav mobile={mobile} />

      {/* ── Hero ──────────────────────────────────────────────── */}
      <Hero mobile={mobile} />

      {/* ── Product Spotlight ─────────────────────────────────── */}
      <Spotlight mobile={mobile} />

      {/* ── Product Grid ──────────────────────────────────────── */}
      <ProductGrid mobile={mobile} />

      {/* ── Comparison Table ──────────────────────────────────── */}
      <Comparison mobile={mobile} />

      {/* ── Footer ────────────────────────────────────────────── */}
      <Footer mobile={mobile} />
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════
// ██  NAV
// ═════════════════════════════════════════════════════════════════════
function Nav({ mobile }: { mobile: boolean }) {
  const links = ["Products", "Compare", "Reviews", "Support"];
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: mobile ? "0 20px" : "0 48px",
          height: 64,
          background: "#0a0a0f",
          borderBottom: `1px solid ${C.cyanDim}`,
          boxShadow: `0 1px 30px rgba(8,145,178,0.08)`,
        }}
      >
        {/* Logo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            fontFamily: F.heading,
            fontWeight: 700,
            fontSize: 22,
            letterSpacing: 3,
            color: C.white,
          }}
        >
          <BoltIcon size={22} />
          VOLT
        </div>

        {/* Links */}
        {!mobile && (
          <div style={{ display: "flex", gap: 32 }}>
            {links.map((l) => (
              <a
                key={l}
                href={`#${l.toLowerCase()}`}
                style={{
                  fontSize: 14,
                  fontWeight: 500,
                  color: C.textMuted,
                  transition: "color .2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = C.cyanLight)}
                onMouseLeave={(e) => (e.currentTarget.style.color = C.textMuted)}
              >
                {l}
              </a>
            ))}
          </div>
        )}

        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {/* CTA */}
          {!mobile && (
            <button
              style={{
                fontSize: 13,
                fontWeight: 600,
                padding: "8px 20px",
                borderRadius: 6,
                background: C.cyan,
                color: C.white,
                transition: "box-shadow .2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.boxShadow = C.cyanGlowSm)}
              onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
            >
              Shop Now
            </button>
          )}

          {/* Mobile hamburger */}
          {mobile && (
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
              <span style={{ width: 22, height: 2, background: C.cyanLight, borderRadius: 1, transition: "0.2s", transform: menuOpen ? "rotate(45deg) translateY(6px)" : "none" }} />
              <span style={{ width: 22, height: 2, background: C.cyanLight, borderRadius: 1, transition: "0.2s", opacity: menuOpen ? 0 : 1 }} />
              <span style={{ width: 22, height: 2, background: C.cyanLight, borderRadius: 1, transition: "0.2s", transform: menuOpen ? "rotate(-45deg) translateY(-6px)" : "none" }} />
            </button>
          )}
        </div>
      </nav>

      {/* Mobile dropdown menu */}
      {mobile && menuOpen && (
        <div
          style={{
            background: "#0a0a0f",
            borderBottom: `1px solid ${C.cyan}`,
            padding: "8px 20px 16px",
          }}
        >
          {links.map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              style={{
                display: "block",
                fontSize: 14,
                fontWeight: 500,
                color: C.textMuted,
                padding: "12px 0",
                borderBottom: `1px solid ${C.border}`,
                transition: "color .2s",
              }}
            >
              {l}
            </a>
          ))}
          <button
            style={{
              fontSize: 13,
              fontWeight: 600,
              padding: "10px 24px",
              borderRadius: 6,
              background: C.cyan,
              color: C.white,
              marginTop: 12,
              width: "100%",
            }}
          >
            Shop Now
          </button>
        </div>
      )}
    </>
  );
}

// ═════════════════════════════════════════════════════════════════════
// ██  HERO
// ═════════════════════════════════════════════════════════════════════
function Hero({ mobile }: { mobile: boolean }) {
  return (
    <section
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: mobile ? "100px 20px 80px" : "120px 48px 100px",
        overflow: "hidden",
      }}
    >
      {/* Background video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: 0.3,
          pointerEvents: "none",
        }}
      >
        <source src="https://videos.pexels.com/video-files/3129671/3129671-uhd_2560_1440_30fps.mp4" type="video/mp4" />
      </video>

      {/* Animated grid background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(8,145,178,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(8,145,178,0.06) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          animation: "gridScroll 8s linear infinite",
          maskImage: "radial-gradient(ellipse 70% 60% at 50% 50%, black 30%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 60% at 50% 50%, black 30%, transparent 100%)",
        }}
      />

      {/* Radial glow */}
      <div
        style={{
          position: "absolute",
          top: "30%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 700,
          height: 700,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(8,145,178,0.10) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Content */}
      <div style={{ position: "relative", zIndex: 1, animation: "fadeInUp .8s ease-out both" }}>
        <p
          style={{
            fontFamily: F.body,
            fontSize: 13,
            fontWeight: 600,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: C.cyan,
            marginBottom: 20,
          }}
        >
          Next-Gen Consumer Electronics
        </p>

        <h1
          style={{
            fontFamily: F.heading,
            fontSize: mobile ? 40 : 72,
            fontWeight: 700,
            lineHeight: 1.08,
            color: C.white,
            marginBottom: 24,
            maxWidth: 800,
          }}
        >
          Technology That{" "}
          <span
            style={{
              background: `linear-gradient(135deg, ${C.cyan}, ${C.cyanLight})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Electrifies
          </span>
        </h1>

        <p
          style={{
            fontSize: mobile ? 16 : 18,
            color: C.textMuted,
            maxWidth: 540,
            margin: "0 auto 40px",
            lineHeight: 1.7,
          }}
        >
          Precision-engineered audio, lightning-fast charging, and immersive sound — designed for
          those who demand more.
        </p>

        <button
          style={{
            fontSize: 15,
            fontWeight: 600,
            fontFamily: F.heading,
            padding: "14px 36px",
            borderRadius: 8,
            border: `1.5px solid ${C.cyan}`,
            color: C.cyanLight,
            background: "transparent",
            transition: "all .25s",
            boxShadow: `0 0 20px rgba(8,145,178,0.20)`,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = C.cyan;
            e.currentTarget.style.color = C.white;
            e.currentTarget.style.boxShadow = C.cyanGlow;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.color = C.cyanLight;
            e.currentTarget.style.boxShadow = "0 0 20px rgba(8,145,178,0.20)";
          }}
        >
          Explore Products
        </button>
      </div>

      {/* Bottom fade-out */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 160,
          background: `linear-gradient(transparent, ${C.bg})`,
          pointerEvents: "none",
        }}
      />
    </section>
  );
}

// ═════════════════════════════════════════════════════════════════════
// ██  SPOTLIGHT
// ═════════════════════════════════════════════════════════════════════
function Spotlight({ mobile }: { mobile: boolean }) {
  return (
    <section
      id="products"
      style={{
        padding: mobile ? "60px 20px" : "100px 48px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 780,
          background: C.card,
          borderRadius: 16,
          border: `1px solid ${C.border}`,
          overflow: "hidden",
          animation: "fadeInUp .7s ease-out both",
        }}
      >
        {/* Product image */}
        <div
          style={{
            width: "100%",
            height: mobile ? 220 : 340,
            background: `linear-gradient(135deg, #0c0c14 0%, #111120 100%)`,
            borderBottom: `1px solid ${C.border}`,
            position: "relative",
            overflow: "hidden",
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80&auto=format"
            alt="VoltPro X1 Headphones"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
          {/* Decorative glow overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              boxShadow: `inset 0 0 60px rgba(8,145,178,0.15)`,
              pointerEvents: "none",
            }}
          />
        </div>

        {/* Info */}
        <div style={{ padding: mobile ? "28px 24px 32px" : "36px 40px 40px" }}>
          <p
            style={{
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: 3,
              textTransform: "uppercase",
              color: C.cyan,
              marginBottom: 8,
            }}
          >
            Featured Product
          </p>
          <h2
            style={{
              fontFamily: F.heading,
              fontSize: mobile ? 26 : 32,
              fontWeight: 700,
              color: C.white,
              marginBottom: 16,
            }}
          >
            VoltPro X1 Headphones
          </h2>

          {/* Spec badges */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 8,
              marginBottom: 24,
            }}
          >
            {spotlightSpecs.map((spec) => (
              <span
                key={spec}
                style={{
                  fontSize: 12,
                  fontWeight: 500,
                  padding: "5px 14px",
                  borderRadius: 100,
                  background: C.cyanDim,
                  color: C.cyanLight,
                  border: `1px solid rgba(8,145,178,0.2)`,
                }}
              >
                {spec}
              </span>
            ))}
          </div>

          {/* Price */}
          <p
            style={{
              fontFamily: F.heading,
              fontSize: 28,
              fontWeight: 700,
              color: C.white,
              marginBottom: 28,
            }}
          >
            $249
          </p>

          {/* Buttons */}
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <button
              style={{
                fontSize: 14,
                fontWeight: 600,
                padding: "12px 32px",
                borderRadius: 8,
                background: C.cyan,
                color: C.white,
                transition: "all .25s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.boxShadow = C.cyanGlow)}
              onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
            >
              Buy Now
            </button>
            <button
              style={{
                fontSize: 14,
                fontWeight: 600,
                padding: "12px 32px",
                borderRadius: 8,
                border: `1.5px solid ${C.border}`,
                color: C.textMuted,
                transition: "all .25s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = C.cyan;
                e.currentTarget.style.color = C.cyanLight;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = C.border;
                e.currentTarget.style.color = C.textMuted;
              }}
            >
              Compare
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

// ═════════════════════════════════════════════════════════════════════
// ██  PRODUCT GRID
// ═════════════════════════════════════════════════════════════════════
function ProductCard({
  name,
  category,
  price,
  rating,
  image,
  mobile,
}: {
  name: string;
  category: string;
  price: string;
  rating: number;
  image: string;
  mobile: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        flex: mobile ? "1 1 100%" : "1 1 0",
        minWidth: mobile ? "auto" : 240,
        background: hovered ? C.cardHover : C.card,
        borderRadius: 14,
        border: `1px solid ${hovered ? "rgba(8,145,178,0.35)" : C.border}`,
        overflow: "hidden",
        transition: "all .3s",
        boxShadow: hovered ? C.cyanGlowSm : "none",
      }}
    >
      {/* Product image */}
      <div
        style={{
          width: "100%",
          height: 180,
          background: `linear-gradient(160deg, #0e0e16 0%, #14141f 100%)`,
          borderBottom: `1px solid ${C.border}`,
          overflow: "hidden",
        }}
      >
        <img
          src={image}
          alt={name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            transition: "transform .3s",
            transform: hovered ? "scale(1.05)" : "scale(1)",
          }}
        />
      </div>

      <div style={{ padding: "20px 22px 24px" }}>
        <span
          style={{
            display: "inline-block",
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: 1.5,
            textTransform: "uppercase",
            color: C.cyan,
            background: C.cyanDim,
            padding: "3px 10px",
            borderRadius: 4,
            marginBottom: 12,
          }}
        >
          {category}
        </span>
        <h3
          style={{
            fontFamily: F.heading,
            fontSize: 18,
            fontWeight: 600,
            color: C.white,
            marginBottom: 8,
          }}
        >
          {name}
        </h3>
        <Stars rating={rating} />
        <p
          style={{
            fontFamily: F.heading,
            fontSize: 20,
            fontWeight: 700,
            color: C.white,
            marginTop: 12,
          }}
        >
          {price}
        </p>
      </div>
    </div>
  );
}

function ProductGrid({ mobile }: { mobile: boolean }) {
  return (
    <section style={{ padding: mobile ? "40px 20px 60px" : "40px 48px 100px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <h2
          style={{
            fontFamily: F.heading,
            fontSize: mobile ? 26 : 34,
            fontWeight: 700,
            color: C.white,
            textAlign: "center",
            marginBottom: 12,
          }}
        >
          More to Discover
        </h2>
        <p
          style={{
            textAlign: "center",
            color: C.textMuted,
            fontSize: 15,
            marginBottom: 48,
          }}
        >
          Our best-selling lineup, built for every lifestyle.
        </p>

        <div
          style={{
            display: "flex",
            flexDirection: mobile ? "column" : "row",
            gap: 20,
          }}
        >
          {products.map((p) => (
            <ProductCard key={p.name} {...p} mobile={mobile} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ═════════════════════════════════════════════════════════════════════
// ██  COMPARISON TABLE
// ═════════════════════════════════════════════════════════════════════
function Comparison({ mobile }: { mobile: boolean }) {
  return (
    <section
      id="compare"
      style={{
        padding: mobile ? "60px 20px" : "100px 48px",
        background: C.card,
      }}
    >
      <div style={{ maxWidth: 860, margin: "0 auto" }}>
        <h2
          style={{
            fontFamily: F.heading,
            fontSize: mobile ? 26 : 34,
            fontWeight: 700,
            color: C.white,
            textAlign: "center",
            marginBottom: 8,
          }}
        >
          Compare{" "}
          <span
            style={{
              background: `linear-gradient(135deg, ${C.cyan}, ${C.cyanLight})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Side by Side
          </span>
        </h2>
        <p
          style={{
            textAlign: "center",
            color: C.textMuted,
            fontSize: 15,
            marginBottom: 48,
          }}
        >
          See how our products stack up against each other.
        </p>

        <div
          style={{
            overflowX: "auto",
            borderRadius: 12,
            border: `1px solid ${C.border}`,
            WebkitOverflowScrolling: "touch",
          }}
        >
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontFamily: F.body,
              fontSize: mobile ? 13 : 14,
              minWidth: 500,
            }}
          >
            <thead>
              <tr>
                {comparisonHeaders.map((h, i) => (
                  <th
                    key={i}
                    style={{
                      padding: "14px 20px",
                      textAlign: i === 0 ? "left" : "center",
                      fontFamily: F.heading,
                      fontWeight: 600,
                      fontSize: 13,
                      letterSpacing: 0.5,
                      color: i === 0 ? C.textDim : C.cyanLight,
                      background: "rgba(8,145,178,0.08)",
                      borderBottom: `1px solid ${C.border}`,
                    }}
                  >
                    {h || "Spec"}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row, ri) => (
                <tr key={ri}>
                  {row.map((cell, ci) => (
                    <td
                      key={ci}
                      style={{
                        padding: "13px 20px",
                        textAlign: ci === 0 ? "left" : "center",
                        fontWeight: ci === 0 ? 600 : 400,
                        color: ci === 0 ? C.textMuted : C.text,
                        background: ri % 2 === 0 ? C.rowAlt : "transparent",
                        borderBottom:
                          ri < comparisonRows.length - 1
                            ? `1px solid rgba(30,30,42,0.6)`
                            : "none",
                      }}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

// ═════════════════════════════════════════════════════════════════════
// ██  FOOTER
// ═════════════════════════════════════════════════════════════════════
function Footer({ mobile }: { mobile: boolean }) {
  const columns = [
    { title: "Products", links: ["Headphones", "Speakers", "Chargers", "Earbuds"] },
    { title: "Company", links: ["About", "Careers", "Press", "Blog"] },
    { title: "Support", links: ["Help Center", "Warranty", "Returns", "Contact"] },
  ];

  return (
    <footer
      id="support"
      style={{
        borderTop: `1px solid ${C.cyan}`,
        background: "#07070c",
        padding: mobile ? "48px 20px 32px" : "64px 48px 40px",
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          display: mobile ? "grid" : "flex",
          gridTemplateColumns: mobile ? "1fr" : undefined,
          flexDirection: mobile ? undefined : "row",
          gap: mobile ? 32 : 60,
          marginBottom: 48,
        }}
      >
        {/* Brand column */}
        <div style={{ flex: mobile ? "auto" : "1.2" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              fontFamily: F.heading,
              fontWeight: 700,
              fontSize: 20,
              letterSpacing: 3,
              color: C.white,
              marginBottom: 14,
            }}
          >
            <BoltIcon size={20} />
            VOLT
          </div>
          <p style={{ fontSize: 13, color: C.textDim, maxWidth: 260, lineHeight: 1.7 }}>
            Precision-engineered consumer electronics for the modern world. Sound. Power. Freedom.
          </p>
        </div>

        {/* Link columns */}
        {columns.map((col) => (
          <div key={col.title} style={{ flex: 1 }}>
            <h4
              style={{
                fontFamily: F.heading,
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: 1.5,
                textTransform: "uppercase",
                color: C.cyan,
                marginBottom: 16,
              }}
            >
              {col.title}
            </h4>
            <ul style={{ listStyle: "none" }}>
              {col.links.map((link) => (
                <li key={link} style={{ marginBottom: 10 }}>
                  <a
                    href="#"
                    style={{
                      fontSize: 13,
                      color: C.textDim,
                      transition: "color .2s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = C.cyanLight)}
                    onMouseLeave={(e) => (e.currentTarget.style.color = C.textDim)}
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
          borderTop: `1px solid ${C.border}`,
          paddingTop: 24,
          display: "flex",
          flexDirection: mobile ? "column" : "row",
          justifyContent: "space-between",
          alignItems: mobile ? "center" : "center",
          gap: 12,
        }}
      >
        <p style={{ fontSize: 12, color: C.textDim }}>
          &copy; 2026 Volt Electronics. All rights reserved.
        </p>
        <div style={{ display: "flex", gap: 20 }}>
          {["Privacy", "Terms", "Cookies"].map((l) => (
            <a
              key={l}
              href="#"
              style={{ fontSize: 12, color: C.textDim, transition: "color .2s" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = C.cyanLight)}
              onMouseLeave={(e) => (e.currentTarget.style.color = C.textDim)}
            >
              {l}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
