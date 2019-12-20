import React, { createContext } from 'react'

import { CartProvider, CartContext } from './CartContext'
import { UserProvider, UserContext } from './UserContext'
import { CheckoutProvider, CheckoutContext } from './CheckoutContext'
import { FirebaseProvider, FirebaseContext } from './FirebaseContext'
import firebase from '../firebase/index'
let BuiltonContext

const { Provider, Consumer } = (BuiltonContext = createContext())

function BuiltonProvider({ children, ...props }) {
  return (
    <Provider
      value={{
        ...props
      }}
    >
      <FirebaseProvider firebase={firebase}>
        <UserProvider>
          <CartProvider>
            <CheckoutProvider>{children}</CheckoutProvider>
          </CartProvider>
        </UserProvider>
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
  UserContext,
  FirebaseContext
}
