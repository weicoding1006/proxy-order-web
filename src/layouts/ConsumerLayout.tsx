import { useEffect } from 'react'
import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useTokenCountdown } from '../hooks/useTokenCountdown'
import { clearAuth, getToken } from '../utils/auth'
import type { AppDispatch } from '../store'
import { loadCart, selectCartItemCount, resetCart } from '../store/slices/cartSlice'

export default function ConsumerLayout() {
  const countdown = useTokenCountdown()
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const cartItemCount = useSelector(selectCartItemCount)

  useEffect(() => {
    if (getToken()) {
      dispatch(loadCart())
    }
  }, [dispatch])

  function handleLogout() {
    clearAuth()
    dispatch(resetCart())
    navigate('/login')
  }

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `text-sm px-3 py-1 rounded-md transition-colors ${
      isActive
        ? 'bg-blue-600 text-white'
        : 'text-gray-600 hover:text-gray-900'
    }`

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <span className="font-bold text-gray-800">代購平台</span>
          <nav className="flex items-center gap-4">
            <NavLink to="/" end className={linkClass}>
              商品列表
            </NavLink>
            <NavLink to="/my-orders" className={linkClass}>
              我的訂單
            </NavLink>
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                `relative text-sm px-3 py-1 rounded-md transition-colors ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`
              }
            >
              購物車
              {cartItemCount > 0 && (
                <span
                  aria-label={`購物車項目數 ${cartItemCount}`}
                  className="absolute -top-1 -right-2 min-w-[18px] h-[18px] px-1 rounded-full bg-red-500 text-white text-[10px] font-semibold flex items-center justify-center"
                >
                  {cartItemCount}
                </span>
              )}
            </NavLink>
            <span className="font-mono text-xs text-yellow-600">{countdown}</span>
            <button
              onClick={handleLogout}
              className="text-sm px-3 py-1 rounded-md text-gray-600 hover:bg-red-100 hover:text-red-700 transition-colors"
            >
              🚪 登出
            </button>
          </nav>
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-4 py-6">
        <Outlet />
      </main>
    </div>
  )
}
