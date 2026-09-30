export interface NavListType {
  id: string;
  label: string;
}

export const SECTION_IDS = ["about", "experience", "projects", "skills", "contact"] as const;

export const navlist = (t: (key: (typeof SECTION_IDS)[number]) => string): NavListType[] =>
  SECTION_IDS.map((id) => ({ id, label: t(id) }));
