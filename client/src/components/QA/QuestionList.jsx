import React, { useState, useEffect } from 'react';
import QuestionEntry from './QuestionEntry';

const QuestionList = (props) => {

  const allData = props.data;

  const firstFour = [allData[0], allData[1], allData[2], allData[3]];

  const [questions, setQuestions] = useState(firstFour);

  const [open, setOpen] = useState(false);

  const [moreButton, setMoreButton] = useState('More Answered Questions');

  console.log('first 4 ', firstFour);

  const toggleQuestions = () => {
    setOpen(!open);
  }

  const renderMoreQuestionsButton = () => {
    if (allData.length > 4) {
      return (
        (<button onClick={() => toggleQuestions()}>{moreButton}</button>)
      )
    }
  }

  useEffect(() => {
    if (open) {
    setQuestions(allData);
    setMoreButton('Show Less');
    } else {
    setQuestions(firstFour);
    setMoreButton('More Answered Questions');
    }
  }, [open]);

  return (
    <div>
      {questions.map((question, index) => {
        return (
          <QuestionEntry question={question} key={index}/>
        )
      })}
      {renderMoreQuestionsButton()}
    </div>
  )
}

export default QuestionList;