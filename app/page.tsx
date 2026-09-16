import { Hero } from "@/components/hero";
import { Philosophy } from "@/components/philosophy";
import { CurrentlyBuilding } from "@/components/currently-building";
import { Duality } from "@/components/duality";
import { Journey } from "@/components/journey";
import { BigPicture } from "@/components/big-picture";
import { FeaturedIn } from "@/components/featured-in";
import { Speaking } from "@/components/speaking";
// import { PreviousChapters } from "@/components/previous-chapters"; // section 09 currently disabled
import { PodcastTeaser } from "@/components/podcast-teaser";
import { Contact } from "@/components/contact";

/* ============================================================================
   HOMEPAGE
   ----------------------------------------------------------------------------
   A server component composing the static sections. Header, footer and the
   scroll-reveal observer live in the root layout, shared with /podcast.

   Surface rhythm alternates deliberately — ink for the moments that should
   feel like arrival (hero, the Protect/Empower thesis, the podcast invitation,
   the close), and paper for the reading.
   ========================================================================== */

export default function Home() {
  return (
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
      {/* 09 */} <PodcastTeaser />
      {/* 10 */} <Contact />
    </main>
  );
}
