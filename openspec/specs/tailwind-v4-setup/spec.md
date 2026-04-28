## ADDED Requirements

### Requirement: Tailwind CSS v4 安裝
專案 SHALL 安裝 `tailwindcss@^4` 及對應的 Vite plugin `@tailwindcss/vite`。

#### Scenario: 安裝套件
- **WHEN** 開發者執行 `npm install tailwindcss@^4 @tailwindcss/vite`
- **THEN** `package.json` 中出現 `tailwindcss` 版本為 `^4.x.x`

### Requirement: Vite 整合配置
`vite.config.ts` MUST 引入並啟用 `@tailwindcss/vite` plugin。

#### Scenario: Plugin 已設定
- **WHEN** 開發者開啟 `vite.config.ts`
- **THEN** 可見 `import tailwindcss from '@tailwindcss/vite'` 及 `tailwindcss()` 在 plugins 陣列中

### Requirement: CSS-first 配置
主 CSS 入口檔案 SHALL 使用 `@import "tailwindcss"` 取代 v3 的三個 `@tailwind` 指令。

#### Scenario: CSS 入口正確
- **WHEN** 開發者開啟 `src/index.css`（或 `src/main.css`）
- **THEN** 第一行為 `@import "tailwindcss"`，無 `@tailwind base/components/utilities`

### Requirement: Utility class 正常運作
專案中的 JSX/TSX 元件 SHALL 能使用 Tailwind utility class 並正確渲染樣式。

#### Scenario: Class 套用成功
- **WHEN** 元件使用 `className="text-blue-500 font-bold"`
- **THEN** 瀏覽器中元素呈現藍色粗體文字
