import { NextResponse } from 'next/server'
import { products } from '@/lib/store'
import { apiLogger } from '@/lib/logger'

interface RouteParams {
  params: Promise<{ id: string }>
}

export async function GET(request: Request, { params }: RouteParams) {
  const { id } = await params
  const productId = parseInt(id, 10)
  
  apiLogger.info({ productId }, 'Fetching product by ID')
  
  const product = products.find((p) => p.id === productId)
  
  if (!product) {
    apiLogger.warn({ productId }, 'Product not found')
    return NextResponse.json(
      { error: 'Product not found' },
      { status: 404 }
    )
  }
  
  return NextResponse.json(product)
}
