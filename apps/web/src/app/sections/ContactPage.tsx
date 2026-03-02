import { lazy, Suspense, useState, useEffect, useRef, useCallback } from "react";
import type { Translations } from "../i18n";

const ContactScene = lazy(() =>
  import("../three/ContactScene").then((m) => ({ default: m.ContactScene })),
);

const WHATSAPP_NUMBER = "393520236521";
const WEB3FORMS_KEY = "9e83a594-77b8-49ad-925e-ebc822a4da84";
// Web3Forms' own hCaptcha sitekey — verified server-side by Web3Forms
const HCAPTCHA_SITE_KEY = "50b2fe65-b00b-4b9e-ad62-3ba471098be2";

declare global {
  interface Window {
    hcaptcha?: {
      render: (el: HTMLElement, opts: Record<string, unknown>) => string;
      reset: (id: string) => void;
      remove: (id: string) => void;
    };
  }
}

function useHCaptcha() {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const renderWidget = useCallback(() => {
    if (!containerRef.current || !window.hcaptcha || widgetId.current) return;
    widgetId.current = window.hcaptcha.render(containerRef.current, {
      sitekey: HCAPTCHA_SITE_KEY,
      callback: (t: string) => setToken(t),
      "expired-callback": () => setToken(null),
      "error-callback": () => setToken(null),
      theme: "light",
      size: "normal",
    });
  }, []);

  useEffect(() => {
    const existing = document.querySelector(
      'script[src*="js.hcaptcha.com"]',
    );
    if (existing) {
      if (window.hcaptcha) renderWidget();
      else existing.addEventListener("load", renderWidget);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://js.hcaptcha.com/1/api.js?render=explicit";
    script.async = true;
    script.onload = renderWidget;
    document.head.appendChild(script);

    return () => {
      if (widgetId.current && window.hcaptcha) {
        window.hcaptcha.remove(widgetId.current);
        widgetId.current = null;
      }
    };
  }, [renderWidget]);

  const reset = useCallback(() => {
    setToken(null);
    if (widgetId.current && window.hcaptcha) {
      window.hcaptcha.reset(widgetId.current);
    }
  }, []);

  return { containerRef, token, reset };
}

interface ContactPageProps {
  t: Translations;
  onBack: () => void;
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px 14px",
  fontSize: "13px",
  fontFamily: "var(--font-sans)",
  color: "var(--text)",
  background: "var(--bg)",
  border: "1.5px solid var(--border)",
  borderRadius: "var(--radius-sm)",
  outline: "none",
  transition: "border-color 0.2s",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "12px",
  fontWeight: 600,
  color: "var(--text-secondary)",
  marginBottom: "4px",
};

function WhatsAppIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M22 7l-10 7L2 7" />
    </svg>
  );
}

