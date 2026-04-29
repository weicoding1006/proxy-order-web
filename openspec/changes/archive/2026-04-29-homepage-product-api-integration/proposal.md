## Why

首頁目前只顯示靜態文字，沒有實際內容。為了讓使用者進入平台後能立即瀏覽商品，需要在首頁整合商品 API，呈現商品列表。

## What Changes

- 首頁 (`HomePage.tsx`) 從靜態展示改為動態載入商品列表
- 呼叫 `fetchProducts()` 取得商品資料，並以卡片方式呈現
- 加入載入中（loading）與錯誤（error）狀態的處理
- 每張商品卡片顯示名稱、價格、庫存與狀態

## Capabilities

### New Capabilities
- `homepage-product-list`: 首頁商品列表功能，呼叫 `/api/products` 並以卡片 UI 呈現結果，含 loading / error 狀態處理

### Modified Capabilities
<!-- 無現有 spec 需修改 -->

## Impact

- `src/pages/HomePage.tsx`：主要修改對象，新增 API 呼叫與 UI 渲染邏輯
- `src/api/product.ts`：使用既有的 `fetchProducts` function，無需修改
- `src/lib/http.ts`：底層 axios wrapper，無需修改
- 無新增依賴
