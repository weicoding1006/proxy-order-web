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
        <p className="text-gray-500 text-lg">載入中...</p>
      </div>
    )
  }

  if (notFound) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-3">
        <p className="text-gray-700 text-lg">找不到此商品</p>
        <Link to="/" className="text-blue-600 hover:underline">回到商品列表</Link>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-red-500 text-lg">{error ?? '商品載入失敗'}</p>
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
      <Link to="/" className="text-sm text-blue-600 hover:underline">← 回到商品列表</Link>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          {activeImage ? (
            <img
              src={activeImage.imageUrl}
              alt={product.name}
              className="w-full aspect-square object-cover rounded-lg border border-gray-200"
            />
          ) : (
            <div className="w-full aspect-square bg-gray-100 rounded-lg border border-gray-200" />
          )}
          {sortedImages.length > 1 && (
            <div className="mt-3 flex gap-2 overflow-x-auto">
              {sortedImages.map((img) => (
                <button
                  key={img.id}
                  type="button"
                  onClick={() => setActiveImageId(img.id)}
                  className={`flex-shrink-0 w-16 h-16 rounded-md border-2 overflow-hidden ${
                    img.id === activeImageId ? 'border-blue-500' : 'border-gray-200 hover:border-gray-400'
                  }`}
                >
                  <img src={img.imageUrl} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col">
          <h1 className="text-2xl font-bold text-gray-800">{product.name}</h1>
          <p className="mt-2 text-2xl font-bold text-blue-600">NT$ {product.price.toLocaleString()}</p>

          <p className="mt-4 text-sm text-gray-600">
            庫存：
            {outOfStock ? (
              <span className="text-red-600 font-semibold">缺貨</span>
            ) : (
              <span className="text-gray-800">{product.stock}</span>
            )}
          </p>

          {product.description && (
            <div className="mt-4 text-gray-700 whitespace-pre-wrap">{product.description}</div>
          )}

          <div className="mt-6 flex items-center gap-3">
            <label htmlFor="quantity" className="text-sm text-gray-700">數量</label>
            <div className="inline-flex items-center border border-gray-300 rounded-md">
              <button
                type="button"
                onClick={() => handleQuantityChange(quantity - 1)}
                disabled={outOfStock || quantity <= 1}
                className="px-3 py-1 text-gray-600 disabled:text-gray-300 hover:bg-gray-100"
              >
                −
              </button>
              <input
                id="quantity"
                type="number"
                min={1}
                max={product.stock || 1}
                value={quantity}
                disabled={outOfStock}
                onChange={(e) => handleQuantityChange(Number(e.target.value))}
                className="w-14 text-center py-1 outline-none disabled:bg-gray-50"
              />
              <button
                type="button"
                onClick={() => handleQuantityChange(quantity + 1)}
                disabled={outOfStock || quantity >= product.stock}
                className="px-3 py-1 text-gray-600 disabled:text-gray-300 hover:bg-gray-100"
              >
                +
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={handleAddToCart}
            disabled={outOfStock || adding}
            className="mt-6 w-full md:w-auto px-6 py-2 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {outOfStock ? '缺貨' : adding ? '加入中...' : '加入購物車'}
          </button>

          {feedback && (
            <p
              className={`mt-3 text-sm ${
                feedback.type === 'success' ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {feedback.text}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
