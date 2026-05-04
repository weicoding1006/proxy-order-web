## MODIFIED Requirements

### Requirement: 後台商品管理頁顯示商品列表
後台商品管理頁（原首頁）SHALL 在掛載時呼叫 `fetchProducts()` API，並將回傳的商品陣列（含停售商品）渲染為表格，路由為 `/admin/products`。表格 SHALL 包含「商品名稱」、「價格」、「庫存」、「狀態」與「操作」共五個欄位。

#### Scenario: 成功載入商品
- **WHEN** API 回傳商品陣列
- **THEN** 頁面顯示每筆商品列，包含名稱、價格（格式：`NT$ {price}`）、庫存數量、上架狀態標籤，以及「編輯」按鈕

#### Scenario: 商品列表為空
- **WHEN** API 回傳空陣列
- **THEN** 頁面顯示「目前沒有商品」提示文字

#### Scenario: 點擊編輯按鈕
- **WHEN** 管理員點擊某商品列的「編輯」按鈕
- **THEN** 開啟 `ProductEditModal`，傳入該商品的完整資料（`id`、`name`、`price`、`stock`、`isActive`、`description`、`images`）

#### Scenario: Modal 儲存成功後刷新列表
- **WHEN** `ProductEditModal` 的 `onSaved` 回呼被觸發
- **THEN** 重新呼叫 `fetchProducts()` 以刷新商品列表，並關閉 Modal
