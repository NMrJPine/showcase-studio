import React, { useState, useEffect } from "react";

/* ------------------------------------------------------------------ */
/*  Aura Skincare — premium minimalist beauty brand showcase          */
/* ------------------------------------------------------------------ */

const ROSE = "#e11d48";
const ROSE_LIGHT = "#fff1f2";
const ROSE_HOVER = "#be123c";
const BG = "#fff9f7";
const TEXT = "#1f1f1f";
const TEXT_MUTED = "#6b6b6b";
const BORDER = "#f3e8e8";
const WHITE = "#ffffff";

const SERIF = "'Cormorant Garamond', 'Georgia', serif";
const SANS = "'Inter', 'Helvetica Neue', Arial, sans-serif";

/* ---- responsive hook --------------------------------------------- */
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

/* ---- data -------------------------------------------------------- */
const NAV_LINKS = ["Products", "Rituals", "Ingredients", "About"];

const PRODUCTS = [
  {
    name: "Petal Glow Serum",
    desc: "Lightweight vitamin C serum that brightens and evens skin tone overnight.",
    price: "$68",
    color: "#fce4ec",
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&q=80&auto=format",
  },
  {
    name: "Rose Dew Moisturizer",
    desc: "Deep hydration with hyaluronic acid and damask rose water.",
    price: "$54",
    color: "#fde7ef",
    image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&q=80&auto=format",
  },
  {
    name: "Velvet Cleansing Balm",
    desc: "Melts away impurities while nourishing with jojoba and squalane.",
    price: "$42",
    color: "#fbe9e7",
    image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400&q=80&auto=format",
  },
];

const INGREDIENTS = [
  {
    name: "Hyaluronic Acid",
    desc: "Holds 1000x its weight in water for deep, lasting hydration.",
    img: "https://plus.unsplash.com/premium_photo-1733306459429-072d73ef6e93?q=80&w=300&auto=format&fit=crop",
    accent: "#3b82f6",
    bg: "rgba(59, 130, 246, 0.12)",
  },
  {
    name: "Vitamin C",
    desc: "Powerful antioxidant that brightens and protects against free radicals.",
    img: "https://images.unsplash.com/photo-1582979512210-99b6a53386f9?w=300&q=80&auto=format&fit=crop",
    accent: "#f59e0b",
    bg: "rgba(245, 158, 11, 0.12)",
  },
  {
    name: "Niacinamide",
    desc: "Minimizes pores, balances oil, and strengthens the skin barrier.",
    img: "https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?w=300&q=80&auto=format&fit=crop",
    accent: "#a855f7",
    bg: "rgba(168, 85, 247, 0.12)",
  },
  {
    name: "Squalane",
    desc: "Plant-derived emollient that locks in moisture without clogging pores.",
    img: "https://images.unsplash.com/photo-1515543904379-3d757afe72e4?w=300&q=80&auto=format&fit=crop",
    accent: "#10b981",
    bg: "rgba(16, 185, 129, 0.12)",
  },
];

