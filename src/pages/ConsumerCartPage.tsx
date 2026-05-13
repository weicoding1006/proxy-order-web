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
        <p className="text-ink-3 text-base">載入中...</p>
      </div>
    )
  }

  if (status === 'failed' && items.length === 0) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-shu text-base">{loadError ?? '載入購物車失敗'}</p>
      </div>
    )
  }

  return (
    <div>
      <h1 className="font-display text-4xl font-normal text-ink tracking-[-0.01em] m-0 mb-8">
        購物車
      </h1>

      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 gap-4">
          <p className="text-ink-3 text-base">購物車是空的</p>
          <Link
            to="/"
            className="text-ink-2 hover:text-shu text-[13px] tracking-[0.08em] transition-colors"
          >
            去逛逛商品 →
          </Link>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-paper text-sm">
              <thead>
                <tr className="bg-sand">
                  {['商品', '單價', '數量', '小計', '操作'].map((col, i) => (
                    <th
                      key={col}
                      className={`px-4 py-3 text-[11px] text-ink-3 font-medium tracking-[0.12em] uppercase border-b border-bone font-sans ${
                        i === 0 ? 'text-left' : 'text-center'
                      }`}
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {items.map((item) => {
                  const isBusy = busyItemId === item.id
                  return (
                    <tr key={item.id} className="border-b border-bone">
                      <td className="px-4 py-[14px] text-left">
                        <Link
                          to={`/products/${item.productId}`}
                          className="text-ink hover:text-shu font-sans text-sm transition-colors"
                        >
                          {item.productName}
                        </Link>
                      </td>
                      <td className="px-4 py-[14px] text-center text-ink font-sans text-sm">
                        NT$ {item.currentPrice.toLocaleString()}
                      </td>
                      <td className="px-4 py-[14px] text-center">
                        <div className="inline-flex">
                          <button
                            type="button"
                            disabled={isBusy || item.quantity <= 1}
                            onClick={() => handleUpdate(item.id, item.quantity - 1)}
                            className="w-8 h-8 border border-bone border-r-0 bg-paper text-ink text-base flex items-center justify-center disabled:text-ink-4 disabled:cursor-not-allowed"
                          >
                            −
                          </button>
                          <span className="inline-flex items-center justify-center w-10 h-8 border border-bone bg-paper text-ink font-sans text-[13px]">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            disabled={isBusy}
                            onClick={() => handleUpdate(item.id, item.quantity + 1)}
                            className="w-8 h-8 border border-bone border-l-0 bg-paper text-ink text-base flex items-center justify-center disabled:text-ink-4 disabled:cursor-not-allowed"
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="px-4 py-[14px] text-center text-ink font-sans text-sm">
                        NT$ {item.subtotal.toLocaleString()}
                      </td>
                      <td className="px-4 py-[14px] text-center">
                        <button
                          type="button"
                          disabled={isBusy}
                          onClick={() => handleRemove(item.id)}
                          className="text-ink-3 hover:text-shu disabled:text-ink-4 disabled:cursor-not-allowed font-sans text-xs tracking-[0.08em] px-2 py-1 transition-colors"
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

          {actionError && <p className="mt-3 text-[13px] text-shu">{actionError}</p>}

          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-bone">
            <button
              type="button"
              onClick={handleClearCart}
              disabled={submitting !== null}
              className="bg-transparent border border-bone rounded-[2px] py-[10px] px-5 font-sans text-[13px] text-ink-2 tracking-[0.08em] hover:text-ink disabled:text-ink-4 disabled:cursor-not-allowed transition-colors"
            >
              {submitting === 'clear' ? '清空中...' : '清空購物車'}
            </button>

            <div className="flex items-center gap-6">
              <span className="font-display text-2xl text-ink tracking-[-0.01em]">
                NT$ {totalAmount.toLocaleString()}
              </span>
              <button
                type="button"
                onClick={handleCheckout}
                disabled={submitting !== null}
                className="bg-shu hover:bg-shu-dark text-paper rounded-[2px] py-3 px-8 font-sans text-[13px] tracking-[0.1em] transition-colors disabled:bg-bone disabled:text-ink-3 disabled:cursor-not-allowed disabled:hover:bg-bone"
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
