import React from 'react'
import { Elements } from 'react-stripe-elements'

import { MoltinProvider } from './src/context'
import StripeProvider from './src/components/StripeProvider'
import Layout from './src/components/Layout'

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
    <StripeProvider>
      <MoltinProvider clientId={process.env.GATSBY_MOLTIN_CLIENT_ID}>
        <Elements>{element}</Elements>
      </MoltinProvider>
    </StripeProvider>
  )
}

export const wrapPageElement = ({ element, props }) => {
  return <Layout {...props}>{element}</Layout>
}
