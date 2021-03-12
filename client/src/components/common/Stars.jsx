import React, { useEffect } from 'react';
import Rating from 'react-rating';
import PropTypes from 'prop-types';

import { roundToNearestQuarter } from '../../utils/ratings';

import 'font-awesome/css/font-awesome.css';

export default function Stars({
  rating, fractions, readOnly, handleStarRating,
}) {
  const createStar = () => (
    readOnly
      ? (
        <Rating
          emptySymbol="fa fa-star-o"
          fullSymbol="fa fa-star"
          initialRating={roundToNearestQuarter(rating)}
          fractions={fractions}
          onClick={handleStarRating}
          readonly
        />
      )
      : (
        <Rating
          emptySymbol="fa fa-star-o"
          fullSymbol="fa fa-star"
          initialRating={roundToNearestQuarter(rating)}
          fractions={fractions}
          onClick={handleStarRating}
        />
      )
  );

  useEffect(() => {
    createStar();
  }, [rating]);

  return (
    <>
      {
        createStar()
      }
    </>
  );
}

Stars.defaultProps = {
  readOnly: false,
  handleStarRating: () => { },
};

Stars.propTypes = {
  rating: PropTypes.number.isRequired,
  fractions: PropTypes.number.isRequired,
  readOnly: PropTypes.bool,
  handleStarRating: PropTypes.func,
};
