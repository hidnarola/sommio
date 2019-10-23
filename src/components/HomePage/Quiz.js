import React from 'react'
import {Link} from "gatsby";
const Quiz = () => {
  return (
    <div>
      <h1>Is a weighted blanket a good fit for you ?</h1>
      <h4>
        Take our short quiz to discover whether a sommio weighted blanket could
        help you sleep better and enjoy lower stress
      </h4>
      <Link to="/quizPage">Start</Link>
    </div>
  )
}
export default Quiz;
