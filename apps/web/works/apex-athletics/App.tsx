import React, { useState, useEffect } from "react";

/* ------------------------------------------------------------------ */
/*  Apex Athletics — Performance Sportswear Brand Showcase Homepage   */
/* ------------------------------------------------------------------ */

const RED = "#dc2626";
const RED_DARK = "#991b1b";
const RED_LIGHT = "#ef4444";
const BG = "#0a0a0a";
const BG_CARD = "#111111";
const BG_SURFACE = "#0f0f0f";
const TEXT = "#ffffff";
const TEXT_MUTED = "#a3a3a3";
const HEADING_FONT = "'Bebas Neue', cursive";
const BODY_FONT = "'Inter', sans-serif";

/* ---- tiny responsive hook ---- */
function useIsMobile(breakpoint = 768) {
  const [mobile, setMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < breakpoint : false,
  );
  useEffect(() => {
    const h = () => setMobile(window.innerWidth < breakpoint);
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, [breakpoint]);
  return mobile;
}

/* ---- reusable button ---- */
function RedButton({
  children,
  style,
  large,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
  large?: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontFamily: BODY_FONT,
        fontWeight: 700,
        fontSize: large ? 18 : 14,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        color: TEXT,
        background: hovered ? RED_LIGHT : RED,
        border: "none",
        padding: large ? "18px 48px" : "12px 28px",
        cursor: "pointer",
        transition: "background .2s, transform .2s",
        transform: hovered ? "scale(1.04)" : "scale(1)",
        ...style,
      }}
    >
      {children}
    </button>
  );
}

