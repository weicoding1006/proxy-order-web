## 1. Redux Slice — favoritesSlice

- [x] 1.1 在 `src/store/slices/favoritesSlice.ts` 新增 `favoritesSlice`，state 包含 `items: FavoriteResponse[]`、`status`、`error`
- [x] 1.2 實作 `loadFavorites` async thunk（呼叫 `getFavorites`）
- [x] 1.3 實作 `toggleFavorite` async thunk：已收藏呼叫 `deleteFavorite`，未收藏呼叫 `addFavorite`，成功後重新 dispatch `loadFavorites`
- [x] 1.4 新增 selector：`selectFavorites`（回傳 items 陣列）與 `selectIsFavorited(productId)`（回傳 boolean）
- [x] 1.5 在 `src/store/index.ts` 掛載 `favoritesReducer`

## 2. ConsumerLayout 初始化

- [x] 2.1 在 `src/layouts/ConsumerLayout.tsx` 的 `useEffect` 中，於 `loadCart` 旁並列 dispatch `loadFavorites`
- [x] 2.2 在導覽列新增「我的收藏」`NavLink`，路由指向 `/favorites`，樣式與現有導覽連結一致

## 3. 前台路由

- [x] 3.1 在 `src/router/index.tsx` 的 ConsumerLayout 子路由中新增 `{ path: '/favorites', element: <ConsumerFavoritesPage /> }`

## 4. 收藏頁面

- [x] 4.1 新增 `src/pages/ConsumerFavoritesPage.tsx`，從 Redux store 讀取 `selectFavorites` 並以網格顯示商品卡片
- [x] 4.2 實作空狀態：無收藏時顯示「尚無收藏商品」與「前往逛逛」連結至 `/`
- [x] 4.3 每張收藏卡片顯示封面圖（4:5 aspect ratio）、商品名稱、價格，卡片點擊導航至 `/product/:id`
- [x] 4.4 每張收藏卡片加入移除按鈕（實心心形），點擊後 dispatch `toggleFavorite`，操作進行中禁用按鈕

## 5. 商品列表頁收藏按鈕

- [x] 5.1 在 `src/pages/ConsumerProductListPage.tsx` 的商品卡片右上角加入收藏切換按鈕（心形 icon）
- [x] 5.2 按鈕使用 `selectIsFavorited(product.id)` 判斷狀態：已收藏顯示實心 shu 色，未收藏顯示空心灰色
- [x] 5.3 點擊按鈕 dispatch `toggleFavorite`，使用 `stopPropagation` 避免觸發卡片導航

## 6. 商品詳情頁收藏按鈕

- [x] 6.1 在 `src/pages/ConsumerProductDetailPage.tsx` 的操作區（「加入購物車」按鈕旁）加入收藏切換按鈕
- [x] 6.2 按鈕文字：未收藏顯示「加入收藏」，已收藏顯示「已收藏」；圖示對應空心／實心心形
- [x] 6.3 點擊按鈕 dispatch `toggleFavorite(productId)`，API 請求期間 disabled
