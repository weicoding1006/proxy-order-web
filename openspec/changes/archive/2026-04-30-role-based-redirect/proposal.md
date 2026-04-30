## Why

登入成功後，所有使用者都被導向 `/`（前台），但管理員應進入 `/admin/products`。目前 `GET /api/auth/me` 已回傳 `roles: string[]`，可在登入後呼叫取得角色並決定跳轉目標，無需後端異動。

## What Changes

- 登入成功後，呼叫 `me()` 取得使用者角色
- 依 roles 判斷跳轉：包含 `'Admin'` 則導向 `/admin/products`，否則導向 `/`
- 將 role 存入 localStorage，供後續 guard 或 UI 使用
- 新增 `getRole()` / `setRole()` / `clearRole()` 至 `src/utils/auth.ts`

## Capabilities

### New Capabilities

- `role-based-login-redirect`: 登入後依 role 自動跳轉至對應頁面

### Modified Capabilities

- `login-page`: 登入成功後的跳轉邏輯改為依 role 決定目的地
- `auth-session`: 新增 role 欄位至 localStorage 儲存，`clearAuth` 一併清除

## Impact

- `src/pages/LoginPage.tsx`：登入成功後呼叫 `me()`，依 roles 決定 navigate 目標
- `src/utils/auth.ts`：新增 `getRole()`、`setRole()`、`clearRole()`
- `src/api/auth.ts`：已有 `me()`，無需修改
- 不引入 Redux，不做路由 guard，範圍最小化
