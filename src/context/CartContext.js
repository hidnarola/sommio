import React, { useContext, createContext, useReducer } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
import { FirebaseContext } from './FirebaseContext'
import { TestCartContext } from './TestCartConext'
import { CheckoutContext } from './CheckoutContext'
export const SET_RATES = 'SET_RATES'
export const SET_ADDRESS = 'SET_ADDRESS'
export const SET_LOADING = 'SET_LOADING'
export const CLEAN_CART = 'CLEAN_CART'
export const SET_TOGGLE = 'SET_TOGGLE'
export const SET_VARIATION = 'SET_VARIATION'
export const SET_BUILTON_PRODUCT_PRICE = 'SET_BUILTON_PRODUCT_PRICE'
export const USER_DETAIL_BUILTON = 'USER_DETAIL_BUILTON'
export const CART_BUILTON = 'CART_BUILTON'
export const AUTOCOMPLETE_ADDRESS = 'AUTOCOMPLETED_ADDRESS'
export const SET_POSTAL_CODE = 'SET_POSTAL_CODE'
export const SET_ADDRESS_ONCHANGE = 'SET_ADDRESS_ONCHANGE'

export const initialState = {
  errorMessage: '',
  builton: '',
  user: { email: '', password: '' },
  isAddToCart: false,
  price: 0,
  subTotalBuilton: 0,
  weihtPrice: 0,
  coverPrice: 0,
  products: [],
  Size: 'Single',
  Weight: null,
  Cover: null,
  quantityBuilton: 0,
  countBuilton: 0,
  loading: false,
  rate: 0,
  paymentButton: false,
  shippingProvider: null,
  orderCartItems: [],
  toggle: false,
  shippingRate: 0,
  shipping_address: {
    first_name: '',
    last_name: '',
    country: '',
    city: '',
    postcode: '',
    county: '',
    line_1: '',
    phone: '',
    email: ''
  }
}

export default function reducer(state, action) {
  switch (action.type) {
    case SET_RATES:
      const shippingRatesArray =
        action.payload && action.payload.data.data.rates
      let loadingAfterRate = false
      console.log('shippingRatesArray => ', shippingRatesArray)

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
        shipping_address: shipping_address,
        customerDetails,
        paymentButton: paymentButton
      }
    case SET_ADDRESS_ONCHANGE:
      let data = state.shipping_address

      if (action.shippingDataOnchange.first_name) {
        data.first_name = action.shippingDataOnchange.first_name
      } else if (action.shippingDataOnchange.last_name) {
        data.last_name = action.shippingDataOnchange.last_name
      } else if (action.shippingDataOnchange.phone) {
        data.phone = action.shippingDataOnchange.phone
      } else if (action.shippingDataOnchange.email) {
        data.email = action.shippingDataOnchange.email
      } else if (action.shippingDataOnchange.city) {
        data.city = action.shippingDataOnchange.city
      } else if (action.shippingDataOnchange.county) {
        data.county = action.shippingDataOnchange.county
      } else if (action.shippingDataOnchange.line_1) {
        data.line_1 = action.shippingDataOnchange.line_1
      } else if (action.shippingDataOnchange.country) {
        data.country = action.shippingDataOnchange.country
      }

      return {
        ...state,
        ...shipping_address,
        shipping_address: data
      }

    case SET_LOADING:
      const loading = true

      return { loading: loading }

    case CLEAN_CART:
      return initialState

    case SET_VARIATION:
      var obj = {}

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
      console.log('SET_BUILTON_PRODUCT_PRICE action => ', action)

      const weightPrice = action.payload.selectWeightPrice
      const coverPrice = action.payload.selectCoverPrice
      const selectedWeight = action.payload.selectedWeight
      const selectedCover = action.payload.selectedCover

      return {
        ...state,
        weightPrice: weightPrice,
        coverPrice: coverPrice,
        selectedWeight,
        selectedCover,
        shippingSubProduct: action.payload.shippingSubProduct
      }

    case USER_DETAIL_BUILTON:
      const builton = action.builton

      return {
        ...state,
        user: action.data,
        builton: builton
      }

    case AUTOCOMPLETE_ADDRESS:
      let formData = state.shipping_address
      const address = action.address[0]
      const address_components = action.address[0].address_components
      let county,
        city,
        SelectedCountry,
        postal_code,
        street_number,
        route,
        area,
        locality,
        administrative_area_level_2,
        neighborhood,
        political,
        postal_town,
        countryCode

      address_components.map(data => {
        if (data.types[0] === 'street_number') {
          street_number = data.long_name
        } else if (data.types[0] === 'route') {
          route = data.long_name
        } else if (data.types[0] === 'postal_town') {
          postal_town = data.long_name
        } else if (data.types[0] === 'locality') {
          locality = data.long_name // area/city
        } else if (data.types[0] === 'political') {
          political = data.long_name //area
        } else if (data.types[0] === 'neighborhood') {
          neighborhood = data.long_name
        } else if (data.types[0] === 'administrative_area_level_2') {
          administrative_area_level_2 = data.long_name //city
        } else if (data.types[0] === 'administrative_area_level_1') {
          formData.county = data.long_name
        } else if (data.types[0] === 'country') {
          formData.country = data.long_name
          countryCode = data.short_name
        } else if (data.types[0] === 'postal_code') {
          formData.postcode = data.long_name
        }
      })

      return {
        ...state,
        shipping_address: {
          ...formData,
          city: postal_town ? postal_town : locality,
          line_1: `${street_number ? street_number + ',' : ''}${
            neighborhood ? neighborhood + ',' : ''
          }${political ? political + ',' : ''}${route ? route : ''}`
        },
        countryCode
      }
    case SET_POSTAL_CODE:
      let myData = state.shipping_address
      myData.postcode = action.postalCode
      return {
        ...state,
        shipping_address: myData
      }
    default:
      return state
  }
}

