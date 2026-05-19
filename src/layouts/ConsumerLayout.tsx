import { useEffect } from 'react'
import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useTokenCountdown } from '../hooks/useTokenCountdown'
import { clearAuth, getToken } from '../utils/auth'
import type { AppDispatch } from '../store'
import { loadCart, selectCartItemCount, resetCart } from '../store/slices/cartSlice'
import { loadFavorites } from '../store/slices/favoritesSlice'

export default function ConsumerLayout() {
  const countdown = useTokenCountdown()
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const cartItemCount = useSelector(selectCartItemCount)

  useEffect(() => {
    if (getToken()) {
      dispatch(loadCart())
      dispatch(loadFavorites())
    }
  }, [dispatch])

  function handleLogout() {
    clearAuth()
    dispatch(resetCart())
    navigate('/login')
  }

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `font-sans text-[13px] text-ink tracking-[0.1em] pb-[2px] border-b ${
      isActive ? 'border-ink' : 'border-transparent'
    } hover:opacity-65 transition-opacity`

  return (
    <div className="min-h-screen bg-cream">
      {/* Announcement strip */}
      <div className="bg-ink text-paper text-[11px] tracking-[0.18em] text-center py-[7px] uppercase">
        ふだん便 ・ 滿 NT$3,000 免代運費 ・ 日本直送 7–10 工作日
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-cream/90 backdrop-blur-md border-b border-bone">
        <div className="max-w-[1280px] mx-auto px-16 h-[72px] flex items-center justify-between gap-8">
          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-[10px] shrink-0">
            <div className="w-9 h-9 bg-shu text-paper flex items-center justify-center font-display text-[22px] font-medium shrink-0">
              日
            </div>
            <span className="font-display text-[20px] font-medium tracking-[-0.01em] text-ink">
              代購
            </span>
          </NavLink>

          <div className="flex-1" />

          {/* Nav */}
          <nav className="flex items-center gap-7">
            <NavLink to="/" end className={navLinkClass}>
              商品列表
            </NavLink>
            <NavLink to="/my-orders" className={navLinkClass}>
              我的訂單
            </NavLink>
            <NavLink to="/favorites" className={navLinkClass}>
              我的收藏
            </NavLink>

            <NavLink
              to="/cart"
              className={({ isActive }) =>
                `relative flex items-center gap-[6px] font-sans text-[13px] text-ink tracking-[0.1em] pb-[2px] border-b ${
                  isActive ? 'border-ink' : 'border-transparent'
                }`
              }
            >
              購物車
              {cartItemCount > 0 && (
                <span
                  aria-label={`購物車項目數 ${cartItemCount}`}
                  className="inline-flex items-center justify-center w-[18px] h-[18px] rounded-full bg-shu text-paper font-mono text-[11px] shrink-0"
                >
                  {cartItemCount}
                </span>
              )}
            </NavLink>

            <span className="font-mono text-[11px] text-ink-3">{countdown}</span>

            <button
              onClick={handleLogout}
              className="font-sans text-[13px] text-ink-3 tracking-[0.1em] hover:text-shu transition-colors"
            >
              登出
            </button>
          </nav>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-[1280px] mx-auto px-16 pt-12 pb-24">
        <Outlet />
      </main>
    </div>
  )
}
