import React from 'react'
import Slider from 'react-slick'
import { Link } from 'gatsby'
import HelpImg from '../../images/help-img.png'
import HelpImg2 from '../../images/help-img2.png'

const HelpSlider = () => {
  const settings = {
    dots: false,
    infinite: false,
    slidesToShow: 2.5,
    slidesToScroll: 1,
    centerMode: false
  }
  return (
    <div className="helpslider-bg">
      <div className="container-fluid">
        <h3>Helps you with</h3>
        <Slider {...settings}>
          <div className="help-boxs">
            <img src={HelpImg} />
            <div className="help-content">
              <h2>Stress</h2>
              <Link to="#" className="btn btn-link">
                Read More
              </Link>
            </div>
          </div>
          <div className="help-boxs">
            <img src={HelpImg2} />
            <div className="help-content">
              <h2>Anxiety</h2>
              <Link to="#" className="btn btn-link">
                Read More
              </Link>
            </div>
          </div>
          <div className="help-boxs">
            <img src={HelpImg} />
            <div className="help-content">
              <h2>Demo</h2>
              <Link to="#" className="btn btn-link">
                Read More
              </Link>
            </div>
          </div>
        </Slider>
      </div>
    </div>
  )
}
export default HelpSlider