function BackArrow() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="12 19 5 12 12 5" />
    </svg>
  );
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function ContactPage({ t, onBack }: ContactPageProps) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [emailError, setEmailError] = useState("");
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error" | "ratelimit"
  >("idle");
  const { containerRef: hcaptchaRef, token: hcaptchaToken, reset: resetHCaptcha } = useHCaptcha();

  const validateEmail = (email: string) => {
    if (!email) return "";
    return EMAIL_RE.test(email) ? "" : t.contact_email_invalid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const err = validateEmail(form.email);
    if (err) { setEmailError(err); return; }
    if (!hcaptchaToken) return;
    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          name: form.name,
          email: form.email,
          subject: form.subject,
          message: form.message,
          "h-captcha-response": hcaptchaToken,
        }),
      });
      if (res.status === 429) {
        setStatus("ratelimit");
      } else if (res.ok) {
        const data = await res.json();
        if (data.success) {
          setStatus("success");
          setForm({ name: "", email: "", subject: "", message: "" });
          resetHCaptcha();
        } else {
          setStatus("error");
        }
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}`;

  return (
    <div
      style={{
        position: "relative",
        minHeight: "100vh",
        background: "var(--bg-alt)",
        fontFamily: "var(--font-sans)",
        overflow: "hidden",
      }}
    >
      {/* 3D background */}
      <Suspense fallback={null}>
        <ContactScene />
      </Suspense>

      {/* Top bar */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          background: "rgba(255,255,255,0.85)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderBottom: "1px solid var(--border)",
          padding: "16px 0",
        }}
      >
        <div
          className="container"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <button
            onClick={onBack}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "none",
              border: "none",
              color: "var(--text-secondary)",
              fontSize: "14px",
              fontWeight: 500,
              fontFamily: "var(--font-sans)",
              padding: "6px 0",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = "var(--text)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "var(--text-secondary)")
            }
          >
            <BackArrow />
            {t.back}
          </button>
          <button
            onClick={onBack}
            style={{
              background: "none",
              border: "none",
              padding: 0,
              cursor: "pointer",
              fontWeight: 700,
              fontSize: "16px",
              letterSpacing: "-0.5px",
              fontFamily: "inherit",
              color: "inherit",
            }}
          >
            Showcase
            <span
              style={{
                color: "var(--text-tertiary)",
                fontWeight: 400,
              }}
            >
              {" "}
              Studio
            </span>
          </button>
        </div>
      </div>

      {/* Page content */}
      <div
        className="container"
        style={{
          position: "relative",
          zIndex: 1,
          padding: "60px 24px 100px",
          maxWidth: "820px",
        }}
      >
        {/* Heading */}
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <div
            style={{
              width: "60px",
              height: "6px",
              borderRadius: "3px",
              background:
                "linear-gradient(90deg, var(--rose), var(--orange))",
              margin: "0 auto 20px",
            }}
          />
          <h1
            style={{
              fontSize: "clamp(26px, 3.5vw, 38px)",
              fontWeight: 700,
              letterSpacing: "-0.025em",
              lineHeight: 1.1,
              marginBottom: "14px",
            }}
          >
            {t.contact_title}
          </h1>
          <p
            style={{
              fontSize: "15px",
              color: "var(--text-secondary)",
              lineHeight: 1.7,
              maxWidth: "480px",
              margin: "0 auto",
            }}
          >
            {t.contact_subtitle}
          </p>
        </div>

        {/* Two-column layout */}
        <div
          className="contact-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "28px",
          }}
        >
          {/* LEFT: Form or Success */}
          {status === "success" ? (
            <div
              style={{
                background: "rgba(255,255,255,0.9)",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
                borderRadius: "var(--radius)",
                padding: "48px 24px",
                boxShadow: "0 2px 24px rgba(0,0,0,0.06)",
                border: "1px solid var(--border-light)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                gap: "16px",
              }}
            >
              <div
                style={{
                  width: "56px",
                  height: "56px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, var(--rose), var(--magenta))",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h3 style={{ fontSize: "18px", fontWeight: 700, letterSpacing: "-0.01em" }}>
                {t.contact_success}
              </h3>
              <button
                onClick={() => setStatus("idle")}
                style={{
                  marginTop: "8px",
                  padding: "10px 28px",
                  background: "none",
                  border: "1.5px solid var(--border)",
                  borderRadius: "var(--radius-sm)",
                  fontSize: "13px",
                  fontWeight: 600,
                  fontFamily: "var(--font-sans)",
                  color: "var(--text-secondary)",
                  cursor: "pointer",
                  transition: "border-color 0.2s, color 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--text)";
                  e.currentTarget.style.color = "var(--text)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--border)";
                  e.currentTarget.style.color = "var(--text-secondary)";
                }}
              >
                {t.contact_send_another}
              </button>
            </div>
          ) : (
          <form
            onSubmit={handleSubmit}
            style={{
              background: "rgba(255,255,255,0.9)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              borderRadius: "var(--radius)",
              padding: "24px",
              boxShadow: "0 2px 24px rgba(0,0,0,0.06)",
              border: "1px solid var(--border-light)",
            }}
          >
            <h3
              style={{
                fontSize: "16px",
                fontWeight: 700,
                marginBottom: "18px",
                letterSpacing: "-0.01em",
              }}
            >
              {t.contact_form_title}
            </h3>

            <div style={{ marginBottom: "12px" }}>
              <label style={labelStyle}>{t.contact_name} *</label>
              <input
                type="text"
                name="name"
                required
                value={form.name}
                onChange={handleChange}
                style={inputStyle}
                onFocus={(e) =>
                  (e.currentTarget.style.borderColor = "var(--indigo)")
                }
                onBlur={(e) =>
                  (e.currentTarget.style.borderColor = "var(--border)")
                }
              />
            </div>

            <div style={{ marginBottom: "12px" }}>
              <label style={labelStyle}>{t.contact_email_label} *</label>
              <input
                type="email"
                name="email"
                required
                value={form.email}
                onChange={(e) => {
                  handleChange(e);
                  if (emailError) setEmailError(validateEmail(e.target.value));
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = emailError ? "var(--rose)" : "var(--border)";
                  setEmailError(validateEmail(form.email));
                }}
                style={{
                  ...inputStyle,
                  borderColor: emailError ? "var(--rose)" : undefined,
                }}
                onFocus={(e) =>
                  (e.currentTarget.style.borderColor = emailError ? "var(--rose)" : "var(--indigo)")
                }
              />
              {emailError && (
                <p style={{ fontSize: "12px", color: "var(--rose)", marginTop: "4px" }}>
                  {emailError}
                </p>
              )}
            </div>

            <div style={{ marginBottom: "12px" }}>
              <label style={labelStyle}>{t.contact_subject} *</label>
              <input
                type="text"
                name="subject"
                required
                value={form.subject}
                onChange={handleChange}
                style={inputStyle}
                onFocus={(e) =>
                  (e.currentTarget.style.borderColor = "var(--indigo)")
                }
                onBlur={(e) =>
                  (e.currentTarget.style.borderColor = "var(--border)")
                }
              />
            </div>

            <div style={{ marginBottom: "18px" }}>
              <label style={labelStyle}>{t.contact_message} *</label>
              <textarea
                name="message"
                required
                rows={4}
                value={form.message}
                onChange={handleChange}
                style={{ ...inputStyle, resize: "vertical" }}
                onFocus={(e) =>
                  (e.currentTarget.style.borderColor = "var(--indigo)")
                }
                onBlur={(e) =>
                  (e.currentTarget.style.borderColor = "var(--border)")
                }
              />
            </div>

            {/* Honeypot — hidden from humans, catches bots */}
            <input
              type="text"
              name="botcheck"
              style={{ display: "none" }}
              tabIndex={-1}
              autoComplete="off"
            />

            {/* hCaptcha — verified server-side by Web3Forms */}
            <div ref={hcaptchaRef} style={{ marginBottom: "18px" }} />

            <button
              type="submit"
              disabled={status === "sending" || !hcaptchaToken}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                padding: "12px 20px",
                background:
                  "linear-gradient(135deg, var(--rose), var(--magenta))",
                color: "#fff",
                border: "none",
                borderRadius: "var(--radius-sm)",
                fontSize: "13px",
                fontWeight: 600,
                fontFamily: "var(--font-sans)",
                cursor: status === "sending" ? "wait" : "pointer",
                opacity: status === "sending" || !hcaptchaToken ? 0.5 : 1,
                transition: "opacity 0.2s, transform 0.2s",
                boxShadow: "0 4px 20px rgba(225, 29, 72, 0.3)",
              }}
              onMouseEnter={(e) => {
                if (status !== "sending" && hcaptchaToken) {
                  e.currentTarget.style.opacity = "0.9";
                  e.currentTarget.style.transform = "translateY(-1px)";
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity =
                  status === "sending" || !hcaptchaToken ? "0.5" : "1";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              {status === "sending" ? t.contact_sending : t.contact_send}
            </button>

            {status === "error" && (
              <p
                style={{
                  marginTop: "12px",
                  fontSize: "13px",
                  color: "var(--rose)",
                  fontWeight: 500,
                  textAlign: "center",
                }}
              >
                {t.contact_error}
              </p>
            )}
            {status === "ratelimit" && (
              <p
                style={{
                  marginTop: "12px",
                  fontSize: "13px",
                  color: "var(--orange)",
                  fontWeight: 500,
                  textAlign: "center",
                }}
              >
                {t.contact_ratelimit}
              </p>
            )}
          </form>
          )}

          {/* RIGHT: WhatsApp + Email */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            <h3
              style={{
                fontSize: "16px",
                fontWeight: 700,
                letterSpacing: "-0.01em",
              }}
            >
              {t.contact_direct_title}
            </h3>

            {/* WhatsApp card */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "14px",
                padding: "20px",
                background: "rgba(255,255,255,0.9)",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
                borderRadius: "var(--radius)",
                boxShadow: "0 2px 24px rgba(0,0,0,0.06)",
                border: "1px solid var(--border-light)",
                transition: "transform 0.2s, box-shadow 0.2s",
                textDecoration: "none",
                color: "inherit",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow =
                  "0 8px 32px rgba(0,0,0,0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 2px 24px rgba(0,0,0,0.06)";
              }}
            >
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "50%",
                  background: "#25D366",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  flexShrink: 0,
                }}
              >
                <WhatsAppIcon />
              </div>
              <div>
                <div
                  style={{
                    fontSize: "15px",
                    fontWeight: 700,
                    marginBottom: "3px",
                  }}
                >
                  {t.contact_whatsapp}
                </div>
                <div
                  style={{
                    fontSize: "12px",
                    color: "var(--text-secondary)",
                    lineHeight: 1.5,
                  }}
                >
                  {t.contact_whatsapp_desc}
                </div>
              </div>
            </a>

            {/* Email card */}
            <a
              href={`mailto:${t.contact_email}`}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "14px",
                padding: "20px",
                background: "rgba(255,255,255,0.9)",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
                borderRadius: "var(--radius)",
                boxShadow: "0 2px 24px rgba(0,0,0,0.06)",
                border: "1px solid var(--border-light)",
                transition: "transform 0.2s, box-shadow 0.2s",
                textDecoration: "none",
                color: "inherit",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow =
                  "0 8px 32px rgba(0,0,0,0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 2px 24px rgba(0,0,0,0.06)";
              }}
            >
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "50%",
                  background:
                    "linear-gradient(135deg, var(--rose), var(--magenta))",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  flexShrink: 0,
                }}
              >
                <MailIcon />
              </div>
              <div>
                <div
                  style={{
                    fontSize: "15px",
                    fontWeight: 700,
                    marginBottom: "3px",
                  }}
                >
                  {t.contact_cta}
                </div>
                <div
                  style={{
                    fontSize: "12px",
                    fontFamily: "var(--font-mono)",
                    color: "var(--text-tertiary)",
                  }}
                >
                  {t.contact_email}
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
