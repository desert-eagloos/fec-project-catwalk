import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';

const LengthRatingRadio = ({ handleCharacteristicsRatings, name }) => (
  <Form.Group as={Col} controlId="formLengthRating">
    <fieldset>
      <Row>
        <Col xs={4} className="d-flex m-0 p-0 justify-content-center">
          <span>
            <Form.Label as="legend">Length</Form.Label>
          </span>
        </Col>
        <Col xs={10}>
          <Form.Check onClick={handleCharacteristicsRatings} type="radio" label="Runs Short          " name={name} id="lengthRatingRadio1" value="1" />
          <Form.Check onClick={handleCharacteristicsRatings} type="radio" label="Runs Slightly Short " name={name} id="lengthRatingRadio2" value="2" />
          <Form.Check onClick={handleCharacteristicsRatings} type="radio" label="Perfect             " name={name} id="lengthRatingRadio3" value="3" />
          <Form.Check onClick={handleCharacteristicsRatings} type="radio" label="Runs Slightly Long  " name={name} id="lengthRatingRadio4" value="4" />
          <Form.Check onClick={handleCharacteristicsRatings} type="radio" label="Runs Long           " name={name} id="lengthRatingRadio5" value="5" />
        </Col>
      </Row>
    </fieldset>
  </Form.Group>
);

LengthRatingRadio.propTypes = {
  handleCharacteristicsRatings: PropTypes.func.isRequired,
  name: PropTypes.number.isRequired,
};

export default LengthRatingRadio;
