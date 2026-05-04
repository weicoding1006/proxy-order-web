## ADDED Requirements

### Requirement: Modal 顯示商品現有圖片
ProductImageUploadModal SHALL 在開啟時顯示傳入 `images` 陣列中的所有圖片縮圖與其排序。

#### Scenario: 有現有圖片
- **WHEN** `images` 陣列不為空
- **THEN** Modal 內顯示每張圖片的縮圖，並標示哪張是封面（`isCover: true`）

#### Scenario: 無現有圖片
- **WHEN** `images` 陣列為空或 undefined
- **THEN** Modal 內顯示「尚無圖片」提示文字

### Requirement: Modal 可上傳新圖片
ProductImageUploadModal SHALL 提供檔案選擇器，讓管理員選取圖片檔案後呼叫 `createProductImage` API 上傳。

#### Scenario: 選取圖片並上傳
- **WHEN** 管理員選取一個圖片檔案並點擊確認上傳
- **THEN** 呼叫 `createProductImage(productId, file)` API，上傳成功後觸發 `onUploaded` 回呼

#### Scenario: 上傳中狀態
- **WHEN** 圖片正在上傳
- **THEN** 上傳按鈕顯示為 disabled 並呈現載入中狀態，防止重複提交

#### Scenario: 上傳失敗
- **WHEN** `createProductImage` API 回傳錯誤
- **THEN** Modal 內顯示錯誤訊息，按鈕恢復可用狀態

### Requirement: Modal 可關閉
ProductImageUploadModal SHALL 在點擊關閉按鈕或背景遮罩時呼叫 `onClose` prop。

#### Scenario: 點擊關閉按鈕
- **WHEN** 使用者點擊關閉（X）按鈕
- **THEN** 呼叫 `onClose()`，Modal 消失

#### Scenario: 點擊背景遮罩
- **WHEN** 使用者點擊 Modal 背景遮罩區域
- **THEN** 呼叫 `onClose()`，Modal 消失
