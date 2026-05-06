## Why

`src/api/cart.ts` 已經提供完整的購物車 API（取得購物車、加入商品、更新數量、刪除項目、結帳），但前台尚未串接，使用者無法把商品加入購物車或結帳。同時 `ConsumerProductListPage` 只列出商品縮圖與名稱，缺少進入「商品詳情」的路徑，導致使用者無法檢視描述、所有圖片或選擇購買數量。本次變更補齊前台消費端的兩個關鍵缺口：購物車流程與商品詳情頁。

## What Changes

- 新增 `/products/:id` 路由與 `ConsumerProductDetailPage`，顯示商品的完整資訊（描述、價格、庫存、所有圖片）並提供「加入購物車」按鈕（可選擇數量）。
- `ConsumerProductListPage` 的每張商品卡片改為可點擊連結，導向對應的商品詳情頁。
- 新增 `/cart` 路由與 `ConsumerCartPage`，列出購物車內項目、可調整數量、刪除項目、清空購物車並提供「結帳」按鈕；結帳後導向 `/my-orders`。
- `ConsumerLayout` Header 新增購物車入口（圖示或「購物車」連結），顯示目前購物車項目數量徽章。
- 統一 `cart.ts` 的 export 命名（將 `AddCartItem` 改為 `addCartItem` 以符合其他 API 函式的駝峰命名）。

## Capabilities

### New Capabilities
- `consumer-product-detail`: 前台商品詳情頁，顯示完整商品資訊與加入購物車操作。
- `consumer-cart`: 前台購物車頁面與結帳流程。

### Modified Capabilities
- `consumer-product-list`: 商品卡片改為可點擊以前往詳情頁。
- `consumer-layout`: Header 新增購物車入口與項目數量徽章。
- `consumer-routing`: 路由群組新增 `/products/:id` 與 `/cart`。

## Impact

- 程式碼：新增 `src/pages/ConsumerProductDetailPage.tsx`、`src/pages/ConsumerCartPage.tsx`；修改 `src/pages/ConsumerProductListPage.tsx`、`src/components/ConsumerLayout.tsx`（或同等檔案）、`src/router.tsx`（或路由設定檔）、`src/api/cart.ts`（重新命名 export）。
- API：串接既有 `/api/cart`、`/api/cart/items`、`/api/cart/items/{itemId}`、`/api/cart/checkout` 與 `/api/Product/{id}`，後端不需改動。
- 狀態：購物車項目數量徽章需要在 Header 跨頁同步，會新增 Redux slice 或 Context 管理購物車摘要狀態。
- 不影響後台 (`/admin/*`) 路由與既有訂單列表/詳情功能。
