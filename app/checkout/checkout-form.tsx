'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useCartStore } from '@/lib/store'
import { Toast } from '@/components/Toast'
import styles from './checkout-form.module.css'

interface FormErrors {
  name?: string
  email?: string
  address?: string
}

export function CheckoutForm() {
  const router = useRouter()
  const items = useCartStore((state) => state.items)
  const clearCart = useCartStore((state) => state.clearCart)
  const setLastOrder = useCartStore((state) => state.setLastOrder)
  
  const [errors, setErrors] = useState<FormErrors>({})
  // Using useTransition for loading state (Vercel best practice: rendering-usetransition-loading)
  const [isPending, startTransition] = useTransition()

  if (items.length === 0) {
    return (
      <div className={styles.empty}>
        <p>Your cart is empty. Add some items before checking out.</p>
        <Link href="/" className={styles.browseBtn}>
          Browse Products
        </Link>
      </div>
    )
  }

  async function handleSubmit(formData: FormData) {
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const address = formData.get('address') as string

    // Clear previous errors
    setErrors({})

    startTransition(async () => {
      try {
        const response = await fetch('/api/checkout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name,
            email,
            address,
            items,
          }),
        })

        const result = await response.json()

        if (result.success) {
          setLastOrder(result.order)
          clearCart()
          router.push('/confirmation')
        } else {
          // Map API errors to form fields
          const newErrors: FormErrors = {}
          result.errors?.forEach((error: string) => {
            const lowerError = error.toLowerCase()
            if (lowerError.includes('name')) newErrors.name = error
            if (lowerError.includes('email')) newErrors.email = error
            if (lowerError.includes('address')) newErrors.address = error
          })
          setErrors(newErrors)
          Toast.show('Please fix the errors', 'error')
        }
      } catch {
        Toast.show('An error occurred. Please try again.', 'error')
      }
    })
  }

  return (
    <form
      action={handleSubmit}
      className={styles.form}
      data-testid="checkout-form"
    >
      <div className={styles.formGroup}>
        <label htmlFor="name">Full Name *</label>
        <input
          type="text"
          id="name"
          name="name"
          required
          minLength={2}
          autoComplete="name"
          className={errors.name ? styles.inputError : ''}
          data-testid="name-input"
          aria-describedby={errors.name ? 'name-error' : undefined}
        />
        {errors.name && (
          <div id="name-error" className={styles.errorMessage} role="alert">
            {errors.name}
          </div>
        )}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="email">Email Address *</label>
        <input
          type="email"
          id="email"
          name="email"
          required
          autoComplete="email"
          spellCheck={false}
          className={errors.email ? styles.inputError : ''}
          data-testid="email-input"
          aria-describedby={errors.email ? 'email-error' : undefined}
        />
        {errors.email && (
          <div id="email-error" className={styles.errorMessage} role="alert">
            {errors.email}
          </div>
        )}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="address">Shipping Address *</label>
        <textarea
          id="address"
          name="address"
          rows={3}
          required
          minLength={5}
          autoComplete="street-address"
          placeholder="Enter your full shipping address…"
          className={errors.address ? styles.inputError : ''}
          data-testid="address-input"
          aria-describedby={errors.address ? 'address-error' : undefined}
        />
        {errors.address && (
          <div id="address-error" className={styles.errorMessage} role="alert">
            {errors.address}
          </div>
        )}
      </div>

      <button
        type="submit"
        className={styles.submitBtn}
        disabled={isPending}
        data-testid="submit-order-btn"
      >
        {isPending ? 'Processing…' : 'Place Order'}
      </button>
    </form>
  )
}
