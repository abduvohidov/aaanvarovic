import { useTranslations } from "next-intl";

export interface JobModel {
  name: string;
  description: string;
  slug: string;
}
export function useJobs(): { data: JobModel[] } {
  const t = useTranslations("Job");

  const data = [
    {
      name: "Project Management",
      description:
        "3 года опыта в IT. Работал в компаниях Faktura и IT Park в сфере разработки. Обучаюсь управлению IT-проектами в Яндекс.Практикум и ищу интересные проекты для старта карьеры менеджера IT-проектов.",
      slug: "/portfolio/project-management",
    },
    {
      name: "Software Engineering",
      description:
        "3 года опыта в IT. Работал в компаниях Faktura и IT Park в сфере разработки. Обучаюсь управлению IT-проектами в Яндекс.Практикум и ищу интересные проекты для старта карьеры менеджера IT-проектов.",
      slug: "/portfolio/software-engineering",
    },
  ];

  return { data };
}
