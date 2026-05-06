## ADDED Requirements

### Requirement: 商品卡片可點擊進入詳情頁
ConsumerProductListPage 的每張商品卡片 SHALL 為可點擊元素，點擊後導向 `/products/:id`，其中 `:id` 為該商品 `id`。

#### Scenario: 點擊商品卡片
- **WHEN** 使用者點擊任一商品卡片
- **THEN** 路由切換至 `/products/{product.id}`，呈現對應的 ConsumerProductDetailPage

#### Scenario: 鍵盤可達性
- **WHEN** 使用者以鍵盤 Tab 焦點移到卡片並按下 Enter
- **THEN** 路由切換至 `/products/{product.id}`
