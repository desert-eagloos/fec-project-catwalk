import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Container, Col, Row } from 'react-bootstrap';
import axios from 'axios';
import QuestionList from './QuestionList';
import SearchQuestionForm from './SearchQuestionForm';

const _ = require('underscore');

const QARoot = ({ product }) => {
  const [id, setID] = useState(product.id);
  const [data, setData] = useState();
  const [originalData, setOriginalData] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const restructureResponseData = (resData) => ({
    product_id: resData.product_id,
    results: _.map(resData.results, (answers) => ({
      question_id: answers.question_id,
      questions_body: answers.question_body,
      questions_date: answers.question_date,
      asker_name: answers.asker_name,
      question_helpfulness: answers.question_helpfulness,
      reported: answers.reported,
      answers: _.map(answers.answers, (answer) => ({
        id: answer.id,
        body: answer.body,
        date: answer.date,
        answerer_name: answer.answerer_name,
        helpfulness: answer.helpfulness,
        photos: answer.photos,
      })),
    })),
  });

  useEffect(() => {
    const asyncFunc = async () => {
      const qaGetReq = async (idp) => axios.get(`/qa/questions/${idp}`);
      const qaGetResponse = await qaGetReq(product.id);
      return qaGetResponse.data;
    };

    asyncFunc()
      .then((res) => {
        const restructuredData = restructureResponseData(res);
        // console.log(restructuredData);
        setOriginalData(restructuredData);
        setData(restructuredData);
        setID(Number(restructuredData.product_id));
        setIsLoading(true);
      })
      .catch();
  }, [product]);

  const renderQuestionList = () => {
    if (isLoading) {
      return (
        <QuestionList data={data} />
      );
    }
    return (<></>);
  };

  if (id === null) {
    return (<></>);
  }

  return (
    <div>
      <Container fluid>
        <Row>
          <Col>
            <h3 id="title">Questions and Answers</h3>
            {originalData
            && <SearchQuestionForm originalData={originalData} data={data} setData={setData} />}
            {renderQuestionList()}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

QARoot.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number,
    campus: PropTypes.string,
    slogan: PropTypes.string,
    description: PropTypes.string,
    category: PropTypes.string,
    name: PropTypes.string,
    default_price: PropTypes.string,
    created_at: PropTypes.string,
    updated_at: PropTypes.string,
  }),
};

QARoot.defaultProps = {
  product: {
    id: 18080,
    campus: 'hr-bld',
    slogan: 'Odit dolorem nemo id tempora qui.',
    description: 'A sapiente hic. Facilis et sit voluptatem. Ex sunt reiciendis qui ut perferendis qui soluta quod.',
    category: 'Sweatpants',
    name: 'Ernesto Sweatpants',
    default_price: '56.00',
    created_at: '2021-02-23T05:08:00.520Z',
    updated_at: '2021-02-23T05:08:00.520Z',
  },
};

export default QARoot;
