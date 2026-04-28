## 1. Tailwind CSS v4 安裝與設定

- [x] 1.1 執行 `npm install tailwindcss@^4 @tailwindcss/vite` 安裝套件
- [x] 1.2 修改 `vite.config.ts`，引入並啟用 `@tailwindcss/vite` plugin
- [x] 1.3 修改主 CSS 入口（`src/index.css`），替換為 `@import "tailwindcss"`
- [x] 1.4 驗證：在任一元件加入 Tailwind class，確認樣式正常渲染

## 2. axios 封裝層

- [x] 2.1 執行 `npm install axios` 安裝最新版 axios
- [x] 2.2 建立 `src/lib/http.ts`，使用 `axios.create()` 並設定 `baseURL` 讀取 `VITE_API_BASE_URL`
- [x] 2.3 實作 request interceptor，自動注入 localStorage token 至 `Authorization` header
- [x] 2.4 實作 response interceptor，處理 401 自動登出、其他錯誤統一格式化
- [x] 2.5 匯出型別安全的 `get`、`post`、`put`、`del` 方法
- [x] 2.6 在 `.env.example` 新增 `VITE_API_BASE_URL=` 範例設定

## 3. React Router v7 設定

- [x] 3.1 執行 `npm install react-router-dom` 安裝 v7
- [x] 3.2 建立 `src/pages/HomePage.tsx` 與 `src/pages/NotFoundPage.tsx`
- [x] 3.3 建立 `src/router/index.tsx`，使用 `createBrowserRouter` 定義 `/` 與 `*` 路由
- [x] 3.4 修改 `src/main.tsx`，將 `<App />` 替換為 `<RouterProvider router={router} />`

## 4. Redux Toolkit 設定

- [x] 4.1 執行 `npm install @reduxjs/toolkit react-redux` 安裝套件
- [x] 4.2 建立 `src/store/slices/counterSlice.ts`（含 increment、decrement、reset actions）
- [x] 4.3 建立 `src/store/index.ts`，使用 `configureStore` 整合 slices，匯出 `RootState` 與 `AppDispatch`
- [x] 4.4 建立 `src/hooks/redux.ts`，匯出型別安全的 `useAppDispatch` 與 `useAppSelector`
- [x] 4.5 修改 `src/main.tsx`，使用 `<Provider store={store}>` 包裹 `<RouterProvider>`

## 5. React 開發指南撰寫

- [x] 5.1 建立 `docs/` 目錄並建立 `docs/react-guide.md`
- [x] 5.2 撰寫 React 核心概念章節（JSX、Components、Props、State）
- [x] 5.3 撰寫常用 Hooks 章節（useState、useEffect、useContext、useMemo、useCallback），每個附帶程式碼範例
- [x] 5.4 撰寫 Vue vs React 語法對照表（data/ref、computed、watch、methods、emit/props）
- [x] 5.5 撰寫生命週期對比章節（Vue mounted/unmounted/updated vs useEffect 模式）
