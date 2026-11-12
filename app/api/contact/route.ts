import { contactPage } from "@/lib/content";

/* ============================================================================
   POST /api/contact  —  the contact page's enquiry form
   ----------------------------------------------------------------------------
   Validates the enquiry on the server, then delivers it to the inbox
   (CONTACT_TO, default support@tnajulo.com) with the chosen desk's subject
   line and the sender as Reply-To.

   Delivery, in order of preference:
     1. Resend, once RESEND_API_KEY is set (and tnajulo.com is verified in
        Resend). Sends from CONTACT_FROM, default website@tnajulo.com.
     2. Formspree, through NEXT_PUBLIC_PODCAST_FORM_ENDPOINT, until then.
   So switching to Resend needs no code change: add the key and redeploy.

   Never fakes success: an unconfigured or failed delivery returns an error
   the form shows to the reader. A hidden honeypot field and a per-address
   rate limit keep casual spam out.
   ========================================================================== */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const TO = process.env.CONTACT_TO || "support@tnajulo.com";
const FROM = process.env.CONTACT_FROM || "tnajulo.com <website@tnajulo.com>";

/* Best-effort rate limit: 5 enquiries per address per 10 minutes, per server
   instance. Enough to stop a form being hammered; not a security boundary. */
const WINDOW_MS = 10 * 60 * 1000;
const LIMIT = 5;
const hits = new Map<string, number[]>();

function limited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > LIMIT;
}

const clean = (value: unknown, max: number) =>
  typeof value === "string" ? value.trim().slice(0, max) : "";

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  /* Honeypot: people never see this field, bots fill it. Pretend success so
     the bot moves on, and send nothing. */
  if (clean(body.company, 200)) return Response.json({ ok: true });

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (limited(ip)) {
    return Response.json({ error: "Too many messages. Please try again later." }, { status: 429 });
  }

  const name = clean(body.name, 200);
  const email = clean(body.email, 320);
  const organisation = clean(body.organisation, 200);
  const website = clean(body.website, 500);
  const message = clean(body.message, 10000);
  const desk =
    contactPage.desks.find((d) => d.key === body.deskKey) ?? contactPage.desks[0];

  if (!name || !message || !EMAIL_RE.test(email)) {
    return Response.json({ error: "Please fill in your name, a valid email and your message." }, { status: 422 });
  }

  const subject = `${desk.subject}: ${name}`;
  const details = [
    `Desk: ${desk.title}`,
    `Name: ${name}`,
    `Email: ${email}`,
    ...(organisation ? [`Organisation: ${organisation}`] : []),
    ...(website ? [`Website or LinkedIn: ${website}`] : []),
  ];
  const text = [
    ...details,
    "",
    message,
    "",
    "Sent from the contact form on tnajulo.com. Reply to this email to answer the sender.",
  ].join("\n");

  try {
    const resendKey = process.env.RESEND_API_KEY;
    if (resendKey) {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${resendKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({ from: FROM, to: [TO], reply_to: email, subject, text }),
      });
      if (!res.ok) throw new Error(`Resend responded ${res.status}`);
      return Response.json({ ok: true });
    }

    const formspree = process.env.NEXT_PUBLIC_PODCAST_FORM_ENDPOINT;
    if (formspree) {
      const res = await fetch(formspree, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name,
          email,
          organisation,
          website,
          message,
          desk: desk.title,
          _subject: desk.subject,
          _replyto: email,
        }),
      });
      if (!res.ok) throw new Error(`Formspree responded ${res.status}`);
      return Response.json({ ok: true });
    }

    return Response.json({ error: "The contact form is not connected yet." }, { status: 503 });
  } catch (err) {
    console.error("[contact] delivery failed:", err);
    return Response.json({ error: "Your message could not be sent." }, { status: 502 });
  }
}
