import React from 'react';
import { Row, Col, ProgressBar } from 'react-bootstrap';
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

  const rand = () => Math.floor(Math.random() * 1);

  return (
    Object.entries(copyRatings)
      .sort((a, b) => b[0].localeCompare(a[0]))
      .map(([rating, value], i) => (
        <Row key={`row${i + rand()}`}>
          <Col sm={2}>
            {rating}
          </Col>
          <Col>
            <ProgressBar now={(value / totalRatings) * 100} />
          </Col>
        </Row>
      ))
  );
}

RatingsBreakdown.defaultProps = {
  ratings: [[0, 1]],
};

RatingsBreakdown.propTypes = {
  ratings: PropTypes.shape({
    5: PropTypes.string,
    4: PropTypes.string,
    3: PropTypes.string,
    2: PropTypes.string,
    1: PropTypes.string,
  }),
};
