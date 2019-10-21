import React, { useContext } from 'react'
import { Link } from 'gatsby'

import { CartContext ,CheckoutContext} from '../../context'
// import {  CustomerContext } from '../../context'

import Logo from '../../images/logo.png';
import CartIcon from '../../images/shopping-basket-duotone.svg';

function Header({ siteTitle, collections }) {

  const { count, isEmpty } = useContext(CartContext);
  const {orderId} = useContext(CheckoutContext);

  return (
    <div>
    { window.location.pathname === "/checkout" ?
    <header className="header-checkout">
      { !orderId ? <Link to="/cart" className="backcart-btn"><svg class="StyledBackArrow-amagyn-6 fIdZUy" width="6px" height="10px" viewBox="0 0 6 10" version="1.1" aria-labelledby="back-arrow-title"><title id="back-arrow-title">Back arrow</title><desc>Created with Sketch.</desc><defs></defs><g id="Cart/Checkout/Errors-desktop" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="Checkout/Shipping-filled-desktop" transform="translate(-44.000000, -33.000000)" fill="#763679"><path d="M46.1182432,37.9529268 L50.01,41.84547 L48.949,42.90547 L44,37.95547 L44.0032515,37.9522215 L44.0001,37.94907 L48.9491,33.00007 L50.0101,34.06107 L46.1182432,37.9529268 Z" id="backarrow"></path></g></g></svg>Back to Cart</Link> : ""}
      <Link
          to="/"
          className="mx-auto flex items-center logo"
        >
          <img src={Logo} title={siteTitle} alt={siteTitle} />
      </Link>
    </header>
    :
    <header>
      <div className="container-fluid">
        <div className="navbar navbar-expand-lg">
          <a className="navbar-brand" href="#">
            <img src={Logo} />
          </a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto menu-list">
              <li className="nav-item">
                <Link to="/products/weighted-blanket">Shop</Link>
              </li>
              <li className="nav-item">
                <Link to="/about">About us</Link>
              </li>
              {/* <li className="nav-item relative mx-1 px-1 py-2 group mb-1 md:mb-0">
                <Link to="/collections">Collections</Link>

                <div className="absolute left-0 top-0 mt-2 py-3 px-4 rounded shadow-lg bg-white z-10 hidden group-hover:block">
                  <ul className="whitespace-no-wrap list-reset">
                    {collections.nodes.map(collection => (
                      <li key={collection.id}>
                        <Link
                          to={`/collections/${collection.slug}`}
                          className="block text-grey hover:text-black no-underline my-1"
                        >
                          {collection.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </li> */}
              <li className="nav-item">
                <Link to="/about">Contact us</Link>
              </li>
            </ul>
            <ul className="navbar-nav cart-boxs">
              <li className="nav-item">
                <Link to="/cart">
                  <img src={CartIcon} />
                  <span className="count-number">
                    {isEmpty && count === 0 ? 0 : count}
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
    }
    </div>
  )
}

export default Header
