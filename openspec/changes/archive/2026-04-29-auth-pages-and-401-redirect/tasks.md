## 1. 登入頁面

- [x] 1.1 建立 `src/pages/LoginPage.tsx`，包含 email / password 受控表單欄位與 `useState` 管理 loading / error 狀態
- [x] 1.2 提交時呼叫 `login()`，成功後將 token 寫入 `localStorage`，以 `useNavigate` 跳轉至 `/`
- [x] 1.3 API 失敗時於表單下方顯示錯誤訊息
- [x] 1.4 新增「前往註冊」`<Link>` 連結指向 `/register`

## 2. 註冊頁面

- [x] 2.1 建立 `src/pages/RegisterPage.tsx`，包含 email / password / firstName / lastName 受控表單欄位
- [x] 2.2 提交時呼叫 `register()`，成功後以 `useNavigate` 跳轉至 `/login`
- [x] 2.3 API 失敗時於表單下方顯示錯誤訊息
- [x] 2.4 新增「前往登入」`<Link>` 連結指向 `/login`

## 3. 路由設定

- [x] 3.1 在 `src/router/index.tsx` 新增 `/login` 與 `/register` 為頂層路由（與 AppLayout 並列，不在其 children 內）
