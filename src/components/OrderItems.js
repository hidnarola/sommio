import React, { useContext } from 'react'
import { CartContext, CheckoutContext } from '../context'
import CartItem from './CartItem'
const OrderItems = props => {
  const {
    orderCartItems,
    removeFromCart,
    shippingRate,
    isAddToCart,
    subTotalBuilton,
    price
  } = useContext(CartContext)
  const { orderPrice, totalProductQuantity } = useContext(CheckoutContext)
  const orderDetails = JSON.parse(sessionStorage.getItem('cartDetails'))[0]

  return (
    <div>
      <div>
        {orderCartItems &&
          orderCartItems.map(item => (
            <CartItem
              key={item.id}
              removeFromCart={removeFromCart}
              {...item}
              {...props}
            />
          ))}
        <div className="border-grey-light pt-2 md:pt-4 lg:pt-6 w-full ">
          <div className="total-page">
            <h4 className="text-grey">Quanity </h4>
            <h4>{orderDetails && orderDetails.quantityBuilton}</h4>
          </div>
        </div>
      </div>
      <div className="border-grey-light pt-2 md:pt-4 lg:pt-6 w-full text-right">
        <div className="total-page">
          <h4 className="text-grey">Subtotal</h4>
          {/* <div>£ {isAddToCart === true ? subTotalBuilton : price} </div> */}
          <div>£ {orderDetails && orderDetails.final_price}</div>
        </div>
        <div className="total-page">
          <h4 className="text-grey">Shipping Cost</h4>
          <h4>£ {shippingRate} </h4>
        </div>
        <hr></hr>
        <div className="total-page text-black">
          <h4 className="text-grey">Total</h4>
          <h4>£ {orderPrice} </h4>
        </div>
      </div>
    </div>
  )
}

export default OrderItems
