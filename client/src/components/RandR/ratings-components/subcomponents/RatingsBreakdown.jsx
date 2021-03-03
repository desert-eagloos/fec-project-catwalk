import React from 'react';
import { ProgressBar } from 'react-bootstrap';
import PropTypes from 'prop-types';

import '../../../../css/RandR/Ratings/RatingBreakdown.css';

export default function RatingsBreakdown({ ratings }) {
  const copyRatings = {
    5: ratings[5] ?? 0,
    4: ratings[4] ?? 0,
    3: ratings[3] ?? 0,
    2: ratings[2] ?? 0,
    1: ratings[1] ?? 0,
  };

  const totalRatings = Object.values(ratings)
    .reduce((sum, x) => sum + Number(x), 0);

  return (
    <div className="breakdown-container">
      {
        Object.entries(copyRatings)
          .sort((a, b) => b[0].localeCompare(a[0]))
          .map(([rating, value]) => (
            <div className="breakdown-rating">
              <span>{ rating }</span>
              <span><ProgressBar now={(value / totalRatings) * 100} /></span>
            </div>
          ))
      }
    </div>
  );
}
RatingsBreakdown.defaultProps = {
  ratings: [[0, 1]],
};

RatingsBreakdown.propTypes = {
  ratings: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number, PropTypes.number)),
};
