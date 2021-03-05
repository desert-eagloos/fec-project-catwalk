import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';

import '../../../css/RandR/Reviews/Reviews.css';

const Reviews = () => (
  <>
    <Row>Total reviews and sorting</Row>
    <Row>
      <Col>star rating</Col>
      <Col>user and date posted</Col>
    </Row>
    <Row>review title</Row>
    <Row>review body</Row>
    <Row>
      <Col>helpful</Col>
      <Col>report</Col>
    </Row>
    <Row>
      <Col><Button>More Reviews</Button></Col>
      <Col><Button>Add a Review</Button></Col>
    </Row>
  </>
);

export default Reviews;
