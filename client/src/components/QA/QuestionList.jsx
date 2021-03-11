import React, { useState, useEffect } from 'react';
import { Button, Form, Accordion } from 'react-bootstrap';
import QuestionEntry from './QuestionEntry';
import axios from 'axios';

const QuestionList = (props) => {

  const setData = props.setData;

  const [allData, setAllData] = useState(props.data);

  const [questionData, setQuestionData] = useState(props.data.results);

  useEffect(() => {
    setQuestionData(props.data.results);
    setQuestions(questionData);
  }, [props.data.results])

  const firstFour = [questionData[0], questionData[1], questionData[2], questionData[3]];

  const [questions, setQuestions] = useState(firstFour);

  const [open, setOpen] = useState(false);

  const [moreButton, setMoreButton] = useState('More Answered Questions');

  const [addQuestionToggle, setAddQuestionToggle] = useState(false);

  const [addQFormVal, setAddQFormVal] = useState('');

  const [addQFormName, setAddQFormName] = useState('');

  const [addQFormEmail, setAddQFormEmail] = useState('');

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
    if ( addQFormVal === '' || addQFormName === '' || addQFormEmail === '' ) {
      throw ('You must enter the following:')
    } else {

      axios.post(`/qa/questions/${props.data.product_id}`,{
        data: {
          body: addQFormVal,
          name: addQFormName,
          email: addQFormEmail,
          id: props.data.product_id
        }
      }).then(setAddQFormVal(''))
        .then(setAddQFormName(''))
        .then(setAddQFormEmail(''))
    }
  }

  const renderMoreQuestionsButton = () => {
    if (allData.length > 4) {
      return (
        (<Button variant="primary" onClick={() => toggleQuestions()}>{moreButton}</Button>)
      )
    }
  }

  const renderAskQuestionForm = () => {
    if (addQuestionToggle) {

      return (
        <Form>

          <Form.Group controlId="formBasicText">
            <Form.Label>Your Question (mandatory)</Form.Label>
            <Form.Control onChange={updateQFormVal} as="textarea" rows={3} placeholder='ask question...' required/>
            <Form.Text className="text-muted">
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicName">
            <Form.Label>What is your nickname (mandatory)</Form.Label>
            <Form.Control onChange={updateQFormName} type="text" placeholder='Example: jack543!' required/>
            <Form.Text className="text-muted">
            For privacy reasons, do not use your full name or email address
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
            <Form.Label>Your email (mandatory)</Form.Label>
            <Form.Control onChange={updateQFormEmail} type="email" placeholder='Example: jack@email.com' required/>
            <Form.Text className="text-muted">
            For authentication reasons, you will not be emailed
            </Form.Text>
          </Form.Group>

          <Button variant="primary" onClick={submitQuestion}>Submit Question</Button>

        </Form>
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
      <Button variant="primary" onClick={() => setAddQuestionToggle(!addQuestionToggle)}>Ask A Question</Button>
      {renderAskQuestionForm()}
    </div>
  )

}

export default QuestionList;