import React, { useContext } from 'react'
import _ from 'lodash'

import { CartContext, TestCartContext } from '../context'

export default function QuantityStepper({ product }) {
  const { subTotalBuilton, quantityBuilton, products } = useContext(CartContext)
  const { update_cart, testProductArray } = useContext(TestCartContext)

  const increase = () => update_cart(product, 1)
  const decrease = () => update_cart(product, 0)

  return (
    <span className="flex justify-between items-center qty-boxs">
      <button
        onClick={increase}
        className="appearance-none focus:outline-none minus-icon"
      ></button>

      <span className="quantity-text">{product.quantityBuilton}</span>
      {product.quantityBuilton !== 1 && (
        <button
          onClick={decrease}
          className="appearance-none focus:outline-none plus-icon"
        ></button>
      )}
    </span>
  )
}
