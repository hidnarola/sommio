import React, { useState } from 'react'


const AnswerCard = ({ans, i, step}) => {
    return (
        <div className="AnswerBlock" key={i} >
          <p>{ans}</p>
        </div>
    )

  }

export default AnswerCard
