import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';

const WidthRatingRadio = () => (
  <Form.Group as={Col} controlId="formWidthRating">
    <fieldset>
      <Row>
        <Col xs={4} className="d-flex m-0 p-0 justify-content-center">
          <span>
            <Form.Label as="legend">Width</Form.Label>
          </span>
        </Col>
        <Col xs={10}>
          <Form.Check type="radio" label="Too Narrow       " name="widthRating" id="widthRatingRadio1" value="1" />
          <Form.Check type="radio" label="Slightly Narrow  " name="widthRating" id="widthRatingRadio2" value="2" />
          <Form.Check type="radio" label="Perfect          " name="widthRating" id="widthRatingRadio3" value="3" />
          <Form.Check type="radio" label="Slightly Wide    " name="widthRating" id="widthRatingRadio4" value="4" />
          <Form.Check type="radio" label="Too Wide         " name="widthRating" id="widthRatingRadio5" value="5" />
        </Col>
      </Row>
    </fieldset>
  </Form.Group>
);

export default WidthRatingRadio;
