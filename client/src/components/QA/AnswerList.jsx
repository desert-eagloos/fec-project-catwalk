import React, { useState, useEffect } from 'react';
import { Button, Card, Accordion } from 'react-bootstrap';
import PropTypes from 'prop-types';
import AnswerEntry from './AnswerEntry';

const _ = require('underscore');

const AnswerList = ({ answers }) => {
  const sortedAnswers = [];
  const sortAns = () => {
    const helpfulNums = [];
    _.each(answers, (answer) => {
      const help = answer.helpfulness;
      helpfulNums.push(help);
    });
    const sortedNums = helpfulNums.sort((a, b) => b - a);
    const innerFunc = (index) => {
      if (index < sortedNums.length) {
        _.each(answers, (answer) => {
          if (sortedNums[index] === answer.helpfulness) {
            sortedAnswers.push(answers);
          }
        });
        innerFunc(index + 1);
      }
    };
    innerFunc(0);
  };

  sortAns();

  const firstTwoAns = [sortedAnswers[0], sortedAnswers[1]];

  const [open, setOpen] = useState(false);

  const [eventKeyToggle, setEventKeyToggle] = useState('0');

  const [moreButton, setMoreButton] = useState('More Answers');

  const renderMoreAnswersButton = () => {
    if (sortedAnswers.length > 2) {
      return (
        <Accordion.Toggle as={Button} onClick={() => setOpen(!open)} variant="link" eventKey={eventKeyToggle}>
          {moreButton}
        </Accordion.Toggle>
      );
    }
    return (
      <></>
    );
  };

  useEffect(() => {
    if (open) {
      setEventKeyToggle('0');
      setMoreButton('Collapse answers');
    } else {
      setEventKeyToggle('1');
      setMoreButton('See more answers');
    }
  }, [open]);

  return (
    <div>
      {
        firstTwoAns.map((answer) => (
          <Accordion.Collapse eventKey="0" key={answer.id}>
            <AnswerEntry answer={answer} key={answer.id} />
          </Accordion.Collapse>
        ))
      }
      {
        sortedAnswers.slice(0, 5).map((answer) => (
          <Accordion.Collapse eventKey="1" key={answer.id}>
            <AnswerEntry answer={answer} key={answer.id} />
          </Accordion.Collapse>
        ))
      }
      <Card.Footer>{renderMoreAnswersButton()}</Card.Footer>
    </div>
  );
};

AnswerList.propTypes = {
  answers: PropTypes.shape({
    answer: PropTypes.shape({
      id: PropTypes.number,
      date: PropTypes.string,
      body: PropTypes.string,
      answerer_name: PropTypes.string,
      helpfulness: PropTypes.number,
    }),
  }),
};

AnswerList.defaultProps = {
  answers: {
    answer: {
      id: 1,
      date: 'Turtle',
      body: 'Duck',
      answerer_name: 'Turkey',
      helpfulness: 2,
    },
  },
};

export default AnswerList;