/* ================================================================== */
/*  NAV                                                                */
/* ================================================================== */
function Nav({ mobile }: { mobile: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const links = ["Men", "Women", "Sports", "Athletes", "Sale"];

  return (
    <nav
      style={{
        position: "relative",
        borderTop: `3px solid ${RED}`,
        background: "#0a0a0a",
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: mobile ? "0 16px" : "0 40px",
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <span
          style={{
            fontFamily: HEADING_FONT,
            fontSize: 34,
            letterSpacing: "0.18em",
            color: RED,
            fontWeight: 400,
            lineHeight: 1,
          }}
        >
          APEX
        </span>

        {/* Desktop links */}
        {!mobile && (
          <div style={{ display: "flex", gap: 36, alignItems: "center" }}>
            {links.map((l) => (
              <NavLink key={l} label={l} />
            ))}
          </div>
        )}

        {/* Mobile hamburger */}
        {mobile && (
          <button
            aria-label="Menu"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              background: "none",
              border: "none",
              color: TEXT,
              fontSize: 28,
              cursor: "pointer",
              padding: 4,
            }}
          >
            {menuOpen ? "\u2715" : "\u2630"}
          </button>
        )}
      </div>

      {/* Mobile dropdown */}
      {mobile && menuOpen && (
        <div
          style={{
            background: BG,
            borderTop: `1px solid #222`,
            padding: "12px 24px 20px",
          }}
        >
          {links.map((l) => (
            <a
              key={l}
              href="#"
              style={{
                display: "block",
                fontFamily: BODY_FONT,
                fontWeight: 600,
                fontSize: 16,
                color: TEXT_MUTED,
                textDecoration: "none",
                padding: "10px 0",
                borderBottom: "1px solid #1a1a1a",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
              }}
            >
              {l}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}

function NavLink({ label }: { label: string }) {
  const [hovered, setHovered] = useState(false);
  const isSale = label === "Sale";
  return (
    <a
      href="#"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontFamily: BODY_FONT,
        fontWeight: 600,
        fontSize: 13,
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        color: isSale ? RED : hovered ? TEXT : TEXT_MUTED,
        textDecoration: "none",
        transition: "color .2s",
        position: "relative",
      }}
    >
      {label}
      {hovered && (
        <span
          style={{
            position: "absolute",
            bottom: -4,
            left: 0,
            right: 0,
            height: 2,
            background: RED,
          }}
        />
      )}
    </a>
  );
}

/* ================================================================== */
/*  HERO                                                               */
/* ================================================================== */
function Hero({ mobile }: { mobile: boolean }) {
  return (
    <section
      style={{
        position: "relative",
        minHeight: "100vh",
        background: BG,
        display: "flex",
        alignItems: "center",
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
          opacity: 0.25,
          pointerEvents: "none",
        }}
      >
        <source src="https://videos.pexels.com/video-files/4761437/4761437-uhd_2560_1440_25fps.mp4" type="video/mp4" />
      </video>

      {/* Diagonal red stripe decoration */}
      <div
        style={{
          position: "absolute",
          top: "-20%",
          right: mobile ? "-40%" : "-10%",
          width: mobile ? "70%" : "45%",
          height: "160%",
          background: `linear-gradient(135deg, ${RED} 0%, ${RED_DARK} 100%)`,
          transform: "skewY(-12deg)",
          opacity: 0.08,
          pointerEvents: "none",
          zIndex: 1,
        }}
      />
      {/* Secondary thinner stripe */}
      <div
        style={{
          position: "absolute",
          top: "-10%",
          right: mobile ? "-60%" : "-5%",
          width: mobile ? "30%" : "18%",
          height: "140%",
          background: RED,
          transform: "skewY(-12deg)",
          opacity: 0.04,
          pointerEvents: "none",
          zIndex: 1,
        }}
      />
      {/* Subtle grid pattern overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.015) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: 1280,
          margin: "0 auto",
          padding: mobile ? "120px 20px 60px" : "0 40px",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 40,
        }}
      >
        {/* Left: text content */}
        <div style={{ flex: "1 1 0", minWidth: 0 }}>
          {/* Overline */}
          <div
            style={{
              fontFamily: BODY_FONT,
              fontWeight: 600,
              fontSize: 13,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: RED,
              marginBottom: 20,
            }}
          >
            New Season 2026
          </div>

          {/* Main headline */}
          <h1
            style={{
              fontFamily: HEADING_FONT,
              fontSize: mobile ? 64 : 110,
              lineHeight: 0.95,
              color: TEXT,
              margin: 0,
              letterSpacing: "0.03em",
              maxWidth: 800,
            }}
          >
            PUSH BEYOND
            <br />
            <span style={{ color: RED }}>LIMITS</span>
          </h1>

          {/* Red accent bar */}
          <div
            style={{
              width: 80,
              height: 4,
              background: RED,
              margin: "28px 0",
            }}
          />

          {/* Subtitle */}
          <p
            style={{
              fontFamily: BODY_FONT,
              fontSize: mobile ? 16 : 19,
              lineHeight: 1.7,
              color: TEXT_MUTED,
              maxWidth: 520,
              margin: "0 0 40px 0",
            }}
          >
            Engineered for athletes who demand more. Performance gear that moves
            with you, built to outlast every rep, every mile, every game.
          </p>

          {/* CTA */}
          <RedButton large>Shop New Arrivals</RedButton>

          {/* Stats row */}
          <div
            style={{
              display: "flex",
              gap: mobile ? 32 : 64,
              marginTop: 60,
              flexWrap: "wrap",
            }}
          >
            {[
              ["500+", "Athletes"],
              ["40+", "Sports"],
              ["12M", "Sold Worldwide"],
            ].map(([num, lbl]) => (
              <div key={lbl}>
                <div
                  style={{
                    fontFamily: HEADING_FONT,
                    fontSize: 36,
                    color: TEXT,
                    lineHeight: 1,
                  }}
                >
                  {num}
                </div>
                <div
                  style={{
                    fontFamily: BODY_FONT,
                    fontSize: 12,
                    color: TEXT_MUTED,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    marginTop: 4,
                  }}
                >
                  {lbl}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Basketball SVG illustration */}
        {!mobile && (
          <div style={{ flex: "0 0 auto", position: "relative" }}>
            <svg
              width="420"
              height="420"
              viewBox="0 0 420 420"
              fill="none"
              style={{ display: "block", filter: `drop-shadow(0 0 60px ${RED}30)` }}
            >
              {/* Ball body */}
              <circle cx="210" cy="210" r="195" fill="none" stroke={RED} strokeWidth="3" opacity="0.9" />
              <circle cx="210" cy="210" r="195" fill={`${RED}08`} />
              {/* Vertical seam */}
              <path d="M210 15 C180 100, 180 320, 210 405" stroke={RED} strokeWidth="2.5" fill="none" opacity="0.7" />
              <path d="M210 15 C240 100, 240 320, 210 405" stroke={RED} strokeWidth="2.5" fill="none" opacity="0.7" />
              {/* Horizontal seam */}
              <line x1="15" y1="210" x2="405" y2="210" stroke={RED} strokeWidth="2.5" opacity="0.7" />
              {/* Curved side seams */}
              <path d="M80 45 C140 140, 140 280, 80 375" stroke={RED} strokeWidth="2" fill="none" opacity="0.5" />
              <path d="M340 45 C280 140, 280 280, 340 375" stroke={RED} strokeWidth="2" fill="none" opacity="0.5" />
              {/* Inner highlight ring */}
              <circle cx="210" cy="210" r="140" fill="none" stroke={RED} strokeWidth="1" opacity="0.15" />
              {/* Specular highlights */}
              <ellipse cx="155" cy="130" rx="40" ry="25" fill="white" opacity="0.04" transform="rotate(-25 155 130)" />
              {/* Outer glow ring */}
              <circle cx="210" cy="210" r="205" fill="none" stroke={RED} strokeWidth="1" opacity="0.2" strokeDasharray="8 6" />
            </svg>
            {/* "APEX" text across the ball */}
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                fontFamily: HEADING_FONT,
                fontSize: 52,
                letterSpacing: "0.15em",
                color: RED,
                opacity: 0.25,
                pointerEvents: "none",
              }}
            >
              APEX
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

/* ================================================================== */
/*  CATEGORY STRIP                                                     */
/* ================================================================== */
const categories = [
  {
    name: "Running",
    gradient: "linear-gradient(180deg, rgba(220,38,38,.35) 0%, rgba(10,10,10,.95) 100%)",
    icon: "\u26A1",
    image: "https://images.unsplash.com/photo-1571008887538-b36bb32f4571?w=600&q=80&auto=format",
  },
  {
    name: "Training",
    gradient: "linear-gradient(180deg, rgba(153,27,27,.35) 0%, rgba(10,10,10,.95) 100%)",
    icon: "\uD83C\uDFCB",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&q=80&auto=format",
  },
  {
    name: "Basketball",
    gradient: "linear-gradient(180deg, rgba(239,68,68,.25) 0%, rgba(10,10,10,.95) 100%)",
    icon: "\uD83C\uDFC0",
    image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=600&q=80&auto=format",
  },
  {
    name: "Football",
    gradient: "linear-gradient(180deg, rgba(185,28,28,.3) 0%, rgba(10,10,10,.95) 100%)",
    icon: "\uD83C\uDFC8",
    image: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=600&q=80&auto=format",
  },
];

function CategoryCard({
  cat,
  mobile,
}: {
  cat: (typeof categories)[0];
  mobile: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        flex: mobile ? "1 1 45%" : "1 1 0",
        minHeight: mobile ? 220 : 380,
        backgroundImage: `${cat.gradient}, url(${cat.image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
        overflow: "hidden",
        cursor: "pointer",
        border: hovered ? `2px solid ${RED}` : "2px solid transparent",
        transition: "border .25s, transform .25s",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        padding: mobile ? 20 : 28,
      }}
    >
      {/* Big faded icon / letter */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontFamily: HEADING_FONT,
          fontSize: mobile ? 100 : 160,
          color: "rgba(255,255,255,.04)",
          pointerEvents: "none",
          lineHeight: 1,
        }}
      >
        {cat.name[0]}
      </div>

      <span
        style={{
          fontFamily: HEADING_FONT,
          fontSize: mobile ? 28 : 38,
          color: TEXT,
          letterSpacing: "0.06em",
          lineHeight: 1.1,
          position: "relative",
        }}
      >
        {cat.name}
      </span>
      <span
        style={{
          fontFamily: BODY_FONT,
          fontSize: 13,
          fontWeight: 600,
          color: hovered ? RED : TEXT_MUTED,
          textTransform: "uppercase",
          letterSpacing: "0.15em",
          marginTop: 8,
          transition: "color .2s",
          position: "relative",
        }}
      >
        Shop {"\u2192"}
      </span>
    </div>
  );
}

function CategoryStrip({ mobile }: { mobile: boolean }) {
  return (
    <section style={{ background: BG, padding: mobile ? "40px 16px" : "60px 40px" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div
          style={{
            fontFamily: BODY_FONT,
            fontSize: 12,
            fontWeight: 600,
            color: RED,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            marginBottom: 8,
          }}
        >
          Categories
        </div>
        <h2
          style={{
            fontFamily: HEADING_FONT,
            fontSize: mobile ? 32 : 48,
            color: TEXT,
            margin: "0 0 32px 0",
            letterSpacing: "0.04em",
          }}
        >
          FIND YOUR SPORT
        </h2>
        <div
          style={{
            display: "flex",
            gap: mobile ? 12 : 16,
            flexWrap: "wrap",
          }}
        >
          {categories.map((c) => (
            <CategoryCard key={c.name} cat={c} mobile={mobile} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  FEATURED COLLECTION                                                */
/* ================================================================== */
const products = [
  {
    name: "VELOCITY RUNNER X",
    type: "Shoe",
    price: "$185",
    gradient: "linear-gradient(135deg, #1a0505 0%, #3b0d0d 50%, #1a0505 100%)",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80&auto=format",
  },
  {
    name: "STORM SHIELD JACKET",
    type: "Jacket",
    price: "$220",
    gradient: "linear-gradient(135deg, #0d0d0d 0%, #2d0808 50%, #0d0d0d 100%)",
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&q=80&auto=format",
  },
  {
    name: "APEX PRO SHORTS",
    type: "Shorts",
    price: "$75",
    gradient: "linear-gradient(135deg, #150808 0%, #330e0e 50%, #150808 100%)",
    image: "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=400&q=80&auto=format",
  },
];

function ProductCard({
  product,
  mobile,
}: {
  product: (typeof products)[0];
  mobile: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        flex: mobile ? "1 1 100%" : "1 1 0",
        background: BG_CARD,
        overflow: "hidden",
        transition: "transform .3s",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        cursor: "pointer",
      }}
    >
      {/* Product image */}
      <div
        style={{
          width: "100%",
          aspectRatio: "4/3",
          background: product.gradient,
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
        {/* Decorative diagonal line */}
        <div
          style={{
            position: "absolute",
            width: "150%",
            height: 1,
            background: `linear-gradient(90deg, transparent, ${RED}33, transparent)`,
            transform: "rotate(-20deg)",
            top: "40%",
            pointerEvents: "none",
          }}
        />
      </div>

      {/* Info */}
      <div style={{ padding: mobile ? "20px 16px" : "24px 20px" }}>
        {/* Tag */}
        <span
          style={{
            fontFamily: BODY_FONT,
            fontSize: 11,
            fontWeight: 600,
            color: RED,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
          }}
        >
          {product.type}
        </span>

        <h3
          style={{
            fontFamily: HEADING_FONT,
            fontSize: 24,
            color: TEXT,
            margin: "8px 0 4px 0",
            letterSpacing: "0.04em",
          }}
        >
          {product.name}
        </h3>

        <div
          style={{
            fontFamily: BODY_FONT,
            fontSize: 18,
            fontWeight: 700,
            color: TEXT,
            margin: "12px 0 20px 0",
          }}
        >
          {product.price}
        </div>

        <RedButton style={{ width: "100%" }}>Add to Cart</RedButton>
      </div>
    </div>
  );
}

function FeaturedCollection({ mobile }: { mobile: boolean }) {
  return (
    <section
      style={{
        background: BG_SURFACE,
        padding: mobile ? "60px 16px" : "100px 40px",
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        {/* Section header */}
        <div
          style={{
            display: "flex",
            alignItems: mobile ? "flex-start" : "flex-end",
            justifyContent: "space-between",
            flexDirection: mobile ? "column" : "row",
            gap: 16,
            marginBottom: mobile ? 32 : 48,
          }}
        >
          <div>
            <div
              style={{
                fontFamily: BODY_FONT,
                fontSize: 12,
                fontWeight: 600,
                color: RED,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                marginBottom: 8,
              }}
            >
              Featured
            </div>
            <h2
              style={{
                fontFamily: HEADING_FONT,
                fontSize: mobile ? 36 : 56,
                color: TEXT,
                margin: 0,
                letterSpacing: "0.04em",
              }}
            >
              VELOCITY COLLECTION
            </h2>
          </div>
          <a
            href="#"
            style={{
              fontFamily: BODY_FONT,
              fontSize: 13,
              fontWeight: 600,
              color: TEXT_MUTED,
              textDecoration: "none",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              borderBottom: `1px solid ${TEXT_MUTED}`,
              paddingBottom: 2,
            }}
          >
            View All {"\u2192"}
          </a>
        </div>

        {/* Product grid */}
        <div
          style={{
            display: "flex",
            gap: mobile ? 16 : 24,
            flexWrap: "wrap",
          }}
        >
          {products.map((p) => (
            <ProductCard key={p.name} product={p} mobile={mobile} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  ATHLETE SPOTLIGHT                                                  */
/* ================================================================== */
function AthleteSpotlight({ mobile }: { mobile: boolean }) {
  return (
    <section
      style={{
        background: BG,
        padding: mobile ? "60px 16px" : "100px 40px",
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div
          style={{
            fontFamily: BODY_FONT,
            fontSize: 12,
            fontWeight: 600,
            color: RED,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            marginBottom: 8,
          }}
        >
          Athlete Spotlight
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: mobile ? "column" : "row",
            gap: mobile ? 32 : 64,
            marginTop: 32,
            alignItems: mobile ? "stretch" : "center",
          }}
        >
          {/* Athlete image */}
          <div
            style={{
              flex: mobile ? "none" : "1 1 50%",
              aspectRatio: mobile ? "16/10" : "4/5",
              background: `linear-gradient(135deg, #0d0d0d 0%, #1a0808 50%, #0d0d0d 100%)`,
              border: `2px solid ${RED}`,
              position: "relative",
              overflow: "hidden",
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=800&q=80&auto=format"
              alt="Marcus Johnson — Athlete Spotlight"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
            {/* Corner accent */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: 40,
                height: 40,
                borderTop: `3px solid ${RED}`,
                borderLeft: `3px solid ${RED}`,
                pointerEvents: "none",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: 0,
                right: 0,
                width: 40,
                height: 40,
                borderBottom: `3px solid ${RED}`,
                borderRight: `3px solid ${RED}`,
                pointerEvents: "none",
              }}
            />
          </div>

          {/* Athlete info */}
          <div style={{ flex: mobile ? "none" : "1 1 50%" }}>
            <h3
              style={{
                fontFamily: HEADING_FONT,
                fontSize: mobile ? 48 : 72,
                color: TEXT,
                margin: 0,
                lineHeight: 0.95,
                letterSpacing: "0.03em",
              }}
            >
              MARCUS
              <br />
              <span style={{ color: RED }}>JOHNSON</span>
            </h3>

            <div
              style={{
                fontFamily: BODY_FONT,
                fontSize: 13,
                fontWeight: 600,
                color: RED,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                margin: "16px 0 0 0",
              }}
            >
              Track &amp; Field &mdash; Sprinter
            </div>

            {/* Red accent bar */}
            <div
              style={{
                width: 50,
                height: 3,
                background: RED,
                margin: "24px 0",
              }}
            />

            <blockquote
              style={{
                fontFamily: BODY_FONT,
                fontSize: mobile ? 17 : 20,
                fontStyle: "italic",
                color: TEXT_MUTED,
                lineHeight: 1.7,
                margin: 0,
                padding: 0,
                borderLeft: `3px solid ${RED}33`,
                paddingLeft: 20,
              }}
            >
              &ldquo;Every fraction of a second matters. Apex gear gives me the
              edge I need when it counts the most. It&rsquo;s not just
              clothing&mdash;it&rsquo;s my competitive advantage.&rdquo;
            </blockquote>

            {/* Stats */}
            <div
              style={{
                display: "flex",
                gap: 40,
                margin: "32px 0 36px 0",
                flexWrap: "wrap",
              }}
            >
              {[
                ["9.87s", "100m PR"],
                ["3x", "World Champ"],
                ["Olympic", "Gold"],
              ].map(([val, lbl]) => (
                <div key={lbl}>
                  <div
                    style={{
                      fontFamily: HEADING_FONT,
                      fontSize: 28,
                      color: TEXT,
                      lineHeight: 1,
                    }}
                  >
                    {val}
                  </div>
                  <div
                    style={{
                      fontFamily: BODY_FONT,
                      fontSize: 11,
                      color: TEXT_MUTED,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      marginTop: 4,
                    }}
                  >
                    {lbl}
                  </div>
                </div>
              ))}
            </div>

            <a
              href="#"
              style={{
                fontFamily: BODY_FONT,
                fontWeight: 700,
                fontSize: 14,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: RED,
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                borderBottom: `2px solid ${RED}`,
                paddingBottom: 4,
              }}
            >
              View Story {"\u2192"}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  FOOTER                                                             */
/* ================================================================== */
function Footer({ mobile }: { mobile: boolean }) {
  const [email, setEmail] = useState("");
  const cols = [
    { title: "Shop", links: ["Men", "Women", "Kids", "New Arrivals", "Sale"] },
    {
      title: "Sports",
      links: ["Running", "Training", "Basketball", "Football", "Tennis"],
    },
    { title: "Company", links: ["About", "Athletes", "Careers", "Press", "Sustainability"] },
    { title: "Support", links: ["Help Center", "Shipping", "Returns", "Size Guide", "Contact"] },
  ];

  return (
    <footer
      style={{
        background: "#060606",
        borderTop: `3px solid ${RED}`,
        padding: mobile ? "48px 16px 24px" : "80px 40px 32px",
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div
          style={{
            display: mobile ? "grid" : "flex",
            gridTemplateColumns: mobile ? "1fr" : undefined,
            flexDirection: mobile ? undefined : "row",
            gap: mobile ? 32 : 48,
            marginBottom: mobile ? 32 : 64,
          }}
        >
          {/* Brand + newsletter */}
          <div style={{ flex: mobile ? "none" : "1.5 1 0" }}>
            <span
              style={{
                fontFamily: HEADING_FONT,
                fontSize: 40,
                color: RED,
                letterSpacing: "0.18em",
                display: "block",
                marginBottom: 16,
              }}
            >
              APEX
            </span>
            <p
              style={{
                fontFamily: BODY_FONT,
                fontSize: 14,
                color: TEXT_MUTED,
                lineHeight: 1.6,
                maxWidth: 320,
                margin: "0 0 24px 0",
              }}
            >
              Performance sportswear engineered for athletes who never settle.
              Push beyond limits.
            </p>

            {/* Newsletter */}
            <div
              style={{
                fontFamily: BODY_FONT,
                fontSize: 12,
                fontWeight: 600,
                color: TEXT,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginBottom: 12,
              }}
            >
              Join the team
            </div>
            <div style={{ display: "flex", maxWidth: 360, flexDirection: mobile ? "column" : "row" }}>
              <input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  flex: 1,
                  fontFamily: BODY_FONT,
                  fontSize: 14,
                  padding: "12px 16px",
                  background: "#111",
                  border: `1px solid #222`,
                  borderRight: mobile ? `1px solid #222` : "none",
                  color: TEXT,
                  outline: "none",
                }}
              />
              <button
                style={{
                  fontFamily: BODY_FONT,
                  fontWeight: 700,
                  fontSize: 12,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: TEXT,
                  background: RED,
                  border: "none",
                  padding: "12px 20px",
                  cursor: "pointer",
                  marginTop: mobile ? 8 : 0,
                }}
              >
                Subscribe
              </button>
            </div>
          </div>

          {/* Link columns */}
          {cols.map((col) => (
            <div key={col.title} style={{ flex: mobile ? "none" : "1 1 0" }}>
              <div
                style={{
                  fontFamily: BODY_FONT,
                  fontSize: 12,
                  fontWeight: 700,
                  color: TEXT,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  marginBottom: 16,
                }}
              >
                {col.title}
              </div>
              {col.links.map((link) => (
                <a
                  key={link}
                  href="#"
                  style={{
                    display: "block",
                    fontFamily: BODY_FONT,
                    fontSize: 13,
                    color: TEXT_MUTED,
                    textDecoration: "none",
                    padding: "5px 0",
                    transition: "color .2s",
                  }}
                  onMouseEnter={(e) =>
                    ((e.target as HTMLElement).style.color = TEXT)
                  }
                  onMouseLeave={(e) =>
                    ((e.target as HTMLElement).style.color = TEXT_MUTED)
                  }
                >
                  {link}
                </a>
              ))}
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: "1px solid #1a1a1a",
            paddingTop: 24,
            display: "flex",
            flexDirection: mobile ? "column" : "row",
            justifyContent: "space-between",
            alignItems: mobile ? "flex-start" : "center",
            gap: 12,
          }}
        >
          <div
            style={{
              fontFamily: BODY_FONT,
              fontSize: 12,
              color: "#555",
            }}
          >
            &copy; 2026 Apex Athletics. All rights reserved.
          </div>
          <div
            style={{
              display: "flex",
              gap: 24,
            }}
          >
            {["Privacy", "Terms", "Cookies"].map((t) => (
              <a
                key={t}
                href="#"
                style={{
                  fontFamily: BODY_FONT,
                  fontSize: 12,
                  color: "#555",
                  textDecoration: "none",
                }}
              >
                {t}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ================================================================== */
/*  APP (main export)                                                  */
/* ================================================================== */
export function App() {
  const mobile = useIsMobile();

  return (
    <div style={{ background: BG, color: TEXT, fontFamily: BODY_FONT }}>
      {/* Global resets */}
      <style>{`
        *, *::before, *::after {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        html {
          scroll-behavior: smooth;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        a { color: inherit; }
        button { cursor: pointer; }
        ::selection {
          background: ${RED};
          color: ${TEXT};
        }
        input::placeholder {
          color: #555;
        }
      `}</style>

      <Nav mobile={mobile} />
      <Hero mobile={mobile} />
      <CategoryStrip mobile={mobile} />
      <FeaturedCollection mobile={mobile} />
      <AthleteSpotlight mobile={mobile} />
      <Footer mobile={mobile} />
    </div>
  );
}
