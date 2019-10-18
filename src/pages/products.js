import React from 'react'
import { graphql } from 'gatsby'

import SEO from '../components/SEO'
import PageTitle from '../components/PageTitle'
import ProductGrid from '../components/ProductGrid'

const IndexPage = ({ data: { allMoltinProduct } }) => {
  const productList = []
  allMoltinProduct.edges.map(pro => {
    if (pro.node.relationships.parent === null) {
      productList.push(pro.node)
    }
  })

  return (
    <>
      <SEO title="All Products" />
      {console.log(
        'allMoltinProduct',
        allMoltinProduct,
        'productList==>',
        productList
      )}
      <PageTitle>All Products</PageTitle>

      <ProductGrid products={productList} />
    </>
  )
}

export const query = graphql`
  query allProductsQuery {
    allMoltinProduct {
      edges {
        node {
          relationships {
            parent {
              data {
                id
              }
            }
          }
          id
          name
          slug
          mainImage {
            childImageSharp {
              fluid(maxWidth: 560) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          meta {
            display_price {
              without_tax {
                formatted
              }
            }
          }
        }
      }
    }
  }
`

export default IndexPage
