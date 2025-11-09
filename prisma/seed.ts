import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Utwórz kategorie gier losowych
  const categories = [
    { name: 'Lotto', description: 'Klasyczna gra Lotto' },
    { name: 'Mini Lotto', description: 'Mini Lotto z mniejszym zakresem liczb' },
    { name: 'Multi Multi', description: 'Multi Multi - gra wielokrotna' },
    { name: 'Eurojackpot', description: 'Eurojackpot - europejska gra lotto' },
    { name: 'Ekstra Pensja', description: 'Ekstra Pensja - dodatkowa wygrana' },
  ]

  console.log('Tworzenie kategorii...')

  for (const category of categories) {
    await prisma.category.upsert({
      where: { name: category.name },
      update: {},
      create: category,
    })
  }

  // Pobierz utworzone kategorie
  const lottoCategory = await prisma.category.findUnique({ where: { name: 'Lotto' } })
  const miniLottoCategory = await prisma.category.findUnique({ where: { name: 'Mini Lotto' } })
  const multiMultiCategory = await prisma.category.findUnique({ where: { name: 'Multi Multi' } })
  const eurojackpotCategory = await prisma.category.findUnique({ where: { name: 'Eurojackpot' } })
  const ekstraPensjaCategory = await prisma.category.findUnique({ where: { name: 'Ekstra Pensja' } })

  // Utwórz przykładowe oprogramowanie
  const software = [
    {
      name: 'Generator Lotto Pro',
      description: 'Zaawansowany generator liczb dla gry Lotto z algorytmami statystycznymi',
      price: 49.99,
      categoryId: lottoCategory!.id,
      fileUrl: '/downloads/generator-lotto-pro.zip',
    },
    {
      name: 'Mini Lotto Analyzer',
      description: 'Analizator wyników Mini Lotto z wykresami i statystykami',
      price: 29.99,
      categoryId: miniLottoCategory!.id,
      fileUrl: '/downloads/mini-lotto-analyzer.zip',
    },
    {
      name: 'Multi Multi Optimizer',
      description: 'Optymalizator zakładów Multi Multi dla maksymalizacji wygranych',
      price: 39.99,
      categoryId: multiMultiCategory!.id,
      fileUrl: '/downloads/multi-multi-optimizer.zip',
    },
    {
      name: 'Eurojackpot Predictor',
      description: 'Predyktor wyników Eurojackpot oparty na sztucznej inteligencji',
      price: 79.99,
      categoryId: eurojackpotCategory!.id,
      fileUrl: '/downloads/eurojackpot-predictor.zip',
    },
    {
      name: 'Ekstra Pensja Calculator',
      description: 'Kalkulator dodatkowych wygranych dla Ekstra Pensja',
      price: 19.99,
      categoryId: ekstraPensjaCategory!.id,
      fileUrl: '/downloads/ekstra-pensja-calculator.zip',
    },
  ]

  console.log('Tworzenie oprogramowania...')

  for (const item of software) {
    await prisma.software.upsert({
      where: { name: item.name },
      update: {},
      create: item,
    })
  }

  console.log('Baza danych została wypełniona przykładowymi danymi!')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })