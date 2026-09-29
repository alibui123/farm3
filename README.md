# Al-shukr Dairy Farm — Homepage

Premium animated single-page homepage for **Al-shukr Dairy Farm** (Pakistan): farm-fresh milk for households and distributors.

## Stack

- Next.js (App Router) + TypeScript + Tailwind CSS v4
- Framer Motion, GSAP + ScrollTrigger, Lenis
- lucide-react icons
- Fraunces (display) + DM Sans (body) via `next/font`

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Swap content (one file)

Edit **`src/lib/constants.ts`**:

| What | Where |
|------|--------|
| Hero video + poster | `HERO_MEDIA.videoUrl`, `HERO_MEDIA.posterUrl` |
| WhatsApp number | `WHATSAPP.number` (digits only, with country code) |
| Pre-filled WhatsApp text | `WHATSAPP.prefilledMessage` |
| Phone / email / address | `CONTACT` |
| Headlines & CTAs | `HERO`, `FINAL_CTA` |
| Day-on-farm steps & images | `STORY_STEPS` |
| Products | `PRODUCTS` |
| Stats (placeholder figures) | `STATS` |
| Testimonials | `TESTIMONIALS` |
| Nav links | `NAV_LINKS` |

Sample form submit handler is intentionally a **TODO** in `SampleForm` — ready for a future Supabase insert.

## Project structure

```
src/
  app/                 # layout, page, globals.css
  components/
    providers/         # Lenis, custom cursor, page intro
    sections/          # homepage sections
    ui/                # shared UI primitives
  lib/constants.ts     # all copy, media, links
```

## Notes

- Stats and testimonials are **illustrative placeholders** until you replace them with verified figures and real quotes.
- Respects `prefers-reduced-motion` (Lenis/GSAP scrubbing and intro shorten or skip).
- Custom cursor is desktop / fine-pointer only.
