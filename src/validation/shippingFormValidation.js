const shippingFormValidation = (values, currentUser) => {
  let details = JSON.parse(localStorage.getItem('details'))

  const errors = {}

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
    errors.postcode = 'Required'
  }
  if (!values.country) {
    errors.country = 'Required'
  }

  if (!values.phone) {
    errors.phone = 'Required'
  } else if (isNaN(parseInt(values.phone))) {
    errors.phone = 'Must be a number'
  }
  if (!values.email) {
    errors.email = 'Required'
  } else if (
    !/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(
      values.email
    )
  ) {
    errors.email = 'Invalid Email'
  }

  if (details && !details.email && !currentUser) {
    if (!values.password) {
      errors.password = 'Required'
    }

    if (!values.confirm_password) {
      errors.confirm_password = 'Required'
    } else if (values.password !== values.confirm_password) {
      errors.confirm_password = 'Both password should match'
    }
  }

  console.log('shippingFormValidation errors => ', errors)

  return errors
}

export default shippingFormValidation
