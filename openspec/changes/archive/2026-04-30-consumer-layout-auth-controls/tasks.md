## 1. ConsumerLayout 新增 Auth 控制項

- [x] 1.1 在 `src/layouts/ConsumerLayout.tsx` 匯入 `useTokenCountdown`、`clearAuth`、`useNavigate`
- [x] 1.2 在 Header 右側（導覽連結旁）新增 token 倒數文字（`font-mono text-xs text-yellow-600`）
- [x] 1.3 在 Header 右側新增登出按鈕，點擊後呼叫 `clearAuth()` 並 `navigate('/login')`

## 2. 驗證

- [ ] 2.1 以一般使用者登入，確認前台 Header 顯示倒數計時
- [ ] 2.2 點擊登出按鈕，確認清除 auth 並跳轉 `/login`
