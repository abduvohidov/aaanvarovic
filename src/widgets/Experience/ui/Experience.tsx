import { SocialMediaListCard } from "@/features/SocialMediaListCard";
import { useJobs } from "@/shared/constants/jobs";
import { SocialModel, useSocials } from "@/shared/constants/socials";
import { cn } from "@/shared/lib/cn";
import { Text } from "@/shared/ui/Text";
import { useTranslations } from "next-intl";
import { FC } from "react";

interface ExperienceProps {
  className?: string;
}

export const Experience: FC<ExperienceProps> = ({ className }) => {
  const t = useTranslations("portfolio");
  const { data: professionals } = useJobs();

  if (!professionals || professionals.length === 0) return null;

  return (
    <div className={cn(className)}>
      <Text variant="display-3" className="text-center">
        {t("portfolio")}
      </Text>
      <Text
        variant="subheader-3"
        className="text-center text-ring mx-auto mt-2 md:w-2/6"
      >
        {t("toSocialLinks")}
      </Text>
      <div className="max-w-screen-sm mx-auto grid md:grid-cols-2 grid-cols-1 gap-6 md:mt-12 mt-4">
        
      </div>
    </div>
  );
};
