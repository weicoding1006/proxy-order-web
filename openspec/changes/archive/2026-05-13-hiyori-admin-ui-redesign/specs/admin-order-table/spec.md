## ADDED Requirements

### Requirement: Admin order management page styled with Hiyori tokens
The OrdersPage SHALL display orders in a Hiyori-styled table identical in appearance to the consumer order list page: `var(--paper)` background, 1px `var(--bone)` dividers, sand header row. The page H1 `訂單管理` SHALL use `var(--font-display)` at 36px weight 400.

#### Scenario: Order table renders with Hiyori styling
- **WHEN** orders load
- **THEN** the table SHALL match the consumer order list visual style

### Requirement: Status badge color mapping shared with consumer
The status badge in OrdersPage SHALL use the same color mapping as the consumer order list:
- Pending → amber (`var(--yuhi)` / `var(--yuhi-light)`)
- Confirmed → blue (`var(--ai)` / `var(--ai-light)`)
- Shipped → blue (`var(--ai)` / `var(--ai-light)`)
- Completed → green (`var(--moss)` / `var(--moss-light)`)
- Cancelled → gray (`var(--ink-3)` / `var(--bone)`)
- Default → muted (`var(--ink-2)` / `var(--sand)`)

Badge SHALL be 2px border-radius, 11px font-size, letter-spacing 0.1em.

#### Scenario: Pending order badge
- **WHEN** an order has status "Pending"
- **THEN** the badge SHALL render in amber

### Requirement: View order button in Hiyori style
The 檢視 button SHALL match the consumer view button: transparent background, 1px `var(--ink)` border, ink text, 2px border-radius. Hover inverts to ink fill + paper text.

#### Scenario: View button styled consistently
- **WHEN** admin order table renders
- **THEN** the 檢視 button SHALL look identical to the consumer-side button
