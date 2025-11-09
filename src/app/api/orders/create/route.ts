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

    // Tutaj można dodać integrację z bramką płatności
    // Na potrzeby demonstracji, symulujemy sukces płatności

    // Zaktualizuj status zamówienia na "paid"
    await prisma.order.update({
      where: { id: order.id },
      data: { status: 'paid' }
    })

    return NextResponse.json({
      message: 'Zamówienie zostało utworzone i opłacone',
      orderId: order.id,
      redirect: `/dashboard?success=1`
    })
  } catch (error) {
    console.error('Błąd tworzenia zamówienia:', error)
    return NextResponse.json(
      { error: 'Wystąpił błąd podczas tworzenia zamówienia' },
      { status: 500 }
    )
  }
}