import { NextResponse } from 'next/server'
import { products } from '@/lib/products'
import { apiLogger } from '@/lib/logger'

export async function GET() {
  apiLogger.info({ count: products.length }, 'Fetching all products')
  
  return NextResponse.json(products)
}
