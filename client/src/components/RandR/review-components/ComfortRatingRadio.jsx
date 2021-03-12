import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';

const ComfortRatingRadio = () => (
  <Form.Group as={Col} controlId="formComfortRating">
    <fieldset>
      <Row>
        <Col xs={4} className="d-flex m-0 p-0 justify-content-center">
          <span>
            <Form.Label as="legend">Comfort</Form.Label>
          </span>
        </Col>
        <Col xs={10}>
          <Form.Check type="radio" label="Uncomfortable        " name="comfortRating" id="comfortRatingRadio1" value="1" />
          <Form.Check type="radio" label="Slightly Uncomfortable " name="comfortRating" id="comfortRatingRadio2" value="2" />
          <Form.Check type="radio" label="Ok                   " name="comfortRating" id="comfortRatingRadio3" value="3" />
          <Form.Check type="radio" label="Comfortable          " name="comfortRating" id="comfortRatingRadio4" value="4" />
          <Form.Check type="radio" label="Perfect              " name="comfortRating" id="comfortRatingRadio5" value="5" />
        </Col>
      </Row>
    </fieldset>
  </Form.Group>
);

export default ComfortRatingRadio;
