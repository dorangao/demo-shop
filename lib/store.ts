'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// Types
export interface Product {
  id: number
  name: string
  price: number
  image: string
  description: string
}

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

// Products data (static, could be fetched from API in real app)
export const products: Product[] = [
  {
    id: 1,
    name: 'Wireless Headphones',
    price: 79.99,
    image: '🎧',
    description: 'Premium wireless headphones with noise cancellation',
  },
  {
    id: 2,
    name: 'Smart Watch',
    price: 199.99,
    image: '⌚',
    description: 'Feature-rich smartwatch with health tracking',
  },
  {
    id: 3,
    name: 'Laptop Stand',
    price: 49.99,
    image: '💻',
    description: 'Ergonomic aluminum laptop stand',
  },
  {
    id: 4,
    name: 'USB-C Hub',
    price: 39.99,
    image: '🔌',
    description: '7-in-1 USB-C hub with HDMI and card reader',
  },
  {
    id: 5,
    name: 'Mechanical Keyboard',
    price: 129.99,
    image: '⌨️',
    description: 'RGB mechanical keyboard with Cherry MX switches',
  },
  {
    id: 6,
    name: 'Wireless Mouse',
    price: 59.99,
    image: '🖱️',
    description: 'Ergonomic wireless mouse with precision tracking',
  },
]
