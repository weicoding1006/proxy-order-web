import { useEffect, useState } from 'react'
import { fetchOrderById, getStatusEnums, updateOrderStatus, STATUS_INT } from '../api/order'

interface OrderItem {
  id: string
  productId: string
  quantity: number
  unitPrice: number
  name: string
}

interface Order {
  id: string
  userId: string | null
  totalAmount: number
  status: string | null
  createdAt: string
  items: OrderItem[] | null
}

interface Props {
  orderId: string
  onClose: () => void
  onOrderCancelled?: () => void
}

const CANCELLABLE_STATUSES = ['Pending', 'Confirmed']
const MAIN_FLOW = ['Pending', 'Confirmed', 'Shipped', 'Completed']

const STATUS_LABEL: Record<string, string> = {
  Pending: '待確認',
  Confirmed: '已確認',
  Shipped: '已出貨',
  Completed: '已完成',
  Cancelled: '已取消',
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleString('zh-TW', {
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit',
  })
}

function StatusProgressBar({ status, steps }: { status: string | null; steps: string[] }) {
  if (!status || status === 'Cancelled') {
    return (
      <div className="flex items-center gap-2 mb-6">
        <span className="inline-block bg-bone text-ink-3 font-sans text-[11px] tracking-[0.1em] px-3 py-1 rounded-[2px]">
          已取消
        </span>
      </div>
    )
  }

  const currentIndex = steps.indexOf(status)

  return (
    <div className="mb-7">
      <div className="flex items-center">
        {steps.map((step, i) => {
          const isDone = i < currentIndex
          const isCurrent = i === currentIndex

          const circleClass = [
            'w-[26px] h-[26px] rounded-full flex items-center justify-center text-[11px] font-semibold font-sans border-[1.5px] transition-colors',
            isDone
              ? 'bg-shu border-shu text-paper'
              : isCurrent
              ? 'bg-paper border-shu text-shu'
              : 'bg-paper border-ink-4 text-ink-4',
          ].join(' ')

          const labelTextClass = [
            'mt-[6px] text-[11px] whitespace-nowrap font-sans tracking-[0.04em]',
            isCurrent ? 'text-shu font-medium' : isDone ? 'text-ink-2' : 'text-ink-3',
          ].join(' ')

          return (
            <div
              key={step}
              className={`flex items-center ${i === steps.length - 1 ? 'flex-none' : 'flex-1'}`}
            >
              <div className="flex flex-col items-center">
                <div className={circleClass}>{isDone ? '✓' : i + 1}</div>
                <span className={labelTextClass}>{STATUS_LABEL[step] ?? step}</span>
              </div>
              {i < steps.length - 1 && (
                <div
                  className={`flex-1 h-px mx-2 mb-[18px] transition-colors ${
                    isDone ? 'bg-shu' : 'bg-bone'
                  }`}
                />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default function OrderDetailModal({ orderId, onClose, onOrderCancelled }: Props) {
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [statusSteps, setStatusSteps] = useState<string[]>(MAIN_FLOW)
  const [cancelling, setCancelling] = useState(false)
  const [cancelError, setCancelError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    setError(null)
    Promise.all([fetchOrderById(orderId), getStatusEnums().catch(() => null)])
      .then(([orderData, enums]) => {
        setOrder(orderData)
        if (Array.isArray(enums) && enums.length > 0) {
          setStatusSteps(enums.filter((s) => s !== 'Cancelled'))
        }
      })
      .catch(() => setError('載入訂單詳情失敗'))
      .finally(() => setLoading(false))
  }, [orderId])

  async function handleCancel() {
    if (!order) return
    setCancelling(true)
    setCancelError(null)
    try {
      await updateOrderStatus(order.id, STATUS_INT['Cancelled'])
      onOrderCancelled?.()
      onClose()
    } catch {
      setCancelError('取消訂單失敗，請稍後再試')
    } finally {
      setCancelling(false)
    }
  }

  const canCancel = order?.status != null && CANCELLABLE_STATUSES.includes(order.status)

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/50 p-6"
      onClick={onClose}
    >
      <div
        className="bg-paper border border-bone rounded-lg shadow-[0_24px_60px_rgba(27,26,23,0.16)] w-full max-w-[680px] max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-bone">
          <h2 className="m-0 font-display text-2xl font-normal text-ink tracking-[-0.01em]">
            訂單詳情
          </h2>
          <button
            onClick={onClose}
            aria-label="關閉"
            className="w-8 h-8 flex items-center justify-center text-ink-3 hover:text-ink text-lg transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5">
          {loading && <p className="m-0 text-center py-8 text-ink-3">載入中...</p>}
          {error && <p className="m-0 text-center py-8 text-shu">{error}</p>}

          {!loading && !error && order && (
            <>
              <StatusProgressBar status={order.status} steps={statusSteps} />

              {/* Meta */}
              <div className="grid grid-cols-2 gap-4 mb-6 py-4 border-t border-b border-bone">
                <div>
                  <p className="m-0 text-[10px] text-ink-3 tracking-[0.16em] uppercase">訂單編號</p>
                  <p className="mt-1 font-mono text-[13px] text-ink break-all m-0">{order.id}</p>
                </div>
                <div>
                  <p className="m-0 text-[10px] text-ink-3 tracking-[0.16em] uppercase">金額</p>
                  <p className="mt-1 font-display text-lg text-ink m-0">
                    NT$ {order.totalAmount.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="m-0 text-[10px] text-ink-3 tracking-[0.16em] uppercase">狀態</p>
                  <span className="inline-block mt-1 bg-sand text-ink-2 text-[11px] tracking-[0.1em] px-[10px] py-[3px] rounded-[2px]">
                    {STATUS_LABEL[order.status ?? ''] ?? order.status ?? '未知'}
                  </span>
                </div>
                <div>
                  <p className="m-0 text-[10px] text-ink-3 tracking-[0.16em] uppercase">建立時間</p>
                  <p className="mt-1 text-[13px] text-ink-2 m-0">{formatDate(order.createdAt)}</p>
                </div>
              </div>

              {/* Items */}
              <div>
                <h3 className="m-0 mb-3 font-display text-base font-medium text-ink tracking-[-0.01em]">
                  商品明細
                </h3>
                {!order.items || order.items.length === 0 ? (
                  <p className="m-0 text-[13px] text-ink-3">無商品明細</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse bg-paper text-[13px]">
                      <thead>
                        <tr className="bg-sand">
                          {['商品名稱', '數量', '單價', '小計'].map((col) => (
                            <th
                              key={col}
                              className="px-3 py-[10px] text-center text-[10px] text-ink-3 font-medium tracking-[0.12em] uppercase border-b border-bone"
                            >
                              {col}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {order.items.map((item) => (
                          <tr key={item.id} className="border-b border-bone">
                            <td className="px-3 py-[10px] text-center text-ink font-sans">{item.name}</td>
                            <td className="px-3 py-[10px] text-center text-ink-2 font-sans">{item.quantity}</td>
                            <td className="px-3 py-[10px] text-center text-ink font-display">
                              NT$ {item.unitPrice.toLocaleString()}
                            </td>
                            <td className="px-3 py-[10px] text-center text-ink font-display">
                              NT$ {(item.quantity * item.unitPrice).toLocaleString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* Cancel */}
              {canCancel && (
                <div className="mt-6 pt-4 border-t border-bone">
                  {cancelError && (
                    <p className="mb-[10px] m-0 text-[13px] text-shu">{cancelError}</p>
                  )}
                  <button
                    onClick={handleCancel}
                    disabled={cancelling}
                    className="bg-transparent border border-shu text-shu hover:text-shu-dark hover:border-shu-dark rounded-[2px] py-2 px-[18px] font-sans text-[13px] tracking-[0.1em] transition-colors disabled:border-bone disabled:text-ink-4 disabled:cursor-not-allowed"
                  >
                    {cancelling ? '取消中...' : '取消訂單'}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
