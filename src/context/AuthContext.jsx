import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    /* Check if user is logged in from localStorage */
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    /* Mock authentication - in real app, this would call an API */
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        /* Mock credentials check */
        if (email === 'admin@company.com' && password === 'admin123') {
          const userData = {
            id: 1,
            email: email,
            name: 'Admin User',
            role: 'admin'
          }
          setUser(userData)
          localStorage.setItem('user', JSON.stringify(userData))
          resolve(userData)
        } else if (email && password.length >= 6) {
          /* Accept any email with password 6+ chars for demo */
          const userData = {
            id: 2,
            email: email,
            name: email.split('@')[0],
            role: 'user'
          }
          setUser(userData)
          localStorage.setItem('user', JSON.stringify(userData))
          resolve(userData)
        } else {
          reject(new Error('Invalid credentials. Use any email with password 6+ characters.'))
        }
      }, 800) /* Simulate network delay */
    })
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  const value = {
    user,
    login,
    logout,
    loading,
    isAuthenticated: !!user
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

