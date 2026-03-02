import { useState, useEffect } from "react";
import type { Translations } from "../i18n";
import type { Lang } from "../data";
import { langLabels } from "../data";

interface NavbarProps {
  t: Translations;
  lang: Lang;
  onLangChange: (lang: Lang) => void;
}

const s = {
  nav: (scrolled: boolean): React.CSSProperties => ({
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    padding: "16px 0",
    background: scrolled ? "rgba(17,17,17,0.95)" : "transparent",
    backdropFilter: scrolled ? "blur(12px)" : "none",
    WebkitBackdropFilter: scrolled ? "blur(12px)" : "none",
    borderBottom: scrolled ? "1px solid rgba(255,255,255,0.08)" : "1px solid transparent",
    transition: "all 0.3s ease",
  }),
  inner: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  } as React.CSSProperties,
  logo: (scrolled: boolean): React.CSSProperties => ({
    fontWeight: 700,
    fontSize: "18px",
    letterSpacing: "-0.5px",
    color: scrolled ? "#fff" : "var(--text)",
    transition: "color 0.3s ease",
  }),
  logoSuffix: (scrolled: boolean): React.CSSProperties => ({
    color: scrolled ? "rgba(255,255,255,0.5)" : "var(--text-tertiary)",
    fontWeight: 400,
    transition: "color 0.3s ease",
  }),
  links: {
    display: "flex",
    gap: "28px",
    alignItems: "center",
  } as React.CSSProperties,
  link: (scrolled: boolean): React.CSSProperties => ({
    color: scrolled ? "rgba(255,255,255,0.7)" : "var(--text-secondary)",
    fontSize: "14px",
    fontWeight: 500,
    transition: "color 0.2s",
  }),
  langBtn: (scrolled: boolean): React.CSSProperties => ({
    background: "transparent",
    border: scrolled ? "1px solid rgba(255,255,255,0.2)" : "1px solid var(--border)",
    color: scrolled ? "#fff" : "var(--text)",
    padding: "5px 12px",
    borderRadius: "6px",
    fontSize: "13px",
    fontWeight: 500,
    fontFamily: "var(--font-mono)",
    letterSpacing: "0.02em",
    transition: "all 0.3s ease",
  }),
  langDrop: {
    position: "absolute" as const,
    top: "100%",
    right: 0,
    marginTop: "4px",
    background: "var(--bg)",
    border: "1px solid var(--border)",
    borderRadius: "8px",
    overflow: "hidden",
    boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
    minWidth: "80px",
  } as React.CSSProperties,
  langItem: (active: boolean): React.CSSProperties => ({
    display: "block",
    width: "100%",
    padding: "8px 14px",
    background: active ? "var(--bg-alt)" : "transparent",
    border: "none",
    color: "var(--text)",
    fontSize: "13px",
    fontFamily: "var(--font-mono)",
    fontWeight: 500,
    textAlign: "left",
  }),
  hamburger: (scrolled: boolean): React.CSSProperties => ({
    display: "none",
    background: "none",
    border: "none",
    padding: "4px",
    color: scrolled ? "#fff" : "var(--text)",
    transition: "color 0.3s ease",
  }),
  mobileMenu: (scrolled: boolean): React.CSSProperties => ({
    padding: "8px 24px 20px",
    background: scrolled ? "rgba(17,17,17,0.95)" : "var(--bg)",
    borderTop: scrolled ? "1px solid rgba(255,255,255,0.08)" : "1px solid var(--border)",
  }),
  mobileLink: (scrolled: boolean): React.CSSProperties => ({
    display: "block",
    padding: "14px 0",
    color: scrolled ? "#fff" : "var(--text)",
    fontSize: "16px",
    fontWeight: 500,
    borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "1px solid var(--border-light)",
  }),
};

export function Navbar({ t, lang, onLangChange }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links: [string, string][] = [
    ["#services", t.nav_services],
    ["#portfolio", t.nav_portfolio],
    ["#templates", t.nav_templates],
    ["#process", t.nav_process],
    ["#contact", t.nav_contact],
  ];

  const linkHoverColor = scrolled ? "#fff" : "var(--text)";
  const linkBaseColor = scrolled ? "rgba(255,255,255,0.7)" : "var(--text-secondary)";

  return (
    <nav style={s.nav(scrolled)}>
      <div className="container" style={s.inner}>
        <a href="#hero" style={s.logo(scrolled)}>
          Showcase<span style={s.logoSuffix(scrolled)}> Studio</span>
        </a>

        <div style={s.links}>
          <div className="nav-desktop" style={{ display: "flex", gap: "28px" }}>
            {links.map(([href, label]) => (
              <a
                key={href}
                href={href}
                style={s.link(scrolled)}
                onMouseEnter={(e) => (e.currentTarget.style.color = linkHoverColor)}
                onMouseLeave={(e) => (e.currentTarget.style.color = linkBaseColor)}
              >
                {label}
              </a>
            ))}
          </div>

          <div style={{ position: "relative" }}>
            <button style={s.langBtn(scrolled)} onClick={() => setLangOpen(!langOpen)}>
              {langLabels[lang]}
            </button>
            {langOpen && (
              <div style={s.langDrop}>
                {(["en", "it", "es"] as Lang[]).map((l) => (
                  <button
                    key={l}
                    style={s.langItem(l === lang)}
                    onClick={() => { onLangChange(l); setLangOpen(false); }}
                  >
                    {langLabels[l]}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            className="nav-hamburger"
            style={s.hamburger(scrolled)}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {menuOpen ? (
                <><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></>
              ) : (
                <><line x1="4" y1="7" x2="20" y2="7" /><line x1="4" y1="12" x2="20" y2="12" /><line x1="4" y1="17" x2="20" y2="17" /></>
              )}
            </svg>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div style={s.mobileMenu(scrolled)}>
          {links.map(([href, label]) => (
            <a key={href} href={href} style={s.mobileLink(scrolled)} onClick={() => setMenuOpen(false)}>
              {label}
            </a>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-hamburger { display: block !important; }
        }
      `}</style>
    </nav>
  );
}
