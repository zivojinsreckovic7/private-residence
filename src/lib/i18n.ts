/**
 * The site is written twice: once in English, once in Serbian.
 *
 * English is the primary language and is unprefixed, so every URL the site
 * has ever had still resolves and every visitor lands on English. Serbian
 * lives under `/sr`. `proxy.ts` maps the unprefixed paths onto the `[lang]`
 * segment, so `app/` holds one tree rather than two.
 *
 * Serbian is set in Latin script (latinica), which is what a Mediterranean
 * travel audience across the region reads.
 */
export const LANGS = ["en", "sr"] as const;

export type Lang = (typeof LANGS)[number];

export const DEFAULT_LANG: Lang = "en";

export function isLang(value: string): value is Lang {
  return (LANGS as readonly string[]).includes(value);
}

/**
 * Copy that exists in both languages.
 *
 * Sections keep their own copy inline, the same as they always have, only now
 * as one `COPY` object with a branch per language. The alternative — a central
 * dictionary keyed by dotted strings — would put every sentence a long way
 * from the markup that sets it, and the section is still the unit we iterate
 * on. Values are `ReactNode` wherever a heading carries an `<Accent>`.
 */
export type Copy<T> = Record<Lang, T>;

/**
 * The locale prefix for an internal path. English is unprefixed, so it is
 * returned untouched.
 *
 * Fragment links (`/#residence`) and mail or external links pass through the
 * same call site, so both are handled here rather than at each one.
 *
 * The fragment case is the one that needs care. The nav writes its in-page
 * links root-relative so they still work from a standalone page, and prefixing
 * those naively gives `/sr/#residence` — a different path from `/sr`, which
 * the browser treats as a navigation rather than a jump within the document.
 * The Serbian landing page would reload, replay the loading curtain and lose
 * the smooth scroll the English one keeps. Joining without the slash gives
 * `/sr#residence`, which is the same document.
 */
export function localePath(href: string, lang: Lang): string {
  if (lang === DEFAULT_LANG || !href.startsWith("/")) return href;
  if (href === "/") return `/${lang}`;
  if (href.startsWith("/#")) return `/${lang}${href.slice(1)}`;
  return `/${lang}${href}`;
}

/** How each language names itself, for the switcher. */
export const LANG_NAMES: Record<Lang, { short: string; full: string }> = {
  en: { short: "EN", full: "English" },
  sr: { short: "SR", full: "Srpski" },
};

/** The `hreflang` value for each language. */
export const LANG_TAGS: Record<Lang, string> = {
  en: "en-GB",
  sr: "sr-Latn-RS",
};
