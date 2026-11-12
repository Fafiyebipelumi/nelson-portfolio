import type { MetadataRoute } from "next";
import { headers } from "next/headers";

/* Crawler rules. The Studio and API routes are not for indexing. On a
   *.vercel.app host (preview and pre-launch addresses) nothing is crawlable,
   so only tnajulo.com is ever indexed (EA review, November 2026; see also
   the X-Robots-Tag header in next.config.ts). */
export default async function robots(): Promise<MetadataRoute.Robots> {
  const host = (await headers()).get("host") ?? "";
  if (host.endsWith(".vercel.app")) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/studio", "/api/"],
    },
    sitemap: "https://tnajulo.com/sitemap.xml",
    host: "https://tnajulo.com",
  };
}
