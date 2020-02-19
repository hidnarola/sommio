import React from 'react'
import { graphql } from 'gatsby'

import SEO from '../components/SEO'
import PageTitle from '../components/PageTitle'
import ProductGrid from '../components/ProductGrid'

const IndexPage = ({ data: { allBuiltonProduct } }) => {
  const baseProductList =
    allBuiltonProduct &&
    allBuiltonProduct.nodes.filter(mainProduct => {
      return (
        mainProduct.parents.length < 1 && mainProduct.name !== 'Shipping cost'
      )
    })

  return (
    <>
      <SEO title="All Products" />
      <PageTitle>All Products</PageTitle>

      <ProductGrid products={baseProductList} />
    </>
  )
}

export const query = graphql`
  query allProductsQuery {
    allBuiltonProduct {
      nodes {
        _id {
          _oid
        }
        name
        price
        media {
          human_id
          url
        }
        human_id
        description
        main_product
        parents {
          _oid
        }
        _sub_products {
          _oid
        }
      }
    }
  }
`

export default IndexPage
