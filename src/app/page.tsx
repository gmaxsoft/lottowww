import { prisma } from '@/lib/prisma'
import Layout from '@/components/Layout/Layout'
import SoftwareCard from '@/components/SoftwareCard'

export default async function HomePage() {
  const software = await prisma.software.findMany({
    include: {
      category: true
    },
    orderBy: { createdAt: 'desc' },
    take: 6 // Pokaż najnowsze 6 produktów
  })

  return (
    <Layout showSidebar>
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          MaxLotto.pl - Oprogramowanie dla graczy Lotto
        </h1>
        <p className="text-xl text-gray-600">
          Profesjonalne narzędzia do analizy i optymalizacji zakładów w polskich grach losowych.
        </p>
      </div>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Najnowsze produkty</h2>

        {software.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Brak produktów</h3>
            <p className="text-gray-600">Wkrótce dodamy pierwsze produkty do naszej oferty.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {software.map((item) => (
              <SoftwareCard key={item.id} software={item} />
            ))}
          </div>
        )}
      </section>

      <section className="bg-gray-100 -mx-4 px-4 py-12 rounded-lg">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Dlaczego warto wybrać nasze oprogramowanie?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            <div>
              <div className="bg-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                📊
              </div>
              <h3 className="text-xl font-semibold mb-2">Zaawansowana analiza</h3>
              <p className="text-gray-600">
                Wykorzystaj algorytmy statystyczne i sztuczną inteligencję do analizy wyników.
              </p>
            </div>
            <div>
              <div className="bg-green-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                🔒
              </div>
              <h3 className="text-xl font-semibold mb-2">Bezpieczne płatności</h3>
              <p className="text-gray-600">
                Płać bezpiecznie przez PayPal lub TPay. Twoje dane są chronione.
              </p>
            </div>
            <div>
              <div className="bg-purple-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                📱
              </div>
              <h3 className="text-xl font-semibold mb-2">Responsywny design</h3>
              <p className="text-gray-600">
                Korzystaj z aplikacji na wszystkich urządzeniach - komputerze, tablecie i telefonie.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}
