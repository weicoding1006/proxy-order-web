import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-cream flex flex-col items-center justify-center gap-4 p-6">
      <h1 className="m-0 font-display text-[72px] font-normal text-ink tracking-[-0.02em]">
        404
      </h1>
      <p className="m-0 text-base text-ink-2 tracking-[0.02em]">找不到此頁面</p>
      <Link
        to="/"
        className="mt-3 bg-transparent hover:bg-ink text-ink hover:text-paper border border-ink rounded-[2px] py-[10px] px-6 font-sans text-[13px] tracking-[0.1em] transition-colors"
      >
        回到首頁
      </Link>
    </div>
  )
}
