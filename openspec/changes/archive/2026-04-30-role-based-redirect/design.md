## Context

登入流程：`LoginPage` → `POST /api/auth/login` → 存 token + expiresAt → `navigate('/')`。`GET /api/auth/me` 已實作，回傳 `{ roles: string[] }`，但登入後未呼叫。需在登入成功後取得 role 並依此跳轉。

## Goals / Non-Goals

**Goals:**
- 登入成功後呼叫 `me()` 取得 roles，依角色跳轉至對應頁面
- 將 role 存入 localStorage 供後續使用
- 改動範圍最小（只動 LoginPage 與 auth utils）

**Non-Goals:**
- 路由 guard（未授權的 role 強制跳轉）
- Redux store 儲存 role
- 多角色複雜邏輯

## Decisions

### 登入後呼叫 me() 取得 role

登入 API 只回傳 token，不含 role。選擇在 `LoginPage.handleSubmit` 存完 token 後立即呼叫 `me()`，取得 roles 再跳轉。

替代方案：解析 JWT payload 取 role — 拒絕，JWT 結構不穩定且需額外 decode 邏輯。

### Role 判斷：`roles.includes('Admin')`

API 回傳 `roles: string[]`，判斷是否包含 `'Admin'`（大寫，與後端一致）：
- 包含 `'Admin'` → `navigate('/admin/products')`
- 否則 → `navigate('/')`

### Role 存入 localStorage

新增 `setRole(role: string)`、`getRole()`、`clearRole()` 至 `src/utils/auth.ts`，存儲 roles 中第一個值（或 `'user'` 為預設）。`clearAuth()` 同步清除 role。

## Risks / Trade-offs

- [風險] `me()` API 呼叫失敗（網路問題）→ catch 區塊 fallback 至 `navigate('/')`，不阻塞登入流程
- [取捨] 登入多一次 API call → 可接受，role 資訊需從伺服器取得

## Migration Plan

1. 在 `src/utils/auth.ts` 新增 role 相關 utils
2. 更新 `src/pages/LoginPage.tsx`：存完 token 後呼叫 `me()`，存 role，依 roles navigate
3. 更新 `clearAuth()` 清除 role

Rollback：只影響 LoginPage 的 navigate 邏輯，git revert 即可。
