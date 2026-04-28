## ADDED Requirements

### Requirement: 多階段 Dockerfile
`Dockerfile` MUST 使用 multi-stage build：Stage 1 用 Node 執行 build，Stage 2 用 nginx:alpine 服務靜態檔。

#### Scenario: build 產物只含靜態檔與 Nginx
- **WHEN** 執行 `docker build -t proxy-order-web .`
- **THEN** 最終 image 基於 `nginx:alpine`，`dist/` 內容位於 `/usr/share/nginx/html`，不含 node_modules

### Requirement: docker-compose 服務定義
`docker-compose.yml` MUST 定義 `frontend`（Nginx）與 `backend`（.NET 10）兩個 service。

#### Scenario: 服務正常啟動
- **WHEN** 執行 `docker compose up`
- **THEN** frontend 與 backend 兩個容器均啟動，且在同一 Docker network 內可互相連線

### Requirement: 後端容器 port 設定
後端 service MUST 設定環境變數 `ASPNETCORE_HTTP_PORTS=8080`，確保 .NET 10 容器監聽正確 port。

#### Scenario: 後端 port 正確
- **WHEN** docker-compose 啟動 backend 容器
- **THEN** .NET 應用程式監聽 `0.0.0.0:8080`，Nginx 可成功連線

### Requirement: 外部只暴露 80 port
`docker-compose.yml` MUST 只將 frontend（Nginx）的 `80` port 對外暴露，backend port 不對外開放。

#### Scenario: 僅前端 port 對外
- **WHEN** 執行 `docker compose up`
- **THEN** host 的 `80` port 可存取前端，`8080` 不對外暴露

### Requirement: backend image 名稱可設定
`docker-compose.yml` 的 backend `image` MUST 從環境變數（`.env`）讀取，方便切換 test/prod image。

#### Scenario: image 名稱由環境變數控制
- **WHEN** `.env` 中設定 `BACKEND_IMAGE=myapp-backend:latest`
- **THEN** docker-compose 使用該 image 啟動後端容器
