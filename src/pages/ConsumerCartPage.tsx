import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch } from '../store'
import {
  loadCart,
  updateItem,
  removeItem,
  clearCart,
  checkout,
  selectCartItems,
  selectCartTotal,
  selectCartStatus,
  selectCartError,
} from '../store/slices/cartSlice'

export default function ConsumerCartPage() {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const items = useSelector(selectCartItems)
  const totalAmount = useSelector(selectCartTotal)
  const status = useSelector(selectCartStatus)
  const loadError = useSelector(selectCartError)

  const [busyItemId, setBusyItemId] = useState<string | null>(null)
  const [actionError, setActionError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState<'clear' | 'checkout' | null>(null)

  useEffect(() => {
    if (status === 'idle') dispatch(loadCart())
  }, [dispatch, status])

  async function handleUpdate(itemId: string, quantity: number) {
    if (quantity < 1) {
      handleRemove(itemId)
      return
    }
    setBusyItemId(itemId)
    setActionError(null)
    try {
      await dispatch(updateItem({ itemId, quantity })).unwrap()
    } catch (err) {
      setActionError((err as string) ?? '更新數量失敗')
    } finally {
      setBusyItemId(null)
    }
  }

  async function handleRemove(itemId: string) {
    if (!window.confirm('確定要移除此項目嗎？')) return
    setBusyItemId(itemId)
    setActionError(null)
    try {
      await dispatch(removeItem({ itemId })).unwrap()
    } catch (err) {
      setActionError((err as string) ?? '移除項目失敗')
    } finally {
      setBusyItemId(null)
    }
  }

  async function handleClearCart() {
    if (!window.confirm('確定要清空整個購物車嗎？')) return
    setSubmitting('clear')
    setActionError(null)
    try {
      await dispatch(clearCart()).unwrap()
    } catch (err) {
      setActionError((err as string) ?? '清空購物車失敗')
    } finally {
      setSubmitting(null)
    }
  }

  async function handleCheckout() {
    if (!window.confirm('確定要結帳嗎？')) return
    setSubmitting('checkout')
    setActionError(null)
    try {
      await dispatch(checkout()).unwrap()
      navigate('/my-orders')
    } catch (err) {
      setActionError((err as string) ?? '結帳失敗')
    } finally {
      setSubmitting(null)
    }
  }

  if (status === 'loading' && items.length === 0) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-gray-500 text-lg">載入中...</p>
      </div>
    )
  }

  if (status === 'failed' && items.length === 0) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-red-500 text-lg">{loadError ?? '載入購物車失敗'}</p>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">購物車</h1>

      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 gap-3">
          <p className="text-gray-500 text-lg">購物車是空的</p>
          <Link to="/" className="text-blue-600 hover:underline">去逛逛商品</Link>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm bg-white">
            <table className="min-w-full divide-y divide-gray-200 text-sm">
              <thead className="bg-gray-50 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">
                <tr>
                  <th className="px-4 py-3 text-left">商品</th>
                  <th className="px-4 py-3">單價</th>
                  <th className="px-4 py-3">數量</th>
                  <th className="px-4 py-3">小計</th>
                  <th className="px-4 py-3">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {items.map((item) => {
                  const isBusy = busyItemId === item.id
                  return (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-left">
                        <Link to={`/products/${item.productId}`} className="text-gray-800 hover:text-blue-600">
                          {item.productName}
                        </Link>
                      </td>
                      <td className="px-4 py-3 text-center text-gray-700">
                        NT$ {item.currentPrice.toLocaleString()}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <div className="inline-flex items-center border border-gray-300 rounded-md">
                          <button
                            type="button"
                            disabled={isBusy || item.quantity <= 1}
                            onClick={() => handleUpdate(item.id, item.quantity - 1)}
                            className="px-2 py-1 text-gray-600 disabled:text-gray-300 hover:bg-gray-100"
                          >
                            −
                          </button>
                          <span className="px-3 min-w-[2rem] text-center">{item.quantity}</span>
                          <button
                            type="button"
                            disabled={isBusy}
                            onClick={() => handleUpdate(item.id, item.quantity + 1)}
                            className="px-2 py-1 text-gray-600 disabled:text-gray-300 hover:bg-gray-100"
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-center text-gray-700">
                        NT$ {item.subtotal.toLocaleString()}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <button
                          type="button"
                          disabled={isBusy}
                          onClick={() => handleRemove(item.id)}
                          className="px-3 py-1 text-red-600 hover:bg-red-50 rounded disabled:text-gray-300"
                        >
                          移除
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          {actionError && (
            <p className="mt-3 text-sm text-red-600">{actionError}</p>
          )}

          <div className="mt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <button
              type="button"
              onClick={handleClearCart}
              disabled={submitting !== null}
              className="px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded hover:bg-gray-50 disabled:text-gray-300 disabled:cursor-not-allowed"
            >
              {submitting === 'clear' ? '清空中...' : '清空購物車'}
            </button>

            <div className="flex items-center gap-4">
              <span className="text-lg text-gray-700">
                總金額：<span className="font-bold text-blue-600">NT$ {totalAmount.toLocaleString()}</span>
              </span>
              <button
                type="button"
                onClick={handleCheckout}
                disabled={submitting !== null}
                className="px-6 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                {submitting === 'checkout' ? '結帳中...' : '結帳'}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
