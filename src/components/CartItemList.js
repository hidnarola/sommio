import React, { useContext, useState } from 'react'
import { Link } from 'gatsby'
import { CartContext } from '../context'
import CartItem from './CartItem'
import PromotionManager from './PromotionManager'
import CartButton from './CartButton'

export default function CartItemList(props) {
  console.log('props => ', props)

  const {
    isEmpty,
    cartItems,
    subTotal,
    removeFromCartBuilton,
    rate,
    weightPrice,
    coverPrice,
    cartItemsBuilton,
    countBuilton,
    subTotalBuilton
  } = useContext(CartContext)

  if (isEmpty) return <p className="text-center">Your cart is empty</p>
  console.log('cartItemsBuilton => ', cartItemsBuilton)

  return (
    <div className="cartsliderbar-boby">
      {cartItemsBuilton &&
        cartItemsBuilton.map(item => (
          <CartItem
            key={item.id}
            removeFromCartBuilton={removeFromCartBuilton}
            id={item.id}
            {...item}
            {...props}
          />
        ))}

      {!isEmpty && props.cartButton ? (
        <div className="cartsliderbar-footer">
          <div className="total-list">
            <ul>
              <li>
                Subtotal(tax inc){' '}
                <span className="ml-auto">£{subTotalBuilton}</span>
              </li>
              <li>
                Shipping{' '}
                <span className="ml-auto">{rate ? `£ ${rate}` : 'Free'}</span>
              </li>
              <li>
                Total <span className="ml-auto">£{subTotalBuilton + rate}</span>
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
                <span className="ml-auto">£{subTotalBuilton}</span>
              </li>
              <li>
                Shipping{' '}
                <span className="ml-auto">{rate ? `£ ${rate}` : 'Free'}</span>
              </li>
              <li>
                Total <span className="ml-auto">£{subTotalBuilton + rate}</span>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}
