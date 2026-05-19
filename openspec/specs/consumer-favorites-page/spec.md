## Requirements

### Requirement: 顯示收藏商品列表
頁面 `/favorites` SHALL 顯示登入使用者所有已收藏的商品，每個項目包含封面圖、商品名稱、價格與加入收藏時間。

#### Scenario: 有收藏商品
- **WHEN** 使用者進入 `/favorites` 頁面且有已收藏商品
- **THEN** 頁面以網格排列展示所有收藏商品卡片，每張卡片顯示封面圖、名稱、價格

#### Scenario: 無收藏商品
- **WHEN** 使用者進入 `/favorites` 頁面且沒有任何收藏
- **THEN** 頁面顯示空狀態訊息「尚無收藏商品」並提供「前往逛逛」連結至 `/`

#### Scenario: 載入中
- **WHEN** 頁面正在向 API 取得收藏清單
- **THEN** 顯示載入中佔位文字「載入中...」

### Requirement: 從收藏頁移除商品
使用者 SHALL 能在收藏頁直接移除單一收藏商品。

#### Scenario: 點擊移除按鈕
- **WHEN** 使用者點擊某商品卡片上的移除（心形）按鈕
- **THEN** 系統呼叫 `deleteFavorite` API，成功後該商品從清單消失

#### Scenario: 移除失敗
- **WHEN** `deleteFavorite` API 回傳錯誤
- **THEN** 商品留在清單中，按鈕恢復可用狀態

### Requirement: 點擊商品卡片導航至詳情頁
收藏頁的商品卡片 SHALL 支援點擊導航。

#### Scenario: 點擊卡片
- **WHEN** 使用者點擊收藏商品卡片（非移除按鈕區域）
- **THEN** 導航至 `/product/:id` 商品詳情頁
