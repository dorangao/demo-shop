import { Header } from '@/components/Header'
import { CheckoutForm } from './checkout-form'
import { ToastContainer } from '@/components/Toast'
import styles from './page.module.css'

export const metadata = {
  title: 'Checkout - TechShop',
  description: 'Complete your order',
}

export default function CheckoutPage() {
  return (
    <>
      <Header />
      <main id="main-content" className={styles.main}>
        <h1 className={styles.title}>Checkout</h1>
        <CheckoutForm />
      </main>
      <ToastContainer />
    </>
  )
}
