import React, { useState } from 'react'
import styled from "styled-components"
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import { useStateValue } from '../../context/SiteContext';


const AnswerBlock = styled.div`
  display:flex;
  flex:1;
  border-bottom: 2px solid rgba(255, 255, 255, 0.3);
  align-items:center;
  padding-left:40px;
  transition:all 0.3s;
  cursor:pointer;
  transition:all 0.3s;


  &:hover{
    background:#010813;
  }
  h5{
    font-weight: 900;
    line-height: 1em;
    font-size:5em;
    height: 1.3em;
    padding-right:30px;
    color:#F9BEBD;
  }
  p{
    font-size:2em;

  }

  ${props => {
      if (props.toggle){
        return `
          background:#ACF0B5
          &:hover{background:#ACF0B5}
          h5{color:#010813}
          p{color::#010813}



        `
      }
  }};
`

const fade = () => {
  
}

const QuizAnswerButton = ({
  i,
  ans,
  steps,
  letter,

  }) => {
    const [{ step }, dispatch] = useStateValue();
    const [active, setActive] = useState(0)
    const clickFunction = () => {
      setActive(1)
    }
    console.log("step" + {step})


    return (
      <AnswerBlock 
        toggle={active ? 1 : 0}  
        onClick={() => dispatch({
          type: 'changeQuestion',
          nextQuestion: {step + 1}
        })}
      >
        <h5>{letter}.</h5><p>{ans}</p>
      </AnswerBlock>

    )

  }

export default QuizAnswerButton
