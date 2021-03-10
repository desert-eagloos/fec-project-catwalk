import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';
import Rating from 'react-rating';

import RatingsBreakdown from './subcomponents/RatingsBreakdown';
import FitRating from './subcomponents/FitRating';
import ComfortRating from './subcomponents/ComfortRating';
import { RatingContext } from '../../common/AppContext';

import { getAverageRating, convertRatingsToNumberType, roundToNearestQuarter } from '../../../utils/ratings';

import '../../../css/RandR/Ratings/Ratings.css';

function Ratings({ productId }) {
  const [isLoading, setLoading] = useState(true);
  const [ratings, setRatings] = useState({});
  const [fit, setFit] = useState(2.5);
  const [comfort, setComfort] = useState(2.5);

  const { rating, setRating } = useContext(RatingContext);

  useEffect(() => {
    const getRatings = async () => {
      const response = await axios.get(`/reviews/meta?productId=${productId}`);
      setRating(Number(getAverageRating(response.data.ratings)));
      setRatings(convertRatingsToNumberType(response.data.ratings));
      setFit(Number(response.data.characteristics.Fit.value));
      setComfort(Number(response.data.characteristics.Comfort.value));
      setLoading(false);
    };
    getRatings();
    setLoading(false);
  }, []);

  if (isLoading) {
    return <div>Loading Ratings...</div>;
  }

  return (
    <>
      <Row className="mb-2">
        <Col sm={2}><h2 className="fs-1 fw-bold">{rating}</h2></Col>
        <Col className="align-items-start">
          <Rating
            emptySymbol="fa fa-star-o"
            fullSymbol="fa fa-star"
            initialRating={roundToNearestQuarter(rating)}
            fractions={4}
          />
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
  productId: 18201,
};

Ratings.propTypes = {
  productId: PropTypes.number,
};

export default Ratings;
