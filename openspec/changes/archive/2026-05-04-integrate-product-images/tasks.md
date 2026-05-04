## 1. 新增 ProductImageUploadModal 元件

- [x] 1.1 建立 `src/components/ProductImageUploadModal.tsx`，定義 props 介面：`productId: string`、`images: ProductImageDto[]`、`onClose: () => void`、`onUploaded: () => void`
- [x] 1.2 實作 Modal 背景遮罩與容器，點擊遮罩呼叫 `onClose`
- [x] 1.3 實作現有圖片列表顯示：有圖片時渲染縮圖並標示封面，無圖片時顯示「尚無圖片」
- [x] 1.4 實作檔案選擇器（`<input type="file" accept="image/*">`）
- [x] 1.5 實作上傳按鈕：呼叫 `createProductImage(productId, file)`，上傳中 disabled，成功後觸發 `onUploaded`
- [x] 1.6 實作上傳失敗時的錯誤訊息顯示

## 2. 更新 HomePage（後台商品表格）

- [x] 2.1 在 `src/pages/HomePage.tsx` 的 `Product` 介面新增 `images?: ProductImageDto[]` 欄位，並於頂部引入 `ProductImageDto` 型別
- [x] 2.2 在表格 `<thead>` 新增「操作」欄標題
- [x] 2.3 在表格 `<tbody>` 每列新增「編輯圖片」按鈕，點擊設定 `selectedProduct` 狀態
- [x] 2.4 新增 `selectedProduct` state（`Product | null`）管理 Modal 開關
- [x] 2.5 在頁面底部渲染 `ProductImageUploadModal`，傳入正確 props；`onUploaded` 回呼重新呼叫 `fetchProducts()` 並關閉 Modal
- [x] 2.6 引入 `ProductImageUploadModal` 元件

## 3. 更新 ConsumerProductListPage（前台商品卡片）

- [x] 3.1 在 `src/pages/ConsumerProductListPage.tsx` 的 `Product` 介面新增 `images?: ProductImageDto[]` 欄位
- [x] 3.2 在商品卡片頂部新增圖片區塊：取 `images?.find(img => img.isCover)?.imageUrl`，有值則渲染 `<img>`（`object-cover h-40 w-full rounded-t-lg`），無值則渲染灰色佔位符 `<div>`
- [x] 3.3 確認卡片 layout 在有圖與無圖情境下視覺正常

## 4. 修正上傳與圖片載入問題

- [x] 4.1 修正 `src/api/product.ts` 的 `createProductImage`：上傳時傳入 `Content-Type: multipart/form-data` 覆蓋 axios instance 預設的 `application/json`，解決 415 Unsupported Media Type
- [x] 4.2 在 `vite.config.ts` 新增 `/uploads` proxy 規則，轉發至後端 `localhost:5184`，解決開發環境圖片路徑無法存取的問題
