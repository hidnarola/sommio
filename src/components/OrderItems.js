import React, {useContext, useState} from "react";

import {CartContext, CheckoutContext} from "../context";
import CartItem from "./CartItem";
import PromotionManager from "./PromotionManager";

export default function OrderItems(props) {
  const {isEmpty, orderCartItems, subTotal, removeFromCart, rate} = useContext(CartContext);
  const {order_shipping_cost} = useContext(CheckoutContext);

  console.info('orderCartItems',orderCartItems);
  console.info('order_shipping_cost=> ',order_shipping_cost);

  return (
  <div>
    <div>
      {orderCartItems && orderCartItems.map(item => (
        <div>
        <CartItem key={item.id} removeFromCart={removeFromCart} {...item} {...props}/>
        <div className="border-grey-light pt-2 md:pt-4 lg:pt-6 w-full ">
        <div className="total-page">
          <h4 className="text-grey">Quanity </h4>
          <h4>
            {item.quantity}
          </h4>
        </div>
        </div>
        </div>
        ))}
    </div>
    <div className="border-grey-light pt-2 md:pt-4 lg:pt-6 w-full text-right">
        <div className="total-page">
          <h4 className="text-grey">Subtotal</h4>
          <div>£  {subTotal}</div>
        </div>
        <div className="total-page">
            <h4 className="text-grey">Shipping Cost</h4>
            <h4>£  {order_shipping_cost}</h4>
        </div>
      <hr></hr>
        <div className="total-page text-black">
            <h4 className="text-grey ">Total</h4>
            <h4>£ {subTotal + order_shipping_cost}</h4>
        </div>

      </div>

  </div>);
}
