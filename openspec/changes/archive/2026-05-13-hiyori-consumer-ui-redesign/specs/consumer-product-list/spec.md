## ADDED Requirements

### Requirement: Product list page uses Hiyori card grid
The product list page SHALL render products in a grid: 4 columns on desktop (≥1024px), 2 columns on mobile. Each product card SHALL have `background: var(--paper)`, 1px border in `var(--bone)`, border-radius 4px, no box-shadow by default, and a subtle `box-shadow: 0 2px 8px rgba(27,26,23,0.06)` on hover. The card SHALL contain: image at 4:5 aspect ratio (object-cover), product name in `var(--font-display)` at 15px, price in `var(--font-display)` at 18px `var(--ink)`.

#### Scenario: Product card renders with cover image
- **WHEN** a product has a cover image
- **THEN** the image SHALL fill the 4:5 aspect ratio area via object-cover

#### Scenario: Product card renders without image
- **WHEN** a product has no images
- **THEN** a `var(--sand)` placeholder area at 4:5 aspect ratio SHALL render

#### Scenario: Card hover state
- **WHEN** user hovers over a product card
- **THEN** the card SHALL show a subtle shadow and the image SHALL scale to 1.03

### Requirement: Category filter sidebar
The page SHALL render a left sidebar (220px wide on desktop) containing category links: 女裝, 男裝, 生活雜貨, 優惠專區. Each link SHALL use `var(--font-display)` at 15px. The active category SHALL have a 1px bottom border in `var(--ink)`. The sidebar SHALL be hidden on mobile.

#### Scenario: Category filter is visible on desktop
- **WHEN** the product list page renders on a wide viewport
- **THEN** the left sidebar with category links SHALL be visible

### Requirement: Page title and breadcrumb in Hiyori style
The page SHALL display an H1 in `var(--font-display)` at 48px weight 400 for the category title. A breadcrumb row above SHALL use 11px uppercase `var(--ink-3)` text.

#### Scenario: Page title displayed
- **WHEN** product list page renders
- **THEN** H1 SHALL display `商品列表` in serif font at appropriate size

### Requirement: Loading and error states styled
The loading state SHALL display `載入中...` centered in `var(--ink-3)`. The error state SHALL display the message in `var(--shu)` (brand red, which doubles as danger color).

#### Scenario: Loading state
- **WHEN** products are being fetched
- **THEN** centered loading text in muted ink color SHALL display
