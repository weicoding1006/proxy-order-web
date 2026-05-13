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

const STATUS_MAP: Record<StatusKey, { bg: string; color: string; label: string }> = {
  Pending:   { bg: 'var(--yuhi-light)',  color: 'var(--yuhi)',  label: '待確認' },
  Confirmed: { bg: 'var(--ai-light)',    color: 'var(--ai)',    label: '已確認' },
  Completed: { bg: 'var(--moss-light)',  color: 'var(--moss)',  label: '已完成' },
  Cancelled: { bg: 'var(--bone)',        color: 'var(--ink-3)', label: '已取消' },
}

function StatusBadge({ status }: { status: string | null }) {
  const key = status as StatusKey
  const style = STATUS_MAP[key] ?? { bg: 'var(--sand)', color: 'var(--ink-2)', label: status ?? '未知' }
  return (
    <span style={{
      display: 'inline-block',
      background: style.bg,
      color: style.color,
      fontSize: 11,
      letterSpacing: '0.1em',
      padding: '3px 10px',
      borderRadius: 'var(--r-1)',
      fontFamily: 'var(--font-sans)',
    }}>
      {STATUS_MAP[key]?.label ?? (status ?? '未知')}
    </span>
  )
}

function ViewButton({ onClick }: { onClick: () => void }) {
  const [hovered, setHovered] = useState(false)
  return (
    <button
      onClick={onClick}
      style={{
        background: hovered ? 'var(--ink)' : 'transparent',
        color: hovered ? 'var(--paper)' : 'var(--ink)',
        border: '1px solid var(--ink)',
        borderRadius: 'var(--r-1)',
        padding: '6px 16px',
        fontFamily: 'var(--font-sans)',
        fontSize: 12,
        letterSpacing: '0.1em',
        cursor: 'pointer',
        transition: `background var(--t-fast) var(--ease-out), color var(--t-fast) var(--ease-out)`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      檢視
    </button>
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
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 0' }}>
        <p style={{ color: 'var(--ink-3)', fontSize: 16 }}>載入中...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 0' }}>
        <p style={{ color: 'var(--shu)', fontSize: 16 }}>{error}</p>
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
        我的訂單
      </h1>

      {orders.length === 0 ? (
        <p style={{ color: 'var(--ink-3)', fontSize: 15 }}>目前沒有訂單</p>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            background: 'var(--paper)',
            fontSize: 14,
          }}>
            <thead>
              <tr style={{ background: 'var(--sand)' }}>
                {['訂單編號', '金額', '狀態', '建立時間', '操作'].map((col) => (
                  <th
                    key={col}
                    style={{
                      padding: '12px 16px',
                      textAlign: 'center',
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
              {orders.map((order) => (
                <tr key={order.id} style={{ borderBottom: '1px solid var(--bone)' }}>
                  {/* Order ID */}
                  <td style={{ padding: '14px 16px', textAlign: 'center' }}>
                    <span
                      title={order.id}
                      style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--ink-3)' }}
                    >
                      {order.id.slice(0, 8)}...
                    </span>
                  </td>

                  {/* Amount */}
                  <td style={{ padding: '14px 16px', textAlign: 'center', fontFamily: 'var(--font-sans)', fontSize: 14, color: 'var(--ink)' }}>
                    NT$ {order.totalAmount.toLocaleString()}
                  </td>

                  {/* Status */}
                  <td style={{ padding: '14px 16px', textAlign: 'center' }}>
                    <StatusBadge status={order.status} />
                  </td>

                  {/* Date */}
                  <td style={{ padding: '14px 16px', textAlign: 'center', fontFamily: 'var(--font-sans)', fontSize: 13, color: 'var(--ink-3)' }}>
                    {formatDate(order.createdAt)}
                  </td>

                  {/* Action */}
                  <td style={{ padding: '14px 16px', textAlign: 'center' }}>
                    <ViewButton onClick={() => setSelectedOrderId(order.id)} />
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
