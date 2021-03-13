import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Form, Accordion, Card, Badge, Col, Row, Popover, OverlayTrigger, Modal } from 'react-bootstrap';
import AnswerList from './AnswerList.jsx';

const QuestionEntry = (props) => {

  if (!props.question) {
    return (
      <div></div>
    )
  }

  const [addAnswerFormVal, setAddAnswerFormVal] = useState('');

  const [addAnswerFormName, setAddAnswerFormName] = useState('');

  const [addAnswerFormEmail, setAddAnswerFormEmail] = useState('');

  const [addAnswerFormPictures, setAddAnswerFormPictures] = useState('');

  const [helpfulnessClicked, setHelpfulnessClicked] = useState(false);

  const [helpfulnessButton, setHelpfulnessButton] = useState(`Yes(${props.question.question_helpfulness})`);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const handleShow = () => setShow(true);

  const updateAnswerFormVal = (e) => {
    setAddAnswerFormVal(e.target.value);
  }

  const updateAnswerFormName = (e) => {
    setAddAnswerFormName(e.target.value);
  }

  const updateAnswerFormEmail = (e) => {
    setAddAnswerFormEmail(e.target.value);
  }

  const savePictures = (e) => {
    setAddAnswerFormPictures(e.target.value);
  }

  const submitAnswer = () => {
    if ( addAnswerFormVal === '' || addAnswerFormName === '' || addAnswerFormEmail === '' ) {
      throw ('You must enter the following:')
    } else {
      axios.post(`/qa/questions/${props.question.question_id}/answers`,{
        data: {
          body: addAnswerFormVal,
          name: addAnswerFormName,
          email: addAnswerFormEmail,
          photos: addAnswerFormPictures,
        }
      }).then(setAddAnswerFormVal(''))
        .then(setAddAnswerFormName(''))
        .then(setAddAnswerFormEmail(''))
        .then(setAddAnswerFormPictures(''))
    }
  }

  //THUMBNAILS GO HERE
  const renderThumbnails = () => {

    if (addAnswerFormPictures) {
      console.log(addAnswerFormPictures);
      return (
        <div>
          {addAnswerFormPictures[0][0].name}
        </div>
      )
    }
  }

  const markQuestionHelpful = () => {
    axios.put(`/qa/questions/${props.question.question_id}/helpful`);
  }

  useEffect(() => {
    if (helpfulnessClicked) {
      setHelpfulnessButton(`Yes(${props.question.question_helpfulness + 1})`);
      markQuestionHelpful();
    }
  }, [helpfulnessClicked]);

  return (
    <Accordion defaultActiveKey='0'>
      <Card>
        <Card.Header>
          <Row>
          <Col sm={7}>
            <big><b><Badge pill variant="dark">
              Q:
            </Badge>{'     '}{props.question.question_body}</b></big>
          </Col>
          <Col sm={5}>
            <small>
              <span> Helpful?
              <Button size="sm" variant="link" onClick={() => setHelpfulnessClicked('true')} >{helpfulnessButton}</Button> |</span>
              <Button size="sm" variant="link" onClick={handleShow}>Answer Question</Button>
            </small>

            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>{props.question.question_body}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>

                <Form.Group controlId="formBasicText">
                    <Form.Label>Your Answer (mandatory)</Form.Label>
                    <Form.Control onChange={updateAnswerFormVal} as="textarea" rows={3} placeholder='answer question...' required/>
                    <Form.Text className="text-muted">
                    </Form.Text>
                  </Form.Group>

                  <Form.Group controlId="formBasicName">
                    <Form.Label>What is your nickname (mandatory)</Form.Label>
                    <Form.Control onChange={updateAnswerFormName} type="text" placeholder='Example: jack543!' required/>
                    <Form.Text className="text-muted">
                    For privacy reasons, do not use your full name or email address
                    </Form.Text>
                  </Form.Group>

                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Your email (mandatory)</Form.Label>
                    <Form.Control onChange={updateAnswerFormEmail} type="email" placeholder='Example: jack@email.com' required/>
                    <Form.Text className="text-muted">
                    For authentication reasons, you will not be emailed
                    </Form.Text>
                  </Form.Group>

                  <Form.Group controlId="formBasicPhoto">
                    <Form.Label>Your photo (optional)</Form.Label>
                    <Form.Control onChange={savePictures} type="url" placeholder='images.com/image' />
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
        {/* {renderAnswerQForm()} */}
        <AnswerList answers={props.question.answers}/>
      </Card>
    </Accordion>
  )
}

export default QuestionEntry;