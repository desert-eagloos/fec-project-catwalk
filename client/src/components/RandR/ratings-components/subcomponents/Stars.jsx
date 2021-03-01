import React from 'react';

export default function Stars(rating) {
  return (
    <div className="stars-outer">
      <div className="stars-inner" style={{ width: rating }} />
    </div>
  );
}
