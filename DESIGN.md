# Design System — Al-Shukar Dairy Farms

<!-- impeccable:design-schema 1 -->

This file describes the finished homepage (`/`) and the rules every other page
follows. When a new page needs something this file does not cover, add the
pattern here at the same time as the code.

Copy and business facts come from
`seo content/Al-Shukar Dairy Farms SEO, AEO & GEO Website Content.md`. All of it
lives in `src/lib/constants.ts`; components never hard-code copy.

---

## 1. World

**Golden hour on the farm.** Warm cream fields, pasture-green bands, sunrise
amber for anything you should press. Milk-wave dividers between sections,
soft organic blobs, light frosted glass. The feeling is a calm family farm at
first light: warm, honest, a little cinematic. It is never clinical dairy
packaging, never a generic SaaS card grid.

Three ideas carry the whole site:

1. **Trace it to one farm.** Every page brings the reader closer to the herd,
   the family and the process. Illustrations are of real farm things (can, tank,
   pouch, crate, ear tag, door), drawn in CSS from the palette.
2. **Answer first.** Each section opens with a question-style heading and a
   plain 40–60 word answer that makes sense quoted alone (AEO). Detail follows.
3. **One signature moment per page.** The homepage has two scroll-driven stages
   (the pouch journey and the phone). Inner pages get **one** crafted moment
   each, and everything else stays quiet and readable.

---

## 2. Colour

Tokens live in `src/app/globals.css` (`:root` + `@theme inline`), so they are
usable as Tailwind classes (`bg-pasture`, `text-soil-muted`, …).

| Token | Hex | Role |
|---|---|---|
| `cream` | `#FBF7EE` | Page base, default section background |
| `milk` | `#FFFFFF` | Alternate section background, cards, text on dark |
| `pasture` | `#2F5D3A` | Brand primary: emphasis bands, solid buttons, rails, stat tiles |
| `pasture-deep` | `#23462C` | Footer, hover for pasture buttons |
| `sage` | `#A9C4A0` | Secondary text on pasture, soft blobs |
| `amber` | `#F2A93B` | Primary CTA, check badges, highlights on dark |
| `amber-deep` | `#D89020` | Primary CTA hover |
| `soil` | `#2B2118` | Headings and body text, image gradients |
| `soil-muted` | `#5C4D3C` | Paragraphs, captions, labels |
| `--steel*`, `--chill`, `--frost` | derived | Illustration tints only (cans, tanks) |

**Rules**

- Amber is for action and "done" states. Never use it for large backgrounds or
  body text on cream (contrast fails).
- Tints use opacity on brand colours: `bg-pasture/10` chips, `border-pasture/10`
  hairlines, `bg-milk/70` cards. Do not invent new greys.
- WhatsApp green `#25D366` appears only on the floating button and the footer
  "WhatsApp us" pill.
- Selection colour, focus ring (`.focus-ring`, 2px amber, 3px offset) and the
  film grain (`body.grain`) are global. Do not restyle them per page.

### Section rhythm

Backgrounds alternate so the eye can feel each section start:

```
[dark media hero] → cream → milk → cream → pasture band → milk → pasture CTA → pasture-deep footer
```

- Join a cream and a milk section with `<MilkWaveDivider from={prev} to={this} />`
  as the first child of the later section.
- Use a **pasture band** at most once or twice per page, for the section that
  carries the most proof (stats, the trust marquee, a process).
- Every page ends `FinalCta` (pasture) → `Footer` (pasture-deep).

---

## 3. Typography

Fonts are loaded in `src/app/layout.tsx` with `next/font`.

- **Display: Fraunces** (`font-display`) for headings, the wordmark, card
  titles, numbers, pull quotes, and Roman Urdu in italic.
- **Body: DM Sans** (`font-sans`, the default) for paragraphs, UI, nav, forms.

