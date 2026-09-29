/**
 * Al-shukr Dairy Farm — editable site copy, stats, media & links.
 * Swap hero video, images, WhatsApp number and placeholder stats here.
 */

export const SITE = {
  name: "Al-shukr Dairy Farm",
  shortName: "Al-shukr",
  tagline: "Pure Milk. Straight From Our Farm To Your Door.",
  description:
    "Fresh, hygienic, unadulterated cow & buffalo milk, delivered every morning across Pakistan.",
  locale: "en_PK",
  url: "https://alshukrdairy.pk", // placeholder
} as const;

/** TODO: Replace with your real WhatsApp number (country code, no + or spaces). */
export const WHATSAPP = {
  number: "923001234567",
  prefilledMessage:
    "Hi, I am interested in fresh milk from Al-shukr Dairy Farm",
  get href() {
    return `https://wa.me/${this.number}?text=${encodeURIComponent(this.prefilledMessage)}`;
  },
} as const;

export const CONTACT = {
  phone: "+92 300 1234567",
  email: "hello@alshukrdairy.pk",
  address: "Farm Road, Near Canal, Punjab, Pakistan",
  hours: "Orders & delivery: 4:30 AM – 10:00 AM daily",
} as const;

/** Full-bleed hero background. Swap URL + poster as needed. */
export const HERO_MEDIA = {
  videoUrl: "/video/hero.mp4",
  posterUrl:
    "https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=1920&q=80",
} as const;

export const NAV_LINKS = [
  { label: "Our Story", href: "#story" },
  { label: "Process", href: "#process" },
  { label: "Products", href: "#products" },
  { label: "Why Al-shukr", href: "#why" },
  { label: "Contact", href: "#contact" },
] as const;

export const HERO = {
  headline: "Pure Milk. Straight From Our Farm To Your Door.",
  subtext:
    "Fresh, hygienic, unadulterated cow & buffalo milk, delivered every morning.",
  primaryCta: "Get a Free Sample",
  secondaryCta: "Chat on WhatsApp",
  chips: [
    "6 AM Daily Delivery",
    "100% Pure",
    "Farm to Door in Hours",
  ],
} as const;

export const TRUST_ITEMS = [
  "No Adulteration",
  "Lab Tested",
  "Hygienic Milking",
  "Daily Delivery",
  "Cow & Buffalo Milk",
  "Chilled Chain",
] as const;

export const STORY_STEPS = [
  {
    time: "4:30 AM",
    title: "Milking",
    description:
      "Our herd is milked at first light in a calm, hygienic parlour. Soft hands, clean steel, quiet cows.",
    image:
      "https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&w=1200&q=80",
  },
  {
    time: "5:30 AM",
    title: "Testing & Chilling",
    description:
      "Every batch is checked for purity, then plunged into the chill chain so freshness never slips.",
    image:
      "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=1200&q=80",
  },
  {
    time: "6:30 AM",
    title: "Packing",
    description:
      "Sealed bottles and cans leave the farm cold-room ready for households and trusted gawalay.",
    image:
      "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&w=1200&q=80",
  },
  {
    time: "7:00 AM",
    title: "Riders on the Road",
    description:
      "Our riders fan out before the city wakes — farm to door in hours, not days.",
    image:
      "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=1200&q=80",
  },
] as const;

export const PRODUCTS = [
  {
    id: "cow",
    name: "Fresh Cow Milk",
    description:
      "Light, creamy daily milk for tea, cereal and family glasses — never reconstituted.",
    icon: "cow" as const,
  },
  {
    id: "buffalo",
    name: "Pure Buffalo Milk",
    description:
      "Richer, full-bodied buffalo milk for raita, desserts and those who crave density.",
    icon: "buffalo" as const,
  },
  {
    id: "bulk",
    name: "Bulk Supply for Distributors",
    description:
      "Reliable chilled volumes for gawalay and retailers who refuse adulterated supply.",
    icon: "bulk" as const,
  },
] as const;

/** Illustrative placeholders — replace with verified business figures. */
export const STATS = [
  { value: 500, suffix: "+", label: "Happy Households" },
  { value: 100, suffix: "%", label: "Pure" },
  { value: 365, suffix: "", label: "Days Delivery" },
  { value: 24, suffix: "/7", label: "Support" },
] as const;

export const WHY_CARDS = [
  {
    title: "Purity",
    body: "Lab-tested batches. No water, no powder, no shortcuts.",
    size: "large" as const,
  },
  {
    title: "Freshness",
    body: "Delivered within hours of milking — still cold when it reaches you.",
    size: "small" as const,
  },
  {
    title: "Traceability",
    body: "Every animal tracked digitally from parlour to packing.",
    size: "small" as const,
  },
  {
    title: "Transparency",
    body: "Know your farm. Visit, ask, taste — we have nothing to hide.",
    size: "large" as const,
  },
] as const;

export const HOW_STEPS = [
  {
    title: "Request a Free Sample",
    body: "Tell us your name, phone and address. We bring a morning bottle to your door.",
  },
  {
    title: "Taste the Difference",
    body: "Notice the cream line, the clean finish, the way tea turns golden.",
  },
  {
    title: "Subscribe for Daily Delivery",
    body: "Pick cow, buffalo or both. We ride out before you wake.",
  },
] as const;

/** Placeholder quotes — replace with real customer voices. */
export const TESTIMONIALS = [
  {
    quote:
      "Our kids finally drink plain milk without complaining. That cream line says everything.",
    name: "Ayesha K.",
    role: "Household, Lahore",
  },
  {
    quote:
      "As a gawala I need volume I can trust. Al-shukr’s chill chain never lets me down.",
    name: "Imran S.",
    role: "Distributor, Faisalabad",
  },
  {
    quote:
      "Sample arrived at 6:40 AM. By evening we had ordered a weekly subscription.",
    name: "Bilal R.",
    role: "Household, Islamabad",
  },
  {
    quote:
      "Transparent farm, honest people. You can taste the difference in doodh patti.",
    name: "Sana M.",
    role: "Household, Multan",
  },
  {
    quote:
      "Buffalo milk for kheer, cow for everyday — both arrive cold and sealed.",
    name: "Hassan T.",
    role: "Household, Karachi",
  },
] as const;

export const SOCIAL = [
  { label: "Instagram", href: "https://instagram.com/" },
  { label: "Facebook", href: "https://facebook.com/" },
  { label: "YouTube", href: "https://youtube.com/" },
] as const;

export const FINAL_CTA = {
  headline: "Taste the Difference Tomorrow Morning.",
  button: "Get Your Free Sample",
} as const;
