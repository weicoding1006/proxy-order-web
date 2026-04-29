## Why

目前平台使用全頁路由切換，缺乏統一的導覽結構。後台管理平台需要一個持久可見、可收合的側邊選單，讓使用者能快速在各頁面間切換，同時保持主內容區域的操作空間。

## What Changes

- 新增 `Layout` 元件，包含左側 Sidebar 與右側主內容區
- Sidebar 顯示導覽連結（首頁、商品管理等），可收合為 icon-only 模式
- **BREAKING**：路由結構改為巢狀，所有頁面路由包在 Layout 內，取代目前的平面路由設計
- `src/router/index.tsx` 新增巢狀路由，根路由使用 Layout 作為 element

## Capabilities

### New Capabilities
- `sidebar-nav`: 左側可收合導覽選單，含連結列表與收合按鈕，展開時顯示文字+圖示、收合時僅顯示圖示
- `app-layout`: 全域 Layout 元件，將 Sidebar 與主內容區組合為完整頁面框架

### Modified Capabilities
<!-- 無現有 spec 需修改 -->

## Impact

- `src/router/index.tsx`：改為巢狀路由結構
- 新增 `src/components/Sidebar.tsx`
- 新增 `src/layouts/AppLayout.tsx`
- 無新增外部依賴（使用 React Router `<Outlet>`、Tailwind）
