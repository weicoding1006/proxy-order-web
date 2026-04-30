## Why

目前已開發的頁面（商品列表、訂單管理）實際上屬於後台（admin）功能，但路由結構未做區分。需要明確將現有頁面歸類為 `/admin/*`，並為消費者建立獨立的前台路由與頁面，兩套 UI 共存於同一個 Vite 專案。

## What Changes

- 現有頁面（商品列表、訂單頁）路由從 `/*` 遷移至 `/admin/*`
- 現有 `AppLayout` 改為後台專用 `AdminLayout`，只服務 `/admin/*`
- 新增前台路由群組 `/*`，使用獨立的 `ConsumerLayout`
- 新增前台初始頁面（消費者瀏覽商品、查看自己的訂單）
- API 暫不區分 admin／一般用戶，前後台共用現有 API
- 不需開新專案，兩套 Layout 共存於同一 Vite 專案

## Capabilities

### New Capabilities

- `consumer-layout`: 前台消費者專用 Layout（ConsumerLayout），導覽與風格獨立於後台
- `consumer-routing`: `/*` 前台路由群組，對應消費者頁面
- `consumer-product-list`: 前台商品瀏覽頁（消費者視角，只顯示上架商品）
- `consumer-order-list`: 前台我的訂單頁（只顯示當前登入用戶的訂單）

### Modified Capabilities

- `app-layout`: 現有 AppLayout 改名並調整為 AdminLayout，路由前綴改為 `/admin`
- `homepage-product-list`: 路由從 `/` 遷移至 `/admin/products`
- `order-list`: 路由從 `/orders` 遷移至 `/admin/orders`
- `sidebar-nav`: Sidebar 導覽連結更新為 `/admin/*` 路徑
- `react-router-setup`: 路由設定拆分為前台與後台兩個巢狀群組

## Impact

- `src/router/index.tsx`：拆分為 `/admin/*` 與 `/*` 兩個路由群組
- `src/layouts/`：現有 `AppLayout.tsx` 重構為 `AdminLayout.tsx`，新增 `ConsumerLayout.tsx`
- `src/pages/admin/`：現有頁面移入 admin 子目錄
- `src/pages/consumer/`：新增前台頁面目錄
- `src/components/Sidebar.tsx`：導覽連結路徑更新
- API 暫無異動，前後台共用同一套 API
