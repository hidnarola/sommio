import React from 'react'
import { graphql, Link } from 'gatsby'
import Category from '../components/Category'
import LocomotiveScroll from 'locomotive-scroll'
import Goodbye from '../components/HomePage/Goodbye'
import Quiz from '../components/HomePage/Quiz'
import ProductService from '../components/ProductPage/ProductService'
import SecretIngredient from '../components/HomePage/SecretIngredient'
import HelpSlider from '../components/ProductPage/HelpSlider'
import BlanketImages from '../components/HomePage/BlanketImages'
import MagicWeightex from '../components/HomePage/MagicWeightex'
import BlanketDifference from '../components/HomePage/BlanketDifference'
import CustomerReview from '../components/HomePage/CustomerReview'

function IndexPage({
  data: {
    categories: { edges: categories }
  }
}) {
  return (
    <div className="home-page">
      <div className="container-fluid">
        <div className="row no-gutters">
          <div className="col-12 col-lg-8">
            <Goodbye />
          </div>
          <div className="col-12 col-lg-4">
            <Quiz />
          </div>
        </div>
      </div>
      <ProductService />
      <SecretIngredient />
      <HelpSlider />
      <BlanketImages />
      <MagicWeightex />
      <BlanketDifference />
      <CustomerReview />
    </div>
  )
}

export const query = graphql`
  query IndexPageQuery {
    categories: allMoltinCategory {
      edges {
        node {
          id
          name
          slug
          description
          products {
            name
            mainImage {
              childImageSharp {
                fluid(maxWidth: 560) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`

export default IndexPage
