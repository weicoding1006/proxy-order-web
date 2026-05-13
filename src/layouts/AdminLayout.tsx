import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import { useAuthGuard } from '../hooks/useAuthGuard'

export default function AdminLayout() {
  useAuthGuard()
  return (
    <div className="flex min-h-screen bg-cream">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  )
}
