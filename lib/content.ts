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

  /* Verbatim hero copy [Website brief §5]. No em/en dashes as punctuation
     anywhere on the site [brief writing rule]. */
  statement:
    "Building technology that acts when people cannot, and intelligence that helps them do more.",

  /* Verbatim hero subhead [Website brief §5]. */
  standing:
    "CEO and Co-Founder of MyHives, makers of BEEKON. Founder of Joble. General Partner at 15Wins Ventures. AIFOD Global Advocate.",
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
    /* Corrected per brief §5: em dash removed. */
    "So I build for the edges. Emerging markets, small businesses, ordinary evenings that go wrong. Intelligence is only worth building if it leaves people more capable than they were without it.",
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

  /* Verbatim corrected body [brief §5]: em dashes removed, 170+ to 190+. */
  body: [
    "Every safety product assumes you can act: press the button, make the call, say the words. BEEKON is built for the moments you cannot.",
    "It learns your normal, privately and on-device. When something isn’t, it tells the people you chose, what happened and where, in 190+ countries. Nothing is shared until something is wrong.",
  ],

  /* Verbatim, attributed to Nelson T. Ajulo [PR 2026-09] */
  quote: {
    text: "The scarce resource in an emergency is not the ambulance. It is the first minute in which anyone knows.",
    attribution: "Nelson T. Ajulo",
  },

  facts: [
    { label: "Role", value: "CEO & Co-Founder" },
    /* Founded in The Hague in 2025 by Nelson T. Ajulo and
       Anniek van Veldhuizen [PR 2026-09] */
    { label: "Founded", value: "The Hague, 2025" },
    { label: "Alerting", value: "190+ countries" },
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
      body: "Where you are, what time it is, what was happening around you: the difference between an anomaly and an emergency.",
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
    "Joble puts an AI agent on the website and the phone, one workspace behind both, answering questions, qualifying leads and booking meetings, around the clock.",
  ],

  facts: [
    { label: "Role", value: "Founder" },
    { label: "Surface", value: "Web · Phone · Workspace" },
    { label: "Built for", value: "Retail, services, hospitality" },
    { label: "Data", value: "EU residency" },
  ] satisfies Fact[],
} as const;

