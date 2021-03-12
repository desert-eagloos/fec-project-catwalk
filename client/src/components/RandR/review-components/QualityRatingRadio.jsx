import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';

const QualityRatingRadio = () => (
  <Form.Group as={Col} controlId="formQualityRating">
    <fieldset>
      <Row>
        <Col xs={4} className="d-flex m-0 p-0 justify-content-center">
          <span>
            <Form.Label as="legend">Quality</Form.Label>
          </span>
        </Col>
        <Col xs={10}>
          <Form.Check type="radio" label="Poor            " name="qualityRating" id="qualityRatingRadio1" value="1" />
          <Form.Check type="radio" label="Below Average   " name="qualityRating" id="qualityRatingRadio2" value="2" />
          <Form.Check type="radio" label="What I expected " name="qualityRating" id="qualityRatingRadio3" value="3" />
          <Form.Check type="radio" label="Pretty Great    " name="qualityRating" id="qualityRatingRadio4" value="4" />
          <Form.Check type="radio" label="Perfect         " name="qualityRating" id="qualityRatingRadio5" value="5" />
        </Col>
      </Row>
    </fieldset>
  </Form.Group>
);

export default QualityRatingRadio;
