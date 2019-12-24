import React, { useContext, useEffect } from 'react'
import { Link } from 'gatsby'
import { CheckoutContext, CartContext } from '../../context'
import OrderItems from '../OrderItems'

export default function OrderConfirmation(props) {
  const { deleteCart, shipping_address, customerDetails } = useContext(
    CartContext
  )

  const {
    orderId,
    orderedItems,
    order_shipping_provider_name,
    order_shipping_cost,
    orderPrice
  } = useContext(CheckoutContext)
  useEffect(() => {
    return () => {
      deleteCart()
    }
  }, [])
  return (
    <div className="orderconfimatio-main">
      <div className="text-center py-21">
        <svg
          className="text-black w-24 h-24 mx-auto mb-6"
          xmlns="http://www.w3.org/2000/svg"
          width="80"
          height="80"
          viewBox="0 0 80 80"
        >
          <g fill="none" fillRule="evenodd">
            <circle
              className="stroke-current"
              cx="40"
              cy="40"
              r="39"
              strokeWidth="2"
            />
            <polyline
              className="stroke-current"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3"
              points="24.5 41.5 34.5 51.5 55.5 30.5"
            />
          </g>
        </svg>
        <h3 className="text-center text-3xl text-black">Order completed</h3>
        <p className="text-center text-grey mb-6">Thank for your order!</p>
        {orderId && orderId && (
          <p className="text-center text-grey mb-6">
            Your Order ID: <span className="font-mono text-sm">{orderId}</span>
          </p>
        )}
        <div className="address-main">
          <div className="boxs">
            <h4 className="mb-6">Your Information</h4>
            <p className="mb-2">
              Name - {shipping_address.first_name} {shipping_address.last_name}
            </p>
            <p className="mb-2">Email - {customerDetails.email}</p>
          </div>
          <div className="boxs">
            <h4 className="mb-6">Shipping Address</h4>
            <p className="mb-2">Address - {shipping_address.line_1}</p>
            <p className="mb-2">City - {shipping_address.city}</p>
            <p className="mb-2">Postcode - {shipping_address.postcode}</p>
            <p className="mb-2">County - {shipping_address.county}</p>
            <p className="mb-2">Country - {shipping_address.country}</p>
          </div>
          <div className="boxs yourproduct-main">
            <h4>Your Product</h4>
            <OrderItems locked />
          </div>
        </div>

        <div className="continue-btn">
          <Link
            to="/"
            className="inline-block appearance-none bg-black border border-black text-white hover:text-white px-4 py-3 leading-tight rounded-none focus:outline-none no-underline"
          >
            Continue shopping &rarr;
          </Link>
        </div>
      </div>
    </div>
  )
}
