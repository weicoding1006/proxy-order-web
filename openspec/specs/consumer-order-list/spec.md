## Requirements

<!-- Original requirements below. Hiyori UI requirements added via hiyori-consumer-ui-redesign change. -->

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

### Requirement: Order list page with Hiyori minimal table
The order list page SHALL display orders in a table with `var(--paper)` background, 1px `var(--bone)` row dividers, no outer border-radius. Columns: 訂單編號 (truncated mono), 金額 (serif), 狀態 (badge), 建立時間, 操作. The page title `我的訂單` SHALL use `var(--font-display)` at 36px weight 400.

#### Scenario: Orders displayed in table
- **WHEN** orders are loaded
- **THEN** each order SHALL show in a table row with all columns

#### Scenario: Empty orders state
- **WHEN** user has no orders
- **THEN** centered `目前沒有訂單` message in `var(--ink-3)` SHALL display

### Requirement: Status badge in Hiyori palette
The status badge SHALL be a small inline-block with padding 2px 8px, font-size 11px, letter-spacing 0.1em, border-radius 2px (not pill). Status mapping: Pending→amber, Confirmed→blue, Completed→green, Cancelled→gray, default→muted.

#### Scenario: Status badge colors by status
- **WHEN** an order has status "Pending"
- **THEN** the badge SHALL render with amber (`var(--yuhi)`) foreground and `var(--yuhi-light)` background

### Requirement: View order button in Hiyori style
The 檢視 button SHALL use transparent background, 1px `var(--ink)` border, 2px border-radius, 6px 16px padding. Hover SHALL invert to ink background with paper text.

#### Scenario: View button opens detail modal
- **WHEN** user clicks 檢視
- **THEN** the OrderDetailModal SHALL open for that order
