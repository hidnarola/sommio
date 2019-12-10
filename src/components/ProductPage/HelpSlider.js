import React, {useState} from 'react'
import Slider from 'react-slick'
import { useStaticQuery } from 'gatsby'
import { Link } from 'gatsby'
import HelpImg from '../../images/help-img.png'
import HelpImg2 from '../../images/help-img2.png'

const HelpSlider = (props) => {
  const [Active, setActive] = useState(false)

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
          {props.children}
        </Slider>
      </div>
    </div>
  )
}
export default HelpSlider
