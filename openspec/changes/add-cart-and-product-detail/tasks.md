## 1. API 層調整

- [x] 1.1 將 `src/api/cart.ts` 的 `AddCartItem` 重新命名為 `addCartItem`（駝峰一致化）
- [x] 1.2 為 `getCart()` 新增 404 視為空車的容錯（呼叫處或封裝點）

## 2. 購物車 Redux Slice

- [x] 2.1 新增 `src/store/cartSlice.ts`，state 包含 `items`、`totalAmount`、`status`、`error`
- [x] 2.2 新增 thunks：`loadCart`、`addItem`、`updateItem`、`removeItem`、`clearCart`、`checkout`，各自呼叫對應 API 並在成功時刷新 state
- [x] 2.3 將 `cartSlice` reducer 註冊至 `src/store/index.ts`
- [x] 2.4 export selector：`selectCartItemCount`、`selectCart`

## 3. ConsumerLayout 整合購物車

- [x] 3.1 ConsumerLayout 掛載時 dispatch `loadCart()`（token 有效時）
- [x] 3.2 Header 新增「購物車」連結至 `/cart`
- [x] 3.3 連結加上項目數徽章，使用 `selectCartItemCount`，0 時不顯示

## 4. 商品列表卡片連結

- [x] 4.1 `ConsumerProductListPage` 卡片改用 `<Link>` 包裹，導向 `/products/{id}`
- [x] 4.2 確認鍵盤焦點與 hover 樣式仍正確

## 5. 商品詳情頁

- [x] 5.1 新增 `src/pages/ConsumerProductDetailPage.tsx`，使用 `useParams` 取得 id
- [x] 5.2 呼叫 `fetchProductById(id)`，處理 loading / error / 404
- [x] 5.3 圖片區：主圖（cover 優先）+ 縮圖列，點縮圖切換主圖；無圖時顯示佔位
- [x] 5.4 數量輸入（min=1, max=stock），加入購物車按鈕
- [x] 5.5 點「加入購物車」dispatch `addItem({ productId, quantity })`，成功顯示提示
- [x] 5.6 stock=0 時 disabled 並顯示缺貨提示

## 6. 購物車頁

- [x] 6.1 新增 `src/pages/ConsumerCartPage.tsx`，從 cart slice 讀取資料
- [x] 6.2 渲染項目列表（名稱、單價、數量、小計）與總金額
- [x] 6.3 每列數量調整 → dispatch `updateItem`
- [x] 6.4 每列「移除」按鈕 → dispatch `removeItem`
- [x] 6.5 「清空購物車」按鈕 + confirm → dispatch `clearCart`
- [x] 6.6 「結帳」按鈕 + confirm → dispatch `checkout`，成功後 `navigate('/my-orders')`
- [x] 6.7 空購物車狀態：顯示提示文字並隱藏結帳按鈕
- [x] 6.8 各操作的 loading/error UI

## 7. 路由設定

- [x] 7.1 在 ConsumerLayout 子路由群組新增 `/products/:id`
- [x] 7.2 在 ConsumerLayout 子路由群組新增 `/cart`

## 8. 驗證

- [ ] 8.1 啟動 dev server，從首頁點商品 → 詳情 → 加入購物車 → Header 徽章更新（需手動驗證）
- [ ] 8.2 進 `/cart` 調整數量、移除單項、清空、結帳，最終跳轉 `/my-orders`（需手動驗證）
- [ ] 8.3 確認後台 `/admin/*` 不受影響（需手動驗證）
- [x] 8.4 `npm run build` 通過 type check 與 lint（本次新增程式碼通過 tsc，唯一錯誤為 `OrdersPage.tsx` 既有未使用 import，非本次變更引入）
