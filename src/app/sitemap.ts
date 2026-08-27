import type { MetadataRoute } from "next";
import { LANGS, LANG_TAGS, localePath } from "@/lib/i18n";
import { site } from "@/lib/site";

/**
 * Every indexable page, in both languages.
 *
 * Routes are listed here rather than derived from `navigation`: the nav is a
 * mixed list that carries a fragment link and leaves pages out, while this has
 * to be exactly the set of URLs that should be crawled. `/styleguide` is not
 * in it — it is an internal specimen page and carries `robots: index: false`.
 *
 * Each URL is listed once per language with the full `hreflang` set beside it,
 * the same pairing `alternates()` writes into the pages themselves, so a
 * crawler is told about the other edition from both directions.
 */
const ROUTES = [
  { path: "/", priority: 1, changeFrequency: "monthly" },
  { path: "/reservations", priority: 0.9, changeFrequency: "monthly" },
  { path: "/gallery", priority: 0.8, changeFrequency: "monthly" },
  { path: "/experiences", priority: 0.8, changeFrequency: "monthly" },
  { path: "/about", priority: 0.7, changeFrequency: "yearly" },
  { path: "/contact", priority: 0.7, changeFrequency: "yearly" },
] as const satisfies readonly {
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
}[];

const url = (path: string, lang: (typeof LANGS)[number]) =>
  `${site.url}${localePath(path, lang)}`;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return ROUTES.flatMap((route) =>
    LANGS.map((lang) => ({
      url: url(route.path, lang),
      lastModified,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
      alternates: {
        languages: {
          [LANG_TAGS.en]: url(route.path, "en"),
          [LANG_TAGS.sr]: url(route.path, "sr"),
          "x-default": url(route.path, "en"),
        },
      },
    })),
  );
}
