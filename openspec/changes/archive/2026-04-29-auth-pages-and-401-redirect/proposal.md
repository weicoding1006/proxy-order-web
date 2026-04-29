## Why

`src/lib/http.ts` 的 axios 攔截器在收到 401 時已自動清除 token 並跳轉至 `/login`，但目前沒有登入頁面，導致使用者遇到 401 後會看到空白頁或 404。平台需要登入與註冊頁面來完成認證流程。

## What Changes

- 新增登入頁 `src/pages/LoginPage.tsx`，呼叫 `login()` API，成功後將 token 存入 localStorage 並跳轉首頁
- 新增註冊頁 `src/pages/RegisterPage.tsx`，呼叫 `register()` API，成功後跳轉登入頁
- 在 `src/router/index.tsx` 新增 `/login`、`/register` 路由，置於 AppLayout **之外**（不顯示 Sidebar）
- `src/lib/http.ts` 的 401 攔截邏輯已正確，**無需修改**

## Capabilities

### New Capabilities
- `login-page`: 登入表單頁，含 email / password 欄位、表單驗證、API 呼叫、成功跳轉、錯誤提示
- `register-page`: 註冊表單頁，含 email / password / firstName / lastName 欄位、API 呼叫、成功跳轉、錯誤提示

### Modified Capabilities
<!-- 無現有 spec 需修改 -->

## Impact

- 新增 `src/pages/LoginPage.tsx`
- 新增 `src/pages/RegisterPage.tsx`
- 修改 `src/router/index.tsx`：新增 `/login`、`/register` 為頂層路由（不在 AppLayout children 內）
- 使用既有 `src/api/auth.ts` 的 `login`、`register`，無需修改
