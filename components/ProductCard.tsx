'use client'

import { memo, useCallback } from 'react'
import { useCartStore, type Product } from '@/lib/store'
import { formatCurrency } from '@/lib/utils'
import { Toast } from './Toast'
import styles from './ProductCard.module.css'

interface ProductCardProps {
  product: Product
}

// Memoized component to prevent unnecessary re-renders (Vercel best practice: rerender-memo)
export const ProductCard = memo(function ProductCard({
  product,
}: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem)

  // Stable callback reference (Vercel best practice: rerender-functional-setstate)
  const handleAddToCart = useCallback(() => {
    addItem(product)
    Toast.show('Added to cart!')
  }, [addItem, product])

  return (
    <article className={styles.card} data-testid="product-card">
      <div className={styles.image} aria-hidden="true">
        {product.image}
      </div>
      <div className={styles.info}>
        <h3 className={styles.name} data-testid="product-name">
          {product.name}
        </h3>
        <p className={styles.description}>{product.description}</p>
        <div className={styles.footer}>
          <span
            className={`${styles.price} tabular-nums`}
            data-testid="product-price"
          >
            {formatCurrency(product.price)}
          </span>
          <button
            type="button"
            className={styles.addBtn}
            onClick={handleAddToCart}
            data-testid="add-to-cart-btn"
            aria-label={`Add ${product.name} to cart`}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </article>
  )
})
