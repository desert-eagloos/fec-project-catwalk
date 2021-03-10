import React, { useState, useEffect } from 'react';
import {
  Container,
  Row,
  Form,
  Button,
} from 'react-bootstrap';
import axios from 'axios';

import QARoot from './QA/QARoot';
import Overview from './Overview/Overview';

/* --- Import Module Components --- */
import RandR from './RandR/RandR';

/* --- Sample Data to be used until TravisCI conflicts are resolved --- */
const sampleData = require('./Overview/SampleData/sampleProductData');

function App() {
  const [product, setProduct] = useState(sampleData.productsGetRequest);
  const [searchBarInput, setSearchBarInput] = useState('');

  const fetchData = async (productIdNumber) => {
    const result = await axios.get(`/products/${productIdNumber}`);
    if (result.data.name !== 'Error') return (result.data);
    return 'Error';
  };

  useEffect(() => {
    (async () => {
      const defaultSearch = await fetchData(18201);
      setProduct(defaultSearch);
    })();
  }, []);

  return (
    <>
      <Form>
        <Form.Group controlId="searchNewProductById">
          <Form.Label>Search New Product By ID</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter Product ID"
            onChange={(event) => {
              event.preventDefault();
              setSearchBarInput(event.target.value);
            }}
          />
        </Form.Group>
        <Button
          variant="secondary"
          type="submit"
          onClick={async (event) => {
            event.preventDefault();
            const newSearchResults = await fetchData(Number(searchBarInput));
            if (newSearchResults === 'Error') {
              console.log('error');
            } else {
              setProduct(newSearchResults);
            }
          }}
        >
          Submit
        </Button>
      </Form>

      <Container>
        <Row className="mb-4">
          <Overview product={product} />
        </Row>
        <Row className="mb-4">
          <QARoot />
        </Row>
        <Row className="mb-4">
          <RandR id={18201} />
        </Row>
      </Container>
    </>
  );
}

export default App;
