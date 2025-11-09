import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const orderId = searchParams.get('orderId')
  const trStatus = searchParams.get('tr_status')
  const trId = searchParams.get('tr_id')

  if (!orderId) {
    return NextResponse.redirect(new URL('/dashboard?error=payment_failed', request.url))
  }

  try {
    // Sprawdź status płatności TPay
    if (trStatus === 'TRUE') {
      // Zaktualizuj status zamówienia na "paid"
      await prisma.order.update({
        where: { id: parseInt(orderId) },
        data: {
          status: 'paid',
          paymentId: trId || undefined
        }
      })

      return NextResponse.redirect(new URL('/dashboard?success=payment_completed', request.url))
    } else {
      // Płatność nieudana
      await prisma.order.update({
        where: { id: parseInt(orderId) },
        data: { status: 'cancelled' }
      })

      return NextResponse.redirect(new URL('/dashboard?error=payment_failed', request.url))
    }
  } catch (error) {
    console.error('TPay success handling error:', error)
    return NextResponse.redirect(new URL('/dashboard?error=payment_error', request.url))
  }
}