import type { Translations } from "../i18n";
import { services } from "../data";

interface ServicesProps {
  t: Translations;
}

const serviceIcons: Record<string, JSX.Element> = {
  service_showcase_title: (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
      <line x1="12" y1="22.08" x2="12" y2="12" />
    </svg>
  ),
  service_ecommerce_title: (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="21" r="1" />
      <circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
  ),
  service_interactive_title: (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  ),
  service_brand_title: (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
};

export function Services({ t }: ServicesProps) {
  return (
    <section id="services" style={{ padding: "var(--section-gap) 0" }}>
      <div className="container">
        <div className="fade-in" style={{ marginBottom: "48px", maxWidth: "540px" }}>
          <div
            style={{
              width: "60px",
              height: "6px",
              borderRadius: "3px",
              background: "linear-gradient(90deg, var(--indigo), var(--hot-pink))",
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
            {t.services_title}
          </h2>
          <p style={{ fontSize: "16px", color: "var(--text-secondary)", lineHeight: 1.7 }}>
            {t.services_subtitle}
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "20px",
          }}
        >
          {services.map((svc, i) => (
            <div
              key={svc.titleKey}
              className={`fade-in d${i}`}
              style={{
                background: "#fff",
                padding: "clamp(28px, 3vw, 44px)",
                borderRadius: "var(--radius)",
                border: "1px solid var(--border)",
                boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
                transition: "transform 0.25s ease, box-shadow 0.25s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = `0 12px 32px ${svc.color}20, 0 2px 8px rgba(0,0,0,0.06)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 1px 4px rgba(0,0,0,0.04)";
              }}
            >
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "56px",
                  height: "56px",
                  borderRadius: "var(--radius-sm)",
                  background: `${svc.color}12`,
                  marginBottom: "20px",
                  color: svc.color,
                }}
              >
                {serviceIcons[svc.titleKey]}
              </div>
              <h3
                style={{
                  fontSize: "20px",
                  fontWeight: 600,
                  marginBottom: "10px",
                  letterSpacing: "-0.01em",
                  color: "var(--text)",
                }}
              >
                {t[svc.titleKey]}
              </h3>
              <p style={{ fontSize: "14px", color: "var(--text-secondary)", lineHeight: 1.7 }}>
                {t[svc.descKey]}
              </p>
            </div>
          ))}
        </div>

        <style>{`
          @media (max-width: 640px) {
            #services .container > div:last-child {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>
      </div>
    </section>
  );
}
