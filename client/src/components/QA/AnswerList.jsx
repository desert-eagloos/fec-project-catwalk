import React, { useState, useEffect } from 'react';
import AnswerEntry from './AnswerEntry';

const AnswerList = (props) => {

  const allAnswers = props.answers;

  const firstTwoAns = [props.answers[0], props.answers[1]];

  const [answers, setAnswers] = useState(firstTwoAns);

  const [open, setOpen] = useState(false);

  const [moreButton, setMoreButton] = useState('More Answers');

  const toggleAnswers = () => {
    setOpen(!open);
  }

  const renderMoreAnswersButton = () => {
    if (allAnswers.length > 2) {
      return (
        (<button onClick={() => toggleAnswers()}>{moreButton}</button>)
      )
    }
  }

  useEffect(() => {
      if (open) {
      setAnswers(props.answers);
      setMoreButton('Show Less');
    } else {
      setAnswers(firstTwoAns);
      setMoreButton('More Answers');
    }
  }, [open]);

  return (
    <div>
      {
        answers.map((answer, index) => {

          return (
            <AnswerEntry answer={answer} key={index}/>
          )
        })
      }
      {renderMoreAnswersButton()}
    </div>
  )
}

export default AnswerList;