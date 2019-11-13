import React, {useState, useRef} from 'react'
import { Helmet } from 'react-helmet'
import VisibilitySensor from "react-visibility-sensor"
import Explode from "../../video/exploding.mp4"
import styled from "styled-components"
import Row from 'react-bootstrap/Row'
import ReactPlayer from 'react-player'
import VideoPopover from './VideoPopover'
import Overlay from 'react-bootstrap/Overlay'
import Popover from 'react-bootstrap/Popover'


const VideoWrap = styled(Row)`
  width:80vw;
  margin:auto;
  position:relative;
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
      
      <div className="circleContain">
      
        <VideoPopover title={"Lorem ipsum dolor sit amet, consectetur adipiscing elit"} show={isClosed ? false : true}>
          <div className="inner">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            <img src="https://images.unsplash.com/photo-1573567001730-9eb49e901f40?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60 " />
          </div>

        </VideoPopover>
        <VideoPopover  title={"Feature 2"} show={isClosed ? false : true}>
          <div className="inner">
            <p>Hello</p>
          </div>
        </VideoPopover>
        <VideoPopover  title={"Feature 3"} show={isClosed ? false : true}>
          <div className="inner">
            <p>Hello</p>
          </div>
        </VideoPopover>
        <VideoPopover  title={"Feature 4"} show={isClosed ? false : true}>
          <div className="inner">
            <p>Hello</p>
          </div>
        </VideoPopover>
        <VideoPopover  title={"Feature 5"} show={isClosed ? false : true}>
          <div className="inner">
            <p>Hello</p>
          </div>
        </VideoPopover>
      </div>


    </ VideoWrap>


  )

}

export default ProductVideo
