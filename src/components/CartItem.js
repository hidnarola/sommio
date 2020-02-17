import React, { useState, useContext } from 'react'
import QuantityStepper from './QuantityStepper'
import { CartContext } from '../context/CartContext'
import Photo from './Photo'
import { TestCartContext } from '../context'

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
  } = useContext(CartContext)
  const { remove_cart, testProductsArray, total, productSubTotal } = useContext(
    TestCartContext
  )

  const onRemove = data => {
    setRemoving(true)
    remove_cart(data)
    sessionStorage.clear()
  }

  return cartButton ? (
    <div className="cartsliderbar-item">
      {testProductsArray &&
        testProductsArray.map(p => {
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
      {testProductsArray &&
        testProductsArray.map(prod => (
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
