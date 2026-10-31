import type { MetadataRoute } from "next";

/**
 * Concept preview — not for indexing. Crawling stays allowed so search engines can
 * read the `noindex, nofollow` directive (meta tag + X-Robots-Tag header); a robots.txt
 * block would hide that directive and can still leave the bare URL indexed.
 * No sitemap is published.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
  };
}
