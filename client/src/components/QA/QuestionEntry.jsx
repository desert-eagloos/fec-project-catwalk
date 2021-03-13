import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import {
  Button, Form, Accordion, Card, Badge, Col, Row, Modal,
} from 'react-bootstrap';
import AnswerList from './AnswerList';

const QuestionEntry = ({ question }) => {
  if (!question) {
    return (
      <></>
    );
  }

  const [addAnswerFormVal, setAddAnswerFormVal] = useState('');
  const [addAnswerFormName, setAddAnswerFormName] = useState('');
  const [addAnswerFormEmail, setAddAnswerFormEmail] = useState('');
  const [addAnswerFormPictures, setAddAnswerFormPictures] = useState('');
  const [helpfulnessClicked, setHelpfulnessClicked] = useState(false);
  const [helpfulnessButton, setHelpfulnessButton] = useState(`Yes(${question.question_helpfulness})`);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const handleShow = () => setShow(true);

  const updateAnswerFormVal = (e) => {
    setAddAnswerFormVal(e.target.value);
  };

  const updateAnswerFormName = (e) => {
    setAddAnswerFormName(e.target.value);
  };

  const updateAnswerFormEmail = (e) => {
    setAddAnswerFormEmail(e.target.value);
  };

  const savePictures = (e) => {
    setAddAnswerFormPictures(e.target.value);
  };

  const submitAnswer = () => {
    if (addAnswerFormVal === '' || addAnswerFormName === '' || addAnswerFormEmail === '') {
      // eslint-disable-next-line no-throw-literal
      throw ('Not all required entries are filled out');
    } else {
      axios.post(`/qa/questions/${question.question_id}/answers`, {
        data: {
          body: addAnswerFormVal,
          name: addAnswerFormName,
          email: addAnswerFormEmail,
          photos: addAnswerFormPictures,
        },
      }).then(setAddAnswerFormVal(''))
        .then(setAddAnswerFormName(''))
        .then(setAddAnswerFormEmail(''))
        .then(setAddAnswerFormPictures(''));
    }
  };

  const markQuestionHelpful = () => {
    axios.put(`/qa/questions/${question.question_id}/helpful`);
  };

  useEffect(() => {
    if (helpfulnessClicked) {
      setHelpfulnessButton(`Yes(${question.question_helpfulness + 1})`);
      markQuestionHelpful();
    }
  }, [helpfulnessClicked]);

  console.log(question);
  return (
    <Accordion defaultActiveKey="0">
      <Card>
        <Card.Header>
          <Row>
            <Col sm={7}>
              <big>
                <b>
                  <Badge pill variant="dark">
                    Q:
                  </Badge>
                  &nbsp;
                  {`${question.questions_body}`}
                </b>
              </big>
            </Col>
            <Col sm={5}>
              <small>
                <span>
                  Helpful?
                  <Button size="sm" variant="link" onClick={() => setHelpfulnessClicked('true')}>
                    {helpfulnessButton}
                  </Button>
                  |
                </span>
                <Button size="sm" variant="link" onClick={handleShow}>Answer Question</Button>
              </small>

              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>{question.question_body}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form>

                    <Form.Group controlId="formBasicText">
                      <Form.Label>Your Answer (mandatory)</Form.Label>
                      <Form.Control onChange={updateAnswerFormVal} as="textarea" rows={3} placeholder="answer question..." required />
                    </Form.Group>

                    <Form.Group controlId="formBasicName">
                      <Form.Label>What is your nickname (mandatory)</Form.Label>
                      <Form.Control onChange={updateAnswerFormName} type="text" placeholder="Example: jack543!" required />
                      <Form.Text className="text-muted">
                        For privacy reasons, do not use your full name or email address
                      </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicEmail">
                      <Form.Label>Your email (mandatory)</Form.Label>
                      <Form.Control onChange={updateAnswerFormEmail} type="email" placeholder="Example: jack@email.com" required />
                      <Form.Text className="text-muted">
                        For authentication reasons, you will not be emailed
                      </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicPhoto">
                      <Form.Label>Your photo (optional)</Form.Label>
                      <Form.Control onChange={savePictures} type="url" placeholder="images.com/image" />
                    </Form.Group>

                  </Form>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                  <Button variant="primary" onClick={submitAnswer}>Submit Answer</Button>
                </Modal.Footer>
              </Modal>

            </Col>
          </Row>

        </Card.Header>
        <AnswerList answers={question.answers} />
      </Card>
    </Accordion>
  );
};

QuestionEntry.propTypes = {
  question: PropTypes.shape({
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
  }),
};

QuestionEntry.defaultProps = {
  question: {
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
};

export default QuestionEntry;
