/* ============================================================================
   CONTENT — single source of truth for the homepage concept.
   ----------------------------------------------------------------------------
   PROVENANCE RULES APPLIED HERE:

   Every factual claim below is traceable to a public source, noted inline as:
     [myhives.io]   — MyHives product site
     [myhives.nl]   — MyHives company/about page
     [PR 2026-09]   — "MyHives Begins Engineering Validation of BEEKON+…",
                      12 September 2026, carried by multiple newswires
     [joble.app]    — Joble product site
     [thehague.com] — The Hague Business Agency profile, 2021
     [af.net]       — AI for Developing Countries Forum (AIFOD)

   Editorial prose (headlines, framing, manifesto) is written for this concept
   and makes no factual claims beyond the sourced items.

   Anything not verifiable is marked `placeholder: true` and must be replaced
   with real content before launch. NO awards, revenue, company counts,
   investment figures, exits, partnerships or credentials have been invented.

   Zarttech is deliberately modelled as a PAST chapter, never a current venture.
   ========================================================================== */

/* -------------------------------------------------------------------------- */
/*  Types                                                                     */
/* -------------------------------------------------------------------------- */

export type VentureStatus = "active" | "concluded";

export interface Fact {
  label: string;
  value: string;
}

export interface SignalStage {
  index: string;
  name: string;
  body: string;
}

export interface Chapter {
  index: string;
  name: string;
  meta: string;
  body: string;
  status: VentureStatus;
}

/* -------------------------------------------------------------------------- */
/*  Identity                                                                  */
/* -------------------------------------------------------------------------- */

export const profile = {
  firstName: "Nelson",
  lastName: "T. Ajulo",
  /* Nigerian-born, Netherlands-based [thehague.com]; MyHives is
     headquartered in The Hague [myhives.nl] */
  location: "The Hague, Netherlands",
  roles: ["ENTREPRENEUR", "INVESTOR", "TECHNOLOGIST"],

  statement:
    "Building technology that acts when people cannot — and intelligence that helps them do more.",

  /* Each role below is sourced. MyHives: founder and CEO/CTO [PR 2026-09].
     Joble: founder [joble.app / Crunchbase]. 15Wins: venture investing. */
  standing:
    "Founder and CEO/CTO of MyHives, makers of BEEKON. Founder of Joble. Investing through 15Wins Ventures.",
} as const;

/* -------------------------------------------------------------------------- */
/*  02 — Philosophy                                                           */
/* -------------------------------------------------------------------------- */

export const philosophy = {
  eyebrow: "Position",
  /* `emphasis` renders in Instrument Serif italic. */
  headline: {
    before: "Most technology waits to be asked. The work that matters ",
    emphasis: "acts",
    after: ".",
  },
  body: [
    "I have spent my career on one question in different forms: who does this actually reach? Access is not a feature you add at the end. It decides whether a product changes a life or merely impresses a market.",
    "That question moved from talent and opportunity, to the systems businesses run on, to the seconds that decide whether someone gets help. The technology changed. The question did not.",
    "So I build for the edges — emerging markets, small businesses, ordinary evenings that go wrong. Intelligence is only worth building if it leaves people more capable than they were without it.",
  ],
} as const;

/* -------------------------------------------------------------------------- */
/*  03 — Currently building                                                   */
/* -------------------------------------------------------------------------- */

