import React, { useState, useContext } from 'react'
import QuantityStepper from './QuantityStepper'
import { CartContext } from '../context/CartContext'
import Photo from './Photo'

function CartItem({
  id,
  name,
  quantityBuilton,
  image_url,
  locked,
  cartButton,
  removeFromCartBuilton
}) {
  // const {
  //   display_price: {
  //     without_tax: {
  //       unit: { formatted: unit },
  //       value: { formatted: value }
  //     }
  //   }
  // } = meta

  const [removing, setRemoving] = useState(false)
  const {
    Weight,
    Size,
    Cover,
    selectedProduct,
    selectedWeight,
    selectedCover,
    subTotalBuilton
  } = useContext(CartContext)

  function onRemove() {
    setRemoving(true)
    removeFromCartBuilton(id)
  }
  console.log('subTotalBuilton drawer => ', subTotalBuilton)

  return cartButton ? (
    <div className="cartsliderbar-item">
      <Photo cartImg="cartImg" src={image_url} alt={name} />
      <div className="content">
        <h4>{name}</h4>
        <ul>
          <li>Size: {Size}</li>
          <li>Weight: {Weight}</li>
          <li>Cover: {Cover}</li>
        </ul>
        <div className="price">{subTotalBuilton} £</div>
      </div>
      <div className="qty-remove ml-auto">
        {!locked && <QuantityStepper itemId={id} quantity={quantityBuilton} />}
        {!locked && (
          <a className="remove-link" onClick={onRemove}>
            Remove
          </a>
        )}
      </div>
    </div>
  ) : (
    <div className="revieworder-box">
      <Photo cartImg="cartImg" src={image_url} alt={name} />
      <div className="content">
        <h5>{name}</h5>
        <span className="qty-text">{quantityBuilton}</span>
      </div>
      <div className="price ml-auto">{subTotalBuilton}£</div>
    </div>
  )
}

export default CartItem
