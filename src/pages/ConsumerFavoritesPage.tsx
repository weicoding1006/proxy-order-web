import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import type { AppDispatch } from '../store'
import { selectFavorites, selectFavoritesStatus, toggleFavorite } from '../store/slices/favoritesSlice'
import { useState } from 'react'

export default function ConsumerFavoritesPage() {
  const dispatch = useDispatch<AppDispatch>()
  const favorites = useSelector(selectFavorites)
  const status = useSelector(selectFavoritesStatus)
  const [removing, setRemoving] = useState<Set<string>>(new Set())

  async function handleRemove(productId: string) {
    setRemoving((prev) => new Set(prev).add(productId))
    try {
      await dispatch(toggleFavorite(productId)).unwrap()
    } finally {
      setRemoving((prev) => {
        const next = new Set(prev)
        next.delete(productId)
        return next
      })
    }
  }

  if (status === 'loading' && favorites.length === 0) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-ink-3 text-base">載入中...</p>
      </div>
    )
  }

  return (
    <div>
      {/* Title */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-[11px] text-ink-3 tracking-[0.12em] uppercase mb-4">
          <Link to="/" className="hover:opacity-65">首頁</Link>
          <span className="text-ink-4">/</span>
          <span className="text-ink">我的收藏</span>
        </div>
        <h1 className="font-display text-[48px] font-normal text-ink leading-[1.1] m-0">
          我的收藏
        </h1>
        <p className="text-xs text-ink-3 mt-2 tracking-[0.06em]">{favorites.length} 件收藏</p>
      </div>

      {favorites.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 gap-5">
          <p className="text-ink-2 text-[15px]">尚無收藏商品</p>
          <Link
            to="/"
            className="font-sans text-[13px] text-shu tracking-[0.08em] hover:opacity-65 transition-opacity"
          >
            前往逛逛 →
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {favorites.map((item) => {
            const isRemoving = removing.has(item.productId)
            return (
              <div
                key={item.productId}
                className="relative group bg-paper border border-bone rounded-[4px] overflow-hidden transition-shadow duration-200 hover:shadow-[0_2px_8px_rgba(27,26,23,0.06)]"
              >
                <Link to={`/products/${item.productId}`} className="block">
                  <div className="aspect-[4/5] overflow-hidden bg-sand">
                    {item.coverImageUrl ? (
                      <img
                        src={item.coverImageUrl}
                        alt={item.productName}
                        className="w-full h-full object-cover block transition-transform duration-[400ms] ease-out group-hover:scale-[1.03]"
                      />
                    ) : (
                      <div className="w-full h-full bg-sand" />
                    )}
                  </div>
                  <div className="px-4 pt-[14px] pb-[18px]">
                    <p className="font-display text-[15px] text-ink leading-snug tracking-[-0.01em] m-0 mb-[6px]">
                      {item.productName}
                    </p>
                    <p className="font-display text-[18px] text-ink tracking-[-0.01em] m-0">
                      NT$ {item.price.toLocaleString()}
                    </p>
                  </div>
                </Link>

                {/* Remove button */}
                <button
                  type="button"
                  onClick={() => handleRemove(item.productId)}
                  disabled={isRemoving}
                  aria-label="移除收藏"
                  className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center bg-paper/80 rounded-full border border-bone hover:bg-paper transition-colors disabled:cursor-not-allowed"
                >
                  <HeartIcon filled className="w-4 h-4 text-shu" />
                </button>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

function HeartIcon({ filled, className }: { filled?: boolean; className?: string }) {
  return filled ? (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  ) : (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.5C21 5.42 18.58 3 15.5 3c-1.74 0-3.41.81-4.5 2.09C9.91 3.81 8.24 3 6.5 3 3.42 3 1 5.42 1 8.5c0 3.78 3.4 6.86 8.55 11.54L11 21.35l1.45-1.32C17.6 15.36 21 12.28 21 8.5z" />
    </svg>
  )
}
