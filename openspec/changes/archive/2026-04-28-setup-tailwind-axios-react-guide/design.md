## Context

專案為 React + Vite 前端應用，目前尚未引入 CSS utility framework、統一的 HTTP 層、路由方案與全域狀態管理。本次設計涵蓋五個互相獨立但協同運作的模組：Tailwind CSS v4、axios 封裝、React Router v7、Redux Toolkit，以及一份對比 Vue 語法的 React 開發指南。

## Goals / Non-Goals

**Goals:**
- 安裝 Tailwind CSS v4 並以 CSS-first 方式整合進 Vite
- 建立可重用的 axios 封裝層（`src/lib/http.ts`），對外暴露統一的請求 API
- 整合 react-router-dom v7，建立 file-based 或 config-based 基礎路由結構
- 整合 Redux Toolkit，建立 store、slice、型別安全的 hooks 範例
- 產出 `docs/react-guide.md`，以 Vue 語法對比方式介紹 React

**Non-Goals:**
- 後端 API 設計或 server-side rendering
- 完整的業務邏輯 slice（僅提供範例 slice）
- 自動化測試設定（另行處理）

## Decisions

### 1. Tailwind CSS v4 — CSS-first 配置

**決策**：使用 `@import "tailwindcss"` 於主 CSS 檔案，不產生 `tailwind.config.js`（v4 預設）。  
**理由**：v4 將配置移入 CSS，減少設定檔數量，與 Vite 的 CSS 處理流程整合更直接。  
**替代方案**：維持 v3 + `tailwind.config.js` — 捨棄，因 v4 已是官方最新方向，避免技術債。

### 2. axios 封裝層設計

**決策**：在 `src/lib/http.ts` 建立 axios instance，封裝：
- `baseURL`（從環境變數 `VITE_API_BASE_URL` 讀取）
- Request interceptor（注入 Auth token）
- Response interceptor（統一錯誤格式、401 自動登出）
- 匯出型別安全的 `get / post / put / del` 方法

**理由**：所有元件透過統一入口呼叫 API，日後替換底層（如改用 fetch）只需修改一處。  
**替代方案**：直接使用 fetch — 捨棄，axios 的攔截器機制更成熟，錯誤處理更方便。

### 3. React Router v7

**決策**：使用 config-based routing（`createBrowserRouter`）定義路由，置於 `src/router/index.tsx`。  
**理由**：v7 推薦 data router，支援 loader/action，未來擴充彈性大；config-based 比 JSX-based 更易維護。  
**替代方案**：TanStack Router — 社群採用率尚低於 react-router，暫不引入。

### 4. Redux Toolkit

**決策**：使用 `@reduxjs/toolkit` + `react-redux`，建立：
- `src/store/index.ts`（configureStore）
- `src/store/slices/counterSlice.ts`（範例 slice）
- `src/hooks/redux.ts`（型別安全的 `useAppDispatch` / `useAppSelector`）

**理由**：Redux Toolkit 是官方推薦方式，消除大量 boilerplate，週下載量 >4000 萬，企業採用率最高。  
**替代方案**：Zustand — 較輕量但不適合需要嚴格可預測狀態的大型專案。

### 5. React 指南文件

**決策**：以 Markdown 撰寫 `docs/react-guide.md`，章節結構：
1. React 核心概念（JSX、Components、Props、State）
2. 常用 Hooks（useState、useEffect、useContext、useMemo、useCallback）
3. Vue vs React 語法對照表
4. 生命週期對比（Options API / Composition API vs React Hooks）

**理由**：對比 Vue 語法能幫助有 Vue 背景的開發者快速建立心智模型。

## Risks / Trade-offs

- **Tailwind v4 尚新**：v4 部分生態（IDE 外掛、第三方元件庫）仍在跟進，可能遇到相容性問題 → 鎖定版本，觀察官方 changelog。
- **Redux 學習曲線**：對 React 新手來說 Redux 概念（action、reducer、selector）較複雜 → 提供詳細範例 slice 與型別安全 hooks，降低門檻。
- **axios 封裝過度設計**：若 API 行為差異大，單一 interceptor 可能需要 flag 處理 → 初期保持簡單，待需求出現再擴充。
