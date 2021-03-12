import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Container, Col, Row } from 'react-bootstrap';
import axios from 'axios';
import testData from './testData.js';
import QuestionList from './QuestionList.jsx';
import SearchQuestionForm from './SearchQuestionForm.jsx';


const QARoot = (props) => {

  //console.log('props', props);

  const [id, setID] = useState(props.product.id);

  //setID(props.productID);

  //console.log('id', id);

  const [data, setData] = useState();

  let [originalData, setOriginalData] = useState();

  // useEffect (() => {
  //   if (props.productID){
  //     axios.get(`/qa/questions/${id}`)
  //       .then((res) => {
  //         setOriginalData(res.data);
  //         setData(res.data);
  //       })
  //   }
  // }, [props.productID])




  useEffect(() => {
    const asyncFunc = async () => {
      var qaGetReq = async (id) => {
        return axios.get(`/qa/questions/${id}`)

      }
      var qaGetResponce = await qaGetReq(props.product.id);
      //console.log('qaGetResponce', qaGetResponce);
      return qaGetResponce.data;
    };

    asyncFunc()
    .then((res) => {
      //console.log("res", res);
      setOriginalData(res);
      setData(res);
      setID(parseInt(res.product_id))
    })
    .catch();

  }, [props.product]);

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

  if (id === null) {
    return (<></>)
  }

  return (
    <div>
      <Container fluid>
        <Row>
          <Col>
            <h3>Questions and Answers</h3>
            {originalData && <SearchQuestionForm
            originalData={originalData}
            data={data}
            setData={setData}
            />}
            {renderQuestionList()}
          </Col>
        </Row>
      </Container>
    </div>
  )
}

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
    id: 18201,
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