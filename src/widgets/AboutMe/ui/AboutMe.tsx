import { Button } from "@/shared/ui/button";
import { Separator } from "@/shared/ui/separator";
import { Text } from "@/shared/ui/Text";
import { MessageCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import Photo from "../../../../public/photo.jpeg";
import { cn } from "@/shared/lib/cn";
import { useTranslations } from "next-intl";

interface AboutMeProps {
  className?: string;
}

export const AboutMe: FC<AboutMeProps> = ({ className }) => {
  const t = useTranslations("main");
  return (
    <div className="flex lg:justify-center max-lg:flex-col items-center gap-10 sm:my-50">
      <Image
        src={Photo}
        alt="photo"
        className="rounded-xl w-[300px] h-auto"
        objectFit="contain"
      />
      <div
        className={cn(
          className,
          "xl:w-[35%] lg:w-[50%] sm:w-[70%] max-sm:px-10"
        )}
      >
        <div className="space-y-1">
          <Text variant="display-4">{t("name")}</Text>
          <Text variant="body-2" className="text-gray-400 mt-4">
            {t("aboutme")}
          </Text>
        </div>

        <Link
          href={"https://t.me/aaanvarovic"}
          className="block sm:hidden mt-4"
        >
          <Button className="w-full text-blue-400 hover:bg-blue-400 hover:text-white">
            <MessageCircle />
            {t("chatWithMe")}
          </Button>
        </Link>

        <Separator className="my-4" />
        <div className="flex h-5 items-center space-x-4 text-sm">
          <Link
            href={"https://t.me/aaanvarovic"}
            className="hidden sm:block"
          >
            <Button className="w-full text-blue-400 hover:bg-blue-400 hover:text-white">
              <MessageCircle />
              {t("chatWithMe")}
            </Button>
          </Link>
          <Separator orientation="vertical" className="hidden sm:block" />
          <Link href={"https://www.notion.so/2a05002e18148040b33dce19c3da9ea7?source=copy_link"} target="_blank">
            <Text variant="body-1" className="text-gray-400 hover:text-white">
              CV
            </Text>
          </Link>
          <Separator orientation="vertical" />
          <Link href={"https://www.linkedin.com/in/abdulloh-abduvohidov-5a79b325a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"} target="_blank">
            <Text variant="body-1" className="text-gray-400 hover:text-white">
              LinkedIn
            </Text>
          </Link>
          <Separator orientation="vertical" />
          <Link href={"tel:+998974250080"} target="_blank">
            <Text variant="body-1" className="text-gray-400 hover:text-white">
              +998 97 425 00 80
            </Text>
          </Link>
        </div>
      </div>
    </div>
  );
};
