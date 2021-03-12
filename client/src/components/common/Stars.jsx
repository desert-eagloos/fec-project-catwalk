import React from 'react';
import Rating from 'react-rating';
import PropTypes from 'prop-types';

import { roundToNearestQuarter } from '../../utils/ratings';

import 'font-awesome/css/font-awesome.css';

export default function Stars({ rating, fractions, readOnly }) {
  return (
    <>
      {
        readOnly
          ? (
            <Rating
              emptySymbol="fa fa-star-o"
              fullSymbol="fa fa-star"
              initialRating={roundToNearestQuarter(rating)}
              fractions={fractions}
              readonly
            />
          )
          : (
            <Rating
              emptySymbol="fa fa-star-o"
              fullSymbol="fa fa-star"
              initialRating={roundToNearestQuarter(rating)}
              fractions={fractions}
            />
          )
      }
    </>
  );
}

Stars.defaultProps = {
  rating: 3,
  fractions: 1,
  readOnly: false,
};

Stars.propTypes = {
  rating: PropTypes.number,
  fractions: PropTypes.number,
  readOnly: PropTypes.bool,
};
