import Link from "next/link";
import type { ReactNode } from "react";

/* ============================================================================
   ACTION BUTTON
   ----------------------------------------------------------------------------
   The redesign's button: a small-radius block with a hard, flat offset
   shadow, as in the Figma file. On hover it presses down into its shadow.

   `light` is cream on dark (primary), `dark` is near-black with a cream
   outline (secondary), `ink` is near-black with a grey shadow for use on
   cream sections. External links open in a new tab.
   ========================================================================== */

type Variant = "light" | "dark" | "ink";
type Size = "md" | "sm";

const base =
  "group inline-flex items-center justify-center gap-2.5 rounded-[7px] font-sans font-medium whitespace-nowrap " +
  "transition-[transform,box-shadow,background-color] duration-200 ease-out " +
  "hover:translate-x-[2px] hover:translate-y-[2px] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none";

/* Shadow colour follows the design: grey under cream buttons, cream under
   dark ones. */
const variants: Record<Variant, string> = {
  light:
    "bg-cream text-umber shadow-[4px_4px_0_0_#8f8a7d] hover:shadow-[2px_2px_0_0_#8f8a7d]",
  dark:
    "bg-umber text-cream border border-cream/70 shadow-[4px_4px_0_0_#ece5cf] hover:shadow-[2px_2px_0_0_#ece5cf]",
  ink: "bg-umber text-cream shadow-[4px_4px_0_0_#8f8a7d] hover:shadow-[2px_2px_0_0_#8f8a7d]",
};

const sizes: Record<Size, string> = {
  md: "px-5 py-3 text-base sm:px-6 sm:py-3.5 sm:text-[1.0625rem] lg:text-[1.1875rem]",
  sm: "px-5 py-2.5 text-[0.9375rem]",
};

export function ActionButton({
  href,
  children,
  variant = "light",
  size = "md",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
}) {
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;
  const external = /^https?:\/\//.test(href);

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}

/** Filled circle with a play triangle knocked out, as in the design. */
export function PlayIcon() {
  return (
    <svg viewBox="0 0 20 20" className="size-5 shrink-0" aria-hidden="true">
      <circle cx="10" cy="10" r="10" fill="currentColor" />
      <path d="M8 6.2v7.6L14 10z" fill="var(--color-cream)" />
    </svg>
  );
}
