import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Card, Badge } from 'react-bootstrap';

const AnswerEntry = (props) => {

  const [reported, setReported] = useState(false);

  const [reportedButton, setReportedButton] = useState('Report');

  const [helpful, setHelpful] = useState(false);


  const [helpfulButton, setHelpfulButton] = useState(`Yes(0)`);


  //My code run infinate loops with this line
  //setHelpfulButton(`Yes(${props.answer.helpfulness})`)


  const displayName = () => {
    if (props.answer.answerer_name === "seller") {
      return (
        <b>"Seller"</b>
      )
    } else {
      return (
        <span>props.answer.answerer_name</span>
      )
    }
  }

  const reportAnswer = () => {
    console.log('reporting')
    axios.put(`/qa/questions/${props.answer.id}/report`)

  }

  const renderReportButton = () => {
    if (reported) {
      return (
        <Button size="sm" variant="link">{reportedButton}</Button>
      )
    } else {
      return (
        <Button size="sm" onClick={() => setReported(true)} variant="link">{reportedButton}</Button>
      )
    }
  }

  useEffect(() => {
    if (reported) {
      setReportedButton('Reported')
      reportAnswer()
    }
  }, [reported])

  const markAnswerHelpful = () => {
    console.log('marking as helpful');
    axios.put(`/qa/answers/${props.answer.id}/helpful`);
  }

  useEffect(() => {
    if (helpful) {
      setHelpfulButton(`Yes(${props.answer.helpfulness + 1})`);
      markAnswerHelpful();
    }
  }, [helpful])


  if (props.answer) {
    return (
      <Card.Body>
        <Badge pill variant="secondary">
          A:
        </Badge>{'    '} {props.answer.body}
        <div>
        <em><small>by {props.answer.answerer_name}, {props.answer.date} | Helpful? <Button size="sm" variant="link" onClick={() => setHelpful(true)} >{helpfulButton}</Button> | {renderReportButton()} </small></em>
        </div>
      </Card.Body>
    )
  } else {
    return (
      <div></div>
    )
  }
}

export default AnswerEntry;