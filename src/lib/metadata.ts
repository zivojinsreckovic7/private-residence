import type { Metadata } from "next";
import { LANG_TAGS, localePath, type Lang } from "@/lib/i18n";

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
