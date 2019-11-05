import React, { useContext, useState, useEffect } from 'react'
import { injectStripe } from 'react-stripe-elements'
import { CartContext, CheckoutContext } from '../../context'
import CartItemList from '../CartItemList'

const RiviewOrder = ({ stripe, formEnable }) => {
  const {
    cartId,
    shipping_address,
    deleteCart,
    customerDetails,
    rate
  } = useContext(CartContext)
  const { checkout, pay, paymentDetails } = useContext(CheckoutContext)
  const [checkoutError, setCheckoutError] = useState(null)

  const handleOrder = async () => {
    const billing_address = shipping_address
    try {
      const order = await checkout(
        cartId,
        customerDetails,
        shipping_address,
        billing_address,
        paymentDetails,
        rate
      )

      const token = await stripe.createToken({
        name: `${shipping_address.first_name} ${shipping_address.last_name}`,
        address_line1: shipping_address.line_1,
        address_line2: shipping_address.line_2,
        address_city: shipping_address.city,
        address_state: shipping_address.county,
        address_zip: shipping_address.postcode,
        address_country: shipping_address.country
      })

      await pay({
        gateway: 'stripe',
        method: 'purchase',
        orderId: order.id,
        payment: token.token.id
      })

      await deleteCart()
    } catch (errors) {
      console.info('errors ====>', JSON.stringify(errors))
      setCheckoutError(errors)
    }
  }
  return (
    <div className={`${!formEnable ? 'form-disable' : ''}`}>
      <h2 className="text-black font-medium leading-loose p-0 mb-3">
        <span>3</span>REVIEW ORDER{' '}
      </h2>
      <CartItemList locked />
      <div className="submit_btn">
        <button onClick={handleOrder}>COMPLETE ORDER</button>
      </div>
    </div>
  )
}

export default injectStripe(RiviewOrder)
