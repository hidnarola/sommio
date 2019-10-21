import React, {useContext, useState} from "react";

import {CartContext} from "../context";
import CartItem from "./CartItem";
import PromotionManager from "./PromotionManager";

export default function CartItemList(props) {
  const {isEmpty, cartItems, subTotal, removeFromCart, rate} = useContext(CartContext);
  console.log("subTotal => ", subTotal);

  if (isEmpty)
    return <p className="text-center">Your cart is empty</p>;

  return (
  <div>
    {cartItems && cartItems.map(item => (
      <CartItem key={item.id} removeFromCart={removeFromCart} {...item} {...props}/>
    ))}

    <div className="border-grey-light pt-2 md:pt-4 lg:pt-6 w-full text-right">
      <div className="total-page">
        <div className="text-grey">Subtotal</div>
        <div>£  {subTotal}</div>
      </div>
      <div className="total-page">
          <div className="text-grey">Shipping</div>
          <div>£ {rate}</div>
      </div>
      <div className="total-page text-black">
          <div className="text-grey ">Total</div>
          <div>£ {subTotal + rate}</div>
      </div>
    </div>

  </div>);
}
