## Context

`OrderDetailModal` 目前只顯示訂單的靜態文字狀態（`order.status`），前台使用者無法直觀了解訂單進度，也無法自行取消訂單。後端已提供 `getStatusEnums`（取得所有狀態枚舉）與 `updateOrderStatus`（更新訂單狀態）兩支 API，前端尚未使用。

訂單狀態流程為：`Pending → Confirmed → Shipped → Completed`，以及可從 Pending/Confirmed 跳至 `Cancelled`。

## Goals / Non-Goals

**Goals:**
- 在 `OrderDetailModal` 顯示動態狀態進度條，標示目前所處步驟
- 在狀態為 `Pending` 或 `Confirmed` 時顯示「取消訂單」按鈕
- 呼叫 `updateOrderStatus(id, 'Cancelled')` 完成取消，並在成功後重新整理訂單列表

**Non-Goals:**
- 管理員後台的狀態操作流程（已在另一頁面處理）
- 除取消以外的其他狀態更改（前台不允許）
- 推播通知或 email 通知

## Decisions

### 決策 1：進度條狀態來源

**採用**：元件 mount 時呼叫 `getStatusEnums` 動態取得狀態列表，而非硬編碼陣列。

**理由**：後端若新增或調整狀態，前端不需修改。但因進度條的視覺順序需固定（Cancelled 不應出現在主流程），前端會過濾掉 `Cancelled`，只顯示主流程狀態。

**替代方案**：硬編碼 `['Pending','Confirmed','Shipped','Completed']` — 較簡單，但與後端耦合高，故不採用。

### 決策 2：取消後的列表重新整理方式

**採用**：透過 `onClose` prop 呼叫後，由父元件的 `onCancel` callback 重新觸發 `fetchOrders`，而非在 Modal 內部直接操作父狀態。

**理由**：維持單向資料流，Modal 不需知道父層列表的實作細節。父元件傳入可選的 `onOrderCancelled` callback，Modal 取消成功後呼叫它再關閉。

### 決策 3：可取消的狀態範圍

僅在 `Pending` 與 `Confirmed` 時顯示取消按鈕，`Shipped` 之後不可取消，與題目需求一致。前端以狀態字串比對，後端應同樣有驗證（防止繞過）。

## Risks / Trade-offs

- **競態條件**：使用者在短時間內多次點擊取消 → 以 `loading` state 禁用按鈕後再送出請求來緩解
- **狀態枚舉 API 失敗**：進度條無法渲染 → 退化為只顯示文字狀態，不阻斷主要資訊顯示
- **狀態名稱多語系**：後端回傳英文，前端顯示英文或自行 mapping 中文 → 本次先以英文顯示，後續可加 i18n map
