import React, { useState } from 'react'

const Quiz = () => {
  const [steps, setSteps] = useState(0)
  const [quiz, setQuiz] = useState([
    {
      No: 1,
      Q: 'How easy do you find it to fall asleep at night ?',
      A: [
        'I fall asleep straight away',
        'It takes 15 – 20 mins',
        'It takes more than 20 mins'
      ],
      S: ''
    },
    { No: 2, Q: 'Do you have a bedtime routine?', A: ['Yes', 'No'], S: '' },
    {
      No: 3,
      Q: 'How do you feel when you wake up in the morning?',
      A: [
        'I feel great, full of beans and ready to face the day',
        'I feel ok',
        'I feel tired and lethargic'
      ],
      S: ''
    },
    {
      No: 4,
      Q: 'Do you feel like you need a nap in the day?',
      A: ['Never', 'Sometimes', 'Always'],
      S: ''
    },
    {
      No: 5,
      Q: 'Do you have trouble controlling your temperature at night?',
      A: ['Yes, all the time', 'Sometimes', 'Never'],
      S: ''
    }
  ])

  const selectAnswer = (id, answer, i) => {
    let newQuiz = [...quiz]
    // newQuiz[id].S = answer
    newQuiz[id].S = i
    setQuiz(newQuiz)
    setSteps(steps + 1)
  }
  return (
    <div>
      {quiz[steps] !== undefined ? (
        <>
          <h1>Quiz</h1>
          <h4>{quiz[steps].Q}</h4>
          {quiz[steps].A.map((ans, i) => (
            <p onClick={_ => selectAnswer(steps, ans, i)}>
              {i + 1}.{ans}
            </p>
          ))}
        </>
      ) : (
        <div>
          <h2>Suggestions</h2>
          {quiz.map(q => {
            if (q.No === 1 && (q.S === 1 || q.S === 2)) {
              return (
                <p>
                  You could benefit from using a weighted blanket as part of
                  your night-time routine. Using a weighted blanket during the
                  hour before going to bed can promote the production of the
                  sleep hormone – melatonin, preparing you for the night ahead.
                </p>
              )
            } else if (q.No === 2 && q.S === 1) {
              return (
                <>
                  <p>
                    If you are having trouble sleeping, it’s a good idea to get
                    yourself into a bedtime routine. This should involve
                    relaxing and unwinding, particularly turning off technology
                    and maybe reading a book instead. A warm caffeine free drink
                    or warm bath can also help.
                  </p>
                  <p>
                    You could benefit from using a weighted blanket as part of
                    your night-time routine. Using a weighted blanket during the
                    hour before going to bed can promote the production of the
                    sleep hormone – melatonin, preparing you for the night
                    ahead.
                  </p>
                </>
              )
            } else if (q.No === 3 && q.S === 2) {
              return (
                <p>
                  It sounds like you’re not getting the quality of sleep your
                  body needs. With the help of a weighted cover, sleep can be
                  improved. It’s been proven that a weighted cover can lower
                  cortisol levels (the stress hormone) due to the applied low
                  pressure, creating a feeling of relaxation and well-being. It
                  also promotes production of the happiness hormone - serotonin
                  and the sleep hormone - melatonin. The reduction in cortisol
                  and increase in serotonin and melatonin combine to make your
                  muscles and nervous system relax making you feel comforted and
                  cosseted which can help send you to sleep and keep you asleep.
                </p>
              )
            } else if (q.No === 4 && (q.S === 1 || q.S === 2)) {
              return (
                <p>
                  It sounds like you’re not getting the quality of sleep your
                  body needs. With the help of a weighted cover, sleep can be
                  improved. It’s been proven that a weighted cover can lower
                  cortisol levels (the stress hormone) due to the applied low
                  pressure, creating a feeling of relaxation and well-being. It
                  also promotes production of the happiness hormone - serotonin
                  and the sleep hormone - melatonin. The reduction in cortisol
                  and increase in serotonin and melatonin combine to make your
                  muscles and nervous system relax making you feel comforted and
                  cosseted which can help send you to sleep and keep you asleep.
                </p>
              )
            } else if (q.No === 5 && (q.S === 1 || q.S === 2)) {
              return (
                <p>
                  Many of us have trouble controlling our temperature a night.
                  This could be down to a physiological condition, such as the
                  menopause or could simply be down to your bedroom being too
                  hot or cold. The ideal temperature for the bedroom is about 16
                  – 18 °C. It’s also a good idea to have an open window so that
                  the air can circulate. Some weighted blankets on the market
                  are very warm because they are padded, like a duvet and the
                  weight is produced by plastic beads. Our weighted blankets are
                  not padded, and the weight is produced by chromium alloy
                  micro-beads which have a low specific heat capacity which
                  means they do not retain heat.
                </p>
              )
            }
          })}
        </div>
      )}
    </div>
  )
}
export default Quiz
