/* ============================================================================
   CONTENT — single source of truth for every word of static copy.
   ----------------------------------------------------------------------------
   SOURCE: "Nelson T. Ajulo, Website Copy & SEO Proposal" (21 October 2026),
   prepared by Nelson's office for review. Copy is used as written there, in
   Nelson's own first-person voice, unless a comment says otherwise.

   RULES CARRIED OVER FROM THE ORIGINAL BRIEF:
   • No em or en dashes as sentence punctuation in rendered copy. Date ranges
     (2020-2025) are the only exception. Separators in the proposal's
     "Title - description" labels are split into separate fields instead.
   • Nothing unverified is presented as fact. The proposal deliberately softens
     product claims ("being built", "being developed") and removes usage
     figures pending verification; keep it that way until Nelson confirms the
     numbers. Its pre-publication checklist lists what still needs checking.

   Emphasis spans render in the accent colour only (no italic), matching the
   site's current treatment.
   ========================================================================== */

/* -------------------------------------------------------------------------- */
/*  Shared types                                                              */
/* -------------------------------------------------------------------------- */

export type VentureStatus = "active" | "concluded";

export interface Emphasis {
  before: string;
  emphasis: string;
  after: string;
}

export interface Chapter {
  index: string;
  name: string;
  meta: string;
  body: string;
  status: VentureStatus;
}

export interface Topic {
  title: string;
  body: string;
}

export interface Credential {
  label: string;
  body: string;
}

export interface Venture {
  /** Anchor on /ventures, also the target of the old /myhives etc. URLs. */
  id: string;
  wordmark: string;
  kicker: string;
  role: string;
  focus: string;
  href: string;
  siteLabel: string;
  /** Homepage "Currently building" card. Links to /ventures#id. */
  home: { headline: string; body: readonly string[]; cta: string };
  /** /ventures section. Links out to the company's own site. */
  page: { headline: string; body: readonly string[]; cta: string };
}

export interface ApplyField {
  name: string;
  label: string;
  type: "text" | "email" | "url" | "textarea" | "select";
  placeholder: string;
  required: boolean;
  autoComplete?: string;
  /** Choices for `select` fields. */
  options?: readonly string[];
}

/* -------------------------------------------------------------------------- */
/*  Identity + 01 Hero                                                        */
/* -------------------------------------------------------------------------- */

export const profile = {
  firstName: "Nelson",
  lastName: "T. Ajulo",
  location: "The Hague, Netherlands",
  /* From the proposal's own description of Nelson: "a technology
     entrepreneur, investor and venture builder". */
  roles: ["ENTREPRENEUR", "INVESTOR", "VENTURE BUILDER"],
  statement:
    "I build technology companies and invest in ideas that should reach more people.",
  intro:
    "I'm a technology entrepreneur and investor working across artificial intelligence, everyday safety and early-stage venture building. Through MyHives, Joble and 15Wins Ventures, I'm working on a simple question: how do we turn technology into something people can actually use, benefit from and build on?",
  ctas: {
    primary: { label: "Explore my ventures", href: "/ventures" },
    secondary: { label: "Listen to the podcast", href: "/before" },
  },
} as const;

/* -------------------------------------------------------------------------- */
/*  Homepage hero (Figma, November 2026)                                      */
/* -------------------------------------------------------------------------- */

/* Copy as set in the Figma design. It restates usage figures (35,000+ people,
   190+ countries) that the October copy proposal had removed pending
   verification: confirm with Nelson which direction stands before launch. */
export const homeHero = {
  title: "Nelson T. Ajulo",
  tagline: "Technology that acts when people cannot.",
  standing:
    "Co-Founder, CEO and CTO of MyHives, the everyday safety AI guardian protecting 35,000+ people across 190+ countries. Founder of Joble. General Partner at 15Wins Ventures. Host of BEFORE.",
  ctas: {
    primary: { label: "Listen to BEFORE", href: "/before" },
    secondary: { label: "Explore MyHives", href: "https://myhives.nl" },
  },
} as const;

/* -------------------------------------------------------------------------- */
/*  Homepage: BEFORE podcast block + stats strip (Figma)                      */
/* -------------------------------------------------------------------------- */

/* The podcast is now "BEFORE, a MyHives Original" in the Figma design, at
   /before (the old /podcast URLs redirect there). */
export const beforePreview = {
  eyebrow: "The podcast",
  name: "BEFORE",
  headline:
    "A MyHives Original. Conversations with people shaping our world about the experiences that shaped them.",
  body: "Everyone knows what they built. BEFORE asks what built them: what happened before the title, before the company, before the public story, and how those moments still shape what they decide today.",
  season: "Season one, the opening arc, from January 2027.",
  ctas: {
    listen: { label: "Listen to BEFORE", href: "/before" },
    episodes: { label: "All episodes", href: "/before#lineup" },
    apply: { label: "Apply to be a guest", href: "/before#apply" },
  },
  cover: { src: "/BEFORE.svg", width: 576, height: 549 },
} as const;

/* Figures as set in the Figma design. Verify before launch: the October copy
   proposal removed usage figures pending confirmation, and "50+ language
   pairs" is new in the design. */
export const homeStats = {
  avatars: [
    { src: "/nelson-avatar.jpg", name: "Nelson T. Ajulo" },
    { src: "/anniek-avatar.jpg", name: "Anniek van Veldhuizen" },
  ],
  items: [
    { value: "35,000+", label: "People protected by MyHives", visual: "avatars" },
    { value: "190+", label: "Countries", visual: "globe" },
    { value: "50+", label: "Language pairs for live emergency translation", visual: null },
    { value: "500+", label: "Businesses answering customers through Joble", visual: null },
  ],
} as const;

/* -------------------------------------------------------------------------- */
/*  Homepage: quote section (Figma)                                           */
/* -------------------------------------------------------------------------- */

/* Nelson's statement, set as a quote in the Figma design. `photo` is the
   turtleneck portrait cut out onto white; the card quote sits on the sweater. */
