import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'react-bootstrap';

import '../../css/RandR/RandR.css';

import Ratings from './ratings-components/Ratings';
import Reviews from './review-components/Reviews';

function RandR({ productId }) {
  return (
    <Container>
      <Row>
        <h2>Ratings and Reviews</h2>
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
  productId: 18201,
};

RandR.propTypes = {
  productId: PropTypes.number,
};

export default RandR;
