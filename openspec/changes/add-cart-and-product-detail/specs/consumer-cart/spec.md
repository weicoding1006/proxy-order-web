## ADDED Requirements

### Requirement: 購物車頁顯示購物車內容
ConsumerCartPage SHALL 呼叫 `getCart()` 並列出所有 `CartItemResponse` 項目，每列顯示商品名稱、單價、數量、小計，以及頁面底部的總金額。

#### Scenario: 成功載入購物車
- **WHEN** 使用者瀏覽 `/cart` 且 `getCart()` 成功回傳
- **THEN** 頁面顯示所有項目（名稱、單價、數量、小計），底部顯示 `totalAmount`

#### Scenario: 購物車為空
- **WHEN** `getCart()` 回傳空 `items` 或 API 回 404
- **THEN** 頁面顯示「購物車是空的」提示，且不顯示結帳按鈕

#### Scenario: 載入中
- **WHEN** `getCart()` 尚未回傳結果
- **THEN** 頁面顯示載入中指示

#### Scenario: 載入失敗
- **WHEN** `getCart()` 拋出非 404 錯誤
- **THEN** 頁面顯示錯誤提示

### Requirement: 購物車頁可調整項目數量
ConsumerCartPage SHALL 在每列提供數量輸入或加減按鈕，呼叫 `updateCartItem(itemId, { quantity })` 更新後台數量並刷新購物車摘要。

#### Scenario: 成功更新數量
- **WHEN** 使用者調整某項目數量並送出
- **THEN** 系統呼叫 `updateCartItem` 後重新抓取購物車，更新該列小計與總金額

#### Scenario: 數量設為 0 或更少
- **WHEN** 使用者嘗試將數量設為 0 或負值
- **THEN** UI SHALL 阻止送出，或將動作視為刪除該項目

#### Scenario: 更新失敗
- **WHEN** `updateCartItem` 拋出錯誤
- **THEN** 頁面顯示錯誤訊息且該列數量回復為原值

### Requirement: 購物車頁可移除單一項目
ConsumerCartPage SHALL 在每列提供「移除」按鈕，呼叫 `deleteCartItem(itemId)` 並刷新購物車。

#### Scenario: 成功移除項目
- **WHEN** 使用者點擊「移除」並確認
- **THEN** 系統呼叫 `deleteCartItem`，成功後該列從畫面消失，總金額重新計算

#### Scenario: 移除失敗
- **WHEN** `deleteCartItem` 拋出錯誤
- **THEN** 頁面顯示錯誤訊息且該列保留

### Requirement: 購物車頁可清空購物車
ConsumerCartPage SHALL 提供「清空購物車」按鈕，需經 confirm 確認後呼叫 `deleteCart()`。

#### Scenario: 成功清空
- **WHEN** 使用者點擊「清空購物車」並於 confirm 對話確認
- **THEN** 系統呼叫 `deleteCart()`，成功後畫面顯示「購物車是空的」狀態

#### Scenario: 取消清空
- **WHEN** 使用者於 confirm 對話按取消
- **THEN** 系統不呼叫 API，畫面不變

### Requirement: 購物車頁可結帳
ConsumerCartPage SHALL 在購物車有項目時提供「結帳」按鈕，呼叫 `checkoutCart()`，成功後清空本地購物車狀態並導向 `/my-orders`。

#### Scenario: 成功結帳
- **WHEN** 使用者點擊「結帳」並確認
- **THEN** 系統呼叫 `checkoutCart()`，成功後 Header 購物車徽章歸零，並導向 `/my-orders`

#### Scenario: 結帳失敗
- **WHEN** `checkoutCart()` 拋出錯誤（如庫存不足）
- **THEN** 頁面顯示錯誤訊息，使用者仍停留於 `/cart`，購物車內容不變

#### Scenario: 空購物車不顯示結帳按鈕
- **WHEN** 購物車 `items` 為空
- **THEN** 「結帳」按鈕 SHALL 不顯示或為 disabled
