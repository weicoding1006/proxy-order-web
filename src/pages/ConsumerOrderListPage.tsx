import { useEffect, useState } from 'react'
import { fetchOrders } from '../api/order'
import OrderDetailModal from '../components/OrderDetailModal'

interface OrderItem {
  id: string
  productId: string
  quantity: number
  unitPrice: number
}

interface Order {
  id: string
  userId: string | null
  totalAmount: number
  status: string | null
  createdAt: string
  items: OrderItem[] | null
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleString('zh-TW', {
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit',
  })
}

type StatusKey = 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled'

const STATUS_STYLE: Record<StatusKey, { className: string; label: string }> = {
  Pending:   { className: 'bg-yuhi-light text-yuhi',  label: '待確認' },
  Confirmed: { className: 'bg-ai-light text-ai',      label: '已確認' },
  Completed: { className: 'bg-moss-light text-moss',  label: '已完成' },
  Cancelled: { className: 'bg-bone text-ink-3',       label: '已取消' },
}

function StatusBadge({ status }: { status: string | null }) {
  const key = status as StatusKey
  const style = STATUS_STYLE[key] ?? { className: 'bg-sand text-ink-2', label: status ?? '未知' }
  return (
    <span
      className={`inline-block ${style.className} font-sans text-[11px] tracking-[0.1em] px-[10px] py-[3px] rounded-[2px]`}
    >
      {STATUS_STYLE[key]?.label ?? (status ?? '未知')}
    </span>
  )
}

export default function ConsumerOrderListPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null)

  function loadOrders() {
    fetchOrders()
      .then(setOrders)
      .catch(() => setError('載入訂單失敗，請稍後再試'))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    loadOrders()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-ink-3 text-base">載入中...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-shu text-base">{error}</p>
      </div>
    )
  }

  return (
    <div>
      <h1 className="font-display text-4xl font-normal text-ink tracking-[-0.01em] m-0 mb-8">
        我的訂單
      </h1>

      {orders.length === 0 ? (
        <p className="text-ink-3 text-[15px]">目前沒有訂單</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-paper text-sm">
            <thead>
              <tr className="bg-sand">
                {['訂單編號', '金額', '狀態', '建立時間', '操作'].map((col) => (
                  <th
                    key={col}
                    className="px-4 py-3 text-center text-[11px] text-ink-3 font-medium tracking-[0.12em] uppercase border-b border-bone font-sans"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b border-bone">
                  <td className="px-4 py-[14px] text-center">
                    <span title={order.id} className="font-mono text-xs text-ink-3">
                      {order.id.slice(0, 8)}...
                    </span>
                  </td>
                  <td className="px-4 py-[14px] text-center font-sans text-sm text-ink">
                    NT$ {order.totalAmount.toLocaleString()}
                  </td>
                  <td className="px-4 py-[14px] text-center">
                    <StatusBadge status={order.status} />
                  </td>
                  <td className="px-4 py-[14px] text-center font-sans text-[13px] text-ink-3">
                    {formatDate(order.createdAt)}
                  </td>
                  <td className="px-4 py-[14px] text-center">
                    <button
                      onClick={() => setSelectedOrderId(order.id)}
                      className="bg-transparent hover:bg-ink text-ink hover:text-paper border border-ink rounded-[2px] py-[6px] px-4 font-sans text-xs tracking-[0.1em] transition-colors"
                    >
                      檢視
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selectedOrderId && (
        <OrderDetailModal
          orderId={selectedOrderId}
          onClose={() => setSelectedOrderId(null)}
          onOrderCancelled={() => {
            setSelectedOrderId(null)
            setLoading(true)
            loadOrders()
          }}
        />
      )}
    </div>
  )
}
