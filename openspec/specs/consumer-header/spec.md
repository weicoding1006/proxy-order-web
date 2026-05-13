## Requirements

### Requirement: Sticky frosted-glass header with Hiyori branding
The `ConsumerLayout` header SHALL be sticky (`position: sticky; top: 0`), 72px tall, with a frosted-glass background (`rgba(246, 243, 236, 0.92)` + `backdrop-filter: blur(14px)`) and a 1px bottom border in `var(--bone)`. An announcement strip above the nav SHALL display `ふだん便 ・ 滿 NT$3,000 免代運費` in white on `var(--ink)` background, 11px uppercase spaced text.

#### Scenario: Header renders on all consumer pages
- **WHEN** any consumer route is active
- **THEN** the sticky header SHALL appear at the top with logo and nav actions visible

### Requirement: Logo mark with 日 character
The header SHALL display a 36×36px square filled with `var(--shu)` containing the character `日` in `var(--paper)` using `var(--font-display)` at 22px, followed by the text `日和代購` in `var(--ink)` at 22px using `var(--font-display)`.

#### Scenario: Logo visible
- **WHEN** the consumer layout renders
- **THEN** the red logo mark and `日和代購` wordmark SHALL be visible on the left side of the header

### Requirement: Cart badge showing item count
The cart link in the header SHALL display a circular badge with `var(--shu)` background showing the cart item count when count > 0. The badge SHALL be 18×18px with white text at 11px.

#### Scenario: Badge hidden when cart is empty
- **WHEN** cart item count is 0
- **THEN** no badge SHALL be rendered on the cart link

#### Scenario: Badge visible with count
- **WHEN** cart item count is greater than 0
- **THEN** the badge SHALL display the numeric count in `var(--shu)` red circle

### Requirement: Navigation links styled with Hiyori tokens
Nav links SHALL use `var(--ink)` color, 13px `var(--font-sans)`, letter-spacing 0.1em. Active link SHALL be indicated by a 1px bottom border in `var(--ink)`. The logout button SHALL use `var(--ink-3)` color with hover in `var(--shu)`.

#### Scenario: Active nav link indicated
- **WHEN** user is on the product list page
- **THEN** the 商品列表 link SHALL show a bottom border underline
