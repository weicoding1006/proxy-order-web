## MODIFIED Requirements

### Requirement: 前台商品列表顯示上架商品
ConsumerProductListPage SHALL 呼叫 `fetchProducts()` 並只顯示 `isActive === true` 的商品，以卡片網格呈現。每張卡片 SHALL 在頂部顯示商品封面圖片或灰色佔位符。

#### Scenario: 成功載入商品
- **WHEN** API 回傳商品陣列
- **THEN** 頁面顯示所有 `isActive === true` 的商品卡片，每張卡片含封面圖片（或佔位符）、名稱與價格（格式：`NT$ {price}`）

#### Scenario: 無上架商品
- **WHEN** API 回傳空陣列或所有商品均為 `isActive === false`
- **THEN** 頁面顯示「目前沒有商品」提示文字
