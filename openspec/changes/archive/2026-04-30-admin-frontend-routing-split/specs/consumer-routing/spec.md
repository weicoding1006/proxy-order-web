## ADDED Requirements

### Requirement: 前台路由群組以 ConsumerLayout 包覆
路由設定 SHALL 建立一個以 ConsumerLayout 為 element 的巢狀路由群組，涵蓋 `/` 與 `/my-orders`。

#### Scenario: 前台首頁路由
- **WHEN** 使用者瀏覽 `/`
- **THEN** ConsumerLayout 渲染，主內容區顯示 ConsumerProductListPage

#### Scenario: 前台我的訂單路由
- **WHEN** 使用者瀏覽 `/my-orders`
- **THEN** ConsumerLayout 渲染，主內容區顯示 ConsumerOrderListPage

### Requirement: 後台路由群組以 AdminLayout 包覆
路由設定 SHALL 建立一個以 AdminLayout 為 element 的巢狀路由群組，路徑前綴為 `/admin`，涵蓋 `/admin/products` 與 `/admin/orders`。

#### Scenario: 後台商品管理路由
- **WHEN** 使用者瀏覽 `/admin/products`
- **THEN** AdminLayout 渲染，主內容區顯示商品管理頁（原 HomePage）

#### Scenario: 後台訂單管理路由
- **WHEN** 使用者瀏覽 `/admin/orders`
- **THEN** AdminLayout 渲染，主內容區顯示訂單管理頁（原 OrdersPage）

#### Scenario: 前台路由不顯示後台 Layout
- **WHEN** 使用者瀏覽 `/` 或 `/my-orders`
- **THEN** 頁面不包含 AdminLayout 或後台 Sidebar
