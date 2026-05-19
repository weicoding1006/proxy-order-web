## Requirements

### Requirement: 收藏切換按鈕狀態顯示
收藏切換按鈕 SHALL 根據 Redux `favoritesSlice` 中的狀態顯示已收藏（實心心形）或未收藏（空心心形）。

#### Scenario: 商品已收藏
- **WHEN** Redux store 中包含該商品的收藏記錄
- **THEN** 按鈕顯示實心紅色心形圖示

#### Scenario: 商品未收藏
- **WHEN** Redux store 中不含該商品的收藏記錄
- **THEN** 按鈕顯示空心灰色心形圖示

### Requirement: 收藏切換操作
使用者點擊收藏按鈕 SHALL 觸發對應 API 並更新 Redux 狀態。

#### Scenario: 收藏未收藏的商品
- **WHEN** 使用者點擊未收藏商品的心形按鈕
- **THEN** 系統呼叫 `addFavorite(productId)`，成功後 Redux store 加入該商品，按鈕變為實心紅色

#### Scenario: 取消收藏已收藏的商品
- **WHEN** 使用者點擊已收藏商品的心形按鈕
- **THEN** 系統呼叫 `deleteFavorite(productId)`，成功後 Redux store 移除該商品，按鈕變為空心

#### Scenario: 操作進行中
- **WHEN** API 請求尚未完成
- **THEN** 按鈕處於 disabled 狀態，避免重複點擊

### Requirement: favoritesSlice 初始化
`favoritesSlice` SHALL 在 ConsumerLayout 掛載時從 API 載入收藏清單。

#### Scenario: 使用者已登入
- **WHEN** ConsumerLayout 掛載且 token 存在
- **THEN** 呼叫 `getFavorites` API 並將結果儲存至 Redux store

#### Scenario: 使用者未登入
- **WHEN** ConsumerLayout 掛載且 token 不存在
- **THEN** 不呼叫 API，store 保持空陣列
