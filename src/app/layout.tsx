import type { Metadata } from "next";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteLoader } from "@/components/layout/site-loader";
import { SiteHeader } from "@/components/layout/site-header";
import { cormorant, geist } from "@/lib/fonts";
import { site } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.fullName}, ${site.location}`,
    template: `%s | ${site.fullName}`,
  },
  description: site.tagline,
  openGraph: {
    title: `${site.fullName}, ${site.location}`,
    description: site.tagline,
    url: site.url,
    siteName: site.fullName,
    locale: "en_GB",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geist.variable} ${cormorant.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <SiteLoader />
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
        {/* Fixed, non-interactive, rasterised once. See globals.css. */}
        <div aria-hidden className="grain" />
      </body>
    </html>
  );
}
