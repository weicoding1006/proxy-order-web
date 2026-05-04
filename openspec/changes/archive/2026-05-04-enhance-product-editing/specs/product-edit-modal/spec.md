## ADDED Requirements

### Requirement: ProductEditModal 顯示商品現有資料
ProductEditModal SHALL 在開啟時，將傳入的商品資料（名稱、價格、庫存、狀態、敘述）預填至對應的表單欄位。

#### Scenario: 開啟 Modal 時預填資料
- **WHEN** 管理員點擊商品列的「編輯」按鈕
- **THEN** Modal 開啟，表單欄位顯示該商品目前的名稱、價格、庫存、上下架狀態與詳細敘述

### Requirement: ProductEditModal 可編輯商品基本資料
ProductEditModal SHALL 提供以下可編輯欄位：商品名稱（text input）、價格（number input）、庫存數量（number input）、上下架狀態（toggle/checkbox）、詳細敘述（textarea）。

#### Scenario: 修改商品名稱
- **WHEN** 管理員清空並輸入新的商品名稱
- **THEN** 表單欄位顯示新輸入的名稱，尚未呼叫 API

#### Scenario: 切換上下架狀態
- **WHEN** 管理員點擊上下架狀態開關
- **THEN** 開關切換至相反狀態，表單暫存新值，尚未呼叫 API

### Requirement: ProductEditModal 儲存商品資料
ProductEditModal SHALL 在管理員點擊「儲存」按鈕後，呼叫 `updateProduct(id, data)` API，並在成功後觸發 `onSaved` 回呼。

#### Scenario: 儲存成功
- **WHEN** 管理員修改欄位後點擊「儲存」按鈕
- **THEN** 呼叫 `updateProduct(productId, { name, price, stock, isActive, description })`，成功後觸發 `onSaved()`

#### Scenario: 儲存中狀態
- **WHEN** `updateProduct` API 請求進行中
- **THEN** 「儲存」按鈕顯示 disabled 並呈現載入狀態，防止重複提交

#### Scenario: 儲存失敗
- **WHEN** `updateProduct` API 回傳錯誤
- **THEN** Modal 內顯示錯誤訊息，按鈕恢復可用狀態，Modal 不關閉

### Requirement: ProductEditModal 嵌入圖片管理區塊
ProductEditModal SHALL 在表單下方包含圖片管理區塊，顯示現有圖片縮圖並提供上傳新圖片的功能，直接呼叫 `createProductImage` API。

#### Scenario: 顯示現有圖片
- **WHEN** 商品已有圖片
- **THEN** Modal 下方圖片區塊顯示所有圖片縮圖，並標示封面圖片

#### Scenario: 無圖片時顯示提示
- **WHEN** 商品無圖片
- **THEN** 圖片區塊顯示「尚無圖片」提示文字

#### Scenario: 上傳新圖片
- **WHEN** 管理員在圖片區塊選取圖片檔案並點擊上傳
- **THEN** 呼叫 `createProductImage(productId, file)` API，成功後重新載入商品圖片列表

### Requirement: ProductEditModal 可關閉
ProductEditModal SHALL 在點擊關閉按鈕或背景遮罩時呼叫 `onClose` prop。

#### Scenario: 點擊關閉按鈕
- **WHEN** 管理員點擊關閉（X）按鈕
- **THEN** 呼叫 `onClose()`，Modal 消失

#### Scenario: 點擊背景遮罩
- **WHEN** 管理員點擊 Modal 背景遮罩區域
- **THEN** 呼叫 `onClose()`，Modal 消失
