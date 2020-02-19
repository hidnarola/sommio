import React, { useContext, useState } from 'react'
import { Link } from 'gatsby'
import { ShippingAndUserDetailContext, CartContext } from '../context'
import CartItem from './CartItem'
import CartButton from './CartButton'

export default function CartItemList(props) {
  const { isAddToCart } = useContext(ShippingAndUserDetailContext)

  const { isEmpty, productSubTotal, total, shippingRate } = useContext(
    CartContext
  )

  console.log('CartItemList total => ', total)
  console.log('CartItemList shippingRate => ', shippingRate)

  if (isEmpty) return <p className="text-center">Your cart is empty</p>

  return (
    <div className="cartsliderbar-boby">
      <CartItem {...props} />

      {!isEmpty && props.cartButton ? (
        <div className="cartsliderbar-footer">
          <div className="total-list">
            <ul>
              <li>
                Subtotal(tax inc){' '}
                <span className="ml-auto">£ {productSubTotal}</span>
              </li>
              <li>
                Shipping{' '}
                <span className="ml-auto">
                  {shippingRate ? `£ ${shippingRate}` : 'Free'}
                </span>
              </li>
              <li>
                Total <span className="ml-auto">£ {total} </span>
              </li>
            </ul>
          </div>
          <Link
            to="/checkout"
            className="btn btn-info rounded-0 justify-content-center py-4 mx-2"
          >
            Checkout
          </Link>
        </div>
      ) : (
        <div className="checkout-footer">
          <div className="total-list">
            <ul>
              <li>
                Subtotal(tax inc){' '}
                <span className="ml-auto">£{productSubTotal} </span>
              </li>
              <li>
                Shipping{' '}
                <span className="ml-auto">
                  {shippingRate ? `£ ${shippingRate}` : 'Free'}
                </span>
              </li>
              <li>
                Total <span className="ml-auto">£{total} </span>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}
