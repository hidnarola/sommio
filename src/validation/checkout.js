import IsEmail from 'validator/lib/isEmail'

const checkoutValidation = values => {
  const errors = {}
  if (!values.customer || !values.customer.email) {
    if (!errors.customer) {
      errors.customer = {}
    }

    errors.customer.email = 'Required'
  }

  if (
    values.customer &&
    values.customer.email &&
    !IsEmail(values.customer.email)
  ) {
    if (!errors.customer) {
      errors.customer = {}
    }

    errors.customer.email = 'Provide a valid email'
  }

  if (
    values.createCustomer &&
    (!values.customer || !values.customer.password)
  ) {
    if (!errors.customer) {
      errors.customer = {}
    }

    errors.customer.password = 'Required'
  }

  if (!values.shipping_address || !values.shipping_address.first_name) {
    if (!errors.shipping_address) {
      errors.shipping_address = {}
    }

    errors.shipping_address.first_name = 'Required'
  }

  if (!values.shipping_address || !values.shipping_address.last_name) {
    if (!errors.shipping_address) {
      errors.shipping_address = {}
    }

    errors.shipping_address.last_name = 'Required'
  }

  if (!values.shipping_address || !values.shipping_address.line_1) {
    if (!errors.shipping_address) {
      errors.shipping_address = {}
    }

    errors.shipping_address.line_1 = 'Required'
  }

  if (!values.shipping_address || !values.shipping_address.city) {
    if (!errors.shipping_address) {
      errors.shipping_address = {}
    }

    errors.shipping_address.city = 'Required'
  }

  if (!values.shipping_address || !values.shipping_address.county) {
    if (!errors.shipping_address) {
      errors.shipping_address = {}
    }

    errors.shipping_address.county = 'Required'
  }

  if (!values.shipping_address || !values.shipping_address.postcode) {
    if (!errors.shipping_address) {
      errors.shipping_address = {}
    }

    errors.shipping_address.postcode = 'Required'
  }

  if (!values.shipping_address || !values.shipping_address.country) {
    if (!errors.shipping_address) {
      errors.shipping_address = {}
    }

    errors.shipping_address.country = 'Required'
  }

  return errors
}

export default checkoutValidation
