import { lazy, Suspense } from "react";
import type { Translations } from "../i18n";
import type { Project } from "../data";

const workPages: Record<string, React.LazyExoticComponent<React.ComponentType>> = {
  luxe: lazy(() => import("../../../works/luxe-timepieces/App").then((m) => ({ default: m.App }))),
  aura: lazy(() => import("../../../works/aura-skincare/App").then((m) => ({ default: m.App }))),
  terra: lazy(() => import("../../../works/terra-outdoor/App").then((m) => ({ default: m.App }))),
  volt: lazy(() => import("../../../works/volt-electronics/App").then((m) => ({ default: m.App }))),
  bloom: lazy(() => import("../../../works/bloom-furniture/App").then((m) => ({ default: m.App }))),
  apex: lazy(() => import("../../../works/apex-athletics/App").then((m) => ({ default: m.App }))),
};

interface ProjectDetailProps {
  project: Project;
  t: Translations;
  onBack: () => void;
}

export function ProjectDetail({ project, t, onBack }: ProjectDetailProps) {
  const WorkPage = workPages[project.id];

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-alt)", padding: "0 24px 40px" }}>
      <nav
        style={{
          position: "sticky",
          top: 0,
          background: "rgba(250,250,250,0.92)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          padding: "14px 0",
          zIndex: 9999,
          margin: "0 -24px",
          paddingLeft: "24px",
          paddingRight: "24px",
        }}
      >
        <div style={{ maxWidth: "var(--container)", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <button
            onClick={onBack}
            style={{
              background: "none",
              border: "1px solid var(--border)",
              color: "var(--text)",
              padding: "8px 20px",
              borderRadius: "var(--radius-sm)",
              fontSize: "14px",
              fontWeight: 500,
              transition: "border-color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--text)")}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
          >
            &larr; {t.back}
          </button>
          <button
            onClick={onBack}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              background: "none",
              border: "none",
              padding: 0,
              cursor: "pointer",
              fontFamily: "inherit",
              color: "inherit",
            }}
          >
            <div
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                background: project.color,
                boxShadow: `0 0 8px ${project.color}40`,
              }}
            />
            <span style={{ fontSize: "14px", fontWeight: 600, letterSpacing: "-0.01em" }}>
              {t[project.titleKey]}
            </span>
          </button>
          <div style={{ display: "flex", gap: "6px" }}>
            {t[project.tagsKey].split(", ").map((tag) => (
              <span
                key={tag}
                style={{
                  fontSize: "11px",
                  fontWeight: 600,
                  padding: "3px 10px",
                  borderRadius: "4px",
                  background: `${project.color}14`,
                  color: project.color,
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </nav>

      <div
        style={{
          maxWidth: "var(--container)",
          margin: "24px auto 0",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius)",
          overflow: "hidden",
          background: "var(--bg)",
          boxShadow: "0 2px 20px rgba(0,0,0,0.06)",
        }}
      >
        <Suspense
          fallback={
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  border: `3px solid ${project.color}20`,
                  borderTopColor: project.color,
                  borderRadius: "50%",
                  animation: "spin 0.8s linear infinite",
                }}
              />
              <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </div>
          }
        >
          {WorkPage && <WorkPage />}
        </Suspense>
      </div>
    </div>
  );
}
