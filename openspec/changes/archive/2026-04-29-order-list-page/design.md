## Context

專案已有 `src/api/order.ts` 提供 `fetchOrders()`，回傳 `OrderResponse[]`（id、userId、totalAmount、status、createdAt、items）。Sidebar 目前硬編碼在 `Sidebar.tsx` 的 `navItems` 陣列，新增導覽項目只需加一筆即可。路由採巢狀結構，新增頁面只需在 `router/index.tsx` 的 children 中加入新子路由。

## Goals / Non-Goals

**Goals:**
- 新增 `/orders` 路由，渲染訂單列表頁
- 以 table 呈現訂單（編號截短顯示、金額格式化、狀態 badge、建立時間）
- loading / error / 空列表三種狀態處理
- Sidebar 新增「訂單管理」連結

**Non-Goals:**
- 訂單詳情頁（`/orders/:id`）
- 訂單篩選、排序、分頁
- 建立訂單 UI

## Decisions

### 訂單狀態以 badge 顯示，顏色依狀態區分

`status` 欄位為後端字串（可能為 null），以 badge 呈現較直覺。顏色映射：預設灰色，可依後續確認的狀態值擴充。

### 訂單 ID 截短顯示

UUID 較長，table 中只顯示前 8 碼加 `...`，搭配 `title` attribute 顯示完整 ID。

### 與 HomePage 相同的 local state 模式（useState + useEffect）

一致性考量，無需引入新的資料獲取模式。

## Risks / Trade-offs

- **`status` 值未確定** → 後端回傳的 status 字串尚不明確，先以通用 badge 處理，後續補充顏色映射
- **`userId` 可能為 null** → table 中顯示 `—` 作為佔位
