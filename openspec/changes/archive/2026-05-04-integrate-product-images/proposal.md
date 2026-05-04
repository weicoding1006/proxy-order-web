## Why

`ProductResponseDto` 已新增 `images` 欄位及 `createProductImage` API，但前端頁面尚未使用這些資料，導致商品圖片無法在消費者端展示，管理員也無法透過介面上傳圖片。

## What Changes

- **ConsumerProductListPage**：商品卡片新增封面圖片顯示（取 `isCover: true` 的圖片，無圖時顯示佔位符）
- **HomePage（後台管理）**：商品表格新增「操作」欄位，含「編輯圖片」按鈕，點擊後開啟 Modal，可上傳圖片並即時預覽已上傳圖片列表
- **ProductImageUploadModal**：新通用元件，負責圖片上傳與現有圖片展示邏輯

## Capabilities

### New Capabilities

- `product-image-upload-modal`: 管理員可透過 Modal 上傳商品圖片，並查看已上傳圖片列表
- `consumer-product-card-image`: 消費者商品列表的卡片顯示商品封面圖片

### Modified Capabilities

- `homepage-product-list`: 後台商品表格新增操作欄位與圖片管理入口
- `consumer-product-list`: 商品卡片加入圖片顯示區塊

## Impact

- `src/pages/HomePage.tsx`：新增操作欄、Modal 狀態管理
- `src/pages/ConsumerProductListPage.tsx`：商品卡片加入圖片顯示
- 新增 `src/components/ProductImageUploadModal.tsx`
- 依賴 `src/api/product.ts` 的 `createProductImage` 及 `ProductResponseDto.images`
