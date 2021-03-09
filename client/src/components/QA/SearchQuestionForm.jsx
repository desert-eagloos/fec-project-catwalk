import React, { useState, useEffect } from 'react';


const SearchQuestionForm = (props) => {

  const [searchBarVal, setSearchBarVal] = useState('');

  const updateSearchBarVal = (e) => {
    console.log(e.target.value);
    setSearchBarVal(e.target.value)
  }

  useEffect (() => {
    //console.log('HERE');
    if (searchBarVal.length > 2) {
      console.log('INSIDE');
      let filteredQuestions = props.data.results.filter((question) => {
        return question.question_body.toLowerCase().indexOf(searchBarVal.toLowerCase()) !== -1;
      })
      props.setData({
        "product_id": props.data.product_id,
        "results": filteredQuestions
      })
      //I think I might need to use useEffect on data in QAroot.
    }
  }, [searchBarVal])

  return (
    <div>
      <input placeholder='Have a question? Search for answers…' onChange={(e) => updateSearchBarVal(e)}></input>
    </div>
  )
}

export default SearchQuestionForm;