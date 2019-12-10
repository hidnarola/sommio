import React, { useState } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'
import Slider from 'react-slick'

function ProductImage({ productId }) {
  const { allBuiltonProduct } = useStaticQuery(
    graphql`
      query {
        allBuiltonProduct {
          nodes {
            parent {
              id
            }
            name
            media {
              human_id
              url
            }
            main_product
            id
          }
        }
      }
    `
  )
  console.log('allBuiltonProduct => ', allBuiltonProduct)
  const mainProduct = allBuiltonProduct.nodes.filter(product => {
    console.log('product => ', product)
  })
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
        {/* {allBuiltonProduct.edges.map(product => (
          <Img
            fluid={
              product.node &&
              product.node.mainImage &&
              product.node.mainImage.childImageSharp &&
              product.node.mainImage.childImageSharp.fluid
            }
            alt="product-image"
          />
        ))} */}
      </Slider>
    </div>
  )
}
export default ProductImage
