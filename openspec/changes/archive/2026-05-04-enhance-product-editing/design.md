## Context

後台商品列表（`HomePage.tsx`）目前操作欄只有「編輯圖片」按鈕，點擊後開啟 `ProductImageUploadModal`。管理員需要能在同一個入口修改所有商品資料，包含名稱、價格、庫存、上下架狀態、詳細敘述，以及圖片管理。後端已有 `PUT /api/Product/{id}` API（`UpdateProductDto` 支援所有欄位），前端 `updateProduct` 也已實作，無需後端改動。

## Goals / Non-Goals

**Goals:**
- 新增 `ProductEditModal` 元件，提供完整的商品資料編輯表單
- 整合圖片管理：在同一 Modal 內嵌入 `ProductImageUploadModal` 的圖片上傳區域
- 儲存時呼叫 `updateProduct` API，成功後刷新列表
- 將 `HomePage` 的「編輯圖片」按鈕替換為「編輯」按鈕

**Non-Goals:**
- 新增商品（`createProduct`）不在本次範圍
- 刪除商品（`deleteProduct`）不在本次範圍
- 圖片排序或設定封面的互動強化不在本次範圍

## Decisions

### 決策 1：ProductEditModal 整合圖片功能，不單獨使用 ProductImageUploadModal

**選擇**：在 `ProductEditModal` 內部直接包含圖片上傳區塊（可複用 `ProductImageUploadModal` 的邏輯，或直接嵌入其 JSX）。

**原因**：若保留兩個獨立 Modal（先「編輯」再「編輯圖片」），操作流程分裂，使用者需關閉一個 Modal 再開另一個，體驗差。整合後，管理員在單一 Modal 即可完成所有操作。

**替代方案考慮**：
- 保留兩個按鈕（「編輯基本資料」＋「編輯圖片」）→ 欄位太多，操作欄擁擠
- 用頁面跳轉到 `/admin/products/:id/edit` 編輯頁 → 開發量大，暫不引入路由層級

### 決策 2：ProductEditModal 內部管理 form state

**選擇**：`ProductEditModal` 使用本地 `useState` 管理各欄位的暫存值，點「儲存」才呼叫 API。

**原因**：避免每次 keystroke 都觸發 API；保持元件自治，不需引入 Redux 或 React Hook Form。

### 決策 3：圖片管理區塊採 inline 嵌入而非 Portal/巢狀 Modal

**選擇**：`ProductEditModal` 的下半部直接渲染圖片列表與上傳按鈕，不再開啟第二個 Modal。

**原因**：巢狀 Modal（Modal within Modal）在行動端有 z-index 與滾動問題，且使用者體驗混亂。

## Risks / Trade-offs

- **[風險] Modal 內容過多，頁面捲動困難** → 緩解：Modal 設 `overflow-y-auto` + `max-h`，讓內部可獨立捲動
- **[Trade-off] ProductImageUploadModal 可能變成孤兒元件（不再被直接使用）** → 暫時保留但不刪除，待確認無其他使用者後再清除
