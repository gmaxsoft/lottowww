import Link from 'next/link'
import translations from '@/lib/translations/pl.json'

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">MaxLotto.pl</h3>
            <p className="text-gray-400">
              Platforma sprzedaży oprogramowania dla polskich gier losowych.
            </p>
          </div>

          <div>
            <h4 className="text-md font-semibold mb-4">{translations.footer.about}</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/about" className="hover:text-white transition-colors">O nas</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Kontakt</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-md font-semibold mb-4">{translations.footer.contact}</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Email: kontakt@maxlotto.pl</li>
              <li>Tel: +48 123 456 789</li>
            </ul>
          </div>

          <div>
            <h4 className="text-md font-semibold mb-4">Płatności</h4>
            <ul className="space-y-2 text-gray-400">
              <li>PayPal</li>
              <li>TPay</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 text-center">
          <p className="text-gray-400">{translations.footer.copyright}</p>
          <div className="mt-2 space-x-4">
            <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
              {translations.footer.privacy}
            </Link>
            <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
              {translations.footer.terms}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}