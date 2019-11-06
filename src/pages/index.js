import React, { useEffect } from 'react'
import { graphql } from 'gatsby'

import Goodbye from '../components/HomePage/Goodbye'
import Quiz from '../components/HomePage/Quiz'
import HomeService from '../components/HomePage/HomeService'
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
    <div className="homepage-bg" >
      <div className="goodquiz-bg">
        <div className="container-fluid">
          <div className="row no-gutters">
            <div
              className="col-12 col-lg-7"
            >
              <Goodbye />
            </div>
            <div className="col-12 col-lg-5">
              <Quiz />
            </div>
          </div>
        </div>

        <div className="row no-gutters" id="service">
          <div className="ml-auto col-12 col-lg-10">
            <HomeService />
          </div>
        </div>

        <div className="container-fluid">
          <div className="row">
            <div
              className="col-12 col-lg-5"

            >
              <SecretIngredient />
            </div>
          </div>
        </div>
      </div>

      <HelpSlider />

      <div className="container-fluid">
        <div className="row">
          <div className="col-12" data-scroll>
            <BlanketImages />
          </div>

          <div
            className="col-12 col-lg-8 mx-auto"
            data-scroll
            data-scroll-speed="2"
          >
            <MagicWeightex />
          </div>

          <div className="col-12" >
            <BlanketDifference />
          </div>

          <div className="col-12" >
            <CustomerReview />
          </div>
        </div>
      </div>
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
