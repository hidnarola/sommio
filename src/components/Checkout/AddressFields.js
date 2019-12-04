import React, { useContext } from 'react'
import { Field, Form } from 'react-final-form'
import Input from '../../components/Input'
import country from '../../../countryWithThree.json'
import { CartContext } from '../../context'
import validation from '../../validation/checkout'
import { log } from 'util'
const AddressFields = ({ type, toggleEditable }) => {
  const {
    shipping_address,
    user,
    customerDetails,
    shippingCostCalculate,
    cartItemsBuilton,
    builton
  } = useContext(CartContext)
  console.log(
    'builton ,shipping_address,customerDetails => ',
    builton,
    shipping_address,
    customerDetails
  )

  const handleShippingCost = async values => {
    toggleEditable(true)
    shippingCostCalculate(user, values, cartItemsBuilton)
  }

  const myInitData = {
    shipping_address: {
      first_name: shipping_address && shipping_address.first_name,
      last_name: shipping_address && shipping_address.last_name,
      line_1: shipping_address && shipping_address.line_1,
      city: shipping_address && shipping_address.city,
      county: shipping_address && shipping_address.county,
      postcode: shipping_address && shipping_address.postcode,
      country: shipping_address && shipping_address.country
    }
  }
  return (
    <Form
      onSubmit={handleShippingCost}
      initialValues={myInitData}
      render={({ handleSubmit, form, submitting, pristine, values }) => (
        <form onSubmit={handleSubmit}>
          <div>
            <div className="frm_grp">
              <Input name={`${type}.first_name`} label="First name" required />
            </div>

            <div className="frm_grp">
              <Input name={`${type}.last_name`} label="Last name" required />
            </div>

            <div className="frm_grp">
              <Input name={`${type}.line_1`} label="Address line 1" required />
            </div>

            <div className="frm_grp">
              <Input name={`${type}.city`} label="City" required />
            </div>

            <div className="md:flex -mx-2 frm_half">
              <div className="my-2 w-full">
                <Input
                  name={`${type}.county`}
                  label="State / County / Region"
                  required
                />
              </div>

              <div className="my-2 w-full">
                <Input
                  name={`${type}.postcode`}
                  label="ZIP / Postcode"
                  required
                />
              </div>
            </div>

            <div className="frm_grp">
              <label>Country : </label>
              <Field name={`${type}.country`} component="select">
                <option>Select Country</option>
                {country.map(cntry => (
                  <option value={cntry.alpha3}>{cntry.name}</option>
                ))}
              </Field>
            </div>

            <div className="submit_btn">
              <button type="submit">Submit</button>
            </div>
          </div>
        </form>
      )}
    />
  )
}
export default AddressFields
