'use client'

import { SessionProvider } from 'next-auth/react'
import Header from './Header'
import Footer from './Footer'
import Sidebar from './Sidebar'

interface LayoutProps {
  children: React.ReactNode
  showSidebar?: boolean
}

export default function Layout({ children, showSidebar = false }: LayoutProps) {
  return (
    <SessionProvider>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex">
          {showSidebar && (
            <>
              {/* Desktop sidebar */}
              <div className="hidden lg:block">
                <Sidebar />
              </div>
              {/* Mobile sidebar overlay - can be implemented later if needed */}
            </>
          )}
          <main className={`flex-1 ${showSidebar ? 'lg:ml-0' : ''}`}>
            <div className="container mx-auto px-4 py-8">
              {children}
            </div>
          </main>
        </div>
        <Footer />
      </div>
    </SessionProvider>
  )
}