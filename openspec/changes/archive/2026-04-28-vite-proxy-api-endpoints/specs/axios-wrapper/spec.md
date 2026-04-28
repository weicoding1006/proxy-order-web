## MODIFIED Requirements

### Requirement: baseURL 環境變數設定
axios instance 的 `baseURL` MUST 設為空字串（`''`），不依賴環境變數。Dev 環境透過 Vite proxy、prod 環境透過 Nginx proxy 處理路由，前端程式碼統一使用 `/api/...` 相對路徑。

#### Scenario: baseURL 為空，請求使用相對路徑
- **WHEN** 前端呼叫 `get('/api/products')`
- **THEN** axios 發出相對路徑請求 `/api/products`，由當前環境的 proxy（Vite 或 Nginx）處理轉發
