const stripeValidation = values => {
  const errors = {}

  if (!values.stripe || !values.stripe.complete) {
    if (!errors.stripe) {
      errors.stripe = {}
    }
    errors.stripe.complete = 'Required'
  }

  return errors
}

export default stripeValidation
