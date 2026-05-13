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
        <p className="text-ink-3 text-base">載入中...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-shu text-base">{error}</p>
      </div>
    )
  }

  return (
    <div className="max-w-[1280px] mx-auto px-16 py-12">
      <p className="text-[11px] text-ink-3 tracking-[0.18em] uppercase m-0">
        商品管理 ・ Products
      </p>
      <h1 className="font-display text-4xl font-normal text-ink tracking-[-0.01em] mt-2 mb-8">
        商品列表
      </h1>

      {products.length === 0 ? (
        <p className="text-ink-3 text-[15px]">目前沒有商品</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-paper text-sm">
            <thead>
              <tr className="bg-sand">
                {['商品名稱', '價格', '庫存', '狀態', '操作'].map((col) => (
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
              {products.map((product) => (
                <tr key={product.id} className="border-b border-bone">
                  <td className="px-4 py-[14px] text-center text-ink font-sans text-sm">
                    {product.name}
                  </td>
                  <td className="px-4 py-[14px] text-center text-ink font-display text-sm">
                    NT$ {product.price.toLocaleString()}
                  </td>
                  <td className="px-4 py-[14px] text-center text-ink-2 font-sans text-sm">
                    {product.stock}
                  </td>
                  <td className="px-4 py-[14px] text-center">
                    <span
                      className={`inline-block font-sans text-[11px] tracking-[0.08em] px-[10px] py-[3px] rounded-[2px] ${
                        product.isActive ? 'bg-moss-light text-moss' : 'bg-bone text-ink-3'
                      }`}
                    >
                      {product.isActive ? '上架' : '下架'}
                    </span>
                  </td>
                  <td className="px-4 py-[14px] text-center">
                    <button
                      onClick={() => setSelectedProduct(product)}
                      className="bg-transparent hover:bg-ink text-ink hover:text-paper border border-ink rounded-[2px] py-[5px] px-[14px] font-sans text-xs tracking-[0.1em] transition-colors"
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
