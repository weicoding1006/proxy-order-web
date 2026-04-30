## Requirements

### Requirement: 前台商品列表顯示上架商品
ConsumerProductListPage SHALL 呼叫 `fetchProducts()` 並只顯示 `isActive === true` 的商品，以卡片網格呈現。

#### Scenario: 成功載入商品
- **WHEN** API 回傳商品陣列
- **THEN** 頁面顯示所有 `isActive === true` 的商品卡片，含名稱與價格（格式：`NT$ {price}`）

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
