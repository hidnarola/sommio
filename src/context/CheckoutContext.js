import React, { useContext, createContext, useReducer } from 'react'
// import axios from "axios";
import { CartContext } from './CartContext'
// import { MoltinContext } from '.'

export const SET_PAYMENT_VALUE = 'SET_PAYMENT_VALUE'
export const PAYMENT = 'PAYMENT'
export const RESET_PAYMENT = 'RESET_PAYMENT'
export const SET_ORDER_DATA = 'SET_ORDER_DATA'
export const initialState = {
  defaultPayment: false,
  order_shipping_address: null,
  order_customer: null,
  order_items: null,
  order_shipping_provider_name: null,
  order_shipping_cost: null,
  order_meta: null,
  paymentDetails: null,
  shipping_address: null,
  customer: null,
  orderId: null
}

export default function reducer(state, action) {
  switch (action.type) {
    case SET_ORDER_DATA:
      const order_shipping_address = action.payload.shipping_address
      const order_customer = action.payload.customer
      const order_items = action.payload.relationships.items
      const order_shipping_provider_name = action.payload.shipping_provider_name
      const order_shipping_cost = action.payload.shipping_cost
      const order_meta = action.payload.meta.display_price
      const orderId = action.payload.id
      return {
        order_shipping_address: order_shipping_address,
        order_customer: order_customer,
        order_items: order_items,
        order_shipping_provider_name: order_shipping_provider_name,
        order_shipping_cost: order_shipping_cost,
        order_meta: order_meta,
        orderId: orderId
      }
    case SET_PAYMENT_VALUE:
      const defaultPayment = true
      return {
        ...state,
        defaultPayment: defaultPayment
      }
    case PAYMENT:
      const paymentDetails = action.payload
      return {
        paymentDetails: paymentDetails
      }
    case RESET_PAYMENT:
      return {
        ...initialState
      }
    default:
      return state
  }
}
let CheckoutContext

const { Provider, Consumer } = (CheckoutContext = createContext())

function CheckoutProvider({ cartId: initialCartId, children, ...props }) {
  // const { moltin } = useContext(MoltinContext)
  const {
    rate,
    shippingProvider,
    cartItems,
    shipping_address,
    customerDetails
  } = useContext(CartContext)
  const [state, dispatch] = useReducer(reducer, initialState)

  async function checkout(
    cartId = initialCartId,
    customerDetails,
    billing_address,
    shipping_address,
    paymentDetails,
    shipping_cost = rate,
    shipping_provider_name = shippingProvider
  ) {
    const createCustomer = customer && customer.password
    let customerId

    // const customItemShipping = await moltin.post(`carts/${cartId}/items`, {
    //   type: 'custom_item',
    //   name: 'Shipping',
    //   sku: 'ship_calc',
    //   description: 'shipping calculation for this order',
    //   slug: 'ship_calc',
    //   quantity: 1,
    //   price: {
    //     amount: rate * 100
    //   }
    // })
    let customer = {
      email: customerDetails.email,
      name: `${shipping_address.first_name} ${shipping_address.last_name}`
    }
    if (createCustomer) {
      // const { data: newCustomer } = await moltin.post(`customers`, {
      //   type: 'customer',
      //   ...customer
      // })
      // customerId = newCustomer.id
    }

    // const { data: order } = await moltin.post(`carts/${cartId}/checkout`, {
    //   customer,
    //   billing_address,
    //   shipping_address,
    //   shipping_cost,
    //   shipping_provider_name
    // })
    // dispatch({ type: SET_ORDER_DATA, payload: order })
    // return order
  }

  async function pay() {
    // try {
    // const { payment } = await moltin.post(`orders/${orderId}/payments`, {
    //   gateway,
    //   method,
    //   ...rest
    // })

    dispatch({ type: SET_PAYMENT_VALUE })

    // return payment
    // } catch (err) {
    //   throw new Error(err.message || 'Payment failed')
    // }
  }
  function checkoutClear() {
    dispatch({ type: RESET_PAYMENT })
  }
  function paymentData(paymentDetail) {
    dispatch({ type: PAYMENT, payload: paymentDetail })
  }

  return (
    <Provider
      value={{
        ...state,
        ...props,
        checkout,
        checkoutClear,
        pay,
        paymentData
      }}
    >
      {children}
    </Provider>
  )
}

export { CheckoutProvider, Consumer as CheckoutConsumer, CheckoutContext }
