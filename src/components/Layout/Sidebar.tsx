'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import translations from '@/lib/translations/pl.json'

const categories = [
  { slug: 'lotto', name: translations.sidebar.lotto },
  { slug: 'mini-lotto', name: translations.sidebar.miniLotto },
  { slug: 'multi-multi', name: translations.sidebar.multiMulti },
  { slug: 'eurojackpot', name: translations.sidebar.eurojackpot },
  { slug: 'ekstra-pensja', name: translations.sidebar.ekstraPensja },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-gray-100 min-h-screen p-6">
      <h2 className="text-xl font-bold mb-6 text-gray-800">
        {translations.sidebar.categories}
      </h2>

      <nav className="space-y-2">
        {categories.map((category) => (
          <Link
            key={category.slug}
            href={`/category/${category.slug}`}
            className={`block px-4 py-3 rounded-lg transition-colors ${
              pathname === `/category/${category.slug}`
                ? 'bg-blue-600 text-white'
                : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
            }`}
          >
            {category.name}
          </Link>
        ))}
      </nav>
    </aside>
  )
}