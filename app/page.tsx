import { Header } from '@/components/Header'
import { ProductsGrid } from './products-grid'
import { ToastContainer } from '@/components/Toast'
import styles from './page.module.css'

// Static page metadata
export const metadata = {
  title: 'Products - TechShop',
  description: 'Browse our selection of tech products',
}

export default function HomePage() {
  return (
    <>
      <Header />
      <main id="main-content" className={styles.main}>
        <h1 className={styles.title}>Our Products</h1>
        <ProductsGrid />
      </main>
      <ToastContainer />
    </>
  )
}
