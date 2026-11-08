import { fifteenWinsPage } from "@/lib/content";
import { WHAT_GLOW } from "../glows";
import { Reveal, Stagger, StaggerItem } from "../motion-primitives";

/* ============================================================================
   15WINS — WHAT IT IS  (Figma redesign, November 2026)
   ----------------------------------------------------------------------------
   Black with amber and teal edge glows: the serif heading over three short
   cards in the design's colours (#D795FF, #FFD7D7, #95FFA0), each with a
   hard cream offset shadow and its line top-left. Meets the cream band
   below edge to edge.
   ========================================================================== */

export function FifteenWinsWhat() {
  const W = fifteenWinsPage.whatItIs;
  return (
    <section
      aria-labelledby="fifteen-what-heading"
      data-tone="ink"
      className="on-ink text-cream relative isolate overflow-hidden bg-black"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{ background: WHAT_GLOW }}
      />

      <div className="gutter-tight pt-16 pb-20 lg:pt-[5.4rem] lg:pb-[7.4rem]">
        <Reveal>
          <h2
            id="fifteen-what-heading"
            className="origin-left font-serif text-[clamp(2.75rem,5vw,4.6rem)] leading-none tracking-[-0.04em] [scale:0.88_1]"
          >
            {W.heading}
          </h2>
        </Reveal>

        <Stagger className="mt-9 grid gap-6 md:grid-cols-3 lg:mt-[2.6rem] lg:gap-8">
          {W.cards.map((card) => (
            <StaggerItem key={card.text} className="h-full">
              <div
                className="text-umber h-full min-h-[7.65rem] rounded-[4px] px-4 pt-[2.6rem] pb-6 shadow-[4px_4px_0_0_#fff8e1]"
                style={{ backgroundColor: card.tone }}
              >
                <p className="max-w-[19.5rem] font-sans text-[1.0625rem] leading-[1.3] tracking-[0.01em]">
                  {card.text}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
