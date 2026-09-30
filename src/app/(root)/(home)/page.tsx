import { getContent } from "@/shared/content";
import { About } from "@/widgets/About";
import { Contact } from "@/widgets/Contact";
import { Experience } from "@/widgets/Experience";
import { Hero } from "@/widgets/Hero";
import { Projects } from "@/widgets/Projects";
import { Skills } from "@/widgets/Skills";
import { getLocale, getTranslations } from "next-intl/server";

export default async function Home() {
  const locale = await getLocale();
  const content = getContent(locale);
  const [tHero, tAbout, tExp, tProjects, tSkills, tContact] = await Promise.all([
    getTranslations("hero"),
    getTranslations("about"),
    getTranslations("experience"),
    getTranslations("projects"),
    getTranslations("skills"),
    getTranslations("contact"),
  ]);

  return (
    <>
      <Hero
        content={content}
        labels={{
          writeTelegram: tHero("writeTelegram"),
          viewCases: tHero("viewCases"),
          downloadCv: tHero("downloadCv"),
          scroll: tHero("scroll"),
        }}
      />
      <About
        content={content}
        labels={{ eyebrow: tAbout("eyebrow"), title: tAbout("title"), processTitle: tAbout("processTitle") }}
      />
      <Experience
        jobs={content.jobs}
        projects={content.projects.map(({ slug, name }) => ({ slug, name }))}
        labels={{
          eyebrow: tExp("eyebrow"),
          title: tExp("title"),
          current: tExp("current"),
          responsibilities: tExp("responsibilities"),
          showMore: tExp("showMore"),
          showLess: tExp("showLess"),
          projects: tExp("projects"),
          tools: tExp("tools"),
        }}
      />
      <Projects
        projects={content.projects}
        labels={{
          eyebrow: tProjects("eyebrow"),
          title: tProjects("title"),
          subtitle: tProjects("subtitle"),
          open: tProjects("open"),
          featured: tProjects("featured"),
        }}
      />
      <Skills
        content={content}
        labels={{
          eyebrow: tSkills("eyebrow"),
          title: tSkills("title"),
          ai: tSkills("ai"),
          languages: tSkills("languages"),
          education: tSkills("education"),
          certificates: tSkills("certificates"),
          baseEducation: tSkills("baseEducation"),
        }}
      />
      <Contact
        labels={{
          eyebrow: tContact("eyebrow"),
          title: tContact("title"),
          text: tContact("text"),
          telegram: tContact("telegram"),
          phone: tContact("phone"),
          email: tContact("email"),
          linkedin: tContact("linkedin"),
          copy: tContact("copy"),
          copied: tContact("copied"),
          downloadCv: tContact("downloadCv"),
        }}
      />
    </>
  );
}
