import React, { createContext } from 'react'

import { CartProvider, CartContext } from './CartContext'

import { CheckoutProvider, CheckoutContext } from './CheckoutContext'
import { FirebaseProvider, FirebaseContext } from './FirebaseContext'
import { TestCartProvider, TestCartContext } from './TestCartConext'

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
        <TestCartProvider>
          <CartProvider>
            <CheckoutProvider>{children}</CheckoutProvider>
          </CartProvider>
        </TestCartProvider>
      </FirebaseProvider>
    </Provider>
  )
}

export {
  BuiltonProvider,
  Consumer as BuiltonConsumer,
  BuiltonContext,
  CartContext,
  CheckoutContext,
  FirebaseContext,
  TestCartContext
}
