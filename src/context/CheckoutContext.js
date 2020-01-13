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
  totalProductQuantity: 1,
  postalCode: '',
  SelectedCountry: '',
  county: '',
  city: '',
  address_line_1: '',
  countryCode: ''
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

    // case AUTOCOMPLETE_ADDRESS:
    //   const address = action.address[0]
    //   const address_components = action.address[0].address_components
    //   let county,
    //     city,
    //     SelectedCountry,
    //     postal_code,
    //     street_number,
    //     route,
    //     area,
    //     locality,
    //     administrative_area_level_2,
    //     neighborhood,
    //     political,
    //     postal_town,
    //     countryCode

    //   console.log('state.postalCode => ', state.postalCode)

    //   address_components.map(data => {
    //     if (data.types[0] === 'street_number') {
    //       street_number = data.long_name
    //     } else if (data.types[0] === 'route') {
    //       route = data.long_name
    //     } else if (data.types[0] === 'postal_town') {
    //       postal_town = data.long_name
    //     } else if (data.types[0] === 'locality') {
    //       locality = data.long_name // area/city
    //     } else if (data.types[0] === 'political') {
    //       political = data.long_name //area
    //     } else if (data.types[0] === 'neighborhood') {
    //       neighborhood = data.long_name
    //     } else if (data.types[0] === 'administrative_area_level_2') {
    //       administrative_area_level_2 = data.long_name //city
    //     } else if (data.types[0] === 'administrative_area_level_1') {
    //       county = data.long_name
    //     } else if (data.types[0] === 'country') {
    //       SelectedCountry = data.long_name
    //       countryCode = data.short_name
    //     } else if (data.types[0] === 'postal_code') {
    //       postal_code = data.long_name
    //     }
    //   })

    //   return {
    //     ...state,
    //     SelectedCountry,
    //     county,
    //     postalCode: postal_code,
    //     countryCode,
    //     city: postal_town ? postal_town : locality,
    //     address_line_1: `${street_number ? street_number + ',' : ''}${
    //       neighborhood ? neighborhood + ',' : ''
    //     }${political ? political + ',' : ''}${route ? route : ''}`
    //   }
    // case SET_POSTAL_CODE:
    //   console.log('SET_POSTAL_CODE action  => ', action)
    //   return  {
    //     ...state,
    //     postalCode: action.postalCode
    //   }

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
  // const setAddressFromAutoComplete = address => {
  //   dispatch({ type: AUTOCOMPLETE_ADDRESS, address })
  // }
  // const setPostalCode = postalCode => {
  //   console.log('data => ', postalCode)

  //   dispatch({ type: SET_POSTAL_CODE, postalCode })
  // }
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
