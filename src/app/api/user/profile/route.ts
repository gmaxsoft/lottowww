import { getServerSession } from 'next-auth/next'
import { NextRequest, NextResponse } from 'next/server'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json(
        { error: 'Nie jesteś zalogowany' },
        { status: 401 }
      )
    }

    const userId = parseInt((session.user as any).id)
    const { name, email, currentPassword, newPassword } = await request.json()

    // Sprawdź czy użytkownik istnieje
    const user = await prisma.user.findUnique({
      where: { id: userId }
    })

    if (!user) {
      return NextResponse.json(
        { error: 'Użytkownik nie znaleziony' },
        { status: 404 }
      )
    }

    // Jeśli użytkownik chce zmienić hasło, sprawdź aktualne hasło
    if (newPassword && currentPassword) {
      const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password)
      if (!isCurrentPasswordValid) {
        return NextResponse.json(
          { error: 'Aktualne hasło jest nieprawidłowe' },
          { status: 400 }
        )
      }
    }

    // Sprawdź czy email jest już używany przez innego użytkownika
    if (email !== user.email) {
      const existingUser = await prisma.user.findUnique({
        where: { email }
      })
      if (existingUser) {
        return NextResponse.json(
          { error: 'Ten adres email jest już używany' },
          { status: 400 }
        )
      }
    }

    // Przygotuj dane do aktualizacji
    const updateData: any = {
      name,
      email,
    }

    if (newPassword) {
      updateData.password = await bcrypt.hash(newPassword, 12)
    }

    // Aktualizuj użytkownika
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: updateData,
      select: {
        id: true,
        email: true,
        name: true,
        updatedAt: true,
      },
    })

    return NextResponse.json({
      message: 'Dane zostały zaktualizowane',
      user: updatedUser,
    })
  } catch (error) {
    console.error('Błąd aktualizacji profilu:', error)
    return NextResponse.json(
      { error: 'Wystąpił błąd podczas aktualizacji danych' },
      { status: 500 }
    )
  }
}