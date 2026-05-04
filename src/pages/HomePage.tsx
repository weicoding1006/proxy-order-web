import { useEffect, useState } from 'react'
import { fetchProducts } from '../api/product'
import ProductEditModal from '../components/ProductEditModal'

interface ProductImageDto {
  id: string
  imageUrl: string
  isCover: boolean
  sortOrder: number
  createAt: string
}

interface Product {
  id: string
  name: string
  price: number
  stock: number
  isActive: boolean
  description?: string
  images?: ProductImageDto[]
}

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  const loadProducts = () => {
    setLoading(true)
    fetchProducts()
      .then(setProducts)
      .catch(() => setError('載入商品失敗，請稍後再試'))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    loadProducts()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500 text-lg">載入中...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">商品列表</h1>

      {products.length === 0 ? (
        <p className="text-gray-500">目前沒有商品</p>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
          <table className="min-w-full divide-y divide-gray-200 bg-white text-sm">
            <thead className="bg-gray-50 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">
              <tr>
                <th className="px-4 py-3">商品名稱</th>
                <th className="px-4 py-3">價格</th>
                <th className="px-4 py-3">庫存</th>
                <th className="px-4 py-3">狀態</th>
                <th className="px-4 py-3">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 font-medium text-gray-800 text-center">{product.name}</td>
                  <td className="px-4 py-3 text-gray-700 text-center">NT$ {product.price.toLocaleString()}</td>
                  <td className="px-4 py-3 text-gray-700 text-center">{product.stock}</td>
                  <td className="px-4 py-3 text-center">
                    <span
                      className={`inline-block text-xs font-medium px-2 py-0.5 rounded-full ${
                        product.isActive
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-500'
                      }`}
                    >
                      {product.isActive ? '上架' : '下架'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => setSelectedProduct(product)}
                      className="text-xs px-3 py-1 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors"
                    >
                      編輯
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selectedProduct && (
        <ProductEditModal
          productId={selectedProduct.id}
          name={selectedProduct.name}
          price={selectedProduct.price}
          stock={selectedProduct.stock}
          isActive={selectedProduct.isActive}
          description={selectedProduct.description ?? ''}
          images={selectedProduct.images ?? []}
          onClose={() => setSelectedProduct(null)}
          onSaved={() => {
            setSelectedProduct(null)
            loadProducts()
          }}
        />
      )}
    </div>
  )
}
