import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login, me } from '../api/auth'
import { setRole } from '../utils/auth'

const inputClass =
  'border border-bone rounded-[2px] bg-paper text-ink px-3 py-[10px] text-sm font-sans outline-none focus:outline focus:outline-1 focus:outline-shu focus:outline-offset-2'

const labelClass = 'text-[11px] text-ink-3 tracking-[0.16em] uppercase font-sans font-medium mb-[6px]'

export default function LoginPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const res = await login({ email, password }) as any
      if (res?.token && res?.expiresAt) {
        localStorage.setItem('token', res.token)
        localStorage.setItem('expiresAt', res.expiresAt)
      }
      try {
        const profile = await me()
        const role = profile.roles?.[0] ?? 'user'
        setRole(role)
        navigate(profile.roles?.includes('Admin') ? '/admin/products' : '/')
      } catch {
        navigate('/')
      }
    } catch (err: any) {
      setError(err?.message ?? '登入失敗，請確認帳號密碼')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center p-6">
      <div className="bg-paper border border-bone rounded-[4px] p-10 w-full max-w-[380px]">
        {/* Logo */}
        <div className="flex flex-col items-center gap-2 mb-6">
          <div className="w-12 h-12 bg-shu text-paper flex items-center justify-center font-display text-[30px] font-medium">
            日
          </div>
          <span className="font-display text-lg text-ink tracking-[0.04em]">日和代購</span>
        </div>

        <h1 className="text-center font-display text-[32px] font-normal text-ink tracking-[-0.01em] m-0 mb-7">
          登入
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-[18px]">
          <div className="flex flex-col">
            <label className={labelClass}>Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputClass}
              placeholder="you@example.com"
            />
          </div>

          <div className="flex flex-col">
            <label className={labelClass}>密碼</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={inputClass}
              placeholder="••••••••"
            />
          </div>

          {error && <p className="m-0 text-shu text-[13px]">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="bg-shu hover:bg-shu-dark text-paper rounded-[2px] py-3 px-8 font-sans text-[13px] tracking-[0.1em] transition-colors disabled:bg-bone disabled:text-ink-3 disabled:cursor-not-allowed disabled:hover:bg-bone mt-1"
          >
            {loading ? '登入中...' : '登入'}
          </button>
        </form>

        <p className="mt-6 text-center text-[13px] text-ink-3 m-0">
          還沒有帳號？{' '}
          <Link
            to="/register"
            className="text-ink-2 hover:text-shu border-b border-current pb-px transition-colors"
          >
            前往註冊
          </Link>
        </p>
      </div>
    </div>
  )
}
