import React, { useContext } from 'react'

import { CartContext } from '../context'

export default function QuantityStepper({ itemId, quantity }) {
  const { updateQuantity } = useContext(CartContext)

  const decrease = () => updateQuantity(itemId, quantity - 1)
  const increase = () => updateQuantity(itemId, quantity + 1)

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
