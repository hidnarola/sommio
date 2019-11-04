import React, { useEffect } from 'react'
import { graphql } from 'gatsby'
import locomotiveScroll from 'locomotive-scroll'
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
  const scrollRef = React.createRef()

  useEffect(() => {
    const scroll = new locomotiveScroll({
      el: scrollRef.current,
      smooth: true
    })
  })
  return (
    <div className="homepage-bg" ref={scrollRef}>
      <div className="goodquiz-bg">
        <div className="container-fluid">
          <div className="row no-gutters">
            <div
              className="col-12 col-lg-7"
              data-scroll
              data-scroll-speed="3"
              data-scroll-position="top"
            >
              <Goodbye />
            </div>
            <div
              className="col-12 col-lg-5"
              data-scroll
              data-scroll-speed="3"
            >
              <Quiz />
            </div>
          </div>
        </div>

        <div
          className="row no-gutters"
          data-scroll-direction="horizontal"
        >
          <div className="ml-auto col-12 col-lg-10"  data-scroll data-scroll-speed="0.5">
            <HomeService />
          </div>
        </div>

        <div className="container-fluid">
          <div className="row">
            <div
              className="col-12 col-lg-5"
              data-scroll
              data-scroll-speed="0.5"
              data-scroll-direction="horizontal"
            >
              <SecretIngredient />
            </div>
          </div>
        </div>
      </div>

      <HelpSlider />

      <div className="container-fluid">
        <div className="row">
          <div
            className="col-12"
          >
            <BlanketImages />
          </div>

          <div
            className="col-12 col-lg-8 mx-auto"
            data-scroll
            data-scroll-speed="1"
            data-scroll-direction="horizontal"
          >
            <MagicWeightex />
          </div>

          <div className="col-12">
            <BlanketDifference />
          </div>

          <div className="col-12">
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
