import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { ToastContainer } from 'react-toastify'
import { Link } from 'gatsby'
import { Helmet } from 'react-helmet'

import Header from './Header'

import 'react-toastify/dist/ReactToastify.css'
import '../../styles/main.scss'

const toastOptions = {
  position: 'bottom-center',
  draggable: false,
  toastClassName: 'text-xl bg-black text-white text-center p-3 shadow-none',
  progressClassName: 'bg-white opacity-25',
  closeButton: false
}

const Layout = ({ children }) => {
  const { site, allBuitlon } = useStaticQuery(categoriesQuery)

  const builtonProduct = allBuitlon.nodes.find(ele => {
    return ele.main_product === true
  })

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Sommio Gatsby</title>
        <link
          rel="stylesheet"
          type="text/css"
          charset="UTF-8"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
        />
        <script src="https://x.klarnacdn.net/kp/lib/v1/api.js"></script>
        <script src="https://unpkg.com/@builton/core-sdk@latest/dist/main.bundle.js"></script>
        <script src="https://www.gstatic.com/firebasejs/5.5.4/firebase-app.js"></script>
        <script src="https://www.gstatic.com/firebasejs/5.5.4/firebase-auth.js"></script>
        <script src="https://cdn.firebase.com/libs/firebaseui/3.1.1/firebaseui.js"></script>
        <script src="https://js.stripe.com/v3/"></script>
        <link
          type="text/css"
          rel="stylesheet"
          href="https://cdn.firebase.com/libs/firebaseui/3.1.1/firebaseui.css"
        />
      </Helmet>
      <Header
        siteTitle={site.siteMetadata.title}
        human_id={builtonProduct.human_id}
      />

      <main>{children}</main>
      <ToastContainer {...toastOptions} />
    </>
  )
}

const categoriesQuery = graphql`
  query SiteTitleQuery {
    site {
      siteMetadata {
        title
      }
    }

    allBuitlon: allBuiltonProduct {
      nodes {
        id
        name
        human_id
        parents {
          _oid
        }
        main_product
      }
    }
  }
`

export default Layout
