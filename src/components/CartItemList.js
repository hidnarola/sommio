import React, { useContext, useState } from 'react'

import { CartContext } from '../context'
import CartItem from './CartItem'
import PromotionManager from './PromotionManager'

export default function CartItemList(props) {
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
    </div>
  )
}
