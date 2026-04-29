## Context

登入流程（`LoginPage.tsx`）已將 `token` 與 `expiresAt` 存入 `localStorage`。
受保護的路由透過 `AppLayout` 包裹，`Sidebar` 是所有受保護頁面共用的導航元件。
目前沒有任何登出入口、剩餘時間顯示，也沒有過期偵測，token 過期後使用者仍停留在系統內。

## Goals / Non-Goals

**Goals:**
- 在 Sidebar 顯示 token 剩餘有效時間倒數（每秒更新），時間到自動登出
- 在 Sidebar 提供登出按鈕，清除 localStorage 並跳轉 `/login`
- 在 AppLayout 加入路由守衛，防止未登入狀態進入受保護頁面
- 封裝所有 auth localStorage 操作到單一 utility

**Non-Goals:**
- 不引入 Redux / Context — token 不需跨元件響應式共享
- 不實作 token refresh
- 不修改 API 層 401 攔截（屬於另一個 change）

## Decisions

### 1. 不使用 Redux 管理 auth 狀態

**選擇**：直接操作 localStorage + 工具函式，不放入 Redux store。

**理由**：
- localStorage 本身即是單一來源，Redux store 只是鏡像，多一層同步反而增加複雜度
- 剩餘時間倒數的需求由 `useTokenCountdown` hook 的 `setInterval` 驅動，不需要 store
- 登出後立即 `navigate('/login')`，不需要任何元件因 store 更新而重新渲染

**替代方案**：
- *React Context*：若未來需要在 UI 顯示使用者資訊（name、role）才值得引入
- *Redux*：適合多 slice 共用 auth、devtools 追蹤的大型應用

### 2. 倒數計時放在 `useTokenCountdown` hook，倒數為 0 時自動登出

**選擇**：在 hook 內以 `setInterval(fn, 1000)` 每秒重新計算 `expiresAt - Date.now()`，
剩餘秒數 ≤ 0 時呼叫 `clearAuth()` 並 `navigate('/login')`。

**理由**：
- Sidebar 元件只需呼叫 `useTokenCountdown()` 取得格式化字串即可，邏輯不外漏
- 同一個 hook 同時承擔顯示與過期處理，避免分散成兩個 interval

**替代方案**：
- *AppLayout useEffect 每分鐘輪詢*：無法驅動每秒更新的倒數顯示，不適用

### 3. auth 工具函式集中於 `src/utils/auth.ts`

提供：`getToken()`、`getExpiresAt()`、`clearAuth()`、`isTokenExpired()`、`getRemainingSeconds()`。
所有元件和 hook 都引用同一套函式，避免 localStorage key 字串散落。

### 4. `useAuthGuard` 放在 AppLayout，負責首次進入守衛

**選擇**：`AppLayout` 的 `useEffect` 中呼叫 `useAuthGuard`，若無有效 token 立即跳轉。

**理由**：
- `useTokenCountdown` 只在 Sidebar 掛載後才開始計時，若使用者直接輸入 URL 進入，
  AppLayout 層的守衛可在渲染前攔截
- 兩者職責明確：守衛負責「進入時」，倒數負責「停留中」

## Risks / Trade-offs

- **時鐘偏移**：`getRemainingSeconds()` 用本地時間與後端回傳的 `expiresAt` 比較，
  若本地時鐘偏差大會誤判 → 接受，實務影響極小
- **多分頁登出同步**：登出只清除當前分頁的 localStorage，其他分頁要等自身的 interval 偵測
  → 可用 `storage` 事件監聽改善，列為未來 backlog
- **Sidebar 未掛載時無倒數**：倒數邏輯在 Sidebar 的 hook 中，若 Sidebar 未渲染（如行動版隱藏）
  需確保 AppLayout 的守衛仍正常運作 → 兩層防護互補，無此問題
