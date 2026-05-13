import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
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

const CATEGORIES = [
  { id: 'all', label: '全部商品', sub: 'All' },
  { id: 'women', label: '女裝', sub: 'Women' },
  { id: 'men', label: '男裝', sub: 'Men' },
  { id: 'goods', label: '生活雜貨', sub: 'Goods' },
  { id: 'sale', label: '優惠專區', sub: 'Sale' },
]

export default function ConsumerProductListPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchParams, setSearchParams] = useSearchParams()
  const activeCategory = searchParams.get('category') ?? 'all'

  useEffect(() => {
    fetchProducts()
      .then((data) => setProducts(data.filter((p) => p.isActive)))
      .catch(() => setError('載入商品失敗，請稍後再試'))
      .finally(() => setLoading(false))
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
      {/* Breadcrumb + title */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-[11px] text-ink-3 tracking-[0.12em] uppercase mb-4">
          <span>首頁</span>
          <span className="text-ink-4">/</span>
          <span className="text-ink">商品列表</span>
        </div>
        <h1 className="font-display text-[48px] font-normal text-ink leading-[1.1] m-0">
          商品列表
        </h1>
        <p className="text-xs text-ink-3 mt-2 tracking-[0.06em]">{products.length} 件商品</p>
      </div>

      {/* 2-col layout */}
      <div className="grid grid-cols-[220px_1fr] gap-12 items-start">
        {/* Sidebar */}
        <aside>
          <div className="border-b border-bone pb-4 mb-4">
            <h4 className="font-display text-[13px] font-medium text-ink-2 tracking-[0.12em] uppercase m-0 mb-3">
              分類
            </h4>
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    if (cat.id === 'all') setSearchParams({})
                    else setSearchParams({ category: cat.id })
                  }}
                  className={`flex items-baseline justify-between w-full py-[7px] text-left border-b ${
                    isActive ? 'border-ink' : 'border-transparent'
                  }`}
                >
                  <span
                    className={`font-display text-[15px] ${
                      isActive ? 'text-ink font-medium' : 'text-ink-2'
                    }`}
                  >
                    {cat.label}
                  </span>
                  <span className="text-[10px] text-ink-3 tracking-[0.18em] uppercase">{cat.sub}</span>
                </button>
              )
            })}
          </div>
        </aside>

        {/* Products */}
        <div>
          {products.length === 0 ? (
            <p className="text-ink-3 text-[15px]">目前沒有商品</p>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product) => {
                const coverImage = product.images?.find((img) => img.isCover)
                return <ProductCard key={product.id} product={product} coverImage={coverImage} />
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function ProductCard({
  product,
  coverImage,
}: {
  product: { id: string; name: string; price: number }
  coverImage?: { imageUrl: string }
}) {
  return (
    <Link
      to={`/products/${product.id}`}
      className="group block bg-paper border border-bone rounded-[4px] overflow-hidden transition-shadow duration-200 hover:shadow-[0_2px_8px_rgba(27,26,23,0.06)]"
    >
      <div className="aspect-[4/5] overflow-hidden bg-sand">
        {coverImage ? (
          <img
            src={coverImage.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover block transition-transform duration-[400ms] ease-out group-hover:scale-[1.03]"
          />
        ) : (
          <div className="w-full h-full bg-sand" />
        )}
      </div>
      <div className="px-4 pt-[14px] pb-[18px]">
        <p className="font-display text-[15px] text-ink leading-snug tracking-[-0.01em] m-0 mb-[6px]">
          {product.name}
        </p>
        <p className="font-display text-[18px] text-ink tracking-[-0.01em] m-0">
          NT$ {product.price.toLocaleString()}
        </p>
      </div>
    </Link>
  )
}
