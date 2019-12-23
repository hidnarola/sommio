import React, { useContext } from 'react'
import { CartContext } from '../../context/CartContext'
function ShippingSelectOption() {
  const {
    shippingRatesArray,
    shippingCost,
    shipping_address,
    shippingRate
  } = useContext(CartContext)

  const updateValue = async ({ target: { value } }) => {
    let shipperData = JSON.parse(value)

    let shipping_provider = shipperData.service_name

    let convertedRates = parseInt(
      (shipperData &&
        shipperData.total_charge &&
        shipperData.total_charge.amount * 91) / 100
    )

    shippingCost(convertedRates, shipping_provider)
    console.log(
      'convertedRates,shippingRate ,shipperData => ',
      convertedRates,
      shippingRate,
      shipperData
    )
  }

  return (
    <div className="cost_option">
      <select
        disabled={
          shippingRatesArray && shippingRatesArray.length > 0 ? false : true
        }
        onChange={e => updateValue(e)}
      >
        {shipping_address &&
        shipping_address.country &&
        shipping_address.country === 'GBR' ? (
          <option value={0}>Free</option>
        ) : (
          <option value={0}>Select Shipping Method</option>
        )}
        {shipping_address &&
          shipping_address.country &&
          shipping_address.country !== 'GBR' &&
          shippingRatesArray &&
          shippingRatesArray.map(shippingRatesType => (
            <option value={JSON.stringify(shippingRatesType)}>
              {shippingRatesType.service_name}
            </option>
          ))}
      </select>
    </div>
  )
}
export default ShippingSelectOption
