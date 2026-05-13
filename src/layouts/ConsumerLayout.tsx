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

  return (
    <div style={{ minHeight: '100vh', background: 'var(--cream)' }}>
      {/* Announcement strip */}
      <div style={{
        background: 'var(--ink)',
        color: 'var(--paper)',
        fontSize: 11,
        letterSpacing: '0.18em',
        textAlign: 'center',
        padding: '7px 0',
        textTransform: 'uppercase',
      }}>
        ふだん便 ・ 滿 NT$3,000 免代運費 ・ 日本直送 7–10 工作日
      </div>

      {/* Header */}
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: 'rgba(246, 243, 236, 0.92)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        borderBottom: '1px solid var(--bone)',
      }}>
        <div style={{
          maxWidth: 'var(--container)',
          margin: '0 auto',
          padding: '0 var(--side-pad)',
          height: 'var(--header-h)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 32,
        }}>
          {/* Logo */}
          <NavLink to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', flexShrink: 0 }}>
            <div style={{
              width: 36,
              height: 36,
              background: 'var(--shu)',
              color: 'var(--paper)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'var(--font-display)',
              fontSize: 22,
              fontWeight: 500,
              flexShrink: 0,
            }}>
              日
            </div>
            <span style={{
              fontFamily: 'var(--font-display)',
              fontSize: 20,
              fontWeight: 500,
              letterSpacing: '-0.01em',
              color: 'var(--ink)',
            }}>
              日和代購
            </span>
          </NavLink>

          <div style={{ flex: 1 }} />

          {/* Nav links */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
            <NavLink
              to="/"
              end
              style={({ isActive }) => ({
                fontFamily: 'var(--font-sans)',
                fontSize: 13,
                color: 'var(--ink)',
                letterSpacing: '0.1em',
                textDecoration: 'none',
                paddingBottom: 2,
                borderBottom: isActive ? '1px solid var(--ink)' : '1px solid transparent',
                transition: 'opacity var(--t-fast) var(--ease-out)',
              })}
            >
              商品列表
            </NavLink>
            <NavLink
              to="/my-orders"
              style={({ isActive }) => ({
                fontFamily: 'var(--font-sans)',
                fontSize: 13,
                color: 'var(--ink)',
                letterSpacing: '0.1em',
                textDecoration: 'none',
                paddingBottom: 2,
                borderBottom: isActive ? '1px solid var(--ink)' : '1px solid transparent',
                transition: 'opacity var(--t-fast) var(--ease-out)',
              })}
            >
              我的訂單
            </NavLink>

            {/* Cart */}
            <NavLink
              to="/cart"
              style={({ isActive }) => ({
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                fontFamily: 'var(--font-sans)',
                fontSize: 13,
                color: 'var(--ink)',
                letterSpacing: '0.1em',
                textDecoration: 'none',
                paddingBottom: 2,
                borderBottom: isActive ? '1px solid var(--ink)' : '1px solid transparent',
                gap: 6,
              })}
            >
              購物車
              {cartItemCount > 0 && (
                <span
                  aria-label={`購物車項目數 ${cartItemCount}`}
                  style={{
                    width: 18,
                    height: 18,
                    borderRadius: '50%',
                    background: 'var(--shu)',
                    color: 'var(--paper)',
                    fontSize: 11,
                    fontFamily: 'var(--font-mono)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  {cartItemCount}
                </span>
              )}
            </NavLink>

            {/* Token countdown */}
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-3)' }}>
              {countdown}
            </span>

            {/* Logout */}
            <button
              onClick={handleLogout}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'var(--font-sans)',
                fontSize: 13,
                color: 'var(--ink-3)',
                letterSpacing: '0.1em',
                padding: 0,
                transition: 'color var(--t-fast) var(--ease-out)',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--shu)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--ink-3)')}
            >
              登出
            </button>
          </nav>
        </div>
      </header>

      {/* Main content */}
      <main style={{
        maxWidth: 'var(--container)',
        margin: '0 auto',
        padding: '0 var(--side-pad)',
        paddingTop: 48,
        paddingBottom: 96,
      }}>
        <Outlet />
      </main>
    </div>
  )
}
