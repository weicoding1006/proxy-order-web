## ADDED Requirements

### Requirement: Vite dev server proxy 設定
`vite.config.ts` MUST 設定 `server.proxy`，將 `/api` 開頭的請求轉發至本機 .NET 後端。

#### Scenario: proxy 設定存在
- **WHEN** 開發者開啟 `vite.config.ts`
- **THEN** 可見 `server.proxy['/api']` 設定，`target` 為 `http://localhost:5184`，`changeOrigin: true`

### Requirement: dev 期間 API 請求透過 proxy 轉發
開發期間所有 `/api/*` 請求 MUST 由 Vite dev server 代理，不直接打後端 URL。

#### Scenario: API 請求被代理
- **WHEN** 執行 `npm run dev`，前端發出 `/api/products` 請求
- **THEN** Vite dev server 將請求轉發至 `http://localhost:5184/api/products`，瀏覽器不出現 CORS 錯誤

### Requirement: proxy 設定不影響 production build
`server.proxy` 設定 MUST 只在 dev server 生效，不寫入 build 產物。

#### Scenario: build 產物不含 proxy 設定
- **WHEN** 執行 `npm run build`
- **THEN** `dist/` 目錄中不存在 proxy 相關設定
