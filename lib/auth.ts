import { cookies } from "next/headers"

export async function checkAdminAuth(): Promise<boolean> {
  try {
    const cookieStore = await cookies()
    const adminToken = cookieStore.get("admin-token")

    console.log("[SERVER] Checking admin auth, token:", adminToken?.value)
    console.log(
      "[SERVER] All cookies:",
      cookieStore.getAll().map((c) => `${c.name}=${c.value}`),
    )

    if (!adminToken || adminToken.value !== "admin-authenticated") {
      console.log("[SERVER] No valid admin token found")
      return false
    }

    console.log("[SERVER] Valid admin token found")
    return true
  } catch (error) {
    console.error("[SERVER] Error checking admin auth:", error)
    return false
  }
}

export async function checkUserAuth(): Promise<{ user: any } | null> {
  try {
    const cookieStore = await cookies()
    const userToken = cookieStore.get("user-token")

    if (!userToken) {
      return null
    }

    // In a real app, verify the JWT token and return user data
    return {
      user: {
        id: "1",
        name: "Usuario Demo",
        email: "demo@example.com",
        avatar: "/placeholder.svg?height=40&width=40",
      },
    }
  } catch (error) {
    console.error("[SERVER] Error checking user auth:", error)
    return null
  }
}
