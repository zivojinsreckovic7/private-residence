import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteLoader } from "@/components/layout/site-loader";
import { SiteHeader } from "@/components/layout/site-header";
import { cormorant, geist } from "@/lib/fonts";
import { LANGS, LANG_TAGS, isLang, localePath } from "@/lib/i18n";
import { alternates, ogImages } from "@/lib/metadata";
import { TAGLINE, site, siteTitle } from "@/lib/site";
import "../globals.css";

/**
 * Both editions are static. `[lang]` is a root parameter, so this is the one
 * place that has to enumerate them.
 */
export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) notFound();

  const title = siteTitle(lang);
  const description = TAGLINE[lang];

  return {
    metadataBase: new URL(site.url),
    title: { default: title, template: `%s | ${site.fullName}` },
    description,
    alternates: alternates("/", lang),
    openGraph: {
      title,
      description,
      // The edition being rendered, not the English home page: a Serbian
      // page shared to a social card should open in Serbian.
      url: `${site.url}${localePath("/", lang)}`,
      siteName: site.fullName,
      images: ogImages(lang),
      locale: LANG_TAGS[lang].replace(/-/g, "_"),
      type: "website",
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();

  return (
    <html
      lang={LANG_TAGS[lang]}
      className={`${geist.variable} ${cormorant.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <SiteLoader />
        <SiteHeader lang={lang} />
        <main className="flex-1">{children}</main>
        <SiteFooter lang={lang} />
        {/* Fixed, non-interactive, rasterised once. See globals.css. */}
        <div aria-hidden className="grain" />
      </body>
    </html>
  );
}
