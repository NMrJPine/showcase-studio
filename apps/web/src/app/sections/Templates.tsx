import { useState, useEffect } from "react";
import type { Translations } from "../i18n";
import { templates, categoryFilterKeys, type TemplateCategory } from "../data";

interface TemplatesProps {
  t: Translations;
}

type FilterKey = "all" | TemplateCategory;

function TemplateImageCarousel({ images, alt }: { images: string[]; alt: string }) {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(() => {
      setIdx((p) => (p + 1) % images.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div
      style={{
        marginBottom: "14px",
        borderRadius: "6px",
        overflow: "hidden",
        border: "1px solid var(--border)",
        aspectRatio: "16 / 9",
        position: "relative",
      }}
    >
      {images.map((src, i) => (
        <img
          key={src}
          src={src}
          alt={`${alt} ${i + 1}`}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "top",
            display: "block",
            opacity: idx === i ? 1 : 0,
            transition: "opacity 0.6s ease",
          }}
        />
      ))}
      {images.length > 1 && (
        <div
          style={{
            position: "absolute",
            bottom: "8px",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            gap: "6px",
            zIndex: 2,
          }}
        >
          {images.map((_, i) => (
            <button
              key={i}
              onClick={(e) => { e.stopPropagation(); setIdx(i); }}
              style={{
                width: idx === i ? "18px" : "6px",
                height: "6px",
                borderRadius: "3px",
                border: "none",
                background: idx === i ? "#fff" : "rgba(255,255,255,0.5)",
                padding: 0,
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function Templates({ t }: TemplatesProps) {
  const [filter, setFilter] = useState<FilterKey>("all");

  const filtered = filter === "all" ? templates : templates.filter((tpl) => tpl.category === filter);
  const filterKeys = Object.keys(categoryFilterKeys) as FilterKey[];

  return (
    <section id="templates" style={{ padding: "var(--section-gap) 0", background: "var(--bg-alt)" }}>
      <div className="container">
        <div className="fade-in" style={{ marginBottom: "36px", maxWidth: "540px" }}>
          <div
            style={{
              width: "60px",
              height: "6px",
              borderRadius: "3px",
              background: "linear-gradient(90deg, var(--orange), var(--yellow))",
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
            {t.templates_title}
          </h2>
          <p style={{ fontSize: "16px", color: "var(--text-secondary)", lineHeight: 1.7 }}>
            {t.templates_subtitle}
          </p>
        </div>

        <div className="fade-in d1" style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "32px" }}>
          {filterKeys.map((key) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              style={{
                padding: "7px 16px",
                fontSize: "13px",
                fontWeight: 500,
                border: "1px solid",
                borderColor: filter === key ? "var(--indigo)" : "var(--border)",
                background: filter === key ? "var(--indigo)" : "var(--bg)",
                color: filter === key ? "#fff" : "var(--text-secondary)",
                borderRadius: "6px",
                transition: "all 0.2s",
                whiteSpace: "nowrap",
              }}
            >
              {t[categoryFilterKeys[key]]}
            </button>
          ))}
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "16px",
          }}
        >
          {filtered.map((tpl, i) => (
            <div
              key={tpl.id}
              className={`fade-in d${Math.min(i, 3)}`}
              style={{
                border: "1px solid var(--border)",
                borderRadius: "var(--radius)",
                padding: "24px",
                background: "var(--bg)",
                transition: "box-shadow 0.2s, border-color 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = `0 8px 28px ${tpl.color}20, inset 0 0 30px ${tpl.color}06`;
                e.currentTarget.style.borderColor = `${tpl.color}60`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.borderColor = "var(--border)";
              }}
            >
              {tpl.images && tpl.images.length > 0 && (
                <TemplateImageCarousel images={tpl.images} alt={t[tpl.titleKey]} />
              )}
              <span
                style={{
                  display: "inline-block",
                  fontSize: "11px",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  color: "#fff",
                  background: tpl.color,
                  padding: "3px 10px",
                  borderRadius: "4px",
                  marginBottom: "14px",
                  fontFamily: "var(--font-mono)",
                }}
              >
                {tpl.category}
              </span>
              <h3 style={{ fontSize: "17px", fontWeight: 600, marginBottom: "8px", letterSpacing: "-0.01em" }}>
                {t[tpl.titleKey]}
              </h3>
              <p
                style={{
                  fontSize: "13px",
                  color: "var(--text-secondary)",
                  lineHeight: 1.65,
                  marginBottom: "14px",
                }}
              >
                {t[tpl.descKey]}
              </p>
              <div style={{ display: "flex", gap: "5px", flexWrap: "wrap", marginBottom: "18px" }}>
                {t[tpl.featuresKey].split(", ").map((feat) => (
                  <span
                    key={feat}
                    style={{
                      fontSize: "11px",
                      fontWeight: 600,
                      padding: "3px 8px",
                      borderRadius: "4px",
                      background: `${tpl.color}15`,
                      color: tpl.color,
                    }}
                  >
                    {feat}
                  </span>
                ))}
              </div>
              <button
                style={{
                  width: "100%",
                  padding: "10px",
                  border: `1px solid ${tpl.color}30`,
                  background: "transparent",
                  color: tpl.color,
                  borderRadius: "var(--radius-sm)",
                  fontSize: "13px",
                  fontWeight: 600,
                  transition: "all 0.15s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = tpl.color;
                  e.currentTarget.style.color = "#fff";
                  e.currentTarget.style.borderColor = tpl.color;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = tpl.color;
                  e.currentTarget.style.borderColor = `${tpl.color}30`;
                }}
              >
                {t.templates_use}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
