import React, { useContext, useState } from 'react'
import firebase from '../../firebse/index'
import { CartContext } from '../../context'
import Builton from '@builton/core-sdk'
// import validtion from '../../validation/checkout'

const RegisterOrLogin = () => {
  const {
    shipping_address,
    customerDetails,
    cartItemsBuilton,
    setUserBuilton
  } = useContext(CartContext)

  const [email, setEmail] = useState()
  const [password, setPassword] = useState()

  const [isCurrentUser, SetCurrentUser] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  console.log('errorMessage => ', errorMessage)
  const handleRegister = async () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email.trim(), password)
      .then(resp => {
        let accessToken = JSON.parse(JSON.stringify(resp.user)).stsTokenManager
          .accessToken
        const builton = new Builton({
          apiKey: process.env.GATSBY_BUILTON_API_KEY,
          bearerToken: accessToken
        })
        setErrorMessage('')
        setUserBuilton({ email, password }, builton)
      })
      .catch(error => {
        console.log('Fb Errro =>', error)
        setErrorMessage(error.message)
        SetCurrentUser(false)
        // alert(error.message)
      })
    SetCurrentUser(true)
  }

  const handleLogin = () => {
    var user = firebase.auth().currentUser

    if (user) {
      user
        .getIdToken()
        .then(idToken => {
          console.log('idToken => ', idToken)
          var builton = new Builton({
            apiKey: process.env.GATSBY_BUILTON_API_KEY,
            bearerToken: idToken
          })

          setUserBuilton({ email, password }, builton)
        })
        .catch(err => {
          setErrorMessage(err.message)
          SetCurrentUser(false)
          console.log('err => ', err)
        })
      SetCurrentUser(true)
      setErrorMessage('')
    } else {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(res => {
          console.log(
            'res IN => ',
            JSON.parse(JSON.stringify(res)),
            JSON.parse(JSON.stringify(res.user)).stsTokenManager.accessToken
          )
          var accessToken = JSON.parse(JSON.stringify(res.user)).stsTokenManager
            .accessToken

          const builton = new Builton({
            apiKey: process.env.GATSBY_BUILTON_API_KEY,
            bearerToken: accessToken
          })

          setUserBuilton({ email, password }, builton)
        })
        .catch(error => {
          SetCurrentUser(false)
          setErrorMessage(error.message)
        })
      SetCurrentUser(true)
      setErrorMessage('')
    }

    return false
  }

  const handleLogout = () => {
    firebase.auth().signOut()
    SetCurrentUser(false)
  }
  console.log('isCurrentUser => ', isCurrentUser)

  return (
    <div>
      <h2 className="text-black font-medium leading-loose p-0 mb-3 pt-6 pb-3 border-b border-grey-light">
        <span>1</span>
        <span className="text">CONTACT INFORMATION</span>
      </h2>

      {!isCurrentUser || errorMessage ? (
        <div>
          <div className="frm_grp">
            <input
              required
              type="email"
              name="email"
              placeholder="Email"
              onChange={e => {
                setEmail(e.target.value)
              }}
            />
          </div>
          <div className="frm_grp">
            <input
              required
              type="password"
              name="password"
              placeholder="Password"
              onChange={e => setPassword(e.target.value)}
            />
            <span>{errorMessage}</span>
          </div>
          <button onClick={handleRegister}>Register</button>
          <button onClick={handleLogin}>Login</button>
        </div>
      ) : (
        <div>
          <p>You are Logged In Go for next steps</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  )
}
export default RegisterOrLogin
