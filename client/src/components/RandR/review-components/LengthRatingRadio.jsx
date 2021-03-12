import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';

const LengthRatingRadio = () => (
  <Form.Group as={Col} controlId="formLengthRating">
    <fieldset>
      <Row>
        <Col xs={4} className="d-flex m-0 p-0 justify-content-center">
          <span>
            <Form.Label as="legend">Length</Form.Label>
          </span>
        </Col>
        <Col xs={10}>
          <Form.Check type="radio" label="Runs Short          " name="lengthRating" id="lengthRatingRadio1" value="1" />
          <Form.Check type="radio" label="Runs Slightly Short " name="lengthRating" id="lengthRatingRadio2" value="2" />
          <Form.Check type="radio" label="Perfect             " name="lengthRating" id="lengthRatingRadio3" value="3" />
          <Form.Check type="radio" label="Runs Slightly Long  " name="lengthRating" id="lengthRatingRadio4" value="4" />
          <Form.Check type="radio" label="Runs Long           " name="lengthRating" id="lengthRatingRadio5" value="5" />
        </Col>
      </Row>
    </fieldset>
  </Form.Group>
);

export default LengthRatingRadio;
