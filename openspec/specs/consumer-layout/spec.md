## Requirements

### Requirement: ConsumerLayout 提供前台頁面框架
ConsumerLayout SHALL 為前台路由提供獨立的頁面骨架，包含頂部 Header 與主內容區（`<Outlet>`），樣式與後台 AdminLayout 相互獨立。

#### Scenario: 前台路由渲染 ConsumerLayout
- **WHEN** 使用者訪問任何前台路由（如 `/`、`/my-orders`）
- **THEN** 頁面顯示 ConsumerLayout 的 Header，主內容區渲染對應路由的頁面元件

#### Scenario: ConsumerLayout 不顯示後台 Sidebar
- **WHEN** 使用者訪問前台路由
- **THEN** 頁面不包含後台 Sidebar 元件

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
