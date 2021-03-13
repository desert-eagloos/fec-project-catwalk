import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Card, Badge } from 'react-bootstrap';

const AnswerEntry = ({ answer }) => {
  const [reported, setReported] = useState(false);

  const [reportedButton, setReportedButton] = useState('Report');

  const [helpful, setHelpful] = useState(false);

  const [helpfulButton, setHelpfulButton] = useState(`Yes(${answer.helpfulness})`);

  const reportAnswer = () => {
    console.log('reporting');
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
    console.log('marking as helpful');
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

// AnswerEntry.propTypes = {
//   date: React.PropTypes.string,
//   body: React.PropTypes.string,
//   answerer_name: React.PropTypes.string,
//   helpfulness: React.PropTypes.number,
// };

export default AnswerEntry;
