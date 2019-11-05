import React from 'react'
import Slider from 'react-slick'
import { useStaticQuery } from 'gatsby'
import StarIconRed from '../../images/star-icon-red.svg'

const CustomerReview = () => {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    centerMode: false
  }
  return (
    <div
      className="customerreview-bg"
      data-scroll
      data-scroll-position="top"
      data-scroll-speed="-4"
    >
      <h3
        data-scroll
        data-scroll-speed="-2"
        data-scroll-direction="horizontal"
        data-scroll-position="top"
      >
        Customer Reviews
      </h3>
      <Slider
        {...settings}
        data-scroll
        data-scroll-speed="2"
        data-scroll-direction="vertical"
      >
        <div className="review-boxs">
          <div className="d-flex flex-wrap">
            <div className="content">
              <h4>John</h4>
              <span>Birmingham</span>
            </div>
            <div className="star-list ml-auto">
              <div className="star">
                <img src={StarIconRed} />
              </div>
              <div className="star">
                <img src={StarIconRed} />
              </div>
              <div className="star">
                <img src={StarIconRed} />
              </div>
              <div className="star">
                <img src={StarIconRed} />
              </div>
              <div className="star">
                <img src={StarIconRed} />
              </div>
            </div>
          </div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
          <span className="date-text">Jan 21st 2019</span>
        </div>
        <div className="review-boxs">
          <div className="d-flex flex-wrap">
            <div className="content">
              <h4>John</h4>
              <span>Birmingham</span>
            </div>
            <div className="star-list ml-auto">
              <div className="star">
                <img src={StarIconRed} />
              </div>
              <div className="star">
                <img src={StarIconRed} />
              </div>
              <div className="star">
                <img src={StarIconRed} />
              </div>
              <div className="star">
                <img src={StarIconRed} />
              </div>
              <div className="star">
                <img src={StarIconRed} />
              </div>
            </div>
          </div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
          <span className="date-text">Jan 21st 2019</span>
        </div>
        <div className="review-boxs">
          <div className="d-flex flex-wrap">
            <div className="content">
              <h4>John</h4>
              <span>Birmingham</span>
            </div>
            <div className="star-list ml-auto">
              <div className="star">
                <img src={StarIconRed} />
              </div>
              <div className="star">
                <img src={StarIconRed} />
              </div>
              <div className="star">
                <img src={StarIconRed} />
              </div>
              <div className="star">
                <img src={StarIconRed} />
              </div>
              <div className="star">
                <img src={StarIconRed} />
              </div>
            </div>
          </div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
          <span className="date-text">Jan 21st 2019</span>
        </div>
        <div className="review-boxs">
          <div className="d-flex flex-wrap">
            <div className="content">
              <h4>John</h4>
              <span>Birmingham</span>
            </div>
            <div className="star-list ml-auto">
              <div className="star">
                <img src={StarIconRed} />
              </div>
              <div className="star">
                <img src={StarIconRed} />
              </div>
              <div className="star">
                <img src={StarIconRed} />
              </div>
              <div className="star">
                <img src={StarIconRed} />
              </div>
              <div className="star">
                <img src={StarIconRed} />
              </div>
            </div>
          </div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
          <span className="date-text">Jan 21st 2019</span>
        </div>
        <div className="review-boxs">
          <div className="d-flex flex-wrap">
            <div className="content">
              <h4>John</h4>
              <span>Birmingham</span>
            </div>
            <div className="star-list ml-auto">
              <div className="star">
                <img src={StarIconRed} />
              </div>
              <div className="star">
                <img src={StarIconRed} />
              </div>
              <div className="star">
                <img src={StarIconRed} />
              </div>
              <div className="star">
                <img src={StarIconRed} />
              </div>
              <div className="star">
                <img src={StarIconRed} />
              </div>
            </div>
          </div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
          <span className="date-text">Jan 21st 2019</span>
        </div>
        <div className="review-boxs">
          <div className="d-flex flex-wrap">
            <div className="content">
              <h4>John</h4>
              <span>Birmingham</span>
            </div>
            <div className="star-list ml-auto">
              <div className="star">
                <img src={StarIconRed} />
              </div>
              <div className="star">
                <img src={StarIconRed} />
              </div>
              <div className="star">
                <img src={StarIconRed} />
              </div>
              <div className="star">
                <img src={StarIconRed} />
              </div>
              <div className="star">
                <img src={StarIconRed} />
              </div>
            </div>
          </div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
          <span className="date-text">Jan 21st 2019</span>
        </div>
      </Slider>
    </div>
  )
}
export default CustomerReview
