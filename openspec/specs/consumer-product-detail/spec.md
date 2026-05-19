## Requirements

### Requirement: Product detail two-column layout
The product detail page SHALL use a 2-column grid (image left, info right) on desktop with a 48px gap. On mobile it SHALL stack vertically. The image column SHALL show the active image at 4:5 aspect ratio with `object-cover`. Thumbnail strip below SHALL show 64×64px thumbnails; the active thumbnail SHALL have a 2px `var(--shu)` border.

#### Scenario: Active image displayed
- **WHEN** a product detail page loads
- **THEN** the cover image SHALL fill the left column at 4:5 aspect ratio

#### Scenario: Thumbnail selection updates active image
- **WHEN** user clicks a thumbnail
- **THEN** the main image SHALL update to the selected image

### Requirement: Product name and price in serif typography
Product name SHALL use `var(--font-display)` at 28px weight 400 in `var(--ink)`. Price SHALL use `var(--font-display)` at 32px in `var(--ink)` with `NT$` prefix. Description SHALL use `var(--font-sans)` 15px `var(--ink-2)` line-height 1.85.

#### Scenario: Price rendered in serif
- **WHEN** product detail renders
- **THEN** price SHALL display as `NT$ X,XXX` in Noto Serif TC at 32px

### Requirement: Add to cart button in Hiyori style
The add-to-cart button SHALL have `background: var(--shu)`, `color: var(--paper)`, border-radius 2px, padding 12px 32px, font-size 13px, letter-spacing 0.1em. Hover state SHALL darken to `var(--shu-dark)`. Disabled state SHALL use `var(--bone)` background and `var(--ink-3)` text.

#### Scenario: Button active when in stock
- **WHEN** product stock > 0
- **THEN** the button SHALL display `加入購物車` with `var(--shu)` background

#### Scenario: Button disabled when out of stock
- **WHEN** product stock is 0
- **THEN** the button SHALL display `缺貨` with `var(--bone)` background and be non-interactive

### Requirement: Quantity selector in Hiyori style
The quantity selector SHALL use a row of three elements: minus button, count display, plus button. All SHALL have `border: 1px solid var(--bone)`, no border-radius, background `var(--paper)`.

#### Scenario: Quantity decrements
- **WHEN** minus button is clicked and quantity > 1
- **THEN** quantity SHALL decrease by 1

### Requirement: Back navigation breadcrumb
Above the product content, a breadcrumb SHALL show `首頁 / 商品列表` in 11px uppercase `var(--ink-3)` linking back to `/`.

#### Scenario: Breadcrumb links back to list
- **WHEN** user clicks the breadcrumb link
- **THEN** user SHALL navigate to the product list page `/`

### Requirement: 商品詳情頁顯示收藏切換按鈕
商品詳情頁的操作區 SHALL 在「加入購物車」按鈕旁顯示收藏切換按鈕，允許使用者收藏或取消收藏當前商品。

#### Scenario: 商品未收藏時顯示收藏按鈕
- **WHEN** 商品詳情頁載入且該商品未在收藏清單中
- **THEN** 顯示「加入收藏」文字與空心心形圖示的按鈕

#### Scenario: 商品已收藏時顯示取消收藏按鈕
- **WHEN** 商品詳情頁載入且該商品已在收藏清單中
- **THEN** 顯示「已收藏」文字與實心心形圖示的按鈕（shu 色系）

#### Scenario: 收藏操作成功
- **WHEN** 使用者點擊收藏/取消收藏按鈕且 API 成功
- **THEN** 按鈕狀態立即切換，反映新的收藏狀態

#### Scenario: 操作進行中禁用按鈕
- **WHEN** 收藏 API 請求尚未完成
- **THEN** 按鈕處於 disabled 狀態，避免重複點擊
