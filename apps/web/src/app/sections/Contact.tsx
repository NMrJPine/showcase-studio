import { lazy, Suspense } from "react";
import type { Translations } from "../i18n";
import { useParallaxOffset } from "../hooks/useParallaxOffset";

const ContactScene = lazy(() =>
  import("../three/ContactScene").then((m) => ({ default: m.ContactScene })),
);

interface ContactProps {
  t: Translations;
  onOpenContact?: () => void;
}

export function Contact({ t, onOpenContact }: ContactProps) {
  const headingRef = useParallaxOffset<HTMLHeadingElement>(0);

  return (
    <section
      id="contact"
      style={{
        position: "relative",
        padding: "var(--section-gap) 0",
        background: "var(--bg-alt)",
        overflow: "hidden",
      }}
    >
      <Suspense fallback={null}>
        <ContactScene />
      </Suspense>
      <div className="container">
        <div
          className="fade-in"
          style={{
            maxWidth: "580px",
            margin: "0 auto",
            textAlign: "center",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div
            style={{
              width: "60px",
              height: "6px",
              borderRadius: "3px",
              background: "linear-gradient(90deg, var(--rose), var(--orange))",
              margin: "0 auto 20px",
            }}
          />
          <h2
            ref={headingRef}
            style={{
              fontSize: "clamp(28px, 4vw, 44px)",
              fontWeight: 700,
              letterSpacing: "-0.025em",
              lineHeight: 1.1,
              marginBottom: "32px",
            }}
          >
            {t.contact_title}
          </h2>
          <p
            style={{
              fontSize: "16px",
              color: "var(--text-secondary)",
              lineHeight: 1.7,
              marginBottom: "32px",
            }}
          >
            {t.contact_subtitle}
          </p>
          <button
            onClick={onOpenContact}
            style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "14px 36px",
              background: "linear-gradient(135deg, var(--rose), var(--magenta))",
              color: "#fff",
              border: "none",
              borderRadius: "var(--radius-sm)",
              fontSize: "14px",
              fontWeight: 600,
              transition: "opacity 0.2s, transform 0.2s",
              boxShadow: "0 4px 20px rgba(225, 29, 72, 0.3)",
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
            {t.contact_cta}
          </button>
          <div
            style={{
              marginTop: "20px",
              fontSize: "14px",
              fontFamily: "var(--font-mono)",
              color: "var(--text-tertiary)",
              letterSpacing: "-0.01em",
            }}
          >
            {t.contact_email}
          </div>
        </div>
      </div>
    </section>
  );
}
