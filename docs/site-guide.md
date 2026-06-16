# Udvitha Landing Page Site Guide

This guide explains the current codebase in plain engineering terms so you can make changes without guessing.

## Mental Model

This is a single-page landing site. Almost everything visible on the page is rendered by `src/routes/index.tsx`.

The page is not split into many route files because there is only one public URL: `/`. Instead, the route file keeps the content arrays near the top and renders each page section below.

This repo uses npm as its package manager. `package-lock.json` is the only dependency lockfile that should be kept.

The styling system has two layers:

- Tailwind utility classes in JSX for local layout and spacing.
- Named CSS classes in `src/styles.css` for larger custom sections such as the shutter reveal, method cards, review reel support, forms, and footer.

## Routing

TanStack Router uses file-based routing.

- `src/routes/__root.tsx` is the app shell. It sets metadata, loads CSS, provides React Query, and renders route children with `<Outlet />`.
- `src/routes/index.tsx` is the home page at `/`.
- `src/routeTree.gen.ts` is generated. Do not edit it by hand.

## Main Landing Route

Open `src/routes/index.tsx` when changing content.

The important content arrays are:

- `navItems`: order of header links.
- `stats`: hero statistics.
- `courses`: course list used by the contact form select.
- `programOrbit`: course tracks shown in the interactive orbital UI.
- `method`: four process cards.
- `learnerRoutes`: Freshers, Professionals, Colleges cards inside Method.
- `outcomes`: placement result cards.
- `testimonials`: review reel quote, author role, and portrait image.

Rule of thumb: if you are changing words, phone numbers, courses, or testimonials, edit data arrays first. Only edit JSX when the layout itself needs to change.

## Custom Components

### Program Orbit

File: `src/components/ui/radial-orbital-timeline.tsx`

This renders the interactive Programs orbit. It receives `timelineData` and displays:

- circular orbit nodes
- a selected program in gold
- default nodes in blue
- a details panel with status, title, category, description, and demand meter

The component is generic enough to reuse, but in this site it is used for programs only.

### Review Reel

File: `src/components/ui/scroll-reel-testimonials.tsx`

This renders the animated Stories section:

- portrait tiles slide vertically
- quote text animates character-by-character
- previous/next controls switch testimonials
- keyboard left/right arrows work when the component is focused

The supporting CSS lives in `src/styles.css`:

- `@keyframes scroll-reel-char-rise`
- `@keyframes scroll-reel-exit`
- `.scroll-reel-char`
- `.scroll-reel-exit`

### Taped Footer

File: `src/components/ui/footer-taped-design.tsx`

This renders the paper-card footer with tape accents. It is adapted from the prompt but uses this project's React/Vite setup rather than Next.js `Link`.

The visual styling lives in `src/styles.css` under:

- `.footer-handoff`
- `.footer-taped`
- `.footer-taped-card`
- `.footer-taped-*`

## Styling System

File: `src/styles.css`

The top of the file defines the design tokens:

- dark default page colors in `:root`
- `.surface-light` overrides for light sections
- fonts, radius, shadows, border colors

Important reusable classes:

- `.section-pad`: standard vertical section padding
- `.eyebrow`: small uppercase section label
- `.shutter-reveal`: scroll shutter before Programs
- `.method-*`: Method section cards
- `.placement-*`: Placement section layout
- `.review-proof-*`: Stories section header layout
- `.form-field`, `.form-label`, `.contact-row`, `.secondary-action`: contact section
- `.footer-*`: footer

Keep cards at the existing `var(--radius)` radius. The site intentionally uses compact rounded corners instead of very pill-shaped cards.

## Animation

File: `src/lib/animations.ts`

The file now only exports what the app uses:

- `initGsap()`: registers `ScrollTrigger`
- `arrivalHighlight()`: small highlight animation when navigating to an anchor

In `src/routes/index.tsx`, page-specific animation helpers handle:

- hero entrance
- hero image parallax
- reveal-on-scroll for `[data-reveal]`
- program shutter reveal

Reduced motion is respected by skipping GSAP setup when `useReducedMotion()` is true. CSS also has a `prefers-reduced-motion` block.

## Form Behavior

The contact form currently stays client-side.

Current behavior:

- prevents default submit
- sets `formStatus` to `"sent"`
- resets fields
- returns to idle after 4 seconds

It does not send data anywhere yet. For production lead capture, add a real endpoint, server-side validation, spam protection, and rate limiting.

## Safe Change Examples

### Add or Rename a Program

1. Edit `courses` if the course should appear in the form select.
2. Edit `programOrbit` if it should appear in the orbit.
3. Keep `id` values unique.
4. Use an icon already imported from `lucide-react`, or import a new one.

### Change Testimonials

Edit `testimonials` in `src/routes/index.tsx`.

Each item needs:

- `name`
- `role`
- `quote`
- `image`
- `alt`

Keep quotes fairly short so the reel stays balanced on mobile.

### Change Contact Details

Search these values:

- `9100052143`
- `88857 21731`
- `info@udvitechnologies.com`
- `udvithatechnologies`

Update all visible links and footer/contact references together.

## Cleanup Performed

Removed dead/template code:

- unused `SectionHeader` helper from `src/routes/index.tsx`
- unused animation variant exports from `src/lib/animations.ts`
- unused TanStack example server function
- unused server config helper that only supported that example
- Bun lock/config files from the old mixed-package-manager setup
- tracked TypeScript build cache
- tracked template project marker

Updated stale metadata:

- root app title/description now mention Udvitha instead of generic template text

Updated documentation:

- README now matches the current page sections and custom components

## Verification Checklist

Run:

```bash
npm run lint
npm run build
```

Then visually check:

- header links scroll to the correct sections
- Programs orbit works and selected item turns gold
- Method cards and learner-route cards are readable
- Placement cards are balanced
- Review reel controls work
- Contact form success state appears
- Footer tape card looks intentional on desktop and mobile
