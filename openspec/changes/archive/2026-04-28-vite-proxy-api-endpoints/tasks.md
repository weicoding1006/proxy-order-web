## 1. Vite Dev Proxy 設定

- [x] 1.1 修改 `vite.config.ts`，在 `defineConfig` 加入 `server.proxy`，將 `/api` 代理至 `http://localhost:5184`，設定 `changeOrigin: true`

## 2. axios baseURL 調整

- [x] 2.1 修改 `src/lib/http.ts`，將 `baseURL` 改為空字串 `''`（移除 `VITE_API_BASE_URL` 環境變數依賴）
- [x] 2.2 更新 `.env.example`，移除 `VITE_API_BASE_URL` 並加上說明：dev 透過 Vite proxy、prod 透過 Nginx proxy

## 3. API 端點模組

- [x] 3.1 建立 `src/api/` 目錄
- [x] 3.2 建立 `src/api/product.ts`，定義 `Product`、`CreateProductDto`、`UpdateProductDto` 型別
- [x] 3.3 在 `src/api/product.ts` 實作 `fetchProducts()`：`GET /api/products`
- [x] 3.4 在 `src/api/product.ts` 實作 `fetchProductById(id)`：`GET /api/products/{id}`
- [x] 3.5 在 `src/api/product.ts` 實作 `createProduct(data)`：`POST /api/products`
- [x] 3.6 在 `src/api/product.ts` 實作 `updateProduct(id, data)`：`PUT /api/products/{id}`
- [x] 3.7 在 `src/api/product.ts` 實作 `deleteProduct(id)`：`DELETE /api/products/{id}`
- [x] 3.8 建立 `src/api/index.ts`，re-export `src/api/product.ts` 的所有型別與函式

## 4. Nginx 設定

- [x] 4.1 建立 `nginx.conf`，設定 `location /` 服務靜態檔並加上 `try_files $uri $uri/ /index.html` SPA fallback
- [x] 4.2 在 `nginx.conf` 加入 `location /api/`，`proxy_pass` 至 `http://backend:8080/api/`，加上必要的 proxy header

## 5. Docker 設定

- [x] 5.1 建立 `Dockerfile`，Stage 1（`node:20-alpine`）執行 `npm ci && npm run build`
- [x] 5.2 在 `Dockerfile` Stage 2（`nginx:alpine`）複製 `dist/` 至 `/usr/share/nginx/html`，複製 `nginx.conf` 至 `/etc/nginx/conf.d/default.conf`
- [x] 5.3 建立 `docker-compose.yml`，定義 `frontend` service（使用本地 Dockerfile build，暴露 port 80）
- [x] 5.4 在 `docker-compose.yml` 定義 `backend` service，image 從環境變數 `BACKEND_IMAGE` 讀取，設定 `ASPNETCORE_HTTP_PORTS=8080`，不對外暴露 port
- [x] 5.5 更新 `.env.example`，新增 `BACKEND_IMAGE=your-backend-image:latest` 說明

## 6. 驗證

- [ ] 6.1 執行 `npm run dev`，確認 `/api/products` 被代理至 `http://localhost:5184/api/products`（需後端運行中）
- [ ] 6.2 執行 `docker build -t proxy-order-web .`，確認 build 成功
- [x] 6.3 確認 TypeScript 無錯誤：`npx tsc --noEmit`
