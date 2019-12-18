import React, { createContext } from 'react'

import { CartProvider, CartContext } from './CartContext'
import { UserProvider, UserContext } from './UserContext'
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
      <UserProvider>
        <CartProvider>
          <CheckoutProvider>{children}</CheckoutProvider>
        </CartProvider>
      </UserProvider>
    </Provider>
  )
}

export {
  BuiltonProvider,
  Consumer as BuiltonConsumer,
  BuiltonContext,
  CartContext,
  CheckoutContext,
  UserContext
}
