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
      <div className="flex items-center justify-center py-20">
        <p className="text-ink-3 text-base">載入中...</p>
      </div>
    )
  }

  if (notFound) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <p className="text-ink-2 text-base">找不到此商品</p>
        <Link to="/" className="text-shu text-[13px] tracking-[0.08em] hover:opacity-65">← 回到商品列表</Link>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-shu text-base">{error ?? '商品載入失敗'}</p>
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
      <div className="flex items-center gap-2 text-[11px] text-ink-3 tracking-[0.12em] uppercase mb-8">
        <Link to="/" className="text-ink-3 hover:opacity-65">首頁</Link>
        <span className="text-ink-4">/</span>
        <Link to="/" className="text-ink-3 hover:opacity-65">商品列表</Link>
        <span className="text-ink-4">/</span>
        <span className="text-ink">{product.name}</span>
      </div>

      {/* 2-col grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        {/* Images */}
        <div>
          <div className="aspect-[4/5] overflow-hidden bg-sand rounded-[4px] border border-bone">
            {activeImage ? (
              <img
                src={activeImage.imageUrl}
                alt={product.name}
                className="w-full h-full object-cover block"
              />
            ) : (
              <div className="w-full h-full bg-sand" />
            )}
          </div>
          {sortedImages.length > 1 && (
            <div className="mt-3 flex gap-2 overflow-x-auto">
              {sortedImages.map((img) => (
                <button
                  key={img.id}
                  type="button"
                  onClick={() => setActiveImageId(img.id)}
                  className={`shrink-0 w-16 h-16 overflow-hidden p-0 bg-sand ${
                    img.id === activeImageId ? 'border-2 border-shu' : 'border border-bone'
                  }`}
                >
                  <img src={img.imageUrl} alt="" className="w-full h-full object-cover block" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex flex-col">
          <h1 className="font-display text-[28px] font-normal text-ink leading-snug tracking-[-0.01em] m-0 mb-4">
            {product.name}
          </h1>

          <p className="font-display text-[32px] text-ink tracking-[-0.01em] m-0 mb-5">
            NT$ {product.price.toLocaleString()}
          </p>

          <p className="text-[13px] text-ink-3 m-0 mb-5">
            庫存：{' '}
            {outOfStock ? (
              <span className="text-shu font-medium">缺貨</span>
            ) : (
              <span className="text-ink-2">{product.stock}</span>
            )}
          </p>

          {product.description && (
            <div className="font-sans text-[15px] text-ink-2 leading-[1.85] whitespace-pre-wrap mb-7 pb-7 border-b border-bone">
              {product.description}
            </div>
          )}

          {/* Quantity */}
          <div className="flex items-center gap-4 mb-5">
            <label className="text-[13px] text-ink-3 tracking-[0.08em]">數量</label>
            <div className="inline-flex">
              <button
                type="button"
                onClick={() => handleQuantityChange(quantity - 1)}
                disabled={outOfStock || quantity <= 1}
                className="w-9 h-9 border border-bone border-r-0 bg-paper text-ink text-lg flex items-center justify-center disabled:text-ink-4 disabled:cursor-not-allowed"
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
                className="w-[52px] h-9 border border-bone bg-paper text-ink text-center font-sans text-sm outline-none"
              />
              <button
                type="button"
                onClick={() => handleQuantityChange(quantity + 1)}
                disabled={outOfStock || quantity >= product.stock}
                className="w-9 h-9 border border-bone border-l-0 bg-paper text-ink text-lg flex items-center justify-center disabled:text-ink-4 disabled:cursor-not-allowed"
              >
                +
              </button>
            </div>
          </div>

          {/* Add to cart */}
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={outOfStock || adding}
            className="self-start bg-shu hover:bg-shu-dark text-paper rounded-[2px] py-3 px-8 font-sans text-[13px] tracking-[0.1em] transition-colors disabled:bg-bone disabled:text-ink-3 disabled:cursor-not-allowed disabled:hover:bg-bone"
          >
            {outOfStock ? '缺貨' : adding ? '加入中...' : '加入購物車'}
          </button>

          {feedback && (
            <p className={`mt-3 text-[13px] ${feedback.type === 'success' ? 'text-moss' : 'text-shu'}`}>
              {feedback.text}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
