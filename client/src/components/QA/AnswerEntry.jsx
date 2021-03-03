import React, { useState } from 'react';

const AnswerEntry = (props) => {

  if (props.answer) {
    return (
      <div>
        A:{props.answer}
        <div>
        by [username], Month DD, YYYY
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