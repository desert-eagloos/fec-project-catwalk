import React from 'react';

const RandR = () => (
  <div id="randr" className="randr-container">
    RATINGS AND REVIEW
    <div id="randr-ratings" className="randr-ratings-container">
      <span>3.5</span>
      <span>*****</span>
      <span>
        <ul>
          <li>5 * =========</li>
          <li>4 * =======</li>
          <li>3 * ====</li>
          <li>2 * ==</li>
          <li>1 * =</li>
        </ul>
      </span>
    </div>
    <div id="randr-review" className="randr-review-container">
      <span>
        246 review sorted by
        <select>
          <option>relevance</option>
          <option>helpfulness</option>
          <option>newest</option>
        </select>
      </span>
      <div className="randr-review-entry">
        <div>
          <span>***</span>
          <span>combo,</span>
          <span>Nov 2, 2020</span>
        </div>
        <div>
          This product is amazingly...
        </div>
        <div>
          beautiful! I can`$apos;`t get enough of it.
        </div>
        <div>Helpful? Yes (10) | Report </div>
      </div>
    </div>
  </div>
);

export default RandR;
