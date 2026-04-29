## Context

首頁 (`src/pages/HomePage.tsx`) 目前為靜態頁面，僅顯示歡迎文字。專案已有完整的 HTTP 層（`src/lib/http.ts` 的 axios wrapper）與商品 API 模組（`src/api/product.ts`），但尚未在任何頁面實際呼叫。

## Goals / Non-Goals

**Goals:**
- 首頁載入時呼叫 `fetchProducts()` 取得商品列表
- 以卡片網格呈現商品（名稱、價格、庫存、上架狀態）
- 處理 loading 與 error 狀態，提供良好使用體驗

**Non-Goals:**
- 分頁、搜尋、篩選功能
- Redux / 全域狀態管理（首頁獨立使用 local state 即可）
- 商品詳情頁串接

## Decisions

### 使用 React local state（useState + useEffect），不引入 Redux

首頁的商品列表目前不需要跨元件共享，用 Redux 會增加不必要的樣板程式碼。若未來需要跨頁共用商品狀態再遷移。

### 不抽取自訂 hook

資料獲取邏輯只有一個呼叫點，直接放在 `HomePage` 中即可。若後續多個頁面都需要商品列表，再抽取 `useProducts` hook。

## Risks / Trade-offs

- **API 尚未啟動** → 開發期間用 Vite proxy 指向後端，若後端未啟動會看到錯誤訊息（error state 已處理）
- **無快取機制** → 每次進入首頁都重新 fetch，暫時可接受，後續可考慮 React Query
