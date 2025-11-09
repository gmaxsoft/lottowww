import Link from 'next/link'

interface Order {
  id: number
  amount: number
  status: string
  createdAt: Date
  software: {
    name: string
    category: {
      name: string
    }
  }
}

interface OrdersListProps {
  orders: Order[]
}

export default function OrdersList({ orders }: OrdersListProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'text-green-600 bg-green-100'
      case 'pending':
        return 'text-yellow-600 bg-yellow-100'
      case 'cancelled':
        return 'text-red-600 bg-red-100'
      default:
        return 'text-gray-600 bg-gray-100'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'paid':
        return 'Opłacone'
      case 'pending':
        return 'Oczekujące'
      case 'cancelled':
        return 'Anulowane'
      default:
        return status
    }
  }

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900">Moje zamówienia</h2>
      </div>

      <div className="p-6">
        {orders.length === 0 ? (
          <p className="text-gray-500 text-center py-8">
            Nie masz jeszcze żadnych zamówień.
          </p>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">
                      {order.software.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      Kategoria: {order.software.category.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      Data zamówienia: {new Date(order.createdAt).toLocaleDateString('pl-PL')}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">
                      {order.amount} PLN
                    </p>
                    <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}>
                      {getStatusText(order.status)}
                    </span>
                    {order.status === 'paid' && (
                      <div className="mt-2">
                        <Link
                          href={`/download/${order.id}`}
                          className="inline-block px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                        >
                          Pobierz
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}