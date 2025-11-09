# MaxLotto.pl - Platforma sprzedaży oprogramowania dla polskich gier losowych

[![Next.js](https://img.shields.io/badge/Next.js-15.0.0-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0.0-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.0-38B2AC)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-5.0.0-2D3748)](https://prisma.io/)
[![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1)](https://mysql.com/)

## 📋 Opis projektu

MaxLotto.pl to nowoczesna platforma e-commerce przeznaczona do sprzedaży oprogramowania wspomagającego grę w polskie gry losowe. Platforma oferuje bezpieczne płatności, intuicyjny panel klienta oraz responsywny design.

## ✨ Funkcjonalności

### 🛒 Sklep
- **Kategorie produktów**: Lotto, Mini Lotto, Multi Multi, Eurojackpot, Ekstra Pensja
- **Wyświetlanie produktów**: Karty produktów z cenami i opisami
- **Koszyk i zamówienia**: Prosty system składania zamówień

### 👤 System użytkowników
- **Rejestracja i logowanie**: Bezpieczna autentyfikacja z hashowaniem haseł
- **Panel klienta**: Zarządzanie zamówieniami i danymi osobowymi
- **Edycja profilu**: Zmiana danych osobowych i hasła

### 💳 Płatności
- **Integracja z PayPal**: Bezpieczne płatności online
- **Obsługa TPay**: Polskie płatności elektroniczne
- **Pobieranie po zapłacie**: Dostęp do oprogramowania tylko po opłaceniu

### 🎨 Interfejs użytkownika
- **Responsywny design**: Działa na wszystkich urządzeniach
- **Polski język**: Wszystkie teksty przetłumaczone
- **Intuicyjna nawigacja**: Header, menu, sidebar i footer

## 🛠️ Technologie

### Frontend
- **Next.js 15** - React framework z App Router
- **TypeScript** - Statyczne typowanie
- **Tailwind CSS** - Framework CSS
- **NextAuth.js** - Autentyfikacja

### Backend
- **Next.js API Routes** - Server-side API
- **Prisma ORM** - Baza danych
- **MySQL** - Relacyjna baza danych
- **bcryptjs** - Hashowanie haseł
- **jsonwebtoken** - Tokeny JWT

### Narzędzia deweloperskie
- **ESLint** - Lintowanie kodu
- **Prettier** - Formatowanie kodu (domyślne)

## 📋 Wymagania systemowe

- **Node.js** >= 18.0.0
- **npm** >= 9.0.0 lub **yarn** >= 1.22.0
- **MySQL** >= 8.0
- **Git** >= 2.0

## 🚀 Instalacja i uruchomienie

### 1. Klonowanie repozytorium
```bash
git clone https://github.com/gmaxsoft/lottowww.git
cd maxlotto.pl
```

### 2. Instalacja zależności
```bash
npm install
```

### 3. Konfiguracja bazy danych

#### Utwórz bazę danych MySQL
```sql
CREATE DATABASE maxlotto_db;
```

#### Skonfiguruj zmienne środowiskowe
Skopiuj `.env.local` i uzupełnij dane:
```env
DATABASE_URL="mysql://username:password@localhost:3306/maxlotto_db"
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"
```

### 4. Migracje bazy danych
```bash
# Generuj klienta Prisma
npx prisma generate

# Uruchom migracje
npx prisma migrate dev

# Wypełnij bazę przykładowymi danymi
npx prisma db seed
```

### 5. Uruchomienie aplikacji
```bash
# Tryb deweloperski
npm run dev

# Produkcja
npm run build
npm start
```

Aplikacja będzie dostępna pod adresem: `http://localhost:3000`

## 📁 Struktura projektu

```
maxlotto.pl/
├── prisma/
│   ├── schema.prisma       # Schemat bazy danych
│   └── seed.ts            # Dane testowe
├── src/
│   ├── app/               # Next.js App Router
│   │   ├── api/          # API endpoints
│   │   ├── dashboard/    # Panel klienta
│   │   ├── login/        # Strona logowania
│   │   ├── register/     # Strona rejestracji
│   │   └── download/     # Pobieranie oprogramowania
│   ├── components/       # Komponenty React
│   │   ├── Layout/      # Komponenty layoutu
│   │   └── Dashboard/   # Komponenty panelu klienta
│   └── lib/             # Biblioteki i narzędzia
│       ├── prisma.ts    # Klient bazy danych
│       ├── auth.ts      # Konfiguracja autentyfikacji
│       └── translations/# Tłumaczenia
├── public/              # Pliki statyczne
├── .env.local          # Zmienne środowiskowe
├── tailwind.config.ts  # Konfiguracja Tailwind
└── next.config.ts      # Konfiguracja Next.js
```

## 🔌 API Endpoints

### Autentyfikacja
- `POST /api/auth/register` - Rejestracja użytkownika
- `POST /api/auth/[...nextauth]` - NextAuth.js routes

### Użytkownicy
- `PUT /api/user/profile` - Aktualizacja profilu użytkownika

### Zamówienia
- `POST /api/orders/create` - Tworzenie zamówienia

## 📖 Jak korzystać

### Dla użytkowników:
1. **Rejestracja**: Utwórz konto na stronie rejestracji
2. **Logowanie**: Zaloguj się do swojego konta
3. **Przeglądanie**: Przeglądaj oprogramowanie w kategoriach
4. **Zakupy**: Kliknij "Kup teraz" przy wybranym produkcie
5. **Płatność**: Opłać zamówienie przez PayPal lub TPay
6. **Pobieranie**: Po zapłacie pobierz oprogramowanie z panelu klienta

### Dla administratorów:
- Zarządzanie kategoriami i produktami przez bazę danych
- Monitorowanie zamówień przez panel administracyjny (do dodania)

## 🔒 Bezpieczeństwo

- **Hashowanie haseł**: bcryptjs z salt rounds = 12
- **JWT tokeny**: Bezpieczna autentyfikacja sesji
- **Walidacja danych**: Server-side validation
- **SQL Injection**: Zapobieganie przez Prisma ORM
- **XSS Protection**: Next.js built-in security

## 📱 Responsywność

Aplikacja jest w pełni responsywna i działa na:
- **Desktop** (≥1024px): Pełny layout z sidebar
- **Tablet** (768px-1023px): Uproszczony layout
- **Mobile** (≤767px): Mobilne menu hamburger

## 🚀 Wdrożenie produkcyjne

### Zmienne środowiskowe produkcyjne
```env
DATABASE_URL="mysql://user:pass@prod-host:3306/maxlotto_db"
NEXTAUTH_SECRET="strong-production-secret"
NEXTAUTH_URL="https://maxlotto.pl"

# PayPal Configuration
PAYPAL_CLIENT_ID="your-production-paypal-client-id"
PAYPAL_CLIENT_SECRET="your-production-paypal-client-secret"
PAYPAL_MODE="live"

# TPay Configuration
TPAY_MERCHANT_ID="your-production-tpay-merchant-id"
TPAY_SECURITY_CODE="your-production-tpay-security-code"
TPAY_API_KEY="your-production-tpay-api-key"
TPAY_MODE="production"
```

### Budowa i deployment
```bash
npm run build
npm start
```

### Docker (opcjonalnie)
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 🤝 Wsparcie

W przypadku problemów:
- Sprawdź [Issues](https://github.com/gmaxsoft/lottowww/issues) na GitHub
- Skontaktuj się: kontakt@maxlotto.pl

## 📄 Licencja

Ten projekt jest własnością prywatną firmy MaxLotto.pl.

## 👥 Autorzy

- **GMisk** - Główny developer
- **MaxSoft Team** - Wsparcie techniczne

---

**MaxLotto.pl** - Profesjonalne narzędzia dla graczy lotto! 🎰
