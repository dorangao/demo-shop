'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCartStore } from '@/lib/store'
import styles from './Header.module.css'

export function Header() {
  const pathname = usePathname()
  const itemCount = useCartStore((state) => state.getItemCount())

  return (
    <header className={styles.header}>
      <div className={styles.content}>
        <Link href="/" className={styles.logo} aria-label="TechShop Home">
          🛒 TechShop
        </Link>
        <nav className={styles.nav} aria-label="Main navigation">
          <Link
            href="/"
            className={`${styles.navLink} ${pathname === '/' ? styles.active : ''}`}
          >
            Products
          </Link>
          <Link
            href="/cart"
            className={`${styles.cartBtn} ${pathname === '/cart' ? styles.active : ''}`}
            aria-label={`Shopping cart with ${itemCount} items`}
          >
            🛒 Cart{' '}
            <span className={styles.cartCount} aria-hidden="true">
              {itemCount}
            </span>
          </Link>
        </nav>
      </div>
    </header>
  )
}
