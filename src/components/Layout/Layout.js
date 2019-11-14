import React, { useEffect } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { ToastContainer } from 'react-toastify'
import { Link } from 'gatsby'
import { Helmet } from 'react-helmet'
import useMoltinInventory from '../../hooks/useMoltinInventory'
import { StateProvider } from '../../context/SiteContext';

import Header from './Header'
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
const initialState = {
  theme: { primary: 'green' },
  quiz:{currentQuestion: 0},
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'changeTheme':
      return {
        ...state,
        theme: action.newTheme
      };
    
    case 'changeQuestion':
      return{
        ...state,
        quiz: action.nextQuestion
      }
      
      
    default:
      return state;
  }
};

const Layout = ({ children }) => {

  
  const { site, categories, collections, allMoltin } = useStaticQuery(
    categoriesQuery
  )

  const product = allMoltin.nodes.find(element => {
    return element.relationships.parent === null
  })

  return (
    <StateProvider initialState={initialState} reducer={reducer}>
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
      <Header
        siteTitle={site.siteMetadata.title}
        collections={collections}
        slug={product.slug}
      />

      <main>{children}</main>
      <ToastContainer {...toastOptions} />
    </StateProvider>
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
    allMoltin: allMoltinProduct {
      nodes {
        slug
        id
        name
        relationships {
          parent {
            data {
              id
            }
          }
        }
      }
    }
  }
`

export default Layout
