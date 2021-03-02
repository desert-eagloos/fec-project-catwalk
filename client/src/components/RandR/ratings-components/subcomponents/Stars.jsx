/* eslint-disable react/prop-types */
import React from 'react';

/* --- Import Fontawesome library --- */
import fontawesome from '@fortawesome/fontawesome';
import solid from '@fortawesome/fontawesome-free-solid';
import regular from '@fortawesome/fontawesome-free-regular';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/* --- add icons to our fontawesome library --- */
fontawesome.library.add(solid, regular);

export default class Stars extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: props.rating,
    };
  }

  fullStars() {
    const { rating } = this.state;
    return Math.floor(rating);
  }

  halfStars() {
    const { rating } = this.state;
    const x = rating % 1;
    return x >= 0.5 ? 1 : 0;
  }

  emptyStars() {
    return 5 - this.fullStars() - this.halfStars();
  }

  render() {
    const fullStars = this.fullStars();
    const halfStars = this.halfStars();
    const emptyStars = this.emptyStars();

    const renderFullStars = () => (fullStars !== 0
      ? Array(fullStars)
        .fill(null)
        .map((item, i) => <FontAwesomeIcon className="star" key={`fs${i}`} icon="star" />)
      : '');

    const renderHalfStars = () => (halfStars !== 0
      ? Array(halfStars)
        .fill(null)
        .map((item, i) => (
          <span key={`hs${i}`} className="fa-layers fa-fw star">
            <FontAwesomeIcon icon="star-half" />
            <FontAwesomeIcon icon={['far', 'star-half']} flip="horizontal" />
          </span>
        ))
      : '');

    const renderEmptyStars = () => (emptyStars !== 0
      ? Array(emptyStars)
        .fill(null)
        .map((item, i) => (<FontAwesomeIcon className="star" key={`es${i}`} icon={['far', 'star']} />))
      : '');

    return (
      <div className="star-rating">
        {renderFullStars()}
        {renderHalfStars()}
        {renderEmptyStars()}
      </div>
    );
  }
}
