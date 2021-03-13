import React, { useState, useEffect } from 'react';
import { Button, Card, Accordion } from 'react-bootstrap';
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

  //const [answers, setAnswers] = useState(firstTwoAns);

  const [open, setOpen] = useState(false);

  const [eventKeyToggle, setEventKeyToggle] = useState('0')

  const [moreButton, setMoreButton] = useState('More Answers');

  const toggleAnswers = () => {
    setOpen(!open);
  }

  const renderMoreAnswersButton = () => {
    if (sortedAnswers.length > 2) {
      // return (
      //   (<Button variant="link" onClick={() => toggleAnswers()}>{moreButton}</Button>)
      // )
      return(
        <Accordion.Toggle as={Button} size='sm' onClick={() => setOpen(!open)} variant="link" eventKey={eventKeyToggle}>
          {moreButton}
        </Accordion.Toggle>
      )
    }
  }

  useEffect(() => {
    if (open) {
      //setAnswers(sortedAnswers);
      setEventKeyToggle('0')
      setMoreButton('Collapse answers');
    } else {
      //setAnswers(firstTwoAns);
      setEventKeyToggle('1')
      setMoreButton('See more answers');
    }
  }, [open]);

  // return (
  //   <div>

  //     A:
  //     {
  //       answers.map((answer, index) => {

  //         return (
  //           <AnswerEntry answer={answer} key={index}/>
  //         )
  //       })
  //     }
  //     {renderMoreAnswersButton()}
  //   </div>
  // )

  return (
    <div>
      {
        firstTwoAns.map((answer, index) => {
          return (
            <Accordion.Collapse eventKey='0' key={index}>
              <AnswerEntry answer={answer} key={index}/>
            </Accordion.Collapse>
          )
        })
      }
      {
        sortedAnswers.slice(0, 5).map((answer, index) => {
          return (
            <Accordion.Collapse eventKey='1' key={index}>
              <AnswerEntry answer={answer} key={index}/>
            </Accordion.Collapse>
          )
        })
      }
      <Card.Footer>{renderMoreAnswersButton()}</Card.Footer>
    </div>
  )
}

export default AnswerList;