## 1. Admin Layout & Sidebar

- [x] 1.1 `AdminLayout`: change wrapper from `bg-gray-100` to `var(--cream)`, keep flex layout
- [x] 1.2 `Sidebar`: change background from `bg-gray-900` to `var(--paper)`, add 1px `var(--bone)` right border
- [x] 1.3 `Sidebar` top section: replace text label with 36×36 `--shu` `日` mark + `日和代購` wordmark (Noto Serif TC 18px); collapsed state shows only the mark
- [x] 1.4 `Sidebar` collapse toggle button: ink-2 default, ink hover, no background pill
- [x] 1.5 Countdown block: `var(--ink-3)` mono font, `var(--ink-2)` label, remove yellow
- [x] 1.6 Nav items: ink-2 default text, ink + 2px `--shu` left border when active; remove blue pill
- [x] 1.7 Nav item icons: remove emoji or keep but tint with `var(--ink-2)`
- [x] 1.8 Logout button: ink-2 default, hover changes text to `--shu`, no red pill

## 2. Admin Product Page (HomePage)

- [x] 2.1 Page wrapper: keep `max-w-6xl mx-auto` but switch to inline padding `48px 64px`
- [x] 2.2 Add eyebrow row: `商品管理` in 11px uppercase `var(--ink-3)` letter-spacing 0.18em
- [x] 2.3 H1 `商品列表` in `var(--font-display)` 36px weight 400, margin-bottom 32px
- [x] 2.4 Table: `var(--paper)` background, 1px `var(--bone)` row dividers, no outer border-radius
- [x] 2.5 Table header row: `var(--sand)` bg, 11px uppercase `var(--ink-3)` letter-spacing 0.12em
- [x] 2.6 Status badge `上架/下架`: 上架 = moss palette, 下架 = bone/ink-3; 2px border-radius, 11px font
- [x] 2.7 Edit button: outline style (transparent bg, 1px ink border, ink text, 2px radius); hover inverts to ink bg + paper text
- [x] 2.8 Loading/error states: ink-3 / shu text on cream background

## 3. Admin Orders Page (OrdersPage)

- [x] 3.1 Page wrapper + H1 `訂單管理` styled same as product page (serif 36px)
- [x] 3.2 Add eyebrow `訂單管理` above title
- [x] 3.3 Table styled identical to admin product table (paper bg, sand header, bone dividers)
- [x] 3.4 Status badge: implement Hiyori color mapping (Pending→amber, Confirmed→ai, Shipped→ai, Completed→moss, Cancelled→gray, default→muted) — match consumer order list
- [x] 3.5 Order ID cell: mono `var(--ink-3)` truncated with `...`
- [x] 3.6 Amount cell: `var(--font-sans)` 14px `var(--ink)`
- [x] 3.7 Date cell: 13px `var(--ink-3)`
- [x] 3.8 檢視 button: outline style matching consumer view button (transparent → ink hover invert)

## 4. Login & Register Pages

- [x] 4.1 LoginPage: change full-screen bg from `bg-gray-100` to `var(--cream)`
- [x] 4.2 LoginPage card: `var(--paper)` bg, 1px `var(--bone)` border, 4px border-radius, 40px padding, no shadow, max-width 380px
- [x] 4.3 Add logo mark (36×36 `--shu` `日` square + `日和代購` wordmark) above the title in the login card, centered
- [x] 4.4 H1 `登入` in `var(--font-display)` 32px weight 400, centered
- [x] 4.5 Form labels: 12px `var(--ink-3)` letter-spacing 0.08em
- [x] 4.6 Form inputs: 1px `var(--bone)` border, 2px border-radius, paper bg, ink text, focus outline 1px `var(--shu)` offset 2px
- [x] 4.7 Error message: `var(--shu)` color, 13px
- [x] 4.8 Submit button: `var(--shu)` bg, paper text, 2px border-radius, 12px 32px padding, 13px letter-spacing 0.1em; hover `--shu-dark`; disabled `--bone` bg
- [x] 4.9 `前往註冊` link: `var(--ink-2)` color, hover `var(--shu)`; surrounding line in `var(--ink-3)` 13px
- [x] 4.10 RegisterPage: apply identical structure/styles with H1 `註冊` and `前往登入` link

## 5. NotFound Page

- [x] 5.1 NotFoundPage: cream background, centered paper card or just centered text
- [x] 5.2 `404` heading in `var(--font-display)` 72px `var(--ink)`
- [x] 5.3 Subtitle in `var(--ink-2)` 16px
- [x] 5.4 Return-home link styled as outline button (matching admin edit button style)

## 6. ProductEditModal

- [x] 6.1 Overlay: `rgba(27, 26, 23, 0.5)` ink-tinted
- [x] 6.2 Modal panel: `var(--paper)` bg, 1px `var(--bone)` border, 8px border-radius, `box-shadow: 0 24px 60px rgba(27,26,23,0.16)`
- [x] 6.3 Modal title `編輯商品` in `var(--font-display)` 24px weight 400, ink color
- [x] 6.4 Close (X) button: transparent, ink-3 default, ink hover, 32×32px
- [x] 6.5 Field labels: 12px `var(--ink-3)` letter-spacing 0.08em
- [x] 6.6 All inputs/textareas: bone border 1px, paper bg, ink text, 2px border-radius; focus shu outline
- [x] 6.7 Active/Inactive toggle (checkbox or switch): use shu as the on-state color, bone as off-state
- [x] 6.8 Existing-images grid: paper background squares with bone border; cover badge uses shu pill; remove button is shu red text
- [x] 6.9 Image upload area: dashed bone border, paper bg, hover background `var(--sand)`
- [x] 6.10 儲存 button: shu bg, paper text; hover shu-dark
- [x] 6.11 取消 button: transparent, bone border, ink-2 text

## 7. ProductImageUploadModal

- [x] 7.1 Apply identical overlay + panel styling as ProductEditModal
- [x] 7.2 Modal title `上傳商品圖片` in serif 24px
- [x] 7.3 File-picker / dropzone: dashed bone border, paper bg
- [x] 7.4 Confirm/Upload button: shu primary style
- [x] 7.5 Cancel button: bone outline style

## 8. OrderDetailModal

- [x] 8.1 Apply identical overlay + panel styling
- [x] 8.2 Modal title `訂單詳情` in serif 24px
- [x] 8.3 Order meta block (ID/date/amount): paper bg with sand divider lines, label in ink-3, value in ink
- [x] 8.4 StatusProgressBar: replace blue step circles with `var(--shu)` for completed and `var(--ink-4)` for incomplete; connector lines 1px `var(--bone)`
- [x] 8.5 Cancelled-state pill: gray (bone bg, ink-3 text) at 2px border-radius
- [x] 8.6 Items table: paper bg, bone dividers, ink text, serif unit prices
- [x] 8.7 Admin status-change dropdown/buttons: outline style; primary advance action uses shu bg (no admin status-change UI exists in current file; covered if added later)
- [x] 8.8 Cancel-order button (consumer side): transparent bg with shu red text
- [x] 8.9 Close button: bone outline style (kept as ✕ icon button per layout convention)

## 9. Verification

- [x] 9.1 Run `npx tsc --noEmit` to verify no TypeScript errors
- [x] 9.2 Spot-check admin pages render correctly with new styles (no broken layouts)
