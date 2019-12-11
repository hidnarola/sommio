import React from 'react'
import Img from 'gatsby-image'
import cx from 'classnames'
import Noimage from '../images/no_img.jpg'
export default function Photo({ src, cartImg, transparent, ...props }) {
  const imageClass = cx('product-image', {
    'bg-grey-light': !transparent
  })
  if (!src) return <span>No photo</span>

  return (
    <div className={imageClass}>
      <img src={src} alt="" {...props} />
    </div>
  )
}
