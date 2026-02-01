import { NextResponse } from 'next/server'
import { after } from 'next/server'
import { checkoutLogger } from '@/lib/logger'
import {
  validateEmail,
  validateName,
  validateAddress,
  generateOrderId,
} from '@/lib/utils'

interface CheckoutRequest {
  name: string
  email: string
  address: string
  items: Array<{
    productId: number
    name: string
    price: number
    quantity: number
  }>
}

export async function POST(request: Request) {
  const data: CheckoutRequest = await request.json()
  const { name, email, address, items } = data

  checkoutLogger.info({ email }, 'Processing checkout')

  // Validation
  const errors: string[] = []

  if (!validateName(name)) {
    errors.push('Name is required (at least 2 characters)')
  }
  if (!validateEmail(email)) {
    errors.push('Valid email is required')
  }
  if (!validateAddress(address)) {
    errors.push('Address is required (at least 5 characters)')
  }
  if (!items || items.length === 0) {
    errors.push('Cart is empty')
  }

  if (errors.length > 0) {
    checkoutLogger.warn({ errors }, 'Checkout validation failed')
    return NextResponse.json({ success: false, errors }, { status: 400 })
  }

  // Calculate total
  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  // Create order
  const order = {
    orderId: generateOrderId(),
    items: [...items],
    total: total.toFixed(2),
    customer: { name, email, address },
    createdAt: new Date().toISOString(),
  }

  // Log order after response is sent (Vercel best practice: server-after-nonblocking)
  after(() => {
    checkoutLogger.info(
      {
        orderId: order.orderId,
        total: order.total,
        itemCount: items.length,
        email,
      },
      'Order completed successfully'
    )
  })

  return NextResponse.json({ success: true, order })
}
