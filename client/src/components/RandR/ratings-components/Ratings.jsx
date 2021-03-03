import axios from 'axios';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Stars from './subcomponents/Stars';
import RatingsBreakdown from './subcomponents/RatingsBreakdown';

import { getAverageRating } from '../../../utils/RandR/ratings';

import '../../../css/RandR/Ratings/Ratings.css';

function Ratings({ id }) {
  const [isLoading, setLoading] = useState(true);
  const [rating, setRating] = useState(0);
  const [ratings, setRatings] = useState([]);

  useEffect(() => {
    const getRatings = async () => {
      const response = await axios.get(`/reviews/meta/${Number(id)}`);
      setRating(getAverageRating(response.data.ratings));
      setRatings(response.data.ratings);
      setLoading(false);
    };
    getRatings();
  }, []);

  if (isLoading) {
    return <div>Loading Ratings...</div>;
  }

  return (
    <div className="randr-ratings-container">
      <div>{rating}</div>
      <Stars rating={rating} />
      <RatingsBreakdown ratings={ratings} />
      <div>Size</div>
      <div>Comfort</div>
    </div>
  );
}

Ratings.defaultProps = {
  id: 18201,
};

Ratings.propTypes = {
  id: PropTypes.number,
};


export default Ratings;
