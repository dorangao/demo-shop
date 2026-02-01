'use client'

import Link from 'next/link'
import { useCartStore } from '@/lib/store'
import { CartItem } from '@/components/CartItem'
import { formatCurrency } from '@/lib/utils'
import styles from './cart-content.module.css'

export function CartContent() {
  const items = useCartStore((state) => state.items)
  const getTotal = useCartStore((state) => state.getTotal)
  const total = getTotal()

  if (items.length === 0) {
    return (
      <div className={styles.empty} data-testid="empty-cart">
        <div className={styles.emptyIcon} aria-hidden="true">
          🛒
        </div>
        <p>Your cart is empty</p>
        <Link href="/" className={styles.browseBtn}>
          Browse Products
        </Link>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.items} data-testid="cart-items">
        {items.map((item) => (
          <CartItem key={item.productId} item={item} />
        ))}
      </div>
      <aside className={styles.summary} data-testid="cart-summary">
        <h2>Order Summary</h2>
        <div className={styles.row}>
          <span>Subtotal</span>
          <span className="tabular-nums" data-testid="subtotal">
            {formatCurrency(total)}
          </span>
        </div>
        <div className={styles.row}>
          <span>Shipping</span>
          <span>Free</span>
        </div>
        <div className={`${styles.row} ${styles.total}`}>
          <span>Total</span>
          <span className="tabular-nums" data-testid="total">
            {formatCurrency(total)}
          </span>
        </div>
        <Link
          href="/checkout"
          className={styles.checkoutBtn}
          data-testid="checkout-btn"
        >
          Proceed to Checkout
        </Link>
      </aside>
    </div>
  )
}
