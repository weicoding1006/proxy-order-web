## 1. Auth Utils

- [x] 1.1 在 `src/utils/auth.ts` 新增 `setRole(role: string)`、`getRole()`、`clearRole()`
- [x] 1.2 更新 `clearAuth()` 一併呼叫 `clearRole()`

## 2. LoginPage 跳轉邏輯

- [x] 2.1 在 `src/pages/LoginPage.tsx` 的登入成功後，呼叫 `me()` 取得 roles
- [x] 2.2 呼叫 `setRole()` 存入 roles 中第一個值（預設 `'user'`）
- [x] 2.3 依 roles 判斷跳轉：包含 `'Admin'` → `navigate('/admin/products')`，否則 → `navigate('/')`
- [x] 2.4 `me()` 失敗時 catch 區塊 fallback 至 `navigate('/')`

## 3. 驗證

- [ ] 3.1 以 Admin 帳號登入，確認跳轉至 `/admin/products`
- [ ] 3.2 以一般使用者帳號登入，確認跳轉至 `/`
- [ ] 3.3 登出後確認 localStorage 的 role 也被清除
