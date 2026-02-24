import { createContext, useContext, useMemo, useState } from 'react'

// Authentication context – this is where JWT/Firebase based
// authentication from your backend would be wired and shared
// with the rest of the app.
const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const value = useMemo(
    () => ({
      isAuthenticated,
      // In a real setup, login/logout would:
      // - call your backend auth APIs (JWT, Firebase Google Auth, etc.)
      // - persist tokens or session info securely
      // - update this shared auth state for protected views
      login: () => setIsAuthenticated(true),
      logout: () => setIsAuthenticated(false),
    }),
    [isAuthenticated],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return ctx
}

