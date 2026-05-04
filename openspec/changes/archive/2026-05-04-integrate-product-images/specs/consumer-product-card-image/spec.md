## ADDED Requirements

### Requirement: 商品卡片顯示封面圖片
ConsumerProductListPage 的每張商品卡片 SHALL 在名稱上方顯示該商品的封面圖片（`isCover: true` 的圖片）。

#### Scenario: 商品有封面圖片
- **WHEN** 商品的 `images` 陣列中存在 `isCover: true` 的圖片
- **THEN** 卡片頂部顯示該圖片，使用 `object-fit: cover` 填滿固定高度區塊（建議 160px）

#### Scenario: 商品無任何圖片
- **WHEN** 商品的 `images` 陣列為空或 undefined
- **THEN** 卡片頂部顯示固定高度的灰色佔位符區塊，不顯示任何 alt 文字圖示

#### Scenario: 商品有圖片但無封面
- **WHEN** 商品的 `images` 陣列存在但無 `isCover: true` 的項目
- **THEN** 卡片頂部顯示灰色佔位符（同無圖情境）
