## 1. Sidebar 元件

- [x] 1.1 建立 `src/components/Sidebar.tsx`，以 `useState` 管理 `collapsed` 狀態
- [x] 1.2 實作收合/展開切換按鈕
- [x] 1.3 實作導覽連結列表（首頁、商品管理），展開時顯示圖示＋文字，收合時僅顯示圖示
- [x] 1.4 使用 React Router `<NavLink>` 實作當前頁高亮樣式

## 2. AppLayout 元件

- [x] 2.1 建立 `src/layouts/AppLayout.tsx`，左側放 `<Sidebar>`，右側放 `<Outlet>`
- [x] 2.2 確保 Layout 高度填滿視窗（`min-h-screen`），Sidebar 收合時主內容區自動擴展

## 3. 路由更新

- [x] 3.1 修改 `src/router/index.tsx`，根路由 element 改為 `<AppLayout>`，現有頁面路由（`/`、`*`）移至子路由
