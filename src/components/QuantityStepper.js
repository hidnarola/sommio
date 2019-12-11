import React, { useContext } from 'react'

import { CartContext } from '../context'

export default function QuantityStepper({ itemId }) {
  // console.log('quantity sr => ', quantity)

  const {
    updateQuantityBuilton,
    subTotalBuilton,
    quantityBuilton
  } = useContext(CartContext)
  const decrease = () => updateQuantityBuilton(itemId, quantityBuilton - 1)
  const increase = () => updateQuantityBuilton(itemId, quantityBuilton + 1)

  return (
    <span className="flex justify-between items-center qty-boxs">
      <button
        onClick={increase}
        className="appearance-none focus:outline-none minus-icon"
      ></button>

      <span className="quantity-text">{quantityBuilton}</span>
      {quantityBuilton !== 1 && (
        <button
          onClick={decrease}
          className="appearance-none focus:outline-none plus-icon"
        ></button>
      )}
    </span>
  )
}
