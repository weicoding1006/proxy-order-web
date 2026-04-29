import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { clearAuth, getToken, isTokenExpired } from '../utils/auth'

export function useAuthGuard(): void {
  const navigate = useNavigate()

  useEffect(() => {
    if (!getToken() || isTokenExpired()) {
      clearAuth()
      navigate('/login')
    }
  }, [navigate])
}
