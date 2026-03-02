import { useRef, useCallback } from "react";
import type { Translations } from "../i18n";
import { processSteps } from "../data";
import { useParallax } from "../hooks/useParallax";

interface ProcessProps {
  t: Translations;
}

export function Process({ t }: ProcessProps) {
  const numRefs = useRef<(HTMLDivElement | null)[]>([]);
  const offsets = useRef<number[]>(processSteps.map(() => 0));

  const setNumRef = useCallback((el: HTMLDivElement | null, i: number) => {
    numRefs.current[i] = el;
  }, []);

  useParallax(() => {
    const viewH = window.innerHeight;
    numRefs.current.forEach((el, i) => {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const centerY = rect.top + rect.height / 2;
      const delta = (centerY - viewH / 2) * 0.08;
      offsets.current[i] += (delta - offsets.current[i]) * 0.3;
      el.style.transform = `translateY(${offsets.current[i]}px)`;
    });
  });

  return (
    <section id="process" style={{ padding: "var(--section-gap) 0" }}>
      <div className="container">
        <div className="fade-in" style={{ marginBottom: "48px", maxWidth: "540px" }}>
          <div
            style={{
              width: "60px",
              height: "6px",
              borderRadius: "3px",
              background: "linear-gradient(90deg, var(--violet), var(--magenta))",
              marginBottom: "20px",
            }}
          />
          <h2
            style={{
              fontSize: "clamp(28px, 4vw, 44px)",
              fontWeight: 700,
              letterSpacing: "-0.025em",
              lineHeight: 1.1,
              marginBottom: "14px",
            }}
          >
            {t.process_title}
          </h2>
          <p style={{ fontSize: "16px", color: "var(--text-secondary)", lineHeight: 1.7 }}>
            {t.process_subtitle}
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "20px",
          }}
        >
          {processSteps.map((step, i) => (
            <div
              key={step.num}
              className={`fade-in d${i}`}
              style={{
                background: step.color,
                padding: "clamp(28px, 3vw, 40px)",
                borderRadius: "var(--radius)",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-3px)";
                e.currentTarget.style.boxShadow = `0 12px 32px ${step.color}40`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div
                ref={(el) => setNumRef(el, i)}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "clamp(36px, 4.5vw, 56px)",
                  fontWeight: 800,
                  color: "rgba(255,255,255,0.25)",
                  lineHeight: 1,
                  marginBottom: "20px",
                  letterSpacing: "-0.04em",
                }}
              >
                {step.num}
              </div>
              <h3
                style={{
                  fontSize: "17px",
                  fontWeight: 600,
                  marginBottom: "10px",
                  letterSpacing: "-0.01em",
                  color: "#fff",
                }}
              >
                {t[step.titleKey]}
              </h3>
              <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.75)", lineHeight: 1.65 }}>
                {t[step.descKey]}
              </p>
            </div>
          ))}
        </div>

        <style>{`
          @media (max-width: 768px) {
            #process .container > div:last-of-type {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>
      </div>
    </section>
  );
}
