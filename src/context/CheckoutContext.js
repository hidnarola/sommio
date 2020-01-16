import React, { useContext, createContext, useReducer } from 'react'

import { CartContext } from './CartContext'

export const CREATE_ORDER_BUILTON = 'CREATE_ORDER_BUILTON'
export const PAYMENT = 'PAYMENT'
export const RESET_PAYMENT = 'RESET_PAYMENT'
export const SET_ORDER_DATA = 'SET_ORDER_DATA'
export const PAYMENT_BUILTON = 'PAYMENT_BUILTON'
export const USER_ORDER = 'USER_ORDER'
export const AUTOCOMPLETE_ADDRESS = 'AUTOCOMPLETED_ADDRESS'
export const SET_POSTAL_CODE = 'SET_POSTAL_CODE'

export const initialState = {
  defaultPayment: false,
  paymentDetails: null,
  shipping_address: null,
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
      return {
        ...state,
        defaultPayment: defaultPayment
      }
    case USER_ORDER:
      const userOrder = action.data
      const userOrderItem = action.data.map(object => object.items)

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
    dispatch({ type: PAYMENT_BUILTON, payBuilton })
  }

  const userOrderData = data => {
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
