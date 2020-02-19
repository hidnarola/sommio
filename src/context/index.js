import React, { createContext } from 'react'

import {
  ShippingAndUserDetailProvider,
  ShippingAndUserDetailContext
} from './ShippingAndUserDetailContext'

import { CheckoutProvider, CheckoutContext } from './CheckoutContext'
import { FirebaseProvider, FirebaseContext } from './FirebaseContext'
import { CartProvider, CartContext } from './CartConext'

let BuiltonContext

const { Provider, Consumer } = (BuiltonContext = createContext())

function BuiltonProvider({ children, ...props }) {
  return (
    <Provider
      value={{
        ...props
      }}
    >
      <FirebaseProvider>
        <CartProvider>
          <ShippingAndUserDetailProvider>
            <CheckoutProvider>{children}</CheckoutProvider>
          </ShippingAndUserDetailProvider>
        </CartProvider>
      </FirebaseProvider>
    </Provider>
  )
}

export {
  BuiltonProvider,
  Consumer as BuiltonConsumer,
  BuiltonContext,
  ShippingAndUserDetailContext,
  CheckoutContext,
  FirebaseContext,
  CartContext
}
