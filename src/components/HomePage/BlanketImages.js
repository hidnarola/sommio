import React from 'react'
import GridImg1 from '../../images/grid-img1.png'
import GridImg2 from '../../images/grid-img2.png'
import GridImg3 from '../../images/grid-img3.png'
import GridImg4 from '../../images/grid-img4.png'
import GridImg5 from '../../images/grid-img5.png'

const BlanketImages = () => {
  return (
    <div className="github-main">
      <div className="row">
        <div className="col-12 col-lg-6">
          <img src={GridImg1} className="img-fluid w-100" />
        </div>
        <div className="col-12 col-lg-6">
          <div className="row">
            <div className="col-12 col-lg-6">
              <img src={GridImg2} className="img-fluid w-100" />
            </div>
            <div className="col-12 col-lg-6">
              <img src={GridImg3} className="img-fluid w-100" />
            </div>
            <div className="col-12 col-lg-6">
              <img src={GridImg4} className="img-fluid w-100" />
            </div>
            <div className="col-12 col-lg-6">
              <img src={GridImg5} className="img-fluid w-100" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default BlanketImages
