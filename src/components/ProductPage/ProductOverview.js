import React from 'react'
import styled from "styled-components"
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import FeatureSlider from '../components/ProductPage/FeatureSlider'
import FeatureSlide from '../components/ProductPage/FeatureSlide'

const TitleContain = styled.div`
  margin:0 15px;
  padding-bottom:20px;

  h2{
    font-size:5em;
    color:
    #ACC7F0;
    font-weight: 900;
    margin: 0;
    line-height: 1;

    &:first-child{
      color:#ffffff
    }

  }
`

const DarkRow = styled(Row)`
margin: 20px 0 40px 0;


h3{
  width:100%;
}
`
const ImageGrid = styled.div`
  display:grid;
  grid-template-columns: 50% 50%;
  grid-template-rows: 50% 50%;
  width:100%;
  height:70vh;

  div{
    width:100%;
    display:flex;
    align-items:end;
    overflow:hidden;
    &:first-child{
      grid-row-start: 1;
      grid-row-end: 3;
    }
    img{width:100%}
  }
`
const ProductOverview = ({
  Headings,
  LastWord,
  Overview,
  Features
}) => {
  return (
    <Container fluid>
      <Row>
        <TitleContain><h2 >{Headings}</h2><h2>{LastWord}</h2></TitleContain>
      </Row>
      <DarkRow>
        <Col md={12}>
        <h3>What is it?</h3>
        </Col>
        <Col md={9}>
          <div dangerouslySetInnerHTML={{
                __html: Overview.childMarkdownRemark.html,
              }}
          />
        </Col>
        <Col md={3} className="justify-content-md-center d-flex">
          <ul>
          {Features.map((element, index) => (
            <li >{element.title}</li>
          ))}
          </ul>
        </Col>
      </DarkRow>


      <ImageGrid>
      <div><img src="https://cdn.shopify.com/s/files/1/0064/3262/0633/t/35/assets/sleepings.png?128218" /></div>
      <div><img src="https://cdn.shopify.com/s/files/1/0064/3262/0633/t/35/assets/sleeping-sheets-2.png?128218" /></div>
      <div><img src="https://cdn.shopify.com/s/files/1/0064/3262/0633/t/35/assets/pillow.png?128218" /></div>
      </ImageGrid>
        <FeatureSlider >
          <FeatureSlide {...FeatureSlides} / >
          <FeatureSlide {...FeatureSlides} / >
        </FeatureSlider>
    </Container>

  )
}
