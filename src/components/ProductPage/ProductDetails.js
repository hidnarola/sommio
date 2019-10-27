import React from 'react'
import IntroducingImg from '../../images/BlanketDOF.png'
import styled from "styled-components"

const DetailContain = styled.section``

const TitleContain = styled.div`
  margin:0 15px;
  padding-bottom:20px;
  border-bottom:solid 2px rgba(255,255,255,0.3);

  h2{
    font-size:4em;
    line-height:1;
    margin-top:0;

    &:first-child{
      color:#ffffff
    }

  }
`


const ProductDetails = ({
  overview,
}) => {
  return (
    <DetailContain>
      <TitleContain dangerouslySetInnerHTML={{
            __html: overview.childMarkdownRemark.html,
          }}
      />
    </DetailContain>


  )
}
export default ProductDetails