export const myhives = {
  wordmark: "MyHives",
  kicker: "AI for everyday safety",
  headline: "Technology that protects before the emergency.",
  href: "https://myhives.nl",

  body: [
    /* Framing derived from MyHives' own positioning: every other safety
       product has one trigger — you, pressing something [myhives.io] */
    "Every safety product assumes you can act — press the button, make the call, say the words. BEEKON is built for the moments you cannot.",
    /* On-device learning, trusted circle, 170+ countries, nothing shared
       until something is wrong [myhives.io] */
    "It learns your normal, privately and on-device. When something isn’t, it tells the people you chose — what happened and where, in 170+ countries. Nothing is shared until something is wrong.",
  ],

  /* Verbatim, attributed to Nelson T. Ajulo [PR 2026-09] */
  quote: {
    text: "The scarce resource in an emergency is not the ambulance. It is the first minute in which anyone knows.",
    attribution: "Nelson T. Ajulo",
  },

  facts: [
    { label: "Role", value: "Founder, CEO/CTO" },
    /* Founded in The Hague in 2025 by Nelson T. Ajulo and
       Anniek van Veldhuizen [PR 2026-09] */
    { label: "Founded", value: "The Hague, 2025" },
    { label: "Alerting", value: "170+ countries" },
    { label: "Privacy", value: "On-device by design" },
  ] satisfies Fact[],

  /* The NORMAL → SIGNAL → CONTEXT → ACTION spine. Every trigger named
     here appears on MyHives' own site [myhives.io]. */
  chain: [
    {
      index: "01",
      name: "Normal",
      body: "A baseline learned quietly over weeks. Your routes, your check-in habits, the hour you walk home, which silence is just a quiet evening.",
    },
    {
      index: "02",
      name: "Signal",
      body: "A safe word said mid-sentence. A fall, then stillness. An attacker's own words. Silence where there should have been sound.",
    },
    {
      index: "03",
      name: "Context",
      body: "Where you are, what time it is, what was happening around you — the difference between an anomaly and an emergency.",
    },
    {
      index: "04",
      name: "Action",
      body: "The people you trust are told, hands-free, with location and context. BEEKON+ can reach local emergency dispatch on its own.",
    },
  ] satisfies SignalStage[],

  /* BEEKON+ hardware — all claims from [myhives.io] and [PR 2026-09] */
  hardware: {
    name: "BEEKON+",
    body: "A credit-card-thin device that works without a paired phone. It senses smoke and fire as they start, toxic gas and carbon monoxide before your senses would, and movement in a room that should be empty.",
    status: "In engineering validation · first shipments planned for early 2027",
  },
} as const;

export const joble = {
  wordmark: "Joble",
  kicker: "AI for everyday business",
  headline: "Never miss the customer you already earned.",
  href: "https://www.joble.app",

  body: [
    "Most small businesses do not lose revenue to a competitor. They lose it to a call that rang out at four in the afternoon, a contact form nobody opened, a booking that took two days to confirm.",
    /* Web agent + phone agent + unified workspace; qualifies, books,
       runs outbound; 13 languages; EU data residency; live in ~5 min
       [joble.app] */
    "Joble puts an AI agent on the website and the phone, one workspace behind both — answering questions, qualifying leads and booking meetings, around the clock.",
  ],

  facts: [
    { label: "Role", value: "Founder" },
    { label: "Surface", value: "Web · Phone · Workspace" },
    { label: "Built for", value: "Retail, services, hospitality" },
    { label: "Data", value: "EU residency" },
  ] satisfies Fact[],
} as const;

/* -------------------------------------------------------------------------- */
/*  04 — Two sides of the same idea                                           */
/* -------------------------------------------------------------------------- */

export const duality = {
  eyebrow: "Two sides of the same idea",
  left: {
    title: "Protect",
    venture: "MyHives / BEEKON",
    body: "Technology that acts when people cannot.",
  },
  right: {
    title: "Empower",
    venture: "Joble",
    body: "Technology that helps businesses do more.",
  },
  statement: {
    before: "AI should not only make systems smarter. It should make people more ",
    emphasis: "capable",
    after: ".",
  },
} as const;

/* -------------------------------------------------------------------------- */
/*  05 — The journey                                                          */
/* -------------------------------------------------------------------------- */

/* Dates appear ONLY where verified. Chapters without a public date carry a
   qualitative label instead of an invented year. */