export const homeQuote = {
  card: "Safety is not an emergency category. It is what decides who gets to take part.",
  photo: { src: "/nelson-quote.jpg", position: "50% 42%" },
  body: [
    "People alter routes, stay silent, leave early and avoid places long before anything qualifies as an emergency. A street you avoid is harm too. I call that the grey zone: the everyday moments below the threshold of 112 that still narrow a life. I build for that zone. MyHives is a guardian that acts when a person cannot. Joble makes sure a small business never misses the customer it already earned. 15Wins backs the founders building the next infrastructure of participation, from The Hague to Lagos. BEFORE is where the people shaping our world explain what shaped them.",
    "Different work. One question: who does this actually reach?",
  ],
  attribution: { name: "Nelson T. Ajulo", avatar: "/nelson-quote-avatar.jpg" },
} as const;

/* -------------------------------------------------------------------------- */
/*  Homepage: ventures row + hive quote band (Figma)                          */
/* -------------------------------------------------------------------------- */

/* Three columns, one per venture. Logos are the Figma exports; width/height
   are their intrinsic sizes. CTAs go straight to each company's site. */
export const homeVentures = [
  {
    id: "myhives",
    name: "MyHives",
    logo: { src: "/MyHives.svg", width: 155, height: 33 },
    tagline: "A guardian, not an app.",
    body: "The everyday safety AI guardian. BEEKON acts hands-free in the moments when a person cannot press a button or make a call: a safe word, silence, a crash, a missed check-in. Live-translated emergency calls across 50+ language pairs, in 190+ countries. Partners include Trigion (Securitas group), Marsh, CSU and TZorg.",
    role: "Co-founder, CEO and CTO",
    cta: { label: "Explore MyHives", href: "https://myhives.nl" },
  },
  {
    id: "joble",
    name: "Joble",
    logo: { src: "/Joble.svg", width: 128, height: 29 },
    tagline: "Never miss a customer again.",
    body: "AI agents on the website and the phone of 500+ businesses, answering, qualifying and booking around the clock. Live in five minutes, in 13 languages, with EU data residency.",
    role: "Founder",
    cta: { label: "Explore Joble", href: "https://www.joble.app" },
  },
  {
    id: "15wins",
    name: "15Wins",
    logo: { src: "/15wins.svg", width: 139, height: 46 },
    tagline: "Builds and backs the companies that widen access.",
    body: "A venture builder for AI, safety and infrastructure companies across Europe, the UK, Africa and the US, with studio infrastructure and capital for the companies it builds and backs. It built MyHives and Joble.",
    role: "General Partner",
    cta: { label: "Explore 15Wins", href: "https://15wins.com" },
  },
] as const;

export const homeHiveQuote = {
  text: "A hive has a queen, but no commander. Who defines safety decides who gets it, and we are building a definition written by the people who live it.",
  attribution: { name: "Nelson T. Ajulo", avatar: "/nelson-quote-avatar.jpg" },
} as const;

/* Four credential cards under the hive quote (Figma). */
export const homeCredentials = [
  {
    title: "AIFOD Global Advocate",
    body: "AI for Developing Countries Forum, Geneva. Contributed to the Summer Summit at the United Nations Palais des Nations in August 2026, on the programme Small Takes the Lead, on AI sovereignty and equitable access.",
  },
  {
    title: "Working with institutions",
    body: "MyHives partners include Trigion (Securitas group, licensed 24/7 alarm centre), Marsh (global insurance broker), CSU (national facility services) and TZorg (home care, 300,000+ clients).",
  },
  {
    title: "Recognition",
    body: "European Entrepreneur of the Year 2024. CSU Innovation Award for MyHives. Bold EdTech Award 2023. FUTR150 Founders and Startups Award 2022.",
  },
  {
    title: "Earlier work",
    body: "Founded Zarttech (2020 to 2025), which placed 700+ African engineers into global technology teams, and the Zarttalent Foundation, which trained 2,000+ young Africans in technology skills.",
  },
] as const;

/* Speaking preview (Figma): four talks, each a photo over a cream caption.
   Photos were extracted from the Figma exports; the design crops each one
   centred to a 308 x 186 frame. */
export const homeSpeaking = {
  title: "Speaking",
  intro: "Four talks:",
  cta: { label: "Invite Nelson to Speak", href: "/speaking#booking" },
  talks: [
    { title: "The first minute is the whole emergency.", image: "/speaking-ai-for-africa.jpg" },
    { title: "Who defines safety.", image: "/speaking-myhives-nl.jpg" },
    { title: "Trained here, owned there.", image: "/speaking-joble-space.jpg" },
    { title: "Building deep tech from Europe.", image: "/speaking-esdp.jpg" },
  ],
} as const;

/* Closing call to action on the homepage (Figma "Get in touch"). */
export const homeContact = {
  title: "Get in touch",
  body: "For BEFORE guests and sponsors, press, speaking, investment and partnerships, go to the contact page and pick the desk. Everything is read.",
  cta: { label: "Contact", href: "/contact" },
} as const;

/* -------------------------------------------------------------------------- */
/*  02 Position                                                               */
/* -------------------------------------------------------------------------- */

export const philosophy = {
  eyebrow: "Position",
  headline: {
    before: "I've spent my career building things that ",
    emphasis: "connect people to opportunity",
    after: ".",
  } satisfies Emphasis,
  body: [
    "Before my current work in AI and venture building, I founded Zarttech, a technology and talent business that connected African engineers with opportunities in international markets.",
    "That experience shaped how I think about technology. A product can be technically impressive and still miss the people who need it most. A talented person can be capable of doing the work and still never get the opportunity. A business can have interested customers and still lose them because nobody answered the phone.",
    "These are different problems, but they share a common thread: the distance between what is possible and what people can actually access.",
    "Today, I work on that distance through AI products, venture building and conversations about the future of technology.",
  ],
} as const;

/* -------------------------------------------------------------------------- */
/*  03 Currently building + /ventures                                         */
/* -------------------------------------------------------------------------- */

export const currentlyBuilding = {
  eyebrow: "Currently building",
  headline: "Three ventures. Three problems worth solving.",
} as const;

/* Kickers reuse the proposal's own journey labels for each venture. "Focus"
   lines come from the proposal's Ventures page. */
