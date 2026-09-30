import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";
import { DEFAULT_LOCALE, isLocale } from "@/shared/content/types";

export default getRequestConfig(async () => {
  const cookieStore = await cookies();
  const value = cookieStore.get("language")?.value;
  const locale = isLocale(value) ? value : DEFAULT_LOCALE;

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});
