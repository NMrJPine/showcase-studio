import { useRef, useCallback, useEffect, useState } from "react";
import type { Translations } from "../i18n";
import { stats } from "../data";
import { useParallax } from "../hooks/useParallax";

interface StatsProps {
  t: Translations;
}

function parseStatValue(value: string): { end: number; prefix: string; suffix: string } {
  const match = value.match(/^([^\d]*)(\d+(?:\.\d+)?)(.*)$/);
  if (!match) return { end: 0, prefix: "", suffix: value };
  return { prefix: match[1], end: parseFloat(match[2]), suffix: match[3] };
}

function useCountUp(end: number, duration: number, started: boolean): number {
  const [current, setCurrent] = useState(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (!started) return;
    const startTime = performance.now();
    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCurrent(eased * end);
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [end, duration, started]);

  return current;
}

function StatCard({
  stat,
  index,
  t,
  visible,
  setValRef,
}: {
  stat: (typeof stats)[number];
  index: number;
  t: Translations;
  visible: boolean;
  setValRef: (el: HTMLDivElement | null, i: number) => void;
}) {
  const parsed = parseStatValue(stat.value);
  const count = useCountUp(parsed.end, 1800 + index * 200, visible);
  const hasDecimal = parsed.end % 1 !== 0;
  const display = `${parsed.prefix}${hasDecimal ? count.toFixed(1) : Math.floor(count)}${parsed.suffix}`;

  return (
    <div
      className={`fade-in d${index}`}
      style={{
        textAlign: "center",
        padding: "28px 16px",
        background: stat.color,
        borderRadius: "var(--radius)",
        transition: "transform 0.2s, box-shadow 0.2s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.boxShadow = `0 8px 24px ${stat.color}40`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <div
        ref={(el) => setValRef(el, index)}
        style={{
          fontSize: "clamp(28px, 4.5vw, 42px)",
          fontWeight: 800,
          fontFamily: "var(--font-mono)",
          color: "#fff",
          letterSpacing: "-0.03em",
          lineHeight: 1.1,
        }}
      >
        {display}
      </div>
      <div
        style={{
          fontSize: "13px",
          color: "rgba(255,255,255,0.8)",
          fontWeight: 500,
          marginTop: "10px",
        }}
      >
        {t[stat.labelKey]}
      </div>
    </div>
  );
}

export function Stats({ t }: StatsProps) {
  const valRefs = useRef<(HTMLDivElement | null)[]>([]);
  const offsets = useRef<number[]>(stats.map(() => 0));
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  const setValRef = useCallback((el: HTMLDivElement | null, i: number) => {
    valRefs.current[i] = el;
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useParallax(() => {
    const viewH = window.innerHeight;
    valRefs.current.forEach((el, i) => {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const centerY = rect.top + rect.height / 2;
      const delta = (centerY - viewH / 2) * 0.04;
      offsets.current[i] += (delta - offsets.current[i]) * 0.3;
      el.style.transform = `translateY(${offsets.current[i]}px)`;
    });
  });

  return (
    <section
      ref={sectionRef}
      style={{
        padding: "48px 0",
        background: "var(--bg-alt)",
      }}
    >
      <div
        className="container"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "16px",
        }}
      >
        {stats.map((stat, i) => (
          <StatCard
            key={stat.labelKey}
            stat={stat}
            index={i}
            t={t}
            visible={visible}
            setValRef={setValRef}
          />
        ))}
      </div>

      <style>{`
        @media (max-width: 640px) {
          section > .container { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </section>
  );
}
