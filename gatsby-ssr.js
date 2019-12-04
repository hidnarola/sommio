import React from 'react'
import { Elements } from 'react-stripe-elements'

import { BuiltonProvider } from './src/context'
// import StripeProvider from './src/components/StripeProvider'
import Layout from './src/components/Layout'
import { StripeProvider } from 'react-stripe-elements'
// export function onRenderBody(
//   { setHeadComponents }
// ) {
//  setHeadComponents([
//      <script
//         key="abc"
//         type="text/javascript"
//         src="https://abc.com/abc/abc0123.js"
//       />
//   ]);
// }
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
