import React, { useContext, createContext, useReducer } from 'react'

import { CartContext } from './CartContext'

export const CREATE_ORDER_BUILTON = 'CREATE_ORDER_BUILTON'
export const PAYMENT = 'PAYMENT'
export const RESET_PAYMENT = 'RESET_PAYMENT'
export const SET_ORDER_DATA = 'SET_ORDER_DATA'
export const PAYMENT_BUILTON = 'PAYMENT_BUILTON'
export const USER_ORDER = 'USER_ORDER'

export const initialState = {
  defaultPayment: false,
  order_customer: null,
  order_shipping_provider_name: null,
  order_shipping_cost: null,
  paymentDetails: null,
  shipping_address: null,
  customer: null,
  orderPrice: 0,
  orderedItems: [],
  orderId: null,
  userOrderData: [],
  userOrder: [],
  totalProductQuantity: 1
}

export default function reducer(state, action) {
  switch (action.type) {
    case PAYMENT:
      const paymentDetails = action.payload
      return {
        paymentDetails: paymentDetails
      }
    case RESET_PAYMENT:
      return {
        ...initialState
      }

    case CREATE_ORDER_BUILTON:
      console.log('action CREATE_ORDER_BUILTON => ', action)
      const orderedItems = action.createdOrder.items
      const totalProductQuantity = action.createdOrder.total_quantity
      const orderPrice = action.createdOrder.total_amount
      const orderId = action.createdOrder.id

      return {
        ...state,
        orderId,
        orderPrice,
        orderedItems,
        totalProductQuantity: totalProductQuantity
      }

    case PAYMENT_BUILTON:
      const defaultPayment = true

      console.log('action => ', action)
      return {
        ...state,
        defaultPayment: defaultPayment
      }
    case USER_ORDER:
      console.log('action USER_ORDER => ', action)
      const userOrder = action.data
      const userOrderItem = action.data.map(object => object.items)
      console.log('userOrder,userOrderItem => ', userOrder, userOrderItem)
      return {
        userOrder: userOrder,
        userOrderItem: userOrderItem
      }
    default:
      return state
  }
}
let CheckoutContext

const { Provider, Consumer } = (CheckoutContext = createContext())

function CheckoutProvider({ children, ...props }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  function checkoutClear() {
    dispatch({ type: RESET_PAYMENT })
  }
  function paymentData(paymentDetail) {
    dispatch({ type: PAYMENT, payload: paymentDetail })
  }

  const createOrderBuilton = createdOrder => {
    dispatch({
      type: CREATE_ORDER_BUILTON,
      createdOrder
    })
  }
  const paymentBuilton = payBuilton => {
    console.log('CHECKOUT payBuilton => ', payBuilton)

    dispatch({ type: PAYMENT_BUILTON, payBuilton })
  }
  const userOrderData = data => {
    console.log('CHECKOUT data => ', data)
    dispatch({ type: USER_ORDER, data })
  }
  return (
    <Provider
      value={{
        ...state,
        ...props,
        checkoutClear,
        paymentData,
        createOrderBuilton,
        paymentBuilton,
        userOrderData
      }}
    >
      {children}
    </Provider>
  )
}

export { CheckoutProvider, Consumer as CheckoutConsumer, CheckoutContext }
