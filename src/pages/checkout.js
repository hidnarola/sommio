

import React, { useState, useContext, useEffect, useRef } from 'react'

import { Link } from 'gatsby'
import { injectStripe } from 'react-stripe-elements'
import { CartContext, CheckoutContext } from '../context'
import PageTitle from '../components/PageTitle'
import CartItemList from '../components/CartItemList'
import ShippingAddress from '../components/shippingAddress'
import PaymentPage from '../components/paymentPage'

function CheckoutPage({ stripe }) {
  console.log('stripe main => ',stripe);
  const {
    cartId,
    isEmpty,
    shipping_address,
    rate,
    deleteCart,
    customerDetails
  } = useContext(CartContext)

  const {
    defaultPayment,
    orderId,
    checkoutClear,
    checkout,
    pay,
    paymentDetails
  } = useContext(CheckoutContext)
  const [formEnable, setFormEnable] = useState(false)
  const [isEditable, setIsEditable] = useState(false)
  const isMounted = useRef(true)
  const [checkoutError, setCheckoutError] = useState(null)

  useEffect(() => {
    let element = document.getElementsByTagName('body')[0]
    if (isMounted) {
      element.classList.add('so-checkout-page')
      isMounted.current = false
    }
    return () => {
      element.classList.remove('so-checkout-page')
      checkoutClear()
    }
  }, [])

  const changeFormEnable = () => {
    setFormEnable(!formEnable)
  }

  if (defaultPayment && defaultPayment === true)
    return (
      <div className="text-center py-12">
        <svg
          className="text-black w-24 h-24 mx-auto mb-6"
          xmlns="http://www.w3.org/2000/svg"
          width="80"
          height="80"
          viewBox="0 0 80 80"
        >
          <g fill="none" fillRule="evenodd">
            <circle
              className="stroke-current"
              cx="40"
              cy="40"
              r="39"
              strokeWidth="2"
            />
            <polyline
              className="stroke-current"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3"
              points="24.5 41.5 34.5 51.5 55.5 30.5"
            />
          </g>
        </svg>
        <h3 className="text-center text-3xl text-black">Order completed</h3>
        <p className="text-center text-grey mb-6">Thank for your order!</p>
        {orderId && orderId && (
          <p className="text-center text-grey mb-6">
            OREDER ID: <span className="font-mono text-sm">{orderId}</span>
          </p>
        )}

        <Link
          to="/"
          className="inline-block appearance-none bg-black border border-black text-white          hover:text-white px-4 py-3 leading-tight rounded-none focus:outline-none no-underline"
        >
          Continue shopping &rarr;
        </Link>
      </div>
    )
  if (isEmpty && !defaultPayment)
    return <p className="text-center">Your cart is empty</p>

  async function handleOrder() {
    console.log('stripe => ',stripe);
    let billing_address = shipping_address
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
    <React.Fragment>
      <div className="flex flex-wrap lg:-mx-4">
        <div className="custom_cart">
          <div className="cart_first">
            <ShippingAddress
              isCompleted={isEditable}
              toggleEditable={status => setIsEditable(status)}
            />
          </div>
          <div className="cart_second">
            <h2 className="text-black font-medium leading-loose p-0 mb-3">
              <span>2</span>PAYMENT INFORMATION{' '}
            </h2>

            <PaymentPage
              changeFormEnable={status => setFormEnable(status)}
              isEditable={isEditable}
            />
          </div>
          <div className="cart_third">
            <div className={` ${!formEnable ? 'form-disable' : ''}`}>
              <h2 className="text-black font-medium leading-loose p-0 mb-3">
                <span>2</span>REVIEW ORDER{' '}
              </h2>
              <CartItemList locked />
              <div className="submit_btn">
                <button onClick={handleOrder}>COMPLETE ORDER</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}
CheckoutPage = injectStripe(CheckoutPage);
export default CheckoutPage;
