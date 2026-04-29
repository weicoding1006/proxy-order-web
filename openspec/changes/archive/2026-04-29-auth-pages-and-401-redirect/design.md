## Context

`src/lib/http.ts` 已實作 401 攔截：清除 localStorage 的 token 並執行 `window.location.href = '/login'`。token 的讀取也在 request 攔截器中處理（從 localStorage 取 `token` 加入 Authorization header）。登入/註冊頁面只需完成表單、呼叫 API、處理回應，無需改動 http 層。

## Goals / Non-Goals

**Goals:**
- `/login` 頁面：提交後呼叫 `login()`，將回應中的 token 存入 `localStorage.setItem('token', ...)`，跳轉 `/`
- `/register` 頁面：提交後呼叫 `register()`，成功跳轉 `/login`
- 兩頁路由置於 AppLayout 之外（不顯示 Sidebar）
- 登入頁提供「前往註冊」連結，註冊頁提供「前往登入」連結

**Non-Goals:**
- JWT 解碼或 token 過期自動刷新
- 「記住我」或 session 管理
- 受保護路由（ProtectedRoute / AuthGuard）
- 登出功能

## Decisions

### `/login`、`/register` 路由放在 AppLayout 之外

認證頁面不需要 Sidebar，應為全頁獨立頁面。React Router 支援多個頂層路由物件，登入/註冊路由直接與 AppLayout 路由並列即可。

### token 儲存於 localStorage，key 為 `token`

與現有 request 攔截器一致（`localStorage.getItem('token')`），不引入新儲存機制。

### 登入成功後用 `useNavigate` 跳轉，不用 `window.location.href`

在 React 元件內使用 `useNavigate` 可保持 SPA 路由行為；`window.location.href` 僅在攔截器（React 環境外）使用。

### 後端回應格式假設

`login()` 回應預設包含 `token` 欄位（`{ token: string }`）。若後端格式不同，只需修改存取欄位。

## Risks / Trade-offs

- **後端 login 回應欄位未確認** → 以 `token` 為預設欄位名，型別標注為 `any` 方便後續調整
- **無 ProtectedRoute** → 使用者直接輸入 URL 仍可訪問頁面，但 API 會回 401 並自動跳轉登入，行為可接受