export const ventures = [
  {
    id: "myhives",
    wordmark: "MyHives / BEEKON",
    kicker: "Everyday safety",
    role: "CEO & Co-Founder",
    focus: "AI safety technology, emergency alerts and privacy-conscious assistance.",
    href: "https://myhives.nl",
    siteLabel: "myhives.nl",
    home: {
      headline: "Technology that can help when you cannot ask for help.",
      body: [
        "An emergency doesn't always give you time to reach for your phone, explain what's happening or call the right person. BEEKON is being built around those moments, using AI and connected safety technology to help alert trusted contacts when something appears to be wrong.",
        "The goal is straightforward: help people get assistance when they may not be able to ask for it themselves.",
      ],
      cta: "Explore MyHives",
    },
    page: {
      headline: "Everyday safety, designed around real life.",
      body: [
        "In an emergency, a person may not have the time or ability to unlock a phone, explain what is happening and call for help. BEEKON is being developed to address that gap.",
        "The platform combines everyday safety technology with AI-assisted detection and alerts, helping notify trusted contacts when a potentially concerning situation is detected.",
        "The challenge is not simply recognising an unusual event. It is doing so in a way that respects privacy, provides useful context and helps people respond appropriately.",
      ],
      cta: "Discover MyHives",
    },
  },
  {
    id: "joble",
    wordmark: "Joble",
    kicker: "AI for everyday business",
    role: "Founder",
    focus: "AI agents for small businesses, customer engagement and appointment booking.",
    href: "https://www.joble.app",
    siteLabel: "joble.app",
    home: {
      headline: "Good businesses shouldn't lose customers because nobody picked up.",
      body: [
        "A missed call, an unanswered website enquiry or a booking that takes two days to confirm can cost a small business a customer it has already worked hard to attract.",
        "Joble uses AI agents to help businesses answer questions, qualify enquiries and book appointments across their digital and phone channels. It gives business owners another way to respond promptly, even when they're busy doing the actual work.",
      ],
      cta: "Explore Joble",
    },
    page: {
      headline: "AI agents for the everyday work of running a business.",
      body: [
        "A customer calls while the owner is serving someone else. A website enquiry arrives after hours. A promising lead never gets a reply. These small moments can add up to lost revenue.",
        "Joble is building AI agents for customer engagement that can respond to enquiries, answer common questions, qualify leads and help book appointments across web and phone channels.",
        "The aim isn't to replace the people who make a business work. It's to help businesses stay responsive when their teams are occupied.",
      ],
      cta: "Discover Joble",
    },
  },
  {
    id: "15wins",
    wordmark: "15Wins Ventures",
    kicker: "Venture building",
    role: "General Partner",
    focus: "Early-stage investment, venture building and technology startups.",
    href: "https://15wins.com",
    siteLabel: "15wins.com",
    home: {
      headline: "Helping technology ideas become real businesses.",
      body: [
        "Some founders need capital. Others need help testing an idea, finding a route to market or building the infrastructure a business needs to grow.",
        "15Wins Ventures works across early-stage technology, combining venture building and investment to help promising companies move from an idea towards a business with real customers and a viable future.",
      ],
      cta: "Explore 15Wins Ventures",
    },
    page: {
      headline: "Venture building and early-stage investment.",
      body: [
        "Starting a company is rarely just a matter of having a good idea and raising capital. Founders also need to understand their markets, develop products, find customers and build the operational foundations that allow a business to grow.",
        "15Wins Ventures works across early-stage technology companies, bringing together investment and venture-building support to help founders develop businesses with a credible path forward.",
        "Its focus spans AI, safety and technology infrastructure, with activity across Europe, the UK, Africa and the US.",
      ],
      cta: "Explore 15Wins Ventures",
    },
  },
] as const satisfies readonly Venture[];

export const venturesPage = {
  eyebrow: "Ventures",
  heading: "I build and back companies working on problems worth solving.",
  intro: [
    "My work spans AI-powered products, everyday safety and early-stage venture building. Each venture has its own market, its own challenges and its own definition of success.",
    "What connects them is a belief that technology should do more than demonstrate what's possible. It should solve a problem someone actually has.",
  ],
  close: {
    heading: "Different companies. Real problems. Practical work.",
    body: "If you're building a technology company, exploring an investment opportunity or working on a problem that deserves a better solution, I'd welcome a conversation.",
    cta: { label: "Let's talk", href: "/contact" },
  },
} as const;

/* -------------------------------------------------------------------------- */
/*  04 Two sides of the same idea                                             */
/* -------------------------------------------------------------------------- */

export const duality = {
  eyebrow: "Two sides of the same idea",
  headline: "Technology should give people more room to act.",
  left: {
    title: "Protect",
    venture: "MyHives / BEEKON",
    body: "The ability to get help should not depend entirely on whether someone can make a call or press a button. We're working on technology that can recognise when something may be wrong and help connect people to assistance.",
  },
  right: {
    title: "Empower",
    venture: "Joble",
    body: "Small businesses don't need more missed opportunities. They need practical tools that help them respond to customers, manage enquiries and spend less time on repetitive tasks.",
  },
  statement: {
    before: "Different problems. The same test: ",
    emphasis: "does the technology make a meaningful difference in someone's day",
    after: "?",
  } satisfies Emphasis,
} as const;

/* -------------------------------------------------------------------------- */
/*  05 The journey                                                            */
/* -------------------------------------------------------------------------- */

export const journeySection = {
  eyebrow: "The journey",
  headline: {
    before: "My work has changed. ",
    emphasis: "The question hasn't",
    after: ".",
  } satisfies Emphasis,
} as const;

export const journey: Chapter[] = [
  {
    index: "01",
    name: "Zarttech",
    meta: "2020-2025",
    body: "I founded Zarttech to help close the technology talent gap between Africa and the West, connecting African engineers with international companies. The experience taught me that talent alone doesn't create opportunity. Access, trust and the systems around people matter too.",
    status: "concluded",
  },
  {
    index: "02",
    name: "15Wins Ventures",
    meta: "Venture building",
    body: "My focus expanded from connecting talent with work to helping build the companies creating new opportunities. Today, I work with founders and investors to help early-stage technology businesses develop and grow.",
    status: "active",
  },
  {
    index: "03",
    name: "Joble",
    meta: "AI for everyday business",
    body: "AI can make a difference in the everyday details of running a business. Joble focuses on one of them: helping small businesses respond to customers and capture opportunities they might otherwise miss.",
    status: "active",
  },
  {
    index: "04",
    name: "MyHives / BEEKON",
    meta: "Everyday safety",
    body: "Safety presents a different challenge. Sometimes the person who needs help cannot explain what's happening. MyHives is exploring how technology can help bridge that gap.",
    status: "active",
  },
];

