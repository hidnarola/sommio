import React, { useState, useContext } from 'react'
import QuantityStepper from './QuantityStepper'
import { CartContext } from '../context/CartContext'
import Photo from './Photo'

function CartItem({
  id,
  name,
  sku,
  quantity,
  meta,
  image: { href },
  removeFromCart,
  locked,
  cartButton
}) {
  const {
    display_price: {
      without_tax: {
        unit: { formatted: unit },
        value: { formatted: value }
      }
    }
  } = meta

  const [removing, setRemoving] = useState(false)
  const { Weight, Size, Cover } = useContext(CartContext)

  async function onRemove() {
    await setRemoving(true)
    await removeFromCart(id)
  }

  return cartButton ? (
    <div className="cartsliderbar-item">
      <Photo cartImg="cartImg" src={href} alt={name} />
      <div className="content">
        <h4>{name}</h4>
        <ul>
          <li>Size: {Size}</li>
          <li>Weight: {Weight} kg</li>
          <li>Cover: {Cover}</li>
        </ul>
        <div className="price">{value}</div>
      </div>
      <div className="qty-remove ml-auto">
        {!locked && <QuantityStepper itemId={id} quantity={quantity} />}
        {!locked && (
          <a className="remove-link" onClick={onRemove}>
            Remove
          </a>
        )}
      </div>
    </div>
  ) : (
    <div className="revieworder-box">
      <Photo cartImg="cartImg" src={href} alt={name} />
      <div className="content">
        <h5>{name}</h5>
        <span className="qty-text">
          {quantity}x{unit}
        </span>
      </div>
      <div className="price ml-auto">{value}</div>
    </div>
  )
}

export default CartItem
