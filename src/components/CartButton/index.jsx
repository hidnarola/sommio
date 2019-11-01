import React, { useState, useContext } from 'react'
import { CartContext } from '../../context/CartContext'
import { Link } from 'gatsby'
import CartItemList from '../../components/CartItemList'
import CartIcon from '../../images/shopping-basket-duotone.svg'

const CartButton = () => {
  const {
    isEmpty,
    count,
    toggle,
    subTotal,
    setToggle,
    rate,
    cartItems
  } = useContext(CartContext)

  const handleToggle = () => {
    setToggle()
    let element = document.getElementsByTagName('body')[0]
    if (toggle === false) {
      element.classList.add('so-checkout-page')
      // isMounted.current = false
    } else {
      element.classList.remove('so-checkout-page')
    }
  }
  return (
    <div>
      <button onClick={handleToggle}>
        <img src={CartIcon} />
        <span className="count-number">
          {isEmpty && count === 0 ? 0 : count}
        </span>
      </button>
      <div className={`${toggle ? 'show' : 'hide'} cartsliderbar-main`}>
        <div onClick={handleToggle} className="overlay"></div>
        <div className="cartsliderbar-boxs">
          <div className="cartsliderbar-header">
            <h3>Your Basket</h3>
            <button className="close" onClick={handleToggle}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="31"
                height="31"
                viewBox="0 0 31 31"
              >
                <path
                  class="a"
                  d="M21.376,95.5l8.813-8.813a2.77,2.77,0,0,0,0-3.917L28.23,80.811a2.77,2.77,0,0,0-3.917,0L15.5,89.624,6.687,80.811a2.77,2.77,0,0,0-3.917,0L.811,82.77a2.77,2.77,0,0,0,0,3.917L9.624,95.5.811,104.313a2.77,2.77,0,0,0,0,3.917l1.959,1.959a2.77,2.77,0,0,0,3.917,0l8.813-8.813,8.813,8.813a2.77,2.77,0,0,0,3.917,0l1.959-1.959a2.77,2.77,0,0,0,0-3.917Z"
                  transform="translate(0 -80)"
                />
              </svg>
            </button>
          </div>
          <CartItemList cartButton={true} />
          {!isEmpty && (
            <div className="cartsliderbar-footer">
              <div className="total-list">
                <ul>
                  <li>
                    Subtotal(tax inc){' '}
                    <span className="ml-auto">£{subTotal}</span>
                  </li>
                  <li>
                    Shipping{' '}
                    <span className="ml-auto">
                      {rate ? `£ ${rate}` : 'Free'}
                    </span>
                  </li>
                  <li>
                    Total <span className="ml-auto">£{subTotal + rate}</span>
                  </li>
                </ul>
              </div>
              <Link
                to="/checkout"
                className="btn btn-info rounded-0 justify-content-center py-4 mx-2"
              >
                Checkout
              </Link>
            </div>
          )}
          {/* <Link to="/products">Shop Products</Link> */}
        </div>
      </div>
    </div>
  )
}

export default CartButton
