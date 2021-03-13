import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Button, Card, Badge } from 'react-bootstrap';

const AnswerEntry = ({ answer }) => {
  const [reported, setReported] = useState(false);

  const [reportedButton, setReportedButton] = useState('Report');

  const [helpful, setHelpful] = useState(false);

  const [helpfulButton, setHelpfulButton] = useState(`Yes(${answer.helpfulness})`);

  const reportAnswer = () => {
    axios.put(`/qa/questions/${answer.id}/report`);
  };

  const renderReportButton = () => {
    if (reported) {
      return (
        <Button size="sm" variant="link">{reportedButton}</Button>
      );
    }
    return (
      <Button size="sm" onClick={() => setReported(true)} variant="link">{reportedButton}</Button>
    );
  };

  useEffect(() => {
    if (reported) {
      setReportedButton('Reported');
      reportAnswer();
    }
  }, [reported]);

  const markAnswerHelpful = () => {
    axios.put(`/qa/answers/${answer.id}/helpful`);
  };

  useEffect(() => {
    if (helpful) {
      setHelpfulButton(`Yes(${answer.helpfulness + 1})`);
      markAnswerHelpful();
    }
  }, [helpful]);

  if (answer) {
    return (
      <Card.Body>
        <Badge pill variant="secondary">
          A:
        </Badge>
        {'   '}
        {answer.body}
        <div>
          <em>
            <small>
              by
              {answer.answerer_name}
              ,
              {answer.date.slice(0, 10)}
              | Helpful?
              <Button size="sm" variant="link" onClick={() => setHelpful(true)}>
                {helpfulButton}
              </Button>
              |
              {renderReportButton()}
            </small>
          </em>
        </div>
      </Card.Body>
    );
  }
  return (
    <></>
  );
};

AnswerEntry.propTypes = {
  answer: PropTypes.shape({
    id: PropTypes.number,
    date: PropTypes.string,
    body: PropTypes.string,
    answerer_name: PropTypes.string,
    helpfulness: PropTypes.number,
  }),
};

AnswerEntry.defaultProps = {
  answer: {
    id: 1,
    date: 'Turtle',
    body: 'Duck',
    answerer_name: 'Turkey',
    helpfulness: 2,
  },
};

export default AnswerEntry;
