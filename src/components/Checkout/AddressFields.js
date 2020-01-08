import React, { useContext, useState } from 'react'
import { Field, Form } from 'react-final-form'
import Input from '../../components/Input'
import country from '../../../countryWithThree'
import { CartContext, FirebaseContext } from '../../context'
import validation from '../../validation/shippingFormValidation'
import { log } from 'util'
import Builton from '@builton/core-sdk'
import shippingFormValidation from '../../validation/shippingFormValidation'

const AddressFields = ({ type, toggleEditable }) => {
  const {
    shipping_address,
    user,
    customerDetails,
    shippingCostCalculate,
    cartItemsBuilton,
    builton,
    setUserBuilton
  } = useContext(CartContext)
  const { firebase } = useContext(FirebaseContext)
  const [isCurrentUser, SetCurrentUser] = useState(
    firebase && firebase.auth().currentUser
  )
  const [errorMessage, setErrorMessage] = useState('')

  const handleShippingCost = values => {
    if (isCurrentUser) {
      setErrorMessage('')
      toggleEditable(true)
      shippingCostCalculate(user, values, cartItemsBuilton)
    } else {
      setErrorMessage('')
      firebase &&
        firebase
          .auth()
          .createUserWithEmailAndPassword(values.email.trim(), values.password)
          .then(resp => {
            let accessToken = JSON.parse(JSON.stringify(resp.user))
              .stsTokenManager.accessToken
            localStorage.setItem('firebaseToken', accessToken)
            localStorage.setItem('details', JSON.stringify(resp.user))

            const builton = new Builton({
              apiKey: process.env.GATSBY_BUILTON_API_KEY,
              bearerToken: accessToken
            })

            SetCurrentUser(resp.user)
            setUserBuilton(values.email, builton)
            shippingCostCalculate(user, values, cartItemsBuilton)
            toggleEditable(true)
          })
          .catch(error => {
            setErrorMessage(error.message)
            SetCurrentUser(false)
          })
    }
  }

  const myInitData = {
    first_name: shipping_address && shipping_address.first_name,
    last_name: shipping_address && shipping_address.last_name,
    line_1: shipping_address && shipping_address.line_1,
    city: shipping_address && shipping_address.city,
    county: shipping_address && shipping_address.county,
    postcode: shipping_address && shipping_address.postcode,
    country: shipping_address && shipping_address.country,
    phone: shipping_address && shipping_address.phone,
    email: shipping_address && shipping_address.email
  }

  return (
    <Form
      onSubmit={handleShippingCost}
      initialValues={myInitData}
      validate={fieldValues =>
        shippingFormValidation(fieldValues, isCurrentUser)
      }
    >
      {({ handleSubmit, form, submitting, pristine, values }) => {
        return (
          <form onSubmit={handleSubmit}>
            <div className="frm_grp">
              <Field name="first_name">
                {({ input, meta }) => (
                  <div>
                    <input {...input} type="text" placeholder="First name" />
                    {meta.error && meta.touched && <span>{meta.error}</span>}
                  </div>
                )}
              </Field>
            </div>

            <div className="frm_grp">
              <Field name="last_name">
                {({ input, meta }) => (
                  <div>
                    <input {...input} type="text" placeholder="Last name" />
                    {meta.error && meta.touched && <span>{meta.error}</span>}
                  </div>
                )}
              </Field>
            </div>

            <div className="frm_grp">
              <Field name="country" component="select">
                <option value={'-1'}>Select Country</option>
                {country.length &&
                  country.map((cntry, i) => (
                    <option value={cntry.alpha3} key={i}>
                      {cntry.name}
                    </option>
                  ))}
              </Field>
              {values.country && values.country === '-1' && (
                <span>{'Select Country'}</span>
              )}
            </div>

            <div className="my-2 w-full">
              <Field name="postcode">
                {({ input, meta }) => (
                  <div>
                    <input
                      {...input}
                      type="text"
                      placeholder="ZIP / Postcode"
                    />
                    {meta.error && meta.touched && <span>{meta.error}</span>}
                  </div>
                )}
              </Field>
            </div>

            <div className="frm_grp">
              <Field name="line_1">
                {({ input, meta }) => (
                  <div>
                    <input
                      {...input}
                      type="text"
                      placeholder="Address line 1"
                    />
                    {meta.error && meta.touched && <span>{meta.error}</span>}
                  </div>
                )}
              </Field>
            </div>

            <div className="frm_grp">
              <Field name="city">
                {({ input, meta }) => (
                  <div>
                    <input {...input} type="text" placeholder="City" />
                    {meta.error && meta.touched && <span>{meta.error}</span>}
                  </div>
                )}
              </Field>
            </div>

            <div className="md:flex -mx-2 frm_half">
              <div className="my-2 w-full">
                <Field name="county">
                  {({ input, meta }) => (
                    <div>
                      <input
                        {...input}
                        type="text"
                        placeholder="State / County / Region"
                      />
                      {meta.error && meta.touched && <span>{meta.error}</span>}
                    </div>
                  )}
                </Field>
              </div>
            </div>
            <div className="frm_grp">
              <Field name="phone">
                {({ input, meta }) => (
                  <div>
                    <input {...input} type="text" placeholder="Phone" />
                    {meta.error && meta.touched && <span>{meta.error}</span>}
                  </div>
                )}
              </Field>
            </div>

            <div className="frm_grp">
              <Field name="email">
                {({ input, meta }) => (
                  <div>
                    <input {...input} type="text" placeholder="Email" />
                    {meta.error && meta.touched && <span>{meta.error}</span>}
                    <span>{errorMessage}</span>
                  </div>
                )}
              </Field>
            </div>
            {firebase && !firebase.auth().currentUser && (
              <>
                <div className="frm_grp">
                  <Field name="password">
                    {({ input, meta }) => (
                      <div>
                        <input
                          {...input}
                          type="password"
                          placeholder="Password"
                        />
                        {meta.error && meta.touched && (
                          <span>{meta.error}</span>
                        )}
                      </div>
                    )}
                  </Field>
                </div>

                <div className="frm_grp">
                  <Field name="confirm_password">
                    {({ input, meta }) => (
                      <div>
                        <input
                          {...input}
                          type="password"
                          placeholder="Confirm Password"
                        />
                        {meta.error && meta.touched && (
                          <span>{meta.error}</span>
                        )}
                      </div>
                    )}
                  </Field>
                </div>
              </>
            )}

            <div className="submit_btn">
              <button type="submit">Next Step</button>
            </div>
          </form>
        )
      }}
    </Form>
  )
}
export default AddressFields
