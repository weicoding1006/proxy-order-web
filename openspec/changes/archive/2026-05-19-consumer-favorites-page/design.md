## Context

前台已有購物車功能（`cartSlice` + Redux）與完整的 Hiyori 設計系統（Tailwind v4 自訂 token）。`src/api/favorites.ts` 已提供三支 API：`getFavorites`、`addFavorite`、`deleteFavorite`。目前沒有任何 UI 元件或狀態管理對應收藏功能。

## Goals / Non-Goals

**Goals:**
- 以最少的新抽象，沿用既有 Redux + cartSlice 模式新增 `favoritesSlice`
- 在商品卡片與商品詳情頁嵌入收藏切換按鈕，UX 一致
- 新增 `/favorites` 頁面，展示收藏商品並支援移除
- 導覽列加入「我的收藏」入口

**Non-Goals:**
- 收藏數量 badge（導覽列不顯示計數）
- 離線/未登入收藏暫存（登入才能收藏）
- 商品推薦或個人化功能

## Decisions

### 1. 狀態管理：Redux slice vs. React Query / local state

**決定**：新增 `favoritesSlice`（與 `cartSlice` 同模式）

**理由**：
- 收藏狀態需跨商品卡片、商品詳情頁、收藏頁三處同步；local state 無法跨元件共享
- 專案已使用 Redux Toolkit，維持一致性，無需引入新依賴
- `cartSlice` 已是成熟範例，照抄模式可快速完成

**排除**：React Query — 專案目前未使用，不為此功能引入

### 2. 收藏按鈕形式：icon-only vs. 文字+icon

**決定**：商品卡片使用 icon-only 心形按鈕（疊加於圖片右上角），商品詳情頁使用文字+icon 按鈕

**理由**：
- 商品卡片空間有限，icon-only 不破壞排版
- 詳情頁有足夠空間，文字+icon 更易理解

### 3. favoritesSlice 初始載入時機

**決定**：在 `ConsumerLayout` 的 `useEffect` 中，與 `loadCart` 並列呼叫 `loadFavorites`

**理由**：確保使用者進入任何前台頁面時，收藏狀態已同步，心形圖示能正確顯示已收藏狀態

## Risks / Trade-offs

- **樂觀更新 vs. 保守更新**：採保守更新（等 API 回應才更新 Redux），避免狀態不一致。代價是按鈕有輕微延遲感 → 可加 `loading` 狀態禁用按鈕
- **API 錯誤處理**：toggle 失敗時需 revert 或顯示錯誤訊息，避免 UI 與後端狀態不同步
