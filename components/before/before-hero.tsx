import { ArrowUpRight } from "lucide-react";
import { before, footerListen } from "@/lib/content";
import { ActionButton } from "../action-button";
import { ListenIcon } from "../footer-icons";
import { Reveal } from "../motion-primitives";

/* ============================================================================
   BEFORE — HERO  (Figma redesign, November 2026)
   ----------------------------------------------------------------------------
   Dark-green ground that turns violet to the right. Left: the "A MyHives
   Original" pill, the BEFORE wordmark, headline, two lines of body, the
   platform icons and the inbox button. Right: the show's artwork built in
   code (no image): a tilted metallic BE / FORE stack, a play disc over it,
   the "A MyHives Original" line, and an amber sun breaking in from the
   top-right corner.

   Until episode 01 is released (`live`, from getSeasonStatus) nothing reads
   as playable: no play disc, no platform icons and no inbox button (EA
   review, November 2026).
   ========================================================================== */

const H = before.hero;

export function BeforeHero({ live }: { live: boolean }) {
  return (
    <section
      id="top"
      className="relative isolate overflow-hidden text-cream"
      style={{
        background:
          "radial-gradient(120% 90% at 100% 100%, #9d45ff 0%, #7b37d6 28%, transparent 62%), linear-gradient(100deg, #1b2220 0%, #1d2321 42%, #3a2861 64%, #7a3ad8 86%, #9343f6 100%)",
      }}
    >
      {/* Sun, top-right */}
      <div
        aria-hidden="true"
        className="before-sun absolute -top-[7.5rem] -right-[6.5rem] size-[12rem] rounded-full border-[3px] border-[#f3d38a] sm:-top-[8rem] sm:-right-[6rem] sm:size-[21rem]"
        style={{
          background:
            "radial-gradient(circle at 30% 70%, #f2a514 0%, #d58b0b 55%, #b8780c 100%)",
        }}
      />

      <div className="gutter relative grid min-h-[100svh] items-center gap-12 pt-28 pb-20 lg:min-h-[max(100svh,46rem)] lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)] lg:pt-32 lg:pb-16">
        {/* Copy */}
        <div className="relative z-10">
          <Reveal>
            <p className="inline-flex rounded-full bg-[#3a3833] px-3.5 py-1.5 font-sans text-[0.8125rem] font-medium tracking-[-0.01em]">
              {H.eyebrow}
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-6 origin-left font-serif text-[clamp(4.5rem,10vw,9rem)] leading-[0.9] uppercase [scale:0.88_1] [-webkit-text-stroke:0.035em_currentColor]">
              {H.title}
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-8 max-w-[47rem] font-sans text-[clamp(1.5rem,2.3vw,2.15rem)] leading-[1.08] font-semibold tracking-[-0.035em]">
              {H.headline}
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="text-stone mt-5 max-w-[44rem] font-sans text-[1.0625rem] leading-[1.4] lg:text-[1.1875rem]">
              {H.body.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </Reveal>
          {live ? (
            <Reveal delay={0.2}>
              <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-5">
                <ul
                  className="flex items-center gap-2.5"
                  aria-label="Listen to BEFORE"
                >
                  {footerListen.map((item) => (
                    <li key={item.id} className="size-9">
                      {item.href ? (
                        <a
                          href={item.href}
                          aria-label={item.label}
                          className="block size-full transition-transform duration-200 hover:-translate-y-0.5"
                        >
                          <ListenIcon id={item.id} />
                        </a>
                      ) : (
                        <span
                          role="img"
                          aria-label={item.label}
                          title={`${item.label} (coming soon)`}
                          className="block size-full"
                        >
                          <ListenIcon id={item.id} />
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
                <ActionButton href={H.inbox.href} variant="dark">
                  {H.inbox.label}
                  <ArrowUpRight
                    className="size-[1.1em] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    strokeWidth={2}
                    aria-hidden="true"
                  />
                </ActionButton>
              </div>
            </Reveal>
          ) : null}
        </div>

        {/* Artwork */}
        <BeforeArt live={live} />
      </div>
    </section>
  );
}

function BeforeArt({ live }: { live: boolean }) {
  return (
    <div
      aria-hidden="true"
      className="before-art relative mx-auto aspect-[1/1] w-full max-w-[22rem] sm:max-w-[30rem] lg:max-w-[36rem]"
    >
      <div
        className="absolute inset-0 rotate-[-7deg] [scale:0.9_1]"
        style={{ containerType: "inline-size" }}
      >
        <span
          className="before-art-word absolute right-[19%] top-[2%] font-serif leading-[0.8] uppercase"
          style={{ fontSize: "48cqw" }}
        >
          Be
        </span>
        <span
          className="before-art-word absolute left-[4%] top-[39%] font-serif leading-[0.8] uppercase"
          style={{ fontSize: "48cqw", animationDelay: "0.12s" }}
        >
          Fore
        </span>
        <span className="absolute left-[14%] top-[86%] font-sans text-[3.6cqw] font-bold tracking-[0.32em] whitespace-nowrap text-[#e9e4f5] uppercase">
          {before.hero.art.tagline}
        </span>
      </div>

      {/* Play disc: only once there is something to play. */}
      {live ? (
        <div className="before-play absolute top-[44%] left-[58%] grid size-[30%] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-[#2b2531]/75 backdrop-blur-[2px]">
          <div className="grid size-[64%] place-items-center rounded-full bg-white shadow-[0_6px_24px_rgb(0_0_0/0.35)]">
            <svg viewBox="0 0 24 24" className="ml-[8%] size-[42%]">
              <path d="M6 3.5v17l14-8.5z" fill="#2b2531" />
            </svg>
          </div>
        </div>
      ) : null}
    </div>
  );
}
