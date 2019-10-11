import React, { useContext } from 'react'
import { Link } from 'gatsby'

import { CartContext ,CheckoutContext} from '../../context'
// import {  CustomerContext } from '../../context'

import Logo from '../../images/logo.svg'

function Header({ siteTitle, collections }) {

  const { count, isEmpty } = useContext(CartContext);
  const {orderId} = useContext(CheckoutContext);
console.info('orderId in Header => ',orderId);

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
    <header className="py-6 md:py-10">
      <nav className="flex items-center justify-between relative">
        <ul className="list-reset items-center justify-start hidden md:flex md:w-1/3">
        <li className="nav-item">
            <Link to="/products">Products</Link>
          </li>

          <li className="nav-item">
            <Link to="/about">About</Link>
          </li>

          <li className="nav-item relative mx-1 px-1 py-2 group mb-1 md:mb-0">
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
          </li>
        </ul>

        <div className="hidden md:flex md:w-1/3 flex items-center">
          <Link
            to="/"
            className="mx-auto flex items-center justify-center logo"
          >
            <img src={Logo} title={siteTitle} alt={siteTitle} />
          </Link>
        </div>

        <ul className="list-reset flex items-center justify-end md:w-1/3">
          <li className="md:hidden nav-item">
            <Link to="/products">Shop</Link>
          </li>
          <li className="nav-item">
            <Link to="/cart">
              <span className="relative inline-flex items-center">
                <svg
                  viewBox="0 0 16 17"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  className="inline-block h-4 mt-1"
                >
                  <g
                    stroke="none"
                    strokeWidth="1"
                    fill="none"
                    fillRule="evenodd"
                  >
                    <g
                      transform="translate(-1367.000000, -50.000000)"
                      stroke="#131313"
                      strokeWidth="1.5"
                    >
                      <g transform="translate(64.000000, 48.000000)">
                        <g transform="translate(1262.000000, 0.000000)">
                          <g transform="translate(42.000000, 3.000000)">
                            <polygon id="Path-2" points="0 15 1 4 13 4 14 15" />
                            <path
                              d="M4,7 C4,2 4,0 7,0 C10,0 10,2 10,7"
                              id="Path-3"
                            />
                          </g>
                        </g>
                      </g>
                    </g>
                  </g>
                </svg>

                {!isEmpty && (
                  <span className="md:inline-flex rounded-full bg-yellow -mt-3 -ml-0 md:p-3 h-2 md:h-4 w-2 md:w-4 md:items-center md:justify-center">
                    <span className="hidden md:inline text-black text-xs font-semibold">
                      {count}
                    </span>
                  </span>
                )}
              </span>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
    }
    </div>

  )
}

export default Header
