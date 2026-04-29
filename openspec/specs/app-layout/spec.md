## Requirements

### Requirement: AppLayout 組合 Sidebar 與主內容區
AppLayout SHALL 將 Sidebar 與主內容區（`<Outlet>`）並排排列，Sidebar 在左、內容區在右，共同填滿視窗高度。

#### Scenario: 頁面正常渲染
- **WHEN** 使用者訪問任何受 AppLayout 包覆的路由
- **THEN** 頁面左側顯示 Sidebar，右側顯示對應路由的頁面內容

#### Scenario: Sidebar 收合時主內容區擴展
- **WHEN** Sidebar 切換為收合狀態
- **THEN** 主內容區水平空間增加，填補 Sidebar 縮減的寬度

### Requirement: 所有頁面路由包覆於 AppLayout 下
路由設定 SHALL 使用巢狀路由，以 AppLayout 作為根路由的 element，所有頁面路由作為子路由。

#### Scenario: 路由正確渲染 Layout
- **WHEN** 使用者訪問任何應用路由（如 `/`、`/products`）
- **THEN** AppLayout（含 Sidebar）始終顯示，頁面內容渲染於 Outlet 位置
