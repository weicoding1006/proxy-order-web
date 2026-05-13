## ADDED Requirements

### Requirement: Login page styled with Hiyori tokens
LoginPage SHALL render on a `var(--cream)` full-screen background with a centered paper card. The card SHALL use `var(--paper)` background, 1px `var(--bone)` border, 4px border-radius, 40px padding, and no shadow. Above the form, the same `日` logo mark + `日和代購` wordmark from the consumer header SHALL be displayed, followed by an H1 `登入` in `var(--font-display)` at 32px weight 400.

#### Scenario: Login card centered on cream background
- **WHEN** an unauthenticated user navigates to `/login`
- **THEN** a paper card SHALL appear centered with cream surroundings

#### Scenario: Login title in serif
- **WHEN** login page renders
- **THEN** `登入` SHALL render in Noto Serif TC at 32px

### Requirement: Form inputs styled with bone borders
Email and password inputs SHALL have 1px `var(--bone)` border, 2px border-radius, `var(--paper)` background, 10px 12px padding, 14px font-size, `var(--ink)` text. Focus state SHALL apply a 1px `var(--shu)` outline with 2px offset.

#### Scenario: Input focus highlights shu
- **WHEN** user focuses an input
- **THEN** a 1px `--shu` outline SHALL appear with a 2px offset

### Requirement: Submit button in Hiyori brand red
The submit button SHALL use `var(--shu)` background, `var(--paper)` text, 2px border-radius, 12px 32px padding, 13px font-size, letter-spacing 0.1em. Hover darkens to `var(--shu-dark)`. Disabled state uses `var(--bone)` bg + `var(--ink-3)` text.

#### Scenario: Submit while loading
- **WHEN** form is submitting
- **THEN** the button SHALL display `登入中...` with disabled style

### Requirement: Register link styled subtly
The link 前往註冊 SHALL use `var(--ink-2)` color with hover changing to `var(--shu)`. The container line SHALL be 13px in `var(--ink-3)`.

#### Scenario: Register link hover
- **WHEN** user hovers over 前往註冊
- **THEN** the link color SHALL change to `var(--shu)`

### Requirement: Register page styled identically to login
RegisterPage SHALL apply the same layout, card style, font, button, and input rules as LoginPage but with H1 `註冊` and a 前往登入 link.

#### Scenario: Register page matches login
- **WHEN** user navigates to `/register`
- **THEN** the page SHALL look visually consistent with login (same card, same fonts, same button color)
