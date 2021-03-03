import React, { useState } from 'react';
import AnswerList from './AnswerList.jsx';

const QuestionEntry = (props) => {

  return (
    <div>
      Q:{props.question.question}
      <button>Answer Question</button>
      <AnswerList answers={props.question.answers}/>
    </div>
  )
}

export default QuestionEntry;