/* ================================================================== */
/*  Component                                                         */
/* ================================================================== */
export function App() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const isTablet = useMediaQuery("(max-width: 1024px)");
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const [hoveredBtn, setHoveredBtn] = useState<string | null>(null);
  const [testimonialIdx, setTestimonialIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTestimonialIdx((p) => (p + 1) % 3);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const testimonials = [
    {
      quote:
        "After just two weeks with the Petal Glow Serum, my skin feels like it has been reborn. The texture, the glow \u2014 everything changed. I have never felt more confident without makeup.",
      name: "Eloise Marchetti",
      role: "Verified Customer",
      img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80&auto=format&fit=crop",
    },
    {
      quote:
        "The Rose Hydra Mist is my holy grail. It calms my skin instantly and the scent is absolutely divine. I carry it everywhere now.",
      name: "Sofia Andersen",
      role: "Verified Customer",
      img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80&auto=format&fit=crop",
    },
    {
      quote:
        "I was skeptical at first, but the overnight repair cream truly transformed my complexion. My dark spots faded within a month. Aura has a customer for life.",
      name: "Maya Chen",
      role: "Verified Customer",
      img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80&auto=format&fit=crop",
    },
  ];

  return (
    <>
      {/* ---------- CSS Reset ---------- */}
      <style>{`
        *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
        a { text-decoration: none; color: inherit; }
        button { cursor: pointer; border: none; background: none; font-family: inherit; }
        input { font-family: inherit; }
        img { max-width: 100%; display: block; }
        ::selection { background: ${ROSE_LIGHT}; color: ${ROSE}; }
      `}</style>

      <div style={{ minHeight: "100vh", background: BG }}>
        {/* ========== NAVIGATION ========== */}
        <nav
          style={{
            position: "relative",
            background: WHITE,
            borderBottom: `1px solid ${BORDER}`,
            padding: isMobile ? "16px 20px" : "18px 48px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              fontFamily: SERIF,
              fontSize: isMobile ? "24px" : "28px",
              fontWeight: 600,
              color: ROSE,
              letterSpacing: "0.35em",
              userSelect: "none",
            }}
          >
            AURA
          </div>

          {!isMobile && (
            <div style={{ display: "flex", gap: "36px", alignItems: "center" }}>
              {NAV_LINKS.map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  onMouseEnter={() => setHoveredNav(link)}
                  onMouseLeave={() => setHoveredNav(null)}
                  style={{
                    fontFamily: SANS,
                    fontSize: "13px",
                    fontWeight: 400,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: hoveredNav === link ? ROSE : TEXT_MUTED,
                    transition: "color 0.3s ease",
                    position: "relative",
                  }}
                >
                  {link}
                </a>
              ))}
            </div>
          )}
        </nav>

        {/* ========== HERO ========== */}
        <section
          id="hero"
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: isMobile ? "120px 24px 80px" : "140px 48px 100px",
            background: `linear-gradient(180deg, ${BG} 0%, #fff4f2 40%, ${BG} 100%)`,
            position: "relative",
            backgroundImage: "linear-gradient(rgba(255,249,247,0.75), rgba(255,249,247,0.85)), url(https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=1600&q=80&auto=format)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* decorative soft circle */}
          <div
            style={{
              position: "absolute",
              width: isMobile ? "300px" : "520px",
              height: isMobile ? "300px" : "520px",
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(225,29,72,0.04) 0%, transparent 70%)",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              pointerEvents: "none",
            }}
          />

          <p
            style={{
              fontFamily: SANS,
              fontSize: "12px",
              fontWeight: 500,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: ROSE,
              marginBottom: "24px",
            }}
          >
            Clean Beauty, Elevated
          </p>

          <h1
            style={{
              fontFamily: SERIF,
              fontSize: isMobile ? "42px" : isTablet ? "56px" : "72px",
              fontWeight: 500,
              lineHeight: 1.1,
              color: TEXT,
              maxWidth: "780px",
              marginBottom: "28px",
            }}
          >
            Reveal Your
            <br />
            Natural Radiance
          </h1>

          {/* thin line divider */}
          <div
            style={{
              width: "60px",
              height: "1px",
              background: ROSE,
              marginBottom: "28px",
              opacity: 0.5,
            }}
          />

          <p
            style={{
              fontFamily: SANS,
              fontSize: isMobile ? "15px" : "17px",
              fontWeight: 300,
              color: TEXT_MUTED,
              maxWidth: "520px",
              lineHeight: 1.7,
              marginBottom: "44px",
            }}
          >
            Thoughtfully crafted formulas with pure, potent botanicals.
            <br />
            Skincare that honors your skin and the earth.
          </p>

          <div
            style={{
              display: "flex",
              gap: "16px",
              flexDirection: isMobile ? "column" : "row",
              alignItems: "center",
            }}
          >
            {/* Shop Now button */}
            <button
              onMouseEnter={() => setHoveredBtn("shop")}
              onMouseLeave={() => setHoveredBtn(null)}
              style={{
                fontFamily: SANS,
                fontSize: "13px",
                fontWeight: 500,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: WHITE,
                background: hoveredBtn === "shop" ? ROSE_HOVER : ROSE,
                padding: "16px 44px",
                borderRadius: "2px",
                transition: "all 0.3s ease",
                transform: hoveredBtn === "shop" ? "translateY(-1px)" : "none",
                boxShadow:
                  hoveredBtn === "shop"
                    ? "0 4px 16px rgba(225,29,72,0.25)"
                    : "none",
              }}
            >
              Shop Now
            </button>

            {/* Our Story button */}
            <button
              onMouseEnter={() => setHoveredBtn("story")}
              onMouseLeave={() => setHoveredBtn(null)}
              style={{
                fontFamily: SANS,
                fontSize: "13px",
                fontWeight: 500,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: hoveredBtn === "story" ? ROSE : TEXT,
                border: `1px solid ${hoveredBtn === "story" ? ROSE : BORDER}`,
                padding: "16px 44px",
                borderRadius: "2px",
                transition: "all 0.3s ease",
                background: "transparent",
              }}
            >
              Our Story
            </button>
          </div>
        </section>

        {/* ========== PRODUCTS ========== */}
        <section
          id="products"
          style={{
            padding: isMobile ? "80px 24px" : "120px 48px",
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: "64px" }}>
            <p
              style={{
                fontFamily: SANS,
                fontSize: "12px",
                fontWeight: 500,
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: ROSE,
                marginBottom: "16px",
              }}
            >
              The Collection
            </p>
            <h2
              style={{
                fontFamily: SERIF,
                fontSize: isMobile ? "32px" : "44px",
                fontWeight: 500,
                color: TEXT,
                marginBottom: "12px",
              }}
            >
              Curated Essentials
            </h2>
            <div
              style={{
                width: "40px",
                height: "1px",
                background: ROSE,
                margin: "0 auto",
                opacity: 0.4,
              }}
            />
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile
                ? "1fr"
                : isTablet
                  ? "1fr 1fr"
                  : "1fr 1fr 1fr",
              gap: "32px",
            }}
          >
            {PRODUCTS.map((product, i) => (
              <div
                key={product.name}
                onMouseEnter={() => setHoveredProduct(i)}
                onMouseLeave={() => setHoveredProduct(null)}
                style={{
                  background: WHITE,
                  borderRadius: "4px",
                  padding: "40px 32px 36px",
                  textAlign: "center",
                  transition: "all 0.4s ease",
                  transform:
                    hoveredProduct === i ? "translateY(-6px)" : "none",
                  boxShadow:
                    hoveredProduct === i
                      ? "0 20px 50px rgba(0,0,0,0.08)"
                      : "0 2px 16px rgba(0,0,0,0.04)",
                  border: `1px solid ${BORDER}`,
                }}
              >
                {/* product image */}
                <div
                  style={{
                    width: "140px",
                    height: "140px",
                    borderRadius: "50%",
                    background: `radial-gradient(circle at 35% 35%, ${product.color}, ${product.color}dd)`,
                    margin: "0 auto 28px",
                    overflow: "hidden",
                    transition: "transform 0.4s ease",
                    transform:
                      hoveredProduct === i ? "scale(1.05)" : "scale(1)",
                    boxShadow: `0 8px 24px ${product.color}66`,
                  }}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{
                      borderRadius: "50%",
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                </div>

                <h3
                  style={{
                    fontFamily: SERIF,
                    fontSize: "22px",
                    fontWeight: 600,
                    color: TEXT,
                    marginBottom: "10px",
                  }}
                >
                  {product.name}
                </h3>
                <p
                  style={{
                    fontFamily: SANS,
                    fontSize: "14px",
                    fontWeight: 300,
                    color: TEXT_MUTED,
                    lineHeight: 1.65,
                    marginBottom: "18px",
                    minHeight: "46px",
                  }}
                >
                  {product.desc}
                </p>
                <p
                  style={{
                    fontFamily: SERIF,
                    fontSize: "24px",
                    fontWeight: 500,
                    color: TEXT,
                    marginBottom: "24px",
                  }}
                >
                  {product.price}
                </p>
                <button
                  onMouseEnter={() => setHoveredBtn(`add-${i}`)}
                  onMouseLeave={() => setHoveredBtn(null)}
                  style={{
                    fontFamily: SANS,
                    fontSize: "11px",
                    fontWeight: 500,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: hoveredBtn === `add-${i}` ? WHITE : ROSE,
                    background:
                      hoveredBtn === `add-${i}` ? ROSE : "transparent",
                    border: `1px solid ${ROSE}`,
                    padding: "12px 32px",
                    borderRadius: "2px",
                    transition: "all 0.3s ease",
                    width: "100%",
                  }}
                >
                  Add to Ritual
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* ========== INGREDIENTS ========== */}
        <section
          id="ingredients"
          style={{
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* background image - parallax */}
          <div
            style={{
              position: "absolute",
              top: isMobile ? 0 : "-20%",
              left: 0,
              width: "100%",
              height: isMobile ? "100%" : "140%",
              backgroundImage:
                "url('https://images.unsplash.com/photo-1579154204601-01588f351e67?w=1600&q=80&auto=format')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundAttachment: isMobile ? "scroll" : "fixed",
              zIndex: 0,
            }}
          />
          {/* overlay */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: "linear-gradient(rgba(5, 15, 25, 0.6), rgba(5, 15, 25, 0.65))",
              zIndex: 1,
            }}
          />

          {/* content */}
          <div
            style={{
              position: "relative",
              zIndex: 2,
              padding: isMobile ? "80px 24px" : "120px 48px",
            }}
          >
            <div
              style={{
                maxWidth: "1200px",
                margin: "0 auto",
              }}
            >
              <div style={{ textAlign: "center", marginBottom: "64px" }}>
                <p
                  style={{
                    fontFamily: SANS,
                    fontSize: "12px",
                    fontWeight: 500,
                    letterSpacing: "0.3em",
                    textTransform: "uppercase",
                    color: ROSE,
                    marginBottom: "16px",
                  }}
                >
                  What We Use
                </p>
                <h2
                  style={{
                    fontFamily: SERIF,
                    fontSize: isMobile ? "30px" : "44px",
                    fontWeight: 500,
                    color: WHITE,
                    marginBottom: "12px",
                  }}
                >
                  Pure Ingredients, Proven Results
                </h2>
                <div
                  style={{
                    width: "40px",
                    height: "1px",
                    background: ROSE,
                    margin: "0 auto",
                    opacity: 0.6,
                  }}
                />
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: isMobile
                    ? "1fr"
                    : isTablet
                      ? "1fr 1fr"
                      : "1fr 1fr 1fr 1fr",
                  gap: isMobile ? "20px" : "32px",
                }}
              >
                {INGREDIENTS.map((ing) => (
                  <div
                    key={ing.name}
                    style={{
                      textAlign: "center",
                      padding: "32px 20px",
                      borderRadius: "16px",
                      background: "rgba(255, 255, 255, 0.85)",
                      backdropFilter: "blur(12px)",
                      border: "1px solid rgba(255, 255, 255, 0.6)",
                      boxShadow: "0 12px 40px rgba(0, 0, 0, 0.2), 0 4px 12px rgba(0, 0, 0, 0.1)",
                      transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    }}
                  >
                    {/* colored top bar */}
                    <div
                      style={{
                        width: "40px",
                        height: "3px",
                        borderRadius: "2px",
                        background: ing.accent,
                        margin: "0 auto 24px",
                      }}
                    />

                    {/* ingredient image */}
                    <img
                      src={ing.img}
                      alt={ing.name}
                      style={{
                        width: "72px",
                        height: "72px",
                        borderRadius: "50%",
                        objectFit: "cover",
                        margin: "0 auto 20px",
                        display: "block",
                        border: `2px solid ${ing.accent}30`,
                      }}
                    />

                    <h3
                      style={{
                        fontFamily: SERIF,
                        fontSize: "20px",
                        fontWeight: 600,
                        color: TEXT,
                        marginBottom: "8px",
                      }}
                    >
                      {ing.name}
                    </h3>
                    <p
                      style={{
                        fontFamily: SANS,
                        fontSize: "13px",
                        fontWeight: 300,
                        color: TEXT_MUTED,
                        lineHeight: 1.65,
                      }}
                    >
                      {ing.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ========== TESTIMONIALS CAROUSEL ========== */}
        <section
          style={{
            padding: isMobile ? "80px 24px" : "100px 48px",
            background: BG,
          }}
        >
          <div style={{ maxWidth: "800px", margin: "0 auto" }}>
            {/* heading */}
            <p
              style={{
                fontFamily: SANS,
                fontSize: "12px",
                fontWeight: 500,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: ROSE,
                textAlign: "center",
                marginBottom: "48px",
              }}
            >
              What Our Customers Say
            </p>

            {/* card */}
            <div
              style={{
                display: "flex",
                flexDirection: isMobile ? "column" : "row",
                alignItems: "center",
                gap: isMobile ? "24px" : "40px",
              }}
            >
              {/* portrait */}
              <img
                src={testimonials[testimonialIdx].img}
                alt={testimonials[testimonialIdx].name}
                style={{
                  width: isMobile ? "120px" : "140px",
                  height: isMobile ? "120px" : "140px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  flexShrink: 0,
                  border: `2px solid ${ROSE}`,
                }}
              />

              {/* text */}
              <div style={{ textAlign: isMobile ? "center" : "left" }}>
                <blockquote
                  style={{
                    fontFamily: SERIF,
                    fontSize: isMobile ? "18px" : "22px",
                    fontWeight: 400,
                    fontStyle: "italic",
                    color: TEXT,
                    lineHeight: 1.6,
                    marginBottom: "20px",
                  }}
                >
                  &ldquo;{testimonials[testimonialIdx].quote}&rdquo;
                </blockquote>

                <p
                  style={{
                    fontFamily: SANS,
                    fontSize: "13px",
                    fontWeight: 500,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: ROSE,
                    marginBottom: "2px",
                  }}
                >
                  {testimonials[testimonialIdx].name}
                </p>
                <p
                  style={{
                    fontFamily: SANS,
                    fontSize: "12px",
                    fontWeight: 300,
                    color: TEXT_MUTED,
                  }}
                >
                  {testimonials[testimonialIdx].role}
                </p>
              </div>
            </div>

            {/* navigation dots + arrows */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "16px",
                marginTop: "40px",
              }}
            >
              {/* prev arrow */}
              <button
                onClick={() =>
                  setTestimonialIdx((p) =>
                    p === 0 ? testimonials.length - 1 : p - 1,
                  )
                }
                style={{
                  background: "none",
                  border: `1px solid ${BORDER}`,
                  borderRadius: "50%",
                  width: "36px",
                  height: "36px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  color: TEXT,
                  fontSize: "16px",
                }}
              >
                &#8592;
              </button>

              {/* dots */}
              <div style={{ display: "flex", gap: "8px" }}>
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setTestimonialIdx(i)}
                    style={{
                      width: testimonialIdx === i ? "24px" : "8px",
                      height: "8px",
                      borderRadius: "4px",
                      border: "none",
                      background:
                        testimonialIdx === i ? ROSE : `${ROSE}33`,
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      padding: 0,
                    }}
                  />
                ))}
              </div>

              {/* next arrow */}
              <button
                onClick={() =>
                  setTestimonialIdx((p) =>
                    p === testimonials.length - 1 ? 0 : p + 1,
                  )
                }
                style={{
                  background: "none",
                  border: `1px solid ${BORDER}`,
                  borderRadius: "50%",
                  width: "36px",
                  height: "36px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  color: TEXT,
                  fontSize: "16px",
                }}
              >
                &#8594;
              </button>
            </div>
          </div>
        </section>

        {/* ========== NEWSLETTER BAND ========== */}
        <section
          style={{
            padding: isMobile ? "60px 24px" : "80px 48px",
            background: ROSE_LIGHT,
            textAlign: "center",
          }}
        >
          <div style={{ maxWidth: "560px", margin: "0 auto" }}>
            <h3
              style={{
                fontFamily: SERIF,
                fontSize: isMobile ? "26px" : "32px",
                fontWeight: 500,
                color: TEXT,
                marginBottom: "10px",
              }}
            >
              Join the Aura Circle
            </h3>
            <p
              style={{
                fontFamily: SANS,
                fontSize: "14px",
                fontWeight: 300,
                color: TEXT_MUTED,
                marginBottom: "28px",
              }}
            >
              Receive exclusive rituals, early access to new formulas, and 10%
              off your first order.
            </p>
            <div
              style={{
                display: "flex",
                gap: "0",
                maxWidth: "440px",
                margin: "0 auto",
                flexDirection: isMobile ? "column" : "row",
              }}
            >
              <input
                type="email"
                placeholder="Your email address"
                style={{
                  fontFamily: SANS,
                  fontSize: "14px",
                  fontWeight: 300,
                  color: TEXT,
                  background: WHITE,
                  border: `1px solid ${BORDER}`,
                  borderRight: isMobile ? `1px solid ${BORDER}` : "none",
                  borderRadius: isMobile ? "2px" : "2px 0 0 2px",
                  padding: "14px 20px",
                  flex: 1,
                  outline: "none",
                  marginBottom: isMobile ? "8px" : "0",
                }}
              />
              <button
                onMouseEnter={() => setHoveredBtn("newsletter")}
                onMouseLeave={() => setHoveredBtn(null)}
                style={{
                  fontFamily: SANS,
                  fontSize: "12px",
                  fontWeight: 500,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: WHITE,
                  background:
                    hoveredBtn === "newsletter" ? ROSE_HOVER : ROSE,
                  padding: "14px 28px",
                  borderRadius: isMobile ? "2px" : "0 2px 2px 0",
                  transition: "background 0.3s ease",
                  whiteSpace: "nowrap",
                }}
              >
                Subscribe
              </button>
            </div>
          </div>
        </section>

        {/* ========== FOOTER ========== */}
        <footer
          style={{
            background: WHITE,
            borderTop: `1px solid ${BORDER}`,
            padding: isMobile ? "48px 24px 32px" : "64px 48px 40px",
          }}
        >
          <div
            style={{
              maxWidth: "1200px",
              margin: "0 auto",
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr 1fr 1fr",
              gap: isMobile ? "36px" : "48px",
              marginBottom: "48px",
            }}
          >
            {/* brand */}
            <div>
              <div
                style={{
                  fontFamily: SERIF,
                  fontSize: "24px",
                  fontWeight: 600,
                  color: ROSE,
                  letterSpacing: "0.35em",
                  marginBottom: "14px",
                }}
              >
                AURA
              </div>
              <p
                style={{
                  fontFamily: SANS,
                  fontSize: "13px",
                  fontWeight: 300,
                  color: TEXT_MUTED,
                  lineHeight: 1.7,
                }}
              >
                Clean beauty formulas crafted with intention. Cruelty-free,
                sustainable, and effective.
              </p>
            </div>

            {/* shop */}
            <div>
              <h4
                style={{
                  fontFamily: SANS,
                  fontSize: "11px",
                  fontWeight: 600,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: TEXT,
                  marginBottom: "18px",
                }}
              >
                Shop
              </h4>
              {["Serums", "Moisturizers", "Cleansers", "Sets"].map((item) => (
                <a
                  key={item}
                  href="#"
                  style={{
                    display: "block",
                    fontFamily: SANS,
                    fontSize: "13px",
                    fontWeight: 300,
                    color: TEXT_MUTED,
                    marginBottom: "10px",
                    transition: "color 0.2s ease",
                  }}
                >
                  {item}
                </a>
              ))}
            </div>

            {/* company */}
            <div>
              <h4
                style={{
                  fontFamily: SANS,
                  fontSize: "11px",
                  fontWeight: 600,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: TEXT,
                  marginBottom: "18px",
                }}
              >
                Company
              </h4>
              {["Our Story", "Ingredients", "Sustainability", "Press"].map(
                (item) => (
                  <a
                    key={item}
                    href="#"
                    style={{
                      display: "block",
                      fontFamily: SANS,
                      fontSize: "13px",
                      fontWeight: 300,
                      color: TEXT_MUTED,
                      marginBottom: "10px",
                    }}
                  >
                    {item}
                  </a>
                ),
              )}
            </div>

            {/* help */}
            <div>
              <h4
                style={{
                  fontFamily: SANS,
                  fontSize: "11px",
                  fontWeight: 600,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: TEXT,
                  marginBottom: "18px",
                }}
              >
                Help
              </h4>
              {["FAQ", "Shipping", "Returns", "Contact"].map((item) => (
                <a
                  key={item}
                  href="#"
                  style={{
                    display: "block",
                    fontFamily: SANS,
                    fontSize: "13px",
                    fontWeight: 300,
                    color: TEXT_MUTED,
                    marginBottom: "10px",
                  }}
                >
                  {item}
                </a>
              ))}
            </div>
          </div>

          {/* bottom bar */}
          <div
            style={{
              borderTop: `1px solid ${BORDER}`,
              paddingTop: "24px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: isMobile ? "column" : "row",
              gap: "12px",
            }}
          >
            <p
              style={{
                fontFamily: SANS,
                fontSize: "12px",
                fontWeight: 300,
                color: TEXT_MUTED,
              }}
            >
              &copy; 2026 Aura Skincare. All rights reserved.
            </p>
            <div style={{ display: "flex", gap: "24px" }}>
              {["Privacy", "Terms", "Cookies"].map((item) => (
                <a
                  key={item}
                  href="#"
                  style={{
                    fontFamily: SANS,
                    fontSize: "12px",
                    fontWeight: 300,
                    color: TEXT_MUTED,
                  }}
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
