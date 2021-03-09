import React, { useState, useEffect } from 'react';
import QuestionEntry from './QuestionEntry';
import axios from 'axios';

const QuestionList = (props) => {

  const setData = props.setData;

  const [allData, setAllData] = useState(props.data);

  const [questionData, setQuestionData] = useState(props.data.results);

  const firstFour = [questionData[0], questionData[1], questionData[2], questionData[3]];

  const [questions, setQuestions] = useState(firstFour);

  const [open, setOpen] = useState(false);

  const [moreButton, setMoreButton] = useState('More Answered Questions');

<<<<<<< Updated upstream
=======
  const [addQuestionToggle, setAddQuestionToggle] = useState(false);

  const [addQFormVal, setAddQFormVal] = useState('');

  const [addQFormName, setAddQFormName] = useState('');

  const [addQFormEmail, setAddQFormEmail] = useState('');

>>>>>>> Stashed changes
  const toggleQuestions = () => {
    setOpen(!open);
  }

  const updateQFormVal = (e) => {
    console.log(e.target.value);
    setAddQFormVal(e.target.value);
  }

  const updateQFormName = (e) => {
    console.log(e.target.value);
    setAddQFormName(e.target.value);
  }

  const updateQFormEmail = (e) => {
    console.log(e.target.value);
    setAddQFormEmail(e.target.value);
  }

  const submitQuestion = () => {
    if ( addAnswerFormVal === '' || addAnswerFormName === '' || addAnswerFormEmail === '' ) {
      throw ('You must enter the following:')
    } else {

      axios.post(`/qa/questions/:${props.data.product_id}`,{
        params: {
          body: addQFormVal,
          name: addQFormName,
          email: addQFormEmail
        }
      }).then(setAddQFormVal(''))
        .then(setAddQFormName(''))
        .then(setAddQFormEmail(''))
    }
  }

  const renderMoreQuestionsButton = () => {
    if (allData.length > 4) {
      return (
        (<button onClick={() => toggleQuestions()}>{moreButton}</button>)
      )
    }
  }

  const renderAskQuestionForm = () => {
    if (addQuestionToggle) {
      return (
        <div>
          Your Question (mandatory)
          <input value={addQFormVal} onChange={updateQFormVal} placeholder='ask question...' required></input>
          What is your nickname (mandatory)
          <input value={addQFormName} onChange={updateQFormName} placeholder='Example: jackson11!' required></input>
          <div>For privacy reasons, do not use your full name or email address</div>
          Your email (mandatory)
          <input type='email' value={addQFormEmail} onChange={updateQFormEmail} placeholder='Why did you like the product or not?' required></input>
          <div>For authentication reasons, you will not be emailed</div>
          <button onClick={submitQuestion}>Submit Question</button>
        </div>
      )
    }
  }

  useEffect(() => {
    if (open) {
    setQuestions(questionData);
    setMoreButton('Show Less');
    } else {
    setQuestions(firstFour);
    setMoreButton('More Answered Questions');
    }
  }, [open]);

  return (
    <div>
      {questions.map((question, index) => {
        return (
          <QuestionEntry question={question} key={index}/>
        )
      })}
      {renderMoreQuestionsButton()}
      <button onClick={() => setAddQuestionToggle(!addQuestionToggle)}>Ask A Question</button>
      {renderAskQuestionForm()}
    </div>
  )
}

export default QuestionList;