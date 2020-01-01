import React, { useContext, createContext, useReducer, useEffect } from 'react'
import { toast, ToastType } from 'react-toastify'
import axios from 'axios'
import { FirebaseContext } from './FirebaseContext'
export const SET_RATES = 'SET_RATES'
export const SET_ADDRESS = 'SET_ADDRESS'
export const SET_SELCETED_RATES = 'SET_SELCETED_RATES'
export const SET_LOADING = 'SET_LOADING'
export const CLEAN_CART = 'CLEAN_CART'
export const SET_TOGGLE = 'SET_TOGGLE'
export const SET_VARIATION = 'SET_VARIATION'
export const SET_BUILTON_PRODUCT_PRICE = 'SET_BUILTON_PRODUCT_PRICE'
export const SET_BUILTON_CART_DATA = 'SET_BUILTON_CART_DATA'
export const USER_DETAIL_BUILTON = 'USER_DETAIL_BUILTON'
export const CART_BUILTON = 'CART_BUILTON'

export const initialState = {
  errorMessage: '',
  builton: '',
  user: { email: '', password: '' },
  isAddToCart: false,
  price: 0,
  subTotalBuilton: 0,
  weihtPrice: 0,
  coverPrice: 0,
  Size: 'single',
  Weight: '12 kg',
  Cover: 'Plush',
  quantityBuilton: 0,
  countBuilton: 0,
  cartItemsBuilton: [],
  loading: false,
  rate: 0,
  paymentButton: false,
  shippingProvider: null,
  orderCartItems: [],
  toggle: false,
  shippingRate: 0
}

export default function reducer(state, action) {
  switch (action.type) {
    case SET_RATES:
      const shippingRatesArray =
        action.payload && action.payload.data.data.rates
      let loadingAfterRate = false

      let test = {
        ...state,
        shippingRatesArray,
        loading: loadingAfterRate
      }

      return test

    case SET_ADDRESS:
      const shipping_address = action.shippingData
      const customerDetails = action.user

      const paymentButton = true

      return {
        ...state,
        shipping_address,
        customerDetails,
        paymentButton: paymentButton
      }

    case SET_SELCETED_RATES:
      const shippingRate = action.payload.convertedRates
        ? action.payload.convertedRates
        : initialState.shippingRate

      return {
        ...state,
        shippingRate: shippingRate,
        shippingProvider: action.payload.shipping_provider
      }
    case SET_LOADING:
      const loading = true

      return { loading: loading }

    case CLEAN_CART:
      console.log('initialState => ', initialState)

      return initialState

    case SET_VARIATION:
      console.log('My Log', action)
      var obj = {}
      console.log('action price => ', action)

      const price = action.payload.price
      obj[action.payload.name] = action.payload.value

      return {
        ...state,
        ...obj,
        SubproductPrice: price
      }
    case SET_TOGGLE:
      return {
        ...state,
        toggle: !state.toggle
      }
    case SET_BUILTON_PRODUCT_PRICE:
      const weightPrice = action.payload.selectWeightPrice
      const coverPrice = action.payload.selectCoverPrice
      const selectedWeight = action.payload.selectedWeight
      const selectedCover = action.payload.selectedCover
      const shippingSubProductId = action.payload.shippingSubProduct[0]._id._oid
      return {
        ...state,
        weightPrice: weightPrice,
        coverPrice: coverPrice,
        selectedWeight,
        selectedCover,
        shippingSubProduct: action.payload.shippingSubProduct,
        shippingSubProductId
      }

    case SET_BUILTON_CART_DATA:
      const cartItemsBuilton = action.payload
      console.log('action TEST => ', action, state.subTotalBuilton, state.price)

      const wightProduct =
        cartItemsBuilton[0] && cartItemsBuilton[0].subProduct.selectedWeight
      const coverProduct =
        cartItemsBuilton[0] && cartItemsBuilton[0].subProduct.selectedCover
      const subTotalBuilton =
        (cartItemsBuilton[0] && cartItemsBuilton[0].price) +
        state.weightPrice +
        state.coverPrice

      const countBuilton =
        state.quantityBuilton + cartItemsBuilton[0] &&
        cartItemsBuilton[0].quantityBuilton
      const quantityBuilton =
        cartItemsBuilton[0] && cartItemsBuilton[0].quantityBuilton

      if (action.payload.removeCart === true) {
        const { data, quantityBuilton, countBuilton, toggle } = action.payload
        return {
          ...state,
          cartItemsBuilton: data,
          quantityBuilton: quantityBuilton,
          countBuilton: countBuilton,
          toggle: toggle,
          subTotalBuilton: initialState.subTotalBuilton,
          price: initialState.price,
          isAddToCart: false
        }
      } else if (action.payload[0].isChangedQuantity) {
        const { price, quantityBuilton } = action.payload[0]
        // const P = price
        return {
          ...state,
          price: price,
          quantityBuilton: quantityBuilton,
          isAddToCart: false
        }
      } else {
        const isActive = cartItemsBuilton[0].isAddToCart
        return {
          ...state,
          cartItemsBuilton: cartItemsBuilton,
          countBuilton,
          subTotalBuilton: subTotalBuilton,
          quantityBuilton: quantityBuilton,
          isAddToCart: cartItemsBuilton[0].isAddToCart,
          orderCartItems: cartItemsBuilton
        }
      }

    case USER_DETAIL_BUILTON:
      const builton = action.builton

      return {
        ...state,
        user: action.data,
        builton: builton
      }
    default:
      return state
  }
}

let CartContext

const { Provider, Consumer } = (CartContext = createContext())

