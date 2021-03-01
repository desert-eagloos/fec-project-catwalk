import React, { useState } from 'react';
import QuestionEntry from './QuestionEntry';

const QuestionList = (props) => {

  return (
    <div>
      {props.data.map((question, index) => {
        return (
          <QuestionEntry question={question} key={index}/>
        )
      })}
    </div>
  )
}

export default QuestionList;