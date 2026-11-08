import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    /* Guest photos and episode cover art are served by Sanity's image CDN, so
       next/image must be allowed to optimise from that host. */
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],
  },

  /* The October 2026 copy proposal folded the three company pages into one
     /ventures page and press into /contact (MyHives, Joble, 15Wins and
     Press got their own pages again in the November 2026 Figma redesign). Permanent redirects keep every
     old link and search result working. */
  async redirects() {
    return [
      /* The podcast was renamed BEFORE (November 2026) and moved with it. */
      { source: "/podcast", destination: "/before", permanent: true },
      { source: "/podcast/:path*", destination: "/before/:path*", permanent: true },
    ];
  },
};

export default nextConfig;
