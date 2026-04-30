## Requirements

### Requirement: Auth utility functions
系統 SHALL 提供 `src/utils/auth.ts`，集中管理所有 auth 相關的 localStorage 操作，
包含 `getToken()`、`getExpiresAt()`、`clearAuth()`、`isTokenExpired()`、`getRemainingSeconds()`、`getRole()`、`setRole()`、`clearRole()`。

#### Scenario: clearAuth removes all auth keys
- **WHEN** `clearAuth()` 被呼叫
- **THEN** localStorage 中的 `token`、`expiresAt` 與 `role` 均被移除

#### Scenario: isTokenExpired returns true when past expiry
- **WHEN** `isTokenExpired()` 被呼叫且 `expiresAt` 早於當前時間
- **THEN** 回傳 `true`

#### Scenario: isTokenExpired returns false when still valid
- **WHEN** `isTokenExpired()` 被呼叫且 `expiresAt` 晚於當前時間
- **THEN** 回傳 `false`

#### Scenario: getRemainingSeconds returns 0 when expired
- **WHEN** `getRemainingSeconds()` 被呼叫且 token 已過期
- **THEN** 回傳 `0`

#### Scenario: setRole stores role in localStorage
- **WHEN** `setRole('Admin')` 被呼叫
- **THEN** localStorage 中的 `role` 值為 `'Admin'`

#### Scenario: getRole retrieves stored role
- **WHEN** `getRole()` 被呼叫且 localStorage 有 role
- **THEN** 回傳存儲的 role 字串

### Requirement: Token countdown display in Sidebar
Sidebar SHALL 顯示 token 剩餘有效時間，格式為 `HH:MM:SS`，每秒更新一次。
Sidebar 收合時仍應保留倒數邏輯（但可隱藏文字），展開時顯示完整倒數字串。

#### Scenario: Countdown displays remaining time
- **WHEN** Sidebar 已展開且 token 有效
- **THEN** 顯示格式如 `01:23:45` 的剩餘時間

#### Scenario: Countdown triggers logout when reaches zero
- **WHEN** 剩餘時間倒數至 0
- **THEN** 系統自動呼叫 `clearAuth()` 並跳轉至 `/login`

#### Scenario: Countdown not visible when sidebar collapsed
- **WHEN** Sidebar 已收合
- **THEN** 剩餘時間文字不顯示，但 hook 的計時器仍在運作

### Requirement: Logout button in Sidebar
Sidebar SHALL 提供登出按鈕，顯示於底部。
展開時顯示圖示與「登出」文字，收合時只顯示圖示。

#### Scenario: Logout clears auth and redirects
- **WHEN** 使用者點擊登出按鈕
- **THEN** 系統呼叫 `clearAuth()` 清除 localStorage，並跳轉至 `/login`

#### Scenario: Logout button always visible
- **WHEN** Sidebar 展開或收合
- **THEN** 登出按鈕均可見（收合時僅顯示圖示）

### Requirement: Auth guard in AppLayout
`AppLayout` SHALL 在掛載時檢查 localStorage 是否有有效的 token，
若無 token 或 token 已過期，立即跳轉至 `/login` 並清除殘存的 auth 資料。

#### Scenario: Redirect unauthenticated user
- **WHEN** 使用者直接訪問受保護路由且無有效 token
- **THEN** 系統立即跳轉至 `/login`

#### Scenario: Allow authenticated user
- **WHEN** 使用者訪問受保護路由且 token 有效
- **THEN** 正常渲染 AppLayout 內容
