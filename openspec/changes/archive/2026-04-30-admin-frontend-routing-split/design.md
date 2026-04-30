## Context

現有路由結構：所有頁面（`/`、`/orders`）由單一 `AppLayout` 包覆，沒有前後台之分。登入/註冊頁獨立。目前已開發的頁面（商品列表、訂單）屬後台功能。需在不拆分專案的前提下，將路由拆分為前台（消費者）與後台（管理員）兩個獨立的路由群組。

## Goals / Non-Goals

**Goals:**
- 現有頁面路由遷移至 `/admin/*`，不破壞功能
- 新增 `/` 前台路由群組，有獨立 Layout
- 兩套 Layout 在同一 Vite 專案共存
- 不引入 role guard（權限控制為後續工作）

**Non-Goals:**
- API 區分 admin / user（暫不實作）
- Role-based 路由保護
- 開新 Vite 專案

## Decisions

### 路由結構：巢狀路由群組

採用 React Router v6 巢狀路由，將 `/admin/*` 與 `/*` 各自以 Layout 組件包覆：

```
/ (ConsumerLayout)
  /              → ConsumerProductListPage
  /my-orders     → ConsumerOrderListPage
  /login         → LoginPage（無 Layout）
  /register      → RegisterPage（無 Layout）

/admin (AdminLayout)
  /admin/products → 現有 HomePage（商品管理）
  /admin/orders   → 現有 OrdersPage（訂單管理）
```

替代方案：條件式 Layout（同一路由依 URL 切換 Layout）— 拒絕，程式碼複雜且難以維護。

### 現有頁面：原地重命名，不搬移檔案

將 `HomePage.tsx` / `OrdersPage.tsx` 保留原路徑，只更新路由設定與 Sidebar 連結，減少 PR diff。若未來需要重組目錄再處理。

替代方案：立即搬移至 `pages/admin/` — 延後，避免此 PR 改動太多檔案。

### AdminLayout：現有 AppLayout 直接改名

`AppLayout.tsx` 重命名為 `AdminLayout.tsx`，內容不變。ConsumerLayout 另行新增，初期可為簡易頂部 Header + Outlet。

## Risks / Trade-offs

- [風險] Sidebar 導覽連結硬寫 `/admin/` 前綴，未來若路徑結構再改需全部更新 → 用常數集中管理路徑
- [風險] 前台無身份驗證保護，任何人可存取消費者頁面 → 此為已知 non-goal，後續 sprint 補上 guard
- [取捨] 頁面檔案不搬移目錄 → 目錄結構暫時不直觀，但降低此次改動風險

## Migration Plan

1. 更新 `router/index.tsx`：新增 AdminLayout 群組（`/admin/*`）、ConsumerLayout 群組（`/*`）
2. 將 `AppLayout.tsx` 重命名為 `AdminLayout.tsx`，匯入路徑同步更新
3. 新增 `ConsumerLayout.tsx`（最小實作：Header + Outlet）
4. 更新 `Sidebar.tsx` 導覽連結至 `/admin/products`、`/admin/orders`
5. 新增前台頁面（ConsumerProductListPage、ConsumerOrderListPage）
6. 手動測試：後台路由正常、前台路由正常、登入/登出流程不受影響

Rollback：git revert，影響範圍僅 router 與 layouts，無 API 或資料異動。
