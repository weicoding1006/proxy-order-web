## Context

The project is a React 19 + TypeScript + Tailwind CSS 4 + Vite app. Consumer pages currently use generic Tailwind utility classes with a blue color scheme. The Hiyori design system specifies a warm Japanese-minimal aesthetic exported as CSS custom properties and Google Fonts. All API calls, Redux state, and routing already work correctly — this is a pure visual restyle.

The design system tokens are:
- Surfaces: `--paper: #FBFAF7`, `--cream: #F6F3EC`, `--sand: #EFE9DA`, `--bone: #E5E0D4`
- Ink: `--ink: #1B1A17`, `--ink-2: #5C584F`, `--ink-3: #9B968A`
- Accent: `--shu: #B84A39` (brand red), `--shu-dark: #9A3D2F`
- Fonts: `Noto Serif TC` (display/prices), `Noto Sans TC` (body)
- Radii: 2px (inputs/buttons), 4px (cards)
- Spacing: 4px grid

## Goals / Non-Goals

**Goals:**
- Apply Hiyori design tokens globally via CSS custom properties in `index.css`
- Restyle all 5 consumer-facing files (Layout + 4 pages) to match the design export
- Preserve all existing logic, hooks, Redux selectors, and API calls exactly
- Product grid: 4 columns desktop, 2 columns mobile; 4:5 aspect ratio image, serif name+price
- Header: sticky frosted-glass, `日` logo mark in `--shu` red, cart badge with count

**Non-Goals:**
- Admin pages (no changes)
- Backend / API changes
- Adding new features (search, wishlist, etc.)
- Full mobile responsive polish beyond basic 2-col grid

## Decisions

**1. CSS custom properties in `index.css` rather than Tailwind config**
Tailwind 4 uses `@theme` for tokens, but the design system ships as native CSS vars. Injecting them directly in `index.css` is simpler, avoids config churn, and lets Tailwind arbitrary-value syntax `bg-[var(--cream)]` still work alongside class utilities.

**2. Inline styles for structural one-off rules, Tailwind classes for utilities**
Layouts with exact pixel values (72px header height, 220px sidebar, 4:5 aspect ratio) use inline styles to match the design spec precisely. Common patterns (flex, gap, text size) use Tailwind. This hybrid avoids both a new CSS file and abusing Tailwind for every pixel.

**3. No new component files — restyle in-place**
All edits happen inside the five existing files. This keeps the diff minimal and avoids introducing new abstractions (a `HiyoriButton` component, etc.) that the user didn't request.

**4. Google Fonts via `@import` in `index.css`**
The design system loads Noto Serif TC, Shippori Mincho B1, Noto Sans TC, and Noto Sans JP from Google Fonts CDN. Adding the `@import` to `index.css` is the standard Vite approach.

## Risks / Trade-offs

- [Google Fonts CDN latency] → Fonts load async; text renders in fallback serif/sans until loaded. Acceptable for a dev/staging context.
- [Tailwind purge] → Tailwind 4 scans source files for class names. CSS vars used in `style={}` props are not purged. No risk.
- [Inline styles override specificity] → Some Tailwind utilities may be overridden by inline styles. Since we're intentionally moving away from the blue Tailwind palette, this is acceptable.
