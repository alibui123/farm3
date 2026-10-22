# Al-Shukar — "Pouch Journey" scroll section (desktop + mobile)

Reference prototype: `A Day at Al-shukr.dc.html` → option **5a** (desktop) and **6a** (mobile).

## What to copy — and what NOT to copy
- **Copy:** layout structure, scroll-driven animation behaviour, shapes/morphs, timing, and the content below.
- **Do NOT copy colours or fonts from the prototype.** Use the website's existing theme: its default background, text colours, heading/body fonts, accent colour and spacing tokens. Map the prototype roles to theme tokens:
  - page background → theme background
  - headings / body / muted text → theme text colours
  - "primary" (progress line, seal band, crate, dots) → theme primary/brand colour
  - "accent" (check badge, Morning chip) → theme accent colour
  - "chill tint" on the tank → a cool tint derived from the theme (subtle)
- Build it as a normal component in the site's stack (no prototype runtime). Respect `prefers-reduced-motion` (show all four steps statically).

## Content
Heading: **What is Al-Shukar Dairy Farms?**

Intro: Al-Shukar Dairy Farms is a family-owned dairy farm in Lahore, founded in 2023 by the Alvi Family. We deliver fresh cow, buffalo and mixed milk from our own tagged herd to homes in Askari X, Askari XI, DHA and surrounding areas, in sealed pouches, every morning and evening.

| # | Label (desktop only) | Title | Description |
|---|---|---|---|
| 1 | At the farm | Machine milking | Our own cows and buffalo are machine milked, a clean, quick and consistent process. |
| 2 | Right after milking | Chilled immediately | The milk is cooled straight away to slow the growth of bacteria and keep it fresh until it reaches you. |
| 3 | Before it leaves | Checked and sealed | Our team runs regular in-house quality checks, then packs the milk in sealed pouches. Nothing is added. |
| 4 | Twice a day | Delivered to your door | Our riders deliver every morning and evening to homes in Askari X, Askari XI and DHA. |

(If the site already holds this copy, use the site's version.)

## Scroll mechanics (both views)
- Section = tall scroll track (desktop ≈ 4.7× viewport height, mobile ≈ 4.4×) containing a `position: sticky; top: 0; height: 100vh` stage.
- `progress p ∈ [0,1]` = how far the track has scrolled through the viewport. Drive everything from `p` (rAF-throttled scroll listener or IntersectionObserver + scroll; GSAP ScrollTrigger is fine if the site already uses it).
- `p` is split into 7 phases — **dwell / move / dwell / move / dwell / move / dwell** — weights `[.16, .12, .16, .12, .16, .12, .16]`.
  - Dwell phase *k*: object sits at station *k*; local progress `d ∈ [0,1]` drives that stage's micro-animation.
  - Move phase: object eases (smoothstep) to the next station with a small hop (`-sin(πm) × 22px` desktop / 18px mobile). The active step switches at the move's midpoint.
- Active step index `k` controls: which object form is shown, which station text is shown, which dots are filled.
- Form swaps: crossfade opacity + scale 0.85→1 (transform-origin bottom centre), ~350 ms CSS transition.
- Text swaps: opacity + translateY(8px→0), ~400 ms.

## The morphing object (≈160×168 box, bottom-aligned on the ground line)
1. **Milking — milk can.** Grey steel can with dark lid bar. Inner milk fill height animates `10% → 100%` over `d ∈ [0, .85]`. A thin white milk stream drops into the can while filling (only during first dwell), fades out when full.
2. **Chilling — cooling tank.** Horizontal rounded cylinder (144×96, fully rounded), 3 dashed "coil" lines inside, two small legs. Over `d ∈ [0, .8]` the fill shifts neutral → cool tint and an outer frost ring grows `0 → 12px` (box-shadow spread, translucent cool colour).
3. **Checked & sealed — pouch.** White pouch (76×108, rounded bottom) with small brand wordmark. A press bar descends onto the pouch top (`d 0→.3`), holds (`.3→.5`), lifts (`.5→1`). Seal band (primary colour) appears at `d > .28`. A round accent check badge (✓) pops in with an overshoot ease at `d > .6`.
4. **Delivered — crate.** Primary-colour crate with wordmark and a pouch peeking out of the top. Three short speed lines behind it while moving. "MORNING" (accent) and "EVENING" (dark) chips fade in at `d > .35`. During the final dwell the crate rolls right (desktop +90px, mobile +55px) toward a simple door outline (door is faint at 25% opacity before step 4, full opacity on step 4).

No highlight box/zone behind the active station.

## Desktop layout (5a) — designed at 1200×720 stage
- Top: two-column header — heading (left, ~380px col) + intro paragraph (right).
- Horizontal ground/progress rail across the middle (stations at 4 evenly spaced x positions; prototype: 175/425/675/925 of 1200). Rail fill = object's x progress.
- Each station: dot on the rail (filled once reached); below it **label (small caps/mono) + title** (inactive stations at 40% opacity); description appears below the active station only.
- Object rides above the rail between stations; door sits to the right of the last station.

## Mobile layout (6a) — designed at 390×780 stage
- Top: heading + intro paragraph (full width).
- Object stays **centred** (no horizontal travel except the final crate roll toward the door at right) and morphs in place, with the hop between stages.
- Thin ground line under the object.
- Below: 4-dot progress rail (fill follows progress, dots fill as reached).
- Below the rail: centred **title + description** of the active step only. **No "01 · At the farm" number/label line on mobile.**

## Acceptance
- Scrolling down plays stages 1→4 in order; scrolling up reverses smoothly.
- Each stage visibly demonstrates its process (fill, chill, press+seal+check, deliver).
- Colours and type come entirely from the site theme.
- Reduced-motion: static stacked list of the 4 steps with their final-state illustrations.
