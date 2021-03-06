import React, { useEffect, useState } from 'react'
import { StripeProvider as Stripe } from 'react-stripe-elements'

const StripeProvider = ({ children }) => {
  const [stripe, setStripe] = useState(null)

  useEffect(() => {
    if (window.Stripe) {
      setStripe(window.Stripe(process.env.GATSBY_BUILTON_STRIPE_KEY))
    } else {
      document.querySelector('#stripe-js').addEventListener('load', () => {
        setStripe(window.Stripe(process.env.GATSBY_BUILTON_STRIPE_KEY))
      })
    }
  }, [])

  return <Stripe stripe={stripe}>{children}</Stripe>
}

export default StripeProvider
