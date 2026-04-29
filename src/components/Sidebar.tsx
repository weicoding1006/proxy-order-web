import { useState } from 'react'
import { NavLink } from 'react-router-dom'

const navItems = [
  { to: '/', icon: '🏠', label: '首頁' },
  { to: '/orders', icon: '📋', label: '訂單管理' },
]

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <aside
      className={`flex flex-col bg-gray-900 text-white transition-all duration-200 ${
        collapsed ? 'w-14' : 'w-52'
      } min-h-screen shrink-0`}
    >
      <div className="flex items-center justify-between px-3 py-4 border-b border-gray-700">
        {!collapsed && (
          <span className="text-sm font-semibold truncate">代購平台</span>
        )}
        <button
          onClick={() => setCollapsed((c) => !c)}
          className="ml-auto p-1 rounded hover:bg-gray-700 transition-colors"
          aria-label={collapsed ? '展開選單' : '收合選單'}
        >
          {collapsed ? '▶' : '◀'}
        </button>
      </div>

      <nav className="flex flex-col gap-1 p-2 flex-1">
        {navItems.map(({ to, icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-2 py-2 rounded-md text-sm transition-colors ${
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`
            }
          >
            <span className="text-base shrink-0">{icon}</span>
            {!collapsed && <span className="truncate">{label}</span>}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}
