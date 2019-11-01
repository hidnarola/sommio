import React, { useContext, useState } from 'react'
import { Link } from 'gatsby'
import { CartContext } from '../context'
import CartItem from './CartItem'
import PromotionManager from './PromotionManager'
import CartButton from './CartButton'

export default function CartItemList(props) {
  console.log('props => ',props);

  const { isEmpty, cartItems, subTotal, removeFromCart, rate } = useContext(
    CartContext
  )
  console.log('subTotal => ', subTotal)

  if (isEmpty) return <p className="text-center">Your cart is empty</p>

  return (
    <div className="cartsliderbar-boby">
      {cartItems &&
        cartItems.map(item => (
          <CartItem
            key={item.id}
            removeFromCart={removeFromCart}
            {...item}
            {...props}
          />
        ))}
      {!isEmpty && (
        <div className="cartsliderbar-footer">
          <div className="total-list">
            <ul>
              <li>
                Subtotal(tax inc) <span className="ml-auto">£{subTotal}</span>
              </li>
              <li>
                Shipping{' '}
                <span className="ml-auto">{rate ? `£ ${rate}` : 'Free'}</span>
              </li>
              <li>
                Total <span className="ml-auto">£{subTotal + rate}</span>
              </li>
            </ul>
          </div>
          {props.cartButton && <Link
            to="/checkout"
            className="btn btn-info rounded-0 justify-content-center py-4 mx-2"
          >
            Checkout
          </Link>}
        </div>
      )}
    </div>
  )
}
