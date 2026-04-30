## MODIFIED Requirements

### Requirement: 後台商品管理頁顯示商品列表
後台商品管理頁（原首頁）SHALL 在掛載時呼叫 `fetchProducts()` API，並將回傳的商品陣列（含停售商品）渲染為卡片網格，路由為 `/admin/products`。

#### Scenario: 成功載入商品
- **WHEN** API 回傳商品陣列
- **THEN** 頁面顯示每張商品卡片，包含名稱、價格（格式：`NT$ {price}`）、庫存數量與上架狀態標籤

#### Scenario: 商品列表為空
- **WHEN** API 回傳空陣列
- **THEN** 頁面顯示「目前沒有商品」提示文字

### Requirement: 後台商品管理頁顯示載入中狀態
頁面 SHALL 在 API 請求進行期間顯示 loading 指示器。

#### Scenario: 資料載入中
- **WHEN** `fetchProducts()` 尚未回傳結果
- **THEN** 頁面顯示 loading 指示（如旋轉圖示或文字「載入中...」）

### Requirement: 後台商品管理頁處理 API 錯誤
頁面 SHALL 在 API 呼叫失敗時顯示錯誤訊息。

#### Scenario: API 呼叫失敗
- **WHEN** `fetchProducts()` 拋出錯誤或回傳非 2xx 狀態
- **THEN** 頁面顯示錯誤提示文字，不顯示商品卡片或 loading 指示
