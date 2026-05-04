## MODIFIED Requirements

### Requirement: Modal 顯示訂單基本資訊與商品明細
Modal SHALL 呼叫 `fetchOrderById(id)` 並顯示訂單編號（完整）、金額、狀態、建立時間，以及商品明細 table（商品名稱、數量、單價、小計）。Modal 亦 SHALL 呼叫 `getStatusEnums` 取得狀態列表，並以狀態進度條方式呈現訂單目前所處步驟。

#### Scenario: 成功載入訂單詳情
- **WHEN** `fetchOrderById` 回傳訂單資料
- **THEN** Modal 顯示完整訂單編號、金額、狀態、建立時間，以及每筆 item 的商品名稱、quantity、unitPrice、小計，並顯示狀態進度條

#### Scenario: 訂單無商品明細
- **WHEN** `fetchOrderById` 回傳的 items 為 null 或空陣列
- **THEN** Modal 顯示「無商品明細」提示，不渲染 table

## ADDED Requirements

### Requirement: 前台使用者可取消尚未出貨的訂單
OrderDetailModal SHALL 在訂單狀態為 `Pending` 或 `Confirmed` 時顯示「取消訂單」按鈕。使用者點擊後 SHALL 呼叫 `updateOrderStatus(id, 'Cancelled')`，成功後關閉 Modal 並通知父元件重新整理訂單列表。

#### Scenario: 顯示取消按鈕（Pending）
- **WHEN** 訂單狀態為 `Pending`
- **THEN** Modal 底部顯示「取消訂單」按鈕

#### Scenario: 顯示取消按鈕（Confirmed）
- **WHEN** 訂單狀態為 `Confirmed`
- **THEN** Modal 底部顯示「取消訂單」按鈕

#### Scenario: 不顯示取消按鈕（Shipped 以後）
- **WHEN** 訂單狀態為 `Shipped`、`Completed` 或 `Cancelled`
- **THEN** Modal 不顯示「取消訂單」按鈕

#### Scenario: 取消訂單成功
- **WHEN** 使用者點擊「取消訂單」且 `updateOrderStatus` 呼叫成功
- **THEN** Modal 關閉，父元件重新整理訂單列表，列表中該訂單狀態更新為 `Cancelled`

#### Scenario: 取消訂單期間禁用按鈕
- **WHEN** `updateOrderStatus` 請求進行中
- **THEN** 「取消訂單」按鈕處於 disabled 狀態，防止重複送出

#### Scenario: 取消訂單失敗
- **WHEN** `updateOrderStatus` 呼叫失敗
- **THEN** Modal 顯示錯誤訊息「取消訂單失敗，請稍後再試」，Modal 不關閉
