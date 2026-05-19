import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
  getFavorites,
  addFavorite,
  deleteFavorite,
  type FavoriteResponse,
} from '../../api/favorites'
import type { RootState } from '..'

type Status = 'idle' | 'loading' | 'succeeded' | 'failed'

interface FavoritesState {
  items: FavoriteResponse[]
  status: Status
  error: string | null
}

const initialState: FavoritesState = {
  items: [],
  status: 'idle',
  error: null,
}

export const loadFavorites = createAsyncThunk<FavoriteResponse[]>(
  'favorites/load',
  async (_, { rejectWithValue }) => {
    try {
      return await getFavorites()
    } catch (err) {
      return rejectWithValue((err as Error).message ?? '載入收藏失敗')
    }
  },
)

export const toggleFavorite = createAsyncThunk<FavoriteResponse[], string>(
  'favorites/toggle',
  async (productId, { getState, dispatch, rejectWithValue }) => {
    const state = getState() as RootState
    const isFavorited = state.favorites.items.some((item) => item.productId === productId)
    try {
      if (isFavorited) {
        await deleteFavorite(productId)
      } else {
        await addFavorite(productId)
      }
      const result = await dispatch(loadFavorites()).unwrap()
      return result
    } catch (err) {
      return rejectWithValue((err as Error).message ?? '收藏操作失敗')
    }
  },
)

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    resetFavorites: (state) => {
      state.items = []
      state.status = 'succeeded'
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadFavorites.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(loadFavorites.fulfilled, (state, action) => {
        state.items = action.payload
        state.status = 'succeeded'
        state.error = null
      })
      .addCase(loadFavorites.rejected, (state, action) => {
        state.status = 'failed'
        state.error = (action.payload as string) ?? action.error.message ?? '載入收藏失敗'
      })
  },
})

export const { resetFavorites } = favoritesSlice.actions
export default favoritesSlice.reducer

export const selectFavorites = (state: RootState) => state.favorites.items
export const selectIsFavorited = (productId: string) => (state: RootState) =>
  state.favorites.items.some((item) => item.productId === productId)
export const selectFavoritesStatus = (state: RootState) => state.favorites.status
