import React, { useState } from 'react';
import AnswerList from './AnswerList.jsx';

const QuestionEntry = (props) => {

  return (
    <div>
      Q:{props.question.question}
      <AnswerList answers={props.question.answers}/>
    </div>
  )
}

export default QuestionEntry;