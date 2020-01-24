import React, { useContext, createContext, useReducer } from 'react'

import { CartContext } from './CartContext'

export const SET_CURRENT_USER = 'SET_CURRENT_USER'

export const initialState = {
  currentUserCheck: false,
  userDetail: { email: '', password: '' }
}

export default function reducer(state, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      const currentUserCheck = action.currentUser

      return {
        ...state,
        currentUserCheck: currentUserCheck
      }

    default:
      return state
  }
}
let UserContext

const { Provider, Consumer } = (UserContext = createContext())

function UserProvider({ children, ...props }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  const setCurrentUser = currentUser => {
    dispatch({ type: SET_CURRENT_USER, currentUser })
  }
  return (
    <Provider
      value={{
        ...state,
        ...props,
        setCurrentUser
      }}
    >
      {children}
    </Provider>
  )
}

export { UserProvider, Consumer as UserConsumer, UserContext }
