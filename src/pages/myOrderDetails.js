import React, { useContext, useEffect } from 'react'
import axios from 'axios'
import { CheckoutContext, CartContext } from '../context/index'
import OrderItems from '../components/OrderItems'

const myOrderDetails = () => {
  // const {
  //   orderId,
  //   orderedItems,
  //   order_shipping_provider_name,
  //   order_shipping_cost,
  //   orderPrice
  // } = useContext(CheckoutContext)
  // const url = 'https://api.builton.dev/orders'
  // const token = localStorage.getItem('firebaseToken')

  // useEffect(() => {
  //   console.log(' Component DIdmount  => ')

  //   try {
  //     const response = axios.get(
  //       url,
  //       {},
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //           'X-Builton-Api-Key': process.env.GATSBY_BUILTON_API_KEY,
  //           'Content-Type': 'application/json'
  //         }
  //       }
  //     )
  //     console.log('response ORDERS ==>', response)
  //   } catch (error) {
  //     console.error(error)
  //   }
  // }, [])

  return (
    <div className="orderconfimatio-main">
      <h1>My orders</h1>
    </div>
  )
}
export default myOrderDetails
