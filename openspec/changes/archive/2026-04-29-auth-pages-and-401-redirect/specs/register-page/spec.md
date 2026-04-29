## ADDED Requirements

### Requirement: 註冊頁顯示註冊表單
註冊頁 SHALL 顯示包含 email、password、firstName、lastName 欄位的表單及提交按鈕。

#### Scenario: 表單初始狀態
- **WHEN** 使用者訪問 `/register`
- **THEN** 頁面顯示四個輸入欄（email、password、firstName、lastName）與「註冊」按鈕

### Requirement: 註冊成功後跳轉登入頁
註冊頁 SHALL 在 `register()` 回傳成功後跳轉至 `/login`。

#### Scenario: 註冊成功
- **WHEN** 使用者填入完整資料並提交
- **THEN** 頁面跳轉至 `/login`

### Requirement: 註冊失敗顯示錯誤訊息
註冊頁 SHALL 在 `register()` 拋出錯誤時於表單下方顯示錯誤提示。

#### Scenario: 註冊失敗
- **WHEN** API 回傳錯誤（如 email 已存在）
- **THEN** 頁面顯示錯誤訊息，不跳轉

### Requirement: 註冊頁提供前往登入的連結
註冊頁 SHALL 顯示「前往登入」連結，點擊後導向 `/login`。

#### Scenario: 點擊前往登入
- **WHEN** 使用者點擊「前往登入」連結
- **THEN** 路由切換至 `/login`
