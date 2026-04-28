import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h1 className="text-6xl font-bold text-gray-300">404</h1>
      <p className="text-gray-500">找不到此頁面</p>
      <Link to="/" className="text-purple-600 hover:underline">
        回到首頁
      </Link>
    </div>
  )
}
