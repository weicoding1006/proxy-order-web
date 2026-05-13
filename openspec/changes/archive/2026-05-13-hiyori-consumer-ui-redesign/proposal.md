## Why

The consumer-facing frontend currently uses a generic blue Tailwind UI that does not reflect the brand identity. The design system exported from Claude Design defines "日和代購" (Hiyori Daigou) — a Japanese-minimal aesthetic with warm cream backgrounds, vermillion accents, and serif typography — and it must now be applied to the live React pages.

## What Changes

- Replace `ConsumerLayout` header with the Hiyori branded header (sticky, frosted glass, logo mark, cart badge icon)
- Restyle `ConsumerProductListPage` to use the design system's 4-column product card grid with warm paper-white cards, serif product names, and left-side category filter rail
- Restyle `ConsumerProductDetailPage` with 2-column layout, image gallery, serif pricing, and Hiyori-styled add-to-cart button
- Restyle `ConsumerCartPage` with clean line-item rows, serif totals, and primary checkout button in `--shu` red
- Restyle `ConsumerOrderListPage` with minimal table, status badges in brand palette, and order-detail modal overlay
- Add global Hiyori design tokens (CSS custom properties) and Google Fonts imports to `index.css`
- All existing API integrations and Redux state remain untouched

## Capabilities

### New Capabilities

- `hiyori-design-tokens`: Global CSS tokens (colors, typography, spacing, radii, motion) aligned to the 日和代購 design system
- `consumer-header`: Branded sticky header with frosted glass effect, logo, and cart badge
- `consumer-product-list`: Product grid page with category filter sidebar, card design matching Hiyori specs
- `consumer-product-detail`: Product detail page with image gallery, serif price, quantity selector, add-to-cart
- `consumer-cart`: Cart page with line-item table, quantity controls, clear and checkout actions
- `consumer-order-list`: Order history page with status badges and order detail modal

### Modified Capabilities

## Impact

- `src/index.css` — add Google Fonts imports and CSS custom properties
- `src/layouts/ConsumerLayout.tsx` — full restyle
- `src/pages/ConsumerProductListPage.tsx` — full restyle
- `src/pages/ConsumerProductDetailPage.tsx` — full restyle
- `src/pages/ConsumerCartPage.tsx` — full restyle
- `src/pages/ConsumerOrderListPage.tsx` — full restyle
- No API, routing, Redux, or admin changes
