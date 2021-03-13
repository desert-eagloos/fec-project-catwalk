import React, { useState, useEffect } from 'react';
import { Form, FormControl } from 'react-bootstrap';
import PropTypes from 'prop-types';

const SearchQuestionForm = ({ data, originalData, setData }) => {
  const [searchBarVal, setSearchBarVal] = useState('');

  const updateSearchBarVal = (e) => setSearchBarVal(e.target.value);

  useEffect(() => {
    if (searchBarVal.length > 2) {
      const filteredQuestions = originalData.results.filter((question) => (
        question.question_body.toLowerCase().indexOf(searchBarVal.toLowerCase()) !== -1
      ));
      setData({
        product_id: data.product_id,
        results: filteredQuestions,
      });
    } else if (originalData && searchBarVal.length < 3) {
      const filteredQuestions = originalData.results.slice();
      setData({
        product_id: originalData.product_id,
        results: filteredQuestions,
      });
    }
  }, [searchBarVal]);

  return (
    <Form>
      <FormControl type="text" placeholder="Have a question? Search for answers…" onChange={(e) => updateSearchBarVal(e)} />
    </Form>
  );
};

SearchQuestionForm.propTypes = {
  data: PropTypes.shape({
    product_id: PropTypes.string,
    results: PropTypes.arrayOf(PropTypes.shape({
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
    })),
  }),
  originalData: PropTypes.shape({
    product_id: PropTypes.string,
    results: PropTypes.arrayOf(PropTypes.shape({
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
    })),
  }),
  setData: PropTypes.func,
};
SearchQuestionForm.defaultProps = {
  data: {
    product_id: '18445',
    results: [
      {
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
    ],
  },
  originalData: {
    product_id: '18445',
    results: [
      {
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
    ],
  },
  setData: () => {},
};

export default SearchQuestionForm;
