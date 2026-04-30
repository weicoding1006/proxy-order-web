import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { useTokenCountdown } from '../hooks/useTokenCountdown'
import { clearAuth } from '../utils/auth'

export default function ConsumerLayout() {
  const countdown = useTokenCountdown()
  const navigate = useNavigate()

  function handleLogout() {
    clearAuth()
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <span className="font-bold text-gray-800">代購平台</span>
          <nav className="flex items-center gap-4">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `text-sm px-3 py-1 rounded-md transition-colors ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`
              }
            >
              商品列表
            </NavLink>
            <NavLink
              to="/my-orders"
              className={({ isActive }) =>
                `text-sm px-3 py-1 rounded-md transition-colors ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`
              }
            >
              我的訂單
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