/* -------------------------------------------------------------------------- */
/*  06 AI, Africa and the bigger picture (homepage section)                   */
/* -------------------------------------------------------------------------- */

export const bigPicture = {
  eyebrow: "AI, Africa & the bigger picture",
  headline: {
    before: "The next decade of AI will be shaped by ",
    emphasis: "who gets to use it, build it and benefit from it",
    after: ".",
  } satisfies Emphasis,
  body: [
    "Africa's role in artificial intelligence should be about more than adopting products built elsewhere. It should also include building companies, developing talent, investing in infrastructure and helping determine how these technologies are used.",
    "My interests sit at the intersection of AI access, responsible AI, digital infrastructure, education, healthcare and economic opportunity. I am particularly interested in what it takes to move from talking about AI's potential to making it useful in the places and industries that need it.",
    "That means asking harder questions. Who owns the infrastructure? Who can afford to participate? Where does the economic value go? And how do we make sure technological progress creates opportunities rather than simply moving existing advantages around?",
    "These are questions I explore through my work, writing, speaking and conversations with people building the future of technology.",
  ],
  themes: [
    "Artificial intelligence and society",
    "AI access and sovereignty",
    "Responsible AI and safety",
    "African innovation and technology investment",
    "The future of work and digital skills",
    "AI in education, healthcare and agriculture",
  ],
  /* Builder label: links the homepage section to the full /ai-africa page. */
  cta: { label: "Read the bigger picture", href: "/ai-africa" },
} as const;

/* -------------------------------------------------------------------------- */
/*  /ai-africa                                                                */
/* -------------------------------------------------------------------------- */

export const aiAfrica = {
  eyebrow: "AI, Africa and the bigger picture",
  heading: "AI's future will be shaped by more than the people building the models.",
  lead: "It will also be shaped by who can use them, who owns the infrastructure and who captures the value they create.",
  body: [
    "Artificial intelligence is opening up new possibilities in business, education, healthcare, agriculture and public services. But the benefits won't reach everyone automatically.",
    "Access to computing, connectivity, skills, capital and reliable infrastructure will influence which countries, businesses and communities can participate meaningfully in the AI economy.",
    "For African markets, the opportunity is not simply to adopt tools developed elsewhere. It is also to build companies, develop local expertise, participate in research and infrastructure, and shape how AI is applied to local needs.",
    "These are issues I explore through my work as an entrepreneur and investor, as well as through speaking and conversations with people working across technology and policy.",
  ],
  questions: {
    heading: "The questions I'm interested in",
    items: [
      {
        title: "Who gets access?",
        body: "AI products are only useful when people can afford them, understand them and use them in their daily lives.",
      },
      {
        title: "Who builds and owns the infrastructure?",
        body: "Long-term participation in the AI economy depends on more than using finished products. It also involves the infrastructure, expertise and businesses behind them.",
      },
      {
        title: "How do we use AI responsibly?",
        body: "As AI systems become more capable, we need to think carefully about safety, privacy, accountability and what happens when systems make mistakes.",
      },
      {
        title: "Where does the economic value go?",
        body: "The AI economy will create opportunities, but the distribution of those opportunities will depend on who owns the technology, develops the skills and builds sustainable businesses around it.",
      },
    ] satisfies Topic[],
  },
  practice: {
    heading: "From ideas to practical work",
    body: [
      "My interest in these questions is connected to the businesses I build. Everyday safety, small-business automation and venture building offer different perspectives on how technology reaches people in practice.",
      "They also raise a shared question: how do we move from talking about technological potential to making it useful?",
    ],
  },
  cta: { label: "Explore my speaking topics", href: "/speaking" },
} as const;

/* -------------------------------------------------------------------------- */
/*  07 Institutional context                                                  */
/* -------------------------------------------------------------------------- */

/* Verify before publishing (proposal checklist): official award names,
   awarding organisations and the AIFOD event title and role. */
export const institutional = {
  eyebrow: "Institutional context",
  headline: "Building is one part of the work. Contributing to the conversation is another.",
  items: [
    {
      label: "AIFOD Global Advocate",
      body: "Nelson contributes to discussions about AI in developing countries, including access, AI sovereignty and the role of emerging economies in shaping the future of artificial intelligence.",
    },
    {
      label: "International speaking and policy engagement",
      body: "At the August 2026 AIFOD Summer Summit at the United Nations Office at Geneva, Nelson contributed to discussions on AI sovereignty and equitable access under the theme “Small Takes the Lead.”",
    },
    {
      label: "CSU Innovation Award",
      body: "Recognition associated with MyHives in 2026.",
    },
    {
      label: "Earlier recognition",
      body: "European Entrepreneur of the Year, 2024. Bold EdTech Award, 2023. FUTR150 Founders and Startups Award, 2022.",
    },
  ] satisfies Credential[],
} as const;

/* -------------------------------------------------------------------------- */
/*  08 Speaking (homepage section)                                            */
/* -------------------------------------------------------------------------- */

export const speaking = {
  eyebrow: "Speaking",
  headline: "I speak about what it takes to build technology that matters.",
  body: [
    "Artificial intelligence is changing how businesses operate, how economies compete and how people access opportunities. But the interesting questions go beyond what a new model or product can do.",
    "Nelson speaks about AI, technology entrepreneurship and venture building, drawing on experience building technology businesses, working with talent across markets and investing in early-stage companies.",
  ],
  topics: [
    { title: "AI and society", body: "What happens when artificial intelligence becomes part of everyday life?" },
    { title: "AI sovereignty and access", body: "Who owns, builds and benefits from the infrastructure behind AI?" },
    { title: "Everyday safety technology", body: "How can technology help people in situations where they cannot easily ask for help?" },
    { title: "Building deep tech from Europe", body: "What does it take to turn complex technology into a viable business?" },
    { title: "African innovation and diaspora capital", body: "How talent, investment and global networks can create new opportunities." },
    { title: "Venture building and investment", body: "What founders need beyond funding to build sustainable companies." },
  ] satisfies Topic[],
  recent: "AIFOD Summer Summit, United Nations Office at Geneva, August 2026.",
  cta: { label: "Invite Nelson to speak", href: "/speaking#booking" },
} as const;

