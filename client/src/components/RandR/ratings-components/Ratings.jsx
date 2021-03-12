import axios from 'axios';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';
import Stars from '../../common/Stars';

import RatingsBreakdown from './subcomponents/RatingsBreakdown';
import FitRating from './subcomponents/FitRating';
import ComfortRating from './subcomponents/ComfortRating';

import { getAverageRating, convertRatingsToNumberType } from '../../../utils/ratings';

import '../../../css/RandR/Ratings/Ratings.css';

function Ratings({ productId }) {
  const [isLoading, setLoading] = useState(true);
  const [productRatings, setProductRatings] = useState({
    ratings: {},
    overallRating: 0,
    fitRating: 0,
    comfortRating: 0,
  });

  useEffect(() => {
    const getRatings = async () => {
      const response = await axios.get(`/reviews/meta?productId=${productId}`);
      setProductRatings({
        ratings: convertRatingsToNumberType(response.data.ratings),
        overallRating: Number(getAverageRating(response.data.ratings)),
        fitRating: Number(response.data.characteristics.Fit.value),
        comfortRating: Number(response.data.characteristics.Comfort.value),
      });
      setLoading(false);
    };
    getRatings();
    setLoading(false);
  }, [productId, productRatings]);

  if (isLoading) {
    return <div>Loading Ratings...</div>;
  }

  return (
    <>
      <Row className="mb-2">
        <Col sm={2}><h2 className="fs-1 fw-bold">{productRatings.overallRating}</h2></Col>
        <Col className="align-items-start">
          <Stars rating={productRatings.overallRating} fractions={4} readOnly />
        </Col>
      </Row>
      <Row className="mb-2">
        <Col>
          <RatingsBreakdown key="bc1" ratings={productRatings.ratings} />
        </Col>
      </Row>
      <Row className="mb-2" noGutters>
        <Col>
          <FitRating fitValue={productRatings.fitRating} />
        </Col>
      </Row>
      <Row className="mb-2" noGutters>
        <Col>
          <ComfortRating comfortValue={productRatings.comfortRating} />
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
