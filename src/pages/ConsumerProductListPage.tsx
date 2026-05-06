import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchProducts } from '../api/product'

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
  images?: ProductImageDto[]
}

export default function ConsumerProductListPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchProducts()
      .then((data) => setProducts(data.filter((p) => p.isActive)))
      .catch(() => setError('載入商品失敗，請稍後再試'))
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-gray-500 text-lg">載入中...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">商品列表</h1>

      {products.length === 0 ? (
        <p className="text-gray-500">目前沒有商品</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => {
            const coverImage = product.images?.find((img) => img.isCover)
            return (
              <Link
                key={product.id}
                to={`/products/${product.id}`}
                className="block bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md hover:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow overflow-hidden"
              >
                {coverImage ? (
                  <img
                    src={coverImage.imageUrl}
                    alt={product.name}
                    className="w-full h-40 object-cover"
                  />
                ) : (
                  <div className="w-full h-40 bg-gray-100" />
                )}
                <div className="p-4">
                  <h2 className="font-semibold text-gray-800 mb-2">{product.name}</h2>
                  <p className="text-blue-600 font-bold">NT$ {product.price.toLocaleString()}</p>
                </div>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
