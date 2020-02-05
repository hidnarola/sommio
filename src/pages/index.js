import React from 'react'
import Goodbye from '../components/HomePage/Goodbye'
import Quiz from '../components/HomePage/Quiz'
import HomeService from '../components/HomePage/HomeService'
import SecretIngredient from '../components/HomePage/SecretIngredient'
import HelpSlider from '../components/ProductPage/HelpSlider'
import BlanketImages from '../components/HomePage/BlanketImages'
import MagicWeightex from '../components/HomePage/MagicWeightex'
import BlanketDifference from '../components/HomePage/BlanketDifference'
import CustomerReview from '../components/HomePage/CustomerReview'

const IndexPage = () => {
  return (
    <div className="homepage-bg">
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

        <div className="row no-gutters" id="service">
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
      <div>
        <h2>Contact Us</h2>
        <form method="post" action="#" data-netlify="true" name="contact">
          <input type="hidden" name="form-name" value="contact" />
          <input type="text" name="name" id="name" required />
          <input type="text" name="email" id="email" required />
          <textarea name="message" id="message" rows="4" required />
          <input type="submit" value="Send Message" />
        </form>
      </div>
    </div>
  )
}

export default IndexPage
