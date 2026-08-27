import { NextResponse, type NextRequest } from "next/server";

/**
 * Locale routing.
 *
 * Every route lives once, under `app/[lang]`, so the two languages cannot
 * drift into two different site structures. The URLs do not show that: English
 * is the primary language and stays unprefixed (`/`, `/about`, `/gallery`),
 * and Serbian sits under `/sr`. This rewrites the unprefixed paths onto the
 * English branch of the tree.
 *
 * A rewrite, not a redirect: the visitor's URL is left alone, so the English
 * URLs the site has always had are still the real ones and there is no hop
 * before the first paint.
 *
 * `/en/...` is redirected back to the unprefixed form rather than served, so
 * there is exactly one URL per page and nothing to split search rankings.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/sr" || pathname.startsWith("/sr/")) return;

  if (pathname === "/en" || pathname.startsWith("/en/")) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(3) || "/";
    return NextResponse.redirect(url, 308);
  }

  const url = request.nextUrl.clone();
  url.pathname = `/en${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  /**
   * Everything except three things that are not pages:
   *
   * - `/api/...`, which has no language and lives outside `app/[lang]`. Left
   *   in, the rewrite sends the reservation form's endpoint to
   *   `/en/api/reservations`, which is nothing, and the form 404s.
   * - Next's own assets.
   * - Anything that looks like a file in `public/` — the photography, the
   *   video tiers, the icons, `sitemap.xml`, `robots.txt`. Without this the
   *   rewrite would send `/logo.jpeg` to `/en/logo.jpeg`, which is nothing.
   */
  matcher: ["/((?!api/|_next/|.*\\.[\\w]+$).*)"],
};
