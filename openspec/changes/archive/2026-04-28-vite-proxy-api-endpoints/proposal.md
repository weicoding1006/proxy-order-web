## Why

開發期間前端直接呼叫後端 API 會遇到 CORS 問題，且 URL 硬寫在各處難以維護。同時專案尚未有容器化部署設定，測試與正式環境缺乏一致的啟動方式。透過統一的 `/api` 路由規則（Dev 用 Vite proxy、Test/Prod 用 Nginx）搭配 Docker 容器化，讓前端程式碼在所有環境行為一致，並讓部署流程標準化。

## What Changes

- 在 `vite.config.ts` 新增 `server.proxy`，將 `/api/*` 代理至 `http://localhost:5184`（僅 dev）
- 建立 `src/api/` 集中式 API 端點目錄
  - `src/api/product.ts` — 商品 CRUD（list、getById、create、update、delete）
  - `src/api/index.ts` — 統一匯出入口
- 更新 `src/lib/http.ts` 的 `baseURL`：開發期間為空（走 Vite proxy），部署後為空（走 Nginx proxy）
- 新增 `nginx.conf`：提供前端靜態檔 + `/api/*` 反向代理至後端容器
- 新增 `Dockerfile`：多階段 build，第一階段 build React，第二階段 Nginx 服務靜態檔
- 新增 `docker-compose.yml`：協調 frontend（Nginx）與 backend 兩個容器

## Capabilities

### New Capabilities

- `vite-dev-proxy`: vite.config.ts 設定 dev server proxy，/api 轉發至 localhost:5184
- `api-endpoints`: 集中式 API 端點模組（src/api/），以函式封裝各資源 CRUD
- `nginx-proxy`: nginx.conf 設定靜態檔服務與 /api 反向代理
- `docker-deployment`: Dockerfile 多階段 build 與 docker-compose.yml 容器編排

### Modified Capabilities

- `axios-wrapper`: baseURL 策略調整——dev 與 prod 皆為空字串，統一依賴 proxy 路由

## Impact

- **修改檔案**：`vite.config.ts`、`src/lib/http.ts`、`.env.example`
- **新增檔案**：`src/api/product.ts`、`src/api/index.ts`、`nginx.conf`、`Dockerfile`、`docker-compose.yml`
- **無 Breaking Change**：http.ts 封裝介面不變，僅調整 baseURL 預設值
- **僅 dev proxy 影響開發期間**，nginx proxy 影響 test/prod，行為對前端程式碼透明
