## ADDED Requirements

### Requirement: 登入後依 role 跳轉至對應頁面
系統 SHALL 在登入成功、token 存入後，呼叫 `me()` 取得使用者 roles，並依 roles 決定跳轉目標：roles 包含 `'Admin'` 則跳轉至 `/admin/products`，否則跳轉至 `/`。

#### Scenario: Admin 使用者登入後跳轉後台
- **WHEN** 使用者以 Admin 帳號登入成功
- **THEN** 系統呼叫 `me()`，確認 roles 包含 `'Admin'`，跳轉至 `/admin/products`

#### Scenario: 一般使用者登入後跳轉前台
- **WHEN** 使用者以非 Admin 帳號登入成功
- **THEN** 系統呼叫 `me()`，roles 不包含 `'Admin'`，跳轉至 `/`

#### Scenario: me() 呼叫失敗時 fallback
- **WHEN** 登入成功但 `me()` 拋出錯誤
- **THEN** 系統 fallback 跳轉至 `/`，不阻塞登入流程
