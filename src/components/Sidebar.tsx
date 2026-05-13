import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useTokenCountdown } from '../hooks/useTokenCountdown'
import { clearAuth } from '../utils/auth'

const navItems = [
  { to: '/admin/products', label: '商品管理', sub: 'Products' },
  { to: '/admin/orders', label: '訂單管理', sub: 'Orders' },
]

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const navigate = useNavigate()
  const countdown = useTokenCountdown()

  function handleLogout() {
    clearAuth()
    navigate('/login')
  }

  return (
    <aside
      className={`${collapsed ? 'w-14' : 'w-52'} shrink-0 min-h-screen flex flex-col bg-paper border-r border-bone text-ink transition-[width] duration-200 ease-out`}
    >
      {/* Logo + toggle */}
      <div
        className={`flex items-center gap-2 border-b border-bone ${
          collapsed ? 'justify-center py-[14px]' : 'justify-between px-3 py-[14px]'
        }`}
      >
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 bg-shu text-paper flex items-center justify-center font-display text-[22px] font-medium shrink-0">
            日
          </div>
          {!collapsed && (
            <span className="font-display text-[18px] font-medium tracking-[-0.01em] text-ink whitespace-nowrap">
              日和代購
            </span>
          )}
        </div>
        {!collapsed && (
          <button
            onClick={() => setCollapsed(true)}
            aria-label="收合選單"
            className="text-ink-3 hover:text-ink text-xs p-1 transition-colors"
          >
            ◀
          </button>
        )}
      </div>

      {collapsed && (
        <button
          onClick={() => setCollapsed(false)}
          aria-label="展開選單"
          className="text-ink-3 hover:text-ink text-xs py-2 border-b border-bone transition-colors"
        >
          ▶
        </button>
      )}

      {/* Countdown */}
      {!collapsed && (
        <div className="px-4 py-3 border-b border-bone">
          <p className="text-[10px] text-ink-3 tracking-[0.16em] uppercase">登入剩餘時間</p>
          <p className="mt-1 font-mono text-[13px] text-ink-2">{countdown}</p>
        </div>
      )}

      {/* Nav */}
      <nav className="flex-1 py-3">
        {navItems.map(({ to, label, sub }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/admin/products'}
            className={({ isActive }) =>
              `flex items-center gap-[10px] py-[10px] font-sans text-[13px] tracking-[0.06em] border-l-2 transition-colors ${
                collapsed ? 'justify-center px-0' : 'px-[14px]'
              } ${
                isActive
                  ? 'text-ink font-medium border-shu'
                  : 'text-ink-2 border-transparent hover:text-ink'
              }`
            }
          >
            {collapsed ? (
              <span className="font-display text-sm">{label.charAt(0)}</span>
            ) : (
              <>
                <span className="font-display text-sm">{label}</span>
                <span className="ml-auto text-[10px] text-ink-3 tracking-[0.18em] uppercase">{sub}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-3 border-t border-bone">
        <button
          onClick={handleLogout}
          className={`w-full py-[6px] px-1 font-sans text-[13px] text-ink-2 hover:text-shu tracking-[0.08em] transition-colors flex items-center ${
            collapsed ? 'justify-center' : 'justify-start'
          }`}
        >
          {collapsed ? '↪' : '登出'}
        </button>
      </div>
    </aside>
  )
}
