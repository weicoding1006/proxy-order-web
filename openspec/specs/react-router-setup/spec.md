## ADDED Requirements

### Requirement: react-router-dom v7 安裝
專案 SHALL 安裝 `react-router-dom@^7`。

#### Scenario: 安裝套件
- **WHEN** 開發者執行 `npm install react-router-dom`
- **THEN** `package.json` 中 `react-router-dom` 版本為 `^7.x.x`

### Requirement: Config-based 路由定義
`src/router/index.tsx` MUST 使用 `createBrowserRouter` 定義路由設定。

#### Scenario: 路由設定存在
- **WHEN** 開發者開啟 `src/router/index.tsx`
- **THEN** 可見 `createBrowserRouter` 呼叫，包含至少 `/`（首頁）與 `*`（404）兩條路由

### Requirement: RouterProvider 掛載
`src/main.tsx` 或 `src/App.tsx` MUST 使用 `<RouterProvider router={router} />` 掛載路由。

#### Scenario: RouterProvider 正確掛載
- **WHEN** 應用程式啟動
- **THEN** 根元件使用 `RouterProvider` 而非傳統 `<BrowserRouter>`

### Requirement: 基礎頁面結構
專案 SHALL 建立至少兩個頁面元件作為路由示範。

#### Scenario: 首頁可訪問
- **WHEN** 使用者瀏覽 `/`
- **THEN** 頁面渲染 `HomePage` 元件

#### Scenario: 404 頁面處理
- **WHEN** 使用者瀏覽不存在的路徑
- **THEN** 頁面渲染 `NotFoundPage` 元件
