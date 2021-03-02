/* eslint-disable react/prop-types */
import axios from 'axios';
import React, { useState, useEffect } from 'react';

import Stars from './subcomponents/Stars';
import RatingsBreakdown from './subcomponents/RatingsBreakdown';

import { getAverageRating } from '../../../utils/RandR/ratings';

import '../../../css/RandR/Ratings/Ratings.css';

function Ratings({ id }) {
  const [isLoading, setLoading] = useState(true);
  const [rating, setRating] = useState([]);

  useEffect(() => {
    const getRatings = async () => {
      const response = await axios.get(`/reviews/meta/${Number(id)}`);
      setRating(getAverageRating(response.data.ratings));
      setLoading(false);
    };
    getRatings();
  });

  if (isLoading) {
    return <div>Loading Ratings...</div>;
  }

  return (
    <div className="randr-ratings-container">
      <div>{rating}</div>
      <Stars rating={rating} />
      <RatingsBreakdown />
      <div>Size</div>
      <div>Comfort</div>
    </div>
  );
}

export default Ratings;
