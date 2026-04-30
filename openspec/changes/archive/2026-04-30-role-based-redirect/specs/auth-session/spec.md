## MODIFIED Requirements

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
