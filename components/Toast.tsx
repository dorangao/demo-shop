'use client'

import { useEffect, useState, useCallback } from 'react'
import styles from './Toast.module.css'

interface ToastMessage {
  id: number
  message: string
  type: 'success' | 'error'
}

// Module-level state for toast messages
let toastId = 0
const listeners = new Set<(toasts: ToastMessage[]) => void>()
let toasts: ToastMessage[] = []

function notifyListeners() {
  listeners.forEach((listener) => listener([...toasts]))
}

// Toast API - can be called from anywhere (Vercel best practice: js-cache-function-results pattern)
export const Toast = {
  show(message: string, type: 'success' | 'error' = 'success') {
    const id = ++toastId
    toasts = [...toasts, { id, message, type }]
    notifyListeners()

    // Auto-dismiss after 3 seconds
    setTimeout(() => {
      toasts = toasts.filter((t) => t.id !== id)
      notifyListeners()
    }, 3000)
  },
}

// Toast container component
export function ToastContainer() {
  const [messages, setMessages] = useState<ToastMessage[]>([])

  useEffect(() => {
    listeners.add(setMessages)
    return () => {
      listeners.delete(setMessages)
    }
  }, [])

  const dismiss = useCallback((id: number) => {
    toasts = toasts.filter((t) => t.id !== id)
    notifyListeners()
  }, [])

  if (messages.length === 0) return null

  return (
    // aria-live for screen reader announcements (Web Interface Guideline: aria-live)
    <div
      className={styles.container}
      role="region"
      aria-label="Notifications"
      aria-live="polite"
    >
      {messages.map((toast) => (
        <div
          key={toast.id}
          className={`${styles.toast} ${styles[toast.type]}`}
          role="alert"
        >
          <span>{toast.message}</span>
          <button
            type="button"
            onClick={() => dismiss(toast.id)}
            className={styles.dismiss}
            aria-label="Dismiss notification"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  )
}
