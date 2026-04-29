import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { clearAuth, getRemainingSeconds } from '../utils/auth'

function formatSeconds(seconds: number): string {
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = seconds % 60
  return [h, m, s].map((v) => String(v).padStart(2, '0')).join(':')
}

export function useTokenCountdown(): string {
  const navigate = useNavigate()
  const [remaining, setRemaining] = useState(() => getRemainingSeconds())

  useEffect(() => {
    const id = setInterval(() => {
      const secs = getRemainingSeconds()
      setRemaining(secs)
      if (secs <= 0) {
        clearInterval(id)
        clearAuth()
        navigate('/login')
      }
    }, 1000)
    return () => clearInterval(id)
  }, [navigate])

  return formatSeconds(remaining)
}
