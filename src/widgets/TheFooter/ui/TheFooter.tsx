import { contacts } from "@/shared/content";
import { Logo } from "@/shared/ui/Logo";
import { ArrowUp } from "lucide-react";
import { getTranslations } from "next-intl/server";

export default async function TheFooter() {
  const t = await getTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-5 px-5 py-8 text-sm text-muted-foreground sm:flex-row md:px-8">
        <div className="flex items-center gap-4">
          <Logo />
          <span>
            © {year} · {t("rights")}
          </span>
        </div>
        <div className="flex items-center gap-5">
          <a href={contacts.telegram} target="_blank" rel="noopener noreferrer" className="hover:text-foreground">
            Telegram
          </a>
          <a href={contacts.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-foreground">
            LinkedIn
          </a>
          <a href="#top" className="group inline-flex items-center gap-1.5 hover:text-foreground">
            {t("top")}
            <ArrowUp className="size-3.5 transition-transform group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
