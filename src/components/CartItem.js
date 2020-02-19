import React, { useState, useContext } from 'react'
import QuantityStepper from './QuantityStepper'
import { ShippingAndUserDetailContext } from '../context/ShippingAndUserDetailContext'
import Photo from './Photo'
import { CartContext } from '../context'

function CartItem({ locked, cartButton }) {
  const [removing, setRemoving] = useState(false)
  const {
    Weight,
    Size,
    Cover,
    subTotalBuilton,
    quantityBuilton,
    isAddToCart,
    products
  } = useContext(ShippingAndUserDetailContext)
  const { remove_cart, ProductsArray, total, productSubTotal } = useContext(
    CartContext
  )

  const onRemove = data => {
    setRemoving(true)
    remove_cart(data)
  }

  return cartButton ? (
    <div className="cartsliderbar-item">
      {ProductsArray &&
        ProductsArray.map(p => {
          return (
            <>
              <Photo
                cartImg="cartImg"
                src={p.media[0] && p.media[0].url}
                alt={p.name}
              />
              <div className="content">
                <h4>{p.name}</h4>
                <ul>
                  <li>Size: {Size}</li>
                  <li>Weight: {p.weightName}</li>
                  <li>Cover: {p.coverName}</li>
                </ul>
                <div className="price">
                  {p.final_price * p.quantityBuilton}£
                </div>
              </div>
              <div className="qty-remove ml-auto">
                {!locked && <QuantityStepper product={p} />}
                {!locked && (
                  <a className="remove-link" onClick={() => onRemove(p)}>
                    Remove
                  </a>
                )}
              </div>
            </>
          )
        })}
    </div>
  ) : (
    <div className="revieworder-box">
      {ProductsArray &&
        ProductsArray.map(prod => (
          <>
            <Photo
              cartImg="cartImg"
              src={prod.media[0] && prod.media[0].url}
              alt={prod.name}
            />
            <div className="content">
              <h5>{prod.name}</h5>
              <span className="qty-text">{prod.quantityBuilton} </span>
            </div>
            <div className="price ml-auto">
              {prod.final_price * prod.quantityBuilton} £{' '}
            </div>
          </>
        ))}
    </div>
  )
}

export default CartItem