/* -------------------------------------------------------------------------- */
/*  09 Podcast (homepage section)                                             */
/* -------------------------------------------------------------------------- */

export const podcastPreview = {
  eyebrow: "Podcast",
  headline: "What Comes Next",
  tagline: "Conversations with the people deciding who technology actually reaches.",
  sub: "A long-form podcast with the founders, investors, engineers and researchers building the next decade of opportunity in AI, safety and technology.",
  body: [
    "Technology conversations often focus on the launch, the funding round or the latest breakthrough. I want to get into what happens beyond the announcement.",
    "What Comes Next brings together founders, investors, engineers and researchers to discuss the decisions behind the technology: what they're building, who it serves, what gets in the way and what it takes to make a meaningful difference.",
    "From artificial intelligence and everyday safety to venture building and emerging markets, the show looks at the people doing the work and the questions that don't always make it into the headlines.",
    "No hype for its own sake. No rehearsed success stories without the difficult parts. Just thoughtful conversations about what we're building, why it matters and what happens next.",
  ],
  season: "Season one: Building, access and the future of technology.",
  ctas: [
    { label: "Listen to the podcast", href: "/before" },
    { label: "Apply to be a guest", href: "/before#apply" },
    { label: "Explore sponsorship opportunities", href: "/before#sponsor" },
  ],
} as const;

/* -------------------------------------------------------------------------- */
/*  10 Close (homepage) + /contact                                            */
/* -------------------------------------------------------------------------- */

/* Social links. LinkedIn URL to be verified before launch. */
export const social = {
  linkedin: "https://www.linkedin.com/in/nelson-ta/",
} as const;

/* Footer icon rows (Figma). An empty href means the handle is not confirmed
   yet: the icon still shows but is not a link. Fill these in to activate. */
export const footerSocial = [
  { id: "x", label: "X (Twitter)", href: "" },
  { id: "facebook", label: "Facebook", href: "" },
  { id: "instagram", label: "Instagram", href: "" },
  { id: "linkedin", label: "LinkedIn", href: social.linkedin },
] as const;

export const footerListen = [
  { id: "apple", label: "BEFORE on Apple Podcasts", href: "" },
  { id: "youtube", label: "BEFORE on YouTube", href: "" },
  { id: "rss", label: "BEFORE RSS feed", href: "/before/rss.xml" },
  { id: "spotify", label: "BEFORE on Spotify", href: "" },
] as const;

export const contact = {
  statement: {
    before: "Let's talk about ",
    emphasis: "what you're building",
    after: ".",
  } satisfies Emphasis,
  body: "I'm open to conversations with founders, investors, researchers, event organisers and people working on problems where technology could make a real difference.",
  channels: [
    { label: "Building or backing a company", value: "Business and investment enquiries", href: "/contact#enquiry" },
    { label: "Speaking", value: "Speaking enquiries", href: "/speaking#booking" },
    { label: "Press and media", value: "Media enquiries", href: "mailto:press@tnajulo.com" },
    { label: "What Comes Next", value: "Podcast enquiries", href: "/before#apply" },
  ],
} as const;

export const contactPage = {
  eyebrow: "Contact",
  heading: "Let's talk about what you're building.",
  intro: [
    "I'm open to conversations with founders, investors, researchers, event organisers and people working on problems where technology could make a real difference.",
    "Whether you're building a company, exploring an investment, planning an event or interested in a conversation for What Comes Next, tell me a little about what you have in mind.",
  ],
  routes: [
    {
      label: "Building or backing a company",
      body: "For founders, investors and potential venture partners interested in AI, technology and early-stage company building.",
      cta: "Business and investment enquiries",
      href: "#enquiry",
    },
    {
      label: "Speaking",
      body: "For keynote invitations, conference panels, fireside chats and industry events.",
      cta: "Speaking enquiries",
      href: "/speaking#booking",
    },
    {
      label: "Press and media",
      body: "For interviews, commentary on AI and technology, and media requests.",
      cta: "Media enquiries",
      href: "mailto:press@tnajulo.com",
    },
    {
      label: "What Comes Next",
      body: "For guest applications, episode suggestions and sponsorship opportunities.",
      cta: "Podcast enquiries",
      href: "/before#apply",
    },
  ],
  form: {
    heading: "Send an enquiry",
    fields: [
      { name: "name", label: "Full name", type: "text", placeholder: "Your name", required: true, autoComplete: "name" },
      { name: "email", label: "Work email", type: "email", placeholder: "you@organisation.com", required: true, autoComplete: "email" },
      { name: "organisation", label: "Organisation", type: "text", placeholder: "Company or organisation", required: true, autoComplete: "organization" },
      {
        name: "reason",
        label: "Reason for getting in touch",
        type: "select",
        placeholder: "Choose one",
        required: true,
        options: [
          "Building or backing a company",
          "Speaking",
          "Press and media",
          "What Comes Next podcast",
          "Something else",
        ],
      },
      { name: "message", label: "What would you like to discuss?", type: "textarea", placeholder: "A few lines on what you have in mind.", required: true },
      { name: "link", label: "Website or LinkedIn profile", type: "url", placeholder: "https://", required: false, autoComplete: "url" },
    ] satisfies ApplyField[],
    submitLabel: "Send enquiry",
    /* The proposal asks the form to explain how details are used and to link
       a privacy policy. The explanation is here; the site has no privacy
       policy page yet, so nothing is linked until Nelson supplies one. */
    privacy: "Your details are used only to reply to your enquiry. You won't be added to a mailing list.",
  },
} as const;

/* -------------------------------------------------------------------------- */
/*  /about                                                                    */
/* -------------------------------------------------------------------------- */

/* Verify before publishing (proposal checklist): Zarttech and Zarttalent
   history, dates and scale; education; awards; current titles. */
