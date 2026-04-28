# React 開發指南（對比 Vue 語法）

> 適合有 Vue 背景的開發者快速上手 React

---

## 目錄

1. [核心概念](#1-核心概念)
2. [常用 Hooks](#2-常用-hooks)
3. [Vue vs React 語法對照表](#3-vue-vs-react-語法對照表)
4. [生命週期對比](#4-生命週期對比)
5. [本專案工具鏈](#5-本專案工具鏈)

---

## 1. 核心概念

### JSX

React 使用 JSX，是 JavaScript 的語法擴展，讓你在 JS 中寫 HTML 結構。

```tsx
// React JSX
function Greeting({ name }: { name: string }) {
  return <h1 className="text-xl">Hello, {name}!</h1>
}
```

```html
<!-- Vue Template -->
<template>
  <h1 class="text-xl">Hello, {{ name }}!</h1>
</template>
```

**關鍵差異：**
- JSX 中 class → `className`，for → `htmlFor`
- 表達式用 `{}` 包裹（Vue 用 `{{ }}`）
- JSX 必須有單一根元素（或用 `<>...</>` Fragment）

---

### Components（元件）

React 元件是一個回傳 JSX 的函式：

```tsx
// 函式型元件（React 現代寫法）
function UserCard({ name, age }: { name: string; age: number }) {
  return (
    <div className="p-4 border rounded">
      <p>{name}</p>
      <p>{age} 歲</p>
    </div>
  )
}
```

```vue
<!-- Vue SFC -->
<script setup lang="ts">
defineProps<{ name: string; age: number }>()
</script>
<template>
  <div class="p-4 border rounded">
    <p>{{ name }}</p>
    <p>{{ age }} 歲</p>
  </div>
</template>
```

---

### Props

Props 是從父元件傳入的唯讀資料：

```tsx
// 父元件傳入
<UserCard name="Alice" age={30} />

// 子元件接收（TypeScript）
function UserCard({ name, age }: { name: string; age: number }) { ... }

// 或用 interface
interface Props {
  name: string
  age: number
  optional?: string
}
function UserCard({ name, age, optional = 'default' }: Props) { ... }
```

---

### State（狀態）

React 用 `useState` 管理元件內部狀態（相當於 Vue 的 `ref`）：

```tsx
import { useState } from 'react'

function Counter() {
  const [count, setCount] = useState(0)

  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  )
}
```

**重要**：直接修改 state 不會觸發重渲染，必須呼叫 setter：

```tsx
// ❌ 錯誤
count = count + 1

// ✅ 正確
setCount(count + 1)
// 或使用函式更新（避免 stale closure）
setCount(prev => prev + 1)
```

---

## 2. 常用 Hooks

### useState — 元件狀態

```tsx
const [value, setValue] = useState<string>('')
const [items, setItems] = useState<string[]>([])
const [user, setUser] = useState<User | null>(null)

// 更新物件狀態（需展開）
setUser(prev => ({ ...prev!, name: 'Bob' }))

// 更新陣列（不可直接 push）
setItems(prev => [...prev, 'newItem'])
```

---

### useEffect — 副作用處理

`useEffect` 是 React 中處理所有副作用的統一入口（對應 Vue 的 `watch` + 生命週期鉤子）：

```tsx
import { useEffect, useState } from 'react'

function UserProfile({ userId }: { userId: number }) {
  const [user, setUser] = useState<User | null>(null)

  // 相當於 Vue 的 onMounted + watch(userId)
  useEffect(() => {
    fetch(`/api/users/${userId}`)
      .then(r => r.json())
      .then(setUser)

    // cleanup 相當於 Vue 的 onUnmounted
    return () => {
      // 取消請求、清除 timer 等
    }
  }, [userId]) // dependency array：userId 變化時重新執行

  return <div>{user?.name}</div>
}
```

**dependency array 規則：**

| 寫法 | 行為 |
|------|------|
| `useEffect(fn)` | 每次渲染後都執行 |
| `useEffect(fn, [])` | 只在 mount 時執行一次 |
| `useEffect(fn, [a, b])` | a 或 b 變化時執行 |

---

### useContext — 跨層傳值

取代 Vue 的 `provide / inject`：

```tsx
// 1. 建立 Context
const ThemeContext = createContext<'light' | 'dark'>('light')

// 2. 提供值（在父層）
function App() {
  return (
    <ThemeContext.Provider value="dark">
      <Page />
    </ThemeContext.Provider>
  )
}

// 3. 消費（在任意子層）
function Page() {
  const theme = useContext(ThemeContext)
  return <div className={theme === 'dark' ? 'bg-gray-900' : 'bg-white'}>...</div>
}
```

---

### useMemo — 計算快取

相當於 Vue 的 `computed`，避免重複計算：

```tsx
import { useMemo } from 'react'

function ProductList({ products, filter }: Props) {
  const filtered = useMemo(
    () => products.filter(p => p.category === filter),
    [products, filter] // 只有這兩個變化時才重新計算
  )

  return <ul>{filtered.map(p => <li key={p.id}>{p.name}</li>)}</ul>
}
```

---

### useCallback — 函式快取

防止子元件因父元件重渲染而不必要地重新渲染（常與 `React.memo` 搭配）：

```tsx
import { useCallback } from 'react'

function Parent() {
  const handleClick = useCallback((id: number) => {
    console.log('clicked', id)
  }, []) // 空 deps：函式參考永遠不變

  return <Child onClick={handleClick} />
}
```

---

## 3. Vue vs React 語法對照表

| 功能 | Vue Options API | Vue Composition API | React Hooks |
|------|----------------|---------------------|-------------|
| **響應式資料** | `data() { return { count: 0 } }` | `const count = ref(0)` | `const [count, setCount] = useState(0)` |
| **計算屬性** | `computed: { double() { return this.count * 2 } }` | `const double = computed(() => count.value * 2)` | `const double = useMemo(() => count * 2, [count])` |
| **監聽資料** | `watch: { count(val) { ... } }` | `watch(count, (val) => { ... })` | `useEffect(() => { ... }, [count])` |
| **方法** | `methods: { add() { this.count++ } }` | `function add() { count.value++ }` | `function add() { setCount(c => c + 1) }` |
| **Props 接收** | `props: ['name']` | `defineProps<{ name: string }>()` | `function Comp({ name }: { name: string })` |
| **Emit 事件** | `this.$emit('change', val)` | `const emit = defineEmits(['change']); emit('change', val)` | 傳入 callback prop：`onChange(val)` |
| **雙向綁定** | `v-model="value"` | `v-model="value"` | `value={val} onChange={e => setVal(e.target.value)}` |
| **條件渲染** | `v-if="show"` | `v-if="show"` | `{show && <Component />}` |
| **列表渲染** | `v-for="item in list" :key="item.id"` | `v-for="item in list" :key="item.id"` | `{list.map(item => <li key={item.id}>...</li>)}` |
| **跨層傳值** | `provide / inject` | `provide / inject` | `createContext / useContext` |
| **插槽** | `<slot />` | `<slot />` | `children` prop 或 render prop |
| **樣式綁定** | `:class="{ active: isActive }"` | `:class="{ active: isActive }"` | `className={isActive ? 'active' : ''}` 或 `clsx` |

---

## 4. 生命週期對比

### 完整對照

| Vue Options API | Vue Composition API | React useEffect 等效寫法 |
|----------------|---------------------|--------------------------|
| `beforeCreate` | _(setup 函式本身)_ | 元件函式本體（渲染前） |
| `created` | _(setup 函式本身)_ | 元件函式本體 |
| `beforeMount` | `onBeforeMount` | 無直接對應 |
| `mounted` | `onMounted` | `useEffect(() => { ... }, [])` |
| `beforeUpdate` | `onBeforeUpdate` | 無直接對應 |
| `updated` | `onUpdated` | `useEffect(() => { ... })` （無 deps） |
| `beforeUnmount` | `onBeforeUnmount` | 無直接對應 |
| `unmounted` | `onUnmounted` | `useEffect(() => { return () => { ... } }, [])` |

### 範例對比

**Vue（Composition API）**

```vue
<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'

const data = ref(null)
const timer = ref(null)

onMounted(() => {
  fetchData()
  timer.value = setInterval(fetchData, 5000)
})

onUnmounted(() => {
  clearInterval(timer.value)
})

watch(userId, () => {
  fetchData()
})
</script>
```

**React**

```tsx
function Component({ userId }: { userId: number }) {
  const [data, setData] = useState(null)

  // mount + watch userId
  useEffect(() => {
    fetchData(userId).then(setData)
  }, [userId])

  // mount timer + unmount cleanup
  useEffect(() => {
    const timer = setInterval(() => fetchData(userId).then(setData), 5000)
    return () => clearInterval(timer) // unmount cleanup
  }, [userId])

  return <div>{data?.name}</div>
}
```

---

## 5. 本專案工具鏈

### 安裝的套件

| 套件 | 版本 | 用途 |
|------|------|------|
| `tailwindcss` | v4 | Utility-first CSS |
| `axios` | latest | HTTP 請求 |
| `react-router-dom` | v7 | 前端路由 |
| `@reduxjs/toolkit` | latest | 全域狀態管理 |
| `react-redux` | latest | React Redux 綁定 |

### 檔案結構

```
src/
├── lib/
│   └── http.ts          # axios 封裝層
├── store/
│   ├── index.ts         # Redux store
│   └── slices/
│       └── counterSlice.ts
├── hooks/
│   └── redux.ts         # useAppDispatch / useAppSelector
├── router/
│   └── index.tsx        # React Router 配置
└── pages/
    ├── HomePage.tsx
    └── NotFoundPage.tsx
```

### axios 封裝使用方式

```ts
import { get, post, put, del } from '@/lib/http'

// GET
const user = await get<User>('/api/users/1')

// POST
const created = await post<User>('/api/users', { name: 'Alice' })

// PUT
const updated = await put<User>('/api/users/1', { name: 'Bob' })

// DELETE
await del('/api/users/1')
```

### Redux 使用方式

```tsx
import { useAppSelector, useAppDispatch } from '@/hooks/redux'
import { increment, decrement, reset } from '@/store/slices/counterSlice'

function Counter() {
  const count = useAppSelector(state => state.counter.value)
  const dispatch = useAppDispatch()

  return (
    <div>
      <p>{count}</p>
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(decrement())}>-</button>
      <button onClick={() => dispatch(reset())}>Reset</button>
    </div>
  )
}
```

### 環境變數

複製 `.env.example` 為 `.env.local` 並填入：

```
VITE_API_BASE_URL=https://your-api.com
```
