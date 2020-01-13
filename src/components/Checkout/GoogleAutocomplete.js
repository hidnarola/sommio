import React, { useContext } from 'react'
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from 'react-places-autocomplete'
import { Field } from 'react-final-form'
import { CartContext } from '../../context/CartContext'
const LocationSearchInput = () => {
  const {
    shipping_address,
    setAddressFromAutoComplete,
    postalCode,
    setPostalCode
  } = useContext(CartContext)

  const handleChange = zipcode => {
    console.log('address handleChange => ', zipcode)
    setPostalCode(zipcode) //update context postal code value
  }

  const handleSelect = address => {
    console.log('address => ', address)
    geocodeByAddress(address)
      .then(results => {
        console.log('GoogleAutoComplete results => ', results)
        setAddressFromAutoComplete(results)
        getLatLng(results[0])
      })
      .catch(error => console.error('GoogleAutoComplete Error', error))
  }

  return (
    <PlacesAutocomplete
      value={postalCode}
      onChange={handleChange}
      onSelect={handleSelect}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <div>
          <Field name="postcode">
            {({ input, meta }) => (
              <div>
                <input
                  type="text"
                  {...getInputProps({
                    placeholder: 'Postcode',
                    className: 'location-search-input'
                  })}
                />
                {meta.error && meta.touched && <span>{meta.error}</span>}
              </div>
            )}
          </Field>
          <div className="autocomplete-dropdown-container">
            {loading && <div>Loading...</div>}
            {suggestions.map(suggestion => {
              const className = suggestion.active
                ? 'suggestion-item--active'
                : 'suggestion-item'
              // inline style for demonstration purpose
              const style = suggestion.active
                ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                : { backgroundColor: '#ffffff', cursor: 'pointer' }
              return (
                <div
                  {...getSuggestionItemProps(suggestion, {
                    className,
                    style
                  })}
                >
                  <span>{suggestion.description}</span>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </PlacesAutocomplete>
  )
}
export default LocationSearchInput
// put this code in addressField component
