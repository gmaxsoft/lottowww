import { getServerSession } from 'next-auth/next'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import Layout from '@/components/Layout/Layout'

interface DownloadPageProps {
  params: {
    orderId: string
  }
}

export default async function DownloadPage({ params }: DownloadPageProps) {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/login')
  }

  const userId = parseInt((session.user as any).id)
  const orderId = parseInt(params.orderId)

  const order = await prisma.order.findFirst({
    where: {
      id: orderId,
      userId: userId,
      status: 'paid'
    },
    include: {
      software: true
    }
  })

  if (!order || !order.software.fileUrl) {
    return (
      <Layout showSidebar>
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Plik niedostępny</h1>
          <p className="text-gray-600">
            Plik do pobrania nie jest dostępny. Skontaktuj się z obsługą klienta.
          </p>
        </div>
      </Layout>
    )
  }

  return (
    <Layout showSidebar>
      <div className="max-w-2xl mx-auto text-center py-12">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <div className="mb-6">
            <div className="bg-green-100 text-green-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              ✓
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Płatność potwierdzona!</h1>
            <p className="text-gray-600">
              Możesz teraz pobrać swoje oprogramowanie.
            </p>
          </div>

          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              {order.software.name}
            </h2>
            <p className="text-gray-600 mb-4">{order.software.description}</p>
            <div className="text-sm text-gray-500">
              <p>Data zamówienia: {new Date(order.createdAt).toLocaleDateString('pl-PL')}</p>
              <p>ID zamówienia: #{order.id}</p>
            </div>
          </div>

          <a
            href={order.software.fileUrl}
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors text-lg font-medium"
            download
          >
            Pobierz oprogramowanie
          </a>

          <div className="mt-6 text-sm text-gray-500">
            <p>
              Jeśli masz problemy z pobraniem, skontaktuj się z nami:
              <a href="mailto:support@maxlotto.pl" className="text-blue-600 hover:text-blue-800 ml-1">
                support@maxlotto.pl
              </a>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  )
}