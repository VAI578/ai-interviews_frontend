import { useState } from 'react'
import { AuthContext } from './authContext.js'

const STORAGE_KEY = 'prepwise-user'

function readUser() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : null
  } catch {
    localStorage.removeItem(STORAGE_KEY)
    return null
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(readUser)

  function signIn(email, name) {
    const account = { email, name: name || email.split('@')[0] }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(account))
    setUser(account)
  }

  function updateUser(updates) {
    const account = { ...user, ...updates }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(account))
    setUser(account)
  }

  function signOut() {
    localStorage.removeItem(STORAGE_KEY)
    setUser(null)
  }

  const value = { user, signIn, signOut, updateUser }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
