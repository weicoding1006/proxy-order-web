## 1. API 整合準備

- [x] 1.1 確認 `getStatusEnums` 與 `updateOrderStatus` 已正確 export 自 `src/api/order.ts`

## 2. OrderDetailModal — 狀態進度條

- [x] 2.1 在 `OrderDetailModal` 中呼叫 `getStatusEnums`，將結果存入 state，過濾掉 `Cancelled` 得到主流程列表
- [x] 2.2 實作 `StatusProgressBar` 子元件（或 inline JSX），依主流程列表渲染步驟，並高亮目前步驟
- [x] 2.3 處理訂單狀態為 `Cancelled` 時的顯示：顯示「已取消」標示而非進度條
- [x] 2.4 處理 `getStatusEnums` 失敗時的退化顯示：不渲染進度條，其餘資訊正常顯示

## 3. OrderDetailModal — 取消訂單功能

- [x] 3.1 新增 `onOrderCancelled?: () => void` prop 至 `OrderDetailModal`
- [x] 3.2 根據訂單狀態（`Pending` 或 `Confirmed`）條件渲染「取消訂單」按鈕
- [x] 3.3 實作取消邏輯：呼叫 `updateOrderStatus(orderId, 'Cancelled')`，請求中禁用按鈕
- [x] 3.4 取消成功後：呼叫 `onOrderCancelled?.()` 再呼叫 `onClose()`
- [x] 3.5 取消失敗時：在 Modal 內顯示錯誤訊息，保持 Modal 開啟

## 4. 父元件串接

- [x] 4.1 找到使用 `OrderDetailModal` 的父元件（如 `ConsumerOrderListPage`），傳入 `onOrderCancelled` callback
- [x] 4.2 在 callback 中重新呼叫 `fetchOrders()` 以重新整理列表
