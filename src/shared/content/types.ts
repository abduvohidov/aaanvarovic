export const LOCALES = ["ru", "en"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "ru";

export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && (LOCALES as readonly string[]).includes(value);
}

export type Accent = "blue" | "violet" | "cyan" | "emerald" | "amber" | "rose";

export interface Stat {
  value: number;
  suffix?: string;
  label: string;
}

export interface ProcessStep {
  title: string;
  text: string;
}

export interface Project {
  slug: string;
  name: string;
  company: string;
  period: string;
  role: string;
  /** Short status chip, e.g. "В PROD" */
  status: string;
  tagline: string;
  summary: string;
  tasks: string[];
  results: string[];
  tools: string[];
  /** Optional list of sub-products (IT Park platforms) */
  products?: { name: string; text: string }[];
  accent: Accent;
  featured?: boolean;
}

export interface Job {
  id: string;
  company: string;
  url?: string;
  location?: string;
  role: string;
  period: string;
  duration: string;
  current?: boolean;
  badge?: string;
  summary: string;
  responsibilities: string[];
  tools: string[];
  projects: string[];
  note?: string;
}

export interface SkillGroup {
  title: string;
  items: string[];
}

export interface Course {
  year: string;
  title: string;
  org: string;
}

export interface Language {
  name: string;
  level: string;
  /** 0..1 for the progress bar */
  value: number;
}

export interface Content {
  name: string;
  firstName: string;
  role: string;
  location: string;
  currently: string;
  heroTitle: string;
  heroLead: string;
  stats: Stat[];
  about: string[];
  process: ProcessStep[];
  facts: { label: string; value: string }[];
  jobs: Job[];
  projects: Project[];
  skills: SkillGroup[];
  aiTools: string[];
  courses: Course[];
  certificates: Course[];
  languages: Language[];
  education: string;
}
