import React, { useContext, useState } from 'react'
import { Link } from 'gatsby'
import { CartContext } from '../context'
import CartItem from './CartItem'
import PromotionManager from './PromotionManager'
import CartButton from './CartButton'

export default function CartItemList(props) {
  const {
    isEmpty,
    removeFromCartBuilton,
    shippingRate,
    cartItemsBuilton,
    countBuilton,
    subTotalBuilton,
    price,
    isAddToCart
  } = useContext(CartContext)

  if (isEmpty) return <p className="text-center">Your cart is empty</p>

  return (
    <div className="cartsliderbar-boby">
      {cartItemsBuilton &&
        cartItemsBuilton.map(item => {
          console.log('item => ', item)

          return (
            <CartItem
              key={item.id}
              removeFromCartBuilton={removeFromCartBuilton}
              id={item.id}
              {...item}
              {...props}
            />
          )
        })}
      {!isEmpty && props.cartButton ? (
        <div className="cartsliderbar-footer">
          <div className="total-list">
            <ul>
              <li>
                Subtotal(tax inc){' '}
                <span className="ml-auto">
                  £ {isAddToCart === true ? subTotalBuilton : price}
                </span>
              </li>
              <li>
                Shipping{' '}
                <span className="ml-auto">
                  {shippingRate ? `£ ${shippingRate}` : 'Free'}
                </span>
              </li>
              <li>
                Total{' '}
                <span className="ml-auto">
                  £ {isAddToCart === true ? subTotalBuilton : price}
                </span>
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
                <span className="ml-auto">
                  £{isAddToCart === true ? subTotalBuilton : price}
                </span>
              </li>
              <li>
                Shipping{' '}
                <span className="ml-auto">
                  {shippingRate ? `£ ${shippingRate}` : 'Free'}
                </span>
              </li>
              <li>
                Total{' '}
                <span className="ml-auto">
                  £
                  {isAddToCart === true
                    ? subTotalBuilton + shippingRate
                    : price + shippingRate}
                </span>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}
