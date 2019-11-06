import React, { useContext, useState } from 'react'
import { Form } from 'react-final-form'
import Input from '../Input'

import { CartContext } from '../../context'
import validation from '../../validation/checkout'

import AddressFields from './AddressFields'

const ShippingAddress = ({ isCompleted, toggleEditable }) => {
  const {
    cartItems,
    shippingCostCalculate,
    shipping_address,
    customerDetails
  } = useContext(CartContext)

  const handleShippingCost = values => {
    toggleEditable(true)
    shippingCostCalculate(values, cartItems)
  }
  return (
    <>
      <div className={`${isCompleted ? 'visible' : 'hidden'}`}>
        <div className="shipping-boxs">
          <h2 className="text-black font-medium leading-loose p-0 mb-3">
            <span>1</span>
            <span className="text">Shipping & Billing</span>
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
        <Form onSubmit={handleShippingCost} validate={validation}>
          {({ handleSubmit, pristine, invalid }) => {
            return (
              <form onSubmit={handleSubmit} id="shipping_form">
                <div className="shipping-boxs">
                  <h2 className="text-black font-medium leading-loose p-0 mb-3 pt-6 pb-3 border-b border-grey-light">
                    <span>1</span>
                    <span className="text">Your Information</span>
                  </h2>
                  <div className="frm_grp">
                    <Input type="email" name="customer.email" label="Email" />
                  </div>

                  <AddressFields type="shipping_address" />
                </div>
                <div className="submit_btn">
                  <button type="submit" disabled={pristine || invalid}>
                    Next
                  </button>
                </div>
              </form>
            )
          }}
        </Form>
      </div>
    </>
  )
}

export default ShippingAddress
