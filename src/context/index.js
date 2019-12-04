import React, { createContext } from 'react'
// import { MoltinClient } from '@moltin/request'

import { CartProvider, CartContext } from './CartContext'
import { CustomerProvider, CustomerContext } from './CustomerContext'
import { CheckoutProvider, CheckoutContext } from './CheckoutContext'

// class MoltinLocalStorageAdapter {
//   set(key, value) {
//     return window.localStorage.setItem(key, value)
//   }

//   get(key) {
//     return window.localStorage.getItem(key)
//   }

//   delete(key) {
//     return window.localStorage.removeItem(key)
//   }
// }

let BuiltonContext

const { Provider, Consumer } = (BuiltonContext = createContext())

function BuiltonProvider({
  // clientId,
  // cartId,
  // customerToken,
  children,
  ...props
}) {
  // const moltin = new MoltinClient({
  //   // client_id: clientId,
  //   application: 'gatsby-demo-store',
  //   storage: new MoltinLocalStorageAdapter()
  // })

  return (
    <Provider
      value={{
        ...props
      }}
    >
      {/* <CustomerProvider customerToken={customerToken}> */}
      <CartProvider>
        <CheckoutProvider>{children}</CheckoutProvider>
      </CartProvider>
      {/* </CustomerProvider> */}
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
