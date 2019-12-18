import React, { useContext, useState } from 'react'
import firebase from '../../firebase/index'
import { CartContext, UserContext } from '../../context'
import Builton from '@builton/core-sdk'
// import validtion from '../../validation/checkout'

const RegisterOrLogin = ({ isModal, toggle }) => {
  const {
    shipping_address,
    customerDetails,
    cartItemsBuilton,
    setUserBuilton
  } = useContext(CartContext)
  const { setCurrentUser } = useContext(UserContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [isCurrentUser, SetCurrentUser] = useState(firebase.auth().currentUser)
  const [error, setRegisterError] = useState({
    email: 'Required',
    password: 'Required'
  })
  const [errorMessage, setErrorMessage] = useState('')
  console.log('isCurrentUser => ', isCurrentUser)

  const handleRegister = async () => {
    // toggle()
    setErrorMessage('')
    setRegisterError({})
    if (checkValidation().status) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email.trim(), password)
        .then(resp => {
          let accessToken = JSON.parse(JSON.stringify(resp.user))
            .stsTokenManager.accessToken
          const builton = new Builton({
            apiKey: process.env.GATSBY_BUILTON_API_KEY,
            bearerToken: accessToken
          })
          SetCurrentUser(resp.user)
          setUserBuilton({ email, password }, builton)
          setCurrentUser(isCurrentUser, { email, password }, firebase)
        })
        .catch(error => {
          setErrorMessage(error.message)
          SetCurrentUser(false)
        })
    } else {
      setRegisterError(checkValidation().msg)
    }
  }

  const handleLogin = () => {
    console.log('checkValidation() => ', checkValidation())

    if (checkValidation().status) {
      setRegisterError({
        email: '',
        password: ''
      })
      var user = firebase.auth().currentUser
      console.log('user, isCurrentUser => ', isCurrentUser, isCurrentUser)

      console.log('user ,isCurrentUser => ', user, isCurrentUser)

      if (user !== null) {
        user
          .getIdToken()
          .then(idToken => {
            console.log('idToken => ', idToken)
            var builton = new Builton({
              apiKey: process.env.GATSBY_BUILTON_API_KEY,
              bearerToken: idToken
            })
            SetCurrentUser(user)
            setUserBuilton({ email, password }, builton)
            setCurrentUser(isCurrentUser, { email, password }, firebase)
            setErrorMessage('')
          })
          .catch(err => {
            SetCurrentUser(false)
            setErrorMessage(err.message)
          })
      } else {
        setRegisterError({
          email: '',
          password: ''
        })
        firebase
          .auth()
          .signInWithEmailAndPassword(email, password)
          .then(res => {
            var accessToken = JSON.parse(JSON.stringify(res.user))
              .stsTokenManager.accessToken

            const builton = new Builton({
              apiKey: process.env.GATSBY_BUILTON_API_KEY,
              bearerToken: accessToken
            })

            setUserBuilton({ email, password }, builton)
            SetCurrentUser(res.user)
            setCurrentUser(isCurrentUser, { email, password }, firebase)
            setErrorMessage('')
          })
          .catch(error => {
            SetCurrentUser(false)
            setErrorMessage(error.message)
          })
      }
    } else {
      setRegisterError(checkValidation().msg)
    }
  }

  const handleLogout = () => {
    firebase
      .auth()
      .signOut()
      .then(function() {
        setEmail('')
        setPassword('')
        SetCurrentUser(false)
        setErrorMessage('')
      })
      .catch(function(error) {
        SetCurrentUser(true)
      })
  }

  const checkValidation = () => {
    var _errors = {}

    var isValid = true
    if (!email || email === '') {
      _errors.email = 'Required'
      isValid = false
    } else {
      if (
        /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(email)
      ) {
        _errors.email = ''
      } else {
        _errors.email = 'Invalid Email'
        isValid = false
      }
    }

    if (password === '') {
      _errors.password = 'Required'
      isValid = false
    } else {
      _errors.password = ''
    }
    setRegisterError(_errors)
    return {
      status: isValid,
      msg: _errors
    }
  }

  const handleChange = e => {
    let _errors = error
    if (e.target.name === 'email') {
      setEmail(e.target.value)
      if (e.target.value === '') {
        _errors.email = 'Required'
      } else {
        if (
          /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(
            e.target.value
          )
        ) {
          _errors.email = ''
        } else {
          _errors.email = 'Invalid Email'
        }
      }
    } else {
      setPassword(e.target.value)
      if (e.target.value === '') {
        _errors.password = 'Required'
      } else {
        _errors.password = ''
      }
    }
    setRegisterError(_errors)
  }

  return (
    <div>
      <h2 className="text-black font-medium leading-loose p-0 mb-3 pt-6 pb-3 border-b border-grey-light">
        <span>1</span>
        <span className="text">CONTACT INFORMATION</span>
      </h2>

      {isCurrentUser ? (
        <div>
          <p>You are Logged In Go for next steps</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <>
          <div className="frm_grp">
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={e => handleChange(e)}
            />
            <span>{error.email}</span>
          </div>
          {isModal && isModal === true && (
            <div>
              <div className="frm_grp">
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={e => handleChange(e)}
                />
                <span>{error.password}</span>

                <span>{errorMessage}</span>
              </div>

              <button onClick={handleRegister} type="button">
                Register
              </button>
              <button type="button" onClick={handleLogin}>
                Login
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}
export default RegisterOrLogin
