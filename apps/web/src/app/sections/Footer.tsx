import type { Translations } from "../i18n";

interface FooterProps {
  t: Translations;
}

const mosaicColors = [
  "var(--hot-pink)",
  "var(--electric-blue)",
  "var(--yellow)",
  "var(--emerald)",
  "var(--violet)",
  "var(--orange)",
];

export function Footer({ t }: FooterProps) {
  return (
    <footer
      style={{
        borderTop: "none",
        padding: "0",
      }}
    >
      <div
        style={{
          height: "3px",
          background: "linear-gradient(90deg, var(--indigo), var(--hot-pink), var(--yellow), var(--electric-blue), var(--emerald), var(--orange))",
        }}
      />
      <div
        className="container"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "12px",
          padding: "28px 24px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <div style={{ display: "flex", gap: "4px" }}>
            {mosaicColors.map((c, i) => (
              <div
                key={i}
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  background: c,
                }}
              />
            ))}
          </div>
          <div style={{ fontSize: "13px", color: "var(--text-tertiary)" }}>
            <span style={{ fontWeight: 600, color: "var(--text)" }}>Showcase Studio</span> &mdash; {t.footer_tagline}
          </div>
        </div>
        <div style={{ fontSize: "13px", color: "var(--text-tertiary)" }}>
          &copy; {new Date().getFullYear()} Showcase Studio. {t.footer_rights}
        </div>
      </div>
    </footer>
  );
}
