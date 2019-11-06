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
    // document.getElementsByTagName('body')[0].setAttribute('id', 'scroll')
    // let bodyId = document.getElementsByTagName('body')[0].id
    // alert(bodyId)
    const scroll = new locomotiveScroll({
      el: scrollRef.current,
      smooth: true
    })
    // const scroll = new locomotiveScroll({
    //   el: document.querySelector(`#${bodyId}`),
    //   smooth: true
    // })
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
            <div className="col-12 col-lg-5">
              <Quiz />
            </div>
          </div>
        </div>

        <div className="row no-gutters"  id="service">
          <div
            className="ml-auto col-12 col-lg-10"
            data-scroll
            data-scroll-direction="horizontal"
            data-scroll-speed="2"
            data-scroll-position="top"
            data-scroll-target="#service"
          >
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

          <div className="col-12" data-scroll data-scroll data-scroll-speed="1">
            <BlanketDifference />
          </div>

          <div className="col-12" data-scroll>
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
