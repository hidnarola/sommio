import React, { useContext } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import Slider from 'react-slick'
import { ShippingAndUserDetailContext } from '../../context/ShippingAndUserDetailContext'
function ProductImage({ productId, selectedVariationId }) {
  const { allBuiltonProduct } = useStaticQuery(
    graphql`
      query {
        allBuiltonProduct {
          nodes {
            id
            _id {
              _oid
            }
            media {
              human_id
              url
            }
            name
            image_url
          }
        }
      }
    `
  )
  const { selectedCover, selectedWeight } = useContext(
    ShippingAndUserDetailContext
  )

  const mainProduct = allBuiltonProduct.nodes.filter(product => {
    return product.id === productId
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
        {allBuiltonProduct &&
          allBuiltonProduct.nodes.map(product => {
            if (product._id._oid === selectedVariationId) {
              return product.media.map(i => {
                return <img src={i.url} alt="product-image" />
              })
            }
          })}
      </Slider>
    </div>
  )
}
export default ProductImage
