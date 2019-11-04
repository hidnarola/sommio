import React, { useState, useContext } from 'react'
import { CartContext } from '../../context/CartContext'
import { Link, useStaticQuery } from 'gatsby'
import CartItemList from '../../components/CartItemList'
import CartIcon from '../../images/shopping-basket-duotone.svg'

const CartButton = () => {
  const { allMoltinProduct } = useStaticQuery(graphql`
    query {
      allMoltinProduct {
        nodes {
          slug
          id
          relationships {
            parent {
              data {
                id
              }
            }
          }
        }
      }
    }
  `)

  const product = allMoltinProduct.nodes.find(element => {
    return element.relationships.parent === null
  })

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
      element.classList.add('cartopen')
    } else {
      element.classList.remove('cartopen')
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
        {!isEmpty ? (
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
          </div>
        ) : (
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
            <div className="cartsliderbar-boby no-product">
              <h4>Your cart is currently empty !!!</h4>
              <Link
                onClick={handleToggle}
                to={`/products/${product.slug}`}
                className="btn btn-primary"
              >
                Shop Products
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CartButton
