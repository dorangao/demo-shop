// Product type and data - server-compatible (no 'use client')

export interface Product {
  id: number
  name: string
  price: number
  image: string
  description: string
}

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