| Role | Classes |
|---|---|
| H1 (hero) | `font-display text-[clamp(2.4rem,7vw,4.75rem)] leading-[1.05] font-semibold tracking-[-0.03em] text-balance` |
| H2 (section) | `font-display text-3xl font-semibold text-balance text-soil md:text-5xl` (`md:text-4xl` in two-column layouts) |
| H3 (card / step) | `font-display text-xl` or `text-2xl text-soil` |
| Answer paragraph | `mt-4 max-w-2xl text-soil-muted` (`md:text-lg` beside a heading) |
| Eyebrow / label | `text-[11px] font-medium tracking-[0.2em] uppercase text-soil-muted` |
| Footer column label | `text-sm tracking-[0.18em] uppercase text-sage` |
| Roman Urdu | `font-display italic` (tagline) or `text-sm italic text-soil-muted` (product names) |

- One H1 per page, containing the page's primary keyword.
- Section H2s are questions where the SEO doc gives a question.
- All H2s use `<SplitHeading>` (word-by-word rise on scroll).

---

## 4. Layout and spacing

- Content container: `mx-auto max-w-6xl px-5 md:px-8`. Narrow text-only CTAs use
  `max-w-4xl`.
- Section padding: `py-20 md:py-28` (lighter sections `py-16 md:py-24`).
- Heading → answer `mt-4`; answer → content `mt-10` / `mt-12`.
- Two-column "heading left, answer right" header:
  `grid gap-3 lg:grid-cols-[380px_1fr] lg:items-end lg:gap-12`.
- Bento cards: `grid gap-4 md:grid-cols-6`, large cards `md:col-span-3`, small
  `md:col-span-2`.
- Radii: cards and tables `rounded-3xl`; chips and buttons `rounded-full`;
  small controls `rounded-xl`.
- Fixed elements to keep clear of: the floating navbar (~80px tall from the
  top, so heroes start content at `pt-28`) and the WhatsApp float (bottom right).
- Design must work at 360px wide with no horizontal scroll.

---

## 5. Components

Shared UI lives in `src/components/ui`, page sections in
`src/components/sections`, and global behaviour in `src/components/providers`.

### Buttons and links

| Kind | Use | Recipe |
|---|---|---|
| Primary CTA | "Get your free sample". One per view | `<a>` + `rounded-full font-medium bg-amber text-soil hover:bg-amber-deep shadow-[0_10px_30px_rgba(242,169,59,0.4)]` |
| Secondary on imagery | WhatsApp beside the primary on photos and video | `<a>` + `rounded-full glass-dark text-milk` |
| Secondary on pasture | WhatsApp in `FinalCta` | `<a>` + `rounded-full border border-milk/40 text-milk hover:bg-milk/10` |
| Solid pasture | In-section actions (try free, check area, visit) | `rounded-full bg-pasture px-6 py-3 text-sm font-medium text-milk hover:bg-pasture-deep` |
| Text link | Inline actions | `font-medium text-pasture underline underline-offset-4` |

Buttons are plain links/buttons with CSS hover states. No magnetic or
mouse-tracking effects (see Motion).

### Surfaces

- **`GlassCard`**: translucent `rounded-3xl` card with a CSS hover lift.
- **Stat tile**: `rounded-3xl bg-pasture px-5 py-6 text-center text-milk`,
  number in Fraunces with `AnimatedCounter`, label `text-sage`. Real numbers only.
- **Chip**: `rounded-full bg-pasture/10 px-4 py-2 text-sm text-pasture`; on
  imagery `glass-dark text-milk/95`.
- **Table**: `rounded-3xl border border-pasture/10 bg-cream/60`, pasture header
  row, Al-Shukar column tinted `bg-pasture/[0.07] text-pasture`, wrapped in
  `overflow-x-auto`.
- **Q&A list**: `<dl>` with `divide-y divide-pasture/10`, question in Fraunces
  `text-lg`.

### Decoration

- **`MilkWaveDivider`**: section joins (see Section rhythm).
- **`OrganicBlob`**: one or two per section at most, `opacity-25`/`30`, sage or
  amber, partly off-canvas, `pointer-events-none`.
