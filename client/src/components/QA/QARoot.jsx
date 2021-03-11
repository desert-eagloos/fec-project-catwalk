import React, { useState, useEffect } from 'react';
import axios from 'axios';
import testData from './testData.js';
import QuestionList from './QuestionList.jsx';
import SearchQuestionForm from './SearchQuestionForm.jsx';


const QARoot = (props) => {

  const [data, setData] = useState();

  // const getQuestions = () => {
  //   axios.get(`/qa/questions/${props.id}`)
  //     .then((res) => {
  //       setData(res.data)
  //     })
  // }

  // getQuestions ();

  useEffect (() => {
    axios.get(`/qa/questions/${props.id}`)
      .then((res) => {
        setData(res.data)
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