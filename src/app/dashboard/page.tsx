import { getServerSession } from 'next-auth/next'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import Layout from '@/components/Layout/Layout'
import OrdersList from '@/components/Dashboard/OrdersList'
import UserProfile from '@/components/Dashboard/UserProfile'

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/login')
  }

  const userId = parseInt(session.user.id)

  const orders = await prisma.order.findMany({
    where: { userId },
    include: {
      software: {
        include: {
          category: true
        }
      }
    },
    orderBy: { createdAt: 'desc' }
  })

  const user = await prisma.user.findUnique({
    where: { id: userId }
  })

  return (
    <Layout showSidebar>
      <div className="space-y-8">
        <h1 className="text-3xl font-bold text-gray-900">Panel klienta</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <OrdersList orders={orders} />
          </div>
          <div>
            <UserProfile user={user} />
          </div>
        </div>
      </div>
    </Layout>
  )
}