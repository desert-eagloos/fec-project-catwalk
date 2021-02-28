import React from 'react';
import '../../css/RandR/RandR.css';

import Ratings from './Ratings';
import Reviews from './Reviews';

const RandR = () => (
  <div className="module-randr-container">
    <div className="randr-title">
      <h2>Ratings and Reviews</h2>
    </div>
    <div className="randr-items">
      <Ratings />
      <Reviews />
    </div>
  </div>
);

export default RandR;
