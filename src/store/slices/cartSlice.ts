import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import {
  getCart,
  addCartItem,
  updateCartItem,
  deleteCartItem,
  deleteCart,
  checkoutCart,
  type CartResponse,
  type CartItemResponse,
} from '../../api/cart'
import type { RootState } from '..'

type Status = 'idle' | 'loading' | 'succeeded' | 'failed'

interface CartState {
  cartId: string | null
  items: CartItemResponse[]
  totalAmount: number
  status: Status
  error: string | null
}

const emptyState = (): Omit<CartState, 'status' | 'error'> => ({
  cartId: null,
  items: [],
  totalAmount: 0,
})

const initialState: CartState = {
  ...emptyState(),
  status: 'idle',
  error: null,
}

function getStatus(err: unknown): number | undefined {
  if (typeof err === 'object' && err !== null && 'status' in err) {
    const status = (err as { status?: unknown }).status
    return typeof status === 'number' ? status : undefined
  }
  return undefined
}

export const loadCart = createAsyncThunk<CartResponse | null>(
  'cart/load',
  async (_, { rejectWithValue }) => {
    try {
      return await getCart()
    } catch (err) {
      if (getStatus(err) === 404) return null
      return rejectWithValue((err as Error).message ?? '載入購物車失敗')
    }
  },
)

export const addItem = createAsyncThunk<CartResponse, { productId: string; quantity: number }>(
  'cart/addItem',
  async (payload, { rejectWithValue }) => {
    try {
      return await addCartItem(payload)
    } catch (err) {
      return rejectWithValue((err as Error).message ?? '加入購物車失敗')
    }
  },
)

export const updateItem = createAsyncThunk<CartResponse, { itemId: string; quantity: number }>(
  'cart/updateItem',
  async ({ itemId, quantity }, { rejectWithValue }) => {
    try {
      return await updateCartItem(itemId, { quantity })
    } catch (err) {
      return rejectWithValue((err as Error).message ?? '更新數量失敗')
    }
  },
)

export const removeItem = createAsyncThunk<CartResponse | null, { itemId: string }>(
  'cart/removeItem',
  async ({ itemId }, { rejectWithValue }) => {
    try {
      const result = await deleteCartItem(itemId)
      return result ?? null
    } catch (err) {
      return rejectWithValue((err as Error).message ?? '移除項目失敗')
    }
  },
)

export const clearCart = createAsyncThunk<void>(
  'cart/clear',
  async (_, { rejectWithValue }) => {
    try {
      await deleteCart()
    } catch (err) {
      return rejectWithValue((err as Error).message ?? '清空購物車失敗')
    }
  },
)

export const checkout = createAsyncThunk<void>(
  'cart/checkout',
  async (_, { rejectWithValue }) => {
    try {
      await checkoutCart()
    } catch (err) {
      return rejectWithValue((err as Error).message ?? '結帳失敗')
    }
  },
)

function applyCart(state: CartState, action: PayloadAction<CartResponse | null | undefined>) {
  const cart = action.payload
  if (!cart) {
    Object.assign(state, emptyState())
  } else {
    state.cartId = cart.cartId
    state.items = cart.items ?? []
    state.totalAmount = cart.totalAmount ?? 0
  }
  state.status = 'succeeded'
  state.error = null
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    resetCart: (state) => {
      Object.assign(state, emptyState())
      state.status = 'succeeded'
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadCart.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(loadCart.fulfilled, applyCart)
      .addCase(loadCart.rejected, (state, action) => {
        state.status = 'failed'
        state.error = (action.payload as string) ?? action.error.message ?? '載入購物車失敗'
      })
      .addCase(addItem.fulfilled, applyCart)
      .addCase(updateItem.fulfilled, applyCart)
      .addCase(removeItem.fulfilled, applyCart)
      .addCase(clearCart.fulfilled, (state) => {
        Object.assign(state, emptyState())
        state.status = 'succeeded'
        state.error = null
      })
      .addCase(checkout.fulfilled, (state) => {
        Object.assign(state, emptyState())
        state.status = 'succeeded'
        state.error = null
      })
  },
})

export const { resetCart } = cartSlice.actions
export default cartSlice.reducer

export const selectCart = (state: RootState) => state.cart
export const selectCartItems = (state: RootState) => state.cart.items
export const selectCartItemCount = (state: RootState) =>
  state.cart.items.reduce((sum, item) => sum + item.quantity, 0)
export const selectCartTotal = (state: RootState) => state.cart.totalAmount
export const selectCartStatus = (state: RootState) => state.cart.status
export const selectCartError = (state: RootState) => state.cart.error
