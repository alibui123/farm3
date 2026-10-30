/**
 * Al Shukr Dairy — editable site copy, stats, media & links.
 * Source of truth: "seo content/Al Shukr Dairy SEO, AEO & GEO Website Content.md".
 * Keep business facts word-for-word identical across sections, schema and footer.
 * Never publish unconfirmed facts: leave them out instead of shipping [PLACEHOLDER] text.
 */

export const SITE = {
  name: "Al Shukr Dairy",
  shortName: "Al Shukr",
  tagline: "Shukar ke saath, khalis doodh.",
  /** 25-word boilerplate from the fact sheet. */
  description:
    "Al Shukr Dairy is a family-owned Lahore dairy farm, founded in 2023, delivering fresh cow, buffalo and mixed milk to homes in Askari and DHA.",
  founded: "2023",
  owner: "The Alvi Family",
  locale: "en_PK",
  url: "https://alshukrdairy.pk", // TODO: domain not bought yet; the client plans "alshukrdairy" (extension to confirm)
} as const;

export const HOME_META = {
  title: "Fresh Milk Delivery in Lahore | Al Shukr Dairy",
  description:
    "Farm-fresh cow, buffalo and mixed milk delivered to Askari and DHA, Lahore. No water, no preservatives. Get a free 1-litre sample.",
} as const;

/** Country code, no + or spaces. */
export const WHATSAPP = {
  number: "923412001648",
  prefilledMessage:
    "Salam! I found Al Shukr Dairy on your website and I would like to know more about your fresh milk delivery.",
  get href() {
    return whatsappLink(this.prefilledMessage);
  },
} as const;

/** The WhatsApp number as people read it, e.g. "+92 300 1234567". */
export const WHATSAPP_DISPLAY = `+${WHATSAPP.number.slice(0, 2)} ${WHATSAPP.number.slice(2, 5)} ${WHATSAPP.number.slice(5)}`;

/** wa.me link with a pre-filled message, for page-specific WhatsApp CTAs. */
export function whatsappLink(message: string) {
  return `https://wa.me/${WHATSAPP.number}?text=${encodeURIComponent(message)}`;
}

/**
 * Facts waiting for client sign-off render as "To confirm" notes in
 * development only, so the full layout can be reviewed. Production hides them.
 */
export const SHOW_PENDING = process.env.NODE_ENV === "development";

/** The free-sample page; the home page also keeps its own #sample form. */
export const SAMPLE_HREF = "/free-sample";

/** email: null until the client sets one up; every email link is hidden meanwhile. */
export const CONTACT = {
  phone: "+92 341 2001648",
  email: null as string | null,
  address: "Lahore, Punjab, Pakistan. Farm visits on request.",
  hours: "Delivery every day, 1:00 pm to 7:00 pm",
} as const;

/**
 * Confirmed delivery areas. slug = the planned area page; set pagePublished
 * to true only once that page exists (never publish an unconfirmed area).
 */
export const SERVICE_AREAS = [
  { name: "Askari X", alias: "Askari 10", searchedAs: "Askari 10 Lahore", slug: "/milk-delivery-askari-10-lahore", pagePublished: false },
  { name: "Askari XI", alias: "Askari 11", searchedAs: "Askari 11 Lahore", slug: "/milk-delivery-askari-11-lahore", pagePublished: false },
  { name: "DHA", alias: "DHA Lahore", searchedAs: "DHA Lahore", slug: "/milk-delivery-dha-lahore", pagePublished: false },
] as const;

/** Full-bleed hero background. Swap URL + poster as needed. */
export const HERO_MEDIA = {
  videoUrl: "/video/hero.mp4",
  posterUrl:
    "https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=1920&q=80",
} as const;

/** Absolute hrefs so the nav works from every page. */
export const NAV_LINKS = [
  { label: "Our Farm", href: "/our-farm" },
  { label: "Milk & Prices", href: "/products-prices" },
  { label: "Quality", href: "/quality" },
  { label: "How It Works", href: "/#process" },
  { label: "Delivery Areas", href: "/delivery-areas" },
  { label: "Contact", href: "/contact" },
] as const;

export const HERO = {
  headline: "Fresh Milk Delivery in Lahore, Straight from Our Own Herd",
  subtext:
    "Shukar ke saath, khalis doodh. Cow, buffalo and mixed milk, chilled right after milking and delivered in sealed pouches every day between 1 and 7 pm.",
  primaryCta: "Get Your Free 1-Litre Sample",
  secondaryCta: "Chat on WhatsApp",
  chips: [
    "Family-owned since 2023",
    "No water or adulteration",
    "No preservatives or chemicals",
    "Machine milked and chilled immediately",
  ],
} as const;

export const TRUST_ITEMS = [
  "Family-Owned Since 2023",
  "No Water or Adulteration",
  "No Preservatives or Chemicals",
  "Machine Milked",
  "Chilled Immediately",
  "Regular In-House Quality Checks",
  "Sealed Pouches",
  "Daily Delivery, 1 to 7 PM",
] as const;

export const ABOUT = {
  heading: "What is Al Shukr Dairy?",
  answer:
    "Al Shukr Dairy is a family-owned dairy farm in Lahore, founded in 2023 by the Alvi Family. We deliver fresh cow, buffalo and mixed milk from our own tagged herd to homes in Askari X, Askari XI and DHA, in sealed pouches, every day between 1 and 7 pm.",
} as const;

/** Farm-to-door steps for the "pouch journey" scroll section. */
export const STORY_STEPS = [
  {
    label: "At the farm",
    title: "Machine milking",
    description:
      "Our own cows and buffalo are machine milked, a clean, quick and consistent process.",
  },
  {
    label: "Right after milking",
    title: "Chilled immediately",
    description:
      "The milk is cooled straight away to slow the growth of bacteria and keep it fresh until it reaches you.",
  },
  {
    label: "Before it leaves",
    title: "Checked and sealed",
    description:
      "Our team runs regular in-house quality checks, then packs the milk in sealed pouches. Nothing is added.",
  },
  {
    label: "Every afternoon",
    title: "Delivered to your door",
    description:
      "Our riders deliver every day between 1 and 7 pm to homes in Askari X, Askari XI and DHA.",
  },
] as const;

/** Update whenever any price changes. */
export const PRICES_UPDATED = "29 October 2026";

export const PRODUCTS_INTRO = {
  heading: "Which milk should I choose: cow, buffalo or mixed?",
  answer:
    "We sell three types. Cow milk is lighter. Buffalo milk is thicker and creamier. Mixed milk combines both. Cow milk costs Rs 240, buffalo milk Rs 260 and mixed milk Rs 250 per litre.",
} as const;

/** price: null hides the price and shows an "Ask today's rate" link instead. */
export const PRODUCTS = [
  {
    id: "cow",
    name: "Fresh Cow Milk",
    localName: "Gaye ka doodh",
    description: "Lighter taste and texture, for everyday drinking.",
    price: 240 as number | null,
    label: "Cow",
  },
  {
    id: "buffalo",
    name: "Fresh Buffalo Milk",
    localName: "Bhains ka doodh",
    description:
      "Thicker, creamier and richer in fat. Many homes use it for tea, kheer and dahi.",
    price: 260 as number | null,
    label: "Buffalo",
  },
  {
    id: "mixed",
    name: "Fresh Mixed Milk",
    localName: "Mila hua doodh",
    description:
      "Cow and buffalo milk together (61% cow, 39% buffalo): a balance of both for the whole family.",
    price: 250 as number | null,
    label: "Mixed",
  },
] as const;

export const WHY_INTRO = {
  heading: "Why do families in Lahore choose Al Shukr milk?",
  answer:
    "Families choose us because they can trace their milk to one farm. The milk comes from our own herd, with no water, preservatives or chemicals added, and is chilled right after milking.",
} as const;

export const WHY_CARDS = [
  {
    title: "Know the farm",
    body: "One herd, one family, one place your milk comes from.",
    size: "large" as const,
  },
  {
    title: "Nothing added",
    body: "No water, no preservatives, no chemicals.",
    size: "large" as const,
  },
  {
    title: "Chilled fast",
    body: "Machine milked, then chilled immediately.",
    size: "small" as const,
  },
  {
    title: "Sealed and on time",
    body: "Daily delivery between 1 and 7 pm, in sealed pouches.",
    size: "small" as const,
  },
  {
    title: "Try before you commit",
    body: "A free 1-litre sample for every eligible household.",
    size: "small" as const,
  },
] as const;

/** Verified facts only. Herd count from the client's answers (29 Oct 2026); never round it up. */
export const STATS = [
  { value: 2023, suffix: "", label: "The year we started" },
  { value: 65, suffix: "", label: "Animals in our own herd" },
  { value: 3, suffix: "", label: "Milk types: cow, buffalo and mixed" },
  { value: 1, suffix: " L", label: "Free sample for every eligible home" },
] as const;

export const HOW_INTRO = {
  heading: "How does Al Shukr milk delivery work?",
  answer:
    "You request a free sample, we verify your address on WhatsApp, and we deliver 1 litre to your door. If you like it, you choose your milk and your plan and we start your delivery.",
} as const;

