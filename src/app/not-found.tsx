import { getTranslations } from "next-intl/server";
import Link from "next/link";

export default async function NotFound() {
  const t = await getTranslations("notFound");
  return (
    <section className="flex min-h-[80svh] flex-col items-center justify-center px-5 text-center">
      <p className="text-gradient font-mono text-8xl font-bold md:text-9xl">404</p>
      <h1 className="mt-4 text-2xl font-semibold">{t("title")}</h1>
      <Link
        href="/"
        className="mt-8 inline-flex h-11 items-center rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground"
      >
        {t("back")}
      </Link>
    </section>
  );
}
