## 1. Auth Utility

- [x] 1.1 建立 `src/utils/auth.ts`，實作 `getToken()`、`getExpiresAt()`、`clearAuth()`、`isTokenExpired()`、`getRemainingSeconds()`

## 2. Token Countdown Hook

- [x] 2.1 建立 `src/hooks/useTokenCountdown.ts`，以 `setInterval(1000)` 每秒計算剩餘秒數，回傳格式化字串（`HH:MM:SS`）
- [x] 2.2 剩餘秒數 ≤ 0 時，hook 內呼叫 `clearAuth()` 並 `navigate('/login')`

## 3. Auth Guard Hook

- [x] 3.1 建立 `src/hooks/useAuthGuard.ts`，在 `useEffect` 中檢查 `isTokenExpired()` 或無 token，若是則 `clearAuth()` 並 `navigate('/login')`

## 4. AppLayout 整合

- [x] 4.1 在 `src/layouts/AppLayout.tsx` 引入並呼叫 `useAuthGuard()`

## 5. Sidebar 整合

- [x] 5.1 在 `src/components/Sidebar.tsx` 引入 `useTokenCountdown()`，在展開狀態下於導航區上方顯示剩餘時間（`HH:MM:SS`）
- [x] 5.2 在 Sidebar 底部新增登出按鈕，點擊呼叫 `clearAuth()` 並 `navigate('/login')`；收合時只顯示圖示，展開時顯示圖示與「登出」文字
