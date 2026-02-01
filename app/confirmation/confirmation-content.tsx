'use client'

import Link from 'next/link'
import { useCartStore } from '@/lib/store'
import styles from './confirmation-content.module.css'

export function ConfirmationContent() {
  const lastOrder = useCartStore((state) => state.lastOrder)

  if (!lastOrder) {
    return (
      <div className={styles.empty}>
        <p>No order found. Start shopping to place an order.</p>
        <Link href="/" className={styles.continueBtn}>
          Browse Products
        </Link>
      </div>
    )
  }

  return (
    <div className={styles.confirmation} data-testid="order-confirmation">
      <div className={styles.icon} aria-hidden="true">
        ✅
      </div>
      <h1>Order Confirmed!</h1>
      <p>Thank you for your purchase. Your order has been placed successfully.</p>
      <div className={styles.orderId} data-testid="order-id">
        {lastOrder.orderId}
      </div>
      <p>A confirmation email has been sent to {lastOrder.customer.email}.</p>
      <Link href="/" className={styles.continueBtn}>
        Continue Shopping
      </Link>
    </div>
  )
}
