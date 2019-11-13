import React, { useState } from 'react'
import styled from "styled-components"
import QuizSlide from "../components/Quiz/QuizSlide"
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import QuizProvider from ''


import {
  Param1,
  Param2,
  Param3,
  Param4,
  Param5,
  Param6,
  Param7,
  Param8
} from '../components/HomePage/QuizParam'



const QuizPage = () => {

  const [step, setStep] = useState(0)
  const [quiz, setQuiz] = useState([
    {
      id: 1,
      Q: 'How easy do you find it to fall asleep at night ?',
      A: [
        'I fall asleep straight away',
        'It takes 15 – 20 mins',
        'It takes more than 20 mins'
      ],
      S: ''
    },
    { id: 2, Q: 'Do you have a bedtime routine?', A: ['Yes', 'No'], S: '' },
    {
      id: 3,
      Q: 'How do you feel when you wake up in the morning?',
      A: [
        'I feel great, full of beans and ready to face the day',
        'I feel ok',
        'I feel tired and lethargic'
      ],
      S: ''
    },
    {
      id: 4,
      Q: 'Do you feel like you need a nap in the day?',
      A: ['Never', 'Sometimes', 'Always'],
      S: ''
    },
    {
      id: 5,
      Q: 'Do you have trouble controlling your temperature at night?',
      A: ['Yes, all the time', 'Sometimes', 'Never'],
      S: ''
    },
    {
      id: 6,
      Q: 'How do you feel in the day?',
      A: [
        'Generally pretty good',
        'Ok, but I can get annoyed easily',
        'Mostly grumpy and irritable'
      ],
      S: ''
    },
    {
      id: 7,
      Q: 'How many times do you wake in the night?',
      A: ['Never', 'Sometimes', 'All the time'],
      S: ''
    },
    {
      id: 8,
      Q:
        'If you wake in the night, how long does it take to get back to sleep?',
      A: ['Straight away', 'About 15 minutes', 'More than 15 minutes'],
      S: ''
    },
    {
      id: 9,
      Q: 'How much time do you spend awake in the night in total?',
      A: ['I don’t wake in the night', 'About an hour', 'More than an hour'],
      S: ''
    },
    {
      id: 10,
      Q: 'Do you find you’re always tense and find it hard to relax?',
      A: [
        'No, I’m pretty chilled most of the time',
        'Yes, sometimes I find things stressful',
        'Yes, I’m always on edge'
      ],
      S: ''
    },
    {
      id: 11,
      Q: 'Do you have trouble coping with your emotions?',
      A: [
        'No, I’m emotionally stable',
        'Yes, my emotions are all over the place'
      ],
      S: ''
    },
    {
      id: 12,
      Q: 'Do you work shifts?',
      A: ['Yes', 'No'],
      S: ''
    }
  ])

  const [active, setActive] = useState(null)
  const [show, setShow] = useState(0)

  const selectAnswer = (id, answer, i) => {
    let newQuiz = [...quiz]
    setActive(answer)
    newQuiz[id].S = i
    setQuiz(newQuiz)
    setStep(step + 1);

    // newQuiz[id].S = answer

  }
  return (
    <Container className="QuizContain"  fluid>

      {quiz[step] !== undefined ? (
         <QuizSlide step={step} quiz={quiz}/> 
      ) : (
        <div>
          <h2>Suggestions</h2>
          {quiz.map(q => {
            if (q.id === 1 && (q.S === 1 || q.S === 2)) {
              return <Param1 />
            } else if (q.No === 2 && q.S === 1) {
              return (
                <div>
                  <Param2 />
                  <Param1 />
                </div>
              )
            } else if (q.id === 3 && q.S === 2) {
              return <Param3 />
            } else if (q.id === 4 && (q.S === 1 || q.S === 2)) {
              return <Param3 />
            } else if (q.id === 5 && (q.S === 1 || q.S === 2)) {
              return <Param4 />
            }
          })}
        </div>
      )}

    </Container>
  )
}
export default QuizPage
