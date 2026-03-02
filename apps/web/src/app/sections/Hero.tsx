import { lazy, Suspense } from "react";
import type { Translations } from "../i18n";

const HeroScene = lazy(() =>
  import("../three/HeroScene").then((m) => ({ default: m.HeroScene })),
);

interface HeroProps {
  t: Translations;
}

export function Hero({ t }: HeroProps) {
  const parts = t.hero_title.split(t.hero_title_accent);

  return (
    <section
      id="hero"
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <Suspense fallback={null}>
          <HeroScene />
        </Suspense>
      </div>

      <div className="container" style={{ position: "relative", zIndex: 1, paddingTop: "80px" }}>
        <div style={{ maxWidth: "680px" }}>
          <h1
            className="fade-in"
            style={{
              fontSize: "clamp(38px, 6.5vw, 72px)",
              fontWeight: 800,
              lineHeight: 1.02,
              letterSpacing: "-0.04em",
              marginBottom: "22px",
            }}
          >
            {parts[0]}
            <span
              style={{
                background: "linear-gradient(135deg, var(--hot-pink), var(--electric-blue))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {t.hero_title_accent}
            </span>
            {parts[1]}
          </h1>
          <p
            className="fade-in d1"
            style={{
              fontSize: "17px",
              color: "var(--text-secondary)",
              lineHeight: 1.7,
              marginBottom: "36px",
              maxWidth: "520px",
            }}
          >
            {t.hero_subtitle}
          </p>
          <div className="fade-in d2" style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <a
              href="#contact"
              style={{
                display: "inline-flex",
                alignItems: "center",
                padding: "14px 32px",
                background: "linear-gradient(135deg, var(--hot-pink), var(--magenta))",
                color: "#fff",
                borderRadius: "var(--radius-sm)",
                fontSize: "14px",
                fontWeight: 600,
                transition: "opacity 0.2s, transform 0.2s",
                boxShadow: "0 4px 20px rgba(255, 0, 110, 0.3)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = "0.9";
                e.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = "1";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              {t.hero_cta}
            </a>
            <a
              href="#portfolio"
              style={{
                display: "inline-flex",
                alignItems: "center",
                padding: "14px 32px",
                background: "transparent",
                color: "var(--text)",
                borderRadius: "var(--radius-sm)",
                fontSize: "14px",
                fontWeight: 600,
                border: "1px solid var(--border)",
                transition: "border-color 0.2s, background 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--text)";
                e.currentTarget.style.background = "rgba(0,0,0,0.03)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border)";
                e.currentTarget.style.background = "transparent";
              }}
            >
              {t.hero_secondary_cta}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
