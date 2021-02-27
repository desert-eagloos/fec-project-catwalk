import React from 'react';
import '../../css/RandR/RandR.css';

const RandR = () => (
  <div className="module-randr-container">
    <div className="randr-title">
      <h2>Ratings and Reviews</h2>
    </div>
    <div className="randr-items">
      <div className="randr-ratings-container">
        <div>Avg</div>
        <div>Stars</div>
        <div>Star Breakdown</div>
        <div>Size</div>
        <div>Comfort</div>
      </div>
      <div className="randr-reviews-container">
        <div>Total reviews and sorting</div>
        <div>
          <div>star rating</div>
          <div>user and date posted</div>
        </div>
        <div>review title</div>
        <div>review body</div>
        <div>helpful and report</div>
      </div>
    </div>
  </div>
);

export default RandR;
