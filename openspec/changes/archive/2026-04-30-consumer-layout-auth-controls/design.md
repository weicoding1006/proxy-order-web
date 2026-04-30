## Context

`useTokenCountdown` hook 已存在（`src/hooks/useTokenCountdown.ts`），同時負責倒數顯示與 token 過期自動登出。`Sidebar`（後台）已使用此 hook。`ConsumerLayout` 只需匯入並在 Header 中渲染倒數文字與登出按鈕即可，無需新增 hook 或 util。

## Goals / Non-Goals

**Goals:**
- ConsumerLayout Header 顯示 token 剩餘時間（格式 `HH:MM:SS`）
- ConsumerLayout Header 提供登出按鈕，點擊後清除 auth 並跳轉 `/login`
- token 到期自動登出（hook 已內建此邏輯）

**Non-Goals:**
- 修改 `useTokenCountdown` hook 本身
- 在 AdminLayout 做任何改動

## Decisions

### 直接在 ConsumerLayout 使用 useTokenCountdown

與 Sidebar 相同做法：在元件頂層呼叫 `useTokenCountdown()`，回傳的倒數字串直接渲染在 Header 右側。登出按鈕呼叫 `clearAuth()` 再 `navigate('/login')`。

替代方案：抽出共用的 `AuthHeaderControls` 元件 — 延後，此次只有一處使用，過早抽象。

## Risks / Trade-offs

- [取捨] Header 空間有限，倒數文字 + 登出按鈕可能在小螢幕擠壓導覽連結 → 倒數文字使用 `font-mono text-xs`，登出按鈕精簡顯示，問題可控
