## Context

`src/api/cart.ts` 已封裝 `/api/cart` 系列端點，但前台尚未使用；`ConsumerProductListPage` 顯示商品卡片但無詳情頁；`ConsumerLayout` 目前 Header 只有商品列表/我的訂單兩個連結。本變更整合既有 API 與既有的 ConsumerLayout 框架，不引入新後端依賴。

現有相依：
- 路由：React Router (見 `src/main.tsx` 引用 `./router`)
- 狀態：Redux Toolkit（`src/store`）
- HTTP：自製 `lib/http`（cart/product API 已使用）
- Layout：ConsumerLayout 已有 Header + Outlet 結構與 token 倒數

## Goals / Non-Goals

**Goals:**
- 前台使用者可以從商品列表點入詳情頁、調整數量加入購物車。
- 前台使用者可以檢視購物車、調整數量、移除單一項目、清空購物車、結帳。
- ConsumerLayout Header 顯示購物車入口與項目數量徽章（跨頁同步）。
- 完成結帳後導向 `/my-orders`。

**Non-Goals:**
- 直接購買 / 單品下單（後端無對應 API，本次不處理）。
- 訪客（未登入）購物車。延用現有「未登入跳轉 `/login`」行為。
- 折扣碼、運費試算、結帳備註欄。
- 後台 (`/admin/*`) 任何修改。

## Decisions

### Decision 1: 購物車狀態管理 — 用新 Redux slice
- **選擇**：在 `src/store` 下新增 `cartSlice`，集中管理 `CartResponse`、loading、error。Header 徽章與 `ConsumerCartPage` 同源讀取。
- **替代**：純 React Context、或每頁各自 fetch。
- **理由**：專案已使用 Redux Toolkit，Header 與 CartPage 跨組件需要同步；slice 可在 `addCartItem`、`updateCartItem`、`deleteCartItem`、`deleteCart`、`checkoutCart` 成功後統一刷新摘要，避免多處重複呼叫 `getCart`。

### Decision 2: 購物車載入時機
- **選擇**：使用者登入後（或 ConsumerLayout 首次掛載且 token 有效）發 `getCart` 一次；之後僅在發生變更操作後重新呼叫。
- **替代**：每次切換頁面都呼叫。
- **理由**：減少 API 呼叫；變更操作時主動刷新即可保證 Header 徽章準確。

### Decision 3: 商品詳情頁路由放在 ConsumerLayout 之下
- **選擇**：新增 `/products/:id` 為 ConsumerLayout 的子路由，使用 `fetchProductById`。
- **替代**：以 modal 在列表頁內顯示。
- **理由**：與既有 `/my-orders` 模式一致；URL 可分享、瀏覽器返回行為自然；圖片 gallery 在獨立頁更舒適。

### Decision 4: 商品詳情頁的圖片區
- **選擇**：以 `images.find(isCover)` 作為主圖、其餘縮圖在下方點擊切換主圖。若無 images，顯示灰色佔位。
- **替代**：carousel/lightbox 套件。
- **理由**：避免新依賴；既有列表頁已用相同的 cover 邏輯。

### Decision 5: 購物車項目「商品圖片」來源
- **觀察**：`CartItemResponse` 不含圖片欄位，只有 `productId` 與 `productName`。
- **選擇**：購物車頁僅顯示文字資訊（名稱、單價、數量、小計）；不額外打 `fetchProductById` 補圖。
- **理由**：避免 N+1 請求；本變更不擴後端 DTO。後續可在後端補 cover 後再升級 UI。

### Decision 6: API 命名一致化
- **選擇**：將 `cart.ts` 中 `AddCartItem` 重新命名為 `addCartItem`，符合其他函式（getCart、updateCartItem 等）的駝峰慣例。
- **理由**：目前無其他檔案 import 該名稱（git status 顯示 `cart.ts` 為未追蹤新檔），改名零成本。

### Decision 7: Header 購物車入口
- **選擇**：在 ConsumerLayout Header 既有「商品列表 / 我的訂單」之後新增「購物車」連結，連結右上以小徽章顯示 `items.length`（0 時不顯示徽章）。
- **替代**：右上角浮動圖示。
- **理由**：與既有 Header 文字連結風格一致。

### Decision 8: 結帳流程
- **選擇**：CartPage 點「結帳」→ confirm 對話 → `checkoutCart()` → 成功後 dispatch 清空 cart slice → `navigate('/my-orders')`。
- **錯誤處理**：API 失敗顯示 inline 錯誤訊息，不離開頁面。

## Risks / Trade-offs

- **庫存競態**：使用者加入購物車時前端只用 `stock` 欄位做數量上限驗證，但下單瞬間庫存可能已不足。→ 由後端 checkout 回傳錯誤時顯示明確訊息，前端不額外處理。
- **跨分頁不同步**：A 分頁加入商品後，B 分頁的 Header 徽章不會自動更新。→ 接受此限制，文件不承諾即時跨分頁同步；切頁/重新整理會重新同步。
- **購物車空狀態**：getCart 在使用者從未操作過時可能 404 或回 `items: []`，需在 slice 中容錯。→ 將 404 視為空車（items=[], totalAmount=0）。
- **未登入訪問 `/cart` 或 `/products/:id`**：延用現有 401 攔截器跳轉 `/login`。`/products/:id` 是否需要登入？→ 與 `ConsumerProductListPage` 一致，目前也在 ConsumerLayout 下需要 token，本次不變更存取規則。

## Migration Plan

無資料遷移；純前端新增與小幅修改。部署後使用者首次造訪會自動載入購物車狀態。