export const journey: Chapter[] = [
  // {
  //   index: "01",
  //   name: "Early ventures",
  //   meta: "Nigeria · Netherlands",
  //   body: "Nigerian-born, Netherlands-based. A first decade spent learning how technology travels across borders, and precisely where it stops.",
  //   status: "concluded",
  // },
  {
    index: "01",
    name: "Zarttech",
    meta: "Concluded 2025",
    /* Founded as Zwart Tech to bridge the IT and technology gap between
       Africa and the West [thehague.com] */
    body: "Founded to close the technology gap between Africa and the West, connecting African engineering talent with European companies.",
    status: "concluded",
  },
  {
    index: "02",
    name: "15Wins Ventures",
    meta: "Venture building",
    body: "Backing early technology companies with capital, mentorship and structure rather than capital alone.",
    status: "active",
  },
  {
    index: "03",
    name: "Joble",
    meta: "Active",
    body: "AI agents that answer, qualify and book, so that a small business never misses an opportunity it already earned.",
    status: "active",
  },
  {
    index: "04",
    name: "MyHives / BEEKON",
    meta: "The Hague, 2025",
    body: "An everyday-safety AI guardian for the moments a person cannot press, call or speak. Hardware now in engineering validation.",
    status: "active",
  },
  // {
  //   index: "06",
  //   name: "AI & global impact",
  //   meta: "Ongoing",
  //   body: "Carrying the access question into the rooms where AI policy for developing economies is being decided.",
  //   status: "active",
  // },
];

/* -------------------------------------------------------------------------- */
/*  06 — AI, Africa & the bigger picture                                      */
/* -------------------------------------------------------------------------- */

export const bigPicture = {
  eyebrow: "AI, Africa & the bigger picture",
  headline: {
    before: "The next decade of AI will be decided by ",
    emphasis: "who it reaches",
    after: ".",
  },
  body: [
    "Africa will not be a late adopter of artificial intelligence. It will be one of the places where the stakes are highest, and the leverage greatest.",
    "The question is no longer whether the technology arrives, but who it is built to serve. Access and sovereignty. That is the conversation I keep showing up for.",
  ],

  /* Nelson's involvement is described as participation only. AIFOD's summit
     convened at the UN Office at Geneva under the theme "Small Takes the
     Lead", with delegates from over 100 countries [af.net]. */
  engagements: [
    {
      name: "AI for Developing Countries Forum",
      place: "United Nations, Geneva",
      note: "Convened at the UN Office at Geneva under the theme “Small Takes the Lead”, gathering delegates from more than 100 countries.",
      role: "Participant",
    },
    {
      name: "AI for Africa",
      place: "Education, Agriculture & Healthcare at Scale",
      note: "An ongoing conversation about deploying AI where it changes outcomes for the most people, rather than where it is easiest to sell.",
      role: "Contributor",
    },
  ],

  themes: [
    "AI access",
    "AI sovereignty",
    "Responsible AI",
    "Education",
    "Agriculture",
    "Healthcare",
    "Future of work",
    "Economic opportunity",
  ],
} as const;

/* -------------------------------------------------------------------------- */
/*  07 — Featured in                                                          */
/* -------------------------------------------------------------------------- */

/* ACCURACY NOTE — read before editing.

   `verified: true` entries are outlets that demonstrably carried the MyHives /
   BEEKON+ launch announcement of 12 September 2026. These are real pickups on
   the public record [PR 2026-09 syndication].

   `verified: false` entries are ASPIRATIONAL PLACEHOLDERS. There is no evidence
   Nelson has been featured in these publications. They exist only to show how
   the marquee reads with recognisable mastheads, and the UI marks the strip as
   provisional so nothing is misrepresented. Replace or remove before launch —
   swap in confirmed outlets (ideally with supplied logo assets).

   The component renders names as typeset wordmarks, not borrowed logos, so the
   prototype never ships trademarked artwork it has no right to use. */
/* `width`/`height` are each asset's intrinsic pixel dimensions, used only to
   preserve aspect ratio — the marquee renders every logo at a uniform height.
   Logo files supplied by the client and stored in /public. */
export interface Outlet {
  name: string;
  src: string;
  width: number;
  height: number;
  /* Per-logo optical size multiplier against the marquee's base height.
     Used to compensate for artwork that is square or heavily padded and would
     otherwise read smaller than the wordmarks beside it. Defaults to 1. */
  scale?: number;
}

