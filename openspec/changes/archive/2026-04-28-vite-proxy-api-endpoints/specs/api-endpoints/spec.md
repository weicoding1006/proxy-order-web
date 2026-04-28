## ADDED Requirements

### Requirement: API 端點目錄結構
`src/api/` MUST 存在，並以資源為單位分檔管理 API 端點函式。

#### Scenario: 目錄與入口存在
- **WHEN** 開發者開啟 `src/api/`
- **THEN** 可見 `index.ts`（統一 re-export）及至少一個資源檔案（`product.ts`）

### Requirement: 商品 CRUD API 函式
`src/api/product.ts` MUST 提供商品資源的完整 CRUD 函式，底層使用 `src/lib/http.ts` 的封裝方法。

#### Scenario: 取得商品列表
- **WHEN** 呼叫 `fetchProducts()`
- **THEN** 發出 `GET /api/products` 請求並回傳商品陣列

#### Scenario: 取得單一商品
- **WHEN** 呼叫 `fetchProductById(id)`
- **THEN** 發出 `GET /api/products/{id}` 請求並回傳單一商品物件

#### Scenario: 建立商品
- **WHEN** 呼叫 `createProduct(data)`
- **THEN** 發出 `POST /api/products` 請求，body 為商品資料，回傳建立後的商品

#### Scenario: 更新商品
- **WHEN** 呼叫 `updateProduct(id, data)`
- **THEN** 發出 `PUT /api/products/{id}` 請求，body 為更新資料，回傳更新後的商品

#### Scenario: 刪除商品
- **WHEN** 呼叫 `deleteProduct(id)`
- **THEN** 發出 `DELETE /api/products/{id}` 請求

### Requirement: 型別定義隨 API 函式同檔
`src/api/product.ts` MUST 匯出 `Product` 與 `CreateProductDto`、`UpdateProductDto` 型別。

#### Scenario: 型別可被匯入使用
- **WHEN** 其他元件 `import { Product } from '@/api/product'`
- **THEN** TypeScript 型別推斷正確，無需額外標注
