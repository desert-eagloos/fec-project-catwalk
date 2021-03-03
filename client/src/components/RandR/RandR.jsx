import React from 'react';
import PropTypes from 'prop-types';

import '../../css/RandR/RandR.css';


import Ratings from './ratings-components/Ratings';
import Reviews from './review-components/Reviews';

function RandR({ id }) {
  return (
    <div className="module-randr-container">
      <div className="randr-title">
        <h2>Ratings and Reviews</h2>
      </div>
      <div className="randr-items">
        <Ratings id={id} />
        <Reviews id={id} />
      </div>
    </div>
  );
}

RandR.defaultProps = {
  id: 18201,
};

RandR.propTypes = {
  id: PropTypes.number,
};

export default RandR;
