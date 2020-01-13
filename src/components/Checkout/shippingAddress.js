import React, { useContext, useState, useEffect } from 'react'
import { CartContext, FirebaseContext } from '../../context'
import AddressFields from './AddressFields'
import { Modal, ModalHeader, ModalBody } from 'reactstrap'
import RegisterOrLogin from '../Checkout/RegisterOrLogin'
// import PlacesAutocomplete from './GoogleAutocompleted'

const ShippingAddress = ({ isCompleted, toggleEditable }) => {
  const { shipping_address, customerDetails } = useContext(CartContext)
  const { firebase } = useContext(FirebaseContext)
  const [modal, setModal] = useState(false)
  const [currentUser, setCurrentUser] = useState(false)
  let details = JSON.parse(localStorage.getItem('details'))

  useEffect(() => {
    if (details && details.email) {
      setCurrentUser(true)
    }
  }, [details && details.email])
  console.log('shipping_address => ', shipping_address)

  const toggleModal = () => setModal(!modal)

  const handleLogin = () => {
    if (firebase && firebase.auth().currentUser) {
      setModal(false)
      setCurrentUser(true)
    }
    toggleModal()
  }

  return (
    <>
      <div className={`${isCompleted ? 'visible' : 'hidden'}`}>
        <div className="shipping-boxs">
          <h2 className="text-black font-medium leading-loose p-0 mb-3">
            <span>1</span>
            <span className="text">DELIVERY INFORMATION</span>
          </h2>
          <div className="mb-10">
            <h4 className="mb-3">Email Address</h4>
            <p>{details && details.email}</p>
          </div>
          <div className="mb-10">
            <h4 className="mb-3">Shipping Address</h4>
            <p className="mb-1">
              Name: {shipping_address && shipping_address.first_name}{' '}
              {shipping_address && shipping_address.last_name}
            </p>
            <p className="mb-1">
              Address: {shipping_address && shipping_address.line_1}
            </p>
            <p className="mb-1">{shipping_address && shipping_address.city}</p>
            <p>
              {shipping_address && shipping_address.county} {''}
              {shipping_address && shipping_address.postcode}
            </p>
            <p>{shipping_address && shipping_address.country}</p>
            <p>Contact Number: {shipping_address && shipping_address.phone}</p>
          </div>
        </div>
        <div className="submit_btn">
          <button
            className="btn btn-outline-secondary"
            onClick={() => toggleEditable(false)}
          >
            Edit
          </button>
        </div>
      </div>
      <div className={`${isCompleted ? 'hidden' : 'visible'}`}>
        <div className="shipping-boxs">
          <h2 className="text-black font-medium leading-loose p-0 mb-3 pt-6 pb-3 border-b border-grey-light">
            <span>1</span>
            <span className="text">DELIVERY INFORMATION</span>
          </h2>
          {!currentUser && (
            <div className="frm_grp">
              <p>Already have an account ?</p>
              <button onClick={handleLogin}>Login</button>
            </div>
          )}

          <AddressFields
            type="shipping_address"
            toggleEditable={toggleEditable}
          />
        </div>
      </div>
      <div>
        <Modal isOpen={modal} toggle={toggleModal}>
          <ModalHeader toggle={toggleModal}>User Account</ModalHeader>
          <ModalBody>
            <RegisterOrLogin isModal={true} toggleModal={toggleModal} />
          </ModalBody>
        </Modal>
      </div>
    </>
  )
}

export default ShippingAddress
