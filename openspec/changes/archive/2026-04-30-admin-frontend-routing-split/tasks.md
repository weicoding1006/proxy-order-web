## 1. 重構現有 Layout 與路由

- [x] 1.1 將 `src/layouts/AppLayout.tsx` 重命名為 `AdminLayout.tsx`，更新元件名稱
- [x] 1.2 更新 `src/router/index.tsx` 中 AdminLayout 的匯入路徑
- [x] 1.3 更新 `src/components/Sidebar.tsx` 導覽連結：`/` → `/admin/products`，`/orders` → `/admin/orders`
- [x] 1.4 更新路由設定：後台路由群組改用路徑前綴 `/admin`（`/admin/products`、`/admin/orders`）

## 2. 新增前台 ConsumerLayout

- [x] 2.1 新增 `src/layouts/ConsumerLayout.tsx`，包含頂部 Header（含網站名稱、前台導覽連結）與 `<Outlet>`
- [x] 2.2 Header 導覽連結：連至 `/`（商品列表）與 `/my-orders`（我的訂單）

## 3. 新增前台頁面

- [x] 3.1 新增 `src/pages/ConsumerProductListPage.tsx`，呼叫 `fetchProducts()`，只顯示 `isActive === true` 的商品卡片
- [x] 3.2 新增 `src/pages/ConsumerOrderListPage.tsx`，呼叫 `fetchOrders()`，以 table 顯示當前用戶訂單

## 4. 更新路由設定

- [x] 4.1 在 `src/router/index.tsx` 新增前台路由群組（ConsumerLayout）：`/` → ConsumerProductListPage，`/my-orders` → ConsumerOrderListPage
- [x] 4.2 確認 404 wildcard 路由仍有效（`*` → NotFoundPage）

## 5. 驗證

- [ ] 5.1 手動測試後台路由：瀏覽 `/admin/products` 與 `/admin/orders`，確認 AdminLayout 與 Sidebar 正常顯示
- [ ] 5.2 手動測試前台路由：瀏覽 `/` 與 `/my-orders`，確認 ConsumerLayout 正常、無後台 Sidebar
- [ ] 5.3 確認登入（`/login`）、註冊（`/register`）流程不受影響
- [ ] 5.4 確認 404 頁面正常渲染
