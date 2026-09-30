import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Manrope } from "next/font/google";
import "./styles/global.css";
import { ThemeProvider } from "../shared/providers/ThemeProvider";
import { TheHeader } from "@/widgets/TheHeader";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages, getTranslations } from "next-intl/server";
import TheFooter from "@/widgets/TheFooter/ui/TheFooter";
import { Background, ScrollProgress } from "@/shared/ui/motion";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "cyrillic"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin", "cyrillic"],
});

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("meta");
  return {
    title: { default: t("title"), template: `%s — ${t("title")}` },
    description: t("description"),
    openGraph: {
      title: t("title"),
      description: t("description"),
      images: ["/photo.jpeg"],
      type: "profile",
    },
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0b0b12" },
    { media: "(prefers-color-scheme: light)", color: "#fbfbfd" },
  ],
};

type RootLayoutTypeProps = Readonly<{ children: React.ReactNode }>;

export default async function RootLayout({ children }: RootLayoutTypeProps) {
  const locale = await getLocale();
  const messages = await getMessages();
  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${manrope.variable} ${jetbrains.variable} antialiased`}>
        <div id="top" />
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          <NextIntlClientProvider messages={messages}>
            <ScrollProgress />
            <Background />
            <TheHeader />
            {/* keyed by locale so scroll-reveal animations replay with the new text */}
            <main key={locale} className="overflow-x-clip">
              {children}
            </main>
            <TheFooter />
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
