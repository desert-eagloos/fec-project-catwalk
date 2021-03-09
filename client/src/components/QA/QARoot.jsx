import React, { useState, useEffect } from 'react';
import axios from 'axios';
import testData from './testData.js';
import QuestionList from './QuestionList.jsx';
import SearchQuestionForm from './SearchQuestionForm.jsx';


const QARoot = (props) => {

  const [data, setData] = useState();

  const getQuestions = () => {
    axios.get(`/qa/questions/${props.id}`)
      .then((res) => {
        setData(res.data)
      })
  }

  getQuestions ();

  // I think I need to do useEffect for rerendering the data going into the QuestionList when the data is changed in SearchQuestionForm
  const renderQuestionList = () => {
    if (data) {
      return (
        <QuestionList
        data={data}
        setData={setData}
        />
      )
    }
  }

  useEffect (() => {

  }, [data])

  return (
    <div>
      <h3>Questions and Answers</h3>
      <SearchQuestionForm
      data={data}
      setData={setData}
      />
      {renderQuestionList()}
    </div>
  )
}

export default QARoot;