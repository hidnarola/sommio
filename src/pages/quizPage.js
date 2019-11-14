import React, { useState } from 'react'
import styled from "styled-components"
import QuizSlide from "../components/Quiz/QuizSlide"
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'


const QuizPage = () => {

  return (

      <Container className="QuizContain"  fluid>
          <QuizSlide /> 
      </Container>

  )
}
export default QuizPage
