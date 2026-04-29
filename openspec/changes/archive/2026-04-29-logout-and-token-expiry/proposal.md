## Why

目前登入後會將 token 與 expiresAt 存入 localStorage，但系統缺少登出機制，也沒有在 token 過期後自動處理。使用者無法主動登出，且過期的 token 會持續留存，造成後續 API 請求失敗或安全疑慮。

## What Changes

- 在 Sidebar 新增「登出」按鈕，點擊後清除 localStorage 中的 token / expiresAt 並跳轉至登入頁
- 在 Sidebar 顯示 token 剩餘有效時間（倒數），每秒更新
- 在應用程式層級（Layout 或 router guard）加入 token 過期偵測，過期時自動清除並強制跳轉至登入頁
- **不引入 Redux**：auth 狀態（是否已登入）只需在路由守衛層判斷，不需要全域 store；localStorage 本身即是單一來源

## Capabilities

### New Capabilities
- `auth-session`: 管理登入狀態的工具函式與 hook，包含 logout、isAuthenticated、isTokenExpired 判斷、token 剩餘時間計算，以及在 Layout 層自動偵測過期並強制跳轉

### Modified Capabilities
- （無現有 spec 需異動）

## Impact

- `src/components/Sidebar.tsx`：新增登出按鈕、token 剩餘時間倒數顯示
- `src/utils/auth.ts`（新增）：封裝 localStorage 操作（getToken、getExpiresAt、clearAuth、isExpired、getRemainingSeconds）
- `src/hooks/useTokenCountdown.ts`（新增）：每秒計算剩餘秒數，回傳格式化字串（HH:MM:SS），剩餘為 0 時觸發登出
- `src/hooks/useAuthGuard.ts`（新增）：在 Layout 掛載時檢查 token 過期，過期即清除並 navigate 到 /login
- `src/layouts/AppLayout.tsx`：引入 useAuthGuard
- 不影響 API 層與 Redux store
