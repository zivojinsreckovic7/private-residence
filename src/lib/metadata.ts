import type { Metadata } from "next";
import { photo } from "@/lib/gallery";
import { LANG_TAGS, localePath, type Lang } from "@/lib/i18n";

/** The photograph every social card carries. */
const OG_PHOTO = "/gallery/exterior/villa-full-view-with-pool.webp";

/**
 * The social card image, described in the language of the page sharing it.
 *
 * Page-level `openGraph` replaces the layout's rather than merging into it, so
 * every page that writes its own has to include this. The description comes
 * from the gallery manifest, like every other use of this photograph.
 */
export function ogImages(lang: Lang): NonNullable<Metadata["openGraph"]>["images"] {
  const { src, alt } = photo(OG_PHOTO, lang);
  return [{ url: src, width: 1600, height: 1067, alt }];
}

/**
 * The canonical URL for a page in the language being rendered, plus the
 * `hreflang` set pointing at its counterpart.
 *
 * Every page carries this, so a search engine is told which of the two
 * editions it is looking at and where the other one is. `x-default` is
 * English: it is the primary language and the page every visitor lands on
 * first.
 */
export function alternates(path: string, lang: Lang): Metadata["alternates"] {
  return {
    canonical: localePath(path, lang),
    languages: {
      [LANG_TAGS.en]: path,
      [LANG_TAGS.sr]: localePath(path, "sr"),
      "x-default": path,
    },
  };
}
