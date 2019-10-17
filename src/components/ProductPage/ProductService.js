import React from 'react'
import NightIcon from '../../images/moon-stars-duotone.svg';
import WarantyIcon from '../../images/badge-check-duotone.svg';
import DeliveryIcon from '../../images/truck-duotone.svg';

const ProductService = () => {
  return (
    <div className="product-service">
      <div className="service-boxs">
        <img src={NightIcon} alt="try1" />
        <p> 100 Night Trial</p>
      </div>
      <div className="service-boxs">
        <img src={WarantyIcon} alt="try2" />
        <p>1 Year Waranty</p>
      </div>
      <div className="service-boxs">
        <img src={DeliveryIcon} alt="try3" />
        <p>Free Delivery</p>
      </div>
    </div>
  )
}
export default ProductService;
