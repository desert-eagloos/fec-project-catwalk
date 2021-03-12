import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';

const SizeRatingRadio = ({ handleCharacteristicsRatings, name }) => (
  <Form.Group as={Col} controlId="formSizeRating">
    <fieldset>
      <Row>
        <Col xs={4} className="d-flex m-0 p-0 justify-content-center">
          <span>
            <Form.Label as="legend">Size</Form.Label>
          </span>
        </Col>
        <Col xs={10}>
          <Form.Check onClick={handleCharacteristicsRatings} type="radio" label="A size too small     " name={name} id="sizeRatingRadio1" value="1" />
          <Form.Check onClick={handleCharacteristicsRatings} type="radio" label="1/2 a size too small " name={name} id="sizeRatingRadio2" value="2" />
          <Form.Check onClick={handleCharacteristicsRatings} type="radio" label="Perfect              " name={name} id="sizeRatingRadio3" value="3" />
          <Form.Check onClick={handleCharacteristicsRatings} type="radio" label="1/2 a size too big   " name={name} id="sizeRatingRadio4" value="4" />
          <Form.Check onClick={handleCharacteristicsRatings} type="radio" label="A size too big       " name={name} id="sizeRatingRadio5" value="5" />
        </Col>
      </Row>
    </fieldset>
  </Form.Group>
);

SizeRatingRadio.propTypes = {
  handleCharacteristicsRatings: PropTypes.func.isRequired,
  name: PropTypes.number.isRequired,
};

export default SizeRatingRadio;
