import type { MetadataRoute } from "next";

/* Crawler rules. The Studio and API routes are not for indexing. */
export default function robots(): MetadataRoute.Robots {
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
