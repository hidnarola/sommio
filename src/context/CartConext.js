import React, { createContext, useReducer } from 'react'
import { StaticQuery } from 'gatsby'
import _ from 'lodash'
let CartContext
const { Provider, Consumer } = (CartContext = createContext())
export const SET_CART = 'SET_CART'
export const REMOVE_CART = 'REMOVE_CART'
export const UPDATE_CART = 'UPDATE_CART'
export const FETCH_CART_DATA = 'FETCH_CART_DATA'
export const CLEAN_CART = 'CLEAN_CART'
export const SET_SELCETED_RATES = 'SET_SELCETED_RATES'
export const SET_BUILTON_PRODUCT_PRICE = 'SET_BUILTON_PRODUCT_PRICE'

export const initialState = {
  ProductsArray: [],
  CartObj: {
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
  count: 0,
  productSubTotal: 0,
  total: 0,
  shippingRate: 0,
  shippingProvider: '',
  weightPrice: 0,
  coverPrice: 0,
  Size: 'Single',
  Weight: null,
  Cover: null
}

export default function reducer(state, action) {
  switch (action.type) {
    case SET_CART:
      const cartItemObj = action.payload

      const prods = state.ProductsArray

      if (state.ProductsArray.length === 0) {
        prods.push(cartItemObj)
      } else {
        let x = _.find(state.ProductsArray, {
          main_product_id: cartItemObj.main_product_id,
          coverId: cartItemObj.coverId,
          weightId: cartItemObj.weightId
        })
        if (x === undefined) {
          prods.push(cartItemObj)
        }
      }
      let count = _.sumBy(prods, data => {
        return data.quantityBuilton
      })
      let productSubTotal = _.sumBy(state.ProductsArray, data => {
        return data.final_price * data.quantityBuilton
      })
      let finalTotal = productSubTotal + state.shippingRate
      console.log('finalTotal  => ', finalTotal)

      sessionStorage.setItem('cartDetails', JSON.stringify(prods))

      return {
        ...state,
        CartObj: cartItemObj,
        ProductsArray: prods,
        count: count,
        productSubTotal: productSubTotal,
        total: finalTotal
      }

    case UPDATE_CART:
      console.log('[testcart] UPDATE_CART => ', action)

      const product = action.payload.product
      const flag = action.payload.flag

      let y = _.findIndex(state.ProductsArray, product)

      if (flag === 1) {
        let updateToProduct = product
        updateToProduct.quantityBuilton = updateToProduct.quantityBuilton + 1
        state.ProductsArray.splice(y, 1, updateToProduct)
      } else if (flag === 0) {
        let updateToProduct = product
        updateToProduct.quantityBuilton = updateToProduct.quantityBuilton - 1
      }
      let updateCount = _.sumBy(state.ProductsArray, data => {
        return data.quantityBuilton
      })
      let prodSubTotal = _.sumBy(state.ProductsArray, data => {
        return data.final_price * data.quantityBuilton
      })
      let updateTotal = prodSubTotal + state.shippingRate

      sessionStorage.setItem('cartDetails', JSON.stringify(state.ProductsArray))

      return {
        ...state,
        count: updateCount,
        productSubTotal: prodSubTotal,
        total: updateTotal
      }

    case REMOVE_CART:
      let selectedProduct = action.payload

      let removeCount
      let z = _.findIndex(state.ProductsArray, selectedProduct)
      state.ProductsArray.splice(z, 1)
      console.log('Remove state.ProductsArray => ', state.ProductsArray)

      removeCount = _.sumBy(state.ProductsArray, data => {
        return data.quantityBuilton
      })
      let removeSubTotal = _.sumBy(state.ProductsArray, data => {
        return data.final_price * data.quantityBuilton
      })
      let removeTotal = removeSubTotal + state.shippingRate
      console.log('[remove cart ]state.ProductsArray => ', state.ProductsArray)

      sessionStorage.setItem('cartDetails', JSON.stringify(state.ProductsArray))

      return {
        ...state,
        count: removeCount,
        productSubTotal: removeSubTotal,
        total: removeTotal,
        ProductsArray: state.ProductsArray
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
        ProductsArray: cartProduct,
        count: updateTocount,
        productSubTotal: updateToSubTotal,
        total: fetchTotal
      }

    case SET_SELCETED_RATES:
      const shippingRate = action.payload.convertedRates
        ? action.payload.convertedRates
        : initialState.shippingRate
      let total = state.productSubTotal + shippingRate

      return {
        ...state,
        shippingRate: shippingRate,
        shippingProvider: action.payload.shipping_provider,
        total: total
      }
    case SET_BUILTON_PRODUCT_PRICE:
      console.log('SET_BUILTON_PRODUCT_PRICE action => ', action)

      let weightPrice = action.payload.selectWeightPrice
      let coverPrice = action.payload.selectCoverPrice
      let selectedWeight = action.payload.selectedWeight
      let selectedCover = action.payload.selectedCover

      return {
        ...state,
        weightPrice: weightPrice,
        coverPrice: coverPrice,
        Weight: selectedWeight[0] && selectedWeight[0].name,
        Cover: selectedCover[0] && selectedCover[0].name
      }

    case CLEAN_CART:
      console.log('CLEAN_CART action => ', action, initialState)
      return { ...initialState, ProductsArray: [] }

    default:
      return state
  }
}

function CartProvider({ children, ...props }) {
  const [state, dispatch] = useReducer(reducer, initialState)
  let isEmpty = state.count === 0
  const set_cart = payload => {
    dispatch({ type: SET_CART, payload: payload })
  }
  const update_cart = (product, flag) => {
    dispatch({ type: UPDATE_CART, payload: { product, flag } })
  }
  const remove_cart = payload => {
    dispatch({ type: REMOVE_CART, payload: payload })
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

  const setSubProductPrice = (selectedWeight, selectedCover) => {
    const selectWeightPrice = selectedWeight[0] && selectedWeight[0].price
    const selectCoverPrice = selectedWeight[0] && selectedCover[0].price
    dispatch({
      type: SET_BUILTON_PRODUCT_PRICE,
      payload: {
        selectWeightPrice,
        selectCoverPrice,
        selectedWeight,
        selectedCover
      }
    })
  }

  return (
    <Provider
      value={{
        ...state,
        ...props,
        isEmpty,
        set_cart,
        update_cart,
        remove_cart,
        shippingCost,
        deleteCartData,
        fetchCartDataFromStorage,
        setSubProductPrice
      }}
    >
      {children}
    </Provider>
  )
}

export { CartProvider, Consumer as CartConsumer, CartContext }
