"use server";
import { cookies } from "next/headers";
import { isLocale } from "@/shared/content/types";

export async function setLanguageValue(value: string) {
  if (!isLocale(value)) return;
  const cookieStore = await cookies();
  cookieStore.set("language", value, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  });
}
