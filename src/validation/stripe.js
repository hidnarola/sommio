
const  stripeValidation = (values) => {
  console.log('values stripeValidation paymentButton => ',values);

  const errors = {}

  if (!values.stripe || !values.stripe.complete) {
    if (!errors.stripe) {
      errors.stripe = {}
    }
    errors.stripe.complete = 'Required'
  }

  return errors
}

export default stripeValidation;
