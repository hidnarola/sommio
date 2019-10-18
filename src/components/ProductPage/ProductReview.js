import React from 'react'
import Slider from 'react-slick'
import StarIconGreen from '../../images/star-icon-green.svg'
import StarIconRed from '../../images/star-icon-red.svg'

const ProductReview = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  }
  return (
    <div className="product-review">
      <div className="review-totals">
        <div className="star-list">
          <div className="star">
            <img src={StarIconGreen} />
          </div>
          <div className="star">
            <img src={StarIconGreen} />
          </div>
          <div className="star">
            <img src={StarIconGreen} />
          </div>
          <div className="star">
            <img src={StarIconGreen} />
          </div>
          <div className="star">
            <img src={StarIconGreen} />
          </div>
        </div>
        <span>120 Reviews</span>
      </div>

      <Slider {...settings}>
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
        </div>
      </Slider>
    </div>
  )
}
export default ProductReview
