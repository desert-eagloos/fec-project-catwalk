import React, { useState } from 'react';
import { Button } from 'react-bootstrap';

const AnswerEntry = (props) => {

  //console.log(props);

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



  if (props.answer) {
    return (
      <div>
        {props.answer.body}
        <div>
        by {props.answer.answerer_name}, {props.answer.date} | Helpful? <Button variant="link">Yes({props.answer.helpfulness})</Button> | <Button variant="link">Report</Button>
        </div>
      </div>
    )
  } else {
    return (
      <div></div>
    )
  }
}

export default AnswerEntry;