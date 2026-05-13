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
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 0' }}>
        <p style={{ color: 'var(--ink-3)', fontSize: 16 }}>載入中...</p>
      </div>
    )
  }

  if (status === 'failed' && items.length === 0) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 0' }}>
        <p style={{ color: 'var(--shu)', fontSize: 16 }}>{loadError ?? '載入購物車失敗'}</p>
      </div>
    )
  }

  return (
    <div>
      {/* Page title */}
      <h1 style={{
        fontFamily: 'var(--font-display)',
        fontSize: 36,
        fontWeight: 400,
        color: 'var(--ink)',
        margin: 0,
        marginBottom: 32,
        letterSpacing: '-0.01em',
      }}>
        購物車
      </h1>

      {items.length === 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '64px 0', gap: 16 }}>
          <p style={{ color: 'var(--ink-3)', fontSize: 16 }}>購物車是空的</p>
          <Link
            to="/"
            style={{ color: 'var(--ink-2)', fontSize: 13, letterSpacing: '0.08em', textDecoration: 'none' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--shu)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--ink-2)')}
          >
            去逛逛商品 →
          </Link>
        </div>
      ) : (
        <>
          {/* Table */}
          <div style={{ overflowX: 'auto' }}>
            <table style={{
              width: '100%',
              borderCollapse: 'collapse',
              background: 'var(--paper)',
              fontSize: 14,
            }}>
              <thead>
                <tr style={{ background: 'var(--sand)' }}>
                  {['商品', '單價', '數量', '小計', '操作'].map((col, i) => (
                    <th
                      key={col}
                      style={{
                        padding: '12px 16px',
                        textAlign: i === 0 ? 'left' : 'center',
                        fontSize: 11,
                        color: 'var(--ink-3)',
                        fontWeight: 500,
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        borderBottom: '1px solid var(--bone)',
                        fontFamily: 'var(--font-sans)',
                      }}
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
                    <tr key={item.id} style={{ borderBottom: '1px solid var(--bone)' }}>
                      {/* Product name */}
                      <td style={{ padding: '14px 16px', textAlign: 'left' }}>
                        <Link
                          to={`/products/${item.productId}`}
                          style={{ color: 'var(--ink)', textDecoration: 'none', fontFamily: 'var(--font-sans)', fontSize: 14 }}
                          onMouseEnter={e => (e.currentTarget.style.color = 'var(--shu)')}
                          onMouseLeave={e => (e.currentTarget.style.color = 'var(--ink)')}
                        >
                          {item.productName}
                        </Link>
                      </td>

                      {/* Unit price */}
                      <td style={{ padding: '14px 16px', textAlign: 'center', color: 'var(--ink)', fontFamily: 'var(--font-sans)', fontSize: 14 }}>
                        NT$ {item.currentPrice.toLocaleString()}
                      </td>

                      {/* Quantity controls */}
                      <td style={{ padding: '14px 16px', textAlign: 'center' }}>
                        <div style={{ display: 'inline-flex' }}>
                          <button
                            type="button"
                            disabled={isBusy || item.quantity <= 1}
                            onClick={() => handleUpdate(item.id, item.quantity - 1)}
                            style={{
                              width: 32,
                              height: 32,
                              border: '1px solid var(--bone)',
                              borderRight: 'none',
                              borderRadius: 0,
                              background: 'var(--paper)',
                              color: isBusy || item.quantity <= 1 ? 'var(--ink-4)' : 'var(--ink)',
                              fontSize: 16,
                              cursor: isBusy || item.quantity <= 1 ? 'not-allowed' : 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            −
                          </button>
                          <span style={{
                            width: 40,
                            height: 32,
                            border: '1px solid var(--bone)',
                            background: 'var(--paper)',
                            color: 'var(--ink)',
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontFamily: 'var(--font-sans)',
                            fontSize: 13,
                          }}>
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            disabled={isBusy}
                            onClick={() => handleUpdate(item.id, item.quantity + 1)}
                            style={{
                              width: 32,
                              height: 32,
                              border: '1px solid var(--bone)',
                              borderLeft: 'none',
                              borderRadius: 0,
                              background: 'var(--paper)',
                              color: isBusy ? 'var(--ink-4)' : 'var(--ink)',
                              fontSize: 16,
                              cursor: isBusy ? 'not-allowed' : 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            +
                          </button>
                        </div>
                      </td>

                      {/* Subtotal */}
                      <td style={{ padding: '14px 16px', textAlign: 'center', color: 'var(--ink)', fontFamily: 'var(--font-sans)', fontSize: 14 }}>
                        NT$ {item.subtotal.toLocaleString()}
                      </td>

                      {/* Remove */}
                      <td style={{ padding: '14px 16px', textAlign: 'center' }}>
                        <button
                          type="button"
                          disabled={isBusy}
                          onClick={() => handleRemove(item.id)}
                          style={{
                            background: 'none',
                            border: 'none',
                            cursor: isBusy ? 'not-allowed' : 'pointer',
                            color: isBusy ? 'var(--ink-4)' : 'var(--ink-3)',
                            fontFamily: 'var(--font-sans)',
                            fontSize: 12,
                            letterSpacing: '0.08em',
                            padding: '4px 8px',
                            transition: 'color var(--t-fast) var(--ease-out)',
                          }}
                          onMouseEnter={e => { if (!isBusy) e.currentTarget.style.color = 'var(--shu)' }}
                          onMouseLeave={e => { if (!isBusy) e.currentTarget.style.color = 'var(--ink-3)' }}
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
            <p style={{ marginTop: 12, fontSize: 13, color: 'var(--shu)' }}>{actionError}</p>
          )}

          {/* Footer: clear + total + checkout */}
          <div style={{
            marginTop: 32,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 16,
            paddingTop: 24,
            borderTop: '1px solid var(--bone)',
          }}>
            <button
              type="button"
              onClick={handleClearCart}
              disabled={submitting !== null}
              style={{
                background: 'transparent',
                border: '1px solid var(--bone)',
                borderRadius: 'var(--r-1)',
                padding: '10px 20px',
                fontFamily: 'var(--font-sans)',
                fontSize: 13,
                color: submitting !== null ? 'var(--ink-4)' : 'var(--ink-2)',
                cursor: submitting !== null ? 'not-allowed' : 'pointer',
                letterSpacing: '0.08em',
                transition: 'color var(--t-fast) var(--ease-out)',
              }}
            >
              {submitting === 'clear' ? '清空中...' : '清空購物車'}
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: 24, color: 'var(--ink)', letterSpacing: '-0.01em' }}>
                NT$ {totalAmount.toLocaleString()}
              </span>
              <button
                type="button"
                onClick={handleCheckout}
                disabled={submitting !== null}
                style={{
                  background: submitting !== null ? 'var(--bone)' : 'var(--shu)',
                  color: submitting !== null ? 'var(--ink-3)' : 'var(--paper)',
                  border: 'none',
                  borderRadius: 'var(--r-1)',
                  padding: '12px 32px',
                  fontFamily: 'var(--font-sans)',
                  fontSize: 13,
                  letterSpacing: '0.1em',
                  cursor: submitting !== null ? 'not-allowed' : 'pointer',
                  transition: 'background var(--t-fast) var(--ease-out)',
                }}
                onMouseEnter={e => { if (submitting === null) e.currentTarget.style.background = 'var(--shu-dark)' }}
                onMouseLeave={e => { if (submitting === null) e.currentTarget.style.background = 'var(--shu)' }}
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
