'use client'

import { memo, useCallback } from 'react'
import { useCartStore, type CartItem as CartItemType, products } from '@/lib/store'
import { formatCurrency } from '@/lib/utils'
import styles from './CartItem.module.css'

interface CartItemProps {
  item: CartItemType
}

// Memoized component (Vercel best practice: rerender-memo)
export const CartItem = memo(function CartItem({ item }: CartItemProps) {
  const updateQuantity = useCartStore((state) => state.updateQuantity)
  const removeItem = useCartStore((state) => state.removeItem)

  // Find product for emoji
  const product = products.find((p) => p.id === item.productId)

  // Stable callbacks (Vercel best practice: rerender-functional-setstate)
  const handleDecrease = useCallback(() => {
    updateQuantity(item.productId, -1)
  }, [updateQuantity, item.productId])

  const handleIncrease = useCallback(() => {
    updateQuantity(item.productId, 1)
  }, [updateQuantity, item.productId])

  const handleRemove = useCallback(() => {
    removeItem(item.productId)
  }, [removeItem, item.productId])

  return (
    <div className={styles.item} data-testid="cart-item">
      <div className={styles.info}>
        <span className={styles.emoji} aria-hidden="true">
          {product?.image || '📦'}
        </span>
        <div>
          <div className={styles.name}>{item.name}</div>
          <div className={styles.price}>
            {formatCurrency(item.price)} × {item.quantity}
          </div>
        </div>
      </div>
      <div className={styles.actions}>
        <div className={styles.quantity}>
          <button
            type="button"
            className={styles.qtyBtn}
            onClick={handleDecrease}
            data-testid="decrease-qty"
            aria-label={`Decrease quantity of ${item.name}`}
          >
            −
          </button>
          <span data-testid="item-quantity" className="tabular-nums">
            {item.quantity}
          </span>
          <button
            type="button"
            className={styles.qtyBtn}
            onClick={handleIncrease}
            data-testid="increase-qty"
            aria-label={`Increase quantity of ${item.name}`}
          >
            +
          </button>
        </div>
        <button
          type="button"
          className={styles.removeBtn}
          onClick={handleRemove}
          data-testid="remove-item-btn"
          aria-label={`Remove ${item.name} from cart`}
        >
          🗑️
        </button>
      </div>
    </div>
  )
})
