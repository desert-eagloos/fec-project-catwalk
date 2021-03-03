import React from 'react';
import { Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';

export default function FitRating({ fitValue }) {
  const value = fitValue ?? 3;

  return (
    <fragment>
      <Row>
        Size
      </Row>
      <Row>
        ^
      </Row>
      <Row>
        <Col>Too Small</Col>
        <Col>Perfect</Col>
        <Col>Too Large</Col>
      </Row>
    </fragment>
  );
}

FitRating.defaultProps = {
  fitValue: 3,
};

FitRating.propTypes = {
  fitValue: PropTypes.string,
};
