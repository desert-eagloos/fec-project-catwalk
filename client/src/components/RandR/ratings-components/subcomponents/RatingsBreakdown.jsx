import React from 'react';

export default function RatingsBreakdown() {
  return (
<<<<<<< Updated upstream
    <div>
      <table>
        <thead>
          <tr>
            <td> 100% recommend this product</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>5</td>
            <td>
              <div className="stars-outer">
                <div className="stars-inner" />
              </div>
            </td>
          </tr>
          <tr>
            <td>4</td>
            <td>
              <div className="stars-outer">
                <div className="stars-inner" />
              </div>
            </td>
          </tr>
          <tr>
            <td>3</td>
            <td>
              <div className="stars-outer">
                <div className="stars-inner" />
              </div>
            </td>
          </tr>
          <tr>
            <td>2</td>
            <td>
              <div className="stars-outer">
                <div className="stars-inner" />
              </div>
            </td>
          </tr>
          <tr>
            <td>1</td>
            <td>
              <div className="stars-outer">
                <div className="stars-inner" />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
=======
    <div className="breakdown-container">
      {
        Object.entries(copyRatings)
          .sort((a, b) => b[0].localeCompare(a[0]))
          .map(([key, value], i) => (
            <div key={`pb${i + 1}`} className="breakdown-rating">
              <span>{ key }</span>
              <span><ProgressBar now={(value / totalRatings) * 100} /></span>
            </div>
          ))
      }
>>>>>>> Stashed changes
    </div>
  );
}
