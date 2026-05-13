## ADDED Requirements

### Requirement: Admin product list page styled with Hiyori tokens
The admin HomePage SHALL display its products in a table using `var(--paper)` background, 1px `var(--bone)` row dividers, no outer border-radius. The page H1 `商品列表` SHALL use `var(--font-display)` at 36px weight 400 with breadcrumb-style eyebrow `商品管理` above it.

#### Scenario: Table renders with Hiyori styling
- **WHEN** products load
- **THEN** the table SHALL render with paper background and bone dividers

#### Scenario: Page title in serif
- **WHEN** admin product list page renders
- **THEN** H1 SHALL use Noto Serif TC at 36px

### Requirement: Table header in sand background
Column headers (商品名稱, 價格, 庫存, 狀態, 操作) SHALL use `var(--sand)` background with 11px uppercase `var(--ink-3)` text and letter-spacing 0.12em.

#### Scenario: Header row visible
- **WHEN** the table renders
- **THEN** the header row SHALL have a sand background

### Requirement: Status badge for active/inactive products
The 上架/下架 badge SHALL use the Hiyori palette:
- 上架: `background: var(--moss-light)`, `color: var(--moss)`
- 下架: `background: var(--bone)`, `color: var(--ink-3)`

Badge SHALL have 2px border-radius, 11px font-size, letter-spacing 0.08em.

#### Scenario: Active product badge
- **WHEN** a product is `isActive === true`
- **THEN** the badge SHALL render with moss green palette and read `上架`

#### Scenario: Inactive product badge
- **WHEN** a product is `isActive === false`
- **THEN** the badge SHALL render with gray palette and read `下架`

### Requirement: Edit button in Hiyori style
The 編輯 button SHALL use transparent background, 1px `var(--ink)` border, `var(--ink)` text, 2px border-radius, 6px 16px padding, 12px font-size. Hover SHALL invert to `var(--ink)` background with `var(--paper)` text.

#### Scenario: Edit button hover inverts
- **WHEN** user hovers over the 編輯 button
- **THEN** background SHALL become ink and text SHALL become paper

### Requirement: Loading and error states styled
Loading state SHALL display centered `載入中...` in `var(--ink-3)`. Error state SHALL display the message in `var(--shu)`.

#### Scenario: Loading state visible
- **WHEN** products are being fetched
- **THEN** muted loading text SHALL be centered on the page
