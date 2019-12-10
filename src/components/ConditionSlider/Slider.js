import React, {useState, useRef} from 'react'
import styled from 'styled-components'
import {useTransition, useSpring, useChain, config} from 'react-spring'



const Container = styled.div`
    height:400px;
    width:100%;
    position:relative;
`

function HelpSlider (props) {
  const [Active, setActive] = useState(false)
  return (
    <Container>
        {props.children}
    </Container>
  )
}
export default HelpSlider
