## MODIFIED Requirements

### Requirement: ConsumerLayout Header 顯示網站品牌、導覽、倒數與登出
ConsumerLayout Header SHALL 顯示網站名稱、前台導覽連結（商品列表、我的訂單、我的收藏）、token 剩餘時間倒數（格式 `HH:MM:SS`）與登出按鈕。

#### Scenario: Header 導覽連結正確
- **WHEN** ConsumerLayout 渲染
- **THEN** Header 包含連結至 `/`（商品列表）、`/my-orders`（我的訂單）與 `/favorites`（我的收藏）

#### Scenario: Header 顯示 token 倒數
- **WHEN** 使用者訪問任何前台路由且 token 有效
- **THEN** Header 右側顯示格式為 `HH:MM:SS` 的剩餘時間，每秒更新

#### Scenario: Token 到期自動登出
- **WHEN** token 倒數歸零
- **THEN** 系統自動清除 auth 並跳轉至 `/login`

#### Scenario: 點擊登出按鈕
- **WHEN** 使用者點擊 Header 中的登出按鈕
- **THEN** 系統清除 auth 並跳轉至 `/login`

## ADDED Requirements

### Requirement: ConsumerLayout 初始化載入收藏清單
ConsumerLayout SHALL 在掛載時，與購物車並列，從後端載入使用者收藏清單至 Redux store。

#### Scenario: 使用者已登入時載入收藏
- **WHEN** ConsumerLayout 掛載且 token 存在
- **THEN** 同時 dispatch `loadCart` 與 `loadFavorites`，確保收藏狀態在所有頁面可用
