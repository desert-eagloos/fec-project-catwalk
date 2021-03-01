import React, { useState } from 'react';
import testData from './testData.js';
import QuestionList from './QuestionList.jsx';

const QARoot = (props) => {
  const [data, setData] = useState(testData);

  return (
    <div>
      <u>QA Section</u>
      <QuestionList data={data}/>
    </div>
  )
}

export default QARoot;