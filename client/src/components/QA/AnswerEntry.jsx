import React, { useState } from 'react';

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
        by {props.answer.answerer_name}, {props.answer.date} | Helpful? Yes({props.answer.helpfulness}) | <button>Report</button>
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