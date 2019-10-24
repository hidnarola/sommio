import React from 'react'
import IntroducingImg from '../../images/BlanketDOF.png'
import styled from "styled-components"

const DetailContain = styled.section``

const TitleContain = styled.div`
  margin:0 15px;
  padding-bottom:20px;
  border-bottom:solid 2px rgba(255,255,255,0.3);
`

const BlanketPanel = styled.div`
  margin-left:15px
`

const Header = styled.h2`
`


const ProductDetails = () => {
  return (
    <DetailContain>
      <TitleContain>
        <h4>The weighted blanket</h4>
        <h2>Reinvented</h2>

      </TitleContain>

      <BlanketPanel>
        <div className="row no-gutters">
          <div className="col-12 col-lg-6 d-flex flex-wrap align-items-center">
            <div className="introducing-boxs">
              <h5>Introducing Weightex™</h5>
              <p>
                Enjoy pure weighted luxury. With Sommio Weightex™ fabric for
                perfect weight distribution and temperature management, for an
                exceptional weighted experience.
              </p>
              <button className="btn btn-primary">Discover more</button>
            </div>
          </div>
          <div className="col-12 col-lg-6">
            <div className="img">
              <img src={IntroducingImg} />
            </div>
          </div>
        </div>
      </BlanketPanel>
    </DetailContain>


  )
}
export default ProductDetails
