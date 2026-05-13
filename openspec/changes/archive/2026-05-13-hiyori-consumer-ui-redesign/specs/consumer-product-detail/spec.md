## ADDED Requirements

### Requirement: Product detail two-column layout
The product detail page SHALL use a 2-column grid (image left, info right) on desktop with a 48px gap. On mobile it SHALL stack vertically. The image column SHALL show the active image at 4:5 aspect ratio with `object-cover`. Thumbnail strip below SHALL show 64×64px thumbnails; the active thumbnail SHALL have a 2px `var(--shu)` border.

#### Scenario: Active image displayed
- **WHEN** a product detail page loads
- **THEN** the cover image SHALL fill the left column at 4:5 aspect ratio

#### Scenario: Thumbnail selection updates active image
- **WHEN** user clicks a thumbnail
- **THEN** the main image SHALL update to the selected image

### Requirement: Product name and price in serif typography
Product name SHALL use `var(--font-display)` at 28px weight 400 in `var(--ink)`. Price SHALL use `var(--font-display)` at 32px in `var(--ink)` with `NT$` prefix. Description SHALL use `var(--font-sans)` 15px `var(--ink-2)` line-height 1.85.

#### Scenario: Price rendered in serif
- **WHEN** product detail renders
- **THEN** price SHALL display as `NT$ X,XXX` in Noto Serif TC at 32px

### Requirement: Add to cart button in Hiyori style
The add-to-cart button SHALL have `background: var(--shu)`, `color: var(--paper)`, border-radius 2px, padding 12px 32px, `font-family: var(--font-sans)`, font-size 13px, letter-spacing 0.1em. Hover state SHALL darken to `var(--shu-dark)`. Disabled state SHALL use `var(--bone)` background and `var(--ink-3)` text.

#### Scenario: Button active when in stock
- **WHEN** product stock > 0
- **THEN** the button SHALL display `加入購物車` with `var(--shu)` background

#### Scenario: Button disabled when out of stock
- **WHEN** product stock is 0
- **THEN** the button SHALL display `缺貨` with `var(--bone)` background and be non-interactive

### Requirement: Quantity selector in Hiyori style
The quantity selector SHALL use a row of three elements: minus button, count display, plus button. All SHALL have `border: 1px solid var(--bone)`, no border-radius (0), background `var(--paper)`. Buttons use `var(--ink)` text at 18px.

#### Scenario: Quantity decrements
- **WHEN** minus button is clicked and quantity > 1
- **THEN** quantity SHALL decrease by 1

### Requirement: Back navigation breadcrumb
Above the product content, a breadcrumb SHALL show `首頁 / 商品列表` in 11px uppercase `var(--ink-3)` linking back to `/`.

#### Scenario: Breadcrumb links back to list
- **WHEN** user clicks the breadcrumb link
- **THEN** user SHALL navigate to the product list page `/`
