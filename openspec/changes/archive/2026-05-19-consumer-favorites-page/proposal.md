## Why

收藏清單 API (`/api/favorites`) 已完成，但前台缺乏對應的 UI，消費者無法將喜愛的商品加入收藏或瀏覽收藏清單，導致此功能形同虛設。

## What Changes

- 新增前台「我的收藏」頁面 (`/favorites`)，展示使用者已收藏的商品列表
- 商品卡片（商品列表頁）新增收藏按鈕（心形圖示），支援一鍵收藏／取消收藏
- 商品詳情頁新增收藏按鈕，與列表頁行為一致
- 導覽列新增「我的收藏」連結
- 新增 Redux slice (`favoritesSlice`) 管理收藏狀態，確保多元件間同步

## Capabilities

### New Capabilities

- `consumer-favorites-page`: 消費者收藏清單頁面，顯示所有已收藏商品並支援移除
- `consumer-favorites-toggle`: 商品收藏切換按鈕，嵌入商品卡片與商品詳情頁

### Modified Capabilities

- `consumer-layout`: 導覽列新增「我的收藏」連結至 `/favorites`
- `consumer-product-list`: 商品卡片加入收藏切換按鈕
- `consumer-product-detail`: 商品詳情頁加入收藏切換按鈕

## Impact

- 新增檔案：`src/pages/ConsumerFavoritesPage.tsx`、`src/store/slices/favoritesSlice.ts`
- 修改檔案：`src/layouts/ConsumerLayout.tsx`、`src/pages/ConsumerProductListPage.tsx`、`src/pages/ConsumerProductDetailPage.tsx`、`src/store/index.ts`（掛載 favoritesSlice）、`src/App.tsx` 或路由設定（新增 `/favorites` 路由）
- 依賴：已有的 `src/api/favorites.ts`、Redux Toolkit、Tailwind v4 + Hiyori 設計系統