export const HOW_STEPS = [
  {
    title: "Request your free sample",
    body: "Fill in the short form on this page. It takes about a minute.",
  },
  {
    title: "Verify on WhatsApp",
    body: "We confirm you are inside our delivery area.",
  },
  {
    title: "Receive 1 litre",
    body: "In a sealed pouch, free, once per household.",
  },
  {
    title: "Subscribe",
    body: "Choose a daily, alternate-day or weekly plan if you love it.",
  },
] as const;

/** Illustrative values typed into the phone mock in the "How it works" section. */
export const HOW_PHONE = {
  fields: [
    { label: "Name", value: "Ayesha Khan" },
    { label: "Phone", value: "0300 1234567" },
    { label: "Address", value: "House 12, Askari XI" },
  ],
  chat: [
    {
      from: "farm",
      text: "Assalam o Alaikum! Please share your location so we can confirm delivery.",
    },
    { from: "you", text: "Location shared · House 12, Askari XI" },
    { from: "farm", text: "You are inside our delivery area ✓" },
  ],
} as const;

export const COMPARISON = {
  heading: "How is Al Shukr milk different from loose and packaged milk?",
  answer:
    "Al Shukr milk is fresh, unprocessed and traceable to one farm. Loose milk from open cans cannot be checked by the buyer, and packaged milk is heat-treated and can be days or weeks old. Here is how the three compare.",
  columns: ["Al Shukr", "Loose milk (open can)", "Packaged milk"],
  rows: [
    {
      label: "Source",
      values: [
        "Our own tagged herd in Lahore",
        "Often mixed from several sources",
        "Not visible to the buyer",
      ],
    },
    {
      label: "Water added",
      values: ["None", "Cannot be verified by the buyer", "Low risk"],
    },
    {
      label: "Freshness",
      values: ["Delivered within hours", "Varies", "Can be days to weeks old"],
    },
    {
      label: "Chilling",
      values: ["Chilled right after milking", "Varies", "Factory processed"],
    },
    {
      label: "Processing",
      values: [
        "None. Natural cream stays intact.",
        "None",
        "Heat-treated, fat standardised",
      ],
    },
    {
      label: "Traceability",
      values: ["You know the farm", "Hard to verify", "Brand only"],
    },
    {
      label: "Delivery",
      values: [
        "Daily to your door, sealed pouch",
        "Often an open can",
        "Bought from a shop",
      ],
    },
  ],
  storageNote:
    "Fresh milk keeps for a shorter time than packaged milk. Boil it and refrigerate it as soon as it arrives.",
} as const;

export const SAMPLE = {
  heading: "Request your free 1-litre sample",
  subtext:
    "Taste farm-fresh milk from our own herd before you decide. No payment, no commitment.",
  rules: [
    "1 litre in a sealed pouch",
    "One per household",
    "Askari X, Askari XI and DHA only",
  ],
  submit: "Request My Free Sample",
  loading: "Checking your area...",
} as const;

/** Form microcopy from the SEO doc, shared by the home page form and /free-sample. */
export const SAMPLE_FORM = {
  fields: {
    name: { label: "Your full name", hint: null },
    phone: {
      label: "Mobile number (we verify it on WhatsApp)",
      hint: "We use this only to confirm and deliver your sample.",
    },
    address: { label: "Delivery address in Lahore", hint: null },
  },
  milk: {
    label: "Which milk would you like to try?",
    options: [
      { id: "cow", label: "Cow" },
      { id: "buffalo", label: "Buffalo" },
      { id: "mixed", label: "Mixed" },
    ],
  },
  /*
   * The SEO draft asks for a map pin. Until a maps provider is chosen, the
   * browser's location sharing gives the rider the same coordinates.
   */
  location: {
    label: "Pin your home's location (optional)",
    button: "Use my current location",
    added: "Location added",
    remove: "Remove",
    hint: "The pin helps our rider find you and confirms you are in our delivery area.",
    denied: "Location was not shared. You can still send the form, and we will ask on WhatsApp.",
  },
  /** Rendered as: consent + linked "Privacy Policy" + "." */
  consent: "I agree to be contacted on WhatsApp about this sample, and I have read the",
  privacyLink: "Privacy Policy",
  errors: {
    name: "Please enter your name.",
    phone: "Enter a Pakistani mobile number, for example 0300 1234567.",
    address: "Add your delivery address.",
    consent: "Please agree so we can contact you on WhatsApp.",
  },
} as const;

/**
 * Result messages. Only "success" is reachable until the backend exists; the
 * backend returns the other codes. [Name] is replaced with the first name.
 */
export const SAMPLE_RESULTS = {
  success: {
    title: "Thank you, [Name].",
    body: "Your request is in. We will message you on WhatsApp shortly to confirm your sample.",
  },
  outside_area: {
    title: "Sorry, we do not deliver to this location yet.",
    body: "We deliver to Askari X, Askari XI and DHA. Message us on WhatsApp to join our waiting list, or if you think this is a mistake.",
  },
  duplicate: {
    title: "We already have a sample request for this number.",
    body: "Samples are limited to one per household. Track your request or message us on WhatsApp.",
  },
  paused: {
    title: "Samples are paused for now.",
    body: "We are at full capacity. Message us on WhatsApp and we will tell you when they reopen.",
  },
  error: {
    title: "Something went wrong on our side.",
    body: "Please try again, or message us on WhatsApp.",
  },
} as const;

export type SampleResult = keyof typeof SAMPLE_RESULTS;

export const AREAS = {
  heading: "Fresh milk delivery in Lahore: where do we deliver?",
  answer:
    "We deliver to Askari X, Askari XI and DHA in Lahore, every day between 1 and 7 pm. If you live nearby, send us your location and we will confirm on WhatsApp.",
  cta: "Check your area on WhatsApp",
} as const;

/** Only questions with confirmed answers. Mirrored into FAQPage schema on the home page. */
export const QUICK_ANSWERS = [
  {
    q: "Is Al Shukr milk free of water and preservatives?",
    a: "Yes. We add no water, preservatives or chemicals.",
  },
  {
    q: "How do I get a free sample?",
    a: "Request it with the form on this page. It is 1 litre, once per household, in our delivery areas, and we verify every request on WhatsApp.",
  },
  {
    q: "When do you deliver?",
    a: "Every day between 1:00 pm and 7:00 pm, in sealed pouches.",
  },
  {
    q: "Do I need to boil the milk?",
    a: "Yes. Boil it and refrigerate it, because it is fresh and not heat-treated.",
  },
  {
    q: "Can I visit the farm?",
    a: "Yes, farm visits are possible on request. Message us on WhatsApp to arrange a time, and we share the location when your visit is confirmed.",
  },
] as const;

/**
 * Real, consented testimonials only. The section is hidden on the home page
 * until the client shares names, quotes and written consent.
 * Format: { quote, name, role: "Area, Lahore" }
 */
export const TESTIMONIALS: readonly {
  quote: string;
  name: string;
  role: string;
}[] = [];

export const SOCIAL = [
  { label: "Instagram", href: "https://www.instagram.com/alshukrdairy" },
  { label: "Facebook", href: "https://www.facebook.com/profile.php?id=61585744942693" },
] as const;

export const FINAL_CTA = {
  headline: "Taste the difference before you commit.",
  text: "Request your free 1-litre sample of Al Shukr milk. Delivered fresh to your door in Askari or DHA, Lahore.",
  button: "Get Your Free Sample",
  secondary: "Chat on WhatsApp",
} as const;

/* ------------------------------------------------------------------ */
/* Our Farm (/our-farm)                                                 */
/* ------------------------------------------------------------------ */

export const OUR_FARM_META = {
  title: "Our Dairy Farm in Lahore | Al Shukr Dairy",
  // The SEO draft also lists "fresh fodder"; add it back once the client confirms it.
  description:
    "Meet the Alvi Family and the herd behind Al Shukr milk: tagged cows and buffalo, machine milking and instant chilling at our dairy farm in Lahore.",
} as const;

/** TODO: swap for shoot-list photo #1 (al-shukar-herd-shed-lahore.webp) once it exists. */
export const OUR_FARM_MEDIA = {
  heroUrl:
    "https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=1920&q=80",
  heroAlt: "Cattle grazing on green pasture at golden hour",
} as const;

export const OUR_FARM_HERO = {
  headline: "Our Dairy Farm in Lahore: A Family Herd, Milked With Care",
  subtext:
    "Since 2023, the Alvi Family has raised the herd that gives Lahore households their daily milk.",
  chips: ["Family-owned since 2023", "Our own cows and buffalo", "Lahore, Punjab"],
} as const;

export const FARM_OWNERS = {
  heading: "Who runs Al Shukr Dairy?",
  answer:
    "Al Shukr Dairy is a dairy farm in Lahore, owned and run by the Alvi Family. Since 2023 we have kept our own herd of cows and buffalo and delivered their milk fresh to homes in Askari and DHA. You can ask us about any step, because one family is responsible from the shed to your door.",
} as const;

/**
 * Herd snapshot, shown as a farm ledger. value: null = waiting for the client
 * (real counts only, never rounded up). Update countedOn whenever a count changes.
 */
export const HERD_SNAPSHOT = {
  heading: "Herd snapshot",
  countedOn: null as string | null,
  rows: [
    { label: "Owned by", value: SITE.owner },
    { label: "Founded", value: SITE.founded },
    { label: "Based in", value: "Lahore, Punjab" },
    { label: "Animals in our herd", value: "65 (35 grown, 30 young)" },
    { label: "Cows", value: null },
    { label: "Buffalo", value: null },
    { label: "Milk types", value: "Cow, buffalo and mixed" },
  ] as { label: string; value: string | null }[],
} as const;

