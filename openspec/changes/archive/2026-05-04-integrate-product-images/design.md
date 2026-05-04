## Context

`ProductResponseDto` 已更新，新增 `images?: ProductImageDto[]` 欄位，並提供 `createProductImage(id, file)` API。目前前端兩個商品列表頁面均未使用這些資料，需要：

1. **後台 (HomePage)**：在商品表格新增「操作」欄，透過 Modal 讓管理員上傳圖片
2. **前台 (ConsumerProductListPage)**：在商品卡片顯示封面圖片

## Goals / Non-Goals

**Goals:**
- 後台商品表格新增圖片管理按鈕，點擊開啟 Modal，可上傳圖片
- Modal 顯示該商品現有圖片列表（`images` 陣列）
- 消費者端商品卡片顯示 `isCover: true` 的封面圖，無圖時顯示灰色佔位符
- 新增可複用的 `ProductImageUploadModal` 元件

**Non-Goals:**
- 刪除或重新排序圖片
- 設定封面圖片（`isCover` 由後端決定）
- 圖片上傳進度條
- 多張圖片同時上傳

## Decisions

### 1. Modal 元件獨立於頁面

將 Modal 抽取為 `src/components/ProductImageUploadModal.tsx`，接受 `productId`、`images`、`onClose`、`onUploaded` props。

**理由**：Modal 邏輯（檔案選擇、呼叫 API、顯示現有圖片）與頁面邏輯分離，未來 AdminProductPage 也能複用。

### 2. 上傳後重新 fetch 完整商品資料

上傳成功後呼叫 `onUploaded` 回呼，由父元件重新呼叫 `fetchProducts()` 刷新列表。

**理由**：避免在 Modal 內部管理局部圖片狀態，確保資料一致性；`fetchProductById` 可在 Modal 內部也行，但整體重載更簡單。

**替代方案**：`fetchProductById(productId)` 更新單筆資料 → 較精準但實作稍複雜，此階段不採用。

### 3. 封面圖優先，無圖顯示佔位符

`ConsumerProductListPage` 取 `images?.find(img => img.isCover)?.imageUrl`，找不到時顯示固定高度的灰色 `div`。

**理由**：不使用第一張圖，避免無封面設定時顯示非預期圖片。

## Risks / Trade-offs

- **圖片 URL 跨域**：若 `imageUrl` 為相對路徑，需確認 Vite proxy 設定是否涵蓋圖片路徑 → 開發時透過現有 `/api` proxy 即可，生產環境由 nginx 處理
- **大圖效能**：未做縮圖，直接顯示原始 URL → 短期可接受，後續可加 `object-fit: cover` 限制顯示尺寸（已在 Tailwind class 中處理）
- **Modal 開啟時資料過舊**：`images` 來自上一次 `fetchProducts()` 的快照，若其他人同時上傳不會即時更新 → 可接受，關閉並重新開啟 Modal 後即刷新
