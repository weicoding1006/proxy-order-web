## 1. 訂單列表頁面

- [x] 1.1 建立 `src/pages/OrdersPage.tsx`，以 `useState` + `useEffect` 呼叫 `fetchOrders()`，管理 orders / loading / error 狀態
- [x] 1.2 實作 loading 狀態 UI（顯示「載入中...」）
- [x] 1.3 實作 error 狀態 UI（顯示「載入訂單失敗，請稍後再試」）
- [x] 1.4 實作訂單 table，欄位：訂單編號（前 8 碼 + `...`）、金額（`NT$ {totalAmount}`）、狀態 badge、建立時間
- [x] 1.5 處理空陣列情況，顯示「目前沒有訂單」

## 2. 導覽與路由

- [x] 2.1 在 `src/components/Sidebar.tsx` 的 `navItems` 新增「訂單管理」（圖示 📋，路徑 `/orders`）
- [x] 2.2 在 `src/router/index.tsx` 的 children 新增 `/orders` 子路由，element 為 `<OrdersPage>`