/**
 * The Alvi Family story: 120 to 200 words from the client (why they started in
 * 2023, what "Shukar" means to them, who works on the farm each day).
 * Leave null until approved; the section is hidden in production meanwhile.
 */
export const FAMILY_STORY = {
  heading: "The Alvi Family story",
  paragraphs: null as string[] | null,
  quote: null as { text: string; name: string } | null,
} as const;

/**
 * Animal care practices. confirmed: false = from the client's form, awaiting
 * sign-off; hidden in production. Flip to true once the client approves the wording.
 */
export const ANIMAL_CARE = {
  heading: "How do we care for our animals?",
  /** Confirmed-only answer. Extend it as practices below are confirmed. */
  answer:
    "Every cow and buffalo on our farm is individually tagged, so we can follow every litre back to the animal it came from. Their fodder is grown on our own land. One family looks after the herd every day, and you can ask us about any part of how they are kept.",
  practices: [
    {
      id: "tag",
      title: "Individually tagged animals",
      body: "Each cow and buffalo has its own tag, so we can follow every litre back to the animal.",
      confirmed: true,
      pendingNote: null,
    },
    {
      id: "fodder",
      title: "Fodder from our own land",
      body: "The herd's fodder is grown on our own land, cut once a year and stored with care.",
      confirmed: true,
      pendingNote: null,
    },
    {
      id: "water",
      title: "Own tube-well water",
      body: "Drinking water comes from the farm's own tube-well.",
      confirmed: false,
      pendingNote: "Any filtration or water testing.",
    },
    {
      id: "cooling",
      title: "Fans and cooling in the sheds",
      body: "The sheds have fans and cooling to keep the herd comfortable in Lahore's heat.",
      confirmed: false,
      pendingNote: "Which sheds, and in which months.",
    },
    {
      id: "vet",
      title: "Vet care",
      body: null,
      confirmed: false,
      pendingNote: 'Client said "bi-weekly" vet check-ups: confirm twice a week or every two weeks, then add the body text.',
    },
  ] as {
    id: string;
    title: string;
    body: string | null;
    confirmed: boolean;
    pendingNote: string | null;
  }[],
} as const;

export const FARM_TO_HOME = {
  heading: "How does your milk get from the farm to my home?",
  answer:
    "Our milk is machine milked, chilled immediately, sealed in pouches and delivered the same day.",
  promise: "We do not add water, preservatives or chemicals at any step.",
  steps: [
    { title: "Milking", body: "Machine milking keeps the process clean and quick." },
    { title: "Chilling", body: "The milk is chilled immediately after milking." },
    { title: "Quality checks", body: "Our team runs regular in-house quality checks." },
    { title: "Sealing", body: "Milk is packed in sealed pouches." },
    { title: "Delivery", body: "Our riders deliver every day between 1 and 7 pm." },
  ],
} as const;

export const FARM_VISIT = {
  heading: "Can I visit the farm?",
  answer:
    "Yes, farm visits are possible on request. Message us on WhatsApp to arrange a time. We share the exact location when your visit is confirmed.",
  cta: "Request a farm visit on WhatsApp",
  /** Same pre-filled message as the Contact page's "Farm visit" topic (SEO doc). */
  whatsappMessage: "Salam! I would like to visit the Al Shukr farm. When can I come?",
} as const;

export const OUR_FARM_CTA = {
  headline: "Meet your milk before you buy it.",
  text: "Request your free 1-litre sample from our own herd. Delivered fresh to your door in Askari or DHA, Lahore.",
} as const;

/* ------------------------------------------------------------------ */
/* Products & Prices (/products-prices)                                 */
/* ------------------------------------------------------------------ */

export const PRODUCTS_PAGE_META = {
  title: "Cow, Buffalo & Mixed Milk Price in Lahore | Al Shukr",
  description:
    "Fresh cow milk Rs 240, buffalo Rs 260 and mixed Rs 250 per litre, delivered in sealed pouches to Askari and DHA, Lahore. See today's prices.",
} as const;

/** TODO: swap for shoot-list photo #11 (al-shukar-milk-pouches.webp) once it exists. */
export const PRODUCTS_PAGE_MEDIA = {
  heroUrl:
    "https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=1920&q=80",
  heroAlt: "Cattle grazing on green pasture at golden hour",
} as const;

export const PRODUCTS_PAGE_HERO = {
  headline: "Fresh Milk Prices in Lahore: Cow, Buffalo and Mixed",
  subtext:
    "Doodh ka rate, clearly shown. Pick your milk and your plan, and we deliver it fresh in a sealed pouch.",
  chips: ["Cow Rs 240, buffalo Rs 260, mixed Rs 250 per litre", "1 L and 2 L sealed pouches", "Daily delivery, 1 to 7 pm"],
} as const;

/** The answer paragraph is built from PRODUCTS prices, so it can never disagree with the table. */
export const PRICE_TABLE = {
  heading: "How much does fresh milk cost with Al Shukr?",
  packaging: "Sealed pouch, 1 L or 2 L",
  delivery: "Daily, 1 to 7 pm",
  terms: [
    { label: "Delivery charge", value: "Rs 100, free on orders above 5 litres" },
    { label: "Minimum order", value: "1 litre" },
    { label: "Plans", value: "Daily, alternate days or weekly" },
    { label: "Payment", value: "Easypaisa, JazzCash, bank transfer or cash on delivery" },
  ],
} as const;

/**
 * Per-milk detail. texture: 0 = lightest, 1 = creamiest (drives the pouch fill
 * tint and the texture meter, both decorative). The price sentence is appended
 * from PRODUCTS when a price is confirmed.
 */
export const MILK_DETAILS = {
  cow: {
    heading: "What is fresh cow milk?",
    answer:
      "Fresh cow milk is milk taken from our own cows, machine milked and chilled immediately. It tastes lighter than buffalo milk and has a thinner texture. We add no water, preservatives or chemicals.",
    texture: 0.15,
    pendingNote: null as string | null,
  },
  buffalo: {
    heading: "What is fresh buffalo milk?",
    answer:
      "Fresh buffalo milk is milk from our own buffalo, machine milked and chilled immediately. It is thicker and creamier than cow milk, which many households prefer for tea, dessert and dahi. We add no water, preservatives or chemicals.",
    texture: 0.85,
    pendingNote: null as string | null,
  },
  mixed: {
    heading: "What is mixed (cow and buffalo) milk?",
    answer:
      "Mixed milk is a blend of our cow and buffalo milk: 61% cow and 39% buffalo. It gives a balance of lightness and creaminess for everyday use.",
    texture: 0.5,
    pendingNote: null as string | null,
  },
} as const;

export const MILK_CHOOSER = {
  heading: "Which milk is right for my family?",
  answer:
    "Choose cow milk for a lighter taste, buffalo milk for a thicker and creamier taste, and mixed milk for a balance. The free sample lets you try one before you subscribe. We make no health claims for any type, so ask your doctor about your family's needs.",
  /** Ordered light → creamy to sit on the texture scale. */
  items: [
    { id: "cow", title: "Cow milk", scale: "Light", body: "Light, everyday drinking." },
    { id: "mixed", title: "Mixed milk", scale: "Balanced", body: "A middle choice for the whole family." },
    { id: "buffalo", title: "Buffalo milk", scale: "Creamy", body: "Creamy, good for tea, kheer and dahi." },
  ],
} as const;

export const PACKING = {
  heading: "How is the milk packed and delivered?",
  answer:
    "Every order is delivered in a sealed 1-litre or 2-litre pouch, every day between 1 and 7 pm, to Askari X, Askari XI and DHA in Lahore.",
  pendingNote: null as string | null,
} as const;

export const STORAGE = {
  heading: "How should I store fresh milk?",
  answer:
    "Boil fresh milk as soon as it arrives, let it cool, and keep it in the refrigerator, where it keeps for 2 to 3 days. Fresh milk keeps for a shorter time than packaged milk because we do not heat-treat it.",
  steps: [
    { title: "Boil", body: "Bring it to a full boil as soon as it arrives." },
    { title: "Cool", body: "Let it cool before it goes in the fridge." },
    { title: "Refrigerate", body: "Keep it covered in a clean container." },
  ],
} as const;

export const PRODUCTS_PAGE_CTA = {
  headline: "Not sure which milk? Try 1 litre free.",
  text: "Taste cow, buffalo or mixed milk from our own herd before you subscribe. Delivered fresh to your door in Askari or DHA, Lahore.",
  secondary: "Ask on WhatsApp",
} as const;

/* ------------------------------------------------------------------ */
/* Quality (/quality)                                                   */
/* ------------------------------------------------------------------ */

export const QUALITY_META = {
  title: "Pure Milk Without Water in Lahore | Al Shukr Quality",
  description:
    "No water, no preservatives, no chemicals. See how Al Shukr milk is machine milked, chilled at once and checked in-house in Lahore.",
} as const;

/** TODO: swap for shoot-list photo #5 (al-shukar-machine-milking.webp) or #6 (chilling tank). */
export const QUALITY_MEDIA = {
  heroUrl:
    "https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=1920&q=80",
  heroAlt: "Cattle grazing on green pasture at golden hour",
} as const;