/* New third "Currently building" card [brief §5]. All copy verbatim. */
export const fifteenWins = {
  wordmark: "15Wins Ventures",
  headline: "Capital and studio infrastructure for the next decade.",
  href: "https://15wins.com",

  body: [
    "A venture platform for what technology has not yet reached.",
    "Not every company gets built by writing a cheque. Some need capital, some need infrastructure, some need someone who has done the specific hard thing before. 15Wins provides the whole stack, from idea to validated market entry, across Europe, the UK, Africa, and the US.",
  ],

  facts: [
    { label: "Role", value: "General Partner" },
    { label: "Focus", value: "AI, safety, infrastructure" },
    { label: "Geography", value: "Europe, UK, Africa, US" },
    { label: "Stage", value: "Pre-seed to Series A" },
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
  // statement: {
  //   before: "AI should not only make systems smarter. It should make people more ",
  //   emphasis: "capable",
  //   after: ".",
  // },
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
/*  07 — Institutional context                                               */
/* -------------------------------------------------------------------------- */

/* Replaces the former "Featured in" logo strip [brief §1.1]. Displaying
   editorial brand marks without genuine, linkable coverage was a trademark and
   credibility risk, so it is removed entirely. This panel carries verifiable
   institutional standing instead, all copy verbatim from brief §5. A proper
   "In the press" section replaces this only if real coverage with working
   links arrives. */
export interface Credential {
  label: string;
  body: string;
}

export const institutional = {
  eyebrow: "Institutional context",
  items: [
    {
      label: "AIFOD Global Advocate",
      body: "AI for Developing Countries Forum, Geneva. Contributed to the Summer Summit at the UN Palais des Nations in August 2026, on the panel Small Takes the Lead, addressing AI sovereignty and equitable access.",
    },
    {
      label: "CSU Innovation Award",
      body: "€10,000 recognition for MyHives from CSU, national facility services.",
    },
    {
      label: "Backed by",
      body: "Trigion (Securitas group, licensed 24/7 alarm centre), Marsh (global insurance broker), CSU (national facility services), TZorg (home care, 300,000+ clients).",
    },
    {
      label: "Prior recognitions",
      body: "European Entrepreneur of the Year (2024). Bold EdTech Award (2023). FUTR150 Founders and Startups Award (2022).",
    },
  ] satisfies Credential[],
} as const;

/* -------------------------------------------------------------------------- */
/*  08 — Speaking                                                             */
/* -------------------------------------------------------------------------- */

export const speaking = {
  eyebrow: "Speaking",
  headline: "Rooms where this gets decided.",
  body: "Nelson speaks on artificial intelligence and its distribution, everyday safety technology, building deep tech from Europe, and what the next decade of opportunity looks like for emerging markets.",
  /* Subjects verbatim from brief §5 (homepage Speaking section). */
  topics: [
    "AI and society",
    "AI sovereignty",
    "Everyday safety technology",
    "Building deep tech from Europe",
    "African innovation and diaspora capital",
    "Venture building and investment",
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

/* Social links. LinkedIn URL to be verified before launch. */
export const social = {
  linkedin: "https://www.linkedin.com/in/nelson-ta/",
} as const;

/* Homepage closing CTA, routed by enquiry type per brief §5. Each door points
   at the desk that handles it: the contact page, the speaking form, press, and
   the podcast guest application. */
export const contact = {
  statement: {
    before: "Let's build what ",
    emphasis: "comes next",
    after: ".",
  },
  body: "Open to conversations about building, backing and deploying technology that reaches further than it has to.",
  channels: [
    { label: "Building or backing", value: "Get in touch", href: "/contact" },
    { label: "Speaking", value: "Speaking enquiries", href: "/speaking#booking" },
    { label: "Press or media", value: "Media enquiries", href: "mailto:press@tnajulo.com" },
    { label: "Podcast", value: "Guest application", href: "/podcast#apply" },
  ],
} as const;

/* -------------------------------------------------------------------------- */
/*  09 — Podcast preview (homepage)                                            */
/* -------------------------------------------------------------------------- */

/* NEW SECTION per brief §5. Copy verbatim; distinct from the podcast hero
   tagline. The show name is carried inside the body, as the brief sets it. */
export const podcastPreview = {
  eyebrow: "Podcast",
  headline: "A podcast on who technology reaches.",
  body: "What Comes Next. A long-form conversation with the founders, investors, and researchers building the next decade of opportunity. Season one, coming soon.",
  cta: { label: "Listen and apply as a guest", href: "/podcast" },
} as const;

/* -------------------------------------------------------------------------- */
/*  Podcast  (/podcast)                                                       */
/* -------------------------------------------------------------------------- */

/* Podcast content. Prose is verbatim from brief §4.4 where the brief supplies
   it. Notes on the live wiring:

   • `name` ("What Comes Next") is confirmed by Nelson.
   • The lineup is an illustrative season one: themes are real, guests read
     "Guest to be announced". Real episodes replace these via Sanity (task #4).
   • Subscribe and social links are placeholders until the show is hosted and
     handles are confirmed.
   • The guest application posts to NEXT_PUBLIC_PODCAST_FORM_ENDPOINT and
     notifies support@tnajulo.com. There is no silent fallback: an unconfigured
     or failed submission surfaces an error (brief §4.3, forms must never
     silently fail).
   • The newsletter posts to /api/subscribe, which calls Beehiiv server-side. */

export interface PodcastEpisode {
  index: string;
  title: string;
  blurb: string;
  guest: string;
}

export interface ApplyField {
  name: string;
  label: string;
  type: "text" | "email" | "url" | "textarea";
  placeholder: string;
  required: boolean;
  autoComplete?: string;
}

export const podcast = {
  /* Title confirmed by Nelson and set verbatim in brief §4.4. */
  name: "What Comes Next",
  nameIsPlaceholder: false,

  hero: {
    eyebrow: "The podcast",
    tagline: {
      before: "Conversations with the people deciding ",
      emphasis: "who technology actually reaches",
      after: ".",
    },
    standing:
      "A long-form conversation with the founders, investors and researchers building the next decade of opportunity, in AI, in safety, and in the markets the industry usually reaches last.",
    status: "Season one, coming soon",

    /* Hero atmosphere: a microphone photograph for the right-hand column,
       desaturated and masked so it dissolves into the ink on every edge (the
       same treatment as the portrait on the home hero). Save the file into
       public/ and point this at it. Set to "" to hide the column entirely.
       A dark, close, off-centre crop reads best; a bright centred product
       shot fights the type and lands as stock. */
    image: "/podcast-mic.png",
  },

  /* Subscribe destinations — placeholders until the show is hosted. */
  subscribe: [
    { label: "Spotify", href: "#", placeholder: true },
    { label: "Apple Podcasts", href: "#", placeholder: true },
    { label: "YouTube", href: "#", placeholder: true },
    { label: "RSS", href: "#", placeholder: true },
  ],

  premise: {
    eyebrow: "The premise",
    headline: {
      before: "Most conversations about technology stop at ",
      emphasis: "what it can do",
      after: ".",
    },
    body: [
      "This one starts with a harder question: who does it actually reach, and who gets left waiting?",
      "Each episode sits down with someone building at that edge. Expanding access. Closing distance. Turning a clever system into something that changes an ordinary life. Founders and funders, engineers and operators, the occasional heretic.",
      "No hype cycle, no launch tour. Just the real texture of building things that matter, told by the people doing it.",
    ],
  },

  /* B — Latest episode. A launch TEMPLATE per brief §4.4: no episode exists
     yet, so guest/duration/date are bracketed placeholders and the player is a
     placeholder until a real episode (and its embed URL) lands via Sanity. */
  latest: {
    eyebrow: "Latest episode",
    number: "Episode 01",
    title: "The first minute is the whole emergency",
    guest: "With [Guest name], [Role, Organisation]",
    meta: "[Duration] · [Publication date]",
    synopsis:
      "Every safety product on the market assumes you can act. You can press the button. You can make the call. You can say the words. In the seconds when none of that is possible, what actually helps?",
    note: "Template shown for launch. Episode 01 publishes with season one.",
    links: [
      { label: "Listen on Spotify", href: "#" },
      { label: "Apple Podcasts", href: "#" },
      { label: "YouTube", href: "#" },
      { label: "Read transcript", href: "#" },
    ],
  },

  /* D — Season one lineup. Six planned conversations, copy verbatim from
     brief §4.4. Guests are deliberately "to be announced"; themes stay
     visible. Real episodes replace these via Sanity (task #4). */
  episodes: {
    eyebrow: "Season one",
    headline: "The opening arc.",
    /* The count prefix ("Six conversations.") is prepended in the component so
       it always matches the number of episodes actually listed (confirmed with
       Nelson; overrides the fixed "Six" in brief §4.4). */
    subTail: "One thread. Who technology reaches, and who gets left behind.",
    note: "Sample lineup. Guests to be announced.",
    items: [
      {
        index: "01",
        title: "The first minute is the whole emergency",
        blurb:
          "Why the hardest problem in personal safety is not the response, it is the seconds before anyone knows.",
        guest: "Guest to be announced",
      },
      {
        index: "02",
        title: "What a small business actually buys when it buys AI",
        blurb:
          "Beyond the demos: what changes when an agent answers every call and never forgets to follow up.",
        guest: "Guest to be announced",
      },
      {
        index: "03",
        title: "Access before intelligence",
        blurb:
          "AI in developing economies. What has to be true on the ground before the models matter.",
        guest: "Guest to be announced",
      },
      {
        index: "04",
        title: "The compute layer nobody talks about",
        blurb:
          "Who owns the infrastructure that runs the models, and what that means for everyone else.",
        guest: "Guest to be announced",
      },
      {
        index: "05",
        title: "Building deep tech from Europe",
        blurb:
          "Why the Old World may be better positioned for the next decade than the Valley admits.",
        guest: "Guest to be announced",
      },
      {
        index: "06",
        title: "The talent that leaves, and the talent that stays",
        blurb:
          "What five years of moving African engineers into global AI teams taught me about who benefits.",
        guest: "Guest to be announced",
      },
    ] satisfies PodcastEpisode[],
  },

  /* F — Meet the host. Copy verbatim from brief §4.4. */
  host: {
    eyebrow: "Meet the host",
    name: "Nelson T. Ajulo, PhD",
    bio: "Nelson is a technology entrepreneur and investor. He is CEO and Co-Founder of MyHives, an AI safety platform protecting 35,000+ people across 190+ countries. He is founder of Joble, an AI customer engagement platform serving 500+ businesses. He is General Partner at 15Wins Ventures. He is an AIFOD Global Advocate and contributed to the AI for Developing Countries Forum Summer Summit at the UN Palais des Nations in August 2026.",
    line: "He has spent his career on one question in different forms: who does this actually reach?",
    photo: "/nelson-ta.jpeg",
    cta: { label: "Learn more about Nelson", href: "/about" },
  },

  /* The centrepiece: the open invitation. */
  apply: {
    eyebrow: "Be part of it",
    headline: {
      before: "There's a ",
      emphasis: "seat at the table",
      after: ".",
    },
    intro:
      "The best guests rarely have a press team. If you are building, funding, or researching something that widens who gets to participate, put yourself forward. Every application is read.",
    lookingFor: [
      "Founders building in AI, fintech, safety, or hard infrastructure",
      "Investors and operators backing overlooked markets",
      "Researchers turning work into things people can use",
      "Anyone expanding access to opportunity in an unusual way",
    ],
    form: {
      fields: [
        {
          name: "name",
          label: "Full name",
          type: "text",
          placeholder: "Your name",
          required: true,
          autoComplete: "name",
        },
        {
          name: "email",
          label: "Email",
          type: "email",
          placeholder: "you@company.com",
          required: true,
          autoComplete: "email",
        },
        {
          name: "role",
          label: "Role & organisation",
          type: "text",
          placeholder: "Founder & CEO, Company",
          required: true,
          autoComplete: "organization-title",
        },
        {
          name: "link",
          label: "LinkedIn or website",
          type: "url",
          placeholder: "https://",
          required: false,
          autoComplete: "url",
        },
        {
          name: "pitch",
          label: "What would you want to explore on the show?",
          type: "textarea",
          placeholder:
            "A sentence or two on what you're building and the conversation you'd want to have.",
          required: true,
        },
        {
          name: "appearances",
          label: "Prior podcast or speaking appearances",
          type: "text",
          placeholder: "Links or names, if any",
          required: false,
        },
        {
          name: "referral",
          label: "How did you hear about the show?",
          type: "text",
          placeholder: "A friend, LinkedIn, a guest",
          required: true,
        },
      ] satisfies ApplyField[],
      submitLabel: "Submit application",
      successTitle: "Application received.",
      successBody:
        "Thank you, it is in. If there is a fit, you will hear from the team directly.",
      errorBody:
        "Something went wrong. Please try again, or email support@tnajulo.com.",
      consent: "Applications go straight to the show's team. No list, no spam.",
    },
  },

  /* H — Sponsor. Copy verbatim from brief §4.4. */
  sponsor: {
    eyebrow: "Sponsor",
    headline: "Sponsor a season.",
    body: "A limited number of sponsorship slots are open for season one. Reach a curated audience of founders, investors, and operators building in AI, safety, and emerging markets.",
    cta: {
      label: "Request the sponsor deck",
      href: "mailto:support@tnajulo.com?subject=What%20Comes%20Next%20sponsorship",
    },
  },

  /* I — Newsletter. Copy verbatim from brief §4.4. Wired to Beehiiv via a
     server route; see components/podcast/podcast-newsletter.tsx. */
  newsletter: {
    eyebrow: "Newsletter",
    headline: "Get the show in your inbox.",
    body: "Every new episode, guest reading lists, and one line from Nelson each week. No spam, unsubscribe anytime.",
    placeholder: "you@email.com",
    submitLabel: "Subscribe",
    successBody: "You are in. Watch your inbox.",
    errorBody: "Something went wrong. Please try again.",
  },

  /* J — Community. No verbatim copy in the brief; kept minimal and marked.
     Social handles to be confirmed with Nelson before launch. */
  community: {
    eyebrow: "Community",
    headline: "Follow the show.",
    links: [
      { label: "LinkedIn", href: "#", placeholder: true },
      { label: "X", href: "#", placeholder: true },
      { label: "YouTube", href: "#", placeholder: true },
      { label: "Instagram", href: "#", placeholder: true },
    ],
    note: "Social handles to be confirmed.",
  },
} as const;

/* -------------------------------------------------------------------------- */
/*  About  (/about)  — copy verbatim from brief §6                            */
/* -------------------------------------------------------------------------- */

export const about = {
  eyebrow: "About",
  heading: "About Nelson.",
  intro: [
    "Nelson T. Ajulo is a technology entrepreneur and investor building at the intersection of artificial intelligence, everyday safety, and economic opportunity.",
    "He is CEO and Co-Founder of MyHives, an AI safety platform protecting 35,000+ people across 190+ countries, with distribution partnerships including Trigion (Securitas group), Marsh, CSU, and TZorg. He is founder of Joble, an AI customer engagement platform trusted by 500+ businesses. He is General Partner at 15Wins Ventures, a venture studio deploying across Europe, the UK, Africa, and the US.",
    "Nelson is an AIFOD Global Advocate for the AI for Developing Countries Forum, and contributed to the AIFOD Summer Summit at the UN Palais des Nations in Geneva in August 2026.",
  ],
  earlierWork: {
    heading: "Earlier work.",
    body: [
      "Before MyHives, Joble, and 15Wins, Nelson founded Zarttech (2020 to 2025), a global IT talent platform he scaled to 700+ engineers across four countries before winding down in 2025. Concurrently he founded the Zarttalent Foundation, which trained 2,000+ young Africans, with a focus on women in tech, in data and engineering skills.",
      "Nelson has three prior venture exits: The Bridge Empire Consultancy (acquired in 2020), TBEC Education (sold to a family office in 2020), and Fly TBEC (sold to a family office in 2020).",
    ],
  },
  education: {
    heading: "Education.",
    items: [
      "PhD, International Economics, University of Gdansk",
      "MBA, Business Administration, Anglia Ruskin University",
      "Master's and Bachelor's, Architecture, Limkokwing University of Creative Technology",
      "Cybersecurity: Managing Risk in the Information Age, Harvard University executive programme",
    ],
  },
  recognitions: {
    heading: "Recognitions.",
    items: [
      "CSU Innovation Award (MyHives, 2026)",
      "European Entrepreneur of the Year (2024)",
      "Bold EdTech Award (2023)",
      "FUTR150 Founders and Startups Award (2022)",
    ],
  },
  boardAdvisory: {
    heading: "Board and advisory.",
    items: [
      "Chairman, Supervisory Board, MyHives Nigeria",
      "Investor and Advisor, Heilen",
      "Member, ForbesBLK",
      "Mentor, Diverse Leaders in Tech, Amsterdam",
    ],
  },
  location: "Nelson is based in The Hague, Netherlands.",
  /* CV asset to be supplied by Nelson. */
  cta: [
    { label: "Download CV", href: "#", placeholder: true },
    { label: "Contact", href: "/contact", placeholder: false },
  ],
} as const;

/* -------------------------------------------------------------------------- */
/*  Company anchor pages  — brief §10; reuse §5 copy + verified extras        */
/* -------------------------------------------------------------------------- */

/* Page-specific additions to the existing myhives / joble / fifteenWins
   objects. `extra` is the additional partnerships/traction paragraph the brief
   asks for, written only from verified facts. */
export const companyExtras = {
  myhives: {
    siteLabel: "myhives.nl",
    extra:
      "MyHives works with distribution partners including Trigion (Securitas group, licensed 24/7 alarm centre), Marsh, CSU, and TZorg, and protects 35,000+ people across 190+ countries.",
  },
  joble: {
    siteLabel: "joble.app",
    extra:
      "Joble is trusted by 500+ businesses across e-commerce, professional services, and hospitality.",
  },
  fifteenwins: {
    siteLabel: "15wins.com",
    extra:
      "15Wins deploys from pre-seed to Series A across Europe, the UK, Africa, and the US, focused on AI, safety, and infrastructure.",
  },
} as const;

/* -------------------------------------------------------------------------- */
/*  Speaking page  (/speaking)  — copy verbatim from brief §7                 */
/* -------------------------------------------------------------------------- */

export const speakingPage = {
  eyebrow: "Speaking",
  heading: "Speaking.",
  lead: {
    heading: "What Nelson speaks about.",
    body: "Nelson speaks on artificial intelligence and its distribution, everyday safety technology, building deep tech from Europe, and what the next decade of opportunity looks like for emerging markets.",
  },
  signature: {
    heading: "Signature talks.",
    talks: [
      {
        title:
          "The AI Sovereignty Playbook: How Small Nations and Small Companies Own the Layer That Matters.",
        body: "A framework for governments, founders, and investors identifying and acquiring durable ownership at the weights, compute, data, distribution, or talent layer of the AI economy. First delivered at the AIFOD Summer Summit, UN Palais des Nations, August 2026.",
      },
      {
        title: "The First Minute Is the Whole Emergency.",
        body: "Why the hardest problem in personal safety is not the response, it is the seconds before anyone knows. Drawing on the design of MyHives and BEEKON.",
      },
      {
        title: "What Diaspora Capital Is Actually Building.",
        body: "An operator view on how founders abroad are deploying capital and infrastructure back into Nigeria and across Africa, and what makes the pattern compound. Drawing on 15Wins Ventures, MyHives Nigeria, and Zarttech.",
      },
      {
        title: "Building Deep Tech from Europe.",
        body: "Why the Old World may be better positioned for the next decade than the Valley admits.",
      },
    ],
  },
  recent: {
    heading: "Recent appearances.",
    items: [
      "AIFOD Summer Summit, UN Palais des Nations, Geneva, August 2026. Panel: Small Takes the Lead.",
    ],
  },
  booking: {
    heading: "Booking.",
    body: "To invite Nelson to speak at your event, submit the form below. Please include event name, date, audience profile, honorarium and travel arrangement, and desired topic. Every enquiry is read.",
    kit: { label: "Download speaker kit PDF", href: "#", placeholder: true },
  },
} as const;

/* -------------------------------------------------------------------------- */
/*  Press page  (/press)  — copy verbatim from brief §8                       */
/* -------------------------------------------------------------------------- */

export const press = {
  eyebrow: "Press",
  heading: "Press and media.",
  bios: [
    {
      label: "Short bio (50 words)",
      body: "Dr Nelson T. Ajulo is CEO and Co-Founder of MyHives, an AI safety platform protecting 35,000+ people across 190+ countries. He is also founder of Joble and General Partner at 15Wins Ventures. He is an AIFOD Global Advocate and holds a PhD in International Economics from the University of Gdansk.",
    },
    {
      label: "Medium bio (100 words)",
      body: "Nelson T. Ajulo, PhD, is a serial founder and technology executive building at the intersection of AI, safety, and capital access across Europe and Africa. He is CEO and Co-Founder of MyHives, protecting 35,000+ people in 190+ countries; founder of Joble (500+ business clients); and General Partner at 15Wins Ventures. Previously, he founded Zarttech, scaling to 700+ engineers across four countries. As an AIFOD Global Advocate, he contributes to global conversations on AI sovereignty and equitable access. Nelson holds a PhD in International Economics, an MBA, and completed Cybersecurity executive studies at Harvard University.",
    },
  ],
  longBio: {
    label: "Long bio",
    note: "The full About profile is the long-form biography.",
    href: "/about",
  },
  headshots: {
    heading: "Headshots.",
    body: "High resolution portraits in landscape and portrait orientations, formal and working environments, licensed for editorial use with credit.",
    cta: { label: "Download high-res pack", href: "#", placeholder: true },
  },
  boilerplates: {
    heading: "Boilerplates.",
    items: [
      {
        name: "MyHives",
        body: "MyHives is the world's first everyday safety AI guardian, protecting 35,000+ people across 190+ countries, headquartered in The Hague.",
      },
      {
        name: "Joble",
        body: "Joble puts an AI agent on the website and the phone of small businesses, answering, qualifying, and booking around the clock, trusted by 500+ businesses.",
      },
      {
        name: "15Wins Ventures",
        body: "15Wins Ventures is a venture platform providing capital and studio infrastructure to companies in AI, safety, and infrastructure across Europe, the UK, Africa, and the US.",
      },
    ],
  },
  coverage: {
    heading: "Coverage.",
    /* Intentionally empty until real, linkable coverage exists (brief §8). */
    note: "Real coverage links only, added chronologically.",
  },
  mediaEnquiries: { heading: "Media enquiries.", email: "press@tnajulo.com" },
} as const;

/* -------------------------------------------------------------------------- */
/*  Contact page  (/contact)  — copy verbatim from brief §9                   */
/* -------------------------------------------------------------------------- */

/* Builder note (brief §9): all mailboxes below were confirmed by Nelson to
   exist. Speaking and guest enquiries route to on-site forms. */
export const contactPage = {
  eyebrow: "Contact",
  heading: "Get in touch.",
  intro:
    "Nelson receives more enquiries than he can answer personally. Please route yours below so it reaches the right desk quickly.",
  routes: [
    {
      label: "For MyHives, BEEKON, distribution or partnerships",
      value: "partnerships@myhives.nl",
      href: "mailto:partnerships@myhives.nl",
    },
    {
      label: "For Joble customer or partner enquiries",
      value: "hello@joble.app",
      href: "mailto:hello@joble.app",
    },
    {
      label: "For 15Wins Ventures pitches or LP conversations",
      value: "nelson@15wins.com",
      href: "mailto:nelson@15wins.com",
    },
    {
      label: "For speaking enquiries",
      value: "Speaking form",
      href: "/speaking#booking",
    },
    { label: "For press", value: "press@tnajulo.com", href: "mailto:press@tnajulo.com" },
    {
      label: "For podcast guest applications",
      value: "Guest application",
      href: "/podcast#apply",
    },
    { label: "For everything else", value: "hello@tnajulo.com", href: "mailto:hello@tnajulo.com" },
  ],
} as const;

/* -------------------------------------------------------------------------- */
/*  Writing page  (/writing)                                                  */
/* -------------------------------------------------------------------------- */

export const writingPage = {
  eyebrow: "Writing",
  heading: "Writing.",
  lead: "Long-form pieces and essays on artificial intelligence, safety, entrepreneurship, and the economics of access.",
  empty: "The first pieces are on the way. In the meantime, follow the thinking on LinkedIn.",
} as const;

/* -------------------------------------------------------------------------- */
/*  Navigation                                                                */
/* -------------------------------------------------------------------------- */

/* Primary nav per brief §3: Home (name mark), About, Companies (dropdown),
   Podcast, Speaking, Writing, Contact. Press lives in the footer. */
export interface NavItem {
  label: string;
  href?: string;
  children?: { label: string; href: string }[];
}

export const navigation: NavItem[] = [
  { label: "About", href: "/about" },
  {
    label: "Companies",
    children: [
      { label: "MyHives", href: "/myhives" },
      { label: "Joble", href: "/joble" },
      { label: "15Wins", href: "/15wins" },
    ],
  },
  { label: "Podcast", href: "/podcast" },
  { label: "Speaking", href: "/speaking" },
  { label: "Writing", href: "/writing" },
  { label: "Contact", href: "/contact" },
];

/* Footer navigation, including Press (brief §3). */
export const footerNav: { label: string; href: string }[] = [
  { label: "About", href: "/about" },
  { label: "MyHives", href: "/myhives" },
  { label: "Joble", href: "/joble" },
  { label: "15Wins", href: "/15wins" },
  { label: "Podcast", href: "/podcast" },
  { label: "Speaking", href: "/speaking" },
  { label: "Writing", href: "/writing" },
  { label: "Contact", href: "/contact" },
  { label: "Press", href: "/press" },
];