export const about = {
  eyebrow: "About",
  heading: "I'm interested in what happens when technology meets a real problem.",
  intro: [
    "Nelson T. Ajulo is a technology entrepreneur and investor working across artificial intelligence, everyday safety and venture building. He is CEO and Co-Founder of MyHives, founder of Joble, and General Partner at 15Wins Ventures.",
    "His work is driven by a recurring question: what does it take to turn an idea or a piece of technology into something that genuinely improves people's lives?",
  ],
  story: {
    heading: "The story",
    body: [
      "I started my career building around a problem I kept seeing: capable people could be ready to work, yet still struggle to access the opportunities available to them.",
      "Through Zarttech, I worked to connect African engineering talent with international companies. The business grew across multiple countries, bringing engineers and employers together across borders.",
      "That experience changed how I thought about opportunity. Having the right skills matters, but so do the systems that help people demonstrate those skills, find work and earn trust.",
      "Over time, my work moved into other parts of the same challenge. Through venture building, I began working on the companies and infrastructure that help ideas become businesses. Through Joble, I focus on the everyday problems that cause small businesses to lose opportunities. Through MyHives and BEEKON, I am working on technology designed to help people get assistance when they cannot easily ask for it.",
      "The products are different. The underlying interest remains the same: building things that are useful outside a presentation or a pitch deck.",
    ],
  },
  earlierWork: {
    heading: "Earlier work",
    items: [
      {
        name: "Zarttech",
        tagline: "Building connections between talent and opportunity",
        body: "Founded in 2020, Zarttech worked to connect African engineering talent with international companies. The business scaled its talent network across several countries before concluding its operations in 2025.",
      },
      {
        name: "Zarttalent Foundation",
        tagline: "Expanding access to technology education",
        body: "Alongside Zarttech, Nelson founded the Zarttalent Foundation, focused on technology education and skills development for young Africans, particularly women pursuing careers in technology.",
      },
      {
        name: "Earlier ventures and investments",
        tagline: "",
        body: "Nelson's entrepreneurial experience also includes earlier ventures in technology, education and related services. His work has evolved across products and markets, with a continued interest in using technology to solve practical problems.",
      },
    ],
  },
  education: {
    heading: "Education",
    items: [
      "PhD, International Economics, University of Gdańsk",
      "MBA, Business Administration, Anglia Ruskin University",
      "Master's and Bachelor's degrees, Architecture, Limkokwing University of Creative Technology",
      "Executive programme in cybersecurity risk management, Harvard University",
    ],
  },
  recognition: {
    heading: "Recognition and affiliations",
    items: [
      "AIFOD Global Advocate",
      "European Entrepreneur of the Year, 2024",
      "Bold EdTech Award, 2023",
      "FUTR150 Founders and Startups Award, 2022",
      "CSU Innovation Award associated with MyHives, 2026",
    ],
  },
  cta: {
    heading: "Have a problem worth working on?",
    body: "I'm interested in conversations with founders, investors, researchers and people working on technology that can make a practical difference.",
    label: "Get in touch",
    href: "/contact",
  },
} as const;

/* -------------------------------------------------------------------------- */
/*  /speaking                                                                 */
/* -------------------------------------------------------------------------- */

export const speakingPage = {
  eyebrow: "Speaking",
  heading: "The important questions about AI begin where the product demo ends.",
  intro: [
    "Artificial intelligence is changing the way businesses work, how economies compete and how people access opportunities. But beyond the excitement around new technology are harder questions about ownership, safety, investment and who benefits.",
    "Nelson T. Ajulo is a technology entrepreneur and investor who speaks about artificial intelligence, venture building, African innovation and the practical decisions that shape the future of technology.",
    "His perspective draws on building technology businesses, working across international markets and developing products designed to address everyday problems.",
  ],
  topics: {
    heading: "Speaking topics",
    items: [
      { title: "Artificial intelligence and society", body: "What changes when AI becomes part of everyday life, and how should businesses and communities respond?" },
      { title: "AI sovereignty and access", body: "What does it take for countries and emerging markets to participate meaningfully in the AI economy rather than simply consume its products?" },
      { title: "Everyday safety technology", body: "How can AI and connected devices help people access assistance when they cannot easily ask for it themselves?" },
      { title: "Building deep tech from Europe", body: "What does it take to turn complex technology into products and businesses that solve real problems?" },
      { title: "African innovation and diaspora capital", body: "How can talent, international networks and investment help African technology companies grow and compete globally?" },
      { title: "Venture building and early-stage investment", body: "What do founders need beyond funding, and how can investors help turn promising ideas into viable companies?" },
    ] satisfies Topic[],
  },
  recent: {
    heading: "Recent engagement",
    title: "AIFOD Summer Summit, Geneva, August 2026",
    body: "Nelson contributed to discussions at the AI for Developing Countries Forum at the United Nations Office at Geneva, addressing AI sovereignty and equitable access under the theme “Small Takes the Lead.”",
  },
  booking: {
    heading: "Planning an event, panel or conversation about the future of technology?",
    body: "For keynote speeches, conference panels, fireside chats and media interviews, get in touch with the details of your event.",
    submitLabel: "Enquire about speaking",
  },
} as const;

/* -------------------------------------------------------------------------- */
/*  /writing                                                                  */
/* -------------------------------------------------------------------------- */

export const writingPage = {
  eyebrow: "Writing",
  heading: "Notes from the work of building.",
  lead: "Some ideas become products. Others take longer to work through.",
  body: [
    "This is where I write about the questions that come up while building technology companies, investing in early-stage businesses and thinking about the future of AI.",
    "You'll find perspectives on artificial intelligence, venture building, technology entrepreneurship, African innovation and the decisions that shape how opportunity is distributed.",
    "These aren't predictions for the sake of predicting. They're ideas worth examining, questions worth asking and lessons from the work itself.",
  ],
  categories: {
    heading: "Editorial categories",
    items: [
      "Artificial Intelligence & AI Safety",
      "Venture Building & Investment",
      "African Technology & Economic Opportunity",
      "Entrepreneurship & Company Building",
      "Leadership & Lessons from the Work",
    ],
  },
  cta: { label: "Read the latest articles", href: "#latest" },
  latestHeading: "Latest articles",
  empty: "The first pieces are on the way. In the meantime, follow the thinking on LinkedIn.",
} as const;

/* -------------------------------------------------------------------------- */
/*  Podcast  (/before)                                                       */
/* -------------------------------------------------------------------------- */

/* Notes on the live wiring:
   • Episodes come from Sanity. The lineup falls back to the illustrative
     season below only while Sanity has no upcoming episodes.
   • Proposal rule: upcoming conversations are labelled "Coming soon" and no
     placeholder is presented as available to listen to.
   • Spotify, Apple Podcasts, YouTube and community links are placeholders
     until the show handles are confirmed. RSS is real.
   • Forms never silently fail: an unconfigured or failed submission surfaces
     an error. The newsletter posts to /api/subscribe (Beehiiv, server-side). */

