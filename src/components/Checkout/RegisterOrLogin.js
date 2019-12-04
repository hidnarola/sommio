import React, { useContext, useState } from 'react'
import firebase from 'firebase'
import { CartContext } from '../../context'
import Builton from '@builton/core-sdk'
// import validtion from '../../validation/checkout'

firebase.initializeApp({
  apiKey: 'AIzaSyDgGT5hFomtsStWFZdYblv6k8d9Bx-5xC0',
  authDomain: 'builton-61902.firebaseapp.com'
})

const RegisterOrLogin = () => {
  const {
    shipping_address,
    customerDetails,
    cartItemsBuilton,

    setUserBuilton
  } = useContext(CartContext)

  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  // var ui = new firebaseui.auth.AuthUI(firebase.auth())

  const handleRegister = async () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email.trim(), password)
      .then(resp => {
        // localStorage.setItem('fireStoreuser', JSON.stringify(resp.user))
        var accessToken = JSON.parse(JSON.stringify(resp.user)).stsTokenManager
          .accessToken
        console.log('fireUser. => ', accessToken)

        const builton = new Builton({
          apiKey: process.env.GATSBY_BUILTON_API_KEY,
          bearerToken: accessToken
        })

        // builton.users.authenticate({ email: email })

        setUserBuilton({ email, password }, builton)
      })
      .catch(function(error) {
        console.info(`error => `, error)
      })
  }
  const handleLogin = () => {
    var user = firebase.auth().currentUser
    user.getIdToken().then(idToken => {
      console.log('idToken => ', idToken)
      var builton = new Builton({
        apiKey: process.env.GATSBY_BUILTON_API_KEY,
        bearerToken: idToken
      })

      // builton.users.authenticate({ email: email })
      setUserBuilton({ email, password }, builton)
    })

    return false
  }
  return (
    <div>
      <h2 className="text-black font-medium leading-loose p-0 mb-3 pt-6 pb-3 border-b border-grey-light">
        <span>1</span>
        <span className="text">CONTACT INFORMATION</span>
      </h2>
      <div className="frm_grp">
        <input
          type="email"
          name="customer.email"
          label="Email"
          onChange={e => {
            setEmail(e.target.value)
          }}
        />
      </div>
      <div className="frm_grp">
        <input
          type="password"
          name="customer.password"
          label="Password"
          onChange={e => setPassword(e.target.value)}
        />
      </div>
      <button onClick={handleRegister}>Register</button>
      <button onClick={handleLogin}>Login</button>
    </div>
  )
}
export default RegisterOrLogin
