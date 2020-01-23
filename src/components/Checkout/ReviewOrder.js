import React, { useContext, useState } from 'react'
import { injectStripe } from 'react-stripe-elements'
import axios from 'axios'
import { CartContext, CheckoutContext } from '../../context'
import CartItemList from '../CartItemList'
import Loader from '../Loader'
const RiviewOrder = ({ stripe, formEnable }) => {
  const {
    shipping_address,
    builton,
    cartItemsBuilton,
    selectedCover,
    selectedWeight,
    quantityBuilton,
    shipmentProductId
  } = useContext(CartContext)
  const { createOrderBuilton, paymentBuilton } = useContext(CheckoutContext)
  const [checkoutError, setCheckoutError] = useState(null)
  let dataFromStorage = JSON.parse(sessionStorage.getItem('cartDetails'))[0]

  const selectedWeightFromStorage =
    dataFromStorage && dataFromStorage.subProduct.selectedWeight[0]._id._oid

  const selectedCoverFromStorage =
    dataFromStorage && dataFromStorage.subProduct.selectedCover[0]._id._oid

  const [isLoading, setLoading] = useState(false)
  const handleOrder = async () => {
    setLoading(true)
    try {
      //Stripe token
      const token = await stripe.createToken({
        name: `${shipping_address.first_name} ${shipping_address.last_name}`,
        address_line1: shipping_address.line_1,
        address_line2: shipping_address.line_2,
        address_city: shipping_address.city,
        address_state: shipping_address.county,
        address_zip: shipping_address.postcode,
        address_country: shipping_address.country
      })

      //creating payment
      const paymentMethod = await builton.paymentMethods.create({
        payment_method: 'stripe',
        token: token.token.id
      })

      //creating orders
      const createdOrder = await builton.orders.create({
        items: [
          {
            product: cartItemsBuilton[0].main_product_id,
            quantity: quantityBuilton,
            sub_products: [
              selectedWeightFromStorage
                ? selectedWeightFromStorage
                : selectedCover[0]._id._oid,
              selectedCoverFromStorage
                ? selectedCoverFromStorage
                : selectedWeight[0]._id._oid
            ]
          },
          {
            //for 1 time calculate the shipping cost
            product: shipmentProductId,
            quantity: 1
          }
        ],
        delivery_address: {
          street_name: shipping_address.line_1,
          state: shipping_address.county,
          city: shipping_address.city,
          country: shipping_address.country,
          zip_code: shipping_address.postcode
        },
        payment_method: paymentMethod.id
      })

      // dispatch method
      createOrderBuilton(createdOrder)

      // pay for the order
      const payBuilton = await builton.payments.pay(
        createdOrder.payments[0].$oid
      )
      //dispatch method
      paymentBuilton(payBuilton)

      setLoading(false)
    } catch (errors) {
      console.info('errors ====>', JSON.stringify(errors), errors)
      setCheckoutError(errors)
    }
  }
  return (
    <div className={`${!formEnable ? 'form-disable' : ''}`}>
      <h2 className="text-black font-medium leading-loose p-0 mb-3">
        <span>3</span>
        <span className="text">REVIEW ORDER</span>{' '}
      </h2>
      <CartItemList locked />
      <div className="submit_btn">
        {isLoading === true ? (
          <Loader />
        ) : (
          <button
            onClick={handleOrder}
            disabled={isLoading === true ? true : false}
          >
            COMPLETE ORDER
          </button>
        )}
        {/* <button
          onClick={handleOrder}
          disabled={isLoading === true ? true : false}
        > */}
      </div>
    </div>
  )
}

export default injectStripe(RiviewOrder)
