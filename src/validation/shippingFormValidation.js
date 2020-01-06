const shippingFormValidation = values => {
  console.log('values => ', values)

  const errors = {}
  console.log('values ==>', values.postcode, typeof parseInt(values.postcode))
  if (!values.first_name) {
    errors.first_name = 'Required'
  }
  if (!values.last_name) {
    errors.last_name = 'Required'
  }
  if (!values.line_1) {
    errors.line_1 = 'Required'
  }
  if (!values.city) {
    errors.city = 'Required'
  }
  if (!values.county) {
    errors.county = 'Required'
  }
  if (!values.postcode) {
    console.log('values before => ', values.postcode, typeof values.postcode)
    errors.postcode = 'Required'
  }
  if (!values.country) {
    errors.country = 'Required'
  }
  return errors
}

export default shippingFormValidation
