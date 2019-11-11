import React, { useState } from 'react'
import AnswerCard from './AnswerCard'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'


const QuizSlide = ({
  step,
  quiz,
  setStep
  }) => {
    return(
        <Row>
          <Col className="QuestionContain" >
            <h4>{quiz[step].Q}</h4>
          </Col>
          <Col className="AnswerContain">
            {quiz[step].A.map((ans, i, step) => (
              <AnswerCard ans={ans} key={i} />
            ))}
          </Col>
        </Row>
    )
}

export default QuizSlide