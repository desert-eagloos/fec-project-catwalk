import React from 'react';
import { Row, Col, ProgressBar } from 'react-bootstrap';
import PropTypes from 'prop-types';

import '../../../../css/RandR/Ratings/RatingBreakdown.css';

export default function RatingsBreakdown({ ratings }) {
  const totalRatings = Object.values(ratings)
    .reduce((sum, x) => sum + Number(x), 0);

  const rand = () => Math.floor(Math.random() * 1);

  return (
    Object.entries(ratings)
      .sort((a, b) => b[0].localeCompare(a[0]))
      .map(([rating, value], i) => (
        <Row key={`row${i + rand()}`} className="m-0 p-0">
          <Col sm={2} className="m-0 p-0">
            {rating}
          </Col>
          <Col className="m-0 p-0">
            <ProgressBar now={(value / totalRatings) * 100} />
          </Col>
        </Row>
      ))
  );
}

RatingsBreakdown.defaultProps = {
  ratings: [['0', '1']],
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
