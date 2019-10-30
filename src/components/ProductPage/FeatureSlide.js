import React from 'react'

import Img from 'gatsby-image'
import CustomScroll from 'react-custom-scroll';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import styled from "styled-components"


const LeftPanel = styled(Col)`
  align-content:center;
  padding:20px;
  display:block;






`

const Contain = styled(Row)`
  height:800px;

`


const FeatureSlide = ({
  title,
  blanketImage,
  description,
  featureMedia,
  slug,
  ...props
}) => {
  return (

      <div>
        <div className="header">
        <h3>{title}</h3>
        </div>
        <Contain>
          <LeftPanel md={6}>

          <div>
            <CustomScroll>
            <span dangerouslySetInnerHTML={{
                __html: description.childMarkdownRemark.html,
              }}
            />
            </CustomScroll>
          </div>





          </LeftPanel>
          <Col md={6}>
            <Img
            fluid={blanketImage.fluid}
            backgroundColor={'#eeeeee'}
            objectFit="cover"
            objectPosition="50% 50%"
             />
          </Col>
        </Contain>

      </div>

  )
}

export default FeatureSlide
