import React, { useState } from 'react'
import AnswerCard from './AnswerCard'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { FaArrowLeft } from 'react-icons/fa';
import { useStateValue } from '../../context/SiteContext';
import YAMLData from '../../../content/Quiz.yaml' 


const Questions = YAMLData

const QuizSlide = () => {
    const [{ quiz }, dispatch] = useStateValue();
    const CurrentQuestion = Questions[quiz.currentQuestion]
    return(
        <Row>
          {CurrentQuestion !== 0 ? (<div 
          className="back"
          onClick={() => dispatch({
            type: 'changeQuestion',
            nextQuestion: {currentQuestion: quiz.currentQuestion - 1}
          })}
          >
            <FaArrowLeft />
          </div>) : null}
          <Col className="QuestionContain" >
            <h4>{CurrentQuestion.Question}</h4>
            <p>{CurrentQuestion.Info}</p>
          </Col>
          <Col className="AnswerContain">
            {CurrentQuestion.Options.map((ans, i, step) => (
              <AnswerCard ans={ans} key={i} />
            ))}
          </Col>
        </Row>
    )
}

export default QuizSlide