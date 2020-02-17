import React, { createContext, useReducer, useContext } from 'react'
import { StaticQuery } from 'gatsby'
import _ from 'lodash'
import { CartContext } from './CartContext'
let TestCartContext
const { Provider, Consumer } = (TestCartContext = createContext())
export const SET_CART_TEST = 'SET_CART_TEST'
export const REMOVE_CART_TEST = 'REMOVE_CART_TEST'
export const UPDATE_CART_TEST = 'UPDATE_CART_TEST'
export const FETCH_CART_DATA = 'FETCH_CART_DATA'
export const CLEAN_CART = 'CLEAN_CART'
export const SET_SELCETED_RATES = 'SET_SELCETED_RATES'

export const initialState = {
  testProductsArray: [],
  testCartObj: {
    type: '',
    main_product_id: '',
    coverId: '',
    weightId: '',
    coverName: '',
    weightName: '',
    id: '',
    name: '',
    quantityBuilton: '',
    human_id: '',
    description: '',
    price: '',
    final_price: '',
    main_product: '',
    image_url: '',
    media: '',
    coverPrice: '',
    weightPrice: '',
    subProduct: '',
    isAddToCart: '',
    currency: '',
    shippingProductId: ''
  },
  testCount: 0,
  productSubTotal: 0,
  total: 0,
  shippingRate: 0,
  shippingProvider: ''
}

export default function reducer(state, action) {
  switch (action.type) {
    case SET_CART_TEST:
      const cartItemObj = action.payload

      const prods = state.testProductsArray

      if (state.testProductsArray.length === 0) {
        prods.push(cartItemObj)
      } else {
        let x = _.find(state.testProductsArray, {
          main_product_id: cartItemObj.main_product_id,
          coverId: cartItemObj.coverId,
          weightId: cartItemObj.weightId
        })
        if (x === undefined) {
          prods.push(cartItemObj)
        }
      }
      let testCount = _.sumBy(prods, data => {
        return data.quantityBuilton
      })
      let productSubTotal = _.sumBy(state.testProductsArray, data => {
        return data.final_price * data.quantityBuilton
      })
      let finalTotal = productSubTotal + state.shippingRate
      console.log('finalTotal  => ', finalTotal)

      sessionStorage.setItem('cartDetails', JSON.stringify(prods))

      return {
        ...state,
        testCartObj: cartItemObj,
        testProductsArray: prods,
        testCount: testCount,
        productSubTotal: productSubTotal,
        total: finalTotal
      }

    case UPDATE_CART_TEST:
      console.log('[testcart] UPDATE_CART_TEST => ', action)

      const product = action.payload.product
      const flag = action.payload.flag

      let y = _.findIndex(state.testProductsArray, product)

      if (flag === 1) {
        let updateToProduct = product
        updateToProduct.quantityBuilton = updateToProduct.quantityBuilton + 1
        state.testProductsArray.splice(y, 1, updateToProduct)
      } else if (flag === 0) {
        let updateToProduct = product
        updateToProduct.quantityBuilton = updateToProduct.quantityBuilton - 1
      }
      let count = _.sumBy(state.testProductsArray, data => {
        return data.quantityBuilton
      })
      let prodSubTotal = _.sumBy(state.testProductsArray, data => {
        return data.final_price * data.quantityBuilton
      })
      let updateTotal = prodSubTotal + state.shippingRate

      sessionStorage.setItem(
        'cartDetails',
        JSON.stringify(state.testProductsArray)
      )

      return {
        ...state,
        testCount: count,
        productSubTotal: prodSubTotal,
        total: updateTotal
      }

    case REMOVE_CART_TEST:
      console.log('REMOVE_CART_TEST action => ', action)

      let selectedProduct = action.payload

      let removeCount
      let z = _.findIndex(state.testProductsArray, selectedProduct)
      state.testProductsArray.splice(z, 1)
      console.log('Remove state.testProductsArray => ', state.testProductsArray)

      removeCount = _.sumBy(state.testProductsArray, data => {
        return data.quantityBuilton
      })
      let removeSubTotal = _.sumBy(state.testProductsArray, data => {
        return data.final_price * data.quantityBuilton
      })
      let removeTotal = removeSubTotal + state.shippingRate
      console.log('removeTotal => ', removeTotal)
      console.log('removeSubTotal => ', removeSubTotal)

      return {
        ...state,
        testCount: removeCount,
        productSubTotal: removeSubTotal,
        total: removeTotal,
        testProductsArray: state.testProductsArray
      }

    case FETCH_CART_DATA:
      const cartProduct = action.payload
      console.log('cartProduct ================> ', cartProduct)

      let updateTocount = _.sumBy(cartProduct, data => {
        return data.quantityBuilton
      })
      let updateToSubTotal = _.sumBy(cartProduct, data => {
        return data.final_price * data.quantityBuilton
      })
      let fetchTotal = updateToSubTotal + state.shippingRate
      console.log('[testcart] updateTocount => ', updateTocount)

      return {
        ...state,
        testProductsArray: cartProduct,
        testCount: updateTocount,
        productSubTotal: updateToSubTotal,
        total: fetchTotal
      }

    case SET_SELCETED_RATES:
      const shippingRate = action.payload.convertedRates
        ? action.payload.convertedRates
        : initialState.shippingRate
      let total = state.productSubTotal + shippingRate

      console.log('TestCart total ========> ', total)
      console.log('TestCart shippingRate ========>', shippingRate)
      return {
        ...state,
        shippingRate: shippingRate,
        shippingProvider: action.payload.shipping_provider,
        total: total
      }

    case CLEAN_CART:
      return initialState

    default:
      return state
  }
}

function TestCartProvider({ children, ...props }) {
  const [state, dispatch] = useReducer(reducer, initialState)
  let testIsEmpty = state.testCount === 0

  const set_cart = payload => {
    dispatch({ type: SET_CART_TEST, payload: payload })
  }
  const update_cart = (product, flag) => {
    dispatch({ type: UPDATE_CART_TEST, payload: { product, flag } })
  }
  const remove_cart = payload => {
    dispatch({ type: REMOVE_CART_TEST, payload: payload })
  }
  const fetchCartDataFromStorage = payload => {
    dispatch({ type: FETCH_CART_DATA, payload: payload })
  }
  const deleteCartData = () => {
    dispatch({ type: CLEAN_CART })
  }
  const shippingCost = (convertedRates, shipping_provider) => {
    dispatch({
      type: SET_SELCETED_RATES,
      payload: { convertedRates, shipping_provider }
    })
  }

  return (
    <Provider
      value={{
        ...state,
        ...props,
        testIsEmpty,
        set_cart,
        update_cart,
        remove_cart,
        shippingCost,
        deleteCartData,
        fetchCartDataFromStorage
      }}
    >
      {children}
    </Provider>
  )
}

export { TestCartProvider, Consumer as TestCartConsumer, TestCartContext }
