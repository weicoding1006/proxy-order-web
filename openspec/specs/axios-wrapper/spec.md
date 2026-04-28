## ADDED Requirements

### Requirement: axios 安裝
專案 SHALL 安裝最新版 `axios`。

#### Scenario: 安裝套件
- **WHEN** 開發者執行 `npm install axios`
- **THEN** `package.json` 中出現 `axios` 為最新穩定版本

### Requirement: HTTP 封裝層建立
`src/lib/http.ts` MUST 建立 axios instance，並對外匯出封裝後的請求方法。

#### Scenario: 封裝檔案存在
- **WHEN** 開發者開啟 `src/lib/http.ts`
- **THEN** 可見 `axios.create()` 呼叫及匯出的 `get`、`post`、`put`、`del` 方法

### Requirement: baseURL 環境變數設定
axios instance 的 `baseURL` SHALL 從環境變數 `VITE_API_BASE_URL` 讀取。

#### Scenario: baseURL 正確套用
- **WHEN** `.env` 中設定 `VITE_API_BASE_URL=https://api.example.com`
- **THEN** 所有透過封裝層發出的請求 URL 前綴為 `https://api.example.com`

### Requirement: Request interceptor — Token 注入
Request interceptor MUST 自動將 localStorage 中的 token 加入 `Authorization` header。

#### Scenario: Token 存在時注入
- **WHEN** localStorage 存有 `token` 且發出任意請求
- **THEN** 請求 header 包含 `Authorization: Bearer <token>`

#### Scenario: Token 不存在時不注入
- **WHEN** localStorage 無 `token` 且發出任意請求
- **THEN** 請求 header 不包含 `Authorization`

### Requirement: Response interceptor — 統一錯誤處理
Response interceptor MUST 攔截 HTTP 錯誤並拋出統一格式的錯誤物件。

#### Scenario: 401 錯誤自動清除 token
- **WHEN** 伺服器回應 401 Unauthorized
- **THEN** localStorage 中的 `token` 被移除，並導向登入頁

#### Scenario: 其他錯誤格式化
- **WHEN** 伺服器回應非 2xx 狀態碼（非 401）
- **THEN** 拋出包含 `message`、`status` 欄位的 Error 物件
