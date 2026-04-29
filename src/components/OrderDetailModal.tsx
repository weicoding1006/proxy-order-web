import { useEffect, useState } from 'react'
import { fetchOrderById } from '../api/order'

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
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleString('zh-TW', {
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit',
  })
}

export default function OrderDetailModal({ orderId, onClose }: Props) {
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    setError(null)
    fetchOrderById(orderId)
      .then(setOrder)
      .catch(() => setError('載入訂單詳情失敗'))
      .finally(() => setLoading(false))
  }, [orderId])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">訂單詳情</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-xl leading-none"
            aria-label="關閉"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5">
          {loading && (
            <p className="text-center text-gray-500 py-8">載入中...</p>
          )}

          {error && (
            <p className="text-center text-red-500 py-8">{error}</p>
          )}

          {!loading && !error && order && (
            <>
              {/* 基本資訊 */}
              <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                <div>
                  <p className="text-gray-500 mb-1">訂單編號</p>
                  <p className="font-mono text-gray-800 break-all">{order.id}</p>
                </div>
                <div>
                  <p className="text-gray-500 mb-1">金額</p>
                  <p className="text-gray-800 font-semibold">NT$ {order.totalAmount.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-gray-500 mb-1">狀態</p>
                  <span className="inline-block text-xs font-medium px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
                    {order.status ?? '未知'}
                  </span>
                </div>
                <div>
                  <p className="text-gray-500 mb-1">建立時間</p>
                  <p className="text-gray-800">{formatDate(order.createdAt)}</p>
                </div>
              </div>

              {/* 商品明細 */}
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-3">商品明細</h3>
                {!order.items || order.items.length === 0 ? (
                  <p className="text-sm text-gray-400">無商品明細</p>
                ) : (
                  <div className="overflow-x-auto rounded-lg border border-gray-200">
                    <table className="min-w-full divide-y divide-gray-200 text-sm bg-white">
                      <thead className="bg-gray-50 text-xs font-semibold text-gray-500 uppercase text-center">
                        <tr>
                          <th className="px-4 py-2">商品 ID</th>
                          <th className="px-4 py-2">數量</th>
                          <th className="px-4 py-2">單價</th>
                          <th className="px-4 py-2">小計</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {order.items.map((item) => (
                          <tr key={item.id} className="text-center text-gray-700">
                            <td className="px-4 py-2 font-mono text-xs">{item.name}</td>
                            <td className="px-4 py-2">{item.quantity}</td>
                            <td className="px-4 py-2">NT$ {item.unitPrice.toLocaleString()}</td>
                            <td className="px-4 py-2 font-medium">NT$ {(item.quantity * item.unitPrice).toLocaleString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
