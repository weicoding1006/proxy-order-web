## Requirements

### Requirement: 前台商品列表顯示上架商品
ConsumerProductListPage SHALL 呼叫 `fetchProducts()` 並只顯示 `isActive === true` 的商品，以卡片網格呈現。每張卡片 SHALL 在頂部顯示商品封面圖片或灰色佔位符。

#### Scenario: 成功載入商品
- **WHEN** API 回傳商品陣列
- **THEN** 頁面顯示所有 `isActive === true` 的商品卡片，每張卡片含封面圖片（或佔位符）、名稱與價格（格式：`NT$ {price}`）

#### Scenario: 無上架商品
- **WHEN** API 回傳空陣列或所有商品均為 `isActive === false`
- **THEN** 頁面顯示「目前沒有商品」提示文字

### Requirement: 前台商品列表顯示載入中狀態
ConsumerProductListPage SHALL 在 API 請求期間顯示 loading 指示器。

#### Scenario: 資料載入中
- **WHEN** `fetchProducts()` 尚未回傳結果
- **THEN** 頁面顯示載入中指示

### Requirement: 前台商品列表處理 API 錯誤
ConsumerProductListPage SHALL 在 API 失敗時顯示錯誤提示。

#### Scenario: API 呼叫失敗
- **WHEN** `fetchProducts()` 拋出錯誤
- **THEN** 頁面顯示錯誤提示文字，不顯示商品卡片

### Requirement: Product list page uses Hiyori card grid
The product list page SHALL render products in a grid: 4 columns on desktop, 2 columns on mobile. Each card SHALL have `var(--paper)` background, 1px `var(--bone)` border, 4px border-radius, shadow on hover. Image at 4:5 aspect ratio; name in `var(--font-display)` 15px; price in `var(--font-display)` 18px.

#### Scenario: Product card renders with cover image
- **WHEN** a product has a cover image
- **THEN** the image SHALL fill the 4:5 aspect ratio area via object-cover

#### Scenario: Card hover state
- **WHEN** user hovers over a product card
- **THEN** the card SHALL show a subtle shadow and the image SHALL scale to 1.03

### Requirement: Category filter sidebar
The page SHALL render a 220px left sidebar with category links (女裝, 男裝, 生活雜貨, 優惠專區). Active category SHALL have a 1px bottom border in `var(--ink)`.

#### Scenario: Category filter is visible on desktop
- **WHEN** the product list page renders on a wide viewport
- **THEN** the left sidebar with category links SHALL be visible

### Requirement: Page title and breadcrumb in Hiyori style
H1 SHALL use `var(--font-display)` at 48px weight 400. Breadcrumb above SHALL use 11px uppercase `var(--ink-3)`.

#### Scenario: Page title displayed
- **WHEN** product list page renders
- **THEN** H1 SHALL display `商品列表` in serif font
