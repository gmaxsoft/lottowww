import paypal from 'paypal-rest-sdk'

paypal.configure({
  mode: process.env.PAYPAL_MODE || 'sandbox',
  client_id: process.env.PAYPAL_CLIENT_ID!,
  client_secret: process.env.PAYPAL_CLIENT_SECRET!,
})

export async function createPayPalPayment(amount: number, description: string, returnUrl: string, cancelUrl: string) {
  return new Promise<any>((resolve, reject) => {
    const create_payment_json = {
      intent: 'sale',
      payer: {
        payment_method: 'paypal'
      },
      redirect_urls: {
        return_url: returnUrl,
        cancel_url: cancelUrl
      },
      transactions: [{
        item_list: {
          items: [{
            name: description,
            sku: 'software',
            price: amount.toFixed(2),
            currency: 'PLN',
            quantity: 1
          }]
        },
        amount: {
          currency: 'PLN',
          total: amount.toFixed(2)
        },
        description: description
      }]
    }

    paypal.payment.create(create_payment_json, function (error: any, payment: any) {
      if (error) {
        reject(error)
      } else {
        resolve(payment)
      }
    })
  })
}

export async function executePayPalPayment(paymentId: string, payerId: string) {
  return new Promise<any>((resolve, reject) => {
    const execute_payment_json = {
      payer_id: payerId
    }

    paypal.payment.execute(paymentId, execute_payment_json, function (error: any, payment: any) {
      if (error) {
        reject(error)
      } else {
        resolve(payment)
      }
    })
  })
}