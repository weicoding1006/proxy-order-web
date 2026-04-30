## MODIFIED Requirements

### Requirement: AdminLayout 組合 Sidebar 與主內容區
AdminLayout（原 AppLayout）SHALL 將 Sidebar 與主內容區（`<Outlet>`）並排排列，Sidebar 在左、內容區在右，共同填滿視窗高度。

#### Scenario: 後台頁面正常渲染
- **WHEN** 使用者訪問任何受 AdminLayout 包覆的路由（`/admin/*`）
- **THEN** 頁面左側顯示後台 Sidebar，右側顯示對應路由的頁面內容

#### Scenario: Sidebar 收合時主內容區擴展
- **WHEN** Sidebar 切換為收合狀態
- **THEN** 主內容區水平空間增加，填補 Sidebar 縮減的寬度

### Requirement: 所有後台頁面路由包覆於 AdminLayout 下
路由設定 SHALL 使用巢狀路由，以 AdminLayout 作為 `/admin` 路由群組的 element，後台頁面路由作為子路由。

#### Scenario: 後台路由正確渲染 AdminLayout
- **WHEN** 使用者訪問任何後台路由（如 `/admin/products`、`/admin/orders`）
- **THEN** AdminLayout（含 Sidebar）始終顯示，頁面內容渲染於 Outlet 位置

#### Scenario: 前台路由不渲染 AdminLayout
- **WHEN** 使用者訪問前台路由（如 `/`）
- **THEN** AdminLayout 不渲染，顯示 ConsumerLayout
