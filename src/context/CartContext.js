import React, { useContext, createContext, useReducer, useEffect } from 'react'
import { createCartIdentifier } from '@moltin/request'
import { toast, ToastType } from 'react-toastify'
import axios from 'axios'
// import { MoltinContext } from '.'
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
export const SET_BUILTON_PRODUCT_PRICE = 'SET_BUILTON_PRODUCT_PRICE'
export const SET_BUILTON_CART_DATA = 'SET_BUILTON_CART_DATA'
export const USER_DETAIL_BUILTON = 'USER_DETAIL_BUILTON'
export const CART_BUILTON = 'CART_BUILTON'

export const initialState = {
  builton: '',
  user: { email: '', password: '' },
  isAddToCart: false,
  price: 0,
  subTotalBuilton: 0,
  mainProductPrice: 0,
  wiehtPrice: 0,
  coverPrice: 0,
  Size: 'single',
  Weight: '12 kg',
  Cover: 'Plush',
  quantityBuilton: 0,
  countBuilton: 0,
  cartItemsBuilton: [],
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
      const shipping_address = action.shippingData.shipping_address
      const customerDetails = action.user
      console.log('action SET_ADDRESS => ', action)

      const paymentButton = true

      return {
        ...state,
        shipping_address,
        customerDetails,
        paymentButton: paymentButton
      }

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

      return {
        ...state,
        weightPrice: weightPrice,
        coverPrice: coverPrice,
        selectedWeight,
        selectedCover
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
      const mainProductPrice = cartItemsBuilton[0] && cartItemsBuilton[0].price

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
        // } else {
        // const cartItemsBuilton = action.payload
        const isActive = cartItemsBuilton[0].isAddToCart
        return {
          ...state,
          cartItemsBuilton: cartItemsBuilton,
          countBuilton,
          subTotalBuilton: subTotalBuilton,
          quantityBuilton: quantityBuilton,
          mainProductPrice,
          isAddToCart: cartItemsBuilton[0].isAddToCart
        }
      }

    case USER_DETAIL_BUILTON:
      const builton = action.builton
      return {
        ...state,
        user: action.data,
        builton: builton
      }
    case CART_BUILTON:
      // const {} = a
      console.log('action => ', action)
      const CartBuiltonMethod =
        state.builton &&
        state.builton.cart.addProduct({
          productId: cartItemsBuilton[0] && cartItemsBuilton[0].id,
          quantity: quantityBuilton
        })
      console.log('CartBuiltonMethod => ', CartBuiltonMethod)
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
  // const { moltin } = useContext(MoltinContext)
  const [state, dispatch] = useReducer(reducer, initialState)
  const [cartId, setCartId] = useLocalStorage('mcart', initialCartId)
  const isEmpty = state.countBuilton === 0

  useEffect(() => {
    // getCart(cartId)
    setCartId(cartId)
  }, [cartId])

  // async function getCart(id) {
  //   const payload = await moltin.get(`carts/${id}/items`)
  //   dispatch({ type: SET_CART, payload })
  // }

  // async function addToCart(id, quantity, size, weight, cover, subTotal, rate) {
  //   const payload = await moltin.post(`carts/${cartId}/items`, {
  //     type: 'cart_item',
  //     id,
  //     quantity,
  //     variations: { size, weight, cover }
  //   })
  //   dispatch({ type: SET_CART, payload })
  //   // toast.success(
  //   //   `Added ${quantity} ${quantity > 1 ? 'items' : 'item'} to cart`
  //   // )
  // }

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
  // async function removeFromCart(id) {
  //   const payload = await moltin.delete(`carts/${cartId}/items/${id}`)

  //   dispatch({ type: SET_CART, payload })

  //   toast.success('Item removed from cart')
  // }
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
  // async function addPromotion(code) {
  //   const payload = await moltin.post(`carts/${cartId}/items`, {
  //     type: 'promotion_item',
  //     code
  //   })

  //   dispatch({ type: SET_CART, payload })

  //   toast.success('Promotion applied')
  // }

  // async function deleteCart(id) {
  //   await moltin.delete(`carts/${id || cartId}`)

  //   dispatch({ type: RESET_CART })
  // }

  const shippingCostCalculate = async (
    user,
    shippingData,
    cartItemsBuilton
  ) => {
    dispatch({ type: SET_ADDRESS, user, shippingData })

    var items = []
    for (const item of cartItemsBuilton) {
      items.push({
        description: item.description,
        origin_country: 'USA',
        quantity: item.quantityBuilton,
        price: item.price,
        weight: {
          value: 0.6,
          unit: 'kg'
        },
        sku: item.human_id
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
          contact_name: `${shippingData.shipping_address.name}`,
          street1: `${shippingData.shipping_address.line_1}`,
          city: `${shippingData.shipping_address.city}`,
          state: `${shippingData.shipping_address.county}`,
          postal_code: `${shippingData.shipping_address.postcode}`,
          country: `${shippingData.shipping_address.country}`,
          phone: '7657168649',
          email: `${user.email}`,
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
  function setVariation(name, value, price) {
    console.log('e Hiiii => ', value, price)

    dispatch({
      type: SET_VARIATION,
      payload: { name, value, price }
    })
  }
  // function cleanCart() {
  //   dispatch({ type: CLEAN_CART })
  // }
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
  const setCartData = cartItemsBuilton => {
    //Add cart Data
    dispatch({
      type: SET_BUILTON_CART_DATA,
      payload: cartItemsBuilton
    })
  }
  const setUserBuilton = (data, builton) => {
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
        cartBuilton
      }}
    >
      {children}
    </Provider>
  )
}

export { CartProvider, Consumer as CartConsumer, CartContext }
