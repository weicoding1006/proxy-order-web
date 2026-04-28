## ADDED Requirements

### Requirement: React 指南文件建立
`docs/react-guide.md` SHALL 存在並包含 React 核心概念介紹。

#### Scenario: 文件存在
- **WHEN** 開發者開啟 `docs/react-guide.md`
- **THEN** 文件包含 JSX、Components、Props、State 等章節

### Requirement: Vue vs React 語法對照表
文件 MUST 包含 Vue（Options API 與 Composition API）與 React Hooks 的語法對照表格或對比區塊。

#### Scenario: 對照表存在
- **WHEN** 開發者閱讀指南
- **THEN** 可找到涵蓋 data/ref、computed、watch、methods、生命週期等項目的 Vue vs React 對比

### Requirement: Hooks 說明章節
文件 SHALL 說明常用 React Hooks：`useState`、`useEffect`、`useContext`、`useMemo`、`useCallback`，每個 Hook 附帶程式碼範例。

#### Scenario: Hooks 範例可執行
- **WHEN** 開發者複製文件中的 Hook 範例程式碼
- **THEN** 程式碼可在 React 18+ 環境中直接執行無語法錯誤

### Requirement: 生命週期對比章節
文件 MUST 包含 Vue 生命週期鉤子（`mounted`、`unmounted`、`updated` 等）與 React `useEffect` 的對應關係說明。

#### Scenario: 生命週期對比清晰
- **WHEN** 有 Vue 背景的開發者閱讀此章節
- **THEN** 能理解如何用 `useEffect` 實現 Vue `mounted` / `unmounted` / `updated` 的行為
