## Why

`ConsumerLayout` 的 Header 目前只有導覽連結，沒有登出按鈕與 token 倒數計時。一般使用者登入前台後無法主動登出，token 過期也沒有視覺提示。`AdminLayout` 的 Sidebar 已有這兩個功能（透過 `useTokenCountdown` hook），前台應提供相同體驗。

## What Changes

- `ConsumerLayout` Header 新增 token 倒數計時顯示（格式 `HH:MM:SS`）
- `ConsumerLayout` Header 新增登出按鈕，點擊後清除 auth 並跳轉 `/login`
- token 到期時自動登出並跳轉 `/login`（複用現有 `useTokenCountdown` hook）

## Capabilities

### New Capabilities

- (無新 capability，為現有前台 Layout 的功能補全)

### Modified Capabilities

- `consumer-layout`: Header 新增登出按鈕與 token 倒數計時

## Impact

- `src/layouts/ConsumerLayout.tsx`：匯入 `useTokenCountdown`、`clearAuth`、`useNavigate`，在 Header 加入倒數與登出按鈕
- 無 API 異動，無新依賴
