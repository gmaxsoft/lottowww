import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const orderId = searchParams.get('orderId')
  const paymentId = searchParams.get('paymentId')
  const payerId = searchParams.get('PayerID')

  if (!orderId || !paymentId || !payerId) {
    return NextResponse.redirect(new URL('/dashboard?error=payment_failed', request.url))
  }

  try {
    // Zaktualizuj status zamówienia na "paid"
    await prisma.order.update({
      where: { id: parseInt(orderId) },
      data: {
        status: 'paid',
        paymentId: paymentId
      }
    })

    return NextResponse.redirect(new URL('/dashboard?success=payment_completed', request.url))
  } catch (error) {
    console.error('PayPal success handling error:', error)
    return NextResponse.redirect(new URL('/dashboard?error=payment_error', request.url))
  }
}