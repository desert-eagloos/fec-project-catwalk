import React from 'react';
import { Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';

export default function ComfortRating({ comfortValue }) {
  const value = ((comfortValue / 5) * 100) ?? 50;

  return (
    <>
      <Row className="m-0 p-0">
        Size
      </Row>
      <Row className="m-0 p-0">
        <span style={{ marginLeft: `${value}%` }}><i className="bi bi-caret-down-fill" /></span>
      </Row>
      <Row className="m-0 p-0">
        <Col className="m-0 p-0 d-flex justify-content-start"><span>Poor</span></Col>
        <Col className="m-0 p-0 d-flex justify-content-end"><span>Perfect</span></Col>
      </Row>
    </>
  );
}

ComfortRating.defaultProps = {
  comfortValue: 3,
};

ComfortRating.propTypes = {
  comfortValue: PropTypes.number,
};
