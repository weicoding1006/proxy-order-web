# 部署指南

## 架構概覽

```
瀏覽器
  ↓ HTTP :80
Nginx 容器（frontend）
  ├── /          → 前端靜態檔（React build）
  └── /api/*     → proxy_pass → .NET 後端容器 :8080
                                   （backend）
```

前後端為**獨立 GitHub 專案**，透過 Docker image 整合。前端 repo 持有 `docker-compose.yml` 負責統一啟動兩個容器。

---

## 環境說明

### 本機開發（Dev）

```
npm run dev
```

- Vite dev server 啟動，`/api/*` 由 Vite proxy 轉發至 `http://localhost:5184`
- 後端用 `dotnet run` 在本機跑，port 為 `launchSettings.json` 指定的 5184
- **不需要 Docker**

### 測試 / 正式環境（Test / Prod）

```
docker compose up
```

- Nginx 容器提供前端靜態檔，並將 `/api/*` 反向代理至後端容器的 port 8080
- 後端 .NET 10 容器透過 `ASPNETCORE_HTTP_PORTS=8080` 監聽（.NET 8+ 容器預設）
- 前端程式碼在兩種環境都只寫 `/api/...`，**零感知環境差異**

---

## 前端 API 請求規則

所有 API 呼叫統一使用**相對路徑**，不帶 domain：

```ts
// ✅ 正確
get('/api/products')
post('/api/orders', data)

// ❌ 不要這樣寫
get('http://localhost:5184/api/products')
```

底層 `src/lib/http.ts` 的 `baseURL` 設為空字串，完全依賴各環境的 proxy 處理。

---

## 部署步驟

### 1. 後端準備

後端 repo 需要有 CI/CD 能 build Docker image 並推送至 Container Registry：

```bash
# 範例：推送至 GitHub Container Registry
docker build -t ghcr.io/your-org/your-backend:latest .
docker push ghcr.io/your-org/your-backend:latest
```

### 2. 前端環境設定

複製 `.env.example` 為 `.env`，填入後端 image 名稱：

```bash
cp .env.example .env
```

```env
BACKEND_IMAGE=ghcr.io/your-org/your-backend:latest
```

### 3. 啟動服務

```bash
docker compose up -d
```

- `frontend` 容器：從本地 `Dockerfile` build，監聽 port 80
- `backend` 容器：從 `BACKEND_IMAGE` pull，內部監聽 port 8080（不對外暴露）

### 4. 停止服務

```bash
docker compose down
```

---

## 容器 Port 說明

| 容器 | 內部 Port | 對外暴露 | 說明 |
|---|---|---|---|
| frontend（Nginx） | 80 | ✅ 80 | 唯一對外入口 |
| backend（.NET 10） | 8080 | ❌ 不暴露 | 只供 Nginx 內部存取 |

> 雲端防火牆只需要開放 port 80（或 443），後端 port 完全不需要對外。

---

## 後端環境變數說明

`docker-compose.yml` 注入給後端容器的環境變數：

| 變數 | 值 | 說明 |
|---|---|---|
| `ASPNETCORE_HTTP_PORTS` | `8080` | .NET 10 容器監聽的 port |
| `ASPNETCORE_ENVIRONMENT` | `Production` | 載入 `appsettings.Production.json`，關閉 Swagger、精簡錯誤訊息 |

後端 `Program.cs` **不需要任何改動**，.NET runtime 自動讀取這兩個環境變數。

---

## 前後端分開 Repo 的協作流程

```
後端 repo CI/CD                    前端 repo
    ↓ build & push image               ↓
ghcr.io/org/backend:v1.2   →   .env: BACKEND_IMAGE=...v1.2
                                       ↓
                               docker compose up
```

1. 後端有新版本 → CI/CD 推新 image tag（如 `v1.2`）
2. 前端更新 `.env` 的 `BACKEND_IMAGE` 至新 tag
3. 重新 `docker compose up` 即完成更新

---

## CORS 說明

因為 Nginx 做 reverse proxy，瀏覽器的 API 請求是打**同一個 domain**（如 `http://your-domain.com/api/...`），屬於同源請求，**後端不需要設定 CORS**。

只有在後端 port 直接對外暴露（不透過 Nginx）的情況下才需要處理 CORS。

---

## 常用指令速查

```bash
# 本機開發
npm run dev

# Build 前端 Docker image（測試用）
docker build -t proxy-order-web .

# 啟動所有容器
docker compose up -d

# 查看容器狀態
docker compose ps

# 查看 Nginx log
docker compose logs frontend

# 查看後端 log
docker compose logs backend

# 停止並移除容器
docker compose down
```
