import React, { createContext } from 'react'

import { CartProvider, CartContext } from './CartContext'
// import { CustomerProvider, CustomerContext } from './CustomerContext'
import { CheckoutProvider, CheckoutContext } from './CheckoutContext'

let BuiltonContext

const { Provider, Consumer } = (BuiltonContext = createContext())

function BuiltonProvider({ children, ...props }) {
  console.log('{...props} => ', { ...props })

  return (
    <Provider
      value={{
        ...props
      }}
    >
      <CartProvider>
        <CheckoutProvider>{children}</CheckoutProvider>
      </CartProvider>
    </Provider>
  )
}

export {
  BuiltonProvider,
  Consumer as BuiltonConsumer,
  BuiltonContext,
  CartContext,
  CheckoutContext
}
