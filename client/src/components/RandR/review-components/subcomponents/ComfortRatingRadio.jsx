import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';

const ComfortRatingRadio = ({ handleCharacteristicsRatings, name }) => (
  <Form.Group as={Col} controlId="formComfortRating">
    <fieldset>
      <Row>
        <Col xs={4} className="d-flex m-0 p-0 justify-content-center">
          <span>
            <Form.Label as="legend">Comfort</Form.Label>
          </span>
        </Col>
        <Col xs={10}>
          <Form.Check onClick={handleCharacteristicsRatings} type="radio" label="Uncomfortable          " name={name} id="comfortRatingRadio1" value="1" />
          <Form.Check onClick={handleCharacteristicsRatings} type="radio" label="Slightly Uncomfortable " name={name} id="comfortRatingRadio2" value="2" />
          <Form.Check onClick={handleCharacteristicsRatings} type="radio" label="Ok                     " name={name} id="comfortRatingRadio3" value="3" />
          <Form.Check onClick={handleCharacteristicsRatings} type="radio" label="Comfortable            " name={name} id="comfortRatingRadio4" value="4" />
          <Form.Check onClick={handleCharacteristicsRatings} type="radio" label="Perfect                " name={name} id="comfortRatingRadio5" value="5" />
        </Col>
      </Row>
    </fieldset>
  </Form.Group>
);

ComfortRatingRadio.propTypes = {
  handleCharacteristicsRatings: PropTypes.func.isRequired,
  name: PropTypes.number.isRequired,
};

export default ComfortRatingRadio;
