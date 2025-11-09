import { prisma } from '@/lib/prisma'
import Layout from '@/components/Layout/Layout'
import SoftwareCard from '@/components/SoftwareCard'

interface CategoryPageProps {
  params: {
    slug: string
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const category = await prisma.category.findUnique({
    where: { name: params.slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') }
  })

  if (!category) {
    return (
      <Layout showSidebar>
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Kategoria nie znaleziona</h1>
          <p className="text-gray-600">Wybrana kategoria nie istnieje.</p>
        </div>
      </Layout>
    )
  }

  const software = await prisma.software.findMany({
    where: { categoryId: category.id },
    orderBy: { name: 'asc' }
  })

  return (
    <Layout showSidebar>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{category.name}</h1>
        {category.description && (
          <p className="text-gray-600">{category.description}</p>
        )}
      </div>

      {software.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Brak oprogramowania</h2>
          <p className="text-gray-600">W tej kategorii nie ma jeszcze żadnego oprogramowania.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {software.map((item) => (
            <SoftwareCard key={item.id} software={item} />
          ))}
        </div>
      )}
    </Layout>
  )
}