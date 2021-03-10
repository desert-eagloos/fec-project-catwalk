import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'react-bootstrap';

import '../../css/RandR/RandR.css';

import Ratings from './ratings-components/Ratings';
import Reviews from './review-components/Reviews';

function RandR({ id }) {
  return (
    <Container>
      <Row>
        <h2>Ratings and Reviews</h2>
      </Row>
      <Row>
        <Col className="col-4 ratings">
          <Ratings productId={id} />
        </Col>
        <Col className="col-8 reviews">
          <Reviews productId={id} />
        </Col>
      </Row>
    </Container>
  );
}

RandR.defaultProps = {
  id: 18201,
};

RandR.propTypes = {
  id: PropTypes.number,
};

export default RandR;
