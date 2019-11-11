import React, { useState } from 'react'


const AnswerCard = ({ans, i}) => {
    return (
        <div className="AnswerBlock" key={i} >
          <p>{ans}</p>
        </div>
    )

  }

export default AnswerCard
