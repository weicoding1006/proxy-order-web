## Why

後台商品列表目前操作欄只有「編輯圖片」按鈕，管理員無法直接在列表頁修改商品的基本資料（名稱、價格、庫存、上下架狀態、詳細敘述），需要透過完整的編輯功能才能有效管理商品。

## What Changes

- 將商品列表操作欄的「編輯圖片」按鈕改為「編輯」按鈕
- 新增 `ProductEditModal` 元件，提供完整商品編輯表單：
  - 商品名稱（文字輸入）
  - 價格（數字輸入）
  - 庫存數量（數字輸入）
  - 上下架狀態（切換開關）
  - 詳細敘述（多行文字輸入）
  - 圖片管理（整合現有 `ProductImageUploadModal` 功能，或內嵌圖片上傳區塊）
- 儲存時呼叫現有 `updateProduct(id, data)` API
- 更新 `homepage-product-list` spec：將「編輯圖片」場景替換為「編輯」場景

## Capabilities

### New Capabilities
- `product-edit-modal`: 商品完整編輯 Modal，支援修改名稱、價格、庫存、狀態、敘述與圖片管理

### Modified Capabilities
- `homepage-product-list`: 操作欄按鈕從「編輯圖片」改為「編輯」，點擊後開啟 ProductEditModal

## Impact

- `src/pages/HomePage.tsx`：替換按鈕與 Modal 元件
- `src/components/ProductEditModal.tsx`：新增元件
- `src/api/product.ts`：沿用現有 `updateProduct`，無需修改
- `openspec/specs/homepage-product-list/spec.md`：更新 spec 場景