export interface PodcastEpisode {
  index: string;
  title: string;
  blurb: string;
  guest: string;
}

export const podcast = {
  name: "BEFORE",
  nameIsPlaceholder: false,

  hero: {
    eyebrow: "The podcast",
    tagline: {
      before: "Conversations with the people deciding ",
      emphasis: "who technology actually reaches",
      after: ".",
    } satisfies Emphasis,
    standing:
      "Conversations with people shaping our world about the experiences that shaped them. What happened before the title, before the company, before the public story, and how those moments still shape the decisions they make today. A MyHives Original.",
    status: "Season one begins January 2027",

    /* Hero atmosphere: a microphone photograph for the right-hand column,
       desaturated and masked so it dissolves into the ink on every edge (the
       same treatment as the portrait on the home hero). Set to "" to hide. */
    image: "/podcast-mic.png",
  },

  subscribe: [
    { label: "Spotify", href: "#", placeholder: true },
    { label: "Apple Podcasts", href: "#", placeholder: true },
    { label: "YouTube", href: "#", placeholder: true },
    { label: "RSS", href: "/before/rss.xml", placeholder: false },
  ],

  premise: {
    eyebrow: "The premise",
    headline: {
      before: "Most technology conversations stop at what it can do. We want to know ",
      emphasis: "who it reaches",
      after: ".",
    } satisfies Emphasis,
    body: [
      "The interesting part of technology isn't always the launch or the funding announcement. Sometimes it's the decision that came before it, the problem nobody expected, or the trade-off that determined who would benefit. What Comes Next gets into those conversations.",
      "Each episode explores the people and decisions behind technology that aims to change how we live and work. We talk about the work itself: what someone set out to build, what they learned along the way, what didn't go to plan and what it takes to turn an idea into something useful.",
      "The conversations span artificial intelligence, everyday safety, venture building, investment and emerging markets. The common thread is not technology for its own sake, but the people affected by what gets built.",
    ],
  },

  /* B — Latest episode. Shown only before any episode is published. Labelled
     "Coming soon" with no listen links, per the proposal. */
  latest: {
    eyebrow: "Latest episode",
    number: "Episode 01",
    title: "The first minute is the whole emergency",
    guest: "",
    meta: "Coming soon",
    synopsis:
      "Every safety product on the market assumes you can act. You can press the button. You can make the call. You can say the words. In the seconds when none of that is possible, what actually helps?",
    note: "Coming soon. Episode 01 publishes with season one.",
    links: [] as readonly { label: string; href: string }[],
  },

  /* D — Season one. The count prefix ("Two conversations.") is prepended in
     the component so it always matches the number of episodes listed. */
  episodes: {
    eyebrow: "Season one",
    headline: "Building, access and the future of technology.",
    subTail: "One thread. Who technology reaches, and who gets left behind.",
    description:
      "The opening season explores the decisions behind AI products, the realities of building technology companies and the people working to expand access to opportunity.",
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

  host: {
    eyebrow: "Meet the host",
    heading: "Hosted by Nelson T. Ajulo",
    name: "Nelson T. Ajulo",
    bio: [
      "I'm a technology entrepreneur and investor working across AI, everyday safety and venture building. I started What Comes Next because I wanted to have more of the conversations that get lost between the announcement and the outcome.",
      "The show gives me an opportunity to speak with people doing the work, ask questions about their decisions and understand what building technology actually looks like beyond the headlines.",
    ],
    photo: "/nelson-ta.jpeg",
    cta: { label: "Learn more about Nelson", href: "/about" },
  },

  apply: {
    eyebrow: "Guest applications",
    headline: "Working on something worth exploring?",
    intro: [
      "We're interested in founders building AI and deep technology companies, investors backing overlooked markets, researchers turning ideas into useful products, and people finding unusual ways to expand access to opportunity.",
      "You don't need a polished success story. We want a substantive conversation about the work, the decisions and what others can learn from the experience.",
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
      submitLabel: "Apply to be a guest",
      successTitle: "Application received.",
      successBody:
        "Thank you, it is in. If there is a fit, you will hear from the team directly.",
      errorBody:
        "Something went wrong. Please try again, or email support@tnajulo.com.",
      consent: "Applications go straight to the show's team. No list, no spam.",
    },
  },

  sponsor: {
    eyebrow: "Sponsorship",
    headline: "Support conversations that go beyond the headlines.",
    body: [
      "We're opening a limited number of sponsorship opportunities for the first season of What Comes Next.",
      "The show is designed for an audience interested in technology, AI, investment and the businesses shaping emerging markets. Sponsorship enquiries should include your organisation, campaign objectives and the audience you hope to reach.",
    ],
    cta: {
      label: "Request the podcast sponsorship deck",
      href: "mailto:support@tnajulo.com?subject=What%20Comes%20Next%20sponsorship",
    },
  },

  newsletter: {
    eyebrow: "Newsletter",
    headline: "Get the show in your inbox.",
    body: "Every new episode, guest reading lists, and one line from Nelson each week. No spam, unsubscribe anytime.",
    placeholder: "you@email.com",
    submitLabel: "Subscribe",
    successBody: "You are in. Watch your inbox.",
    errorBody: "Something went wrong. Please try again.",
  },

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
/*  BEFORE  (/before, Figma redesign November 2026)                          */
/* -------------------------------------------------------------------------- */

/* Copy for the redesigned podcast page. Episodes still come from Sanity: the
   lineup below is the fallback shown until upcoming episodes exist there.
   Empty hrefs mean "not live yet" and render without a link. */
export const before = {
  hero: {
    eyebrow: "A MyHives Original",
    title: "BEFORE",
    headline: "Conversations with people shaping our world about the experiences that shaped them.",
    body: [
      "What happened before the title, before the company, before the public story.",
      "And how those moments still shape the decisions they make today.",
    ],
    inbox: { label: "Get the show in your inbox", href: "#newsletter" },
    art: { tagline: "A MyHives Original" },
  },

  trailer: {
    title: "Season one begins January 2027",
    cta: "Play trailer",
    /* Set to the trailer's URL (or an episode page) to make the button live. */
    href: "",
  },

  premise: {
    headline: ["Most interviews ask what you built.", "This one asks what built you."],
    columns: [
      [
        "The name has two meanings and we use both. The first is personal: before the company, before the title, before anyone was watching, what happened that formed the person?",
        "The second is about all of us: what happens before an experience crosses the line into an incident, a crisis, an emergency? Safety is the lens. The subject is formation.",
      ],
      [
        "Each episode sits down with someone whose decisions shape how other people live, work, learn, move or belong, and looks for the experience underneath the expertise.",
        "Founders and funders, leaders of institutions, athletes, writers, architects, scientists, organisers. The reward is revelation, not comedy. The tension comes from curiosity, contradiction and insight.",
      ],
    ],
  },

  lineup: {
    headline: "Season one. The opening arc.",
    /* "Eight conversations." is generated from the number of cards shown. */
    subTail: "One thread: the moments that shape the people who shape the world.",
    guest: "Guest to be announced",
    duration: "Duration to be confirmed",
    date: "Date to be confirmed",
    window: "From January 2027",
    /* Placeholder card photo until a guest photo is set in Sanity. */
    photo: "/nelson-quote.jpg",
    items: [
      { index: "01", title: "What happened before", blurb: "The host, under the show's own rules." },
      { index: "02", title: "When protection becomes silence", blurb: "Why people stay quiet in institutions that look safe." },
      { index: "03", title: "The first minute is the whole emergency", blurb: "What the seconds before anyone knows do to a person, and to a system." },
      { index: "04", title: "Discomfort is not danger", blurb: "Where risk ends and growth begins, from someone who has lived on that line." },
      { index: "05", title: "Who draws the map", blurb: "Public space, and who it was built for." },
      { index: "06", title: "A street you avoid is harm too", blurb: "The quiet narrowing of a life, and what reverses it." },
      { index: "07", title: "Trained here, owned there", blurb: "Building from Africa, and who benefits. A Nigeria edition." },
      { index: "08", title: "What we are willing to commit to", blurb: "A leader of an organisation that has signed up to the accountability, questioned like everyone else." },
    ],
  },

  format: {
    headline: "How an episode works",
    intro: "Every conversation moves through six questions, in order, without announcing them.",
    steps: [
      { name: "Origin", question: "When did you first realise that security could disappear?" },
      { name: "Definition", question: "What does safety mean in the rooms you run?" },
      { name: "Collision", question: "When has protecting people conflicted with their freedom?" },
      { name: "Decision", question: "What did you decide, and what did it cost?" },
      { name: "Reflection", question: "What did you once believe about safety that you no longer believe?" },
      { name: "Future", question: "What experience still influences a decision you make today?" },
    ],
  },

  question: {
    headline: ["Every episode ends with", "a question. You answer it."],
    body: "Each conversation closes with one question for the MyHives community, the 35,000+ people the guardian protects. Answers are anonymous and aggregated; no individual story is ever used without explicit permission. The patterns come back to the community in a short note after each episode, shape the questions we ask next, and go to the organisations that have committed to listen. That loop, from lived experience to public conversation to institutional commitment and back, is the point of the show.",
  },

  seat: {
    headline: "There's a seat at the table",
    body: "Everyone knows what you built. BEFORE wants to understand what built you. The best guests rarely have a press team. If your decisions shape how other people live, work, learn, move or belong, and there is a story before the public one, put yourself forward or put someone forward. Every application is read. Send a short note with your name, your role, and the one experience you think shaped how you lead.",
    subject: "BEFORE, guest",
    email: "support@tnajulo.com",
    cta: "Copy email",
  },

  sponsor: {
    headline: "Sponsor a season",
    body: "A limited number of sponsorship slots are open for season one. Sponsors reach a curated audience of founders, investors, operators and institutional leaders across Europe, Africa and beyond, and are credited at the top and the close of each episode. Sponsors do not choose guests, questions or conclusions, and sponsorship has no bearing on the MyHives Queen standard. That rule is written into the show's charter.",
    cta: {
      label: "Request sponsor deck",
      href: "mailto:support@tnajulo.com?subject=BEFORE%2C%20sponsorship%20deck",
    },
  },

  host: {
    headline: "The host",
    body: [
      "Nelson T. Ajulo, PhD, is Co-Founder, CEO and CTO of MyHives, the everyday safety AI guardian protecting 35,000+ people across 190+ countries, founder of Joble, and General Partner at 15Wins Ventures. He is an AIFOD Global Advocate, contributed to the AIFOD Summer Summit at the United Nations Palais des Nations, Geneva, in August 2026, and was named European Entrepreneur of the Year in 2024.",
      "He has spent his career on one question in different forms: who does this actually reach?",
    ],
    photo: "/nelson-quote.jpg",
    cta: { label: "More about Nelson", href: "/about" },
  },

  newsletter: {
    headline: "Get the show in your inbox.",
    body: "Every new episode, the guest's reading list, the community question, and one line from Nelson. No spam, unsubscribe anytime.",
    placeholder: "example@email.com",
    submitLabel: "Subscribe",
    successBody: "You are in. Watch your inbox.",
    errorBody: "Something went wrong. Please try again.",
  },
} as const;

/* -------------------------------------------------------------------------- */
/*  Navigation                                                                */
/* -------------------------------------------------------------------------- */

/* Information architecture per the Figma design (November 2026): Home,
   Before (the podcast), About, Ventures (dropdown), Speaking, Writing, Press,
   plus a separate Contact button. */
export interface NavItem {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
}

export const navigation: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Before", href: "/before" },
  { label: "About", href: "/about" },
  {
    label: "Ventures",
    href: "/ventures",
    children: [
      { label: "MyHives", href: "/ventures#myhives" },
      { label: "Joble", href: "/ventures#joble" },
      { label: "15Wins Ventures", href: "/ventures#15wins" },
    ],
  },
  { label: "Speaking", href: "/speaking" },
  { label: "Writing", href: "/writing" },
  { label: "Press", href: "/press" },
];

export const navContact = { label: "Contact", href: "/contact" } as const;

export const footerNav: { label: string; href: string }[] = [
  ...navigation.filter((item) => item.href !== "/").map(({ label, href }) => ({ label, href })),
  navContact,
];
