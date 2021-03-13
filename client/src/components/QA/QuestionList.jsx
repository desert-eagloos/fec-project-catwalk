import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import {
  Button, Form, Modal, Alert,
} from 'react-bootstrap';
import QuestionEntry from './QuestionEntry';

const _ = require('underscore');

const QuestionList = ({ data }) => {
  const [questionData, setQuestionData] = useState(data.results);

  const init = _.map(data.results, (entry) => entry).slice(0, 3);

  const [firstFour, setFirstFour] = useState(init);

  const [questions, setQuestions] = useState(firstFour);

  useEffect(() => {
    setQuestionData(data.results);
    const four = _.map(data.results, (entry) => entry).slice(0, 3);
    setFirstFour(four);
    setQuestions(four);
  }, [data]);

  const open = false;

  // eslint-disable-next-line no-unused-vars
  const [moreButton, setMoreButton] = useState('More Answered Questions');

  const [addQFormVal, setAddQFormVal] = useState('');

  const [addQFormName, setAddQFormName] = useState('');

  const [addQFormEmail, setAddQFormEmail] = useState('');

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const handleShow = () => setShow(true);

  const [showAlert, setShowAlert] = useState(false);

  const updateQFormVal = (e) => {
    setAddQFormVal(e.target.value);
  };

  const updateQFormName = (e) => {
    setAddQFormName(e.target.value);
  };

  const updateQFormEmail = (e) => {
    setAddQFormEmail(e.target.value);
  };

  const renderAlert = () => {
    if (showAlert) {
      return (
        <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>
          <Alert.Heading>Oh snap! You are missing a field!</Alert.Heading>
          <p>
            Be sure to check that all of the mandatory fields are fillout correctly.
          </p>
        </Alert>
      );
    }
    return (<></>);
  };

  const submitQuestion = () => {
    if (addQFormVal === '' || addQFormName === '' || addQFormEmail === '') {
      setShowAlert(true);
    } else {
      handleClose();
      const oldData = questions;
      setQuestions([...oldData, {
        answers: {},
        asker_name: addQFormName,
        question_body: addQFormVal,
        question_date: 'just now',
        question_helpfulness: 0,
      }]);
      axios.post(`/qa/questions/${data.product_id}`, {
        data: {
          body: addQFormVal,
          name: addQFormName,
          email: addQFormEmail,
          id: data.product_id,
        },
      }).then(setAddQFormVal(''))
        .then(setAddQFormName(''))
        .then(setAddQFormEmail(''));
    }
  };

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
      {
        questions.map((question) => (
          <QuestionEntry
            question={question}
            key={question.question_id}
          />
        ))
      }
      <Button id="showAskQFormButton" variant="primary" onClick={handleShow}>Ask A Question</Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title id="questionFormTitle">What would you like to ask?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {renderAlert()}
          <Form>

            <Form.Group controlId="formBasicText">
              <Form.Label>Your Question (mandatory)</Form.Label>
              <Form.Control onChange={updateQFormVal} as="textarea" rows={3} placeholder="ask question..." required />
            </Form.Group>

            <Form.Group controlId="formBasicName">
              <Form.Label>What is your nickname (mandatory)</Form.Label>
              <Form.Control onChange={updateQFormName} type="text" placeholder="Example: jack543!" required />
              <Form.Text className="text-muted">
                For privacy reasons, do not use your full name or email address
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
              <Form.Label>Your email (mandatory)</Form.Label>
              <Form.Control onChange={updateQFormEmail} type="email" placeholder="Example: jack@email.com" required />
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
  );
};

QuestionList.propTypes = {
  data: PropTypes.shape({
    product_id: PropTypes.string,
    results: PropTypes.arrayOf(PropTypes.shape({
      question_id: PropTypes.number,
      question_body: PropTypes.string,
      question_date: PropTypes.string,
      asker_name: PropTypes.string,
      question_helpfulness: PropTypes.number,
      reported: PropTypes.bool,
      answers: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        body: PropTypes.string,
        date: PropTypes.string,
        answerer_name: PropTypes.string,
        helpfulness: PropTypes.number,
        photos: PropTypes.arrayOf(PropTypes.string),
      })),
    })),
  }),
};

QuestionList.defaultProps = {
  data: {
    product_id: '18445',
    results: [
      {
        question_id: 117660,
        question_body: 'Reprehenderit ut quibusdam qui.',
        question_date: '2020-06-17T00:00:00.000Z',
        asker_name: 'Cody.Boehm',
        question_helpfulness: 37,
        reported: false,
        answers: [{
          id: 1113855,
          body: 'A quo pariatur quae laudantium.',
          date: '2021-01-10T00:00:00.000Z',
          answerer_name: 'Isaias.Labadie54',
          helpfulness: 7,
          photos: [
            'https://images.unsplash.com/photo-1554136920-a1df2909d8f2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80',
          ],
        }],
      },
    ],
  },
};

export default QuestionList;