export const QUALITY_HERO = {
  headline: "How We Keep Our Milk Pure",
  subtext:
    "Khalis doodh is a promise you should be able to check. Here is exactly what we do, and what we do not do yet.",
  chips: ["No water or adulteration", "No preservatives or chemicals", "Regular in-house quality checks"],
} as const;

export const QUALITY_PURE = {
  heading: "Is Al Shukr milk pure?",
  verdict: "Yes.",
  answer:
    "Al Shukr milk has no water or adulteration added, and no preservatives or chemicals. It comes from our own herd, is machine milked, is chilled immediately after milking, and goes through regular in-house quality checks before delivery.",
} as const;

/** confirmed: false rows are hidden in production until the client signs off. */
export const QUALITY_PRACTICES = {
  heading: "What do we do to keep milk pure?",
  answer:
    "We add nothing to the milk, milk our own tagged herd by machine, chill the milk immediately and check it in-house before it leaves the farm. This table shows each practice and what it means for you.",
  rows: [
    { practice: "No water or adulteration", meaning: "What the animal gives is what you receive.", confirmed: true },
    { practice: "No preservatives or chemicals", meaning: "The milk is fresh and natural, which is why it must be boiled and refrigerated at home.", confirmed: true },
    { practice: "Machine milking", meaning: "A closed, quick and consistent milking process.", confirmed: true },
    { practice: "Immediate chilling", meaning: "The milk is cooled right after milking to slow the growth of bacteria.", confirmed: true },
    { practice: "Own tagged herd", meaning: "We know which animals your milk came from.", confirmed: true },
    { practice: "Own tube-well water", meaning: "The water for the animals comes from the farm.", confirmed: false },
    { practice: "Regular in-house quality checks", meaning: "Our team checks the milk regularly before it leaves the farm.", confirmed: true },
  ],
} as const;

/**
 * checks: the exact checks the farm runs and how often (e.g. smell, taste,
 * temperature, density). Never list a check the farm does not perform.
 */
export const QUALITY_CHECKS = {
  heading: "What are in-house quality checks?",
  answer:
    "In-house quality checks are tests our own team runs on the farm, not by an outside laboratory.",
  checks: [
    { name: "Smell", frequency: "Every day" },
    { name: "Taste", frequency: "Every day" },
    { name: "Temperature", frequency: "Every day" },
    { name: "Density", frequency: "Every day" },
  ] as { name: string; frequency: string }[] | null,
  pendingNote: null as string | null,
} as const;

/** Add documents here once obtained, then update the schema and Google Business Profile. */
export const CERTIFICATES = {
  heading: "Do you have lab reports or certificates?",
  answer:
    "Not yet. Al Shukr Dairy does not currently hold an outside laboratory report or food-authority certificate, and we will not claim one before we have it. When we receive them, we will publish them on this page.",
  documents: [] as { title: string; issuedOn: string; pdfUrl: string }[],
} as const;

export const CHILLING = {
  heading: "Why does chilling matter for fresh milk?",
  answer:
    "Chilling matters because warm milk lets bacteria multiply quickly. Cooling milk right after milking slows that growth and keeps it fresh until it reaches you. That is why we chill immediately and deliver within hours.",
  /** No temperatures until the client confirms equipment and readings. */
  stages: ["Milked", "Chilled immediately", "Delivered within hours"],
} as const;

export const QUALITY_COMPARISON = {
  heading: "How does Al Shukr compare with loose and packaged milk?",
  answer:
    "Al Shukr milk is traceable to one farm, chilled at once and unprocessed, while loose milk is hard for a buyer to verify and packaged milk is heat-treated and older. Each type suits different needs.",
} as const;

export const SHELF_LIFE = {
  heading: "Is fresh milk less shelf-stable than packaged milk?",
  answer:
    'Yes. Fresh milk keeps for a shorter time than packaged milk because we do not heat-treat it or add preservatives. Boil it when it arrives, cool it, and keep it in the refrigerator. We tell you this openly because it is part of what "fresh" means.',
} as const;

export const QUALITY_CTA = {
  headline: "Judge the quality yourself.",
  text: "Request a free 1-litre sample and see, smell and taste the difference. Or ask us anything on WhatsApp.",
  secondary: "Ask on WhatsApp",
} as const;

/* ------------------------------------------------------------------ */
/* Delivery Areas (/delivery-areas)                                     */
/* ------------------------------------------------------------------ */

export const AREAS_META = {
  title: "Milk Delivery in DHA & Askari, Lahore | Al Shukr",
  description:
    "Fresh milk delivered daily, 1 to 7 pm, to Askari X, Askari XI and all of DHA, Lahore. Check your area and get a free sample.",
} as const;

/** TODO: swap for shoot-list photo #12 (al-shukar-rider-loading.webp) once it exists. */
export const AREAS_MEDIA = {
  heroUrl:
    "https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=1920&q=80",
  heroAlt: "Cattle grazing on green pasture at golden hour",
} as const;

export const AREAS_HERO = {
  headline: "Fresh Milk Delivery in DHA and Askari, Lahore",
  subtext:
    "Daily delivery between 1 and 7 pm, in sealed pouches, straight from our own herd.",
  chips: ["Askari X (Askari 10)", "Askari XI (Askari 11)", "DHA Lahore"],
} as const;

export const AREAS_WHERE = {
  heading: "Where does Al Shukr deliver milk in Lahore?",
  answer:
    "Al Shukr Dairy delivers fresh milk to Askari X, Askari XI, all of DHA in Lahore. We deliver every day between 1 and 7 pm in sealed pouches. If you are close to these areas, send us your location and we will confirm on WhatsApp.",
  mapCaption: "Illustration, not to scale. We confirm your exact location on WhatsApp.",
} as const;

/** surroundingAreas: named areas beyond the three main ones (empty = none); dhaCoverage: exact phases or blocks. */
export const AREAS_TABLE = {
  heading: "Our delivery areas",
  times: "Daily, 1 to 7 pm",
  /** No areas beyond Askari X, Askari XI and DHA (client, 29 Oct 2026). */
  surroundingAreas: [] as string[] | null,
  surroundingPending: "Each surrounding area by name, with its delivery times.",
  dhaCoverage: "all of DHA Lahore" as string | null,
  dhaPending: 'The exact DHA phases or blocks covered. Never "all of DHA" unless that is true.',
} as const;

/**
 * The SEO draft says the form "tells you at once" if you are inside the area.
 * Restore that wording only once the sample form really checks addresses.
 */
export const AREA_CHECK = {
  heading: "How do I check if you deliver to my home?",
  answer:
    "You can check by requesting your free sample. Enter your name, phone number and address, and we confirm on WhatsApp whether your home is inside our delivery area before we deliver.",
  steps: [
    { title: "Request a free sample", body: "Share your name, phone and address." },
    { title: "We confirm on WhatsApp", body: "We check your home is inside our area." },
    { title: "Your first litre arrives", body: "Free, in a sealed pouch." },
  ],
  primary: "Check My Area and Get a Free Sample",
  secondary: "Ask on WhatsApp",
} as const;

export const DELIVERY_TIMES = {
  heading: "What are the delivery timings?",
  answer: "We deliver once a day, every day, between 1:00 pm and 7:00 pm.",
  window: "1:00 pm to 7:00 pm",
  charge: "Rs 100 per delivery, free on orders above 5 litres",
} as const;

export const AREA_NOT_LISTED = {
  heading: "What if my area is not on the list?",
  answer:
    "Join our waiting list. We only promise delivery to areas we can serve fresh, so we do not list places we do not yet cover, but we are expanding and will message you on WhatsApp when we reach your area.",
  cta: "Join the waiting list on WhatsApp",
  whatsappMessage:
    "Salam! Please add me to the Al Shukr Dairy waiting list. My area is: ",
} as const;

export const AREAS_CTA = {
  headline: "Live in Askari or DHA? Your first litre is free.",
  text: "Request your free 1-litre sample of Al Shukr milk, delivered fresh to your door every day between 1 and 7 pm.",
} as const;

/* ------------------------------------------------------------------ */
/* Free Sample (/free-sample)                                           */
/* ------------------------------------------------------------------ */

export const FREE_SAMPLE_META = {
  title: "Free Milk Sample in Lahore | Try 1 Litre Free | Al Shukr",
  description:
    "Request a free 1-litre sample of fresh Al Shukr milk. One per household in Askari X, Askari XI and DHA, Lahore. Verified on WhatsApp.",
} as const;

/** TODO: swap for shoot-list photo #13 (al-shukar-doorstep-delivery.webp) once it exists. */
export const FREE_SAMPLE_MEDIA = {
  heroUrl:
    "https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=1920&q=80",
  heroAlt: "Cattle grazing on green pasture at golden hour",
} as const;

export const FREE_SAMPLE_HERO = {
  headline: "Get a Free 1-Litre Milk Sample in Lahore",
  subtext:
    "Taste farm-fresh milk from our own herd before you decide. No payment, no commitment.",
  chips: ["1 litre, sealed pouch", "One per household", "Verified on WhatsApp"],
  cta: "Request My Free Sample",
} as const;

export const FREE_SAMPLE_HOW = {
  heading: "How do I get a free milk sample in Lahore?",
  answer:
    "Fill in the form with your name, phone number and address, and share your home's location if you can. We verify your request on WhatsApp and deliver 1 litre of fresh milk, free, to eligible homes in our delivery areas. The sample is limited to one per household.",
} as const;

