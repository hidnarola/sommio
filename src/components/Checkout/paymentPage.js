import React, { useState, useContext, useEffect } from 'react'
import { Form } from 'react-final-form'
import { CardElement, injectStripe } from 'react-stripe-elements'
import { CheckoutContext, CartContext } from '../../context'
import ShippingSelectOption from './shippingSelectOption'
import stripeValidation from '../../validation/stripe'
import axios from 'axios'
// import { Stripe } from 'stripe'
const PaymentPage = ({ changeFormEnable, isEditable }) => {
  const {
    paymentButton,
    shipping_address,
    customerDetails,
    shippingProvider,
    rate,
    shippingRates,
    loading,
    cartItemsBuilton,
    builton,
    quantityBuilton,
    selectedWeight,
    selectedCover
  } = useContext(CartContext)
  const { paymentData, paymentDetails } = useContext(CheckoutContext)
  const [checkoutError, setCheckoutError] = useState(null)
  const [makeEnable, setMakeEnable] = useState(true)
  const enableForm =
    shippingRates &&
    shippingRates.map(
      charge => charge && charge.total_charge && charge.total_charge.amount
    )
  console.log(
    'builton, selectedWeight , selectedWeight =>',
    builton,
    selectedWeight,
    selectedCover
  )
  // const stripe = Stripe('pk_test_OMZZBUdSNLooBVYfSXLuBKcc00tOVakJkI') // From Builton Dashboard
  // const elements = stripe.elements()
  console.log('builton => ', builton)

  const handlePayment = async values => {
    setMakeEnable(false)
    paymentData(values)
    //creating USER
    await builton.users.authenticate({
      first_name: shipping_address && shipping_address.first_name,
      last_name: shipping_address && shipping_address.last_name,
      email: customerDetails && customerDetails.email
    })
  }
  const enable = () => {
    setMakeEnable(true)
    changeFormEnable(false)
  }

  // Stripe JS custom styles
  const stripeStyle = {
    base: {
      color: '#131313',
      fontFamily:
        '-apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
      fontSize: '16px',
      '::placeholder': {
        color: '#B3B3B3'
      }
    },
    invalid: {
      color: '#E62F17',
      ':focus': {
        color: '#E62F17'
      }
    }
  }

  return (
    <>
      <div className={`${makeEnable ? 'visible' : 'hidden'}`}>
        <div
          className={`sipping_cart_inner ${!isEditable ? 'form-disable' : ''}`}
        >
          <p className="text-black font-medium leading-loose p-0 mb-3">
            Shipping Method
          </p>
          <ShippingSelectOption />

          <Form onSubmit={handlePayment} validate={stripeValidation}>
            {({
              handleSubmit,
              submitting,
              pristine,
              invalid,
              form,
              values
            }) => {
              const onStripeChange = e => form.change('stripe', e)
              return (
                <form onSubmit={handleSubmit}>
                  {checkoutError && (
                    <div className="bg-red text-white p-3 text-center">
                      {checkoutError}
                    </div>
                  )}
                  <div>
                    <div className="my-2 w-full">
                      <div className="bg-yellow text-sm p-3 my-6">
                        Use the test card{' '}
                        <pre className="inline">4242 4242 4242 4242</pre> and
                        any future expiry and CVC below to checkout.
                      </div>

                      <CardElement
                        name="st"
                        onChange={onStripeChange}
                        hidePostalCode={true}
                        id="payment"
                        style={stripeStyle}
                      />
                      {values.stripe && values.stripe.error && (
                        <span className="text-red text-sm">
                          {values.stripe.error.message}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="submit_btn">
                    <p className="text-sm text-center mb-3">
                      By clicking the button below you agree to our terms of
                      sale.
                    </p>

                    <button
                      type="submit"
                      disabled={invalid}
                      onClick={changeFormEnable}
                    >
                      NEXT
                    </button>
                  </div>
                </form>
              )
            }}
          </Form>
        </div>
      </div>
      <div className={`${makeEnable ? 'hidden' : 'visible'}`}>
        <div className="mb-10">
          <h4 className="mb-3">Shipping Method</h4>
          <p className="mb-1">Shipping Provider : {shippingProvider}</p>
          <p>Shipping cost :{rate}</p>
        </div>
        <div className="mb-10">
          <h4 className="mb-3">Payment</h4>
          <p>
            {paymentDetails && paymentDetails.stripe.brand}{' '}
            {paymentDetails && paymentDetails.stripe.elementType}
          </p>
        </div>

        <div className="submit_btn">
          <button className="btn btn-outline-secondary" onClick={enable}>
            Edit
          </button>
        </div>
      </div>
    </>
  )
}

export default PaymentPage
