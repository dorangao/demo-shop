'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// Re-export Product type and products from server-compatible file
export type { Product } from './products'
export { products } from './products'

export interface CartItem {
  productId: number
  name: string
  price: number
  quantity: number
}

export interface Order {
  orderId: string
  items: CartItem[]
  total: string
  customer: {
    name: string
    email: string
    address: string
  }
  createdAt: string
}

import type { Product } from './products'

interface CartState {
  items: CartItem[]
  lastOrder: Order | null
  addItem: (product: Product, quantity?: number) => void
  removeItem: (productId: number) => void
  updateQuantity: (productId: number, delta: number) => void
  clearCart: () => void
  setLastOrder: (order: Order) => void
  getTotal: () => number
  getItemCount: () => number
}

// Using functional setState for stable callbacks (Vercel best practice: rerender-functional-setstate)
export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      lastOrder: null,

      addItem: (product, quantity = 1) =>
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.productId === product.id
          )
          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.productId === product.id
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
            }
          }
          return {
            items: [
              ...state.items,
              {
                productId: product.id,
                name: product.name,
                price: product.price,
                quantity,
              },
            ],
          }
        }),

      removeItem: (productId) =>
        set((state) => ({
          items: state.items.filter((item) => item.productId !== productId),
        })),

      updateQuantity: (productId, delta) =>
        set((state) => {
          const item = state.items.find((i) => i.productId === productId)
          if (!item) return state

          if (item.quantity + delta <= 0) {
            return {
              items: state.items.filter((i) => i.productId !== productId),
            }
          }

          return {
            items: state.items.map((i) =>
              i.productId === productId
                ? { ...i, quantity: i.quantity + delta }
                : i
            ),
          }
        }),

      clearCart: () => set({ items: [] }),

      setLastOrder: (order) => set({ lastOrder: order }),

      // Derived state computed during render (Vercel best practice: rerender-derived-state-no-effect)
      getTotal: () => {
        const { items } = get()
        return items.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        )
      },

      getItemCount: () => {
        const { items } = get()
        return items.reduce((sum, item) => sum + item.quantity, 0)
      },
    }),
    {
      name: 'techshop-cart-v1', // Versioned localStorage key (Vercel best practice: client-localstorage-schema)
      partialize: (state) => ({ items: state.items }), // Only persist cart items
    }
  )
)
