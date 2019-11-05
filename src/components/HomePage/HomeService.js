import React from 'react'
import NightIcon from '../../images/moon-stars-duotone-home.svg'
import WarantyIcon from '../../images/badge-check-duotone-home.svg'
// import DeliveryIcon from '../../images/truck-duotone.svg'
import DeliveryIcon from '../../images/truck-duotone-home.svg'

const HomeService = () => {
  return (
    <div
      className="home-service"

    >
      <div className="service-boxs">
        <img src={NightIcon} />
        <p> 100 Night Trial</p>
      </div>
      <div className="service-boxs">
        <img src={WarantyIcon} />
        <p>1 Year Waranty</p>
      </div>
      <div className="service-boxs">
        <img src={DeliveryIcon} />
        <p>Free Delivery</p>
      </div>
    </div>
  )
}
export default HomeService
