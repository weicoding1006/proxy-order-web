## ADDED Requirements

### Requirement: 點擊「檢視」開啟訂單詳情 Modal
訂單列表的「檢視」按鈕 SHALL 在被點擊時開啟 Modal，顯示對應訂單的詳細資訊。

#### Scenario: 點擊檢視按鈕
- **WHEN** 使用者點擊某筆訂單的「檢視」按鈕
- **THEN** 畫面出現覆蓋全頁的 Modal，顯示該訂單的詳情

### Requirement: Modal 顯示訂單基本資訊與商品明細
Modal SHALL 呼叫 `fetchOrderById(id)` 並顯示訂單編號（完整）、金額、狀態、建立時間，以及商品明細 table（productId、數量、單價、小計）。

#### Scenario: 成功載入訂單詳情
- **WHEN** `fetchOrderById` 回傳訂單資料
- **THEN** Modal 顯示完整訂單編號、金額、狀態、建立時間，以及每筆 item 的 productId、quantity、unitPrice、小計

#### Scenario: 訂單無商品明細
- **WHEN** `fetchOrderById` 回傳的 items 為 null 或空陣列
- **THEN** Modal 顯示「無商品明細」提示，不渲染 table

### Requirement: Modal 顯示載入中狀態
Modal SHALL 在 API 請求進行期間顯示 loading 指示。

#### Scenario: 資料載入中
- **WHEN** `fetchOrderById` 尚未回傳結果
- **THEN** Modal 內部顯示「載入中...」

### Requirement: Modal 顯示 API 錯誤
Modal SHALL 在 `fetchOrderById` 失敗時顯示錯誤訊息。

#### Scenario: API 呼叫失敗
- **WHEN** `fetchOrderById` 拋出錯誤
- **THEN** Modal 顯示「載入訂單詳情失敗」

### Requirement: Modal 可關閉
Modal SHALL 提供關閉按鈕，點擊後關閉 Modal 並回到訂單列表。點擊 backdrop 也應關閉 Modal。

#### Scenario: 點擊關閉按鈕
- **WHEN** 使用者點擊 Modal 的「✕」按鈕
- **THEN** Modal 關閉，訂單列表恢復正常顯示

#### Scenario: 點擊背景關閉
- **WHEN** 使用者點擊 Modal 外部的半透明背景
- **THEN** Modal 關閉
