import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { register } from '../api/auth'

const inputClass =
  'w-full border border-bone rounded-[2px] bg-paper text-ink px-3 py-[10px] text-sm font-sans outline-none focus:outline focus:outline-1 focus:outline-shu focus:outline-offset-2 box-border'

const labelClass = 'text-[11px] text-ink-3 tracking-[0.16em] uppercase font-sans font-medium mb-[6px]'

export default function RegisterPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '', firstName: '', lastName: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const set = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [field]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      await register(form)
      navigate('/login')
    } catch (err: any) {
      setError(err?.message ?? '註冊失敗，請稍後再試')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center p-6">
      <div className="bg-paper border border-bone rounded-[4px] p-10 w-full max-w-[380px]">
        <div className="flex flex-col items-center gap-2 mb-6">
          <div className="w-12 h-12 bg-shu text-paper flex items-center justify-center font-display text-[30px] font-medium">
            日
          </div>
          <span className="font-display text-lg text-ink tracking-[0.04em]">日和代購</span>
        </div>

        <h1 className="text-center font-display text-[32px] font-normal text-ink tracking-[-0.01em] m-0 mb-7">
          註冊
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex gap-3">
            <div className="flex-1 flex flex-col">
              <label className={labelClass}>名字</label>
              <input
                type="text"
                required
                value={form.firstName}
                onChange={set('firstName')}
                className={inputClass}
                placeholder="小明"
              />
            </div>
            <div className="flex-1 flex flex-col">
              <label className={labelClass}>姓氏</label>
              <input
                type="text"
                required
                value={form.lastName}
                onChange={set('lastName')}
                className={inputClass}
                placeholder="王"
              />
            </div>
          </div>

          <div className="flex flex-col">
            <label className={labelClass}>Email</label>
            <input
              type="email"
              required
              value={form.email}
              onChange={set('email')}
              className={inputClass}
              placeholder="you@example.com"
            />
          </div>

          <div className="flex flex-col">
            <label className={labelClass}>密碼</label>
            <input
              type="password"
              required
              value={form.password}
              onChange={set('password')}
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
            {loading ? '註冊中...' : '註冊'}
          </button>
        </form>

        <p className="mt-6 text-center text-[13px] text-ink-3 m-0">
          已有帳號？{' '}
          <Link
            to="/login"
            className="text-ink-2 hover:text-shu border-b border-current pb-px transition-colors"
          >
            前往登入
          </Link>
        </p>
      </div>
    </div>
  )
}
