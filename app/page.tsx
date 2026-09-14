import { SiteHeader } from "@/components/site-header";
import { Hero } from "@/components/hero";
import { Philosophy } from "@/components/philosophy";
import { CurrentlyBuilding } from "@/components/currently-building";
import { Duality } from "@/components/duality";
import { Journey } from "@/components/journey";
import { BigPicture } from "@/components/big-picture";
import { FeaturedIn } from "@/components/featured-in";
import { Speaking } from "@/components/speaking";
// import { PreviousChapters } from "@/components/previous-chapters"; // section 09 currently disabled
import { Contact } from "@/components/contact";
import { SiteFooter } from "@/components/site-footer";

/* ============================================================================
   HOMEPAGE
   ----------------------------------------------------------------------------
   A server component composing eleven static sections. The only client
   JavaScript on the page is the header (hero crossover + mobile menu) and the
   scroll-reveal primitives; every section itself renders on the server.

   Surface rhythm alternates deliberately — ink for the three moments that
   should feel like arrival (hero, the Protect/Empower thesis, the close), and
   paper for the reading.
   ========================================================================== */

export default function Home() {
  return (
    <>
      <SiteHeader />

      <main id="main">
        {/* 01 */} <Hero />
        {/* 02 */} <Philosophy />
        {/* 03 */} <CurrentlyBuilding />
        {/* 04 */} <Duality />
        {/* 05 */} <Journey />
        {/* 06 */} <BigPicture />
        {/* 07 */} <FeaturedIn />
        {/* 08 */} <Speaking />
        {/* 09 <PreviousChapters /> */}
        {/* 10 */} <Contact />
      </main>

      <SiteFooter />
    </>
  );
}
