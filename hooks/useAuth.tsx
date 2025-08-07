"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface User {
  id: string
  name: string
  email: string
  avatar: string
  role: "user" | "admin"
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  register: (name: string, email: string, password: string) => Promise<boolean>
  loading: boolean
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for existing session
    const token = localStorage.getItem("auth-token")
    const userData = localStorage.getItem("user-data")

    console.log("[CLIENT] Checking existing session:", { token: !!token, userData: !!userData })

    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData)
        setUser(parsedUser)
        console.log("[CLIENT] User loaded from localStorage:", parsedUser)
      } catch (error) {
        console.error("[CLIENT] Error parsing user data:", error)
        localStorage.removeItem("auth-token")
        localStorage.removeItem("user-data")
      }
    }
    setLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      console.log("[CLIENT] Login attempt:", { email, password })

      // Check admin credentials
      if (email === "admin@alejandrocaraballo.com" && password === "admin123") {
        const adminUser: User = {
          id: "admin",
          name: "Administrador",
          email: "admin@alejandrocaraballo.com",
          avatar: "/placeholder.svg?height=40&width=40",
          role: "admin",
        }

        // Set user state
        setUser(adminUser)

        // Set localStorage
        localStorage.setItem("auth-token", "admin-token")
        localStorage.setItem("user-data", JSON.stringify(adminUser))

        // Set cookie with proper attributes
        const cookieValue = "admin-token=admin-authenticated; path=/; max-age=86400; SameSite=Lax; Secure=false"
        document.cookie = cookieValue

        console.log("[CLIENT] Cookie set:", cookieValue)
        console.log("[CLIENT] All cookies after set:", document.cookie)
        console.log("[CLIENT] Admin login successful")

        return true
      }
      // Check demo user credentials
      else if (email === "demo@example.com" && password === "demo123") {
        const demoUser: User = {
          id: "1",
          name: "Usuario Demo",
          email: "demo@example.com",
          avatar: "/placeholder.svg?height=40&width=40",
          role: "user",
        }

        setUser(demoUser)
        localStorage.setItem("auth-token", "user-token")
        localStorage.setItem("user-data", JSON.stringify(demoUser))

        console.log("[CLIENT] Demo user login successful")
        return true
      }

      console.log("[CLIENT] Invalid credentials")
      return false
    } catch (error) {
      console.error("[CLIENT] Login error:", error)
      return false
    }
  }

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      // In a real app, make API call to your backend
      const newUser: User = {
        id: Date.now().toString(),
        name,
        email,
        avatar: "/placeholder.svg?height=40&width=40",
        role: "user",
      }
      setUser(newUser)
      localStorage.setItem("auth-token", "user-token")
      localStorage.setItem("user-data", JSON.stringify(newUser))
      return true
    } catch (error) {
      console.error("[CLIENT] Register error:", error)
      return false
    }
  }

  const logout = () => {
    console.log("[CLIENT] Logging out")
    setUser(null)
    localStorage.removeItem("auth-token")
    localStorage.removeItem("user-data")
    document.cookie = "admin-token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT"
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        register,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
