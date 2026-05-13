## ADDED Requirements

### Requirement: Order list page with Hiyori minimal table
The order list page SHALL display orders in a table with `var(--paper)` background, 1px `var(--bone)` row dividers, no outer border-radius. Columns: 訂單編號 (truncated mono), 金額 (serif), 狀態 (badge), 建立時間, 操作. The page title `我的訂單` SHALL use `var(--font-display)` at 36px weight 400.

#### Scenario: Orders displayed in table
- **WHEN** orders are loaded
- **THEN** each order SHALL show in a table row with all columns

#### Scenario: Empty orders state
- **WHEN** user has no orders
- **THEN** centered `目前沒有訂單` message in `var(--ink-3)` SHALL display

### Requirement: Status badge in Hiyori palette
The status badge SHALL be a small inline-block with padding 2px 8px, font-size 11px, letter-spacing 0.1em, border-radius 2px (not pill). Status mapping for colors:
- Pending/待確認: `background: var(--yuhi-light)`, `color: var(--yuhi)` (amber)
- Confirmed/已確認: `background: var(--ai-light)`, `color: var(--ai)` (blue)
- Completed/已完成: `background: var(--moss-light)`, `color: var(--moss)` (green)
- Cancelled/已取消: `background: var(--bone)`, `color: var(--ink-3)` (gray)
- Default/other: `background: var(--sand)`, `color: var(--ink-2)`

#### Scenario: Status badge colors by status
- **WHEN** an order has status "Pending"
- **THEN** the badge SHALL render with amber background

### Requirement: View order button in Hiyori style
The 檢視 button SHALL use transparent background, 1px `var(--ink)` border, `var(--ink)` text, border-radius 2px, padding 6px 16px, font-size 12px, letter-spacing 0.1em. Hover SHALL use `var(--ink)` background and `var(--paper)` text.

#### Scenario: View button opens detail modal
- **WHEN** user clicks 檢視
- **THEN** the OrderDetailModal SHALL open for that order
