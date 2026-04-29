## Why

平台已有訂單 API（`fetchOrders`、`fetchOrderById`），但目前沒有任何 UI 頁面可以瀏覽訂單。後台管理人員需要一個專門的訂單列表頁來查看所有訂單的狀態與金額。

## What Changes

- 新增訂單列表頁面 `src/pages/OrdersPage.tsx`，呼叫 `fetchOrders()` 顯示所有訂單
- 在 Sidebar 導覽中新增「訂單管理」連結（路徑：`/orders`）
- 在 `src/router/index.tsx` 新增 `/orders` 子路由

## Capabilities

### New Capabilities
- `order-list`: 訂單列表頁，以 table 顯示所有訂單（編號、金額、狀態、建立時間），含 loading / error 狀態處理

### Modified Capabilities
<!-- 無現有 spec 需修改 -->

## Impact

- 新增 `src/pages/OrdersPage.tsx`
- 修改 `src/components/Sidebar.tsx`：新增「訂單管理」導覽項目
- 修改 `src/router/index.tsx`：新增 `/orders` 子路由
- 使用既有 `src/api/order.ts` 的 `fetchOrders`，無需修改
