import React, { useState } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'
import Slider from 'react-slick'

function ProductImage() {
  const { allMoltinProduct } = useStaticQuery(
    graphql`
      query {
        allMoltinProduct {
          edges {
            node {
              mainImage {
                childImageSharp {
                  fluid {
                    src
                  }
                }
              }
            }
          }
        }
      }
    `
  )
  // const length = allMoltinProduct.edges.length - 1
  // const handleNext = () =>
  //   index === length ? setIndex(0) : setIndex(index + 1)
  // const handlePrevious = () =>
  //   index === 0 ? setIndex(length) : setIndex(index - 1)
  // const { node } = allMoltinProduct.edges[index]

  // console.log('node ==>', node)
  // console.log('length', length)
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  }
  return (
    <div className="product-gallery">
      <Slider {...settings}>
        {allMoltinProduct.edges.map(product => (
          <Img
            fluid={
              product.node &&
              product.node.mainImage &&
              product.node.mainImage.childImageSharp &&
              product.node.mainImage.childImageSharp.fluid
            }
            alt="product-image"
          />
        ))}
      </Slider>
    </div>
  )
}
export default ProductImage
