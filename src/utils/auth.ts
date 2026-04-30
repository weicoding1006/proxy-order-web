const TOKEN_KEY = 'token'
const EXPIRES_AT_KEY = 'expiresAt'
const ROLE_KEY = 'role'

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY)
}

export function getExpiresAt(): string | null {
  return localStorage.getItem(EXPIRES_AT_KEY)
}

export function clearAuth(): void {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(EXPIRES_AT_KEY)
  clearRole()
}

export function getRole(): string | null {
  return localStorage.getItem(ROLE_KEY)
}

export function setRole(role: string): void {
  localStorage.setItem(ROLE_KEY, role)
}

export function clearRole(): void {
  localStorage.removeItem(ROLE_KEY)
}

export function isTokenExpired(): boolean {
  const expiresAt = getExpiresAt()
  if (!expiresAt) return true
  return Date.now() >= new Date(expiresAt).getTime()
}

export function getRemainingSeconds(): number {
  const expiresAt = getExpiresAt()
  if (!expiresAt) return 0
  const remaining = Math.floor((new Date(expiresAt).getTime() - Date.now()) / 1000)
  return Math.max(0, remaining)
}
