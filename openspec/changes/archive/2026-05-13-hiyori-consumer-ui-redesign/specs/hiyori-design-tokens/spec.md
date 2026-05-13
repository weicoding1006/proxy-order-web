## ADDED Requirements

### Requirement: Global design tokens applied via CSS custom properties
The system SHALL inject Hiyori design system CSS custom properties into `src/index.css` so all consumer pages can reference `var(--ink)`, `var(--shu)`, `var(--cream)`, etc. without repeating values. Google Fonts for Noto Serif TC, Noto Sans TC, and Shippori Mincho B1 SHALL be imported via `@import url(...)` at the top of `index.css`. The `html, body` rule SHALL set `background: var(--cream)` and `font-family: var(--font-sans)`.

#### Scenario: Tokens available globally
- **WHEN** any consumer page component is rendered
- **THEN** CSS variables `--paper`, `--cream`, `--ink`, `--shu`, `--font-display`, `--font-sans` SHALL resolve to their defined values

#### Scenario: Fonts loaded
- **WHEN** the app loads in a browser with internet access
- **THEN** Noto Serif TC and Noto Sans TC SHALL render for display and body text respectively
