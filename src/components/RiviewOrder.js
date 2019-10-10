import React, { useContext, useState, useEffect } from 'react'
import { injectStripe } from 'react-stripe-elements'
import { CartContext, CheckoutContext } from '../context'
import CartItemList from './CartItemList'

let RiviewOrder = ({ stripe, formEnable }) => {
  console.info('stripe on render ======>', stripe )
  const {
    cartId,
    shipping_address,
    deleteCart,
    customerDetails,
    rate
  } = useContext(CartContext)
  const { defaultPayment, checkout, pay, paymentDetails } = useContext(
    CheckoutContext
  )
  const [checkoutError, setCheckoutError] = useState(null)

  async function handleOrder() {
    let billing_address = shipping_address
    // let Promises = [
    //   checkout(
    //     cartId,
    //     customerDetails,
    //     shipping_address,
    //     billing_address,
    //     paymentDetails,
    //     rate
    //   ),
    //   stripe.createToken({
    //     type: 'card',
    //     name: `${shipping_address.first_name} ${shipping_address.last_name}`,
    //     address_line1: shipping_address.line_1,
    //     address_line2: shipping_address.line_2,
    //     address_city: shipping_address.city,
    //     address_state: shipping_address.county,
    //     address_zip: shipping_address.postcode,
    //     address_country: shipping_address.country
    //   })
    // ]

    // Promise.all(Promises)
    //   .then(resp => {
    //     let order = resp[0]
    //     let token = resp[1]

    //     pay({
    //       gateway: 'stripe',
    //       method: 'purchase',
    //       orderId: order.id,
    //       payment: token.token.id
    //     })
    //       .then(resp => {
    //         console.info('Pay resp ====>', resp)
    //       })
    //       .catch(err => {
    //         console.info('Pay err ====>', err)
    //       })
    //   })
    //   .catch(err => {
    //     console.info('err ====>', err)
    //   })

    try {
      const order = await checkout(
        cartId,
        customerDetails,
        shipping_address,
        billing_address,
        paymentDetails,
        rate
      )

      console.log('shipping_address before token => ',shipping_address);
      const token = await stripe.createToken({
        name: `${shipping_address.first_name} ${shipping_address.last_name}`,
        address_line1: shipping_address.line_1,
        address_line2: shipping_address.line_2,
        address_city: shipping_address.city,
        address_state: shipping_address.county,
        address_zip: shipping_address.postcode,
        address_country: shipping_address.country
      })
      console.log('shipping_address after token => ',shipping_address);

      await pay({
        gateway: 'stripe',
        method: 'purchase',
        orderId: order.id,
        payment: token.token.id
      })

      await deleteCart()
    } catch (errors) {
      console.info("errors ====>", errors)
      console.info("errors ====>", JSON.stringify(errors))
      setCheckoutError(errors)
    }
  }
  return (
    <div className={` ${!formEnable ? 'form-disable' : ''}`}>
      <h2 className="text-black font-medium leading-loose p-0 mb-3">
        <span>2</span>REVIEW ORDER{' '}
      </h2>
      <CartItemList locked />
      <div className="submit_btn">
        <button onClick={handleOrder}>COMPLETE ORDER</button>
      </div>
    </div>
  )
}

RiviewOrder = injectStripe(RiviewOrder)
export default RiviewOrder
