## ADDED Requirements

### Requirement: Redux Toolkit 安裝
專案 SHALL 安裝 `@reduxjs/toolkit` 與 `react-redux`。

#### Scenario: 安裝套件
- **WHEN** 開發者執行 `npm install @reduxjs/toolkit react-redux`
- **THEN** `package.json` 中出現 `@reduxjs/toolkit` 與 `react-redux`

### Requirement: Store 建立
`src/store/index.ts` MUST 使用 `configureStore` 建立 Redux store，並匯出 `RootState` 與 `AppDispatch` 型別。

#### Scenario: Store 設定正確
- **WHEN** 開發者開啟 `src/store/index.ts`
- **THEN** 可見 `configureStore`、`export type RootState` 與 `export type AppDispatch`

### Requirement: 範例 Slice
`src/store/slices/counterSlice.ts` MUST 提供使用 `createSlice` 建立的範例 slice，包含至少一個 action 與對應 reducer。

#### Scenario: Slice 結構正確
- **WHEN** 開發者開啟 counterSlice.ts
- **THEN** 可見 `createSlice`、`initialState`、`reducers` 物件及匯出的 actions 與 reducer

### Requirement: 型別安全 Hooks
`src/hooks/redux.ts` MUST 匯出 `useAppDispatch` 與 `useAppSelector`，使用 `RootState` 與 `AppDispatch` 強型別。

#### Scenario: Hooks 型別正確
- **WHEN** 開發者使用 `useAppSelector(state => state.counter.value)`
- **THEN** TypeScript 型別推斷正確，無需手動標注型別

### Requirement: Provider 掛載
`src/main.tsx` MUST 使用 `<Provider store={store}>` 包裹根元件。

#### Scenario: Provider 正確掛載
- **WHEN** 應用程式啟動
- **THEN** 所有子元件皆可透過 hooks 存取 Redux store
