import React ,{useContext}from 'react'
import { CartContext } from "../context/CartContext";

function ShippingSelectOption() {
  const {shippingRates,rate,shippingCost} = useContext(CartContext)

  const updateValue = ({ target: { value } }) => {
    let shipperData = JSON.parse(value);
    let shipping_provider = shipperData.service_name;

    let convertedRates = parseInt((shipperData && shipperData.total_charge && shipperData.total_charge.amount * 91) / 100);
    shippingCost(convertedRates ,shipping_provider)
  }
    return (
        <div className="cost_option">
              <select
                  disabled={shippingRates && shippingRates.length > 0 ? false: true}
                  onChange={e => updateValue(e)}
                >
                <option value={0}>Select Shipping Method</option>
                  {
                    shippingRates && shippingRates.map(shippingRatesType => (
                        <option value={JSON.stringify(shippingRatesType)}>
                                 {shippingRatesType.service_name}
                        </option>
                    )
                    )
                  }
              </select>
              </div>

    )
}
export default ShippingSelectOption;
