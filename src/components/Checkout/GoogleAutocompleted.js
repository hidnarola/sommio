import React, { useState, useContext } from 'react'
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from 'react-places-autocomplete'
import { CheckoutContext } from '../../context/CheckoutContext'
const LocationSearchInput = () => {
  const [address, setAddress] = useState('')
  const { setAddressFromAutoComplete, postal_code } = useContext(
    CheckoutContext
  )

  const handleChange = address => {
    setAddress(address)
  }

  const handleSelect = address => {
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
      value={address}
      onChange={handleChange}
      onSelect={handleSelect}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <div>
          <input
            {...getInputProps({
              placeholder: 'Postcode',
              className: 'location-search-input'
            })}
            value={postal_code}
          />
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
