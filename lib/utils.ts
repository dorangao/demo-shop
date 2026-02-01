// Format currency with Intl.NumberFormat (Web Interface Guideline: use Intl.* not hardcoded formats)
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount)
}

// Generate unique order ID
export function generateOrderId(): string {
  return `ORD-${Date.now()}`
}

// Validation helpers
export function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export function validateName(name: string): boolean {
  return name.trim().length >= 2
}

export function validateAddress(address: string): boolean {
  return address.trim().length >= 5
}
