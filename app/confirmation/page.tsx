import { Header } from '@/components/Header'
import { ConfirmationContent } from './confirmation-content'
import { ToastContainer } from '@/components/Toast'
import styles from './page.module.css'

export const metadata = {
  title: 'Order Confirmed - TechShop',
  description: 'Your order has been placed successfully',
}

export default function ConfirmationPage() {
  return (
    <>
      <Header />
      <main id="main-content" className={styles.main}>
        <ConfirmationContent />
      </main>
      <ToastContainer />
    </>
  )
}
