import React, {useState} from 'react'
import Img from 'gatsby-image'
import styled from 'styled-components'
import AniLink from "gatsby-plugin-transition-link/AniLink"

const Card = styled.div` 
    position: relative;
    padding: 0 10px;
`
const Content = styled.div` 
    position: absolute;
    left: 30px;
    right: 30px;
    bottom: 20px;

    h2{
    font-size: 140px;
    color: #ffffff;
    display: block;
    line-height: 1;
    margin: 0;
    font-weight: 900;
    }
    a{
    color: #ffffff !important;
    font-size: 34px;
    font-weight: 300;
    line-height: 1;
    text-decoration: none;
    }

                
`
              
const SlideCard = ({
    id,
    conditionName,
    description,
    cardImage,
    slug,
    cardColour

}) => {
    return(
        
        <Card> 
            <Img fluid={cardImage.fluid} backgroundColor={'#eeeeee'} />
            <Content>
            <h2>{conditionName}</h2>
            
            <AniLink paintDrip top="entry" to={`/readMore/${slug}/`} hex={cardColour} className="navbar-brand" duration={0.8}>     
            <a>Read More</a>
            </AniLink>
        </Content>
         
        </Card>
       
    )
}

export default SlideCard;