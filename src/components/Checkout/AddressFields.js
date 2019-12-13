import React, { useContext } from 'react'
import { Field, Form } from 'react-final-form'
import Input from '../../components/Input'
import country from '../../../countryWithThree.json'
import { CartContext } from '../../context'
import validation from '../../validation/shippingFormValidation'
import { log } from 'util'
import shippingFormValidation from '../../validation/shippingFormValidation'
import firebase from '../../firebse/index'

const AddressFields = ({ type, toggleEditable }) => {
  console.log('type validation => ', type)

  const {
    shipping_address,
    user,
    customerDetails,
    shippingCostCalculate,
    cartItemsBuilton,
    builton
  } = useContext(CartContext)
  console.log('user => ', user)

  const handleShippingCost = async values => {
    console.log(' Hiiii SSI => ', values)

    toggleEditable(true)
    shippingCostCalculate(user, values, cartItemsBuilton)
  }
  console.log('shipping_address => ', shipping_address)

  const myInitData = {
    first_name: shipping_address && shipping_address.first_name,
    last_name: shipping_address && shipping_address.last_name,
    line_1: shipping_address && shipping_address.line_1,
    city: shipping_address && shipping_address.city,
    county: shipping_address && shipping_address.county,
    postcode: shipping_address && shipping_address.postcode,
    country: shipping_address && shipping_address.country
  }

  return (
    <Form
      onSubmit={handleShippingCost}
      initialValues={myInitData}
      validate={shippingFormValidation}
      render={({ handleSubmit, form, submitting, pristine, values }) => (
        <form onSubmit={handleSubmit}>
          <div>
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
            </div>

            <div className="frm_grp">
              <Field name="country" component="select">
                <option value={'-1'}>Select Country</option>
                {country.map(cntry => (
                  <option value={cntry.alpha3}>{cntry.name}</option>
                ))}
              </Field>
              {values.country && values.country === '-1' && (
                <span>{'Select Country'}</span>
              )}
            </div>

            <div className="submit_btn">
              <button
                type="submit"
                disabled={firebase.auth().currentUser ? false : true}
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      )}
    />
  )
}
export default AddressFields
