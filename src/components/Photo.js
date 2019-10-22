import React from 'react'
import Img from 'gatsby-image'
import cx from 'classnames'
import Noimage from "../images/no_img.jpg"
export default function Photo({ src, cartImg, transparent, ...props }) {

  const imageClass = cx(
    'product-image',
    {
      'bg-grey-light': !transparent
    }
  )

  function renderImage() {
    if (!src) return <span>No photo</span>

    return cartImg ? (
      <img
        src={src}
        alt=""
        {...props}
      />
    ) : (
      <Img
        fluid={src.childImageSharp ? src.childImageSharp.fluid: Noimage}
        {...props}
      />
    )
  }
  return (
  <div className={imageClass}>
      {renderImage()}
  </div>
  )
}
