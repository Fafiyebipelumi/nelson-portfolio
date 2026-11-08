import type { Metadata } from "next";
import { ContactHero } from "@/components/contact-page/contact-hero";
import { ContactDesks } from "@/components/contact-page/contact-desks";
import { ContactForm } from "@/components/contact-page/contact-form";

/* ============================================================================
   /contact  —  ROUTE IT TO THE RIGHT DESK  (Figma redesign, November 2026)
   ----------------------------------------------------------------------------
   The premise, the five desks (each with its address and subject line), then
   the enquiry form (#enquiry), which other pages link to with a desk
   preselected. Header and footer come from the root layout.
   ========================================================================== */

const TITLE = "Contact | Nelson T. Ajulo";
const DESCRIPTION =
  "Route it to the right desk: BEFORE guests and sponsors, press and media, speaking, and investment and partnerships. Every enquiry reaches the right person the same day.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: "/contact" },
  openGraph: {
    type: "website",
    title: TITLE,
    description: DESCRIPTION,
    url: "/contact",
  },
};

export default function ContactPage() {
  return (
    <main id="main">
      <ContactHero />
      <ContactDesks />
      <ContactForm />
    </main>
  );
}
