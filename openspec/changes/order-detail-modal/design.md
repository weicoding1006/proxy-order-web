## Context

`OrdersPage.tsx` 已有「檢視」按鈕（`<button>`），但 onClick 尚未實作。`src/api/order.ts` 已有 `fetchOrderById(id: string)` 回傳 `OrderResponse`（含 `items` 陣列）。整個實作只需在 `OrdersPage` 層管理「目前選取的訂單 ID」，並渲染 Modal 元件。

## Goals / Non-Goals

**Goals:**
- `OrdersPage` 新增 `selectedOrderId` state，點擊「檢視」設值，onClose 清空
- 獨立 `OrderDetailModal` 元件負責 fetch、顯示詳情、處理 loading/error
- Modal 以固定定位覆蓋全頁（backdrop），點擊背景或關閉按鈕可關閉
- 商品明細以 table 顯示（productId、數量、單價、小計）

**Non-Goals:**
- 編輯訂單資料
- 訂單狀態更新操作
- 分頁或篩選 items

## Decisions

### Modal 狀態（loading/error/data）管理於 `OrderDetailModal` 內部

Modal 元件接收 `orderId` prop，自行在 `useEffect` 中呼叫 `fetchOrderById`。這樣 `OrdersPage` 只需管理「要開哪個 Modal」，不需關心 fetch 細節，職責清晰。

### 用 `selectedOrderId: string | null` 控制 Modal 開關

`null` 表示 Modal 關閉，有值表示開啟對應訂單的 Modal。簡單且無需額外 boolean state。

### Modal 以 backdrop 覆蓋，不使用第三方 dialog 套件

無需引入新依賴，用 Tailwind 的 `fixed inset-0` + `z-50` 實作即可。

## Risks / Trade-offs

- **`items` 可能為 null** → 顯示「無商品明細」提示，不渲染 table
- **快速連點多個「檢視」** → 每次點擊重設 selectedOrderId，Modal 重新 fetch，行為正確但無快取；可接受
