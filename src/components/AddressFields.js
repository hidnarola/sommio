import React from 'react'
import { Field } from 'react-final-form'
import Input from './Input'
import country from '../../countryWithThree.json'
import { log } from 'util'
export default function AddressFields({ type }) {
  return (
    <React.Fragment>
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
          <Input name={`${type}.postcode`} label="ZIP / Postcode" required />
        </div>
      </div>

      <div className="frm_grp">
        {/* <Input name={`${type}.country`} label="Country" required /> */}
        <label>Country : </label>
        <Field name={`${type}.country`} component="select">
          <option>Select Country</option>
          {country.map(cntry => (
            <option value={cntry.alpha3}>{cntry.name}</option>
          ))}
        </Field>

        {/* <select>
            <option>None</option>
            {
              country.map(cntry =>
              <option value={cntry.alpha3}>{cntry.name}</option>
              )
            }
          </select> */}
      </div>
    </React.Fragment>
  )
}
