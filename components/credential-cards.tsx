import { homeCredentials } from "@/lib/content";
import { Stagger, StaggerItem } from "./motion-primitives";
import { Stripes } from "./stripes";

/* ============================================================================
   HOME — CREDENTIAL CARDS  (Figma redesign, November 2026)
   ----------------------------------------------------------------------------
   Four raised cards on the dark ground, each with the same hard cream offset
   shadow as the buttons: a serif title and a short paragraph. Four across on
   desktop, two on tablets, one on phones. Closes on fading lines into
   Speaking.
   ========================================================================== */

export function CredentialCards() {
  return (
    <section aria-label="Credentials" className="bg-umber text-cream">
      <div className="gutter py-16 sm:py-20 lg:py-20">
        <Stagger className="mx-auto grid max-w-[85rem] gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-[1.125rem]">
          {homeCredentials.map((item) => (
            <StaggerItem
              key={item.title}
              className="rounded-[7px] bg-[#2a241b] px-4 pt-10 pb-10 shadow-[4px_4px_0_0_#fff8e1] sm:min-h-[15.5rem] lg:px-4 lg:pt-11"
            >
              <h3 className="w-[calc(100%/0.88)] origin-left font-serif text-[clamp(1.6rem,1.85vw,1.75rem)] leading-[1.05] [scale:0.88_1] [-webkit-text-stroke:0.5px_currentColor]">
                {item.title}
              </h3>
              <p className="text-sand mt-4 font-sans text-base leading-[1.35] tracking-[-0.01em]">
                {item.body}
              </p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>

      <Stripes from="var(--color-umber)" to="#5e5a51" fade />
    </section>
  );
}
