'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

interface Software {
  id: number
  name: string
  description: string | null
  price: number
}

interface SoftwareCardProps {
  software: Software
}

export default function SoftwareCard({ software }: SoftwareCardProps) {
  const { data: session } = useSession()
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handlePurchase = async () => {
    if (!session) {
      router.push('/login')
      return
    }

    setLoading(true)

    try {
      const response = await fetch('/api/orders/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          softwareId: software.id,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        // Przekieruj do płatności
        window.location.href = data.paymentUrl
      } else {
        alert(data.error || 'Wystąpił błąd podczas tworzenia zamówienia')
      }
    } catch (error) {
      alert('Wystąpił błąd podczas tworzenia zamówienia')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow">
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{software.name}</h3>
        {software.description && (
          <p className="text-gray-600 mb-4">{software.description}</p>
        )}
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-blue-600">{software.price} PLN</span>
          <button
            onClick={handlePurchase}
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 transition-colors"
          >
            {loading ? 'Przetwarzanie...' : 'Kup teraz'}
          </button>
        </div>
      </div>
    </div>
  )
}