import React, { useContext } from 'react'
import { ShippingAndUserDetailContext } from '../../context/ShippingAndUserDetailContext'
import { CartContext } from '../../context'
function ShippingSelectOption() {
  const {
    shippingRatesArray,
    shipping_address,
    shippingRate,
    countryCode
  } = useContext(ShippingAndUserDetailContext)

  const { shippingCost } = useContext(CartContext)

  const updateValue = async ({ target: { value } }) => {
    let shipperData = JSON.parse(value)

    let shipping_provider = shipperData.service_name

    let convertedRates = parseInt(
      (shipperData &&
        shipperData.total_charge &&
        shipperData.total_charge.amount * 91) / 100
    )

    shippingCost(convertedRates, shipping_provider)
    console.log('shippingSelect convertedRates => ', convertedRates)
    console.log('shippingSelect shipperData => ', shipperData)
  }
  console.log(
    'shipping_address.country,countryCode ==============>',
    shipping_address.country,
    countryCode
  )

  return (
    <div className="cost_option">
      <select
        disabled={
          shippingRatesArray && shippingRatesArray.length > 0 ? false : true
        }
        onChange={e => updateValue(e)}
      >
        {countryCode && countryCode === 'GB' ? (
          <option value={0}>Free</option>
        ) : (
          <option value={0}>Select Shipping Method</option>
        )}
        {shipping_address &&
          countryCode &&
          countryCode !== 'GB' &&
          shippingRatesArray &&
          shippingRatesArray.map((shippingRatesType, i) => (
            <option value={JSON.stringify(shippingRatesType)} key={i}>
              {shippingRatesType.service_name}
            </option>
          ))}
      </select>
    </div>
  )
}
export default ShippingSelectOption
