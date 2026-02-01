'use client'

import { products } from '@/lib/store'
import { ProductCard } from '@/components/ProductCard'
import styles from './products-grid.module.css'

export function ProductsGrid() {
  return (
    <div className={styles.grid} data-testid="products-grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
