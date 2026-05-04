## 1. 新增 ProductEditModal 元件

- [x] 1.1 建立 `src/components/ProductEditModal.tsx`，定義 props（productId, name, price, stock, isActive, description, images, onClose, onSaved）
- [x] 1.2 實作表單 state（name, price, stock, isActive, description），以傳入 props 初始化
- [x] 1.3 實作各欄位輸入元素（text input、number input、textarea、toggle/checkbox）
- [x] 1.4 實作儲存按鈕：呼叫 `updateProduct`，處理 loading 與 error state
- [x] 1.5 儲存成功後呼叫 `onSaved()`
- [x] 1.6 實作關閉按鈕與背景遮罩點擊呼叫 `onClose()`

## 2. 整合圖片管理區塊

- [x] 2.1 在 `ProductEditModal` 表單下方加入圖片管理區塊，顯示現有圖片縮圖（`images` prop）
- [x] 2.2 加入圖片上傳 input，選取後呼叫 `createProductImage(productId, file)`
- [x] 2.3 圖片上傳成功後，重新呼叫 `fetchProductById(productId)` 以刷新圖片列表
- [x] 2.4 圖片上傳中顯示 disabled 狀態，失敗時顯示錯誤訊息

## 3. 更新 HomePage

- [x] 3.1 在 `HomePage.tsx` 的 `Product` interface 新增 `description?: string` 欄位
- [x] 3.2 將操作欄的「編輯圖片」按鈕改為「編輯」按鈕
- [x] 3.3 將 `selectedProduct` state 與 `ProductImageUploadModal` 替換為 `ProductEditModal`
- [x] 3.4 將 `onUploaded` 回呼改為 `onSaved` 回呼，觸發後關閉 Modal 並呼叫 `loadProducts()`

## 4. 更新既有 Spec

- [x] 4.1 更新 `openspec/specs/homepage-product-list/spec.md`，將「編輯圖片」相關場景改為「編輯」場景
