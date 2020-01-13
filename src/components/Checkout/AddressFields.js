import React, { useContext, useState, useEffect } from 'react'
import { Field, Form } from 'react-final-form'

import Input from '../../components/Input'
import country from '../../../countryWithThree'
import { CartContext, FirebaseContext, CheckoutContext } from '../../context'
import validation from '../../validation/shippingFormValidation'
import { log } from 'util'
import Builton from '@builton/core-sdk'
import shippingFormValidation from '../../validation/shippingFormValidation'
import PlacesAutocomplete from './GoogleAutocomplete'
import countryWithThree from '../../../countryWithThree'

const AddressFields = ({ type, toggleEditable }) => {
  const {
    shipping_address,
    user,
    customerDetails,
    shippingCostCalculate,
    cartItemsBuilton,
    builton,
    setUserBuilton,
    SelectedCountry,
    county,
    postalCode,
    address_line_1,
    city,
    countryCode
  } = useContext(CartContext)

  let countryWithThree = country.filter(data => {
    return data.alpha2.toUpperCase() === countryCode
  })

  const { firebase } = useContext(FirebaseContext)
  const [isCurrentUser, SetCurrentUser] = useState(
    firebase && firebase.auth().currentUser
  )
  const [errorMessage, setErrorMessage] = useState('')
  const [gmapsLoaded, setGmapsLoaded] = useState(false)

  const initMap = () => {
    setGmapsLoaded(true)
  }

  useEffect(() => {
    window.initMap = initMap
    const gmapScriptEl = document.createElement(`script`)
    gmapScriptEl.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCLzic4qigzdlIc_OV71Czc6a-5uc8SyKA&libraries=places&callback=initMap`
    document
      .querySelector(`body`)
      .insertAdjacentElement(`beforeend`, gmapScriptEl)
  }, [])
  let details = JSON.parse(localStorage.getItem('details'))
  console.log(
    'handleShippingCost isCurrentUser out,details => ',
    isCurrentUser,
    details && details.email
  )

  const handleShippingCost = values => {
    console.log('handleShippingCost values => ', values)

    if (firebase && firebase.auth().currentUser) {
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
    line_1:
      (shipping_address && shipping_address.line_1) ||
      (address_line_1 && address_line_1),
    city: (shipping_address && shipping_address.city) || (city && city),
    county:
      (shipping_address && shipping_address.county) ||
      (SelectedCountry && SelectedCountry),
    postcode:
      (shipping_address && shipping_address.postcode) ||
      (postalCode && postalCode),
    country:
      (shipping_address && shipping_address.country) ||
      (SelectedCountry && SelectedCountry),
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
        console.log('values addressField => ', values)

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
                <option value={-1}>
                  {SelectedCountry ? SelectedCountry : 'Select Country'}
                </option>
                {country.length &&
                  country.map((cntry, i) => (
                    <option
                      selected={
                        countryCode &&
                        countryCode === cntry.alpha2.toUpperCase()
                      }
                      value={
                        countryWithThree
                          ? countryWithThree[0] && countryWithThree[0].alpha3
                          : cntry.alpha3
                      }
                      key={i}
                    >
                      {cntry.name}
                    </option>
                  ))}
              </Field>
            </div>

            <div className="my-2 w-full">
              {gmapsLoaded && <PlacesAutocomplete />}
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
