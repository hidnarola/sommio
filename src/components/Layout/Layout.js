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
    return ele.main_product === true && ele.tags.length > 0
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
        {/* <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCLzic4qigzdlIc_OV71Czc6a-5uc8SyKA&libraries=places"></script> */}
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
        tags
        parents {
          _oid
        }
        main_product
      }
    }
  }
`

export default Layout
