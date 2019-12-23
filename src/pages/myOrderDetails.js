import React, { useContext } from 'react'
import { CheckoutContext, CartContext } from '../context/index'
import OrderItems from '../components/OrderItems'
const myOrderDetails = () => {
  const { shipping_address, user } = useContext(CartContext)
  const {
    orderId,
    orderedItems,
    order_shipping_provider_name,
    order_shipping_cost,
    orderPrice
  } = useContext(CheckoutContext)
  return (
    <div className="orderconfimatio-main">
      <h1>My orders</h1>
    </div>
  )
}
export default myOrderDetails