/** value: null = waiting for the client; hidden in production. */
export const SAMPLE_RULES = [
  { label: "Size", value: "1 litre, in a sealed pouch." },
  { label: "Limit", value: "One sample per household." },
  { label: "Where", value: "Askari X, Askari XI and DHA in Lahore only." },
  { label: "Cost", value: "Free, including delivery. There is no payment and no commitment to subscribe." },
  { label: "Verification", value: "We confirm every request on WhatsApp before we deliver." },
  { label: "Milk type", value: "Your choice: cow, buffalo or mixed." },
] as { label: string; value: string | null; pendingNote?: string }[];

export const SAMPLE_AFTER = {
  heading: "What happens after I request a sample?",
  steps: [
    { title: "You send the form", body: "It takes about one minute." },
    { title: "We verify on WhatsApp", body: "We check your address is inside our delivery area." },
    { title: "We deliver your litre", body: "Fresh, in a sealed pouch, to your door the next day." },
    { title: "You decide", body: "If you like it, choose your milk and plan. If not, there is nothing to cancel." },
  ] as { title: string; body: string; pendingNote?: string }[],
} as const;

/** Mirrored into FAQPage schema on /free-sample. */
export const SAMPLE_QUESTIONS = {
  heading: "Questions about the sample",
  items: [
    { q: "Is the sample really free?", a: "Yes. It is 1 litre, free, once per household." },
    { q: "Do I need to subscribe afterwards?", a: "No. There is no commitment." },
    {
      q: "What do you do with my phone number?",
      a: "We use it only to confirm and deliver your sample, and to contact you about your order.",
    },
    {
      q: "Can I request a sample for a friend?",
      a: "Yes, if they live in a different household inside our delivery area and they request it with their own number.",
    },
    {
      q: "Why was my sample request rejected?",
      a: "Usually because the address is outside our delivery area or your household already received a sample. Message us on WhatsApp and we will check your request.",
    },
  ],
} as const;

export const FREE_SAMPLE_CTA = {
  headline: "One litre. Zero risk. Fresh from our herd.",
  text: "Request your free sample in about a minute. We confirm on WhatsApp and deliver to your door in Askari or DHA, Lahore.",
  button: "Request My Free Sample",
} as const;

/* ------------------------------------------------------------------ */
/* Track Sample (/track-sample) — utility page, noindex                 */
/* ------------------------------------------------------------------ */

export const TRACK_META = {
  title: "Track Your Free Milk Sample | Al Shukr Dairy",
  description: "Check the status of your free Al Shukr milk sample with the mobile number you used on the form.",
} as const;

export const TRACK = {
  heading: "Track Your Free Sample",
  intro: "Enter the mobile number you used on the form to see where your sample is.",
  fieldLabel: "Mobile number",
  button: "Check Status",
  loading: "Checking...",
  privacy: "We show only the status of your request. We never show your name or address here.",
  support: "Need help?",
  steps: ["Requested", "Approved", "Delivered", "Subscribed"],
} as const;

/**
 * Status messages from the SEO doc. step = position on the tracker (null =
 * no tracker). "unavailable" is shown until the lookup backend exists, so the
 * page never invents a status.
 */
export const TRACK_STATUSES = {
  pending: {
    step: 0,
    message: "We are reviewing your request. We will message you on WhatsApp soon.",
  },
  approved: {
    step: 1,
    message: "Your sample is approved and will be delivered soon.",
    pendingNote: "Show the delivery day here if the system holds it.",
  },
  delivered: {
    step: 2,
    message: "Your sample was delivered. We hope you enjoyed it.",
    cta: {
      label: "Choose your milk and start delivery",
      whatsappMessage: "Salam! I enjoyed my Al Shukr sample and would like to start daily delivery.",
    },
  },
  converted: { step: 3, message: "Welcome to Al Shukr. Your daily delivery is set up." },
  rejected: {
    step: null,
    message:
      "Sorry, we could not fulfil your request. This can happen if your address is outside our delivery area or a sample was already sent to your household. Message us on WhatsApp and we will help.",
  },
  not_found: {
    step: null,
    message: "We could not find a request for this number. Please check the number or request a sample.",
  },
  too_many: { step: null, message: "Too many attempts. Please wait a few minutes or message us on WhatsApp." },
  unavailable: {
    step: null,
    message:
      "Online tracking is not connected yet. Message us on WhatsApp with your mobile number and we will tell you where your sample is.",
  },
} as {
  [K in TrackStatus]: {
    step: number | null;
    message: string;
    pendingNote?: string;
    cta?: { label: string; whatsappMessage: string };
  };
};

export type TrackStatus =
  | "pending"
  | "approved"
  | "delivered"
  | "converted"
  | "rejected"
  | "not_found"
  | "too_many"
  | "unavailable";

/* ------------------------------------------------------------------ */
/* FAQ (/faq)                                                           */
/* ------------------------------------------------------------------ */

export const FAQ_META = {
  title: "FAQ: Fresh Milk Delivery in Lahore | Al Shukr Dairy",
  description:
    "Answers about Al Shukr fresh milk: prices, delivery areas, free samples, quality, boiling and storage. Cow, buffalo and mixed milk in Lahore.",
} as const;

export const FAQ_PAGE = {
  heading: "Frequently Asked Questions About Al Shukr Milk",
  intro:
    "Short, plain answers about our farm, our milk, prices, delivery, the free sample and storing fresh milk at home.",
  searchLabel: "Search questions",
  searchPlaceholder: "Try “boil”, “price” or “DHA”",
  noResults: "No questions match that search. Ask us on WhatsApp and we will answer it.",
} as const;

export type FaqItem = {
  q: string;
  /** null = waiting for the client; hidden in production. */
  a: string | null;
  pendingNote?: string;
  /** Related page, shown after the answer (not part of the schema answer text). */
  link?: { label: string; href: string };
};

const priceOf = (id: (typeof PRODUCTS)[number]["id"]) => PRODUCTS.find((p) => p.id === id)?.price;

/**
 * FAQ text from the SEO doc, word for word except where a bracketed
 * placeholder was dropped (the remaining sentences stay true) or a linked
 * page does not exist yet. Every published answer is mirrored into FAQPage schema.
 */
