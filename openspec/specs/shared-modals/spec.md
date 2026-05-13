## Requirements

### Requirement: Modal overlay uses Hiyori tokens
All admin/shared modals (ProductEditModal, ProductImageUploadModal, OrderDetailModal) SHALL render with an overlay of `rgba(27, 26, 23, 0.5)` (ink at 50% alpha). The modal panel SHALL use `var(--paper)` background, 1px `var(--bone)` border, 8px border-radius, and `box-shadow: 0 24px 60px rgba(27, 26, 23, 0.16)`.

#### Scenario: Modal renders with paper panel
- **WHEN** any of the listed modals opens
- **THEN** an ink-tinted overlay and paper panel SHALL appear

### Requirement: Modal title and close button in Hiyori style
Modal title SHALL use `var(--font-display)` at 24px weight 400 in `var(--ink)`. The close (X) button SHALL be 32×32px transparent, `var(--ink-3)` color, hover to `var(--ink)`.

#### Scenario: Title visible
- **WHEN** a modal opens
- **THEN** the title SHALL be in serif at 24px

### Requirement: Form inputs in modals use bone borders
All `<input>`, `<textarea>`, and `<select>` elements in modals SHALL use 1px `var(--bone)` border, 2px border-radius, `var(--paper)` background, `var(--ink)` text, 14px font-size. Focus SHALL use 1px `var(--shu)` outline.

#### Scenario: Input focus visible
- **WHEN** user focuses an input in a modal
- **THEN** a 1px `--shu` outline SHALL appear

### Requirement: Primary action buttons in modals use shu red
Save / Confirm / Upload / Update action buttons SHALL use `var(--shu)` background with `var(--paper)` text and 2px border-radius, identical to the consumer add-to-cart button.

#### Scenario: Save button styled correctly
- **WHEN** user views ProductEditModal
- **THEN** the 儲存 button SHALL appear in `--shu` red

### Requirement: Secondary action buttons use bone outline
Cancel / Close / Secondary buttons SHALL use transparent background, 1px `var(--bone)` border, `var(--ink-2)` text, 2px border-radius.

#### Scenario: Cancel button outlined
- **WHEN** user views any modal with a cancel button
- **THEN** the cancel button SHALL render with bone outline and ink-2 text

### Requirement: Danger action buttons (delete, cancel order) use shu red text
Destructive actions (e.g., remove image, cancel order) SHALL use transparent background with `var(--shu)` text. Hover SHALL darken to `var(--shu-dark)`.

#### Scenario: Delete image button styled as danger
- **WHEN** user views the image grid in ProductImageUploadModal
- **THEN** the delete (移除) action SHALL render with shu red text

### Requirement: Order status progress bar uses Hiyori palette
The `StatusProgressBar` in OrderDetailModal SHALL render completed steps with `var(--shu)` indicators and incomplete steps with `var(--ink-4)` indicators. Connector lines SHALL be 1px in `var(--bone)`.

#### Scenario: In-progress order
- **WHEN** an order is at "Confirmed"
- **THEN** Pending and Confirmed indicators SHALL show `--shu` and remaining steps SHALL show `--ink-4`

#### Scenario: Cancelled order
- **WHEN** an order is "Cancelled"
- **THEN** the bar SHALL display a single `已取消` badge with the cancelled status color (gray)
