## Why

訂單列表頁已有「檢視」按鈕，但點擊後無任何反應。管理人員需要能快速查看單筆訂單的完整資訊（包含商品明細），而不必離開列表頁面。以 Modal 呈現可保持操作流暢度。

## What Changes

- 點擊「檢視」按鈕時，呼叫 `fetchOrderById(id)` 取得訂單詳情並開啟 Modal
- Modal 顯示訂單基本資訊（編號、金額、狀態、建立時間）與商品明細 table（productId、數量、單價、小計）
- Modal 含載入中與錯誤狀態處理，以及關閉按鈕
- 修改 `OrdersPage.tsx` 的「檢視」按鈕接上 Modal 邏輯

## Capabilities

### New Capabilities
- `order-detail-modal`: 訂單詳情彈跳視窗，點擊列表「檢視」後呼叫 `fetchOrderById`，顯示訂單資訊與商品明細，含 loading / error / 關閉功能

### Modified Capabilities
<!-- 無現有 spec 需修改 -->

## Impact

- 修改 `src/pages/OrdersPage.tsx`：新增 selectedOrderId state，接上「檢視」按鈕的 onClick
- 新增 `src/components/OrderDetailModal.tsx`：Modal 元件，接受 orderId 與 onClose props
- 使用既有 `src/api/order.ts` 的 `fetchOrderById`，無需修改
- 無新增外部依賴
