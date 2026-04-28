## Why

目前專案缺乏統一的 UI 框架、HTTP 請求封裝層，以及標準化的前端工具鏈配置，導致開發體驗不一致、可維護性低。透過引入 Tailwind CSS v4、封裝 axios、並建立 React 入門指南，能快速提升團隊開發效率與一致性。

## What Changes

- 安裝並配置 **Tailwind CSS v4**（最新版本，CSS-first 配置）
- 安裝 **axios 最新版**，並實作一層統一的 HTTP 請求封裝（interceptors、錯誤處理、base URL 設定）
- 建議並整合最主流的 **React Router**（`react-router-dom` v7）作為路由方案
- 建議並整合最主流的 **全域狀態管理**（Redux Toolkit，業界採用率最高）
- 撰寫 **React 入門指南 Markdown**，對比 Vue 常用語法，協助有 Vue 背景的開發者快速上手

## Capabilities

### New Capabilities

- `tailwind-v4-setup`: 安裝並配置 Tailwind CSS v4，使用新的 CSS-first 配置方式取代舊版 `tailwind.config.js`
- `axios-wrapper`: 建立 axios 封裝層，統一管理 baseURL、請求攔截器、回應攔截器與錯誤處理
- `react-router-setup`: 安裝 react-router-dom v7 並建立基礎路由結構
- `redux-toolkit-setup`: 安裝 Redux Toolkit 與 react-redux，建立 store、slice 範例
- `react-vs-vue-guide`: 撰寫 Markdown 文件，介紹 React 核心概念並與 Vue 語法對比

### Modified Capabilities

## Impact

- **依賴項**：新增 `tailwindcss@^4`、`axios`、`react-router-dom`、`@reduxjs/toolkit`、`react-redux` 等 npm 套件
- **檔案新增**：`src/lib/http.ts`（axios 封裝）、`src/store/`（Redux store 與 slices）、`src/router/`（路由配置）、`docs/react-guide.md`
- **CSS 配置**：Tailwind v4 改用 `@import "tailwindcss"` in CSS，不再需要 `tailwind.config.js`（可選）
- **無 Breaking Change**：現有功能不受影響