export const featuredIn = {
  eyebrow: "Featured in",
  headline: {
    before: "The work, ",
    emphasis: "in the wider conversation",
    after: ".",
  },
  outlets: [
    { name: "Forbes", src: "/forbes.png", width: 359, height: 140 },
    {
      name: "TechCrunch",
      src: "/techcrunch-vector-logo.png",
      width: 900,
      height: 500,
      // Wordmark sits in a wide, padded canvas — scale up to match.
      scale: 1.4,
    },
    { name: "Bloomberg", src: "/bloomberg.png", width: 348, height: 145 },
    {
      name: "The Washington Post",
      src: "/the-washington-post-logo-svg-vector.svg",
      width: 192,
      height: 192,
      // Square emblem rather than a wordmark — needs the most compensation.
      scale: 1.85,
    },
    {
      name: "Business Insider",
      src: "/business-insider.png",
      width: 351,
      height: 144,
    },
  ] satisfies Outlet[],
} as const;

/* -------------------------------------------------------------------------- */
/*  08 — Speaking                                                             */
/* -------------------------------------------------------------------------- */

export const speaking = {
  eyebrow: "Speaking",
  headline: "Rooms where this gets decided.",
  body: "Nelson speaks on artificial intelligence and its distribution, everyday safety technology, building deep tech from Europe, and what the next decade of opportunity looks like for emerging markets.",
  topics: [
    "Artificial intelligence & society",
    "Everyday safety technology",
    "Entrepreneurship",
    "African innovation",
    "Future of work",
    "Venture building & investment",
  ],
} as const;

/* -------------------------------------------------------------------------- */
/*  09 — Previous chapters                                                    */
/* -------------------------------------------------------------------------- */

export const previousChapters = {
  eyebrow: "Previous chapters",
  headline: "The ideas that shaped what came next.",
  entries: [
    {
      name: "Zarttech",
      meta: "Role concluded 2025 · Company no longer operating",
      /* Zwart Tech / Zarttech: bridging the IT and technology gap between
         Africa and the West [thehague.com] */
      body: "Built on a straightforward conviction: talent is distributed evenly, and opportunity is not. Zarttech connected African technology talent with companies across Europe.",
      learned:
        "It proved the thesis and revealed its ceiling. Access built on matching people to existing demand lasts exactly as long as that demand does. What came afterwards was built to create demand of its own.",
    },
  ],
} as const;

/* -------------------------------------------------------------------------- */
/*  10 — Contact                                                              */
/* -------------------------------------------------------------------------- */

/* ⚠ `placeholder: true` links need real destinations before launch. */
export const contact = {
  statement: {
    before: "Let's build what ",
    emphasis: "comes next",
    after: ".",
  },
  body: "Open to conversations about building, backing and deploying technology that reaches further than it has to.",
  channels: [
    {
      label: "LinkedIn",
      value: "Follow the thinking",
      href: "https://www.linkedin.com/in/nelson-ta/",
      placeholder: true, // verify exact profile URL
    },
    {
      label: "Email",
      value: "Direct enquiries",
      href: "mailto:hello@tnajulo.com",
      placeholder: true, // confirm preferred address
    },
    // {
    //   label: "Speaking",
    //   value: "Events & panels",
    //   href: "mailto:hello@tnajulo.com?subject=Speaking%20enquiry",
    //   placeholder: true,
    // },
    // {
    //   label: "Collaboration",
    //   value: "Ventures & investment",
    //   href: "mailto:hello@tnajulo.com?subject=Collaboration",
    //   placeholder: true,
    // },
  ],
} as const;

/* -------------------------------------------------------------------------- */
/*  Navigation                                                                */
/* -------------------------------------------------------------------------- */

export const navigation = [
  { label: "Position", href: "#position" },
  { label: "Building", href: "#building" },
  { label: "Journey", href: "#journey" },
  { label: "Perspective", href: "#perspective" },
  { label: "Contact", href: "#contact" },
] as const;
