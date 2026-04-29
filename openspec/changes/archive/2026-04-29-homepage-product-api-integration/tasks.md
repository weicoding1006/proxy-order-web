## 1. 首頁 API 整合

- [x] 1.1 在 `HomePage.tsx` 中引入 `fetchProducts` 並以 `useState` + `useEffect` 管理 products / loading / error 狀態
- [x] 1.2 實作 loading 狀態 UI（顯示「載入中...」文字或旋轉圖示）
- [x] 1.3 實作 error 狀態 UI（顯示「載入商品失敗，請稍後再試」提示）

## 2. 商品卡片 UI

- [x] 2.1 實作商品卡片元件（inline 或獨立元件），顯示名稱、`NT$ {price}`、庫存數量、上架狀態標籤（上架 / 下架）
- [x] 2.2 以網格（grid）排列商品卡片
- [x] 2.3 處理空陣列情況，顯示「目前沒有商品」提示文字
