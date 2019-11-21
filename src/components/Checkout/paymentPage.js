import React, { useState, useContext, useEffect } from 'react'
import { Form } from 'react-final-form'
import { CardElement, injectStripe } from 'react-stripe-elements'
import { CheckoutContext, CartContext } from '../../context'
import ShippingSelectOption from './shippingSelectOption'
import stripeValidation from '../../validation/stripe'
import axios from 'axios'

const PaymentPage = ({ changeFormEnable, isEditable }) => {
  const {
    paymentButton,
    shipping_address,
    customerDetails,
    shippingProvider,
    rate,
    shippingRates,
    loading
  } = useContext(CartContext)
  const { paymentData, paymentDetails } = useContext(CheckoutContext)
  const [checkoutError, setCheckoutError] = useState(null)
  const [makeEnable, setMakeEnable] = useState(true)
  const enableForm =
    shippingRates &&
    shippingRates.map(
      charge => charge && charge.total_charge && charge.total_charge.amount
    )
  const data = {
    purchase_country: 'NL',
    purchase_currency: 'EUR',
    locale: 'en-UK',
    order_amount: 10,
    order_tax_amount: 0,
    order_lines: [
      {
        type: 'physical',
        reference: '19-402-USA',
        name: 'Battery Power Pack',
        quantity: 1,
        unit_price: 10,
        tax_rate: 0,
        total_amount: 10,
        total_discount_amount: 0,
        total_tax_amount: 0,
        image_url: 'https://www.exampleobjects.com/logo.png',
        product_url: 'https://www.estore.com/products/f2a8d7e34'
      }
    ]
  }

  const handleKlarna = () => {
    const user = 'K507866_685d9775ac26'
    const pass = 'agFslKUXy2L9fxpz'
    const url = 'https://api.playground.klarna.com/payments/v1/sessions'
    console.log('HandleKlarna method =====>')

    axios
      .post(url, data, {
        auth: {
          username: user,
          password: pass
        }
      })
      .then(response => {
        let client_token = response.data.client_token
        console.log('response ==> ', response)
        console.log('window ==> ', window)

        window.Klarna.Payments.init({
          client_token: client_token
        })
        console.log('Payments initialized')

        window.Klarna.Payments.load(
          {
            container: '#klarna_container',
            payment_method_category: 'pay_now'
          },
          function(res) {
            console.log('Load function called')
            console.debug(res)
          }
        )
      })
      .catch(error => {
        console.log('Error on Authentication', error)
      })
  }
  const handleAuthorize = () => {
    console.log('HandleAUthorize Method ======>')
    window.Klarna.Payments.authorize(
      {
        payment_method_category: 'pay_now'
      },
      {
        billing_address: {
          given_name: 'Jane',
          family_name: 'Doe',
          email: 'jane@doe.com',
          title: 'Ms',
          street_address: '512 City Park Ave',
          postal_code: '43215',
          city: 'Columbus',
          region: 'oh',
          phone: '6142607295',
          country: 'NL'
        },
        order_amount: 10,
        order_tax_amount: 0,
        order_lines: [
          {
            type: 'physical',
            reference: '19-402-USA',
            name: 'Battery Power Pack',
            quantity: 1,
            unit_price: 10,
            tax_rate: 0,
            total_amount: 10,
            total_discount_amount: 0,
            total_tax_amount: 0
          }
        ]
      },
      res => {
        console.log('Response from the authorize call:')
        console.log(res)
      }
    )
  }

  // useEffect(() => {
  //   let klarnaPayment = document.createElement('script')
  //   klarnaPayment.src = 'https://x.klarnacdn.net/kp/lib/v1/api.js'
  //   klarnaPayment.type = 'text/javascript'
  //   klarnaPayment.async = true
  //   klarnaPayment.onload = () => {
  //     setLoaded(true)
  //   }
  //   document.getElementsByTagName('head')[0].appendChild(klarnaPayment)
  // }, [])
  // useEffect(() => {
  //   window.klarnaAsyncCallback = function() {
  //     Klarna.Payments.init({
  //       client_token:
  //         'eyJhbGciOiJSUzI1NiJ9.ewogICJzZXNzaW9uX2lkIiA6ICI5OGE4ZWZiYS1hOWExLTczZWItOTY5Ny0wMzZiZjQ0ODhjMmMiLAogICJiYXNlX3VybCIgOiAiaHR0cHM6Ly9rbGFybmEtcGF5bWVudHMtZXUucGxheWdyb3VuZC5rbGFybmEuY29tIiwKICAiZGVzaWduIiA6ICJrbGFybmEiLAogICJsYW5ndWFnZSIgOiAiZW4iLAogICJwdXJjaGFzZV9jb3VudHJ5IiA6ICJOTCIsCiAgInRyYWNlX2Zsb3ciIDogZmFsc2UsCiAgImVudmlyb25tZW50IiA6ICJwbGF5Z3JvdW5kIiwKICAibWVyY2hhbnRfbmFtZSIgOiAiUGxheWdyb3VuZCBEZW1vIE1lcmNoYW50IiwKICAic2Vzc2lvbl90eXBlIiA6ICJQQVlNRU5UUyIsCiAgImNsaWVudF9ldmVudF9iYXNlX3VybCIgOiAiaHR0cHM6Ly9ldnQucGxheWdyb3VuZC5rbGFybmEuY29tIiwKICAiZXhwZXJpbWVudHMiIDogWyBdCn0.mSUD54se7qnjAOvyAmVl89L54eDvJH4OgGct7yBGg0ZXAsu7h595FgMHEhM_mY-ZZtV9odXGED68Dig1JIyqEU_GFGbBnYIQyjfBJ52akohkOksXmFQ7rMajmmQDYS1gnFB0wlheVlf8VNYTDMinwrFomLpxBAFM-kmnROJbotsMfHLG6epZv7suAU-IB_PdtSZZz_-6OJADTdWVkXDnniFstTyvSq8RyDo4mQPCvLTsvYKvIJuDtC81VSv5JTahWAQuy5Vq4pRSEImxzBsZ9G-oOxrOUJFzTRWrr0khJI5XvbMJ9GYqMbj6PZ66Ix3ly5c2tCeOqrLgUipEW0Xkfgw'
  //     })
  //     console.log('Payments initialized')

  //     Klarna.Payments.load(
  //       {
  //         container: '#klarna_container',
  //         payment_method_category: 'pay_now'
  //       },
  //       function(res) {
  //         console.log('Load function called')
  //         console.debug(res)
  //       }
  //     )
  //   }
  // }, [])

  // const [Loaded, setLoaded] = useState(false)
  const handlePayment = async values => {
    setMakeEnable(false)
    paymentData(values)
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
                  {/*
                  <div>
                    <button onClick={handleKlarna}>Payment with Klarna</button>
                  </div> */}
                  <div>
                    <button onClick={handleKlarna}>Pay with Klarna</button>
                  </div>
                  <div id="klarna_container"></div>
                  <div id="klarna-payments-container"></div>
                  <div>
                    <button onClick={handleAuthorize}>Your Buy Button</button>
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
