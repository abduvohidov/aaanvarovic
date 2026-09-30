import { getContent } from "@/shared/content";
import { CaseStudy } from "@/widgets/CaseStudy";
import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const project = getContent(await getLocale()).projects.find((p) => p.slug === slug);
  if (!project) return {};
  return { title: project.name, description: project.tagline };
}

export default async function ProjectPage({ params }: { params: Params }) {
  const { slug } = await params;
  const locale = await getLocale();
  const { projects } = getContent(locale);
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) notFound();

  const project = projects[index];
  const next = projects[(index + 1) % projects.length];
  const [t, tHero] = await Promise.all([getTranslations("case"), getTranslations("hero")]);

  return (
    <CaseStudy
      project={project}
      next={next}
      labels={{
        back: t("back"),
        company: t("company"),
        role: t("role"),
        period: t("period"),
        status: t("status"),
        tasks: t("tasks"),
        results: t("results"),
        tools: t("tools"),
        products: t("products"),
        next: t("next"),
        cta: t("cta"),
        writeTelegram: tHero("writeTelegram"),
      }}
    />
  );
}
