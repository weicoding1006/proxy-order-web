## Why

前台一般使用者目前無法在訂單詳情 Modal 中看到訂單的進度狀態流程，也無法自行取消尚未出貨的訂單，導致使用者體驗不完整、需透過管理員才能取消訂單。

## What Changes

- 在 `OrderDetailModal` 中加入視覺化的訂單狀態進度條（status progress bar），讓使用者一眼看出目前訂單處於哪個階段
- 呼叫 `getStatusEnums` API 取得狀態列表，以動態呈現完整進度流程
- 在訂單狀態為 `Pending`、`Confirmed` 時（即尚未進入 `Shipped`），顯示「取消訂單」按鈕
- 點擊取消訂單後呼叫 `updateOrderStatus(id, 'Cancelled')` 將訂單更新為 `Cancelled`
- 取消成功後關閉 Modal 並重新整理訂單列表

## Capabilities

### New Capabilities

- `order-status-progress`: 在訂單詳情 Modal 中顯示狀態進度條，標示目前所處步驟

### Modified Capabilities

- `order-detail-modal`: 新增狀態進度條顯示、以及前台使用者可取消訂單的按鈕與互動邏輯

## Impact

- `src/components/OrderDetailModal.tsx`：主要修改目標，新增進度條與取消按鈕
- `src/api/order.ts`：已有 `getStatusEnums` 與 `updateOrderStatus`，直接引用
- 訂單列表頁面（如 `ConsumerOrderList` 或類似元件）：取消後需觸發列表重新整理