- **CSS illustrations**: farm objects built from divs and SVG in palette colours,
  always `aria-hidden`, with the meaning also stated in text.

### Global chrome (every page)

- `Navbar`: floating glass pill. Links are absolute (`/our-farm`, `/#products`)
  so they work from any page; the current page gets `aria-current="page"`.
- `WhatsAppFloat`: pulsing green button, bottom right.
- `Footer`: pasture-deep, three columns, scroll-scrubbed "AL-SHUKAR" wordmark.
- `PageIntro` (milk-drop loader) runs **on the homepage only**. Inner pages
  pass a short `delay` to `Navbar` and `WhatsAppFloat` so they don't wait for
  an intro that never plays.

---

## 6. Motion

Performance first: the site must hold 60 fps while scrolling on a mid-range
phone. Measured with 4× CPU throttling, every page holds 16.7 ms frames.

Stack: **native scrolling** (no smooth-scroll library: it adds input lag),
Framer Motion for one-shot reveals, GSAP ScrollTrigger for the footer
wordmark, and `useScrollProgress` for sticky scroll stages.

**Not allowed** (removed for performance): magnetic buttons, custom cursors,
3D tilt, anything that runs JavaScript on every mouse move, `backdrop-filter`
on anything but the navbar, `mix-blend-mode` on page-wide layers, and
never-ending JS animations (`repeat: Infinity`).

- **Easing:** `[0.22, 1, 0.36, 1]` for reveals; `cubic-bezier(0.34,1.8,0.64,1)`
  for "pop" badges.
- **Durations:** 0.35–0.4s for state swaps, 0.7–0.85s for reveals.
- **Reveals:** headings rise word by word (`SplitHeading`); everything else
  fades and rises 12–16px. Reveal once (`once: true`), never on every scroll.
- **Hover:** CSS only (`transition-transform`, `hover:-translate-y-1`,
  colour changes). Buttons are plain `<a>`/`<button>` elements.
- **Ambient loops** (floating chips, droplets, pulse ring, swinging tag, milk
  wave) are CSS keyframes in `globals.css` (`animate-float`, `animate-droplet`,
  `animate-ping-ring`, `animate-swing`, `animate-drift`, `animate-nudge`),
  transform/opacity only, so they run on the compositor. SVG loops (`<animateMotion>`)
  get a finite `repeatCount` with `fill="freeze"`.
- **Sticky scroll stages:** a tall track (`h-[360–470vh]`) with a
  `sticky top-0 h-[100svh]` stage, driven by `useScrollProgress` (rounded to
  1/1000 so tiny changes skip a render). Render only the variant for the
  current viewport with `useIsDesktop()`, never both with one hidden. One per
  inner page at most.
- **Glass:** `.glass` / `.glass-dark` are solid translucent fills, not blur.

**Reduced motion is required, not optional.** Use `usePrefersReducedMotion()`;
every animated section ships a static version that shows its finished state
(see `StaticJourney` in `OurStory.tsx`). The global CSS rule stops CSS
animations; Framer and scroll-driven motion must be switched off in code.

---

## 7. Imagery

- Real farm photos from the shoot list in the SEO doc replace the placeholder
  Unsplash images as they arrive. URLs live in constants (`HERO_MEDIA`,
  `OUR_FARM_MEDIA`, …) so swapping one is a one-line change.
- Photos on dark heroes sit under two gradients:
  `bg-gradient-to-t from-soil/80 via-soil/35 to-transparent` and
  `bg-gradient-to-r from-soil/40 via-transparent to-transparent`.
- Use `next/image` with `width`/`height` or `fill` + `sizes`. Hero images:
  `loading="eager" fetchPriority="high"` (Next 16 deprecates `priority`). Lazy-load
  everything else.
- Alt text comes from the shoot list. Decorative media is `aria-hidden`.

---

## 8. Content rules

These come from the SEO doc and `constants.ts`, and they override design wishes.

