# Design System — Al-shukr Dairy Farm

<!-- impeccable:design-schema 1 -->

## World

**Golden hour on the farm.** Warm cream fields, pasture green glass, sunrise amber CTAs. Organic milk-wave dividers and soft blobs. Premium, trustworthy, cinematic — not clinical dairy packaging.

## Palette

| Token | Hex | Role |
|-------|-----|------|
| cream | `#FBF7EE` | Page base |
| milk | `#FFFFFF` | Cards / contrast |
| pasture | `#2F5D3A` | Primary brand |
| sage | `#A9C4A0` | Soft secondary |
| amber | `#F2A93B` | CTA / accent |
| soil | `#2B2118` | Body text |

## Typography

- **Display:** Fraunces — headlines, wordmark, product titles
- **Body:** DM Sans — UI, paragraphs, nav

## Motion

- Lenis smooth scroll synced to GSAP ticker
- Framer Motion: page intro milk-fill, split headlines, magnetic CTAs, tilt cards, counters, marquee, testimonials drag
- GSAP ScrollTrigger: pinned “day at Al-shukr” scrub, how-it-works path draw, footer wordmark reveal
- Custom cursor (fine pointer only); `prefers-reduced-motion` respected

## Components

- Floating liquid-glass navbar pill
- Glass cards with optional 3D tilt
- Organic SVG wave dividers between sections
- Persistent WhatsApp float

## Content authority

All copy, stats, media URLs and WhatsApp live in `src/lib/constants.ts`. Stats/testimonials marked illustrative until replaced.
