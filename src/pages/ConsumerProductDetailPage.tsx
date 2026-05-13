import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { fetchProductById } from '../api/product'
import { addItem } from '../store/slices/cartSlice'
import type { AppDispatch } from '../store'

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
  description: string
  price: number
  stock: number
  isActive: boolean
  images?: ProductImageDto[]
}

export default function ConsumerProductDetailPage() {
  const { id } = useParams<{ id: string }>()
  const dispatch = useDispatch<AppDispatch>()

  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [activeImageId, setActiveImageId] = useState<string | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [adding, setAdding] = useState(false)
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  useEffect(() => {
    if (!id) return
    setLoading(true)
    setNotFound(false)
    setError(null)
    fetchProductById(id)
      .then((data) => {
        setProduct(data as Product)
        const cover = data.images?.find((img) => img.isCover) ?? data.images?.[0]
        setActiveImageId(cover?.id ?? null)
      })
      .catch((err: Error & { status?: number }) => {
        if (err.status === 404) setNotFound(true)
        else setError('載入商品失敗，請稍後再試')
      })
      .finally(() => setLoading(false))
  }, [id])

  const sortedImages = useMemo(
    () => (product?.images ? [...product.images].sort((a, b) => a.sortOrder - b.sortOrder) : []),
    [product],
  )
  const activeImage = sortedImages.find((img) => img.id === activeImageId)

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 0' }}>
        <p style={{ color: 'var(--ink-3)', fontSize: 16 }}>載入中...</p>
      </div>
    )
  }

  if (notFound) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '80px 0', gap: 16 }}>
        <p style={{ color: 'var(--ink-2)', fontSize: 16 }}>找不到此商品</p>
        <Link to="/" style={{ color: 'var(--shu)', fontSize: 13, letterSpacing: '0.08em' }}>← 回到商品列表</Link>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 0' }}>
        <p style={{ color: 'var(--shu)', fontSize: 16 }}>{error ?? '商品載入失敗'}</p>
      </div>
    )
  }

  const outOfStock = product.stock <= 0

  function handleQuantityChange(value: number) {
    if (Number.isNaN(value)) return
    const clamped = Math.max(1, Math.min(value, product!.stock || 1))
    setQuantity(clamped)
  }

  async function handleAddToCart() {
    if (!product || outOfStock) return
    setAdding(true)
    setFeedback(null)
    try {
      await dispatch(addItem({ productId: product.id, quantity })).unwrap()
      setFeedback({ type: 'success', text: '已加入購物車' })
    } catch (err) {
      setFeedback({ type: 'error', text: (err as string) ?? '加入購物車失敗' })
    } finally {
      setAdding(false)
    }
  }

  return (
    <div>
      {/* Breadcrumb */}
      <div style={{
        fontSize: 11,
        color: 'var(--ink-3)',
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        marginBottom: 32,
        display: 'flex',
        gap: 8,
        alignItems: 'center',
      }}>
        <Link to="/" style={{ color: 'var(--ink-3)', textDecoration: 'none' }}>首頁</Link>
        <span style={{ color: 'var(--ink-4)' }}>/</span>
        <Link to="/" style={{ color: 'var(--ink-3)', textDecoration: 'none' }}>商品列表</Link>
        <span style={{ color: 'var(--ink-4)' }}>/</span>
        <span style={{ color: 'var(--ink)' }}>{product.name}</span>
      </div>

      {/* 2-column grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 48,
        alignItems: 'start',
      }}>
        {/* Images */}
        <div>
          {/* Main image */}
          <div style={{
            aspectRatio: '4/5',
            overflow: 'hidden',
            background: 'var(--sand)',
            borderRadius: 'var(--r-2)',
            border: '1px solid var(--bone)',
          }}>
            {activeImage ? (
              <img
                src={activeImage.imageUrl}
                alt={product.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            ) : (
              <div style={{ width: '100%', height: '100%', background: 'var(--sand)' }} />
            )}
          </div>

          {/* Thumbnail strip */}
          {sortedImages.length > 1 && (
            <div style={{ marginTop: 12, display: 'flex', gap: 8, overflowX: 'auto' }}>
              {sortedImages.map((img) => (
                <button
                  key={img.id}
                  type="button"
                  onClick={() => setActiveImageId(img.id)}
                  style={{
                    flexShrink: 0,
                    width: 64,
                    height: 64,
                    overflow: 'hidden',
                    border: img.id === activeImageId
                      ? '2px solid var(--shu)'
                      : '1px solid var(--bone)',
                    borderRadius: 0,
                    padding: 0,
                    cursor: 'pointer',
                    background: 'var(--sand)',
                  }}
                >
                  <img src={img.imageUrl} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product info */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {/* Name */}
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 28,
            fontWeight: 400,
            color: 'var(--ink)',
            margin: 0,
            marginBottom: 16,
            lineHeight: 1.3,
            letterSpacing: '-0.01em',
          }}>
            {product.name}
          </h1>

          {/* Price */}
          <p style={{
            fontFamily: 'var(--font-display)',
            fontSize: 32,
            color: 'var(--ink)',
            margin: 0,
            marginBottom: 20,
            letterSpacing: '-0.01em',
          }}>
            NT$ {product.price.toLocaleString()}
          </p>

          {/* Stock */}
          <p style={{ fontSize: 13, color: 'var(--ink-3)', margin: 0, marginBottom: 20 }}>
            庫存：{' '}
            {outOfStock ? (
              <span style={{ color: 'var(--shu)', fontWeight: 500 }}>缺貨</span>
            ) : (
              <span style={{ color: 'var(--ink-2)' }}>{product.stock}</span>
            )}
          </p>

          {/* Description */}
          {product.description && (
            <div style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 15,
              color: 'var(--ink-2)',
              lineHeight: 1.85,
              whiteSpace: 'pre-wrap',
              marginBottom: 28,
              paddingBottom: 28,
              borderBottom: '1px solid var(--bone)',
            }}>
              {product.description}
            </div>
          )}

          {/* Quantity selector */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
            <label style={{ fontSize: 13, color: 'var(--ink-3)', letterSpacing: '0.08em' }}>數量</label>
            <div style={{ display: 'inline-flex' }}>
              <button
                type="button"
                onClick={() => handleQuantityChange(quantity - 1)}
                disabled={outOfStock || quantity <= 1}
                style={{
                  width: 36,
                  height: 36,
                  border: '1px solid var(--bone)',
                  borderRight: 'none',
                  borderRadius: 0,
                  background: 'var(--paper)',
                  color: outOfStock || quantity <= 1 ? 'var(--ink-4)' : 'var(--ink)',
                  fontSize: 18,
                  cursor: outOfStock || quantity <= 1 ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                −
              </button>
              <input
                type="number"
                min={1}
                max={product.stock || 1}
                value={quantity}
                disabled={outOfStock}
                onChange={(e) => handleQuantityChange(Number(e.target.value))}
                style={{
                  width: 52,
                  height: 36,
                  border: '1px solid var(--bone)',
                  borderRadius: 0,
                  background: 'var(--paper)',
                  color: 'var(--ink)',
                  textAlign: 'center',
                  fontFamily: 'var(--font-sans)',
                  fontSize: 14,
                  outline: 'none',
                }}
              />
              <button
                type="button"
                onClick={() => handleQuantityChange(quantity + 1)}
                disabled={outOfStock || quantity >= product.stock}
                style={{
                  width: 36,
                  height: 36,
                  border: '1px solid var(--bone)',
                  borderLeft: 'none',
                  borderRadius: 0,
                  background: 'var(--paper)',
                  color: outOfStock || quantity >= product.stock ? 'var(--ink-4)' : 'var(--ink)',
                  fontSize: 18,
                  cursor: outOfStock || quantity >= product.stock ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                +
              </button>
            </div>
          </div>

          {/* Add to cart button */}
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={outOfStock || adding}
            style={{
              background: outOfStock || adding ? 'var(--bone)' : 'var(--shu)',
              color: outOfStock || adding ? 'var(--ink-3)' : 'var(--paper)',
              border: 'none',
              borderRadius: 'var(--r-1)',
              padding: '12px 32px',
              fontFamily: 'var(--font-sans)',
              fontSize: 13,
              letterSpacing: '0.1em',
              cursor: outOfStock || adding ? 'not-allowed' : 'pointer',
              transition: 'background var(--t-fast) var(--ease-out)',
              alignSelf: 'flex-start',
            }}
            onMouseEnter={e => {
              if (!outOfStock && !adding) e.currentTarget.style.background = 'var(--shu-dark)'
            }}
            onMouseLeave={e => {
              if (!outOfStock && !adding) e.currentTarget.style.background = 'var(--shu)'
            }}
          >
            {outOfStock ? '缺貨' : adding ? '加入中...' : '加入購物車'}
          </button>

          {/* Feedback */}
          {feedback && (
            <p style={{
              marginTop: 12,
              fontSize: 13,
              color: feedback.type === 'success' ? 'var(--moss)' : 'var(--shu)',
            }}>
              {feedback.text}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
