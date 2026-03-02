import type { Translations } from "./i18n";

export type Lang = "en" | "it" | "es";

export interface Project {
  id: string;
  slug: string;
  titleKey: keyof Translations;
  descKey: keyof Translations;
  tagsKey: keyof Translations;
  color: string;
  challenge: string;
  solution: string;
  results: string[];
}

export type TemplateCategory =
  | "ecommerce"
  | "portfolio"
  | "landing"
  | "saas"
  | "restaurant"
  | "blog";

export interface Template {
  id: string;
  titleKey: keyof Translations;
  descKey: keyof Translations;
  featuresKey: keyof Translations;
  category: TemplateCategory;
  color: string;
  images?: string[];
}

export interface ProcessStep {
  titleKey: keyof Translations;
  descKey: keyof Translations;
  num: string;
  color: string;
}

export interface Service {
  titleKey: keyof Translations;
  descKey: keyof Translations;
  color: string;
}

export const projects: Project[] = [
  {
    id: "luxe",
    slug: "luxe-timepieces",
    titleKey: "project_luxe_title",
    descKey: "project_luxe_desc",
    tagsKey: "project_luxe_tags",
    color: "#d4a017",
    challenge: "Luxe Timepieces needed to convey the craftsmanship and precision of their watches online, matching the in-store experience.",
    solution: "We built a 360-degree product viewer with photorealistic rendering, cinematic scroll-triggered animations, and a virtual try-on feature.",
    results: ["+340% time on product pages", "+180% online sales", "92% satisfaction"],
  },
  {
    id: "aura",
    slug: "aura-skincare",
    titleKey: "project_aura_title",
    descKey: "project_aura_desc",
    tagsKey: "project_aura_tags",
    color: "#e11d48",
    challenge: "Aura Skincare wanted to educate customers about ingredients while making the shopping experience feel personal and curated.",
    solution: "An ingredient explorer with interactive molecule visualizations, a skin-type quiz, and a personalized routine builder with one-click checkout.",
    results: ["+250% conversion rate", "+420% return visitors", "4.9/5 rating"],
  },
  {
    id: "terra",
    slug: "terra-outdoor",
    titleKey: "project_terra_title",
    descKey: "project_terra_desc",
    tagsKey: "project_terra_tags",
    color: "#0d9668",
    challenge: "Terra Outdoor had 2000+ SKUs and needed a catalog that felt adventurous, not overwhelming.",
    solution: "Immersive environment-based navigation where products are shown in context, with smart filters, real-time stock, and expedition guides.",
    results: ["+190% engagement", "-45% bounce rate", "+85% avg order value"],
  },
  {
    id: "volt",
    slug: "volt-electronics",
    titleKey: "project_volt_title",
    descKey: "project_volt_desc",
    tagsKey: "project_volt_tags",
    color: "#0891b2",
    challenge: "Volt Electronics needed to present complex tech specs in a way that both enthusiasts and casual buyers could appreciate.",
    solution: "Side-by-side comparison tools, video review integration, dynamic spec highlighting, and AI-powered product recommendations.",
    results: ["+210% tool usage", "+155% conversion", "-60% support tickets"],
  },
  {
    id: "bloom",
    slug: "bloom-furniture",
    titleKey: "project_bloom_title",
    descKey: "project_bloom_desc",
    tagsKey: "project_bloom_tags",
    color: "#7c3aed",
    challenge: "Bloom Furniture needed customers to visualize pieces in their own spaces before committing to high-value purchases.",
    solution: "AR room planner with drag-and-drop placement, material/color customizer with real-time 3D rendering, and saved room projects.",
    results: ["+380% engagement", "-70% return rate", "+200% avg order"],
  },
  {
    id: "apex",
    slug: "apex-athletics",
    titleKey: "project_apex_title",
    descKey: "project_apex_desc",
    tagsKey: "project_apex_tags",
    color: "#dc2626",
    challenge: "Apex Athletics wanted to blend brand storytelling with performance data to create an emotional connection with athletes.",
    solution: "Athlete story integrations, AI-powered size recommendations from body measurements, collection lookbooks with shop-the-look features.",
    results: ["+290% engagement", "-55% size returns", "+175% social shares"],
  },
];

