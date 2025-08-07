"use client"

import type React from "react"
import { CartProvider as CartContextProvider } from "@/hooks/useCart"
import { WishlistProvider } from "@/hooks/useWishlist"

export function CartProvider({ children }: { children: React.ReactNode }) {
  return (
    <CartContextProvider>
      <WishlistProvider>{children}</WishlistProvider>
    </CartContextProvider>
  )
}
