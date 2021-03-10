import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import AnswerEntry from './AnswerEntry';

const AnswerList = (props) => {

  //console.log('props', props);

  const allAnswers = props.answers;

  const sortedAnswers = [];

  // test answers: allAnswers[1092597], allAnswers[1092598]

  const sortAns = () => {
    let helpfulNums = [];
    for (var answerID in props.answers) {
      let helpfulness = props.answers[answerID].helpfulness;
      helpfulNums.push(helpfulness);
    }
    let sortedNums = helpfulNums.sort((a, b) => b-a);
    const innerFunc = (index) => {
      if (index < sortedNums.length) {
        for (var ansID in props.answers) {
          if (sortedNums[index] === props.answers[ansID].helpfulness) {
            sortedAnswers.push(props.answers[ansID])
          }
        }
        innerFunc (index + 1);
      }
    }
    innerFunc(0);
  }

  sortAns ();

  const firstTwoAns = [sortedAnswers[0], sortedAnswers[1]];

  const [answers, setAnswers] = useState(firstTwoAns);

  const [open, setOpen] = useState(false);

  const [moreButton, setMoreButton] = useState('More Answers');

  const toggleAnswers = () => {
    setOpen(!open);
  }

  const renderMoreAnswersButton = () => {
    if (sortedAnswers.length > 2) {
      return (
        (<Button variant="link" onClick={() => toggleAnswers()}>{moreButton}</Button>)
      )
    }
  }

  useEffect(() => {
      if (open) {
      setAnswers(sortedAnswers);
      setMoreButton('Collapse answers');
    } else {
      setAnswers(firstTwoAns);
      setMoreButton('See more answers');
    }
  }, [open]);

  return (
    <div>
      A:
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