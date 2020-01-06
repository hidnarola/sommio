import React, { useState, useContext } from 'react'
import QuantityStepper from './QuantityStepper'
import { CartContext } from '../context/CartContext'
import Photo from './Photo'

function CartItem({
  id,
  name,
  image_url,
  media,
  locked,
  cartButton,
  removeFromCartBuilton
}) {
  const [removing, setRemoving] = useState(false)
  const {
    Weight,
    Size,
    Cover,
    subTotalBuilton,
    quantityBuilton,
    price,
    isAddToCart
  } = useContext(CartContext)

  function onRemove() {
    setRemoving(true)
    removeFromCartBuilton(id)
    sessionStorage.clear()
  }

  return cartButton ? (
    <div className="cartsliderbar-item">
      <Photo cartImg="cartImg" src={media[0] && media[0].url} alt={name} />
      <div className="content">
        <h4>{name}</h4>
        <ul>
          <li>Size: {Size}</li>
          <li>Weight: {Weight}</li>
          <li>Cover: {Cover}</li>
        </ul>
        <div className="price">
          {isAddToCart === true ? subTotalBuilton : price} £
        </div>
      </div>
      <div className="qty-remove ml-auto">
        {!locked && <QuantityStepper itemId={id} />}
        {!locked && (
          <a className="remove-link" onClick={onRemove}>
            Remove
          </a>
        )}
      </div>
    </div>
  ) : (
    <div className="revieworder-box">
      <Photo cartImg="cartImg" src={media[0] && media[0].url} alt={name} />
      <div className="content">
        <h5>{name}</h5>
        <span className="qty-text">
          {isAddToCart === true ? subTotalBuilton : price} £
        </span>
      </div>
      <div className="price ml-auto">
        {price === 0 ? subTotalBuilton : price}£
      </div>
    </div>
  )
}

export default CartItem
