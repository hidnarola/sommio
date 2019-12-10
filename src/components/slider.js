import React from 'react'
import Slider from 'react-slick'

class SimpleSlider extends React.Component {
  render() {
    var settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    }
    return (
      <Slider {...settings} className="hero z-10">
        <div>
          <img src="https://source.unsplash.com/random/1600x800" />
        </div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </Slider>
    )
  }
}
export default SimpleSlider
