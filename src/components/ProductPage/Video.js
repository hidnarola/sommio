import React, {useState} from 'react'
import { Helmet } from 'react-helmet'
import VisibilitySensor from "react-visibility-sensor"
import Explode from "../../video/exploding.mp4"
import styled from "styled-components"
import Row from 'react-bootstrap/Row'
import ReactPlayer from 'react-player'

const VideoWrap = styled(Row)`
  width:80vw;
  margin:auto;
  position:relative;
`
const PlusCircle = styled.div`
  position:absolute;
  top:20%;
  left:20%;
  background:#ffffff;
  height:50px;
  width:50px;
  border-radius:50%;
  display:flex;
  align-items:center;
  justify-content:center;
  opacity:0;
  transition:all 0.3s;

  ${props => {
    if (props.open){
      return `
        opacity:1;
      `
    }
  }};

  p{color:#000000 !important}
`

const ProductVideo = () => {
  const [isClosed, setClosed] = useState(true)
  return(

    <VideoWrap>
      <VisibilitySensor>
      {({isVisible}) =>
        <ReactPlayer url={Explode}
        playing={(isVisible && isClosed) ? true : false}
        muted
        width={'100%'}
        height={'100%'}
        loop={false}
        onEnded={() => setClosed(false)}
         />

      }

      </VisibilitySensor>
      <PlusCircle open={!isClosed}>

      </PlusCircle >


    </ VideoWrap>


  )

}

export default ProductVideo
