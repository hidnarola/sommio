import React, { useContext } from 'react'
import { CartContext, CheckoutContext, TestCartContext } from '../context'
import CartItem from './CartItem'
import Photo from './Photo'
const OrderItems = props => {
  const { isAddToCart, Size } = useContext(CartContext)
  const { orderPrice, totalProductQuantity } = useContext(CheckoutContext)
  const {
    productSubTotal,
    total,
    shippingRate,
    testProductsArray
  } = useContext(TestCartContext)
  const orderDetails = JSON.parse(sessionStorage.getItem('cartDetails'))[0]

  return (
    <div>
      <div>
        {testProductsArray &&
          testProductsArray.map(item => <CartItem {...item} {...props} />)}
        <div className="border-grey-light pt-2 md:pt-4 lg:pt-6 w-full ">
          <div className="total-page">
            <h4 className="text-grey">Quanity </h4>
            <h4>{totalProductQuantity}</h4>
          </div>
        </div>
      </div>
      <div className="border-grey-light pt-2 md:pt-4 lg:pt-6 w-full text-right">
        <div className="total-page">
          <h4 className="text-grey">Subtotal</h4>
          <div>£ {productSubTotal}</div>
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
