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
      {/* Breadcrumb + title */}
      <div style={{ marginBottom: 32 }}>
        <div style={{
          fontSize: 11,
          color: 'var(--ink-3)',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          marginBottom: 16,
          display: 'flex',
          gap: 8,
          alignItems: 'center',
        }}>
          <span>首頁</span>
          <span style={{ color: 'var(--ink-4)' }}>/</span>
          <span style={{ color: 'var(--ink)' }}>商品列表</span>
        </div>
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 48,
          fontWeight: 400,
          color: 'var(--ink)',
          margin: 0,
          lineHeight: 1.1,
        }}>
          商品列表
        </h1>
        <p style={{ fontSize: 12, color: 'var(--ink-3)', fontFamily: 'var(--font-sans)', marginTop: 8, letterSpacing: '0.06em' }}>
          {products.length} 件商品
        </p>
      </div>

      {/* 2-column layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: 48, alignItems: 'start' }}>
        {/* Sidebar */}
        <aside>
          <div style={{ borderBottom: '1px solid var(--bone)', paddingBottom: 16, marginBottom: 16 }}>
            <h4 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 13,
              fontWeight: 500,
              color: 'var(--ink-2)',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              margin: 0,
              marginBottom: 12,
            }}>
              分類
            </h4>
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    if (cat.id === 'all') {
                      setSearchParams({})
                    } else {
                      setSearchParams({ category: cat.id })
                    }
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'baseline',
                    justifyContent: 'space-between',
                    width: '100%',
                    background: 'none',
                    border: 'none',
                    borderBottom: isActive ? '1px solid var(--ink)' : '1px solid transparent',
                    padding: '7px 0',
                    cursor: 'pointer',
                    textAlign: 'left',
                  }}
                >
                  <span style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 15,
                    color: isActive ? 'var(--ink)' : 'var(--ink-2)',
                    fontWeight: isActive ? 500 : 400,
                  }}>
                    {cat.label}
                  </span>
                  <span style={{
                    fontSize: 10,
                    color: 'var(--ink-3)',
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                  }}>
                    {cat.sub}
                  </span>
                </button>
              )
            })}
          </div>
        </aside>

        {/* Product grid */}
        <div>
          {products.length === 0 ? (
            <p style={{ color: 'var(--ink-3)', fontSize: 15 }}>目前沒有商品</p>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: 24,
            }}>
              {products.map((product) => {
                const coverImage = product.images?.find((img) => img.isCover)
                return (
                  <ProductCard key={product.id} product={product} coverImage={coverImage} />
                )
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
  const [hovered, setHovered] = useState(false)

  return (
    <Link
      to={`/products/${product.id}`}
      style={{
        display: 'block',
        textDecoration: 'none',
        background: 'var(--paper)',
        border: '1px solid var(--bone)',
        borderRadius: 'var(--r-2)',
        overflow: 'hidden',
        transition: `box-shadow var(--t-base) var(--ease-out)`,
        boxShadow: hovered ? 'var(--shadow-card)' : 'none',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <div style={{
        aspectRatio: '4/5',
        overflow: 'hidden',
        background: 'var(--sand)',
      }}>
        {coverImage ? (
          <img
            src={coverImage.imageUrl}
            alt={product.name}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
              transform: hovered ? 'scale(1.03)' : 'scale(1)',
              transition: 'transform 0.4s var(--ease-out)',
            }}
          />
        ) : (
          <div style={{ width: '100%', height: '100%', background: 'var(--sand)' }} />
        )}
      </div>

      {/* Text */}
      <div style={{ padding: '14px 16px 18px' }}>
        <p style={{
          fontFamily: 'var(--font-display)',
          fontSize: 15,
          color: 'var(--ink)',
          margin: 0,
          marginBottom: 6,
          lineHeight: 1.4,
          letterSpacing: '-0.01em',
        }}>
          {product.name}
        </p>
        <p style={{
          fontFamily: 'var(--font-display)',
          fontSize: 18,
          color: 'var(--ink)',
          margin: 0,
          letterSpacing: '-0.01em',
        }}>
          NT$ {product.price.toLocaleString()}
        </p>
      </div>
    </Link>
  )
}
