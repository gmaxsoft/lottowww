'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import translations from '@/lib/translations/pl.json'

export default function Header() {
  const { data: session, status } = useSession()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold">
            MaxLotto.pl
          </Link>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white hover:text-blue-200 focus:outline-none"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className="hover:text-blue-200 transition-colors">
              {translations.menu.home}
            </Link>

            {status === 'loading' ? (
              <div className="text-sm">Ładowanie...</div>
            ) : session ? (
              <>
                <Link href="/dashboard" className="hover:text-blue-200 transition-colors">
                  {translations.menu.dashboard}
                </Link>
                <button
                  onClick={() => signOut()}
                  className="hover:text-blue-200 transition-colors"
                >
                  {translations.menu.logout}
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="hover:text-blue-200 transition-colors">
                  {translations.menu.login}
                </Link>
                <Link href="/register" className="hover:text-blue-200 transition-colors">
                  {translations.menu.register}
                </Link>
              </>
            )}
          </nav>
        </div>

        {/* Mobile navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-blue-500 pt-4">
            <div className="flex flex-col space-y-4">
              <Link
                href="/"
                className="hover:text-blue-200 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {translations.menu.home}
              </Link>

              {status === 'loading' ? (
                <div className="text-sm">Ładowanie...</div>
              ) : session ? (
                <>
                  <Link
                    href="/dashboard"
                    className="hover:text-blue-200 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {translations.menu.dashboard}
                  </Link>
                  <button
                    onClick={() => {
                      signOut()
                      setIsMenuOpen(false)
                    }}
                    className="hover:text-blue-200 transition-colors text-left"
                  >
                    {translations.menu.logout}
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="hover:text-blue-200 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {translations.menu.login}
                  </Link>
                  <Link
                    href="/register"
                    className="hover:text-blue-200 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {translations.menu.register}
                  </Link>
                </>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}