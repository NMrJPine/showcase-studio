import { useRef, useCallback } from "react";
import type { Translations } from "../i18n";
import { projects, type Project } from "../data";
import { useParallax } from "../hooks/useParallax";

interface PortfolioProps {
  t: Translations;
  onSelectProject: (project: Project) => void;
}

export function Portfolio({ t, onSelectProject }: PortfolioProps) {
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const offsets = useRef<number[]>(projects.map(() => 0));

  const setCardRef = useCallback((el: HTMLElement | null, i: number) => {
    cardRefs.current[i] = el;
  }, []);

  useParallax(() => {
    const viewH = window.innerHeight;
    cardRefs.current.forEach((el, i) => {
      if (!el) return;
      const speed = i % 2 === 0 ? 0.03 : 0.06;
      const rect = el.getBoundingClientRect();
      const centerY = rect.top + rect.height / 2;
      const delta = (centerY - viewH / 2) * speed;
      offsets.current[i] += (delta - offsets.current[i]) * 0.3;
      el.style.transform = `translateY(${offsets.current[i]}px)`;
    });
  });

  return (
    <section id="portfolio" style={{ padding: "var(--section-gap) 0" }}>
      <div className="container">
        <div className="fade-in" style={{ marginBottom: "48px", maxWidth: "540px" }}>
          <div
            style={{
              width: "60px",
              height: "6px",
              borderRadius: "3px",
              background: "linear-gradient(90deg, var(--electric-blue), var(--aqua))",
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
            {t.portfolio_title}
          </h2>
          <p style={{ fontSize: "16px", color: "var(--text-secondary)", lineHeight: 1.7 }}>
            {t.portfolio_subtitle}
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
            gap: "20px",
          }}
        >
          {projects.map((project, i) => (
            <article
              key={project.id}
              ref={(el) => setCardRef(el, i)}
              className={`fade-in d${Math.min(i, 3)}`}
              style={{
                border: "1px solid var(--border)",
                borderLeft: `6px solid ${project.color}`,
                borderRadius: "var(--radius)",
                padding: "28px",
                cursor: "pointer",
                transition: "border-color 0.2s, box-shadow 0.25s, background 0.25s",
                background: "var(--bg)",
              }}
              onClick={() => onSelectProject(project)}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = project.color;
                e.currentTarget.style.boxShadow = `0 8px 32px ${project.color}30, inset 0 0 30px ${project.color}08`;
                e.currentTarget.style.background = `${project.color}06`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border)";
                e.currentTarget.style.borderLeft = `6px solid ${project.color}`;
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.background = "var(--bg)";
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "14px" }}>
                <div
                  style={{
                    width: "12px",
                    height: "12px",
                    borderRadius: "50%",
                    background: project.color,
                    flexShrink: 0,
                    boxShadow: `0 0 8px ${project.color}50`,
                  }}
                />
                <h3 style={{ fontSize: "17px", fontWeight: 600, letterSpacing: "-0.01em" }}>
                  {t[project.titleKey]}
                </h3>
              </div>
              <p
                style={{
                  fontSize: "14px",
                  color: "var(--text-secondary)",
                  lineHeight: 1.65,
                  marginBottom: "16px",
                }}
              >
                {t[project.descKey]}
              </p>
              <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "16px" }}>
                {t[project.tagsKey].split(", ").map((tag) => (
                  <span
                    key={tag}
                    style={{
                      fontSize: "11px",
                      fontWeight: 600,
                      padding: "3px 10px",
                      borderRadius: "4px",
                      background: project.color,
                      color: "#fff",
                      letterSpacing: "0.02em",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <span
                style={{
                  fontSize: "13px",
                  fontWeight: 700,
                  color: project.color,
                  letterSpacing: "-0.01em",
                }}
              >
                {t.portfolio_view} &rarr;
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
