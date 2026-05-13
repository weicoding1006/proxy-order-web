## Requirements

### Requirement: Paper-white sidebar in Hiyori palette
The admin sidebar SHALL use `var(--paper)` background with a 1px right border in `var(--bone)`. Text SHALL use `var(--ink)`. The sidebar SHALL remain 208px wide when expanded and 56px when collapsed.

#### Scenario: Sidebar background and border
- **WHEN** the admin layout renders
- **THEN** the sidebar SHALL have paper-white background and a bone right-border

### Requirement: Sidebar logo matches consumer header
The top of the sidebar SHALL display the same 36×36px `var(--shu)` logo mark with `日` character used in the consumer header, followed by `日和代購` wordmark in `var(--font-display)` 18px when expanded. When collapsed, only the mark SHALL show.

#### Scenario: Logo visible expanded
- **WHEN** sidebar is expanded
- **THEN** logo mark + `日和代購` wordmark SHALL be visible

#### Scenario: Logo collapsed
- **WHEN** sidebar is collapsed
- **THEN** only the 36×36 `日` mark SHALL be visible, centered

### Requirement: Nav items use minimal active style
Sidebar nav items (商品管理, 訂單管理) SHALL render with `var(--ink-2)` text by default and `var(--ink)` text + a 2px left border in `var(--shu)` when active. The filled blue pill SHALL be removed.

#### Scenario: Active nav item indicated
- **WHEN** user is on `/admin/products`
- **THEN** the 商品管理 link SHALL display ink text with `--shu` left-border

### Requirement: Logout and countdown styled in Hiyori palette
The token countdown SHALL display in `var(--ink-3)` mono font. The logout button SHALL use `var(--ink-2)` default text, with hover changing text to `var(--shu)` — no background pill.

#### Scenario: Logout button hover
- **WHEN** user hovers over the logout button
- **THEN** text color SHALL change to `var(--shu)`
