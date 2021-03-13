import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'react-bootstrap';

import '../../css/RandR/RandR.css';

import Ratings from './ratings-components/Ratings';
import Reviews from './review-components/Reviews';

function RandR({ product }) {
  const [productId, setProductId] = useState(product.id);

  useEffect(() => {
    setProductId(product.id);
  }, [product, productId]);

  return (
    <Container>
      <Row>
        <h3 className="text-uppercase">Ratings and Reviews</h3>
      </Row>
      <Row>
        <Col className="col-4 ratings">
          <Ratings productId={productId} />
        </Col>
        <Col className="col-8 reviews">
          <Reviews productId={productId} />
        </Col>
      </Row>
    </Container>
  );
}

RandR.defaultProps = {
  product: {
    id: 18201,
  },
};

RandR.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }),
};

export default RandR;
