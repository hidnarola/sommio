import React, { useContext, createContext ,useReducer} from 'react'
// import axios from "axios";
import { CartContext } from "./CartContext";
import { MoltinContext } from '.'
export const SET_PAYMENT_VALUE = "SET_PAYMENT_VALUE"
export const PAYMENT="PAYMENT"
export const RESET_PAYMENT = "RESET_PAYMENT";

export const initialState = {
  defaultPayment: false,
  orderId: null,
  paymentDetails: null,
  shipping_address : null,
  // billing_address : null,
  customer: null
}

export default function reducer(state, action) {
  console.log("reducer state", state);

  switch (action.type) {
    case SET_PAYMENT_VALUE:
      console.log("payment ===> ",action);
      const defaultPayment = true;
      let orderId = action.orderId
      console.log("payment orderId===> ",orderId);

      return {
        ...state,
        orderId: orderId,
        defaultPayment : defaultPayment
      }
    case PAYMENT :
      console.log('PAYMENT  actionssssssssss=> ', action);
      const paymentDetails = action.payload;
      return {
        paymentDetails:paymentDetails
      }
    case RESET_PAYMENT :
        return {
            ...initialState
        }
    default:
      return state;
  }
}
let CheckoutContext

const { Provider, Consumer } = (CheckoutContext = createContext())

function CheckoutProvider({ cartId: initialCartId, children, ...props  }) {
  const { moltin } = useContext(MoltinContext)
  const {rate,shippingProvider,cartItems,shipping_address,customerDetails} = useContext(CartContext)
  const [state, dispatch] = useReducer(reducer, initialState);

  async function checkout(
    cartId = initialCartId,
    customerDetails,
    billing_address,
    shipping_address,
    paymentDetails,
    shipping_cost =  rate,
    shipping_provider_name = shippingProvider,
    ){
    const createCustomer = customer && customer.password
    let customerId
    console.log('customer , createCustomer ==> ',customerDetails,createCustomer,shipping_address,billing_address,paymentDetails,shipping_cost,shipping_provider_name);

    const customItemShipping = await moltin.post(`carts/${cartId}/items`,
  {
          type:"custom_item",
          name:"Shipping",
          sku:"ship_calc",
          description: "shipping calculation for this order",
          slug:"ship_calc",
          quantity: 1,
          price : {
              amount : (rate * 100)
          }
    }
  );
    let customer =  {
    email : customerDetails.email,
    name: `${shipping_address.first_name} ${shipping_address.last_name}`
    }
    if (createCustomer) {
      const { data: newCustomer } = await moltin.post(`customers`, {
        type: 'customer',
        ...customer
      })

      customerId = newCustomer.id
    }

    const { data: order } = await moltin.post(`carts/${cartId}/checkout`, {
      // ...(createCustomer ? { customer: { id: customerId } } : { customer }),
      customer,
      billing_address,
      shipping_address,
      shipping_cost,
      shipping_provider_name,
    })

    return order
  }

  async function pay({ gateway, method, orderId, ...rest }) {
    console.log('orderId pay ============>',orderId);

    try {
      const { payment } = await moltin.post(`orders/${orderId}/payments`, {
        gateway,
        method,
        ...rest
      })

      dispatch({type: SET_PAYMENT_VALUE , orderId :orderId })

      return payment
    } catch (err) {
      throw new Error(err.message || 'Payment failed')
    }
  }
  function checkoutClear(){
    dispatch({type: RESET_PAYMENT })
  }
  function paymentData(paymentDetail){
    console.log('paymentDetails,data => ',paymentDetail );
    dispatch({type: PAYMENT , payload: paymentDetail})
  }

  return (
    <Provider
      value = {{
        ...state,
        ...props,
        checkout,
        checkoutClear,
        pay,
        paymentData
      }}
    >
      {children}
    </Provider>
  )
}

export { CheckoutProvider, Consumer as CheckoutConsumer, CheckoutContext }
