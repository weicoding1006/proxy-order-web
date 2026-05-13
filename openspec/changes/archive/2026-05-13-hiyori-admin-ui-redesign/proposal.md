## Why

The consumer (前台) pages were just redesigned with the 日和代購 Hiyori design system, but admin (後台) pages still use a generic Tailwind blue+gray theme. This visual inconsistency feels like two different products. The Hiyori tokens (CSS custom properties) already exist globally — we just need to apply them to admin layouts, pages, and shared modals.

## What Changes

- Restyle `AdminLayout` background from gray-100 to `var(--cream)`
- Restyle `Sidebar`: replace dark navy + blue active with paper-white background, ink text, and `var(--shu)` active indicator (1px border, not filled pill)
- Restyle `HomePage` (admin products): page header + table to match Hiyori (serif H1, sand header, bone dividers, status badges in brand palette, restyled edit button)
- Restyle `OrdersPage` (admin orders): match consumer order list style with status badge color mapping
- Restyle `LoginPage` & `RegisterPage`: cream background, paper card with bone border (no shadow), serif title, `--shu` submit button
- Restyle `ProductEditModal`, `ProductImageUploadModal`, `OrderDetailModal`: paper card, ink text, bone borders, `--shu` primary actions
- Restyle `NotFoundPage` to match
- All API calls, hooks, routing, and Redux state remain untouched

## Capabilities

### New Capabilities

- `admin-sidebar`: Paper-white sidebar with Hiyori branding, ink text, `--shu` active border
- `admin-product-table`: Admin product management table styled with Hiyori tokens
- `admin-order-table`: Admin order management table styled with Hiyori tokens
- `auth-pages`: Login and Register pages styled with Hiyori tokens
- `shared-modals`: Product/Order modals restyled with paper cards and Hiyori buttons

### Modified Capabilities

## Impact

- `src/layouts/AdminLayout.tsx`
- `src/components/Sidebar.tsx`
- `src/pages/HomePage.tsx`
- `src/pages/OrdersPage.tsx`
- `src/pages/LoginPage.tsx`
- `src/pages/RegisterPage.tsx`
- `src/pages/NotFoundPage.tsx`
- `src/components/ProductEditModal.tsx`
- `src/components/ProductImageUploadModal.tsx`
- `src/components/OrderDetailModal.tsx`
- No API, routing, Redux, or token changes
