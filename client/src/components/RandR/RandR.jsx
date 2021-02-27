import React from 'react';
import '../../css/RandR/RandR.css';

const RandR = () => (
  <div id="randr" className="randr-container container">
    <span>
      RATINGS AND REVIEW
    </span>
    <div className="randr-items-container container">
      <div id="randr-ratings" className="randr-ratings-container container">
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
        <div>
          <span>Size</span>
          <span> &lt;&gt; </span>
          <ul>
            <li>Too Small</li>
            <li>Perfect</li>
            <li>Too Large</li>
          </ul>
        </div>
        <div>
          <span>Comfort</span>
          <span>&lt;&gt;</span>
          <ul>
            <li>Poor</li>
            <li>Perfect</li>
          </ul>
        </div>
      </div>
      <div id="randr-review" className="randr-review-container container">
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
            beautiful! I can&apos;t get enough of it. I&apos;m not sure what else I can say about it but I&apos;m sure you can all figure it out.
          </div>
          <div>Helpful? Yes (10) | Report </div>
        </div>
      </div>
    </div>
  </div>
);

export default RandR;
