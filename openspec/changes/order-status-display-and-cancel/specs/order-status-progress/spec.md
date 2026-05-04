## ADDED Requirements

### Requirement: 訂單詳情顯示狀態進度條
OrderDetailModal SHALL 在訂單基本資訊上方或下方顯示狀態進度條，呈現完整的主流程步驟（Pending → Confirmed → Shipped → Completed），並標示目前訂單所處的步驟。

#### Scenario: 成功載入狀態枚舉並顯示進度條
- **WHEN** `getStatusEnums` 回傳狀態列表且訂單狀態為主流程中的某一步驟
- **THEN** 進度條顯示所有主流程步驟，目前步驟以高亮樣式標示，之前步驟標示為已完成

#### Scenario: 訂單狀態為 Cancelled
- **WHEN** 訂單狀態為 `Cancelled`
- **THEN** 進度條顯示「已取消」標示，不顯示主流程步驟的進度

#### Scenario: 狀態枚舉 API 失敗
- **WHEN** `getStatusEnums` 呼叫失敗
- **THEN** 進度條不顯示，訂單其他資訊仍正常呈現
