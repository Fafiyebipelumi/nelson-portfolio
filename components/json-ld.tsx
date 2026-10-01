/* ============================================================================
   JSON-LD
   ----------------------------------------------------------------------------
   Renders a schema.org structured-data block. Server component; the data is
   built by callers and stringified into a script tag for crawlers.
   ========================================================================== */

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // Structured data is trusted, app-authored content, not user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
