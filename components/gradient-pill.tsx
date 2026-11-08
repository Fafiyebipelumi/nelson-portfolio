import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

/* ============================================================================
   GRADIENT PILL
   ----------------------------------------------------------------------------
   The redesign's gradient capsule (Writing and Press heroes): a left-to-right
   gradient, the label in dark sans, and, when it leads somewhere, a dark
   disc with an arrow in the pill's accent colour. Without an arrow the label
   is centred (the Press hero's label pills). Sized for the 1440 frame in vw
   from 1024px; a fixed 5rem tall on smaller screens.
   ========================================================================== */

export function GradientPill({
  label,
  from,
  to,
  arrow,
  href,
}: {
  label: string;
  from: string;
  to: string;
  /** Arrow colour; omit for a label-only pill. */
  arrow?: string;
  /** Destination; omit (or null) to render the pill without a link. */
  href?: string | null;
}) {
  const hasArrow = Boolean(arrow);
  const body = (
    <>
      <span
        className={`text-umber font-sans text-[1.3rem] leading-tight tracking-[-0.015em] lg:text-[clamp(1.15rem,1.5vw,1.45rem)] lg:whitespace-nowrap ${
          hasArrow ? "text-left" : "w-full text-center"
        }`}
      >
        {label}
      </span>
      {hasArrow ? (
        <span
          aria-hidden="true"
          className="bg-umber flex size-14 shrink-0 items-center justify-center rounded-full transition-transform duration-300 group-hover:rotate-45 lg:size-[4.7vw] lg:max-h-[4.25rem] lg:max-w-[4.25rem]"
        >
          <ArrowUpRight
            className="size-8 lg:size-[2.9vw] lg:max-h-[2.6rem] lg:max-w-[2.6rem]"
            strokeWidth={2.4}
            style={{ color: arrow }}
          />
        </span>
      ) : null}
    </>
  );
  const className =
    "group flex h-20 w-full items-center justify-between gap-2 rounded-full py-2.5 pr-2.5 pl-5 lg:h-[6.6vw] lg:max-h-[6rem] lg:pr-[1.3vw] lg:pl-[1.4vw]";
  const style = { backgroundImage: `linear-gradient(90deg, ${from}, ${to})` };

  return href ? (
    <Link
      href={href}
      className={`${className} transition-transform duration-300 hover:-translate-y-0.5`}
      style={style}
    >
      {body}
    </Link>
  ) : (
    <div className={className} style={style}>
      {body}
    </div>
  );
}