export const FAQ_CATEGORIES: { id: string; title: string; items: FaqItem[] }[] = [
  {
    id: "about",
    title: "About Al Shukr Dairy",
    items: [
      {
        q: "What is Al Shukr Dairy?",
        a: "Al Shukr Dairy is a family-owned dairy farm in Lahore, owned by the Alvi Family and founded in 2023. We deliver fresh cow, buffalo and mixed milk from our own tagged herd to homes in Askari X, Askari XI and DHA.",
        link: { label: "Meet the farm", href: "/our-farm" },
      },
      {
        q: "Where is your farm?",
        a: "Our farm is in Lahore. We do not publish the farm address, but farm visits are possible on request. Message us on WhatsApp to arrange a visit, and we will share the location when the visit is confirmed.",
      },
      {
        q: "Who owns Al Shukr Dairy?",
        a: "Al Shukr Dairy is owned and run by the Alvi Family. We have kept our own herd and delivered fresh milk to Lahore households since 2023.",
      },
    ],
  },
  {
    id: "quality",
    title: "Quality and purity",
    items: [
      {
        q: "Is Al Shukr milk khalis (pure)?",
        a: "Yes. Al Shukr milk has no water or adulteration added. It comes from our own herd, is machine milked and is chilled immediately after milking. Khalis doodh is our promise, and our Quality page shows exactly how we keep it.",
        link: { label: "How we keep milk pure", href: "/quality" },
      },
      {
        q: "Do you add water, preservatives or chemicals to your milk?",
        a: "No. We add no water, no preservatives and no chemicals to Al Shukr milk. Because nothing is added to extend its life, our milk is fresh and must be boiled and refrigerated at home.",
      },
      {
        q: "Is your milk tested?",
        a: "Yes. Our team checks the milk's smell, taste, temperature and density every day on the farm. These are our own checks, not an outside laboratory test.",
      },
      {
        q: "Do you have lab reports or a food authority certificate?",
        a: "Not yet. We do not currently hold an outside lab report or food-authority registration, and we will not claim one before we have it. We will publish documents on our Quality page when we receive them.",
      },
      {
        q: "How is your milk different from loose milk and packaged milk?",
        a: "Al Shukr milk is fresh, unprocessed and traceable to one farm. Loose milk from open cans is hard for a buyer to verify, and packaged milk is heat-treated and can be days or weeks old. See our comparison table on the Quality page.",
        link: { label: "See the comparison table", href: "/quality#compare" },
      },
    ],
  },
  {
    id: "milk",
    title: "Cow, buffalo and mixed milk",
    items: [
      {
        q: "What is the difference between cow, buffalo and mixed milk?",
        a: "Cow milk is lighter in taste and texture. Buffalo milk is thicker and creamier. Mixed milk combines both for a balance. We sell all three, and a free sample helps you choose the one your family prefers.",
        link: { label: "Compare our milks", href: "/products-prices#milk-types" },
      },
      {
        q: "Which milk should I choose for tea?",
        a: "Many households prefer buffalo or mixed milk for tea because it is creamier, but it is a matter of taste. Try a free sample of the milk you are considering and decide for yourself.",
      },
      {
        q: "Bhains ka doodh aur gaye ke doodh mein kya farq hai?",
        a: "Bhains ka doodh gaha aur malaaidar hota hai, jabke gaye ka doodh halka hota hai. Hum gaye ka, bhains ka aur mila hua doodh teeno deliver karte hain. Free sample se aap apni pasand ka doodh chun sakte hain.",
      },
    ],
  },
  {
    id: "price",
    title: "Price and ordering",
    items: [
      {
        q: "How much does Al Shukr milk cost per litre?",
        a: `Cow milk costs Rs ${priceOf("cow")}, buffalo milk Rs ${priceOf("buffalo")} and mixed (cow and buffalo) milk Rs ${priceOf("mixed")} per litre. Delivery is Rs 100, and free on orders above 5 litres. We show the date prices were last updated on our Products & Prices page.`,
        link: { label: "See full prices", href: "/products-prices" },
      },
      {
        // Only the doc's own Roman Urdu sentences; new Urdu needs a native editor.
        q: "Doodh ka rate kya hai?",
        a: `Gaye ka doodh Rs ${priceOf("cow")}, bhains ka doodh Rs ${priceOf("buffalo")} aur mila hua doodh Rs ${priceOf("mixed")} per litre hai. Taaza rate Products & Prices page par dekhein.`,
        pendingNote: "New Roman Urdu wording: needs a native speaker's check before launch.",
        link: { label: "Products & Prices", href: "/products-prices" },
      },
      {
        q: "How do I pay?",
        a: "You can pay by Easypaisa, JazzCash, bank transfer or cash on delivery.",
      },
      {
        q: "Is there a minimum order or a subscription?",
        a: "The minimum order is 1 litre. You can choose daily, alternate-day or weekly delivery. Delivery costs Rs 100 and is free on orders above 5 litres.",
      },
    ],
  },
  {
    id: "delivery",
    title: "Delivery",
    items: [
      {
        q: "Where do you deliver milk in Lahore?",
        a: "We deliver to Askari X, Askari XI and all of DHA in Lahore. If you live nearby, send us your location and we will confirm on WhatsApp whether we can deliver to you.",
        link: { label: "Delivery areas", href: "/delivery-areas" },
      },
      {
        q: "What time do you deliver?",
        a: "We deliver every day between 1:00 pm and 7:00 pm.",
      },
      {
        q: "How is the milk packed?",
        a: "Every delivery comes in a sealed pouch of 1 litre or 2 litres.",
      },
      {
        q: "Can I pause delivery when I travel?",
        a: "Yes. Send us a simple text on WhatsApp at least one day before, and we will pause your delivery until you are back.",
      },
    ],
  },
  {
    id: "sample",
    title: "Free sample",
    items: [
      {
        // "map pin" in the draft; the form collects an optional shared location instead.
        q: "How do I get a free milk sample?",
        a: "Request it on our Free Sample page with your name, phone number, address and location. We verify on WhatsApp and deliver 1 litre free, once per household, to homes inside our delivery areas.",
        link: { label: "Get a free sample", href: "/free-sample" },
      },
      {
        q: "Is there any charge or commitment for the sample?",
        a: "No. The sample is free, and you do not have to subscribe afterwards.",
      },
      {
        q: "Why was my sample request rejected?",
        a: "Usually because the address is outside our delivery area or your household already received a sample. Message us on WhatsApp and we will check your request.",
        link: { label: "Track your sample", href: "/track-sample" },
      },
    ],
  },
  {
    id: "storage",
    title: "Storage and safety",
    items: [
      {
        q: "Do I need to boil Al Shukr milk?",
        a: "Yes. Our milk is fresh and not heat-treated, so you should boil it when it arrives, let it cool and keep it in the refrigerator. This is normal for fresh milk and part of keeping it safe.",
      },
      {
        q: "How long does fresh milk last?",
        a: "After boiling and cooling, fresh milk keeps for 2 to 3 days in the refrigerator. That is shorter than packaged milk, so smell and check the milk before use.",
      },
      {
        q: "Why does fresh milk spoil faster than packaged milk?",
        a: "Packaged milk is heat-treated at a factory, which extends its shelf life. Fresh milk has no such treatment and no preservatives, so it spoils sooner. This is why we chill it immediately and deliver it within hours.",
        link: { label: "Why chilling matters", href: "/quality#chilling" },
      },
    ],
  },
  {
    id: "bulk",
    title: "Business and bulk orders",
    items: [
      {
        q: "Do you supply shops, restaurants or distributors?",
        a: "Yes. We take bulk inquiries from shops, restaurants and distributors. Fill in the short form on our Bulk Milk Supply page and we will reply with availability and terms.",
        link: { label: "Bulk milk supply", href: "/bulk-milk-supply" },
      },
    ],
  },
];

export const FAQ_CTA = {
  headline: "Still have a question?",
  text: "Ask us anything on WhatsApp, or taste the answer for yourself with a free 1-litre sample.",
  button: "Get a Free Sample",
  secondary: "Ask on WhatsApp",
} as const;

/* ------------------------------------------------------------------ */
/* Blog (/blog)                                                         */
/* ------------------------------------------------------------------ */

export const BLOG_META = {
  title: "Fresh Milk Guides & Tips | Al Shukr Dairy Blog",
  description:
    "Simple guides on fresh milk in Lahore: spotting adulterated milk, cow vs buffalo milk, boiling and storing milk, and more.",
} as const;

export const BLOG_PAGE = {
  heading: "Fresh Milk Guides from Al Shukr",
  intro:
    "Simple, honest guides on fresh milk in Lahore: how to spot adulterated milk, how cow and buffalo milk differ, and how to boil and store milk at home.",
  author: "Written by the Al Shukr Dairy team",
  readLabel: "Read the guide",
  /** Shown in production while no post is published yet. */
  empty: {
    title: "Our first guides are being reviewed",
    body: "Every guide is checked before it goes live, because food-safety advice has to be right. Until then, our FAQ and Quality pages answer the most common questions.",
  },
  ctaHeadline: "Not sure about your current milk? Try 1 litre of ours free.",
  ctaText: "Taste fresh milk from our own herd, delivered in a sealed pouch to your door in Askari or DHA, Lahore.",
} as const;

export type BlogCategory = "Buying milk" | "Milk types" | "At home" | "Quality";

export type BlogPost = {
  slug: string;
  /** Article H1, also the card title. */
  title: string;
  metaTitle: string;
  metaDescription: string;
  keyword: string;
  category: BlogCategory;
  /** The 40 to 60 word opening answer; the card excerpt. */
  answer: string;
  /** "draft" posts are never linked or listed in production. */
  status: "draft" | "published";
  publishedOn: string | null;
  reviewedOn: string | null;
  /** What must happen before this post can be published. */
  pendingNote: string;
};

const REVIEW = "Client reviews all food-safety advice before publishing.";

/**
 * The six launch articles from the SEO doc. Flip status to "published" once a
 * post is written, reviewed and its /blog/[slug] article page exists.
 */
