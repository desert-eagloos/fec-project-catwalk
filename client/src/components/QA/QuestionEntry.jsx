import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Form } from 'react-bootstrap';
import AnswerList from './AnswerList.jsx';

const QuestionEntry = (props) => {

  const [allAnswers, setAllAnswers] = useState(props.question.answers);

  const [addAnswerFormVal, setAddAnswerFormVal] = useState('');

  const [addAnswerFormName, setAddAnswerFormName] = useState('');

  const [addAnswerFormEmail, setAddAnswerFormEmail] = useState('');

  const [addAnswerFormPictures, setAddAnswerFormPictures] = useState([]);

  const [addAnswerToggle, setAddAnswerToggle] = useState(false);

  const [helpfulnessClicked, setHelpfulnessClicked] = useState(false);

  const [helpfulnessButton, setHelpfulnessButton] = useState(`Yes(${props.question.question_helpfulness})`)

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
    let oldData = addAnswerFormPictures;
    setAddAnswerFormPictures([...oldData, e.target.files]);
  }

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
        .then(setAddAnswerFormPhotos(''))
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

          {/* PUT IMAGE INPUT HERE */}
          <Form>
            <Form.Group>
              Add up to 5 photos.
              <Form.File onChange={savePictures} />
              <Form.File onChange={savePictures} />
              <Form.File onChange={savePictures} />
              <Form.File onChange={savePictures} />
              <Form.File onChange={savePictures} />
            </Form.Group>

          </Form>
          {renderThumbnails()}

          <Button variant="primary" onClick={submitAnswer}>Submit Answer</Button>
        </div>
      )
    }
  }

  const markQuestionHelpful = () => {
    axios.put(`/qa/questions/:${props.question.question_id}/helpful`);
  }

  useEffect(() => {
    if (helpfulnessClicked) {
      setHelpfulnessButton(`Yes(${props.question.question_helpfulness + 1})`);
      markQuestionHelpful();
    }
  }, [helpfulnessClicked]);

///////////////////////////////////////////////////////////////////////////////////////

  // const renderYesButton = () => {
  //   if (helpfulnessClicked) {
  //     return (
  //       <Button variant="link" >Yes({props.question.question_helpfulness + 1})</Button>
  //     )
  //   } else {
  //     return (
  //       <Button variant="link" onClick={setHelpfulnessClicked('true')} >{helpfulnessButton}</Button>
  //     )
  //   }
  // }

  return (
    <div>
      Q:{props.question.question_body}
      <span> Helpful? <Button variant="link" onClick={() => setHelpfulnessClicked('true')} >{helpfulnessButton}</Button> |</span><Button variant="link" onClick={() => setAddAnswerToggle(!addAnswerToggle)}>Answer Question</Button>
      {renderAnswerQForm()}
      <AnswerList answers={allAnswers}/>
    </div>
  )
}

export default QuestionEntry;