let CartContext

const { Provider, Consumer } = (CartContext = createContext())

function CartProvider({ children, ...props }) {
  const { firebase } = useContext(FirebaseContext)
  const { productSubTotal } = useContext(TestCartContext)

  const [state, dispatch] = useReducer(reducer, initialState)
  let isEmpty = state.countBuilton === 0

  const shippingCostCalculate = async (
    user,
    shippingData,
    cartItemsBuilton
  ) => {
    console.log('CartContext cartItemsBuilton => ', cartItemsBuilton)

    dispatch({ type: SET_ADDRESS, user, shippingData })

    const details = JSON.parse(localStorage.getItem('details'))

    var items = []

    // const cartDetails = JSON.parse(sessionStorage.getItem('cartDetails'))

    for (const item of cartItemsBuilton) {
      const finalPrice = productSubTotal
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
    console.log('CartContext items => ', items)

    let data = {
      async: false,
      shipper_accounts: [
        {
          id: 'a2b8a970-6fe5-4491-b9e2-8e3a6d17cd08'
        }
      ],
      shipment: {
        parcels: [
          {
            description: 'Food XS',
            box_type: 'custom',
            weight: {
              value: 10,
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
          email: `${details && details.email}`,
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

    dispatch({ type: SET_RATES, payload })
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

  const setUserBuilton = (data, builton) => {
    dispatch({ type: USER_DETAIL_BUILTON, data, builton })
  }
  const cartBuilton = cart => {
    dispatch({ type: CART_BUILTON, cart })
  }
  const setAddressFromAutoComplete = address => {
    dispatch({ type: AUTOCOMPLETE_ADDRESS, address })
  }
  const setPostalCode = postalCode => {
    dispatch({ type: SET_POSTAL_CODE, postalCode })
  }
  const setAddress = shippingDataOnchange => {
    dispatch({ type: SET_ADDRESS_ONCHANGE, shippingDataOnchange })
  }
  return (
    <Provider
      value={{
        ...state,
        ...props,
        isEmpty,
        shippingCostCalculate,
        setToggle,
        setVariation,
        setSubProductPrice,
        setUserBuilton,
        cartBuilton,
        deleteCart,
        setAddressFromAutoComplete,
        setPostalCode,
        setAddress
      }}
    >
      {children}
    </Provider>
  )
}

export { CartProvider, Consumer as CartConsumer, CartContext }
