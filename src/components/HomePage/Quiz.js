import React from 'react'
import { Link } from 'gatsby';
import PlayIcon from '../../images/play-duotone.png';

const Quiz = () => {
  return (
    <div className="quiz-boxs">
      <h2>Is a weighted blanket a good fit for <span>you</span>?</h2>
      <p>Take our short quiz to discover whether a sommio weighted blanket could help you sleep better and enjoy lower stress</p>
      <Link to="/quizPage" className="btn btn-info ml-auto">
        Start
        <img src={PlayIcon} />
      </Link>
    </div>
  )
}
export default Quiz
