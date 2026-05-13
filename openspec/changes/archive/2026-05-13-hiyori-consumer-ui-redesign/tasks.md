## 1. Design Tokens & Global Styles

- [x] 1.1 Add Google Fonts `@import` for Noto Serif TC, Shippori Mincho B1, Noto Sans TC, Noto Sans JP to `src/index.css`
- [x] 1.2 Add all Hiyori CSS custom properties (`:root` block) to `src/index.css`: surfaces, ink, accent, semantic, font stacks, spacing, radii, shadows, motion, layout vars
- [x] 1.3 Set `html, body` base styles: `background: var(--cream)`, `color: var(--ink)`, `font-family: var(--font-sans)`, `-webkit-font-smoothing: antialiased`

## 2. Consumer Layout / Header

- [x] 2.1 Replace `ConsumerLayout` page wrapper background from `bg-gray-50` to `var(--cream)`
- [x] 2.2 Restyle header: sticky, 72px height, frosted-glass `rgba(246,243,236,0.92)` + `backdrop-filter: blur(14px)`, 1px bottom border in `var(--bone)`
- [x] 2.3 Add announcement strip above header nav: `var(--ink)` background, white 11px uppercase text: `ふだん便 ・ 滿 NT$3,000 免代運費`
- [x] 2.4 Replace logo text with `日` mark (36×36px `var(--shu)` square + `日` in `var(--paper)` serif) followed by `日和代購` wordmark in `var(--font-display)` 22px
- [x] 2.5 Restyle nav links: `var(--ink)` color, 13px `var(--font-sans)`, letter-spacing 0.1em; active state = 1px bottom border in `var(--ink)` (remove blue pill)
- [x] 2.6 Replace cart badge: keep Redux `cartItemCount` logic, style badge as 18×18px circle in `var(--shu)` with white 11px text
- [x] 2.7 Style logout button: `var(--ink-3)` default, hover `var(--shu)` text, no background pill
- [x] 2.8 Style main content area: `max-width: 1280px`, `padding: 0 64px`

## 3. Product List Page

- [x] 3.1 Add page header section: breadcrumb row (11px uppercase `var(--ink-3)`) and H1 `商品列表` in `var(--font-display)` 48px weight 400
- [x] 3.2 Create 2-column layout: 220px left sidebar + `1fr` main product area with 48px gap
- [x] 3.3 Implement category filter sidebar with links: 女裝, 男裝, 生活雜貨, 優惠專區 — styled with `var(--font-display)` 15px, active state bottom border in `var(--ink)`
- [x] 3.4 Change product grid from 5-col blue to 4-col Hiyori cards: `var(--paper)` bg, 1px `var(--bone)` border, 4px border-radius, no shadow default
- [x] 3.5 Style product card image area: 4:5 aspect ratio, `object-cover`, overflow hidden
- [x] 3.6 Style product card text: product name in `var(--font-display)` 15px `var(--ink)`, price in `var(--font-display)` 18px `var(--ink)` with `NT$` prefix
- [x] 3.7 Add card hover: `box-shadow: 0 2px 8px rgba(27,26,23,0.06)` and image `transform: scale(1.03)` with 0.4s transition
- [x] 3.8 Restyle loading state to use `var(--ink-3)` text, error state to use `var(--shu)` text

## 4. Product Detail Page

- [x] 4.1 Add breadcrumb: `首頁 / 商品列表` in 11px uppercase `var(--ink-3)`, linking to `/`
- [x] 4.2 Change grid to 2-column `1fr 1fr` with 48px gap on desktop, stack on mobile
- [x] 4.3 Style main image: 4:5 aspect ratio, `object-cover`, 4px border-radius, 1px `var(--bone)` border
- [x] 4.4 Style thumbnail strip: 64×64px per thumb, 1px `var(--bone)` border; active thumb uses 2px `var(--shu)` border
- [x] 4.5 Style product name in `var(--font-display)` 28px weight 400 `var(--ink)`
- [x] 4.6 Style price in `var(--font-display)` 32px `var(--ink)`, prefix `NT$`
- [x] 4.7 Style description in `var(--font-sans)` 15px `var(--ink-2)` line-height 1.85
- [x] 4.8 Style quantity selector: minus/count/plus row, each with `border: 1px solid var(--bone)`, 0 border-radius, `var(--paper)` bg, `var(--ink)` text
- [x] 4.9 Style add-to-cart button: `var(--shu)` bg, `var(--paper)` text, 2px border-radius, 12px 32px padding, 13px `var(--font-sans)`, letter-spacing 0.1em; hover `var(--shu-dark)`; disabled `var(--bone)` bg `var(--ink-3)` text
- [x] 4.10 Style feedback message: success in `var(--moss)`, error in `var(--shu)`
- [x] 4.11 Style stock indicator: out-of-stock in `var(--shu)`, in-stock count in `var(--ink-2)`

## 5. Cart Page

- [x] 5.1 Style page title `購物車` in `var(--font-display)` 36px weight 400
- [x] 5.2 Style table: `var(--paper)` background, no outer border-radius, 1px `var(--bone)` row dividers
- [x] 5.3 Style table header: 11px uppercase `var(--ink-3)` letter-spacing 0.12em, `var(--sand)` background
- [x] 5.4 Style product name link in cart: `var(--ink)` color, hover `var(--shu)` color
- [x] 5.5 Style cart quantity controls: same as detail page (1px `var(--bone)` border, 0 radius, `var(--paper)` bg)
- [x] 5.6 Style subtotal and unit price: `var(--ink)` in `var(--font-sans)` 14px
- [x] 5.7 Style remove button: `var(--ink-3)` color, hover `var(--shu)` color, no background
- [x] 5.8 Style total amount: `NT$` + amount in `var(--font-display)` 24px `var(--ink)`
- [x] 5.9 Style checkout button: `var(--shu)` bg, `var(--paper)` text, 2px border-radius, same as add-to-cart
- [x] 5.10 Style clear cart button: transparent bg, 1px `var(--bone)` border, `var(--ink-2)` text, 2px border-radius
- [x] 5.11 Style empty cart state: `var(--ink-3)` message, link to `/` in `var(--shu)` on hover

## 6. Order List Page

- [x] 6.1 Style page title `我的訂單` in `var(--font-display)` 36px weight 400
- [x] 6.2 Style order table: `var(--paper)` background, 1px `var(--bone)` dividers, no outer border-radius
- [x] 6.3 Style order ID cell: mono font `var(--ink-3)` truncated with `...`
- [x] 6.4 Style amount cell: `var(--font-sans)` 14px `var(--ink)`
- [x] 6.5 Implement status badge color mapping: Pending→amber (`var(--yuhi)`/`var(--yuhi-light)`), Confirmed→blue (`var(--ai)`/`var(--ai-light)`), Completed→green (`var(--moss)`/`var(--moss-light)`), Cancelled→gray (`var(--ink-3)`/`var(--bone)`), default→`var(--ink-2)`/`var(--sand)`; badge style: 2px border-radius, 11px text, letter-spacing 0.1em
- [x] 6.6 Style 檢視 button: transparent bg, 1px `var(--ink)` border, `var(--ink)` text, 2px border-radius, 6px 16px padding; hover = inverted (ink bg, paper text)
- [x] 6.7 Style empty and loading states using `var(--ink-3)` for muted messages
