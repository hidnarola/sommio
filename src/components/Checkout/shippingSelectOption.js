import React, { useContext } from 'react'
import { CartContext } from '../../context/CartContext'

function ShippingSelectOption() {
  const { shippingRates, rate, shippingCost, shipping_address } = useContext(
    CartContext
  )

  const updateValue = ({ target: { value } }) => {
    let shipperData = JSON.parse(value)
    let shipping_provider = shipperData.service_name

    let convertedRates = parseInt(
      (shipperData &&
        shipperData.total_charge &&
        shipperData.total_charge.amount * 91) / 100
    )
    shippingCost(convertedRates, shipping_provider)
  }
  return (
    <div className="cost_option">
      <select
        disabled={shippingRates && shippingRates.length > 0 ? false : true}
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
          shippingRates &&
          shippingRates.map(shippingRatesType => (
            <option value={JSON.stringify(shippingRatesType)}>
              {shippingRatesType.service_name}
            </option>
          ))}
      </select>
    </div>
  )
}
export default ShippingSelectOption;
