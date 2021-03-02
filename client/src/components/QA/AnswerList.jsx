import React, { useState } from 'react';
import AnswerEntry from './AnswerEntry';

const AnswerList = (props) => {

  return (
    <div>
      {props.answers.map((answer, index) => {
        return (
          <AnswerEntry answer={answer} key={index}/>
        )
      })}
    </div>
  )
}

export default AnswerList;