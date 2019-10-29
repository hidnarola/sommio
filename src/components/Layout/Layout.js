import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { ToastContainer } from 'react-toastify'
import { Link } from 'gatsby'
import { Helmet } from 'react-helmet'

import Header from './Header'
import Banner from './Banner'
import Footer from './Footer'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css'
import '../../styles/main.scss'

const toastOptions = {
  position: 'bottom-center',
  draggable: false,
  toastClassName: 'text-xl bg-black text-white text-center p-3 shadow-none',
  progressClassName: 'bg-white opacity-25',
  closeButton: false
}

export default function Layout({ children }) {
  const { site, categories, collections } = useStaticQuery(categoriesQuery)

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
      </Helmet>
      <Header siteTitle={site.siteMetadata.title} collections={collections} />
      <main>{children}</main>
      {/* <Banner /> */}
      {/* <Footer categories={categories} /> */}
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

    categories: allMoltinCategory {
      nodes {
        id
        name
        slug
      }
    }

    collections: allMoltinCollection {
      nodes {
        id
        name
        slug
      }
    }
  }
`
