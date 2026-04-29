## 1. OrderDetailModal 元件

- [x] 1.1 建立 `src/components/OrderDetailModal.tsx`，接受 `orderId: string` 與 `onClose: () => void` props
- [x] 1.2 以 `useEffect` 呼叫 `fetchOrderById(orderId)`，管理 order / loading / error state
- [x] 1.3 實作 loading 狀態 UI（Modal 內顯示「載入中...」）
- [x] 1.4 實作 error 狀態 UI（Modal 內顯示「載入訂單詳情失敗」）
- [x] 1.5 實作訂單基本資訊區塊（完整編號、金額、狀態、建立時間）
- [x] 1.6 實作商品明細 table（productId、數量、單價、小計），items 為 null 或空時顯示「無商品明細」
- [x] 1.7 實作關閉按鈕（✕）與 backdrop 點擊關閉（onClick onClose）
- [x] 1.8 Modal 以 `fixed inset-0 z-50` 覆蓋全頁，backdrop 半透明黑色背景

## 2. OrdersPage 整合

- [x] 2.1 在 `OrdersPage.tsx` 新增 `selectedOrderId: string | null` state（初始為 null）
- [x] 2.2 「檢視」按鈕的 onClick 設為 `() => setSelectedOrderId(order.id)`
- [x] 2.3 當 `selectedOrderId` 不為 null 時渲染 `<OrderDetailModal orderId={selectedOrderId} onClose={() => setSelectedOrderId(null)} />`
