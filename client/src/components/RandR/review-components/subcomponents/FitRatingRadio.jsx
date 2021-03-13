import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';

const FitRatingRadio = ({ handleCharacteristicsRatings, name }) => (
  <Form.Group as={Col} controlId="formFitRating">
    <fieldset>
      <Row>
        <Col xs={4} className="d-flex m-0 p-0 justify-content-center">
          <span>
            <Form.Label as="legend">Fit</Form.Label>
          </span>
        </Col>
        <Col xs={10}>
          <Form.Check onClick={handleCharacteristicsRatings} type="radio" label="Runs tight          " name={name} id="fitRatingRadio1" value="1" />
          <Form.Check onClick={handleCharacteristicsRatings} type="radio" label="Runs slightly tight " name={name} id="fitRatingRadio2" value="2" />
          <Form.Check onClick={handleCharacteristicsRatings} type="radio" label="Perfect             " name={name} id="fitRatingRadio3" value="3" />
          <Form.Check onClick={handleCharacteristicsRatings} type="radio" label="Runs slightly loose " name={name} id="fitRatingRadio4" value="4" />
          <Form.Check onClick={handleCharacteristicsRatings} type="radio" label="Runs loose          " name={name} id="fitRatingRadio5" value="5" />
        </Col>
      </Row>
    </fieldset>
  </Form.Group>
);

FitRatingRadio.propTypes = {
  handleCharacteristicsRatings: PropTypes.func.isRequired,
  name: PropTypes.number.isRequired,
};
export default FitRatingRadio;
