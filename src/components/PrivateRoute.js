import React from 'react'
import { navigate } from 'gatsby'
import { isLoggedIn } from '../utils/index'

const PrivateRoute = ({ component: Component, ...rest }) => {
  if (!isLoggedIn()) {
    navigate(`/`)
    return null
  }
  return <Component {...rest} />
}
export default PrivateRoute
