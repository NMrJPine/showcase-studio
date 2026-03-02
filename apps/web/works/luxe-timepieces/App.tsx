import React, { useState, useEffect, useRef, CSSProperties } from "react";

/* ------------------------------------------------------------------ */
/*  Luxe Timepieces -- Premium Showcase Homepage                       */
/* ------------------------------------------------------------------ */

const GOLD = "#d4a017";
const GOLD_LIGHT = "#e8c55a";
const BG = "#0a0a0a";
const CARD = "#111111";
const TEXT = "#e0e0e0";
const TEXT_MUTED = "#999999";
const SERIF = "'Playfair Display', Georgia, 'Times New Roman', serif";
const SANS = "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";

/* ---------- tiny helpers ---------- */

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

function useHover(): [boolean, { onMouseEnter: () => void; onMouseLeave: () => void }] {
  const [hovered, set] = useState(false);
  return [hovered, { onMouseEnter: () => set(true), onMouseLeave: () => set(false) }];
}

function useScrollY() {
  const [y, setY] = useState(0);
  useEffect(() => {
    const h = () => setY(window.scrollY);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);
  return y;
}

function useInView(threshold = 0.15): [React.RefObject<HTMLDivElement | null>, boolean] {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function GoldRule({ width = "80px", margin = "24px auto" }: { width?: string; margin?: string }) {
  return (
    <div
      style={{
        width,
        height: "1px",
        background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)`,
        margin,
      }}
    />
  );
}

/* ================================================================== */
/*  NAV                                                                */
/* ================================================================== */

function Nav() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [menuOpen, setMenuOpen] = useState(false);
  const links = ["Collections", "Heritage", "Craftsmanship", "Boutiques"];

  return (
    <nav
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: isMobile ? "0 20px" : "0 48px",
        height: "64px",
        background: "#0a0a0a",
        borderBottom: `1px solid rgba(212,160,23,0.12)`,
        fontFamily: SANS,
      }}
    >
      {/* Logo */}
      <div
        style={{
          fontFamily: SERIF,
          fontSize: isMobile ? "22px" : "28px",
          fontWeight: 600,
          letterSpacing: "6px",
          color: GOLD,
        }}
      >
        LUXE
      </div>

      {/* Desktop Links */}
      {!isMobile && (
        <div style={{ display: "flex", gap: "36px" }}>
          {links.map((l) => (
            <NavLink key={l} label={l} />
          ))}
        </div>
      )}

      {/* Mobile hamburger */}
      {isMobile && (
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            background: "none",
            border: "none",
            display: "flex",
            flexDirection: "column",
            gap: "4px",
            padding: "4px",
            cursor: "pointer",
          }}
        >
          <span style={{ width: 22, height: 2, background: GOLD, borderRadius: 1, transition: "0.2s", transform: menuOpen ? "rotate(45deg) translateY(6px)" : "none" }} />
          <span style={{ width: 22, height: 2, background: GOLD, borderRadius: 1, transition: "0.2s", opacity: menuOpen ? 0 : 1 }} />
          <span style={{ width: 22, height: 2, background: GOLD, borderRadius: 1, transition: "0.2s", transform: menuOpen ? "rotate(-45deg) translateY(-6px)" : "none" }} />
        </button>
      )}

      {/* Mobile dropdown */}
      {isMobile && menuOpen && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            background: "#0a0a0a",
            borderBottom: `1px solid rgba(212,160,23,0.15)`,
            zIndex: 100,
            padding: "12px 20px 20px",
          }}
        >
          {links.map((l) => (
            <a
              key={l}
              href="#"
              style={{
                display: "block",
                fontFamily: SANS,
                fontSize: "13px",
                fontWeight: 500,
                letterSpacing: "2px",
                textTransform: "uppercase",
                color: TEXT_MUTED,
                textDecoration: "none",
                padding: "12px 0",
                borderBottom: `1px solid rgba(212,160,23,0.08)`,
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
  const [hovered, bind] = useHover();
  return (
    <a
      href="#"
      {...bind}
      style={{
        color: hovered ? GOLD : TEXT_MUTED,
        textDecoration: "none",
        fontSize: "12px",
        fontWeight: 500,
        letterSpacing: "2.5px",
        textTransform: "uppercase",
        transition: "color 0.3s ease",
        fontFamily: SANS,
      }}
    >
      {label}
    </a>
  );
}

/* ================================================================== */
/*  HERO                                                               */
/* ================================================================== */

function Hero() {
  const [btnHover, btnBind] = useHover();
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <section
      style={{
        position: "relative",
        minHeight: isMobile ? "85vh" : "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: isMobile ? "80px 20px 60px" : "120px 24px 80px",
        overflow: "hidden",
      }}
    >
      {/* Parallax background - CSS only */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage: "url(https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?w=1600&q=80&auto=format)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          zIndex: 0,
        }}
      />
      {/* Overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: `linear-gradient(rgba(10,10,10,0.6), rgba(10,10,10,0.8)), radial-gradient(ellipse at 50% 30%, rgba(212,160,23,0.06) 0%, transparent 70%)`,
          zIndex: 1,
        }}
      />

      {/* Decorative rings */}
      <div
        style={{
          position: "absolute",
          width: "520px",
          height: "520px",
          borderRadius: "50%",
          border: `1px solid rgba(212,160,23,0.06)`,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
          zIndex: 2,
        }}
      />
      <div
        style={{
          position: "absolute",
          width: "680px",
          height: "680px",
          borderRadius: "50%",
          border: `1px solid rgba(212,160,23,0.03)`,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
          zIndex: 2,
        }}
      />

      {/* Hero content */}
      <div
        style={{
          position: "relative",
          zIndex: 3,
        }}
      >
        <p
          style={{
            fontFamily: SANS,
            fontSize: "11px",
            letterSpacing: "5px",
            textTransform: "uppercase",
            color: GOLD,
            marginBottom: "28px",
            fontWeight: 500,
          }}
        >
          Swiss Haute Horlogerie Since 1887
        </p>

        <h1
          style={{
            fontFamily: SERIF,
            fontSize: "clamp(36px, 5vw, 68px)",
            fontWeight: 400,
            lineHeight: 1.15,
            color: "#ffffff",
            maxWidth: "800px",
            margin: "0 auto",
          }}
        >
          Timeless Precision.
          <br />
          Unrivaled Elegance.
        </h1>

        <GoldRule width="100px" margin="36px auto" />

        <p
          style={{
            fontFamily: SANS,
            fontSize: "16px",
            lineHeight: 1.8,
            color: TEXT_MUTED,
            maxWidth: "520px",
            margin: "0 auto 48px",
            fontWeight: 300,
          }}
        >
          Each Luxe timepiece is a masterwork of precision engineering and
          artisanal craft, built to endure beyond generations.
        </p>

        <a
          href="#"
          {...btnBind}
          style={{
            display: "inline-block",
            fontFamily: SANS,
            fontSize: "12px",
            fontWeight: 500,
            letterSpacing: "3px",
            textTransform: "uppercase",
            textDecoration: "none",
            color: btnHover ? BG : GOLD,
            background: btnHover ? GOLD : "transparent",
            border: `1px solid ${GOLD}`,
            padding: "16px 48px",
            transition: "all 0.35s ease",
          }}
        >
          Discover Collection
        </a>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  FEATURED WATCHES                                                   */
/* ================================================================== */

const watches = [
  { name: "Sovereign Tourbillon", price: "CHF 148,000", refCode: "Ref. LX-7701", image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=400&q=80&auto=format" },
  { name: "Celestial Perpetual", price: "CHF 92,500", refCode: "Ref. LX-5503", image: "https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=400&q=80&auto=format" },
  { name: "Monarch Chronograph", price: "CHF 67,200", refCode: "Ref. LX-3302", image: "https://images.unsplash.com/photo-1526045431048-f857369baa09?w=400&q=80&auto=format" },
];

function FeaturedWatches() {
  const [ref, visible] = useInView(0.1);
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <section
      ref={ref}
      style={{
        padding: isMobile ? "60px 20px" : "120px 48px",
        background: BG,
        textAlign: "center",
      }}
    >
      <div
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(40px)",
          transition: "opacity 0.8s ease, transform 0.8s ease",
        }}
      >
        <p
          style={{
            fontFamily: SANS,
            fontSize: "11px",
            letterSpacing: "5px",
            textTransform: "uppercase",
            color: GOLD,
            marginBottom: "16px",
            fontWeight: 500,
          }}
        >
          The Collection
        </p>
        <h2
          style={{
            fontFamily: SERIF,
            fontSize: "clamp(28px, 3.5vw, 44px)",
            fontWeight: 400,
            color: "#fff",
            marginBottom: "12px",
          }}
        >
          Featured Timepieces
        </h2>
        <GoldRule width="60px" margin="24px auto 40px" />

        {/* Wide showcase image */}
        <div
          style={{
            maxWidth: "1200px",
            margin: isMobile ? "0 auto 32px" : "0 auto 64px",
            borderRadius: "12px",
            overflow: "hidden",
            height: isMobile ? "200px" : "320px",
            border: `1px solid rgba(212,160,23,0.15)`,
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1612817159949-195b6eb9e31a?w=1400&q=80&auto=format&fit=crop"
            alt="Luxury watch collection"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: isMobile ? "20px" : "32px",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {watches.map((w, i) => (
          <WatchCard key={w.refCode} name={w.name} price={w.price} refCode={w.refCode} image={w.image} index={i} parentVisible={visible} />
        ))}
      </div>
    </section>
  );
}

function WatchCard({ name, price, refCode, image, index, parentVisible }: { name: string; price: string; refCode: string; image: string; index: number; parentVisible: boolean }) {
  const [hovered, bind] = useHover();
  const [linkHover, linkBind] = useHover();
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <div
      {...bind}
      style={{
        flex: isMobile ? "1 1 100%" : "1 1 320px",
        maxWidth: isMobile ? "100%" : "370px",
        background: CARD,
        border: `1px solid ${hovered ? "rgba(212,160,23,0.3)" : "rgba(255,255,255,0.05)"}`,
        padding: isMobile ? "32px 20px 28px" : "48px 32px 40px",
        textAlign: "center",
        transition: "all 0.5s ease",
        transitionDelay: parentVisible ? `${index * 0.15}s` : "0s",
        boxShadow: hovered
          ? `0 0 40px rgba(212,160,23,0.08), 0 20px 60px rgba(0,0,0,0.4)`
          : "0 4px 24px rgba(0,0,0,0.3)",
        transform: parentVisible
          ? hovered ? "translateY(-8px)" : "translateY(0)"
          : "translateY(60px)",
        opacity: parentVisible ? 1 : 0,
      }}
    >
      {/* Watch face image */}
      <div
        style={{
          width: isMobile ? "140px" : "180px",
          height: isMobile ? "140px" : "180px",
          borderRadius: "50%",
          border: `2px solid ${hovered ? GOLD : "rgba(212,160,23,0.35)"}`,
          margin: isMobile ? "0 auto 24px" : "0 auto 36px",
          position: "relative",
          transition: "border-color 0.4s ease",
          overflow: "hidden",
        }}
      >
        <img
          src={image}
          alt={name}
          style={{
            display: "block",
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: "50%",
            transition: "transform 0.5s ease",
            transform: hovered ? "scale(1.1)" : "scale(1)",
          }}
        />
      </div>

      <p
        style={{
          fontFamily: SANS,
          fontSize: "10px",
          letterSpacing: "3px",
          textTransform: "uppercase",
          color: TEXT_MUTED,
          marginBottom: "8px",
        }}
      >
        {refCode}
      </p>
      <h3
        style={{
          fontFamily: SERIF,
          fontSize: "22px",
          fontWeight: 500,
          color: "#fff",
          marginBottom: "8px",
        }}
      >
        {name}
      </h3>
      <p
        style={{
          fontFamily: SANS,
          fontSize: "15px",
          color: GOLD,
          fontWeight: 400,
          letterSpacing: "1px",
          marginBottom: "28px",
        }}
      >
        {price}
      </p>
      <a
        href="#"
        {...linkBind}
        style={{
          fontFamily: SANS,
          fontSize: "11px",
          fontWeight: 500,
          letterSpacing: "2.5px",
          textTransform: "uppercase",
          color: linkHover ? GOLD_LIGHT : GOLD,
          textDecoration: "none",
          borderBottom: `1px solid ${linkHover ? GOLD_LIGHT : "transparent"}`,
          paddingBottom: "2px",
          transition: "all 0.3s ease",
        }}
      >
        View Details
      </a>
    </div>
  );
}

/* ================================================================== */
/*  HERITAGE                                                           */
/* ================================================================== */

function Heritage() {
  const [ref, visible] = useInView(0.15);
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <section
      ref={ref}
      style={{
        padding: isMobile ? "60px 20px" : "120px 48px",
        background: `linear-gradient(180deg, ${BG} 0%, #0d0d0d 100%)`,
      }}
    >
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: isMobile ? "32px" : "64px",
          maxWidth: "1200px",
          margin: "0 auto",
          alignItems: "center",
        }}
      >
        {/* Text column */}
        <div style={{
          flex: "1 1 440px",
          minWidth: "280px",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateX(0)" : "translateX(-40px)",
          transition: "opacity 0.8s ease, transform 0.8s ease",
        }}>
          <p
            style={{
              fontFamily: SANS,
              fontSize: "11px",
              letterSpacing: "5px",
              textTransform: "uppercase",
              color: GOLD,
              marginBottom: "20px",
              fontWeight: 500,
            }}
          >
            Our Heritage
          </p>
          <h2
            style={{
              fontFamily: SERIF,
              fontSize: "clamp(28px, 3.5vw, 44px)",
              fontWeight: 400,
              color: "#fff",
              lineHeight: 1.2,
              marginBottom: "16px",
            }}
          >
            Five Generations
            <br />
            of Excellence
          </h2>
          <GoldRule width="60px" margin="24px 0" />
          <p
            style={{
              fontFamily: SANS,
              fontSize: "15px",
              lineHeight: 1.9,
              color: TEXT_MUTED,
              marginBottom: "20px",
              fontWeight: 300,
            }}
          >
            Since 1887, the Luxe atelier has stood at the pinnacle of Swiss
            watchmaking. Our master horologists carry forward traditions that
            were forged in the workshops of the Jura mountains, combining
            centuries-old hand-finishing techniques with innovations that push
            the boundaries of mechanical artistry.
          </p>
          <p
            style={{
              fontFamily: SANS,
              fontSize: "15px",
              lineHeight: 1.9,
              color: TEXT_MUTED,
              fontWeight: 300,
            }}
          >
            Every movement is assembled by hand, every case polished to
            mirror perfection, every complication a testament to the relentless
            pursuit of horological mastery. This is not merely watchmaking
            &mdash; it is an act of devotion to time itself.
          </p>
        </div>

        {/* Heritage image */}
        <div style={{
          flex: "1 1 380px",
          minWidth: "280px",
          display: "flex",
          justifyContent: "center",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateX(0)" : "translateX(40px)",
          transition: "opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s",
        }}>
          <div
            style={{
              width: "100%",
              maxWidth: isMobile ? "100%" : "420px",
              height: isMobile ? "360px" : "540px",
              border: `1px solid rgba(212,160,23,0.3)`,
              position: "relative",
              overflow: "hidden",
              borderRadius: "12px",
            }}
          >
            {/* Decorative corner accents */}
            <div style={{ position: "absolute", top: "16px", left: "16px", width: "40px", height: "40px", borderTop: `1px solid ${GOLD}`, borderLeft: `1px solid ${GOLD}`, zIndex: 1 }} />
            <div style={{ position: "absolute", top: "16px", right: "16px", width: "40px", height: "40px", borderTop: `1px solid ${GOLD}`, borderRight: `1px solid ${GOLD}`, zIndex: 1 }} />
            <div style={{ position: "absolute", bottom: "16px", left: "16px", width: "40px", height: "40px", borderBottom: `1px solid ${GOLD}`, borderLeft: `1px solid ${GOLD}`, zIndex: 1 }} />
            <div style={{ position: "absolute", bottom: "16px", right: "16px", width: "40px", height: "40px", borderBottom: `1px solid ${GOLD}`, borderRight: `1px solid ${GOLD}`, zIndex: 1 }} />

            <img
              src="https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?w=800&q=80&auto=format"
              alt="Luxe watchmaker's atelier"
              style={{
                display: "block",
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "12px",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  CTA BANNER                                                         */
/* ================================================================== */

function CtaBanner() {
  const [hovered, bind] = useHover();
  const [ref, visible] = useInView(0.2);
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <section
      ref={ref}
      style={{
        padding: isMobile ? "48px 20px" : "80px 48px",
        background: `linear-gradient(135deg, ${GOLD} 0%, #b8880f 100%)`,
        textAlign: "center",
        opacity: visible ? 1 : 0,
        transform: visible ? "scale(1)" : "scale(0.97)",
        transition: "opacity 0.7s ease, transform 0.7s ease",
      }}
    >
      <p
        style={{
          fontFamily: SANS,
          fontSize: "11px",
          letterSpacing: "5px",
          textTransform: "uppercase",
          color: "rgba(10,10,10,0.5)",
          marginBottom: "16px",
          fontWeight: 500,
        }}
      >
        By Appointment Only
      </p>
      <h2
        style={{
          fontFamily: SERIF,
          fontSize: "clamp(28px, 3.5vw, 44px)",
          fontWeight: 400,
          color: BG,
          marginBottom: "16px",
        }}
      >
        Book a Private Viewing
      </h2>
      <p
        style={{
          fontFamily: SANS,
          fontSize: "15px",
          color: "rgba(10,10,10,0.6)",
          maxWidth: "480px",
          margin: "0 auto 40px",
          lineHeight: 1.7,
          fontWeight: 400,
        }}
      >
        Experience our collection in the intimacy of a Luxe salon.
        Our horological advisors await your visit.
      </p>
      <a
        href="#"
        {...bind}
        style={{
          display: "inline-block",
          fontFamily: SANS,
          fontSize: "12px",
          fontWeight: 500,
          letterSpacing: "3px",
          textTransform: "uppercase",
          textDecoration: "none",
          color: hovered ? GOLD : "#fff",
          background: hovered ? "rgba(10,10,10,0.9)" : BG,
          border: `1px solid ${BG}`,
          padding: "16px 48px",
          transition: "all 0.35s ease",
        }}
      >
        Reserve Appointment
      </a>
    </section>
  );
}

/* ================================================================== */
/*  FOOTER                                                             */
/* ================================================================== */

function Footer() {
  const socials = ["Instagram", "Twitter", "LinkedIn"];
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <footer
      style={{
        padding: isMobile ? "40px 20px 28px" : "64px 48px 40px",
        background: "#050505",
        borderTop: `1px solid rgba(212,160,23,0.08)`,
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: "40px",
        }}
      >
        {/* Brand column */}
        <div>
          <div
            style={{
              fontFamily: SERIF,
              fontSize: "22px",
              fontWeight: 600,
              letterSpacing: "5px",
              color: GOLD,
              marginBottom: "12px",
            }}
          >
            LUXE
          </div>
          <p
            style={{
              fontFamily: SANS,
              fontSize: "12px",
              color: TEXT_MUTED,
              fontWeight: 300,
              lineHeight: 1.6,
              maxWidth: "260px",
            }}
          >
            Swiss haute horlogerie since 1887.
            <br />
            Geneva &middot; Paris &middot; Tokyo &middot; New York
          </p>
        </div>

        {/* Social column */}
        <div style={{ display: "flex", gap: "28px", alignItems: "center" }}>
          {socials.map((s) => (
            <FooterLink key={s} label={s} />
          ))}
        </div>
      </div>

      {/* Divider */}
      <div
        style={{
          maxWidth: "1200px",
          margin: "40px auto 0",
          borderTop: "1px solid rgba(255,255,255,0.06)",
          paddingTop: "24px",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          gap: "12px",
        }}
      >
        <p
          style={{
            fontFamily: SANS,
            fontSize: "11px",
            color: "rgba(255,255,255,0.25)",
            fontWeight: 300,
          }}
        >
          &copy; 2026 Luxe Timepieces SA. All rights reserved.
        </p>
        <p
          style={{
            fontFamily: SANS,
            fontSize: "11px",
            color: "rgba(255,255,255,0.25)",
            fontWeight: 300,
          }}
        >
          Privacy &middot; Terms &middot; Cookie Settings
        </p>
      </div>
    </footer>
  );
}

function FooterLink({ label }: { label: string }) {
  const [hovered, bind] = useHover();
  return (
    <a
      href="#"
      {...bind}
      style={{
        fontFamily: SANS,
        fontSize: "11px",
        letterSpacing: "2px",
        textTransform: "uppercase",
        textDecoration: "none",
        color: hovered ? GOLD : TEXT_MUTED,
        transition: "color 0.3s ease",
        fontWeight: 400,
      }}
    >
      {label}
    </a>
  );
}

/* ================================================================== */
/*  GLOBAL RESET (injected via <style>)                                */
/* ================================================================== */

const globalCSS = `
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
  a { cursor: pointer; }
  ::selection {
    background: rgba(212,160,23,0.3);
    color: #fff;
  }
  /* Responsive helpers */
  @media (max-width: 768px) {
    section { padding-left: 20px !important; padding-right: 20px !important; }
    footer { padding-left: 20px !important; padding-right: 20px !important; }
  }
`;

/* ================================================================== */
/*  ROOT EXPORT                                                        */
/* ================================================================== */

export function App() {
  return (
    <div style={{ background: BG, color: TEXT, fontFamily: SANS }}>
      <style dangerouslySetInnerHTML={{ __html: globalCSS }} />
      <Nav />
      <main>
        <Hero />
        <FeaturedWatches />
        <Heritage />
        <CtaBanner />
      </main>
      <Footer />
    </div>
  );
}