export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "how-to-spot-adulterated-milk",
    title: "How to Spot Adulterated Milk (Milawat Wala Doodh)",
    metaTitle: "How to Spot Adulterated Milk: Signs to Watch For",
    metaDescription:
      "Learn the signs of watered-down or adulterated milk, why home tests are only clues, and how to choose a source you can trust in Lahore.",
    keyword: "how to spot adulterated milk",
    category: "Buying milk",
    answer:
      "Adulterated milk is milk that has something added that the buyer did not ask for, most often water. At home you can watch for a thin or watery look, a pale colour, an odd smell or taste, and milk that spoils unusually fast. These are clues only. They cannot prove milk is pure or safe.",
    status: "draft",
    publishedOn: null,
    reviewedOn: null,
    pendingNote: `${REVIEW} A food expert also reviews the "Can home tests prove my milk is pure?" section.`,
  },
  {
    slug: "cow-milk-vs-buffalo-milk",
    title: "Cow Milk vs Buffalo Milk: Which Is Right for Your Family?",
    metaTitle: "Cow Milk vs Buffalo Milk: Taste, Texture & Uses",
    metaDescription:
      "Cow or buffalo milk? See how they differ in taste, thickness and everyday use, and when mixed milk is the easy middle choice.",
    keyword: "cow milk vs buffalo milk",
    category: "Milk types",
    answer:
      "Cow milk is lighter in taste and texture, while buffalo milk is thicker and creamier because it is generally higher in fat. Neither is better for everyone. The right choice depends on taste and how you use milk, and mixed milk blends the two.",
    status: "draft",
    publishedOn: null,
    reviewedOn: null,
    pendingNote: `${REVIEW} No health, digestion or disease claims for either milk.`,
  },
  {
    slug: "how-to-boil-and-store-fresh-milk",
    title: "How to Boil and Store Fresh Milk at Home",
    metaTitle: "How to Boil & Store Fresh Milk at Home | Al Shukr",
    metaDescription:
      "Fresh milk has no preservatives, so it needs boiling and refrigeration. Follow these simple steps to store your milk safely.",
    keyword: "how to boil and store fresh milk",
    category: "At home",
    answer:
      "Fresh milk is not heat-treated and has no preservatives, so boil it soon after it arrives, let it cool, and keep it covered in the refrigerator. Fresh milk keeps for a shorter time than packaged milk, so store it properly and use it within the days we recommend.",
    status: "draft",
    publishedOn: null,
    reviewedOn: null,
    pendingNote: `Uses the client's figure of 2 to 3 days in the fridge (29 Oct 2026). ${REVIEW}`,
  },
  {
    slug: "why-chilling-matters-for-fresh-milk",
    title: "Why Chilling Matters for Fresh Milk",
    metaTitle: "Why Chilling Matters for Fresh Milk | Al Shukr",
    metaDescription:
      "Why fresh milk must be cooled right after milking, what happens in Lahore's heat when it is not, and how Al Shukr chills its milk.",
    keyword: "why chilling milk is important",
    category: "Quality",
    answer:
      "Chilling matters because bacteria multiply quickly in warm milk. Cooling milk right after milking slows that growth and keeps it fresh until it reaches your home. In a hot city like Lahore, the time between milking and cooling makes a real difference.",
    status: "draft",
    publishedOn: null,
    reviewedOn: null,
    pendingNote: `${REVIEW} Chilling equipment or temperatures only if the client confirms them.`,
  },
  {
    slug: "fresh-milk-vs-packaged-milk",
    title: "Fresh Milk vs Packaged Milk: What Is the Difference?",
    metaTitle: "Fresh Milk vs Packaged Milk: What Is the Difference?",
    metaDescription:
      "Compare fresh farm milk with packaged milk on freshness, processing, shelf life and traceability, with honest pros and cons for each.",
    keyword: "fresh milk vs packaged milk",
    category: "Milk types",
    answer:
      "Fresh milk goes from the farm to your home within hours with no heat treatment, so it keeps its natural cream but lasts a shorter time. Packaged milk is heat-treated and standardised at a factory, so it lasts longer but can be days or weeks old.",
    status: "draft",
    publishedOn: null,
    reviewedOn: null,
    pendingNote: REVIEW,
  },
  {
    slug: "how-to-choose-milk-delivery-service-lahore",
    title: "How to Choose a Milk Delivery Service in Lahore: 7 Questions to Ask",
    metaTitle: "How to Choose a Milk Delivery Service in Lahore",
    metaDescription:
      "Seven questions to ask before you pick a milk delivery service in Lahore, from source and chilling to packaging, price and free trials.",
    keyword: "milk delivery service Lahore",
    category: "Buying milk",
    answer:
      "Before choosing a milk delivery service in Lahore, ask where the milk comes from, how it is chilled, how it is packed, whether prices are public, whether you can try it first, whether you can visit, and what the delivery times are. The best services answer all seven clearly.",
    status: "draft",
    publishedOn: null,
    reviewedOn: null,
    pendingNote: `${REVIEW} Never name another business.`,
  },
];

export const PUBLISHED_POSTS = BLOG_POSTS.filter((p) => p.status === "published");

/* ------------------------------------------------------------------ */
/* Bulk Milk Supply (/bulk-milk-supply)                                 */
/* ------------------------------------------------------------------ */

export const BULK_META = {
  title: "Bulk Milk Supply in Lahore | Al Shukr Dairy",
  description:
    "Fresh cow, buffalo and mixed milk in bulk for shops, restaurants and distributors in Lahore. Send an inquiry and we will reply with availability.",
} as const;

/** TODO: swap for a real farm photo (shoot-list #6 chilling tank or #11 pouches) once it exists. */
export const BULK_MEDIA = {
  heroUrl:
    "https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=1920&q=80",
  heroAlt: "Cattle grazing on green pasture at golden hour",
} as const;

export const BULK_HERO = {
  headline: "Bulk Fresh Milk Supply in Lahore",
  subtext:
    "Fresh milk from our own herd for shops, restaurants and distributors who need steady daily quantities.",
  chips: ["Shops", "Restaurants and cafes", "Distributors"],
  cta: "Send Bulk Inquiry",
} as const;

/** SEO note: "bulk milk supplier Lahore" in the first paragraph and one H2. */
export const BULK_WHO = {
  heading: "Who do we supply in bulk?",
  answer:
    "Al Shukr Dairy is a bulk milk supplier in Lahore for shops, restaurants and distributors, with fresh cow, buffalo and mixed milk. Because we supply households first and our herd is limited, we confirm availability for each inquiry before we agree to a quantity.",
  types: [
    { id: "shop", title: "Shops", body: "Daily fresh milk for your counter." },
    { id: "restaurant", title: "Restaurants and cafes", body: "For tea, desserts, dahi and your kitchen." },
    { id: "distributor", title: "Distributors", body: "Steady quantities from one known farm." },
  ],
} as const;

export const BULK_WHY = {
  heading: "Why choose Al Shukr as your bulk milk supplier in Lahore?",
  points: [
    { title: "One known source.", body: "Milk from our own tagged herd, not mixed from many suppliers." },
    { title: "No water or adulteration.", body: "No preservatives or chemicals." },
    { title: "Chilled right after milking.", body: "Machine milked and cooled immediately." },
    { title: "Three milk types.", body: "Cow, buffalo and mixed." },
    { title: "Regular in-house quality checks.", body: "Smell, taste, temperature and density, every day." },
  ] as { title: string; body: string | null }[],
} as const;

/** value: null = waiting for the client; the row is hidden in production. */
export const BULK_TERMS = {
  heading: "What do I need to know before ordering in bulk?",
  answer:
    "We supply cow, buffalo and mixed milk in bulk and quote a price after your inquiry. Quantities depend on what our herd can give after household deliveries, so we confirm availability for every order.",
  rows: [
    { topic: "Milk types", value: "Cow, buffalo, mixed" },
    { topic: "Minimum daily quantity", value: null, pendingNote: "Litres per day." },
    { topic: "Bulk price", value: "We quote after your inquiry." },
    { topic: "Delivery", value: null, pendingNote: "Areas and timings for business orders." },
    { topic: "Packaging", value: null, pendingNote: "Sealed pouches, cans or both for bulk." },
    { topic: "Payment terms", value: null, pendingNote: "Payment terms for business orders." },
  ] as { topic: string; value: string | null; pendingNote?: string }[],
} as const;

export const BULK_FORM = {
  heading: "Send a bulk inquiry",
  intro: "Tell us what your business needs. We reply on WhatsApp with availability and terms.",
  fields: {
    business: "Business name",
    contact: "Your name",
    phone: "Mobile number (WhatsApp preferred)",
    businessType: "Business type",
    milkType: "Milk type",
    quantity: "Litres needed per day",
    area: "Delivery area in Lahore",
    message: "Anything else we should know",
  },
  businessTypes: ["Shop", "Restaurant or cafe", "Distributor", "Other"],
  milkTypes: ["Cow", "Buffalo", "Mixed"],
  submit: "Send Bulk Inquiry",
  loading: "Sending...",
  success: "Thank you. We received your inquiry and will reply on WhatsApp with availability and terms.",
  error: "Something went wrong on our side. Please try again, or message us on WhatsApp.",
  errors: {
    business: "Please enter your business name.",
    contact: "Please enter your name.",
    phone: "Enter a Pakistani mobile number, for example 0300 1234567.",
    businessType: "Choose your business type.",
    milkType: "Choose a milk type.",
    quantity: "Enter the litres you need per day.",
    area: "Add your delivery area.",
  },
  visualCaption: "Illustration only. We confirm availability for every inquiry.",
  direct: "Prefer to talk? Message or call us on WhatsApp",
  whatsappMessage:
    "Salam! I would like to ask about bulk milk supply from Al Shukr Dairy for my business.",
} as const;

export const BULK_CTA = {
  headline: "Need milk for your business? Tell us how much.",
  text: "Send a short inquiry and we will reply on WhatsApp with availability and terms.",
  button: "Send Bulk Inquiry",
  secondary: "WhatsApp Us",
} as const;

/* ------------------------------------------------------------------ */
/* Contact (/contact)                                                   */
/* ------------------------------------------------------------------ */

/**
 * Flip once the client confirms the real details. While false, the Contact
 * page marks WhatsApp, phone and email "To confirm" in development and leaves
 * ContactPoint schema out. Business hours and social links stay hidden.
 */
export const CONTACT_STATUS = {
  channelsConfirmed: true,
  socialConfirmed: true,
  businessHours: "Every day, 6:00 am to 9:00 pm" as string | null,
};

export const CONTACT_META = {
  title: "Contact Al Shukr Dairy | WhatsApp & Phone, Lahore",
  description:
    "Message or call Al Shukr Dairy in Lahore about fresh milk delivery, free samples, farm visits and bulk orders. WhatsApp is the fastest way.",
} as const;

export const CONTACT_PAGE = {
  heading: "Contact Al Shukr Dairy",
  subtext:
    "The fastest way to reach us is WhatsApp. We reply to sample requests, delivery questions and farm-visit requests there.",
  howHeading: "How can I contact Al Shukr Dairy?",
  detailsHeading: "Contact details",
  noAddress: "There is no public street address. We share the farm location when a visit is confirmed.",
  topicsHeading: "What should I message about?",
  send: "Send on WhatsApp",
} as const;

