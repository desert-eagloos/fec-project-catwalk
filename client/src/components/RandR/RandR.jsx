import React, { useState } from 'react';
import '../../css/RandR/RandR.css';


import Ratings from './ratings-components/Ratings';
import Reviews from './review-components/Reviews';

function RandR({ product }) {
  return (
    <div className="module-randr-container">
      <div className="randr-title">
        <h2>Ratings and Reviews</h2>
      </div>
      <div className="randr-items">
        <Ratings id={product.id} />
        <Reviews id={product.id} />
      </div>
    </div>
  );
}

export default RandR;
