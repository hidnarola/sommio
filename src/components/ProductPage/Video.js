import React, {useState, useRef} from 'react'
import { Helmet } from 'react-helmet'
import VisibilitySensor from "react-visibility-sensor"
import Explode from "../../video/exploding.mp4"
import styled from "styled-components"
import Row from 'react-bootstrap/Row'
import ReactPlayer from 'react-player'

import Overlay from 'react-bootstrap/Overlay'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import Popover from 'react-bootstrap/Popover'
import PopoverContent from 'react-bootstrap/PopoverContent'
import PopoverTitle from 'react-bootstrap/PopoverTitle'

const VideoWrap = styled(Row)`
  width:80vw;
  margin:auto;
  position:relative;
`
const CircleContain = styled.div`
  position:absolute;
  top:0%;
  left:0%;
  width:100%;
  height:100%;
`
const PlusCircle = styled.div`
  position:absolute;
  top:20%;
  left:20%;
  background:#ACC7F0;
  height:50px;
  width:50px;
  border-radius:50%;
  display:flex;
  align-items:center;
  justify-content:center;
  opacity:0;
  transition:all 0.3s;
  cursor:pointer;

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
  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(null);
  const ref = useRef(null);
  const handleClick = event => {
    setShow(!show);
    setTarget(event.target);
  };
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
      <CircleContain>
      <PlusCircle open={!isClosed} ref={ref} onClick={handleClick}>
      +
      <Overlay
        show={show}
        target={target}
        placement="bottom"
        container={ref.current}
        containerPadding={20}
      >
      <Popover >
          <Popover.Title as="h3">Popover bottom</Popover.Title>
          <Popover.Content>
            <strong>Holy guacamole!</strong> Check this info.
          </Popover.Content>
        </Popover>
        </Overlay>

      </PlusCircle >
      </CircleContain>


    </ VideoWrap>


  )

}

export default ProductVideo
