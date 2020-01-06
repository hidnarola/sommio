import React, { useContext, useState } from 'react'
import { Form } from 'react-final-form'
import jwt from 'jsonwebtoken'
import Builton from '@builton/core-sdk'
import Input from '../Input'
import { CartContext, FirebaseContext } from '../../context'
import AddressFields from './AddressFields'

const ShippingAddress = ({ isCompleted, toggleEditable }) => {
  const {
    cartItems,
    shippingCostCalculate,
    shipping_address,
    customerDetails,
    cartItemsBuilton,
    quantityBuilton,
    builton
  } = useContext(CartContext)
  const { firebase } = useContext(FirebaseContext)
  let details = JSON.parse(localStorage.getItem('details'))

  return (
    <>
      <div className={`${isCompleted ? 'visible' : 'hidden'}`}>
        <div className="shipping-boxs">
          <h2 className="text-black font-medium leading-loose p-0 mb-3">
            <span>1</span>
            <span className="text">SHIPPING & BILLING</span>
          </h2>
          <div className="mb-10">
            <h4 className="mb-3">Email Address</h4>
            <p>{customerDetails && customerDetails.email}</p>
          </div>
          <div className="mb-10">
            <h4 className="mb-3">Shipping Address</h4>
            <p className="mb-1">
              {shipping_address && shipping_address.first_name}{' '}
              {shipping_address && shipping_address.last_name}
            </p>
            <p className="mb-1">{shipping_address && shipping_address.line1}</p>
            <p className="mb-1">{shipping_address && shipping_address.city}</p>
            <p>{shipping_address && shipping_address.county}</p>
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
            <span className="text">CONTACT INFORMATION</span>
          </h2>
          <div className="frm_grp">
            <input
              type="email"
              name="email"
              defaultValue={details && details.email}
            />
          </div>

          <h2 className="text-black font-medium p-0 mb-3 pt-6 pb-3 border-b border-grey-light">
            SHIPPING & BILLING
          </h2>
          <AddressFields
            type="shipping_address"
            toggleEditable={toggleEditable}
          />
        </div>
      </div>
    </>
  )
}

export default ShippingAddress