/** Built from the same constants as the footer, so the details always match. */
export function contactAnswer() {
  return [
    CONTACT.email
      ? `You can contact Al Shukr Dairy on WhatsApp at ${WHATSAPP_DISPLAY}, by phone at ${CONTACT.phone} or by email at ${CONTACT.email}.`
      : `You can contact Al Shukr Dairy on WhatsApp or by phone at ${CONTACT.phone}.`,
    "We are a Lahore dairy farm delivering fresh milk to Askari X, Askari XI and DHA.",
    CONTACT_STATUS.businessHours ? `Our hours are ${CONTACT_STATUS.businessHours}.` : null,
  ]
    .filter(Boolean)
    .join(" ");
}

/**
 * "What should I message about?" with the doc's pre-filled WhatsApp message
 * per topic. link = the page that handles it better than a chat.
 */
export const CONTACT_TOPICS = [
  {
    id: "sample",
    label: "Free sample",
    body: "Request it on the sample page, or ask us here.",
    message: "Salam! I would like to request a free 1-litre milk sample. My area is ",
    link: { label: "Request it on the sample page", href: "/free-sample" },
  },
  {
    id: "area",
    label: "Delivery in my area",
    body: "Send your location and we confirm whether we deliver to you.",
    message: "Salam! Do you deliver fresh milk to my area? I will share my location.",
    link: { label: "See our delivery areas", href: "/delivery-areas" },
  },
  {
    id: "prices",
    label: "Prices and plans",
    body: "Ask on WhatsApp for today's rates and delivery options.",
    message: "Salam! I would like to know your milk prices and delivery plans.",
    link: { label: "See prices", href: "/products-prices" },
  },
  {
    id: "visit",
    label: "Farm visit",
    body: "Ask for a time. We share the location once your visit is confirmed.",
    message: "Salam! I would like to visit the Al Shukr farm. When can I come?",
    link: null,
  },
  {
    id: "bulk",
    label: "Bulk orders",
    body: "Use the bulk inquiry form, or ask us here.",
    message: "Salam! I run a shop or restaurant and want to ask about bulk milk supply.",
    link: { label: "Use the bulk inquiry form", href: "/bulk-milk-supply#inquiry" },
  },
] as const;

export const CONTACT_FORM = {
  heading: "Send us a message",
  intro: "Prefer not to use WhatsApp right now? Leave a message and we will reply on WhatsApp.",
  fields: { name: "Name", phone: "Mobile number", message: "Message" },
  submit: "Send Message",
  loading: "Sending...",
  success: "Thank you. We will reply on WhatsApp soon.",
  error: "Something went wrong on our side. Please try again, or message us on WhatsApp.",
  errors: {
    name: "Please enter your name.",
    phone: "Enter a Pakistani mobile number, for example 0300 1234567.",
    message: "Please write a short message.",
  },
} as const;

/* ------------------------------------------------------------------ */
/* Privacy Policy (/privacy)                                            */
/* ------------------------------------------------------------------ */

export const PRIVACY_META = {
  title: "Privacy Policy | Al Shukr Dairy",
  description:
    "How Al Shukr Dairy collects, uses and protects the details you share for free samples, milk delivery and inquiries in Lahore.",
} as const;

/**
 * Plain-language policy written from what the site and business really do:
 * no cookies, analytics or ad tracking; forms collect only delivery details.
 * Pakistan has no data protection act in force yet (Oct 2026), so the policy
 * makes its own commitments and references PECA 2016 without claiming more.
 * Revisit if the Personal Data Protection Bill becomes law, or if analytics,
 * cookies or a new service provider are added to the site.
 */
export const PRIVACY = {
  heading: "Privacy Policy",
  updated: "31 October 2026",
  intro:
    "This policy explains what personal details Al Shukr Dairy collects, why we need them, who sees them and how you can ask us to change or delete them. We have written it in plain language, because you should be able to understand it in a few minutes.",
  pendingNote:
    "Draft for the client's approval (checklist item 39). Also confirm the website host and form database once chosen, and the 12-month retention periods.",
  summary: [
    "We collect only what we need to deliver milk and reply to you.",
    "We never sell or rent your details.",
    "This website uses no cookies, analytics or advertising trackers.",
    "You can ask us to correct or delete your details at any time on WhatsApp.",
  ],
  sections: [
    {
      id: "who-we-are",
      title: "Who we are",
      paragraphs: [
        `Al Shukr Dairy is a family-owned dairy farm in Lahore, Pakistan, owned and run by ${SITE.owner}. We deliver fresh milk to homes in Askari X, Askari XI and DHA. In this policy, "we", "us" and "our" mean Al Shukr Dairy.`,
        `If you have any question about your details, message us on WhatsApp or call ${CONTACT.phone}.`,
      ],
    },
    {
      id: "what-we-collect",
      title: "What we collect",
      paragraphs: ["We only collect details you choose to give us:"],
      list: [
        "Free sample form: your name, mobile number, delivery address, the milk you want to try and, only if you tap “Use my current location”, your home's location.",
        "Bulk inquiry form: your business name, your name, mobile number, business type, milk type, litres needed per day, delivery area and any message you add.",
        "Contact form: your name, mobile number and message.",
        "Sample tracking: the mobile number you enter, used only to look up your request.",
        "When you order or message us: your delivery details, plan, order history, payment records and the messages you send us on WhatsApp or by phone.",
      ],
      after: [
        "We do not ask for your CNIC, card numbers or bank passwords. If you pay by Easypaisa, JazzCash or bank transfer, the payment is handled by that provider, and we only keep a record that you paid.",
      ],
    },
    {
      id: "location",
      title: "Your location",
      paragraphs: [
        "Sharing your location on the sample form is optional. Your browser asks your permission first, and you can remove the location before you send the form. We use it only to confirm that your home is inside our delivery area and to help our rider find your door. We do not track your location at any other time.",
      ],
    },
    {
      id: "how-we-use",
      title: "How we use your details",
      list: [
        "To verify your free sample request on WhatsApp and deliver it.",
        "To check that you are inside our delivery area and keep samples to one per household.",
        "To deliver your milk, manage your plan and keep payment records.",
        "To reply to your questions and bulk inquiries.",
        "To tell you about changes to your delivery, such as a delay or a price change.",
        "To protect our service from fake or repeated requests.",
      ],
      after: [
        "We only message you about your requests and orders. We do not send promotional messages unless you ask for them, and you can tell us to stop at any time.",
      ],
    },
    {
      id: "sharing",
      title: "Who sees your details",
      paragraphs: ["We never sell, rent or trade your details. We share them only when needed to serve you:"],
      list: [
        "Our team and delivery riders, who see the name, address, phone number and location needed for your delivery.",
        "WhatsApp (Meta), when you message us or we confirm your request on WhatsApp. WhatsApp's own privacy policy applies to those chats.",
        "Your payment provider (Easypaisa, JazzCash or your bank), when you choose to pay that way.",
        "The companies that host this website and store our form submissions, only to run those services for us.",
        "Government or law enforcement authorities, only when the law requires it.",
      ],
    },
    {
      id: "cookies",
      title: "Cookies and tracking",
      paragraphs: [
        "This website does not use cookies, analytics tools or advertising trackers, and we do not build a profile of your visits. Like any website, our host may keep standard technical logs, such as your IP address and browser type, for a short time to keep the site secure and working.",
        "Links to WhatsApp, Instagram and Facebook take you to those services, and their own privacy policies apply there.",
      ],
    },
    {
      id: "retention",
      title: "How long we keep your details",
      list: [
        "Sample requests: up to 12 months, so we can keep samples to one per household.",
        "Customer details: while you are our customer, and up to 12 months after your last delivery. Payment records may be kept longer where the law or our accounts require it.",
        "Inquiries and messages: up to 12 months after our last reply.",
      ],
      after: ["After that, we delete your details or keep them only in a form that no longer identifies you."],
    },
    {
      id: "security",
      title: "How we protect your details",
      paragraphs: [
        "Only the people who need your details to serve you can see them, and we take reasonable steps to keep them safe. No website or phone is completely secure, so if we ever learn that your details were exposed, we will tell you as soon as we can.",
      ],
    },
    {
      id: "your-choices",
      title: "Your choices",
      paragraphs: ["You can message us on WhatsApp at any time to:"],
      list: [
        "Ask what details we hold about you.",
        "Correct details that are wrong or out of date.",
        "Ask us to delete your details.",
        "Withdraw your consent or stop messages from us.",
      ],
      after: [
        "We reply within 14 days. If you ask us to delete your details while you have an active delivery plan, we will need to stop your deliveries.",
      ],
    },
    {
      id: "children",
      title: "Children",
      paragraphs: [
        "Our service is meant for adults managing their household's milk. We do not knowingly collect details from anyone under 18. If you think a child has sent us their details, message us and we will delete them.",
      ],
    },
    {
      id: "law",
      title: "The law we follow",
      paragraphs: [
        "We handle personal details in line with the laws of Pakistan, including the Prevention of Electronic Crimes Act, 2016. If a new data protection law comes into force, we will update this policy to meet it.",
      ],
    },
    {
      id: "changes",
      title: "Changes to this policy",
      paragraphs: [
        "If we change how we handle your details, we will update this page and the date at the top. If a change is important, we will also tell our customers on WhatsApp.",
      ],
    },
  ] as { id: string; title: string; paragraphs?: string[]; list?: string[]; after?: string[] }[],
  contactHeading: "Questions about your details?",
  contactText: "Message us on WhatsApp or call us. Someone from our family will reply.",
} as const;
