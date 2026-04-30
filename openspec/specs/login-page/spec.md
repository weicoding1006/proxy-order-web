## Requirements

### Requirement: 登入頁顯示登入表單
登入頁 SHALL 顯示包含 email 與 password 欄位的表單及提交按鈕。

#### Scenario: 表單初始狀態
- **WHEN** 使用者訪問 `/login`
- **THEN** 頁面顯示 email 輸入欄、password 輸入欄與「登入」按鈕

### Requirement: 登入成功後依 role 跳轉對應頁面
登入頁 SHALL 在 `login()` 回傳成功後，將 token 存入 localStorage，接著呼叫 `me()` 取得 roles，並依 roles 跳轉：roles 包含 `'Admin'` 則跳轉至 `/admin/products`，否則跳轉至 `/`。

#### Scenario: Admin 登入成功
- **WHEN** Admin 使用者填入正確憑證並提交
- **THEN** token 寫入 localStorage，`me()` 回傳 roles 含 `'Admin'`，頁面跳轉至 `/admin/products`

#### Scenario: 一般使用者登入成功
- **WHEN** 一般使用者填入正確憑證並提交
- **THEN** token 寫入 localStorage，`me()` 回傳 roles 不含 `'Admin'`，頁面跳轉至 `/`

### Requirement: 登入失敗顯示錯誤訊息
登入頁 SHALL 在 `login()` 拋出錯誤時於表單下方顯示錯誤提示。

#### Scenario: 登入失敗
- **WHEN** 使用者填入錯誤憑證並提交
- **THEN** 頁面顯示錯誤訊息，不跳轉

### Requirement: 登入頁提供前往註冊的連結
登入頁 SHALL 顯示「前往註冊」連結，點擊後導向 `/register`。

#### Scenario: 點擊前往註冊
- **WHEN** 使用者點擊「前往註冊」連結
- **THEN** 路由切換至 `/register`
