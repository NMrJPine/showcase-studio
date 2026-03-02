import { useState, useRef, useEffect, useCallback } from "react";
import { translations } from "./i18n";
import type { Lang, Project } from "./data";
import { projects } from "./data";
import { useFadeIn } from "./hooks/useFadeIn";
import { Navbar } from "./components/Navbar";
import { Hero } from "./sections/Hero";
import { Stats } from "./sections/Stats";
import { Services } from "./sections/Services";
import { Portfolio } from "./sections/Portfolio";
import { Templates } from "./sections/Templates";
import { Process } from "./sections/Process";
import { Contact } from "./sections/Contact";
import { Footer } from "./sections/Footer";
import { ProjectDetail } from "./sections/ProjectDetail";
import { ContactPage } from "./sections/ContactPage";

type Route =
  | { page: "home" }
  | { page: "contact" }
  | { page: "project"; project: Project };

function parsePath(path: string): Route {
  if (path === "/contact") return { page: "contact" };
  const projectMatch = path.match(/^\/project\/(.+)$/);
  if (projectMatch) {
    const project = projects.find((p) => p.slug === projectMatch[1]);
    if (project) return { page: "project", project };
  }
  return { page: "home" };
}

function routeToPath(route: Route): string {
  switch (route.page) {
    case "contact":
      return "/contact";
    case "project":
      return `/project/${route.project.slug}`;
    default:
      return "/";
  }
}

function ScrollProgressBar() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const h = () => {
      if (!ref.current) return;
      const s = window.scrollY;
      const d = document.documentElement.scrollHeight - window.innerHeight;
      ref.current.style.width = `${d > 0 ? (s / d) * 100 : 0}%`;
    };
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);
  return (
    <div
      ref={ref}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        height: "3px",
        width: "0%",
        background:
          "linear-gradient(90deg, var(--hot-pink), var(--yellow), var(--electric-blue), var(--aqua), var(--magenta))",
        zIndex: 9999,
      }}
    />
  );
}

function SectionDivider() {
  return (
    <div
      style={{
        height: "2px",
        background:
          "linear-gradient(90deg, transparent 5%, var(--hot-pink), var(--yellow), var(--electric-blue), transparent 95%)",
      }}
    />
  );
}

export function App() {
  const [lang, setLang] = useState<Lang>("en");
  const [route, setRoute] = useState<Route>(() =>
    parsePath(window.location.pathname),
  );
  const t = translations[lang];

  useFadeIn();

  // Browser back/forward
  useEffect(() => {
    const onPop = () => setRoute(parsePath(window.location.pathname));
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const navigateTo = useCallback((r: Route) => {
    const path = routeToPath(r);
    history.pushState(null, "", path);
    setRoute(r);
    window.scrollTo(0, 0);
  }, []);

  if (route.page === "contact") {
    return <ContactPage t={t} onBack={() => navigateTo({ page: "home" })} />;
  }

  if (route.page === "project") {
    return (
      <ProjectDetail
        project={route.project}
        t={t}
        onBack={() => navigateTo({ page: "home" })}
      />
    );
  }

  return (
    <>
      <ScrollProgressBar />
      <Navbar t={t} lang={lang} onLangChange={setLang} />
      <main>
        <Hero t={t} />
        <SectionDivider />
        <Stats t={t} />
        <SectionDivider />
        <Services t={t} />
        <SectionDivider />
        <Portfolio
          t={t}
          onSelectProject={(p) =>
            navigateTo({ page: "project", project: p })
          }
        />
        <SectionDivider />
        <Templates t={t} />
        <SectionDivider />
        <Process t={t} />
        <SectionDivider />
        <Contact
          t={t}
          onOpenContact={() => navigateTo({ page: "contact" })}
        />
      </main>
      <Footer t={t} />
    </>
  );
}
