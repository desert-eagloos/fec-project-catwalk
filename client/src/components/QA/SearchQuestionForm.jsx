import React, { useState, useEffect } from 'react';


const SearchQuestionForm = (props) => {

  const [searchBarVal, setSearchBarVal] = useState('');

  const updateSearchBarVal = (e) => {
    console.log(e.target.value);
    setSearchBarVal(e.target.value)
  }

  useEffect (() => {
    if (searchBarVal.length > 2) {
      let filteredQuestions = props.data.results.filter((question) => {
        return question.question_body.toLowerCase().indexOf(searchBarVal.toLowerCase()) !== -1;
      })
      console.log('filteredQuestions', filteredQuestions);
      props.setData({
        "product_id": props.data.product_id,
        "results": filteredQuestions
      })
    }

  }, [searchBarVal])

  return (
    <div>
      <input placeholder='Have a question? Search for answers…' onChange={(e) => updateSearchBarVal(e)}></input>
    </div>
  )
}

export default SearchQuestionForm;