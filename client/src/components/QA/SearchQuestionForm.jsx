import React, { useState, useEffect, } from 'react';
import { Form, FormControl } from 'react-bootstrap'


const SearchQuestionForm = (props) => {

<<<<<<< HEAD
  // console.log(props);
=======
>>>>>>> develop
  const [searchBarVal, setSearchBarVal] = useState('');

  const updateSearchBarVal = (e) => {
    setSearchBarVal(e.target.value)
  }

  useEffect (() => {
    if (searchBarVal.length > 2) {
      let filteredQuestions = props.originalData.results.filter((question) => {
        return question.question_body.toLowerCase().indexOf(searchBarVal.toLowerCase()) !== -1;
      })
      props.setData({
        "product_id": props.data.product_id,
        "results": filteredQuestions
      })
    } else if (props.originalData && searchBarVal.length < 3) {
      let filteredQuestions = props.originalData.results.slice();
      props.setData({
        "product_id": props.originalData.product_id,
        "results": filteredQuestions
      })
    }

  }, [searchBarVal])

  return (
    <Form>
      <FormControl type='tesxt' placeholder='Have a question? Search for answers…' onChange={(e) => updateSearchBarVal(e)}/>
    </Form>
  )
}

export default SearchQuestionForm;