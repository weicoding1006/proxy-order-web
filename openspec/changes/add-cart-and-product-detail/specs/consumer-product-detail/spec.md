## ADDED Requirements

### Requirement: 商品詳情頁顯示商品完整資訊
ConsumerProductDetailPage SHALL 透過路由參數 `:id` 呼叫 `fetchProductById(id)`，並顯示商品的名稱、描述、價格（格式 `NT$ {price}`）、剩餘庫存與圖片區。

#### Scenario: 成功載入商品詳情
- **WHEN** 使用者瀏覽 `/products/:id` 且 API 成功回傳商品
- **THEN** 頁面顯示商品名稱、描述、價格、庫存數量與圖片區

#### Scenario: 載入中
- **WHEN** `fetchProductById` 尚未回傳結果
- **THEN** 頁面顯示載入中指示

#### Scenario: 載入失敗或商品不存在
- **WHEN** `fetchProductById` 拋出錯誤或回傳 404
- **THEN** 頁面顯示錯誤訊息，且不顯示加入購物車操作

### Requirement: 商品詳情頁圖片區顯示主圖與縮圖
ConsumerProductDetailPage SHALL 預設以 `images.find(img => img.isCover)` 作為主圖；若所有圖片皆非封面，使用第一張；若 `images` 為空或不存在則顯示灰色佔位符。其餘圖片 SHALL 以縮圖排列在主圖下方，點擊縮圖 SHALL 切換主圖。

#### Scenario: 顯示封面圖
- **WHEN** 商品 `images` 內存在 `isCover === true` 的圖片
- **THEN** 主圖區顯示該封面圖片

#### Scenario: 切換主圖
- **WHEN** 使用者點擊任一縮圖
- **THEN** 主圖區更新為該縮圖對應的圖片

#### Scenario: 無圖片
- **WHEN** 商品無 `images` 或為空陣列
- **THEN** 主圖區顯示灰色佔位符，且不顯示縮圖列

### Requirement: 商品詳情頁提供加入購物車操作
ConsumerProductDetailPage SHALL 提供數量輸入（最小 1、最大為 `stock`）與「加入購物車」按鈕。當庫存為 0 時，按鈕 SHALL 為 disabled 並顯示「缺貨」提示。

#### Scenario: 成功加入購物車
- **WHEN** 使用者輸入數量 N 並點擊「加入購物車」
- **THEN** 系統呼叫 `addCartItem({ productId, quantity: N })`，成功後顯示成功提示並更新 Header 購物車徽章數量

#### Scenario: 缺貨商品
- **WHEN** 商品 `stock === 0`
- **THEN** 數量輸入與「加入購物車」按鈕 SHALL disabled，並顯示缺貨提示

#### Scenario: 數量超過庫存
- **WHEN** 使用者嘗試輸入大於 `stock` 的數量
- **THEN** 數量自動限制為 `stock`，或顯示驗證訊息阻止送出

#### Scenario: 加入購物車失敗
- **WHEN** `addCartItem` 拋出錯誤
- **THEN** 頁面顯示錯誤提示，不更新購物車狀態
