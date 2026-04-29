## ADDED Requirements

### Requirement: Sidebar 顯示導覽連結
Sidebar SHALL 顯示一組導覽連結，每個連結包含圖示與文字標籤，點擊後切換至對應路由。

#### Scenario: 點擊導覽連結
- **WHEN** 使用者點擊 Sidebar 中的連結
- **THEN** 頁面切換至對應路由，主內容區更新為該路由的頁面元件

#### Scenario: 當前頁面高亮
- **WHEN** 使用者所在路由與某個連結對應
- **THEN** 該連結顯示高亮樣式（有別於非當前頁的連結）

### Requirement: Sidebar 可收合
Sidebar SHALL 提供收合按鈕，切換展開（圖示＋文字）與收合（僅圖示）兩種顯示模式。

#### Scenario: 展開狀態
- **WHEN** Sidebar 處於展開狀態
- **THEN** 每個導覽項目顯示圖示與文字標籤，Sidebar 寬度較寬

#### Scenario: 收合 Sidebar
- **WHEN** 使用者點擊收合按鈕
- **THEN** Sidebar 切換為收合狀態，僅顯示圖示，寬度縮減

#### Scenario: 展開 Sidebar
- **WHEN** Sidebar 處於收合狀態，使用者點擊展開按鈕
- **THEN** Sidebar 恢復展開狀態，文字標籤重新出現
