import React from 'react'
import { Elements } from 'react-stripe-elements'

import { BuiltonProvider } from './src/context'
// import StripeProvider from './src/components/StripeProvider'
import { StripeProvider } from 'react-stripe-elements'
import Layout from './src/components/Layout'

export const wrapRootElement = ({ element }) => {
  return (
    <StripeProvider apiKey={process.env.GATSBY_BUILTON_STRIPE_KEY}>
      <BuiltonProvider>
        <Elements>{element}</Elements>
      </BuiltonProvider>
    </StripeProvider>
  )
}

export const wrapPageElement = ({ element, props }) => {
  return <Layout {...props}>{element}</Layout>
}

// import React from 'react'
// import { Elements } from 'react-stripe-elements'

// import { MoltinProvider } from './src/context'
// import StripeProvider from './src/components/StripeProvider'
// import Layout from './src/components/Layout'

// export const wrapRootElement = ({ element }) => {
//   return (
//     <StripeProvider>
//       <MoltinProvider clientId={process.env.GATSBY_MOLTIN_CLIENT_ID}>
//         <Elements>{element}</Elements>
//       </MoltinProvider>
//     </StripeProvider>
//   )
// }

// export const wrapPageElement = ({ element, props }) => {
//   return <Layout {...props}>{element}</Layout>
// }
