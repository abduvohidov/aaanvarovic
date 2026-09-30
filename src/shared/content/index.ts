import { en } from "./en";
import { ru } from "./ru";
import type { Content, Locale } from "./types";

export * from "./types";
export { contacts } from "./contacts";

const content: Record<Locale, Content> = { ru, en };

export function getContent(locale: string): Content {
  return content[locale as Locale] ?? ru;
}
