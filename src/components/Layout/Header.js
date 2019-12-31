import React, { useContext, useState, useEffect } from 'react'
import { Link } from 'gatsby'
import { navigate } from 'gatsby'
import {
  CartContext,
  CheckoutContext,
  UserContext,
  FirebaseContext
} from '../../context'
import CartItemList from '../CartItemList'
import Logo from '../../images/logo.png'
import logoCheckout from '../../images/logo-checkout.png'
import CartIcon from '../../images/shopping-basket-duotone.svg'
import CartButton from '../CartButton'
import RegiserOrLogin from '../../components/Checkout/RegisterOrLogin'
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap'
import { getFirebase } from '../../firebase/index'
// import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap'
import { Modal, Button } from 'react-bootstrap'
import Loader from '../Loader'

const Header = ({ siteTitle, collections, slug, human_id }, props) => {
  const { count, isEmpty, setToggle, setUserBuilton } = useContext(CartContext)
  const { currentUserCheck, userDetail } = useContext(UserContext)
  const { orderId } = useContext(CheckoutContext)
  const { setFirebase, firebase } = useContext(FirebaseContext)
  const [refresh, setRefresh] = useState(false)
  const [isLoading, setLoading] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  // const [modal, setModal] = useState(false)
  // const toggleModal = () => setModal(!modal)
  const toggleDropDown = () => setDropdownOpen(!dropdownOpen)

  //-----------------React-bootstrap modal-----------------------------
  const [show, setShow] = useState(false)
  const handelModal = () => setShow(!show)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  //-----------------------------------------------

  useEffect(() => {
    const lazyApp = import('firebase')
    lazyApp.then(firebaseObj => {
      const firebase = getFirebase(firebaseObj)
      setFirebase(firebase)

      // if (firebase && firebase.auth().currentUser) {
      //   setShow(false)
      // }
      !(firebase && firebase.auth().currentUser)
        ? setTimeout(() => setRefresh(true), 1000)
        : setRefresh(false)
      // !(firebase && firebase.auth().currentUser)
      //   ? setLoading(true)
      //   : setLoading(false)
    })
  }, [])
  console.log('refresh SS => ', refresh)

  const handleLogout = () => {
    firebase &&
      firebase
        .auth()
        .signOut()
        .then(res => {
          navigate(`/`)
          localStorage.removeItem('firebaseToken')
        })
        .catch(err => {
          console.log('sis err Logout => ', err)
        })
  }
  return (
    <div>
      {window.location.pathname === '/checkout' ? (
        <header className="header-checkout">
          {!orderId ? (
            <Link className="backcart-btn" to={`/products/${human_id}`}>
              <svg
                className="StyledBackArrow-amagyn-6 fIdZUy"
                width="6px"
                height="10px"
                viewBox="0 0 6 10"
                version="1.1"
                aria-labelledby="back-arrow-title"
              >
                <title id="back-arrow-title">Back arrow</title>
                <desc>Created with Sketch.</desc>
                <defs></defs>
                <g
                  id="Cart/Checkout/Errors-desktop"
                  stroke="none"
                  stroke-width="1"
                  fill="none"
                  fillRule="evenodd"
                >
                  <g
                    id="Checkout/Shipping-filled-desktop"
                    transform="translate(-44.000000, -33.000000)"
                    fill="#763679"
                  >
                    <path
                      d="M46.1182432,37.9529268 L50.01,41.84547 L48.949,42.90547 L44,37.95547 L44.0032515,37.9522215 L44.0001,37.94907 L48.9491,33.00007 L50.0101,34.06107 L46.1182432,37.9529268 Z"
                      id="backarrow"
                    ></path>
                  </g>
                </g>
              </svg>
              Back to Cart
            </Link>
          ) : (
            ''
          )}
          <Link to="/" className="mx-auto flex items-center logo">
            <img src={logoCheckout} title={siteTitle} alt={siteTitle} />
          </Link>
        </header>
      ) : (
        <header>
          <div className="container-fluid">
            <div className="navbar navbar-expand-lg">
              <Link className="navbar-brand" to="/">
                <img src={Logo} />
              </Link>
              <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>

              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav ml-auto menu-list">
                  <li className="nav-item">
                    <Link to={`/products/${human_id}`}>Shop</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/about">About us</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/about">Contact us</Link>
                  </li>
                  {/* {isLoading === true ? (
                    <Loader />
                  ) : ( */}
                  <li>
                    {firebase && firebase.auth().currentUser ? (
                      <Dropdown isOpen={dropdownOpen} toggle={toggleDropDown}>
                        <DropdownToggle>
                          {firebase.auth().currentUser.email}
                        </DropdownToggle>
                        <DropdownMenu>
                          <DropdownItem>
                            <button>
                              <Link to="/userOrdersList">My Orders</Link>
                            </button>
                          </DropdownItem>
                          <DropdownItem>
                            <button onClick={handleLogout}>Logout</button>
                          </DropdownItem>
                        </DropdownMenu>
                      </Dropdown>
                    ) : (
                      <div>
                        <Button variant="primary" onClick={handelModal}>
                          Login/Register
                        </Button>
                      </div>
                    )}
                  </li>
                  {/* )} */}
                </ul>
                <ul className="navbar-nav cart-boxs">
                  <li className="nav-item">
                    <CartButton />
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>User Account</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <RegiserOrLogin
                isModal={true}
                toggleModal={handelModal}
                setDropdownOpen={setDropdownOpen}
              />
            </Modal.Body>
          </Modal>
        </header>
      )}
    </div>
  )
}

export default Header
