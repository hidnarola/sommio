import React, { useState, useContext, useEffect, useRef } from 'react'
// import { Link } from 'gatsby'
import { CartContext, CheckoutContext } from '../context'
import ShippingAddress from '../components/Checkout/shippingAddress'
import PaymentPage from '../components/Checkout/paymentPage'
import ReviewOrder from '../components/Checkout/RiviewOrder'
import OrderConfirmation from '../components/Checkout/OrderConfirmation'
const CheckoutPage = () => {
  const { isEmpty } = useContext(CartContext)

  const { defaultPayment, checkoutClear } = useContext(CheckoutContext)
  const [formEnable, setFormEnable] = useState(false)
  const [isEditable, setIsEditable] = useState(false)
  const isMounted = useRef(true)

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

  if (defaultPayment && defaultPayment === true) return <OrderConfirmation />
  if (isEmpty && !defaultPayment)
    return <p className="text-center">Your cart is empty</p>

  return (
    <React.Fragment>
      <div className="flex flex-wrap lg:-mx-4">
        <div className="custom_cart">
          <div className={'cart_first' + (!isEditable ? ' purple' : ' ')}>
            <ShippingAddress
              isCompleted={isEditable}
              toggleEditable={status => setIsEditable(status)}
            />
          </div>
          <div
            className={
              'cart_second' + (isEditable && !formEnable ? ' purple' : ' ')
            }
          >
            <h2 className="text-black font-medium leading-loose p-0 mb-3">
              <span>2</span>PAYMENT INFORMATION{' '}
            </h2>
            <PaymentPage
              changeFormEnable={status => setFormEnable(status)}
              isEditable={isEditable}
            />
          </div>
          <div className={'cart_third' + (formEnable ? ' purple' : ' ')}>
            <ReviewOrder formEnable={formEnable} />
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}
export default CheckoutPage
