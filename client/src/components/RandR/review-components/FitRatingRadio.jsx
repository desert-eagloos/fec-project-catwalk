import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';

const FitRatingRadio = () => (
  <Form.Group as={Col} controlId="formFitRating">
    <fieldset>
      <Row>
        <Col xs={4} className="d-flex m-0 p-0 justify-content-center">
          <span>
            <Form.Label as="legend">Fit</Form.Label>
          </span>
        </Col>
        <Col xs={10}>
          <Form.Check type="radio" label="Runs tight          " name="fitRating" id="fitRatingRadio1" value="1" />
          <Form.Check type="radio" label="Runs slightly tight " name="fitRating" id="fitRatingRadio2" value="2" />
          <Form.Check type="radio" label="Perfect             " name="fitRating" id="fitRatingRadio3" value="3" />
          <Form.Check type="radio" label="Runs slightly loose " name="fitRating" id="fitRatingRadio4" value="4" />
          <Form.Check type="radio" label="Runs loose          " name="fitRating" id="fitRatingRadio5" value="5" />
        </Col>
      </Row>
    </fieldset>
  </Form.Group>
);

export default FitRatingRadio;
