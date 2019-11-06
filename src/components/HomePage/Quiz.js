import React from 'react'
import { Link } from 'gatsby'
import PlayIcon from '../../images/play-duotone.png'
import TransitionLink from "gatsby-plugin-transition-link"
import AniLink from "gatsby-plugin-transition-link/AniLink"

const Quiz = () => {
  return (
    <div className="quiz-boxs" id="start">
      <h2 data-scroll data-scroll-speed="3">
        Is a weighted blanket a good fit for <span>you</span>?
      </h2>
      <p data-scroll data-scroll-speed="3">
        Take our short quiz to discover whether a sommio weighted blanket could
        help you sleep better and enjoy lower stress
      </p>
      <AniLink paintDrip top="entry" to="/quizPage" hex="#ACF0B5" className="btn btn-info ml-auto">
        Start
        <img src={PlayIcon} />
      </AniLink >
    </div>
  )
}
export default Quiz
