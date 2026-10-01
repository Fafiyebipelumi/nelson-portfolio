import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import { RevealObserver } from "@/components/reveal-observer";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Analytics } from "@/components/analytics";
import "./globals.css";

/* Three families, each with a distinct job and nothing spare:
   Geist        — display + interface
   Geist Mono   — section indices, labels, data
   Instrument Serif — editorial italic accents (single weight) */

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

const SITE_URL = "https://tnajulo.com";

const DESCRIPTION =
  "Nelson T. Ajulo is a technology entrepreneur and investor building at the intersection of artificial intelligence, everyday safety and economic opportunity. CEO and Co-Founder of MyHives, makers of BEEKON, protecting 35,000+ people across 190+ countries. Founder of Joble. General Partner at 15Wins Ventures. AIFOD Global Advocate.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Nelson T. Ajulo, Entrepreneur, Investor, Technologist",
    template: "%s · Nelson T. Ajulo",
  },
  description: DESCRIPTION,
  alternates: {
    canonical: "/",
  },
  keywords: [
    "Nelson T. Ajulo",
    "technology entrepreneur",
    "AI entrepreneur",
    "investor",
    "MyHives",
    "BEEKON",
    "Joble",
    "AI for Africa",
    "future of work",
  ],
  authors: [{ name: "Nelson T. Ajulo", url: SITE_URL }],
  creator: "Nelson T. Ajulo",
  openGraph: {
    type: "profile",
    firstName: "Nelson",
    lastName: "Ajulo",
    title: "Nelson T. Ajulo, Entrepreneur, Investor, Technologist",
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: "Nelson T. Ajulo",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nelson T. Ajulo, Entrepreneur, Investor, Technologist",
    description: DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#0c1a13",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} antialiased`}
    >
      <body className="bg-paper text-charcoal min-h-dvh">
        {/* Header and footer are shared across every route. */}
        <SiteHeader />
        {children}
        <SiteFooter />
        {/* Drives every scroll reveal on the page from a single observer. */}
        <RevealObserver />
        <Analytics />
      </body>
    </html>
  );
}
