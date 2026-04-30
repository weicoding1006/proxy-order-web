## MODIFIED Requirements

### Requirement: 登入成功後依 role 跳轉對應頁面
登入頁 SHALL 在 `login()` 回傳成功後，將 token 存入 localStorage，接著呼叫 `me()` 取得 roles，並依 roles 跳轉：roles 包含 `'Admin'` 則跳轉至 `/admin/products`，否則跳轉至 `/`。

#### Scenario: Admin 登入成功
- **WHEN** Admin 使用者填入正確憑證並提交
- **THEN** token 寫入 localStorage，`me()` 回傳 roles 含 `'Admin'`，頁面跳轉至 `/admin/products`

#### Scenario: 一般使用者登入成功
- **WHEN** 一般使用者填入正確憑證並提交
- **THEN** token 寫入 localStorage，`me()` 回傳 roles 不含 `'Admin'`，頁面跳轉至 `/`
