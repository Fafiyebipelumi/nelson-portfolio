/* ============================================================================
   POST /api/subscribe  —  newsletter signup, proxied to Beehiiv
   ----------------------------------------------------------------------------
   Keeps the Beehiiv API key server-side (never shipped to the client). Reads
   BEEHIIV_API_KEY and BEEHIIV_PUBLICATION_ID from the environment.

   Honesty (brief §4.3): this never pretends to succeed. If the integration is
   not configured, or Beehiiv rejects the request, it responds with an error
   status the client surfaces to the reader.

   Credentials are Nelson-owned: create the publication in Beehiiv, then set
   BEEHIIV_API_KEY and BEEHIIV_PUBLICATION_ID in the environment.
   ========================================================================== */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let email: unknown;
  try {
    ({ email } = await request.json());
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  if (typeof email !== "string" || !EMAIL_RE.test(email)) {
    return Response.json({ error: "Enter a valid email address." }, { status: 422 });
  }

  const apiKey = process.env.BEEHIIV_API_KEY;
  const publicationId = process.env.BEEHIIV_PUBLICATION_ID;

  if (!apiKey || !publicationId) {
    /* Not connected yet. Fail loudly rather than silently dropping the signup. */
    return Response.json(
      { error: "The newsletter is not connected yet. Please try again soon." },
      { status: 503 },
    );
  }

  try {
    const res = await fetch(
      `https://api.beehiiv.com/v2/publications/${publicationId}/subscriptions`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          reactivate_existing: false,
          send_welcome_email: true,
          utm_source: "tnajulo.com",
          utm_medium: "podcast",
        }),
      },
    );

    if (!res.ok) {
      return Response.json({ error: "Could not subscribe. Please try again." }, { status: 502 });
    }

    return Response.json({ ok: true }, { status: 200 });
  } catch {
    return Response.json({ error: "Could not reach the newsletter service." }, { status: 502 });
  }
}
