# Udvitha Technologies Landing Page

Premium landing page for Udvitha Technologies, an IT training and placements institute in Hyderabad. The site is built with TanStack Start, React, Tailwind CSS v4, GSAP, Framer Motion, and Lucide icons.

## Quick Start

```bash
npm install
npm run dev
```

The dev server usually starts on `http://127.0.0.1:8080/`. If that port is busy, Vite will pick the next available port and print it in the terminal.

## Scripts

```bash
npm run dev        # Start local development server
npm run build      # Production build
npm run preview    # Preview the production build
npm run lint       # Run ESLint
npm run format     # Format project files with Prettier
```

## Project Structure

```text
src/
  assets/
    hero.jpg          # Hero background image
    logo.svg          # Current brand logo used in the site
    logo.jpg          # Source/reference brand image
    udvitha-logo.svg  # Alternate logo asset
  routes/
    __root.tsx        # TanStack root shell, providers, error and 404 UI
    index.tsx         # Main landing page content, data, sections, and animations
  lib/
    animations.ts     # Shared GSAP helpers and reusable animation variants
    error-*.ts        # SSR/client error capture helpers
  styles.css          # Tailwind theme tokens, global styles, and custom components
  router.tsx          # Router setup
  server.ts           # SSR wrapper
  start.ts            # TanStack Start middleware setup
```

## Main Page Anatomy

The landing page lives in `src/routes/index.tsx`. Most content is data-driven near the top of the file:

- `navItems`: Header links.
- `companies`: Partner/company marquee.
- `kineticSkills`: Moving skill ribbon items.
- `stats`: Hero metric cards.
- `courses`: Program cards.
- `method`: Four-step career method.
- `outcomes`: Placement case studies.
- `audiences`: Freshers, Professionals, and Colleges tab content.
- `testimonials`: Review carousel cards.

The rendered sections are:

1. Fixed navigation
2. Dark hero section
3. Hiring partner marquee
4. Hero-to-programs shutter reveal
5. Program grid and skill ribbon
6. Method section
7. Placement outcomes
8. Audience selector
9. Scroll-driven review carousel
10. CTA strip
11. Independent contact form section
12. Footer handoff and footer
13. Floating WhatsApp button

## Animation Notes

Animations are initialized in `Landing()` and split into named helpers for readability:

- `setupHeroAnimations`: Hero entrance animation and image parallax.
- `setupSectionReveals`: Standard reveal animation for elements marked with `data-reveal`.
- `setupProgramShutter`: Black-to-light transition between hero and programs.
- `setupReviewCarousel`: Desktop-only pinned horizontal review carousel.

Respecting reduced motion:

- If `useReducedMotion()` returns true, the GSAP setup is skipped.
- CSS also includes a `prefers-reduced-motion` block to stop long-running animations.

Review carousel behavior:

- Desktop only: `DESKTOP_REVIEW_QUERY = "(min-width: 768px)"`.
- The section pins while scrolling.
- The card track moves horizontally.
- The active card scales to `1`, inactive cards scale to `0.86`.
- Mobile falls back to a normal stacked layout.

## Styling System

The design tokens are in `src/styles.css`.

Important conventions:

- Global dark theme variables live in `:root`.
- Light page sections use `.surface-light`, which overrides the same variables locally.
- Reusable layout classes:
  - `.section-pad`
  - `.shutter-reveal`
  - `.review-journey`
  - `.contact-row`
  - `.form-field`
  - `.secondary-action`
- Cards use `border-radius: var(--radius)`, currently `0.5rem`.
- Dominant palette: black, warm ivory, and gold, with a small cyan accent available.

## Content Editing

To update programs:

1. Open `src/routes/index.tsx`.
2. Edit the `courses` array.
3. Each item supports:
   - `icon`
   - `name`
   - `desc`
   - `skills`
   - optional `tag`

To update reviews:

1. Edit the `testimonials` array.
2. Keep quotes reasonably short so carousel cards stay balanced.

To update contact details:

Search for:

- `9100052143`
- `88857 21731`
- `info@udvitechnologies.com`
- `udvithatechnologies`

## Development Notes

- `vite.config.ts` sets `cacheDir: ".vite-cache"` to avoid Windows file-lock issues with `node_modules/.vite`.
- `.vite-cache` is ignored in `.gitignore`.
- The project uses the Lovable TanStack config wrapper. Do not manually add duplicate Vite plugins already provided by `@lovable.dev/vite-tanstack-config`.
- The form currently resets and shows a local success state only. It does not submit to a backend.
- Brochure link is currently `href="#"`; replace it with a real file or route when available.

## Verification Checklist

Run this after making changes:

```bash
npm run build
```

Recommended visual checks:

- Hero text does not overlap the fixed nav.
- Partner marquee does not overlap "Students placed with".
- Shutter reveal flows cleanly into Programs.
- Review carousel cards remain readable on desktop.
- Reviews stack normally on mobile.
- Contact starts independently after the CTA/separator.
- WhatsApp button does not cover important form controls.

## Known Warnings

During build, Vite may warn that `vite-tsconfig-paths` is detected and that Vite now supports tsconfig paths natively. This warning comes from the current dependency/config stack and does not block builds.
