import axios from 'axios';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';

import Stars from './subcomponents/Stars';
import RatingsBreakdown from './subcomponents/RatingsBreakdown';
import FitRating from './subcomponents/FitRating';
import ComfortRating from './subcomponents/ComfortRating';

import { getAverageRating } from '../../../utils/RandR/ratings';

import '../../../css/RandR/Ratings/Ratings.css';

function Ratings({ id }) {
  const [isLoading, setLoading] = useState(true);
  const [rating, setRating] = useState(0);
  const [ratings, setRatings] = useState([]);
  const [fit, setFit] = useState(2.5);
  const [comfort, setComfort] = useState(2.5);

  useEffect(() => {
    const getRatings = async () => {
      const response = await axios.get(`/reviews/meta/${id}`)
        .catch();
      setRating(getAverageRating(response.data.ratings));
      setRatings(response.data.ratings);
      setFit(response.data.characteristics.Fit.value);
      setComfort(response.data.characteristics.Comfort.value);
      setLoading(false);
    };
    getRatings();
  }, []);

  if (isLoading) {
    return <div>Loading Ratings...</div>;
  }

  return (
    <>
      <Row className="mb-2">
        <Col sm={2}><h2 className="fs-1 fw-bold">{rating}</h2></Col>
        <Col className="align-items-start">
          <Stars rating={rating} />
        </Col>
      </Row>
      <Row className="mb-2">
        <Col>
          <RatingsBreakdown key="bc1" ratings={ratings} />
        </Col>
      </Row>
      <Row className="mb-2" noGutters>
        <Col>
          <FitRating fitValue={fit} />
        </Col>
      </Row>
      <Row className="mb-2" noGutters>
        <Col>
          <ComfortRating comfortValue={comfort} />
        </Col>
      </Row>
    </>
  );
}

Ratings.defaultProps = {
  id: 18201,
};

Ratings.propTypes = {
  id: PropTypes.number,
};

export default Ratings;
