/* eslint-disable react/prop-types */
import React from 'react';
import Rating from 'react-rating';
import { roundToNearestQuarter } from '../../../../utils/RandR/ratings';

import 'font-awesome/css/font-awesome.css';

export default function Stars({ rating }) {
  return (
    <div>
      <Rating
        emptySymbol="fa fa-star-o"
        fullSymbol="fa fa-star"
        initialRating={roundToNearestQuarter(rating)}
        fractions={4}
      />
    </div>
  );
}
