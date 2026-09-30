import { FC } from "react";
import { getLocale, getTranslations } from "next-intl/server";
import { navlist } from "@/shared/constants/navlist";
import { HeaderBar } from "./HeaderBar";

export const TheHeader: FC = async () => {
  const t = await getTranslations("nav");
  const locale = await getLocale();

  return (
    <HeaderBar
      locale={locale}
      navlist={navlist(t)}
      labels={{ menu: t("menu"), close: t("close"), theme: t("theme"), language: t("language") }}
    />
  );
};
