import { getServerSession } from 'next-auth/next'
import { NextRequest, NextResponse } from 'next/server'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json(
        { error: 'Musisz być zalogowany, aby złożyć zamówienie' },
        { status: 401 }
      )
    }

    const userId = parseInt((session.user as any).id)
    const { softwareId } = await request.json()

    if (!softwareId) {
      return NextResponse.json(
        { error: 'ID oprogramowania jest wymagane' },
        { status: 400 }
      )
    }

    // Sprawdź czy oprogramowanie istnieje
    const software = await prisma.software.findUnique({
      where: { id: parseInt(softwareId) }
    })

    if (!software) {
      return NextResponse.json(
        { error: 'Oprogramowanie nie zostało znalezione' },
        { status: 404 }
      )
    }

    // Utwórz zamówienie
    const order = await prisma.order.create({
      data: {
        userId,
        softwareId: software.id,
        amount: software.price,
        status: 'pending',
      },
    })

    // Integracja z płatnościami - wybór metody płatności
    // Pobierz dane użytkownika
    const user = await prisma.user.findUnique({
      where: { id: userId }
    })

    if (!user) {
      return NextResponse.json(
        { error: 'Użytkownik nie znaleziony' },
        { status: 404 }
      )
    }

    const { paymentMethod = 'paypal' } = await request.json()

    let paymentUrl = ''

    if (paymentMethod === 'paypal') {
      const { createPayPalPayment } = await import('@/lib/payments/paypal')
      const payment = await createPayPalPayment(
        software.price,
        `Oprogramowanie: ${software.name}`,
        `${process.env.NEXTAUTH_URL}/api/payments/paypal/success?orderId=${order.id}`,
        `${process.env.NEXTAUTH_URL}/api/payments/paypal/cancel?orderId=${order.id}`
      )
      paymentUrl = payment.links.find((link: any) => link.rel === 'approval_url').href
    } else if (paymentMethod === 'tpay') {
      const { createTPayPayment } = await import('@/lib/payments/tpay')
      const payment = await createTPayPayment({
        id: order.id,
        amount: software.price,
        description: `Oprogramowanie: ${software.name}`,
        customerEmail: user.email,
        returnUrl: `${process.env.NEXTAUTH_URL}/api/payments/tpay/success?orderId=${order.id}`,
        notifyUrl: `${process.env.NEXTAUTH_URL}/api/payments/tpay/notify`
      })
      paymentUrl = payment.paymentUrl
    }

    return NextResponse.json({
      message: 'Zamówienie zostało utworzone',
      orderId: order.id,
      paymentUrl
    })
  } catch (error) {
    console.error('Błąd tworzenia zamówienia:', error)
    return NextResponse.json(
      { error: 'Wystąpił błąd podczas tworzenia zamówienia' },
      { status: 500 }
    )
  }
}