import React, { useState, useEffect, useRef } from 'react'
import Slider from 'react-slick'
import { Link } from 'gatsby'
import Container from 'react-bootstrap/Container'


function FeatureSlider (props)  {
  const settings = {
    dots: false,
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: false,
    fade: true,
  }
  return (

      <Container  fluid className="featureSlider">
        <h2>What's so great about it?</h2>
        <Slider {...settings}>
          {props.children}
        </Slider>
      </Container>

  )

}

export default FeatureSlider
