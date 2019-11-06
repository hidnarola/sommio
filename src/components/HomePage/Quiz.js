import React from 'react'
import { Link } from 'gatsby'
import PlayIcon from '../../images/play-duotone.png'

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
      <Link to="/quizPage" className="btn btn-info ml-auto">
        Start
        <img src={PlayIcon} />
      </Link>
    </div>
  )
}
export default Quiz


{quiz[steps].A.map((ans, i) => (
            <p onClick={_ => selectAnswer(steps, ans, i)}>
              {i + 1}. {ans}
            </p>
          ))}


const Cities = ({ cities = ["London", "Barcelona", "Los Angeles", "New York", "Wigan"] }) => {
    const [activeCity, setCity] = useState(null);

    return (
        <>
            {cities.map(city =>
              <p key={city} onClick={() => { setCity(city) }} style={{ color: activeCity === city ? "red" : "green" }}>
              {city}
              </p>
            )}
        </>
    );
};
