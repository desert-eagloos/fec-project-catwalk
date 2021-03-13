import React, { useState, useEffect } from 'react';
import { Button, Form, Accordion, Modal, Alert } from 'react-bootstrap';
import QuestionEntry from './QuestionEntry';
import axios from 'axios';

const QuestionList = (props) => {

  const setData = props.setData;

  const [allData, setAllData] = useState(props.data);

  const [questionData, setQuestionData] = useState(props.data.results);

  const [firstFour, setFirstFour] = useState([questionData[0], questionData[1], questionData[2], questionData[3]]);

  const [questions, setQuestions] = useState(firstFour);

  useEffect(() => {
    setQuestionData(props.data.results);
    setAllData(props.data);
    let four = [props.data.results[0], props.data.results[1], props.data.results[2], props.data.results[3]];
    setFirstFour(four);
    setQuestions(four);

  }, [props.data])

  const [open, setOpen] = useState(false);

  const [moreButton, setMoreButton] = useState('More Answered Questions');

  const [addQuestionToggle, setAddQuestionToggle] = useState(false);

  const [addQFormVal, setAddQFormVal] = useState('');

  const [addQFormName, setAddQFormName] = useState('');

  const [addQFormEmail, setAddQFormEmail] = useState('');

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const handleShow = () => setShow(true);

  const [showAlert, setShowAlert] = useState(false);

  const handleShowAlert = () => setShowAlert(true);

  const toggleQuestions = () => {
    setOpen(!open);
  }

  const updateQFormVal = (e) => {
    setAddQFormVal(e.target.value);
  }

  const updateQFormName = (e) => {
    setAddQFormName(e.target.value);
  }

  const updateQFormEmail = (e) => {
    setAddQFormEmail(e.target.value);
  }

  const renderAlert = () => {
    if (showAlert) {
      return (
        <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>
          <Alert.Heading>Oh snap! You're missing a field!</Alert.Heading>
          <p>
            Be sure to check that all of the mandatory fields are fillout correctly.
          </p>
        </Alert>
      )
    }
  }

  const submitQuestion = () => {
    if ( addQFormVal === '' || addQFormName === '' || addQFormEmail === '' ) {
      setShowAlert(true);
    } else {
      handleClose();
      let oldData = questions;
      setQuestions([...oldData, {
        answers: {},
        asker_name: addQFormName,
        question_body: addQFormVal,
        question_date: "just now",
        question_helpfulness: 0
      }]);
      console.log('new questions', questions);
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
    if (props.data.results.length > 4) {
      return (
        (<Button variant="primary" onClick={() => toggleQuestions()}>{moreButton}</Button>)
      )
    }
  }

  useEffect(() => {
    if (open) {
      console.log('questionData', questionData);
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
      <Button id='showAskQFormButton' variant="primary" onClick={handleShow}>Ask A Question</Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title id='questionFormTitle'>What would you like to ask?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {renderAlert()}
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

          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={submitQuestion}>Submit Question</Button>
        </Modal.Footer>
      </Modal>
    </div>
  )

}

export default QuestionList;