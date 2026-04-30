## MODIFIED Requirements

### Requirement: ConsumerLayout Header 顯示網站品牌、導覽、倒數與登出
ConsumerLayout Header SHALL 顯示網站名稱、前台導覽連結（商品列表、我的訂單）、token 剩餘時間倒數（格式 `HH:MM:SS`）與登出按鈕。

#### Scenario: Header 導覽連結正確
- **WHEN** ConsumerLayout 渲染
- **THEN** Header 包含連結至 `/`（商品列表）與 `/my-orders`（我的訂單）

#### Scenario: Header 顯示 token 倒數
- **WHEN** 使用者訪問任何前台路由且 token 有效
- **THEN** Header 右側顯示格式為 `HH:MM:SS` 的剩餘時間，每秒更新

#### Scenario: Token 到期自動登出
- **WHEN** token 倒數歸零
- **THEN** 系統自動清除 auth 並跳轉至 `/login`

#### Scenario: 點擊登出按鈕
- **WHEN** 使用者點擊 Header 中的登出按鈕
- **THEN** 系統清除 auth 並跳轉至 `/login`
