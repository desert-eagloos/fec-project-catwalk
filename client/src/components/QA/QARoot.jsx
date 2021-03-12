import React, { useState, useEffect } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import axios from 'axios';
import testData from './testData.js';
import QuestionList from './QuestionList.jsx';
import SearchQuestionForm from './SearchQuestionForm.jsx';


const QARoot = (props) => {

  const [data, setData] = useState();

  let [originalData, setOriginalData] = useState();

  useEffect (() => {
    axios.get(`/qa/questions/${props.id}`)
      .then((res) => {
        setOriginalData(res.data);
        setData(res.data);
      })
  }, [])

  const renderQuestionList = () => {
    if (data) {
      return (
        <QuestionList
        data={data}
        setData={setData}
        />
      )
    } else {
      {'No Questions'}
    }
  }

  return (
    <div>
      <Container fluid>
        <Row>
          <Col>
            <h3>Questions and Answers</h3>
            <SearchQuestionForm
            originalData={originalData}
            data={data}
            setData={setData}
            />
            {renderQuestionList()}
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default QARoot;