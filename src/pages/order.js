import React from 'react'
import { Router } from '@reach/router'
import PrivateRoute from '../components/PrivateRoute'
import UserOrderDetails from '../components/Checkout/userOrderDetails'

const Order = () => (
  <Router>
    <PrivateRoute path="/order/:id" component={UserOrderDetails} />
  </Router>
)

export default Order