function CartProvider({ children, ...props }) {
  const { firebase } = useContext(FirebaseContext)
  const [state, dispatch] = useReducer(reducer, initialState)
  let isEmpty = state.countBuilton === 0

  function updateQuantityBuilton(id, quantity) {
    console.log('quantity => ', quantity)
    const testPrice = state.subTotalBuilton
    let updatePrice = quantity * testPrice
    console.log('updatedPrice => ', updatePrice)

    // Update cart payload
    const payload = [
      {
        description: state.cartItemsBuilton[0].description,
        human_id: state.cartItemsBuilton[0].human_id,
        id: state.cartItemsBuilton[0].id,
        main_product: state.cartItemsBuilton[0].main_product,
        name: state.cartItemsBuilton[0].name,
        price: updatePrice,
        quantityBuilton: quantity,
        subProduct: state.cartItemsBuilton[0].subProduct,
        isChangedQuantity: true
      }
    ]
    dispatch({ type: SET_BUILTON_CART_DATA, payload: payload })

    toast.success(`Quantity updated to ${quantity}`)
  }

  async function removeFromCartBuilton(id) {
    //Remove item from cart
    const removeCart = true
    console.log('[initialState.cartItemsBuilton] => ', initialState)

    dispatch({
      type: SET_BUILTON_CART_DATA,
      payload: {
        data: initialState.cartItemsBuilton,
        removeCart,
        quantityBuilton: initialState.quantityBuilton,
        countBuilton: initialState.countBuilton,
        toggle: state.toggle,
        subTotalBuilton: initialState.subTotalBuilton,
        price: initialState.price
      }
    })
    toast.success('Item removed from cart')
  }

  const shippingCostCalculate = async (
    user,
    shippingData,
    cartItemsBuilton
  ) => {
    dispatch({ type: SET_ADDRESS, user, shippingData })
    console.log('shippingData => ', shippingData)

    var items = []
    // const final_price = cartItemsBuilton[0].price +
    for (const item of cartItemsBuilton) {
      console.log('item before => ', item)
      const finalPrice = item.price + state.coverPrice + state.weightPrice
      items.push({
        description: item.description,
        origin_country: 'USA',
        quantity: item.quantityBuilton,
        price: {
          amount: finalPrice,
          currency: item.currency
        },
        weight: {
          value: 0.6,
          unit: 'kg'
        },
        sku: item.human_id
      })
    }
    console.log('item after => ', items)
    let data = {
      async: false,
      shipper_accounts: [
        {
          id: '07b55d06-48af-4b02-a6b0-1e311e22b1e6'
        }
      ],
      shipment: {
        parcels: [
          {
            description: 'Food XS',
            box_type: 'custom',
            weight: {
              value: 2,
              unit: 'kg'
            },
            dimension: {
              width: 20,
              height: 40,
              depth: 40,
              unit: 'cm'
            },
            items: items
          }
        ],
        ship_from: {
          contact_name: 'Sommio',
          street1: 'Unit 17 Harnham Trading Estate',
          city: 'Salisbury',
          state: 'Maryland',
          country: 'GBR',
          postal_code: 'SP2 8NW',
          phone: '96679797',
          email: 'test@test.test',
          type: 'residential'
        },
        ship_to: {
          contact_name: `${shippingData.first_name}`,
          street1: `${shippingData.line_1}`,
          city: `${shippingData.city}`,
          state: `${shippingData.county}`,
          postal_code: `${shippingData.postcode}`,
          country: `${shippingData.country}`,
          phone: '7657168649',
          email: `${firebase.auth().currentUser.email}`,
          type: 'residential'
        }
      }
    }

    const apiKey = process.env.GATSBY_POSTMEN_API_KEY

    let payload = await axios.post(
      'https://sandbox-api.postmen.com/v3/rates',
      data,
      { headers: { 'postmen-api-key': apiKey } }
    )
    console.log('payload rates => ', payload)

    dispatch({ type: SET_RATES, payload })
  }

  async function shippingCost(convertedRates, shipping_provider) {
    dispatch({
      type: SET_SELCETED_RATES,
      payload: { convertedRates, shipping_provider }
    })
  }
  const setToggle = () => {
    dispatch({ type: SET_TOGGLE })
  }
  function setVariation(name, value, price) {
    dispatch({
      type: SET_VARIATION,
      payload: { name, value, price }
    })
  }
  const deleteCart = () => {
    dispatch({ type: CLEAN_CART })
  }
  const setSubProductPrice = (
    selectedWeight,
    selectedCover,
    shippingSubProduct
  ) => {
    const selectWeightPrice = selectedWeight[0] && selectedWeight[0].price
    const selectCoverPrice = selectedWeight[0] && selectedCover[0].price
    dispatch({
      type: SET_BUILTON_PRODUCT_PRICE,
      payload: {
        selectWeightPrice,
        selectCoverPrice,
        selectedWeight,
        selectedCover,
        shippingSubProduct
      }
    })
  }
  const setCartData = cartItemsBuilton => {
    //Add cart Data
    dispatch({
      type: SET_BUILTON_CART_DATA,
      payload: cartItemsBuilton
    })
  }
  const setUserBuilton = (data, builton) => {
    console.log('data => ', data)

    dispatch({ type: USER_DETAIL_BUILTON, data, builton })
  }
  const cartBuilton = cart => {
    dispatch({ type: CART_BUILTON, cart })
  }

  return (
    <Provider
      value={{
        ...state,
        ...props,
        isEmpty,
        shippingCostCalculate,
        shippingCost,
        setToggle,
        setVariation,
        setSubProductPrice,
        setCartData,
        removeFromCartBuilton,
        updateQuantityBuilton,
        setUserBuilton,
        cartBuilton,
        deleteCart
      }}
    >
      {children}
    </Provider>
  )
}

export { CartProvider, Consumer as CartConsumer, CartContext }
