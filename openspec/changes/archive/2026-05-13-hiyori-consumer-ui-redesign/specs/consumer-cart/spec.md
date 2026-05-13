## ADDED Requirements

### Requirement: Cart page with Hiyori line-item layout
The cart page SHALL display items in a clean table with columns: 商品, 單價, 數量, 小計, 操作. The table SHALL have no outer border-radius, a 1px `var(--bone)` divider between rows, and `var(--paper)` background. Header row SHALL use 11px uppercase `var(--ink-3)` text with letter-spacing 0.12em.

#### Scenario: Line items displayed
- **WHEN** cart has items
- **THEN** each item SHALL show product name, unit price, quantity controls, subtotal, and remove button

#### Scenario: Empty cart state
- **WHEN** cart has no items
- **THEN** a centered message `購物車是空的` in `var(--ink-3)` and a link to `/` SHALL display

### Requirement: Cart total and checkout in Hiyori style
The total amount SHALL display using `var(--font-display)` at 24px in `var(--ink)` with `NT$` prefix. The checkout button SHALL match the add-to-cart button style: `var(--shu)` background, `var(--paper)` text, 2px border-radius, 12px 32px padding. The clear cart button SHALL use transparent background with 1px `var(--bone)` border and `var(--ink-2)` text.

#### Scenario: Checkout button styled correctly
- **WHEN** cart page renders with items
- **THEN** the checkout button SHALL appear in `var(--shu)` red

#### Scenario: Total displayed in serif
- **WHEN** cart has items
- **THEN** total amount SHALL render in Noto Serif TC

### Requirement: Quantity controls in Hiyori style matching detail page
Cart quantity controls SHALL use the same style as the product detail page: minus/plus buttons with `border: 1px solid var(--bone)`, no border-radius, `var(--paper)` background.

#### Scenario: Quantity update triggers API
- **WHEN** user changes quantity in cart
- **THEN** the Redux `updateItem` action SHALL be dispatched with new quantity
