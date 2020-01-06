import React, { useContext, useState } from 'react'
import { injectStripe } from 'react-stripe-elements'
import { CartContext, CheckoutContext } from '../../context'
import CartItemList from '../CartItemList'

const RiviewOrder = ({ stripe, formEnable }) => {
  const {
    cartId,
    shipping_address,
    customerDetails,
    builton,
    cartItemsBuilton,
    selectedCover,
    selectedWeight,
    quantityBuilton,
    deleteCart,
    shippingRate,
    toggle,
    shipmentProductId
  } = useContext(CartContext)
  const {
    checkout,
    paymentDetails,
    createOrderBuilton,
    paymentBuilton
  } = useContext(CheckoutContext)
  const [checkoutError, setCheckoutError] = useState(null)
  console.log('cartItemsBuilton ReviewOrder => ', cartItemsBuilton)

  const handleOrder = async () => {
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
              selectedWeight[0]._id._oid,
              selectedCover[0]._id._oid
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
        // payment_method: paymentMethod._id.$oid
      })

      // dispatch method
      await createOrderBuilton(createdOrder)

      // pay for the order
      const payBuilton = await builton.payments.pay(
        createdOrder.payments[0].$oid
      )
      //dispatch method
      await paymentBuilton(payBuilton)
    } catch (errors) {
      console.info('errors ====>', JSON.stringify(errors))
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
        <button onClick={handleOrder}>COMPLETE ORDER</button>
      </div>
    </div>
  )
}

export default injectStripe(RiviewOrder)
