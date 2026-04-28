## ADDED Requirements

### Requirement: 前端靜態檔服務
`nginx.conf` MUST 設定 Nginx 服務 `dist/` 目錄的靜態檔，並支援 SPA 路由 fallback。

#### Scenario: 直接訪問前端路由
- **WHEN** 使用者瀏覽 `/orders` 等前端路由（非 /api）
- **THEN** Nginx 回傳 `index.html`，由前端 React Router 處理路由

#### Scenario: 靜態資源正常回應
- **WHEN** 瀏覽器請求 `/assets/main.js`
- **THEN** Nginx 直接回傳對應靜態檔

### Requirement: API 反向代理
`nginx.conf` MUST 設定 `/api/` location，將請求 proxy 至後端容器的 port 8080。

#### Scenario: API 請求被轉發至後端
- **WHEN** 前端發出 `/api/products` 請求
- **THEN** Nginx 將請求轉發至 `http://backend:8080/api/products`，回傳後端回應

### Requirement: Docker 容器間網路通訊
`nginx.conf` 的 `proxy_pass` MUST 使用 Docker Compose service 名稱（`backend`）而非 IP。

#### Scenario: 容器名稱解析正確
- **WHEN** docker-compose 啟動所有服務
- **THEN** Nginx 能透過 `backend` hostname 解析並連線至後端容器
