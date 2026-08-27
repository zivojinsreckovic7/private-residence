import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

/**
 * Nothing is disallowed.
 *
 * `/styleguide` is the one page that must not be indexed, and it says so
 * itself with `robots: { index: false }`. Blocking it here as well would be
 * worse, not better: a crawler that cannot fetch the page cannot read the
 * tag, and a blocked URL can still be indexed from a link elsewhere.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
