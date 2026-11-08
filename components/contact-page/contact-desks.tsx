import { contactPage } from "@/lib/content";
import { WHAT_GLOW } from "../glows";
import { Stagger, StaggerItem } from "../motion-primitives";

/* ============================================================================
   CONTACT — THE DESKS  (Figma redesign, November 2026)
   ----------------------------------------------------------------------------
   Black with amber and teal edge glows: five colour cards (three, then two),
   each with the desk in serif, what it handles, and at the foot the address
   and subject line to use. The address is a mailto link with the subject
   filled in. Meets the cream form band edge to edge.
   ========================================================================== */

export function ContactDesks() {
  const email = contactPage.email;
  return (
    <section
      aria-label="Desks"
      data-tone="ink"
      className="on-ink relative isolate overflow-hidden bg-black"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{ background: WHAT_GLOW }}
      />
      <div className="gutter-tight pt-16 pb-20 lg:pt-[7.9rem] lg:pb-[7.2rem]">
        <Stagger className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {contactPage.desks.map((desk) => (
            <StaggerItem key={desk.key} className="h-full">
              <article
                className="text-umber flex h-full min-h-[16.5rem] flex-col rounded-[4px] px-4 pt-10 pb-10 shadow-[4px_4px_0_0_#6f6b63]"
                style={{ backgroundColor: desk.tone }}
              >
                <h2 className="w-[calc(100%/0.88)] origin-left font-serif text-[clamp(1.6rem,1.85vw,1.75rem)] leading-none tracking-[-0.02em] [scale:0.88_1] [-webkit-text-stroke:0.5px_currentColor]">
                  {desk.title}
                </h2>
                <p className="mt-4 max-w-[24rem] font-sans text-[1.0625rem] leading-[1.32] tracking-[0.005em]">
                  {desk.body}
                </p>
                <p className="mt-auto pt-8 font-sans text-[1.0625rem] leading-[1.32] tracking-[0.005em]">
                  <a
                    href={`mailto:${email}?subject=${encodeURIComponent(desk.subject)}`}
                    className="decoration-umber/40 underline-offset-2 hover:underline"
                  >
                    {email}
                  </a>
                  <br />
                  Subject: {desk.subject}
                </p>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
