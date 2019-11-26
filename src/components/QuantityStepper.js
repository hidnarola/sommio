import React, { useContext } from 'react'

import { CartContext } from '../context'

export default function QuantityStepper({ itemId, quantity }) {
  console.log('quantity sr => ', quantity)

  const {
    updateQuantityBuilton,
    subTotalBuilton,
    mainProductPrice
  } = useContext(CartContext)
  console.log(
    'subTotalBuilton, mainProductPrice => ',
    subTotalBuilton,
    mainProductPrice
  )

  const decrease = () => updateQuantityBuilton(itemId, quantity - 1)
  const increase = () => updateQuantityBuilton(itemId, quantity + 1)

  return (
    <span className="flex justify-between items-center qty-boxs">
      <button
        onClick={increase}
        className="appearance-none focus:outline-none minus-icon"
      ></button>

      <span className="quantity-text">{quantity}</span>
      {quantity !== 1 && (
        <button
          onClick={decrease}
          className="appearance-none focus:outline-none plus-icon"
        ></button>
      )}
    </span>
  )
}
