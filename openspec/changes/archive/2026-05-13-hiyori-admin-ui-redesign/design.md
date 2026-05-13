## Context

The Hiyori design tokens (CSS custom properties: `--paper`, `--cream`, `--ink`, `--shu`, `--font-display`, etc.) are already defined globally in `src/index.css` from the prior consumer redesign. Google Fonts (Noto Serif TC, Noto Sans TC) are already loaded. We only need to apply these to admin pages/components.

The admin area uses:
- A sidebar layout (vs. consumer's top header)
- Heavy modal usage (edit product, upload images, order detail)
- Tables similar to the consumer admin-style tables

## Goals / Non-Goals

**Goals:**
- Visual parity between admin and consumer (same fonts, colors, spacing, button styles)
- Sidebar in a paper-white light theme (not dark) to match the warm cream main area
- Active sidebar item uses `--shu` left-border accent + ink text — minimal, no filled pill
- All primary action buttons (save, submit, edit) use `--shu` red
- Status badges use the same Hiyori palette mapping as consumer

**Non-Goals:**
- API or business-logic changes
- Sidebar collapse animation overhaul (keep existing logic)
- Adding new admin features
- Mobile responsive polish beyond what exists

## Decisions

**1. Light-theme sidebar over dark theme**
The consumer pages use warm cream + paper white. Keeping the admin sidebar dark navy would break visual continuity. Choosing paper-white sidebar with ink text and a `var(--bone)` right-border keeps the whole app in one palette. Active item gets a 2px left-border in `var(--shu)` for clear affordance without the filled-pill noise.

**2. Reuse existing modal markup, restyle in place**
Modals (Product edit, Image upload, Order detail) keep their existing JSX structure and props. We only swap Tailwind utility classes for inline styles using Hiyori tokens. This keeps the diff focused and avoids touching the modal logic.

**3. Status badge component shared via inline pattern**
Rather than extracting a shared `StatusBadge`, we replicate the same Hiyori status color mapping in both admin pages (HomePage, OrdersPage) and the OrderDetailModal. The mapping is small and duplicating it avoids creating a new component file for a 10-line lookup.

**4. Sidebar logo matches consumer header**
The same `日` mark (36×36 `--shu` square + `日` glyph) appears at the top of the admin sidebar, immediately reinforcing brand. When collapsed, only the mark shows.

**5. Auth pages use cream background, paper card**
Login/Register pages get a centered paper card with `1px solid var(--bone)` border (no shadow), serif `登入` / `註冊` title, and `--shu` submit button — same affordances as the cart checkout button.

## Risks / Trade-offs

- [Sidebar contrast drop] → Going from white-on-navy to ink-on-paper reduces visual hierarchy slightly. Mitigation: active item gets bold + `--shu` left-border for unambiguous state.
- [Modal density] → ProductEditModal has many fields. Bone-bordered inputs may look too quiet vs. the original blue focus rings. Mitigation: focus ring uses `--shu` 1px outline + 2px offset, per design system spec.
- [Collapsed sidebar logo] → 36px mark may feel tight in a 56px collapsed sidebar. Acceptable since the mark is square and centered.
