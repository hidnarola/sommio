import React, { useState, useContext, useEffect, useRef } from 'react'
// import { Link } from 'gatsby'
import jwt from 'jsonwebtoken'
import Builton from '@builton/core-sdk'
import { CartContext, CheckoutContext } from '../context'
import ShippingAddress from '../components/Checkout/shippingAddress'
import PaymentPage from '../components/Checkout/paymentPage'
import ReviewOrder from '../components/Checkout/RiviewOrder'
import OrderConfirmation from '../components/Checkout/OrderConfirmation'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import RegiserOrLogin from '../components/Checkout/RegisterOrLogin'
const CheckoutPage = () => {
  const {
    isEmpty,
    customerDetails,
    cartItemsBuilton,
    quantityBuilton,
    builton
  } = useContext(CartContext)

  const { defaultPayment, checkoutClear } = useContext(CheckoutContext)
  const [formEnable, setFormEnable] = useState(false)
  const [isEditable, setIsEditable] = useState(false)
  const isMounted = useRef(true)
  const [modal, setModal] = useState(false)
  console.log('modal USERACC => ', modal)

  const toggle = () => setModal(!modal)

  useEffect(() => {
    let element = document.getElementsByTagName('body')[0]
    if (isMounted) {
      element.classList.add('so-checkout-page')
      toggle()
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
          <div>
            <Modal isOpen={modal} toggle={toggle}>
              <ModalHeader toggle={toggle}>User Account</ModalHeader>
              <ModalBody>
                <RegiserOrLogin isModal={true} toggle={toggle} />
              </ModalBody>
            </Modal>
          </div>
          <div
            className={
              'cart_second' + (isEditable && !formEnable ? ' purple' : ' ')
            }
          >
            <h2 className="text-black font-medium leading-loose p-0 mb-3">
              <span>2</span>
              <span className="text">PAYMENT INFORMATION</span>{' '}
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
