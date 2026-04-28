## Context

專案為 React + Vite + TypeScript 前端，後端為獨立服務跑在 port 5184。目前 `src/lib/http.ts` 的 `baseURL` 從 `VITE_API_BASE_URL` 讀取，但沒有統一的路由策略。Dev 環境尚未設定 proxy，Test/Prod 也沒有容器化部署設定。

## Goals / Non-Goals

**Goals:**
- 所有環境下前端 API 呼叫一律使用 `/api/...` 相對路徑，不帶 domain
- Dev：Vite dev server proxy 負責轉發
- Test/Prod：Nginx 反向代理負責轉發
- 前端程式碼零感知環境差異
- 建立 `src/api/` 集中管理所有 API 端點函式
- 提供可用的 Docker + Nginx 部署設定

**Non-Goals:**
- 後端服務的容器化（僅前端 + Nginx）
- HTTPS / SSL 設定（由上層 load balancer 處理）
- CI/CD pipeline 設定
- API 認證機制設計（已在 http.ts interceptor 處理）

## Decisions

### 1. baseURL 策略：統一為空字串

**決策**：`src/lib/http.ts` 的 `baseURL` 設為空字串（`''`），不讀取環境變數。  
**理由**：Dev 用 Vite proxy、Prod 用 Nginx proxy，前端程式碼呼叫 `/api/xxx` 在兩個環境都能正確路由，不需要環境變數切換。  
**替代方案**：用 `VITE_API_BASE_URL` 在不同 `.env` 檔切換 → 捨棄，因為需要維護多個 env 檔且容易出錯。

### 2. Vite proxy — 僅 dev

**決策**：在 `vite.config.ts` 的 `server.proxy` 加入 `/api` → `http://localhost:5184` 的代理規則。  
**理由**：這是 Vite 官方推薦的開發期間跨域解法，設定簡單，build 後不帶入。  
**注意**：`changeOrigin: true` 確保 Host header 正確傳遞。

### 3. Nginx — 靜態檔 + API proxy

**決策**：單一 Nginx 容器同時服務前端靜態檔與代理 API：
- `location /` → `root /usr/share/nginx/html` + `try_files` SPA fallback
- `location /api/` → `proxy_pass http://backend:5184/api/`

**理由**：減少容器數量，Nginx 本身極輕量，適合同時承擔兩個職責。  
**替代方案**：前端靜態檔用 CDN，Nginx 只做 proxy → 適合大流量場景，目前過早優化。

### 4. Dockerfile — 多階段 build

**決策**：使用 multi-stage build：
- Stage 1（`builder`）：`node:20-alpine` 執行 `npm ci && npm run build`
- Stage 2（`runner`）：`nginx:alpine` 複製 `dist/` 並套用 `nginx.conf`

**理由**：最終 image 只含 Nginx + 靜態檔，不包含 node_modules，image 體積極小（< 30MB）。

### 5. API 端點模組結構

**決策**：`src/api/<resource>.ts` 每個檔案負責一個資源，底層呼叫 `src/lib/http.ts` 的封裝方法。

```
src/api/
├── index.ts        ← 統一 re-export
└── product.ts      ← 商品 CRUD
```

**理由**：按資源分檔讓新增 API 時只需新增對應檔案，不會造成單一大型檔案難以維護。  
**命名規則**：函式用動詞開頭（`fetchProducts`、`createProduct`），型別定義放同檔案。

## Risks / Trade-offs

- **Nginx 設定錯誤** → SPA 路由 404 或 API 代理失敗：`try_files $uri $uri/ /index.html` 必須存在，`proxy_pass` 的尾部斜線需一致 → 提供完整測試過的 nginx.conf 範本
- **docker-compose backend 服務名稱**：`proxy_pass http://backend:5184` 中的 `backend` 必須與 docker-compose service 名稱一致 → 在 docker-compose.yml 與 nginx.conf 中使用相同名稱並加上說明
- **本機開發 baseURL 為空**：若直接用 `http.ts` 發送請求而未透過 Vite dev server（例如跑測試），`/api/xxx` 會打到 localhost 的測試 runner → 測試環境需另外 mock，屬已知限制

## Migration Plan

1. 更新 `src/lib/http.ts` baseURL → 空字串
2. 更新 `vite.config.ts` 加入 proxy
3. 新增 `src/api/product.ts` 與 `src/api/index.ts`
4. 新增 `nginx.conf`、`Dockerfile`、`docker-compose.yml`
5. 本機執行 `npm run dev`，確認 `/api` 代理正常
6. 執行 `docker build` 確認 image build 成功
7. 執行 `docker compose up`，確認靜態檔與 API proxy 正常
