import React, { createContext } from 'react'
let FirebaseContext
const { Provider, Consumer } = (FirebaseContext = createContext())

function FirebaseProvider({ children, firebase, ...props }) {
  console.log('props FirebaseProvider => ', firebase, props)
  return (
    <Provider
      value={{
        ...props,
        firebase
      }}
    >
      {children}
    </Provider>
  )
}

export { FirebaseProvider, Consumer as FirebaseConsumer, FirebaseContext }
// export { FirebaseContext }