export const services: Service[] = [
  { titleKey: "service_showcase_title", descKey: "service_showcase_desc", color: "#4f46e5" },
  { titleKey: "service_ecommerce_title", descKey: "service_ecommerce_desc", color: "#0891b2" },
  { titleKey: "service_interactive_title", descKey: "service_interactive_desc", color: "#7c3aed" },
  { titleKey: "service_brand_title", descKey: "service_brand_desc", color: "#0d9668" },
];

export const processSteps: ProcessStep[] = [
  { titleKey: "step_discover_title", descKey: "step_discover_desc", num: "01", color: "#4f46e5" },
  { titleKey: "step_design_title", descKey: "step_design_desc", num: "02", color: "#7c3aed" },
  { titleKey: "step_develop_title", descKey: "step_develop_desc", num: "03", color: "#0891b2" },
  { titleKey: "step_deploy_title", descKey: "step_deploy_desc", num: "04", color: "#0d9668" },
];

export const templates: Template[] = [
  { id: "nova", titleKey: "tpl_nova_title", descKey: "tpl_nova_desc", featuresKey: "tpl_nova_features", category: "ecommerce", color: "#d4a017", images: ["/templates/nova-desktop.png", "/templates/nova-mobile.png"] },
  { id: "ember", titleKey: "tpl_ember_title", descKey: "tpl_ember_desc", featuresKey: "tpl_ember_features", category: "portfolio", color: "#e11d48", images: ["/templates/ember-desktop.png", "/templates/ember-mobile.png"] },
  { id: "zenith", titleKey: "tpl_zenith_title", descKey: "tpl_zenith_desc", featuresKey: "tpl_zenith_features", category: "landing", color: "#0891b2", images: ["/templates/zenith-desktop.png", "/templates/zenith-mobile.png"] },
  { id: "pulse", titleKey: "tpl_pulse_title", descKey: "tpl_pulse_desc", featuresKey: "tpl_pulse_features", category: "saas", color: "#7c3aed", images: ["/templates/pulse-desktop.png", "/templates/pulse-mobile.png"] },
  { id: "saveur", titleKey: "tpl_saveur_title", descKey: "tpl_saveur_desc", featuresKey: "tpl_saveur_features", category: "restaurant", color: "#0d9668", images: ["/templates/saveur-desktop.png", "/templates/saveur-mobile.png"] },
  { id: "chronicle", titleKey: "tpl_chronicle_title", descKey: "tpl_chronicle_desc", featuresKey: "tpl_chronicle_features", category: "blog", color: "#e11d48", images: ["/templates/chronicle-desktop.png", "/templates/chronicle-mobile.png"] },
  { id: "vertex", titleKey: "tpl_vertex_title", descKey: "tpl_vertex_desc", featuresKey: "tpl_vertex_features", category: "ecommerce", color: "#4f46e5", images: ["/templates/vertex-desktop.png", "/templates/vertex-mobile.png"] },
  { id: "artisan", titleKey: "tpl_artisan_title", descKey: "tpl_artisan_desc", featuresKey: "tpl_artisan_features", category: "portfolio", color: "#d4a017", images: ["/templates/artisan-desktop.png", "/templates/artisan-mobile.png"] },
];

export const categoryFilterKeys: Record<"all" | TemplateCategory, keyof Translations> = {
  all: "templates_filter_all",
  ecommerce: "templates_filter_ecommerce",
  portfolio: "templates_filter_portfolio",
  landing: "templates_filter_landing",
  saas: "templates_filter_saas",
  restaurant: "templates_filter_restaurant",
  blog: "templates_filter_blog",
};

const statColors = ["#4f46e5", "#0891b2", "#7c3aed", "#0d9668"];
export const stats = [
  { value: "120+", labelKey: "stats_projects" as keyof Translations, color: statColors[0] },
  { value: "85+", labelKey: "stats_clients" as keyof Translations, color: statColors[1] },
  { value: "30+", labelKey: "stats_countries" as keyof Translations, color: statColors[2] },
  { value: "99.9%", labelKey: "stats_uptime" as keyof Translations, color: statColors[3] },
];

export const langLabels: Record<Lang, string> = { en: "EN", it: "IT", es: "ES" };
