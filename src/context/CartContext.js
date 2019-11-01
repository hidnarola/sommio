import React, { useContext, createContext, useReducer, useEffect } from 'react'
import { createCartIdentifier } from '@moltin/request'
import { toast } from 'react-toastify'
import axios from 'axios'
import { MoltinContext } from '.'
import useLocalStorage from './useLocalStorage'

export const SET_CART = 'SET_CART'
export const RESET_CART = 'RESET_CART'
export const SET_RATES = 'SET_RATES'
export const SET_ADDRESS = 'SET_ADDRESS'
export const SET_SELCETED_RATES = 'SET_SELCETED_RATES'
export const SET_LOADING = 'SET_LOADING'
export const CLEAN_CART = 'CLEAN_CART'
export const SET_TOGGLE = 'SET_TOGGLE'
export const SET_VARIATION = 'SET_VARIATION'

export const initialState = {
  Size: 'single',
  Weight: 6,
  Cover: 'Plush',
  count: 0,
  items: [],
  cartItems: [],
  promotionItems: [],
  taxItems: [],
  loading: false,
  meta: null,
  rate: 0,
  paymentButton: false,
  shippingProvider: null,
  orderCartItems: [],
  toggle: false
}

export default function reducer(state, action) {
  switch (action.type) {
    case SET_CART:
      const { data: items, meta } = action.payload
      const cartItems = items.filter(({ type }) => type === 'cart_item')
      const promotionItems = items.filter(
        ({ type }) => type === 'promotion_item'
      )
      const taxItems = items.filter(({ type }) => type === 'tax_item')
      const count = cartItems.reduce(
        (sum, { type, quantity }) => type === 'cart_item' && sum + quantity,
        0
      )
      // const subTotal = meta ? meta.display_price.without_tax.amount : '00'
      const total = meta ? meta.display_price.without_tax.formatted : '00'
      const subTotal = total && parseInt(total.slice(1))

      return {
        ...state,
        items,
        cartItems: cartItems,
        promotionItems,
        taxItems,
        count,
        meta,
        subTotal,
        orderCartItems: cartItems
      }

    case SET_RATES:
      const shippingRates = action.payload && action.payload.data.data.rates
      let loadingAfterRate = false
      let test = {
        ...state,
        shippingRates,
        loading: loadingAfterRate
      }

      return test

    case SET_ADDRESS:
      const shipping_address = action.formData.shipping_address
      const customerDetails = action.formData.customer
      const paymentButton = true

      var test1 = {
        ...state,
        shipping_address,
        customerDetails,
        paymentButton: paymentButton
      }
      return test1

    case SET_SELCETED_RATES:
      return {
        ...state,
        rate: action.payload.convertedRates,
        shippingProvider: action.payload.shipping_provider
      }
    case SET_LOADING:
      const loading = true

      return { loading: loading }
    case CLEAN_CART:
      return initialState

    case RESET_CART:
      return {
        ...state,
        count: 0,
        items: [],
        cartItems: [],
        promotionItems: [],
        taxItems: [],
        loading: false,
        meta: null,
        rate: 0,
        paymentButton: false,
        shippingProvider: null
      }
    case SET_VARIATION:
      console.log('My Log', action)
      var obj = {}
      obj[action.payload.name] = action.payload.value
      return {
        ...state,
        ...obj
      }
    case SET_TOGGLE:
      return {
        ...state,
        toggle: !state.toggle
      }
    default:
      return state
  }
}

let CartContext

const { Provider, Consumer } = (CartContext = createContext())

function CartProvider({
  porductImage,
  clientId,
  cartId: initialCartId = createCartIdentifier(),
  children,
  ...props
}) {
  const { moltin } = useContext(MoltinContext)
  const [state, dispatch] = useReducer(reducer, initialState)
  const [cartId, setCartId] = useLocalStorage('mcart', initialCartId)
  const isEmpty = state.count === 0

  useEffect(() => {
    getCart(cartId)
    setCartId(cartId)
  }, [cartId])

  async function getCart(id) {
    const payload = await moltin.get(`carts/${id}/items`)
    dispatch({ type: SET_CART, payload })
  }

  async function addToCart(id, quantity, size, weight, cover, subTotal, rate) {
    const payload = await moltin.post(`carts/${cartId}/items`, {
      type: 'cart_item',
      id,
      quantity,
      variations: { size, weight, cover }
    })
    dispatch({ type: SET_CART, payload })
    toast.success(
      `Added ${quantity} ${quantity > 1 ? 'items' : 'item'} to cart`
    )
  }

  async function updateQuantity(id, quantity) {
    const payload = await moltin.put(`carts/${cartId}/items/${id}`, {
      type: 'cart_item',
      id,
      quantity
    })

    dispatch({ type: SET_CART, payload })

    toast.success(`Quantity updated to ${quantity}`)
  }

  async function removeFromCart(id) {
    const payload = await moltin.delete(`carts/${cartId}/items/${id}`)

    dispatch({ type: SET_CART, payload })

    toast.success('Item removed from cart')
  }

  async function addPromotion(code) {
    const payload = await moltin.post(`carts/${cartId}/items`, {
      type: 'promotion_item',
      code
    })

    dispatch({ type: SET_CART, payload })

    toast.success('Promotion applied')
  }

  async function deleteCart(id) {
    await moltin.delete(`carts/${id || cartId}`)

    dispatch({ type: RESET_CART })
  }

  async function shippingCostCalculate(formData, cartItems) {
    dispatch({ type: SET_ADDRESS, formData })

    var items = []
    for (const item of cartItems) {
      items.push({
        description: item.description,
        origin_country: 'USA',
        quantity: item.quantity,
        price: {
          amount: item.unit_price.amount,
          currency: item.unit_price.currency
        },
        weight: {
          value: 0.6,
          unit: 'kg'
        },
        sku: item.sku
      })
    }

    let data = {
      async: false,
      shipper_accounts: [
        {
          id: '6f43fe77-b056-45c3-bce4-9fec4040da0c'
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
          contact_name: `${formData.customer.name}`,
          street1: `${formData.shipping_address.line_1}`,
          city: `${formData.shipping_address.city}`,
          state: `${formData.shipping_address.county}`,
          postal_code: `${formData.shipping_address.postcode}`,
          country: `${formData.shipping_address.country}`,
          phone: '7657168649',
          email: `${formData.customer.country}`,
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

  async function shippingCost(convertedRates, shipping_provider) {
    dispatch({
      type: SET_SELCETED_RATES,
      payload: { convertedRates, shipping_provider }
    })
  }
  function setToggle() {
    dispatch({ type: SET_TOGGLE })
  }
  function setVariation(name, value) {
    console.log('e Hiiii=> ', value)

    dispatch({ type: SET_VARIATION, payload: { name, value } })
  }
  function cleanCart() {
    dispatch({ type: CLEAN_CART })
  }
  return (
    <Provider
      value={{
        ...state,
        ...props,
        cartId,
        isEmpty,
        addToCart,
        updateQuantity,
        removeFromCart,
        addPromotion,
        removePromotion: removeFromCart,
        deleteCart,
        shippingCostCalculate,
        shippingCost,
        cleanCart,
        setToggle,
        setVariation
      }}
    >
      {children}
    </Provider>
  )
}

export { CartProvider, Consumer as CartConsumer, CartContext }
