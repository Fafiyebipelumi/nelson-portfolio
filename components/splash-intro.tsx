import Image from "next/image";

/* ============================================================================
   SPLASH INTRO  (Figma "opening signature screen")
   ----------------------------------------------------------------------------
   Shown over the homepage on the first visit of a session, for about four
   seconds with a small loader, then it plays its exit and the hero eases in
   underneath. Decorative only: the homepage content is in the document the
   whole time (aria-hidden here).

   Choreography, timing, skipping and "once per session" live in globals.css
   (the .splash-* classes) and the inline script in the root layout. No client
   JavaScript is needed to render or clear it.

   Composition follows the 1440 x 725 Figma frame, positioned in % of that
   stage so it scales with the viewport width. The portrait's black studio
   background is blended away with `lighten`, so the glows behind it stay
   visible at the edges; the words sit on top. The design sets the wordmark
   narrower than Instrument Serif's natural width, hence the 0.88 x-scale
   (via the `scale` property, so it doesn't fight the animated transforms).
   ========================================================================== */

const word =
  "splash-word absolute font-serif leading-none whitespace-nowrap uppercase";

export function SplashIntro() {
  return (
    <div
      aria-hidden="true"
      className="splash fixed inset-0 z-[100] overflow-hidden bg-black"
    >
      {/* Drift layer. The glows live inside it too: the drift transform makes
          this a stacking context, and the portrait's `lighten` blend only
          sees what is inside the same context. */}
      <div className="splash-stage absolute inset-0">
        <Image
          src="/B.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="splash-glow object-fill"
        />

        {/* 1440 x 725 stage, centred vertically, scaled to the viewport width. */}
        <div
          className="absolute inset-x-0"
          style={{ top: "calc(50% - 25.175vw)", height: "50.35vw" }}
        >
          <div
            className="splash-portrait absolute mix-blend-lighten"
            style={{
              left: "17.8%",
              top: "-15.1%",
              width: "68.7%",
              height: "204.6%",
              /* Soft bottom edge. Off-screen on desktop; on tall phone screens
               it keeps the photo from ending in a hard cut. */
              maskImage:
                "linear-gradient(to bottom, #000 62%, transparent 92%)",
              WebkitMaskImage:
                "linear-gradient(to bottom, #000 62%, transparent 92%)",
            }}
          >
            <Image
              src="/nelson-portrait.jpg"
              alt=""
              fill
              priority
              sizes="70vw"
              className="object-cover object-top"
            />
          </div>

          <span
            className={`${word} splash-word-left`}
            style={{
              left: "5.2%",
              top: "30%",
              fontSize: "12.9vw",
              scale: "0.88 1",
              transformOrigin: "left center",
            }}
          >
            Nelson
          </span>
          <span
            className={`${word} splash-word-right`}
            style={{
              right: "1.5%",
              top: "30%",
              fontSize: "12.9vw",
              scale: "0.88 1",
              transformOrigin: "right center",
            }}
          >
            T. Ajulo
          </span>
        </div>
      </div>

      {/* Loader */}
      <div className="splash-loader absolute inset-x-0 bottom-[max(2.5rem,7vh)] flex flex-col items-center gap-3">
        <div className="h-px w-36 overflow-hidden bg-white/20 sm:w-44">
          <div className="splash-loader-fill bg-cream h-full w-full" />
        </div>
        <span className="splash-loader-count text-cream/70 font-sans text-[0.6875rem] tracking-[0.24em] tabular-nums" />
      </div>
    </div>
  );
}
