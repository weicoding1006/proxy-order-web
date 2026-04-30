## MODIFIED Requirements

### Requirement: 後台訂單列表頁顯示所有訂單
後台訂單列表頁 SHALL 在掛載時呼叫 `fetchOrders()`，並以 table 呈現回傳的訂單陣列，路由為 `/admin/orders`。欄位包含：訂單編號（截短）、金額（`NT$ {totalAmount}`）、狀態、建立時間。

#### Scenario: 成功載入訂單
- **WHEN** API 回傳訂單陣列
- **THEN** table 顯示每筆訂單的編號、金額、狀態 badge 與建立時間

#### Scenario: 訂單列表為空
- **WHEN** API 回傳空陣列
- **THEN** 頁面顯示「目前沒有訂單」提示文字

### Requirement: 後台訂單列表頁顯示載入中狀態
頁面 SHALL 在 API 請求進行期間顯示 loading 指示器。

#### Scenario: 資料載入中
- **WHEN** `fetchOrders()` 尚未回傳結果
- **THEN** 頁面顯示「載入中...」

### Requirement: 後台訂單列表頁處理 API 錯誤
頁面 SHALL 在 API 呼叫失敗時顯示錯誤訊息。

#### Scenario: API 呼叫失敗
- **WHEN** `fetchOrders()` 拋出錯誤
- **THEN** 頁面顯示「載入訂單失敗，請稍後再試」，不顯示 table

### Requirement: 後台 Sidebar 包含訂單管理導覽連結
後台 Sidebar SHALL 顯示「訂單管理」連結，點擊後導向 `/admin/orders`。

#### Scenario: 點擊訂單管理連結
- **WHEN** 使用者點擊後台 Sidebar 中的「訂單管理」
- **THEN** 路由切換至 `/admin/orders`，訂單列表頁渲染於主內容區
