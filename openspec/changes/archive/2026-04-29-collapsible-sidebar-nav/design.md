## Context

目前路由為平面結構（每個路徑直接對應一個頁面元件），無共用的 Layout 層。React Router v7 支援巢狀路由與 `<Outlet>`，是導入全域 Layout 最自然的方式。

## Goals / Non-Goals

**Goals:**
- 新增 `AppLayout`，由 Sidebar + `<Outlet>` 組成，作為所有頁面的外框
- Sidebar 支援展開（圖示＋文字）/ 收合（僅圖示）兩種模式，以按鈕切換
- 收合狀態用 `useState` 管理於 Sidebar 本身，無需全域狀態

**Non-Goals:**
- RWD 行動裝置 drawer 模式
- 多層巢狀選單（二級項目）
- 使用 Redux 管理 sidebar 開合狀態

## Decisions

### 巢狀路由 + `<Outlet>`，不用 Context 注入 Layout

React Router 的 layout route 模式（根路由 element 為 Layout，子路由渲染進 Outlet）是最標準的做法，與框架設計一致，不需額外 Context 或 HOC。

### Sidebar 收合狀態放在元件本地（useState）

收合狀態只影響 Sidebar 自身寬度與文字顯示，不需跨元件共享，放在本地最簡單。若未來需要讓其他元件響應（如主內容區 margin），再提升至 Context。

### 不引入 icon 套件，使用 emoji 或純文字符號作為圖示佔位

避免為了導覽加入 heroicons / lucide 等依賴，初期用 emoji 即可，後續可替換。

## Risks / Trade-offs

- **路由結構 breaking change** → 現有平面路由必須全部移入巢狀結構，需同步更新 `router/index.tsx`；步驟明確，風險低
- **Sidebar 寬度過渡無動畫** → 初期不加 transition，後續可用 Tailwind `transition-all duration-200` 補上
