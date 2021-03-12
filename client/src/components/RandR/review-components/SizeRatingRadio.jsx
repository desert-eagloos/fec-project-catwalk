import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';

const SizeRatingRadio = () => (
  <Form.Group as={Col} controlId="formSizeRating">
    <fieldset>
      <Row>
        <Col xs={4} className="d-flex m-0 p-0 justify-content-center">
          <span>
            <Form.Label as="legend">Size</Form.Label>
          </span>
        </Col>
        <Col xs={10}>
          <Form.Check type="radio" label="A size too small     " name="sizeRating" id="sizeRatingRadio1" value="1" />
          <Form.Check type="radio" label="1/2 a size too small " name="sizeRating" id="sizeRatingRadio2" value="2" />
          <Form.Check type="radio" label="Perfect              " name="sizeRating" id="sizeRatingRadio3" value="3" />
          <Form.Check type="radio" label="1/2 a size too big   " name="sizeRating" id="sizeRatingRadio4" value="4" />
          <Form.Check type="radio" label="A size too big       " name="sizeRating" id="sizeRatingRadio5" value="5" />
        </Col>
      </Row>
    </fieldset>
  </Form.Group>
);

export default SizeRatingRadio;
