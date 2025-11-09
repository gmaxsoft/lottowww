interface TPayConfig {
  merchantId: string
  securityCode: string
  apiKey: string
  mode: 'sandbox' | 'production'
}

const tpayConfig: TPayConfig = {
  merchantId: process.env.TPAY_MERCHANT_ID!,
  securityCode: process.env.TPAY_SECURITY_CODE!,
  apiKey: process.env.TPAY_API_KEY!,
  mode: (process.env.TPAY_MODE as 'sandbox' | 'production') || 'sandbox'
}

const TPAY_URLS = {
  sandbox: 'https://secure.snd.tpay.com',
  production: 'https://secure.tpay.com'
}

export async function createTPayPayment(order: {
  id: number
  amount: number
  description: string
  customerEmail: string
  returnUrl: string
  notifyUrl: string
}) {
  const baseUrl = TPAY_URLS[tpayConfig.mode]

  const paymentData = {
    id: order.id.toString(),
    amount: order.amount.toFixed(2),
    description: order.description,
    crc: tpayConfig.securityCode,
    md5sum: generateMD5(order.id.toString(), order.amount.toFixed(2), tpayConfig.securityCode),
    merchant_id: tpayConfig.merchantId,
    email: order.customerEmail,
    name: 'Klient MaxLotto.pl',
    return_url: order.returnUrl,
    result_url: order.notifyUrl,
    language: 'pl'
  }

  const paymentUrl = `${baseUrl}/?${new URLSearchParams(paymentData).toString()}`

  return {
    paymentUrl,
    paymentId: order.id.toString(),
    ...paymentData
  }
}

export async function verifyTPayPayment(notification: any) {
  const expectedMd5 = generateMD5(
    notification.tr_id,
    notification.tr_amount,
    tpayConfig.securityCode
  )

  if (expectedMd5 !== notification.md5sum) {
    throw new Error('Invalid MD5 checksum')
  }

  return {
    paymentId: notification.tr_id,
    amount: parseFloat(notification.tr_amount),
    status: notification.tr_status === 'TRUE' ? 'paid' : 'failed',
    transactionId: notification.tr_id
  }
}

function generateMD5(id: string, amount: string, crc: string): string {
  const crypto = require('crypto')
  const hash = crypto.createHash('md5')
  hash.update(`${id}${amount}${crc}`)
  return hash.digest('hex')
}