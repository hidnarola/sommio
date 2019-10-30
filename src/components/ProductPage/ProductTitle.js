import React from 'react'
import FlagIcon from '../../images/flag-of-europe.png'

const ProductTitle = ({ title }) => {
  
  return (
    <div className="product-name">
      <h1 > {title}</h1>
      <p className="ml-auto">
        Made in Europe
        <img src={FlagIcon} />
      </p>
    </div>
  )
}

export default ProductTitle
