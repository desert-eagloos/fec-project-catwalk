import React, { useState } from 'react';
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

export default RandR;
