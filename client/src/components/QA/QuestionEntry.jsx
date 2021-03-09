import React, { useState } from 'react';
import AnswerList from './AnswerList.jsx';

const QuestionEntry = (props) => {

  const [allAnswers, setAllAnswers] = useState(props.question.answers);

  const [addAnswerFormVal, setAddAnswerFormVal] = useState('');

  const [addAnswerFormName, setAddAnswerFormName] = useState('');

  const [addAnswerFormEmail, setAddAnswerFormEmail] = useState('');

  const [addAnswerToggle, setAddAnswerToggle] = useState(false);

  const updateAnswerFormVal = (e) => {
    setAddQFormVal(e.target.value);
  }

  const updateAnswerFormName = (e) => {
    setAddQFormName(e.target.value);
  }

  const updateAnswerFormEmail = (e) => {
    setAddQFormEmail(e.target.value);
  }

  console.log(props);

  const submitAnswer = () => {
    if ( addAnswerFormVal === '' || addAnswerFormName === '' || addAnswerFormEmail === '' ) {
      throw ('You must enter the following:')
    } else {
      axios.post(`/qa/questions/:${props.question.question_id}/answers`,{
        params: {
          body: addAnswerFormVal,
          name: addAnswerFormName,
          email: addAnswerFormEmail,
          photos: '',
        }
      }).then(setAddAnswerFormVal(''))
        .then(setAddAnswerFormName(''))
        .then(setAddAnswerFormEmail(''))
    }
  }

  const renderAnswerQForm = () => {
    if (addAnswerToggle) {
      return (
        <div>
          Your Answer (mandatory)
          <input value={addAnswerFormVal} onChange={updateAnswerFormVal} placeholder='answer question...'></input>
          What is your nickname (mandatory)
          <input value={addAnswerFormName} onChange={updateAnswerFormName} placeholder='Example: jack543!' required></input>
          <div>For privacy reasons, do not use your full name or email address</div>
          Your email (mandatory)
          <input type='email' value={addAnswerFormEmail} onChange={updateAnswerFormEmail} placeholder='Example: jack@email.com' required></input>
          <div>For authentication reasons, you will not be emailed</div>
          <button onClick={submitAnswer}>Submit Answer</button>
        </div>
      )
    }
  }


  return (
    <div>
      Q:{props.question.question_body}
      <span> Helpful? Yes({props.question.question_helpfulness}) |</span><button onClick={() => setAddAnswerToggle(!addAnswerToggle)}>Answer Question</button>
      {renderAnswerQForm()}
      <AnswerList answers={allAnswers}/>
    </div>
  )
}

export default QuestionEntry;