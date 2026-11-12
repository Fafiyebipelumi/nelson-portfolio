"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/* The site header and footer are shared across every route except the
   embedded Sanity Studio (/studio), which is a full-screen app of its own
   and whose CSS reset would otherwise break them. */
export function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  if (pathname?.startsWith("/studio")) return null;
  return children;
}
