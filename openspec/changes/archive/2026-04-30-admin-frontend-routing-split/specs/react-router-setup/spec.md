## MODIFIED Requirements

### Requirement: Config-based 路由定義（前後台分離）
`src/router/index.tsx` MUST 使用 `createBrowserRouter` 定義兩個獨立的巢狀路由群組：ConsumerLayout（`/*`）與 AdminLayout（`/admin/*`）。

#### Scenario: 前台路由群組
- **WHEN** 開發者開啟 `src/router/index.tsx`
- **THEN** 可見以 ConsumerLayout 為 element 的路由群組，包含 `/`（商品列表）與 `/my-orders`（我的訂單）

#### Scenario: 後台路由群組
- **WHEN** 開發者開啟 `src/router/index.tsx`
- **THEN** 可見以 AdminLayout 為 element 的路由群組，包含 `/admin/products` 與 `/admin/orders`

### Requirement: RouterProvider 掛載
`src/main.tsx` MUST 使用 `<RouterProvider router={router} />` 掛載路由。

#### Scenario: RouterProvider 正確掛載
- **WHEN** 應用程式啟動
- **THEN** 根元件使用 `RouterProvider` 而非傳統 `<BrowserRouter>`

### Requirement: 404 頁面處理
路由設定 SHALL 包含 `*` wildcard 路由，渲染 `NotFoundPage`。

#### Scenario: 404 頁面處理
- **WHEN** 使用者瀏覽不存在的路徑
- **THEN** 頁面渲染 `NotFoundPage` 元件
