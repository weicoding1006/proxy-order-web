## MODIFIED Requirements

### Requirement: ConsumerLayout Header 顯示網站品牌、導覽、倒數與登出
ConsumerLayout Header SHALL 顯示網站名稱、前台導覽連結（商品列表、我的訂單、購物車）、token 剩餘時間倒數（格式 `HH:MM:SS`）與登出按鈕。購物車連結 SHALL 顯示目前購物車項目數量徽章；當數量為 0 時 SHALL 不顯示徽章。

#### Scenario: Header 導覽連結正確
- **WHEN** ConsumerLayout 渲染
- **THEN** Header 包含連結至 `/`（商品列表）、`/my-orders`（我的訂單）、`/cart`（購物車）

#### Scenario: Header 顯示 token 倒數
- **WHEN** 使用者訪問任何前台路由且 token 有效
- **THEN** Header 右側顯示格式為 `HH:MM:SS` 的剩餘時間，每秒更新

#### Scenario: Token 到期自動登出
- **WHEN** token 倒數歸零
- **THEN** 系統自動清除 auth 並跳轉至 `/login`

#### Scenario: 點擊登出按鈕
- **WHEN** 使用者點擊 Header 中的登出按鈕
- **THEN** 系統清除 auth 並跳轉至 `/login`

#### Scenario: 購物車徽章顯示項目數
- **WHEN** 購物車有 N 個項目（N > 0）
- **THEN** 「購物車」連結顯示徽章內容為 N

#### Scenario: 購物車為空時不顯示徽章
- **WHEN** 購物車項目數為 0
- **THEN** 「購物車」連結不顯示徽章

## ADDED Requirements

### Requirement: ConsumerLayout 載入時同步購物車摘要
ConsumerLayout SHALL 在掛載且使用者已登入時，dispatch `getCart()` 載入購物車摘要至 Redux store，供 Header 徽章與 ConsumerCartPage 共用。

#### Scenario: 首次掛載載入購物車
- **WHEN** ConsumerLayout 首次掛載且 token 有效
- **THEN** 系統呼叫 `getCart()` 並更新 cart slice

#### Scenario: 購物車尚未建立
- **WHEN** `getCart()` 回傳 404 或空 `items`
- **THEN** cart slice 設為 `{ items: [], totalAmount: 0 }`，徽章不顯示
