import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';

const QualityRatingRadio = ({ handleCharacteristicsRatings, name }) => (
  <Form.Group as={Col} controlId="formQualityRating">
    <fieldset>
      <Row>
        <Col xs={4} className="d-flex m-0 p-0 justify-content-center">
          <span>
            <Form.Label as="legend">Quality</Form.Label>
          </span>
        </Col>
        <Col xs={10}>
          <Form.Check onClick={handleCharacteristicsRatings} type="radio" label="Poor            " name={name} id="qualityRatingRadio1" value="1" />
          <Form.Check onClick={handleCharacteristicsRatings} type="radio" label="Below Average   " name={name} id="qualityRatingRadio2" value="2" />
          <Form.Check onClick={handleCharacteristicsRatings} type="radio" label="What I expected " name={name} id="qualityRatingRadio3" value="3" />
          <Form.Check onClick={handleCharacteristicsRatings} type="radio" label="Pretty Great    " name={name} id="qualityRatingRadio4" value="4" />
          <Form.Check onClick={handleCharacteristicsRatings} type="radio" label="Perfect         " name={name} id="qualityRatingRadio5" value="5" />
        </Col>
      </Row>
    </fieldset>
  </Form.Group>
);

QualityRatingRadio.propTypes = {
  handleCharacteristicsRatings: PropTypes.func.isRequired,
  name: PropTypes.number.isRequired,
};

export default QualityRatingRadio;
