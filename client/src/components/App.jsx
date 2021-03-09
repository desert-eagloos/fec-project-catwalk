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

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('/products/18201')
        .catch();
      setProduct(result.data);
    };

    fetchData();
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
              setSearchBarInput(event.target.value);
            }}
          />
        </Form.Group>
        <Button
          variant="secondary"
          type="submit"
          onClick={(event) => {
            event.preventDefault();
            const fetchData = async () => {
              const result = await axios.get(`/products/${Number(searchBarInput)}`)
                .catch(console.log('Error finding product by ID'));
              setProduct(result.data);
            };

            fetchData();
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
