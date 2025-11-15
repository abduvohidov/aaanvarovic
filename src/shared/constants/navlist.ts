export interface NavListType {
  href: string;
  label: string;
}
[];

export const navlist = (t: (key: string) => string): NavListType[] => [
  { href: "https://www.notion.so/2a05002e18148040b33dce19c3da9ea7?source=copy_link", label: "CV" },
  { href: "/", label: t("main") },
  // { href: "/experience", label: t("experience") },
  // { href: "/projects", label: t("projects") },
];
