import React, { useState, useEffect, useContext, useMemo, } from 'react';
import { Container, Row } from 'react-bootstrap';
import { RatingContext } from './common/AppContext';

import axios from 'axios';

import QARoot from './QA/QARoot';
import Overview from './Overview/Overview';

/* --- Import Module Components --- */
import RandR from './RandR/RandR';

/* --- Sample Data to be used until TravisCI conflicts are resolved --- */
const sampleData = require('./Overview/SampleData/sampleProductData');

function App() {
  const [rating, setRating] = useState(null);
  const ratingValue = useMemo( () => ({rating, setRating }), [rating, setRating] );

  const [product, setProduct] = useState(sampleData.productsGetRequest);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('/products/18201')
        .catch();
      setProduct(result.data);
    };

    fetchData();
  }, []);

  return (
    <Container className="main">
      <Row className="mb-4 mt-4">
        <header><h1 className="page-branding logo page-banner">PROJECT CATWALK</h1></header>
      </Row>
      <RatingContext.Provider value={ratingValue}>
        <Row className="mb-4">
          <Overview product={product} />
        </Row>
        <Row className="mb-4">
          <QARoot />
        </Row>
        <Row className="mb-4">
          <RandR productId={18201}  />
        </Row>
      </RatingContext.Provider>
    </Container>
  );
}

export default App;
