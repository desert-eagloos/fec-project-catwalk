import React from 'react';

export default function RatingsBreakdown() {
  return (
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
    </div>
  );
}
