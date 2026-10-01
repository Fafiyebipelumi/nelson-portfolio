import Script from "next/script";

/* ============================================================================
   ANALYTICS
   ----------------------------------------------------------------------------
   Privacy-first analytics per brief §11 (no Google Analytics). Defaults to
   Plausible, loaded only when NEXT_PUBLIC_PLAUSIBLE_DOMAIN is set, so it is a
   no-op until Nelson confirms the provider and domain. If he prefers Fathom,
   swap this single component for the Fathom snippet.
   ========================================================================== */

export function Analytics() {
  const domain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
  if (!domain) return null;

  return (
    <Script
      defer
      data-domain={domain}
      src="https://plausible.io/js/script.js"
      strategy="afterInteractive"
    />
  );
}
