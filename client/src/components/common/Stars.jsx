import React from 'react';
import Rating from 'react-rating';
import PropTypes from 'prop-types';

import { roundToNearestQuarter } from '../../utils/ratings';

import 'font-awesome/css/font-awesome.css';

export default function Stars({ rating }) {
  return (
    <>
      <Rating
        emptySymbol="fa fa-star-o"
        fullSymbol="fa fa-star"
        initialRating={roundToNearestQuarter(rating)}
        fractions={4}
      />
    </>
  );
}

Stars.defaultProps = {
  rating: 3,
};

Stars.propTypes = {
  rating: PropTypes.number,
};
