import React from 'react';
import { Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';

export default function FitRating({ fitValue }) {
  const value = ((fitValue / 5) * 100) ?? 50;

  return (
    <>
      <Row className="m-0 p-0">
        Size
      </Row>
      <Row className="m-0 p-0">
        <span style={{ marginLeft: `${value}%` }}><i className="bi bi-caret-down-fill" /></span>
      </Row>
      <Row className="m-0 p-0">
        <Col className="m-0 p-0 d-flex justify-content-start"><span>Too Small</span></Col>
        <Col className="m-0 p-0 d-flex justify-content-center"><span>Perfect</span></Col>
        <Col className="m-0 p-0 d-flex justify-content-end"><span>Too Large</span></Col>
      </Row>
    </>
  );
}

FitRating.defaultProps = {
  fitValue: '3',
};

FitRating.propTypes = {
  fitValue: PropTypes.string,
};
