## Requirements

### Requirement: 前台我的訂單頁顯示當前用戶訂單
ConsumerOrderListPage SHALL 呼叫 `fetchOrders()` 並以 table 顯示回傳的訂單，欄位含訂單編號（截短）、金額、狀態、建立時間。

#### Scenario: 成功載入訂單
- **WHEN** API 回傳訂單陣列
- **THEN** table 顯示每筆訂單的編號、金額（`NT$ {totalAmount}`）、狀態 badge 與建立時間

#### Scenario: 無訂單記錄
- **WHEN** API 回傳空陣列
- **THEN** 頁面顯示「目前沒有訂單」提示文字

### Requirement: 前台我的訂單頁顯示載入中狀態
ConsumerOrderListPage SHALL 在 API 請求期間顯示 loading 指示器。

#### Scenario: 資料載入中
- **WHEN** `fetchOrders()` 尚未回傳結果
- **THEN** 頁面顯示「載入中...」

### Requirement: 前台我的訂單頁處理 API 錯誤
ConsumerOrderListPage SHALL 在 API 失敗時顯示錯誤提示。

#### Scenario: API 呼叫失敗
- **WHEN** `fetchOrders()` 拋出錯誤
- **THEN** 頁面顯示「載入訂單失敗，請稍後再試」，不顯示 table
