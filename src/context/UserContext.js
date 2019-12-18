import React, { useContext, createContext, useReducer } from 'react'

import { CartContext } from './CartContext'

export const SET_CURRENT_USER = 'SET_CURRENT_USER'

export const initialState = {
  currentUserCheck: false,
  userDetail: { email: '', password: '' },
  firebaseObj: null
}

export default function reducer(state, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      console.log('action SET_CURRENT_USER => ', action)
      const currentUserCheck = action.currentUser
      const userDetail = action.userDetail
      const firebaseObj = action.firebaseObj
      return {
        ...state,
        currentUserCheck: currentUserCheck,
        userDetail: userDetail,
        firebaseObj: firebaseObj
      }

    default:
      return state
  }
}
let UserContext

const { Provider, Consumer } = (UserContext = createContext())

function UserProvider({ children, ...props }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  const setCurrentUser = (currentUser, userDetail, firebaseObj) => {
    dispatch({ type: SET_CURRENT_USER, currentUser, userDetail, firebaseObj })
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
