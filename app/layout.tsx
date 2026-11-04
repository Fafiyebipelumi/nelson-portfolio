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

/* Homepage meta description, verbatim from the October 2026 copy proposal's
   SEO sheet. Titles follow the same sheet; pages set their own with
   `title.absolute`. */
const DESCRIPTION =
  "Discover Nelson T. Ajulo's work in artificial intelligence, everyday safety technology, early-stage investment and venture building through MyHives, Joble and 15Wins Ventures.";

const TITLE = "Nelson T. Ajulo | Technology Entrepreneur & Investor";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s | Nelson T. Ajulo",
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
    "venture builder",
    "MyHives",
    "BEEKON",
    "Joble",
    "15Wins Ventures",
    "AI in Africa",
    "AI sovereignty",
  ],
  authors: [{ name: "Nelson T. Ajulo", url: SITE_URL }],
  creator: "Nelson T. Ajulo",
  openGraph: {
    type: "profile",
    firstName: "Nelson",
    lastName: "Ajulo",
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: "Nelson T. Ajulo",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
};

/* Decides, before first paint, whether the homepage intro screen plays: only
   when the visitor lands on "/", once per browser session, and never with
   reduced motion. It holds for at least 3.6s and until the page (including
   the portrait and glow images) has loaded, capped at 7s. Any click, key,
   wheel or touch skips it. The intro itself is pure CSS (see .splash in
   globals.css), so without this script it still plays and clears itself. */
const SPLASH_SCRIPT = `(function(){var d=document.documentElement;function set(v){d.setAttribute('data-splash',v)}
try{if(location.pathname!=='/'||matchMedia('(prefers-reduced-motion: reduce)').matches||sessionStorage.getItem('nta-splash')){set('seen');return}sessionStorage.setItem('nta-splash','1')}catch(e){set('seen');return}
set('playing');var t0=Date.now();var t=setTimeout(ready,3600);
function ready(){if(document.readyState==='complete'||Date.now()-t0>7000)return leave();addEventListener('load',leave);t=setTimeout(leave,7000-(Date.now()-t0))}
function leave(){if(d.getAttribute('data-splash')!=='playing')return;clearTimeout(t);set('leaving');setTimeout(function(){set('done')},950)}
['pointerdown','keydown','wheel','touchstart'].forEach(function(e){addEventListener(e,leave,{passive:true})})})();`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      /* The splash script sets data-splash on <html> before hydration. */
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: SPLASH_SCRIPT }} />
      </head>
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
