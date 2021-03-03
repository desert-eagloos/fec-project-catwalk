import axios from 'axios';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';

import Stars from './subcomponents/Stars';
import RatingsBreakdown from './subcomponents/RatingsBreakdown';
import FitRating from './subcomponents/FitRating';

import { getAverageRating } from '../../../utils/RandR/ratings';

import '../../../css/RandR/Ratings/Ratings.css';

function Ratings({ id }) {
  const [isLoading, setLoading] = useState(true);
  const [rating, setRating] = useState(0);
  const [ratings, setRatings] = useState([]);
  const [fit, setFit] = useState(3);

  useEffect(() => {
    const getRatings = async () => {
      const response = await axios.get(`/reviews/meta/${Number(id)}`);
      setRating(getAverageRating(response.data.ratings));
      setRatings(response.data.ratings);
      setFit(response.data.characteristics.Fit.value);
      setLoading(false);
    };
    getRatings();
  }, []);

  if (isLoading) {
    return <div>Loading Ratings...</div>;
  }

  return (
    <fragment>
      <Row className="mb-2">
        <Col sm={2}>{rating}</Col>
        <Col className="align-items-start">
          <Stars rating={rating} />
        </Col>
      </Row>
      <Row className="mb-2">
        <Col>
          <RatingsBreakdown key="bc1" ratings={ratings} />
        </Col>
      </Row>
      <Row className="mb-2">
        <Col>
          <FitRating fitValue={fit} />
        </Col>
      </Row>
      <Row className="mb-2">
        <Col>
          Comfort
        </Col>
      </Row>
    </fragment>
  );
}

Ratings.defaultProps = {
  id: 18201,
};

Ratings.propTypes = {
  id: PropTypes.number,
};

export default Ratings;
