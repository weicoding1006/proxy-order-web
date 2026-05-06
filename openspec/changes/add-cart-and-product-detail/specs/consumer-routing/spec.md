## MODIFIED Requirements

### Requirement: 前台路由群組以 ConsumerLayout 包覆
路由設定 SHALL 建立一個以 ConsumerLayout 為 element 的巢狀路由群組，涵蓋 `/`、`/my-orders`、`/products/:id`、`/cart`。

#### Scenario: 前台首頁路由
- **WHEN** 使用者瀏覽 `/`
- **THEN** ConsumerLayout 渲染，主內容區顯示 ConsumerProductListPage

#### Scenario: 前台我的訂單路由
- **WHEN** 使用者瀏覽 `/my-orders`
- **THEN** ConsumerLayout 渲染，主內容區顯示 ConsumerOrderListPage

#### Scenario: 前台商品詳情路由
- **WHEN** 使用者瀏覽 `/products/{id}`
- **THEN** ConsumerLayout 渲染，主內容區顯示 ConsumerProductDetailPage 並以路由參數 `:id` 載入該商品

#### Scenario: 前台購物車路由
- **WHEN** 使用者瀏覽 `/cart`
- **THEN** ConsumerLayout 渲染，主內容區顯示 ConsumerCartPage
