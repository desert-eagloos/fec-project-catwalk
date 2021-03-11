import React, { useState, useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import axios from 'axios';

import QARoot from './QA/QARoot';
import Overview from './Overview/Overview';

/* --- Import Module Components --- */
import RandR from './RandR/RandR';

/* --- Sample Data to be used until TravisCI conflicts are resolved --- */
const sampleData = require('./Overview/SampleData/sampleProductData');

function App() {
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
    <Container>
      <Row className="mb-4">
        <Overview product={product} />
      </Row>
      <Row className="mb-4">
        <QARoot id={18201}/>
      </Row>
      <Row className="mb-4">
        <RandR id={18201} />
      </Row>
    </Container>
  );
}

export default App;
