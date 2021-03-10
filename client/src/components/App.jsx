import React, { useState, useEffect, useMemo } from 'react';

import {
  Container,
  Row,
  Form,
  Button,
} from 'react-bootstrap';
import axios from 'axios';

import { RatingContext } from './common/AppContext';
import QARoot from './QA/QARoot';
import Overview from './Overview/Overview';

/* --- Import Module Components --- */
import RandR from './RandR/RandR';

/* --- Sample Data to be used until TravisCI conflicts are resolved --- */
const sampleData = require('./Overview/SampleData/sampleProductData');

function App() {
  const [rating, setRating] = useState(null);
  const ratingValue = useMemo(() => ({ rating, setRating }), [rating, setRating]);

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
    <Container className="main">
      <Row className="mb-4 mt-4">
        <header><h1 className="page-branding logo page-banner">PROJECT CATWALK</h1></header>
      </Row>
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
              const result = await axios.get(`/products/${Number(searchBarInput)}`);
              setProduct(result.data);
            };

            fetchData();
          }}
        >
          Submit
        </Button>
      </Form>

      <RatingContext.Provider value={ratingValue}>
        <Container>
          <Row className="mb-4">
            <Overview product={product} />
          </Row>
          <Row className="mb-4">
            <QARoot />
          </Row>
          <Row className="mb-4">
            <RandR productId={18201} />
          </Row>
        </Container>
      </RatingContext.Provider>
    </Container>
  );
}

export default App;