- **Spelling:** "Al-Shukar Dairy Farms"; short mark "Al-Shukar".
- **Never publish unconfirmed facts.** Prices, herd counts, quotes, practices
  marked "to confirm" stay out of production.
- **Pending content:** a fact waiting for the client lives in constants with
  `null` or `confirmed: false`. `<Pending>` (block) and `<PendingBadge>` (pill) show "To confirm"
  **in development only** (`SHOW_PENDING`), so the client can review the full
  layout locally. Production renders nothing, and every layout must still look
  complete with the pending items removed.
- **Banned until verified:** organic, A2, health cures, "best in Lahore",
  "100% safe", PFA approved, lab tested (say "in-house quality checks").
- Never name a competitor or a gawala; compare categories only.
- Wherever storage is mentioned, include the shelf-life note: fresh milk keeps
  for a shorter time than packaged milk and must be boiled and refrigerated.
- Show "Prices last updated: [date]" beside any price.
- Every page ends with the same two CTAs: free sample and WhatsApp.
- All copy is server-rendered; no important text in images, sliders or
  lazy-loaded tabs.

---

## 9. Inner page template

```
<main>
  <script type="application/ld+json">  BreadcrumbList (+ page schema)
  <Navbar delay={0.2} />
  <PageHero>          dark media, breadcrumb chip, H1, subheading, CTAs, chips, wave into cream
  …answer sections…   alternating cream / milk, one pasture band, one signature moment
  <FinalCta headline=… text=… />
  <Footer />
  <WhatsAppFloat delay={0.8} />
</main>
```

- `src/app/<route>/page.tsx` is a server component exporting `metadata`
  (`title: { absolute }` from the SEO doc, `description`, `alternates.canonical`,
  `openGraph`) and composing sections.
- Page-specific sections live in `src/components/sections/<page>/`.
- Breadcrumb JSON-LD on every inner page: `<JsonLd data={[…, breadcrumbJsonLd(name, path)]} />`
  from `src/lib/schema.tsx`.
- Schema only for facts on the page: e.g. a `Product` + `Offer` only for milks
  with a confirmed price.
- When an answer quotes a value that lives elsewhere (prices, dates), build the
  sentence from constants (see `priceAnswer()` in `PriceTable.tsx`) so the copy,
  table and schema can never disagree.
- `noindex` for Track Sample and thank-you pages only.
- **Utility pages** (Track Sample): no `PageHero` or `FinalCta`. A cream section
  with `pt-32`, a plain H1, one focused card, and a support line with both CTAs.
  No schema. They render "unavailable" rather than invent data while their
  backend is missing, with a dev-only preview of every state.

### Page roadmap

| Page | Route | Signature moment (proposal) |
|---|---|---|
| Our Farm ✅ | `/our-farm` | Swinging ear tag that "traces" a litre back to its animal; golden-hour visit card |
| Products & Prices ✅ | `/products-prices` | Pouches that fill to each milk's creaminess, plus a light → creamy scale in the chooser |
| Quality ✅ | `/quality` | Thermometer that drops as the milk is chilled (no temperatures until confirmed); empty "first lab report" frame |
| Delivery Areas ✅ | `/delivery-areas` | Illustrative (not to scale) route map with a Morning / Evening round toggle; area pages not built yet |
| Free Sample ✅ | `/free-sample` | Sample-rules "ticket" + shared `SampleRequestForm` (also on home) whose success state drops the 1 L pouch in |
| FAQ ✅ | `/faq` | None: cream header + search, sticky topic nav, native `<details>` answers (server-rendered) |
| Blog ✅ (index) | `/blog` | None: featured card + grid with CSS category covers; drafts dev-only, noindex until a post is published. Articles (`/blog/[slug]`) not built |
| Bulk Supply ✅ | `/bulk-milk-supply` | Crates stack on a pallet as the litres-per-day field grows (illustration only, no capacity claim) |
| Contact ✅ | `/contact` | WhatsApp composer: pick a topic and its pre-filled message types into a chat bubble; channel cards; details table |
