import { Header } from '@/components/Header'
import { CartContent } from './cart-content'
import { ToastContainer } from '@/components/Toast'
import styles from './page.module.css'

export const metadata = {
  title: 'Cart - TechShop',
  description: 'View your shopping cart',
}

export default function CartPage() {
  return (
    <>
      <Header />
      <main id="main-content" className={styles.main}>
        <h1 className={styles.title}>Shopping Cart</h1>
        <CartContent />
      </main>
      <ToastContainer />
    </>
  )
}
