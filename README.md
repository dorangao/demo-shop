# TechShop - Next.js E-Commerce Demo

A modern e-commerce demo built with Next.js 15, React 19, and TypeScript. Optimized for Vercel deployment with structured logging and best practices.

## Features

- **Product Catalog** - Browse and search products
- **Shopping Cart** - Add, remove, and update quantities (persisted in localStorage)
- **Checkout Flow** - Form validation with real-time feedback
- **Responsive Design** - Mobile-first dark theme
- **Accessibility** - WCAG compliant with keyboard navigation, ARIA labels, and skip links
- **Structured Logging** - Pino logger with JSON output for Vercel Log Drain

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **UI**: React 19 with CSS Modules
- **State**: Zustand with localStorage persistence
- **Logging**: Pino (JSON in production, pretty in development)
- **Language**: TypeScript 5.7

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/demo-server)

Or deploy via CLI:

```bash
npm i -g vercel
vercel
```

## Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Products page (home)
│   ├── globals.css         # Global styles & CSS variables
│   ├── cart/               # Cart page
│   ├── checkout/           # Checkout page with form
│   ├── confirmation/       # Order confirmation page
│   └── api/
│       ├── products/       # Products API routes
│       └── checkout/       # Checkout API route
├── components/
│   ├── Header.tsx          # Navigation header
│   ├── ProductCard.tsx     # Product display card
│   ├── CartItem.tsx        # Cart item component
│   └── Toast.tsx           # Toast notifications
├── lib/
│   ├── store.ts            # Zustand store (cart state)
│   ├── logger.ts           # Pino logger configuration
│   └── utils.ts            # Utility functions
└── next.config.ts          # Next.js configuration
```

## Best Practices Applied

### Vercel React Best Practices
- **Bundle optimization**: Direct imports, dynamic loading for heavy components
- **Re-render optimization**: Memoized components, functional setState
- **Server performance**: Non-blocking logging with `after()`
- **Transitions**: `useTransition` for loading states

### Web Interface Guidelines
- **Accessibility**: ARIA labels, focus states, skip links, semantic HTML
- **Forms**: Proper autocomplete, input types, inline validation
- **Animation**: Respects `prefers-reduced-motion`
- **Typography**: Proper ellipsis (`…`), `tabular-nums` for prices
- **Touch**: `touch-action: manipulation` for mobile

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `LOG_LEVEL` | Pino log level | `info` |
| `PORT` | Server port (production) | `3000` |

## API Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | List all products |
| GET | `/api/products/:id` | Get product by ID |
| POST | `/api/checkout` | Process checkout |

## License

MIT
